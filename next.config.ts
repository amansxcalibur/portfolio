import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(",") ?? [],
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [new URL("https://amansxcalibur.github.io/zenith-resources/**")],
  },
};

export default nextConfig;
