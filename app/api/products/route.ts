import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string; // put your Atlas connection string in .env.local
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const db = client.db("yourDBName"); // replace with your DB name
    const products = await db.collection("products").find({}).toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
