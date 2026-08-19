import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── Historical routes → final destinations (no chains) ─────────────────
      { source: "/what-we-find",    destination: "/audit",       permanent: true },
      { source: "/overpaying",      destination: "/audit",       permanent: true },
      { source: "/how-it-works",    destination: "/how-we-work", permanent: true },
      { source: "/how-we-fix-it",   destination: "/how-we-work", permanent: true },
      { source: "/who-we-work-with",destination: "/industries",  permanent: true },
      { source: "/who-we-do-it-for",destination: "/industries",  permanent: true },
      { source: "/about",           destination: "/who-we-are",  permanent: true },
    ];
  },
};

export default nextConfig;
