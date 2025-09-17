import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["fortviewresort.com", "images.unsplash.com"],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
};

export default nextConfig;
