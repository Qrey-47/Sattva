// /app/api/forgot-password/route.ts
import { MongoClient } from "mongodb";
import crypto from "crypto";

const client = new MongoClient(process.env.MONGODB_URI!);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    await client.connect();
    const db = client.db("yourdb");
    const users = db.collection("users");

    // 1. Check if user exists
    const user = await users.findOne({ email });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // 2. Generate token
    const token = crypto.randomBytes(32).toString("hex");

    // 3. Expiry time (15 minutes from now)
    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    // 4. Store in DB
    await users.updateOne(
      { email },
      { $set: { resetToken: token, resetTokenExpiry: expiry } }
    );

    // 5. Send reset link (we’ll add email sending later)
    console.log(
      `Reset link (send via email): http://localhost:3000/reset-password?token=${token}`
    );

    return new Response("Reset link generated", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}
/*export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    console.log("Email received:", email);
    return new Response(`Reset link would be sent to ${email}`, { status: 200 });
  } catch (err) {
    return new Response("Invalid request", { status: 200 });
  }
}*/


