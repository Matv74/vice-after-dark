import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "standalone",
  async redirects() {
    return [
      { source: "/uk/gta-6-countdown", destination: "/uk", permanent: true },
      { source: "/pl/gta-6-countdown", destination: "/pl", permanent: true },
    ];
  },
};

export default nextConfig;
