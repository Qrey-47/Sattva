export const runtime = "nodejs"; // Ensures Stripe works with Node runtime
export const preferredRegion = "auto"; // optional, for faster routing
export const dynamic = "force-dynamic"; // ensures the webhook isn't statically cached
export const maxDuration = 10; // seconds (optional limit for execution time)
