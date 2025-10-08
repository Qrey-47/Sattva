import Stripe from "stripe";
import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  try {
    const { name, price, email } = await req.json();

    if (!name || !price || !email) {
      throw new Error("Missing required fields: name, price, or email");
    }

    // Convert to smallest currency unit (cents)
    const numericPrice = Math.round(
      parseFloat(String(price).replace(/[^0-9.]/g, "")) * 100
    );

    if (isNaN(numericPrice)) throw new Error(`Invalid price: ${price}`);

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // ✅ Create or retrieve a customer so Stripe can email invoices
    const customerList = await stripe.customers.list({ email });
    const customer =
      customerList.data.length > 0
        ? customerList.data[0]
        : await stripe.customers.create({ email });

    // ✅ Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customer.id, // 👈 Attach Stripe customer record
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name },
            unit_amount: numericPrice,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      // 👇 Tell Stripe to automatically send invoice/receipt emails
      invoice_creation: { enabled: true },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
