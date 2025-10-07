import Stripe from "stripe";
import { NextResponse } from "next/server";
import fetch from "node-fetch";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

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

  // ✅ Handle successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_email;

    // OPTIONAL: Fetch more details using session.id if needed
    const amount = (session.amount_total! / 100).toFixed(2);
    const currency = session.currency?.toUpperCase();

    try {
      // ✅ Send confirmation email via Brevo
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": process.env.BREVO_API_KEY!,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: "Sattva Store", email: "no-reply@sattva.com" },
          to: [{ email: customerEmail }],
          subject: "Your Payment Receipt - Sattva",
          htmlContent: `
            <h2>Thank you for your purchase!</h2>
            <p>We’ve received your payment of <strong>${amount} ${currency}</strong>.</p>
            <p>Your invoice and order details are attached or will arrive shortly.</p>
            <p>Order ID: ${session.id}</p>
            <br>
            <p>— The Sattva Team</p>
          `,
        }),
      });
    } catch (err) {
      console.error("Brevo Email Error:", err);
    }
  }

  return new NextResponse("Webhook received", { status: 200 });
}
