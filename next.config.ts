import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Zenith Shell screenshots, hosted in the zenith-resources repo.
    remotePatterns: [new URL("https://amansxcalibur.github.io/zenith-resources/**")],
  },
};

export default nextConfig;
