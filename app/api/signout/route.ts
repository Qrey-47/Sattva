// src/app/api/signout/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const sessionId = req.cookies.get("sessionId")?.value;
    if (!sessionId) return NextResponse.json({ message: "No active session" });

    const client = await clientPromise;
    const db = client.db("test");
    const sessions = db.collection("sessions");

    await sessions.deleteOne({ sessionId });

    const res = NextResponse.json({ message: "Signed out successfully" });
    res.cookies.set("sessionId", "", { maxAge: 0 }); // delete cookie

    return res;
  } catch (err) {
    console.error("Sign out error:", err);
    return NextResponse.json({ message: "Error signing out" }, { status: 500 });
  }
}
