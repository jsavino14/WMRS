import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── All 308 permanent redirects, one hop, no chains ───────────────────────
      { source: "/what-we-find",     destination: "/services/waste-cost-savings", permanent: true },
      { source: "/how-we-work",      destination: "/services",                    permanent: true },
      { source: "/overpaying",       destination: "/services/waste-cost-savings", permanent: true },
      { source: "/how-we-fix-it",    destination: "/services",                    permanent: true },
      { source: "/who-we-do-it-for", destination: "/services",                    permanent: true },
      { source: "/who-we-work-with", destination: "/",                            permanent: true },
      { source: "/industries",       destination: "/",                            permanent: true },
      { source: "/about",            destination: "/who-we-are",                  permanent: true },
      { source: "/audit",            destination: "/services/waste-cost-savings", permanent: true },
      { source: "/how-it-works",     destination: "/services",                    permanent: true },
    ];
  },
};

export default nextConfig;
