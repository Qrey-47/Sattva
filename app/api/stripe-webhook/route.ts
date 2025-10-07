import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

// Helper to send email via Brevo
async function sendInvoiceEmail(
  to: string,
  amount: number,
  currency: string,
  invoiceUrl: string | null
) {
  try {
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY!,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Sattva Store", email: "no-reply@sattva.com" },
        to: [{ email: to }],
        subject: "Your Payment Receipt - Sattva Store",
        htmlContent: `
          <h2>Thank you for your purchase!</h2>
          <p>We’ve received your payment of <strong>${amount} ${currency}</strong>.</p>
          ${
            invoiceUrl
              ? `<p>Download your invoice here: <a href="${invoiceUrl}" target="_blank">View Invoice</a></p>`
              : "<p>Your invoice will be available soon.</p>"
          }
          <p>Best regards,<br/>Sattva Team</p>
        `,
      }),
    });
    console.log("Brevo email sent successfully");
  } catch (err) {
    console.error("Error sending Brevo email:", err);
  }
}

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_email;
    const amount = (session.amount_total! / 100).toFixed(2);
    const currency = session.currency?.toUpperCase() || "USD";

    // Fetch invoice URL if available
    let invoiceUrl: string | null = null;
    if (session.invoice) {
      const invoice = await stripe.invoices.retrieve(session.invoice as string);
      invoiceUrl = invoice.hosted_invoice_url || null;
    }

    if (customerEmail) {
      await sendInvoiceEmail(customerEmail, Number(amount), currency, invoiceUrl);
    }
  }

  return new NextResponse("Webhook received", { status: 200 });
}
