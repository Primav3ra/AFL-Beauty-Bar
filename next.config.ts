import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    // Images are pre-optimised to right-sized WebP by scripts/optimize-images.mjs,
    // so skip runtime optimisation (also avoids the Vercel Hobby transformation quota).
    unoptimized: true,
  },
  // Category pages keep their Figma routes; these were briefly renamed during review.
  async redirects() {
    return [
      { source: "/treatments/acne-therapy", destination: "/treatments/face-care", permanent: false },
      { source: "/treatments/wellness-longevity", destination: "/treatments/other", permanent: false },
    ];
  },
};

export default nextConfig;
