import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  try {
    const { name, price, email } = await req.json();

    if (!name || !price || !email) {
      throw new Error("Missing required fields: name, price, or email");
    }

    // ✅ Convert and sanitize price
    const numericPrice = Math.round(
      parseFloat(String(price).replace(/[^0-9.]/g, "")) * 100
    );

    if (isNaN(numericPrice)) {
      throw new Error(`Invalid price: ${price}`);
    }

    // ✅ Always include full URL scheme
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // ✅ Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email, // 👈 This ensures Stripe attaches email to the payment
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
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
    });

    // ✅ Return checkout URL
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
