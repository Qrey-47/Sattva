import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, dob } = await req.json();

    if (!firstName || !lastName || !email || !password || !dob) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("test"); // Replace with your DB name
    const users = db.collection("users");

    // Check existing email
    const existingUser = await users.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) return NextResponse.json({ error: "Email already registered" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await users.insertOne({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      dob: new Date(dob),
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "User created", id: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
