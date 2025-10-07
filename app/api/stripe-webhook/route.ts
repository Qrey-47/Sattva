import Stripe from "stripe";
import { NextResponse } from "next/server";

// Disable Next.js’ body parser for Stripe raw payload
export const config = {
  api: { bodyParser: false },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

// 🟢 Helper to send email via Brevo
async function sendInvoiceEmail(
  to: string,
  amount: number,
  currency: string,
  invoiceUrl: string | null
) {
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
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
              ? `<p>You can view or download your invoice here: <a href="${invoiceUrl}" target="_blank">View Invoice</a></p>`
              : "<p>Your invoice will be available soon.</p>"
          }
          <p>Best regards,<br/>Sattva Team</p>
        `,
      }),
    });

    if (!res.ok) {
      console.error("Brevo email API error:", await res.text());
    } else {
      console.log("✅ Brevo email sent to", to);
    }
  } catch (err) {
    console.error("❌ Error sending Brevo email:", err);
  }
}

export async function POST(req: Request) {
  const rawBody = await req.text(); // Stripe requires raw body
  const sig = req.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 🟢 Handle checkout completion
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_email;
    const amount = (session.amount_total! / 100).toFixed(2);
    const currency = session.currency?.toUpperCase() || "USD";

    let invoiceUrl: string | null = null;
    if (session.invoice) {
      try {
        const invoice = await stripe.invoices.retrieve(session.invoice as string);
        invoiceUrl = invoice.hosted_invoice_url || null;
      } catch (err) {
        console.error("Error fetching invoice:", err);
      }
    }

    if (customerEmail) {
      await sendInvoiceEmail(customerEmail, Number(amount), currency, invoiceUrl);
    }
  }

  return new NextResponse("✅ Webhook received", { status: 200 });
}
