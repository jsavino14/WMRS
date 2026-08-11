import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/what-we-find",    destination: "/overpaying",      permanent: true },
      { source: "/how-it-works",    destination: "/how-we-fix-it",   permanent: true },
      { source: "/who-we-work-with",destination: "/who-we-do-it-for",permanent: true },
      { source: "/about",           destination: "/who-we-are",      permanent: true },
    ];
  },
};

export default nextConfig;
