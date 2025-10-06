// src/app/api/comments/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const { productSlug, userId, userName, comment, rating } = await req.json();
    if (!productSlug || !userId || !comment) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("test"); // replace with your DB
    const comments = db.collection("comments");

    const result = await comments.insertOne({
      productSlug,
      userId,
      userName,
      comment,
      rating: rating || 5,
      createdAt: new Date(),
    });

    return NextResponse.json({
      _id: result.insertedId,
      productSlug,
      userId,
      userName,
      comment,
      rating: rating || 5,
      createdAt: new Date(),
    });
  } catch (err) {
    console.error("Error posting comment:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
