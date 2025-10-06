import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json({ message: "Email and password required" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("test"); // replace with your DB name
    const users = db.collection("users");
    const sessions = db.collection("sessions");

    const user = await users.findOne({ email: email.toLowerCase().trim() });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 401 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ message: "Invalid password" }, { status: 401 });

    // ✅ Create session
    const sessionId = uuidv4();
    await sessions.insertOne({
      sessionId,
      userId: user._id,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    });

    // ✅ Use NextResponse.cookies.set instead of cookie.serialize
    const res = NextResponse.json({
      message: "Login successful",
      user: { ...user, password: undefined },
    });

    res.cookies.set({
      name: "sessionId",
      value: sessionId,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
