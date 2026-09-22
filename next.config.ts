import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Each language has its own root layout, so there is no single layout to
    // compose a 404 from — Next's documented answer is global-not-found.
    globalNotFound: true,
  },
};

export default nextConfig;
