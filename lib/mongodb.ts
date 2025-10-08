// @ts-expect-error Next.js server-only import (no types available)
import "server-only";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
if (!uri) throw new Error("Please define MONGODB_URI in your .env.local");

// ✅ Extend the global type to include our cached connection
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In dev mode, reuse the global variable to prevent multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise!;
} else {
  // In production, always create a new client (Vercel functions are stateless)
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;

// Mark as server-only and dynamic to avoid bundling issues
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
