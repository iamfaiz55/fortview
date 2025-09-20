import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["fortviewresort.com", "images.unsplash.com"],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    qualities: [25, 50, 75, 80, 85, 90, 100],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
