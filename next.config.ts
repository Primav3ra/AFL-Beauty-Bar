import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    // Images are pre-optimised to right-sized WebP by scripts/optimize-images.mjs,
    // so skip runtime optimisation (also avoids the Vercel Hobby transformation quota).
    unoptimized: true,
  },
};

export default nextConfig;
