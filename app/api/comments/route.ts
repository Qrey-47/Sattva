import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { productSlug, userId, userName, comment, rating } = await req.json();

    // Validate fields
    if (!productSlug || !userId || !comment) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("test"); // replace with your DB name
    const comments = db.collection("comments");

    // Prepare document
    const newComment = {
      productSlug,
      userId: new ObjectId(userId),
      userName: userName || "Anonymous",
      comment: comment.trim(),
      rating: Number(rating) || 5,
      createdAt: new Date(),
    };

    // Insert comment
    const result = await comments.insertOne(newComment);

    // Return saved document (with generated _id)
    return NextResponse.json({
      ...newComment,
      _id: result.insertedId,
    });
  } catch (err) {
    console.error("Error posting comment:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
