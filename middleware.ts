import { NextRequest, NextResponse } from "next/server";
import clientPromise from "./lib/mongodb";
import cookie from "cookie";

export async function middleware(req: NextRequest) {
  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const sessionId = cookies.sessionId;

  if (!sessionId) return NextResponse.redirect(new URL("/login", req.url));

  const client = await clientPromise;
  const db = client.db("test");
  const sessions = db.collection("sessions");

  const session = await sessions.findOne({ sessionId });
  if (!session || session.expiresAt < new Date()) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Optionally attach user info to request (advanced)
  return NextResponse.next();
}

// Protect routes starting with /dashboard
export const config = { matcher: ["/dashboard/:path*"] };
