// src/app/api/me/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const match = cookie.match(/sessionId=([^;]+)/);
    const sessionId = match?.[1];

    if (!sessionId) {
      return NextResponse.json({ user: null });
    }

    const client = await clientPromise;
    const db = client.db("test"); // replace with your DB name
    const sessions = db.collection("sessions");
    const users = db.collection("users");

    const session = await sessions.findOne({ sessionId });
    if (!session) return NextResponse.json({ user: null });

    const user = await users.findOne({ _id: session.userId });
    if (!user) return NextResponse.json({ user: null });

    const { password, ...safeUser } = user; // don't send password
    return NextResponse.json({ user: safeUser });
  } catch (err) {
    console.error("Error fetching current user:", err);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
