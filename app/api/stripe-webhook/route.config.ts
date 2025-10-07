import type { RouteSegmentConfig } from "next";

const config: RouteSegmentConfig = {
  runtime: "nodejs",   // ensures Node.js runtime
  body: {
    sizeLimit: "1mb",  // optional, adjust if needed
  },
};

export default config;
