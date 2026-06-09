import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
  },
  async headers() {
    // Only apply aggressive caching to static image assets.
    // Do NOT cache JS/CSS — Next.js already handles this correctly
    // with content-hashed filenames in production builds.
    // Caching JS/CSS here causes stale bundles in development,
    // which is the root cause of persistent hydration errors.
    return [
      {
        source: '/:path*.(webp|avif|png|jpg|jpeg|gif|svg)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
