import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    // Get session cookie
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/sessionId=([^;]+)/);
    const sessionId = match?.[1];

    if (!sessionId) {
      return NextResponse.json({ user: null });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("test"); // change to your DB name
    const sessions = db.collection("sessions");
    const users = db.collection("users");

    // Find session
    const session = await sessions.findOne({ sessionId });
    if (!session) {
      return NextResponse.json({ user: null });
    }

    // Find user by _id (ensure ObjectId)
    const user = await users.findOne({ _id: new ObjectId(session.userId) });
    if (!user) {
      return NextResponse.json({ user: null });
    }

    // Exclude password
    const { password, ...safeUser } = user;

    return NextResponse.json({ user: safeUser });
  } catch (err) {
    console.error("Error fetching current user:", err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
