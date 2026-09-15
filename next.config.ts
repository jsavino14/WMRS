import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── All 308 permanent redirects, one hop, no chains ───────────────────────
      { source: "/what-we-find",             destination: "/services/waste-cost-savings", permanent: true },
      { source: "/services",                 destination: "/services/waste-cost-savings", permanent: true },
      { source: "/how-we-work",             destination: "/services/waste-cost-savings", permanent: true },
      { source: "/overpaying",              destination: "/services/waste-cost-savings", permanent: true },
      { source: "/how-we-fix-it",           destination: "/services",                    permanent: true },
      { source: "/who-we-do-it-for",        destination: "/services",                    permanent: true },
      { source: "/who-we-work-with",        destination: "/",                            permanent: true },
      { source: "/about",                   destination: "/who-we-are",                  permanent: true },
      { source: "/audit",                   destination: "/services/waste-cost-savings", permanent: true },
      { source: "/how-it-works",            destination: "/services",                    permanent: true },
      // Old /industries/[slug] routes → new single-page anchors
      { source: "/industries/food-service",      destination: "/industries#food-service",     permanent: true },
      { source: "/industries/manufacturing",     destination: "/industries#manufacturing",    permanent: true },
      { source: "/industries/aviation",          destination: "/industries#aviation",         permanent: true },
      { source: "/industries/healthcare",        destination: "/industries#healthcare",       permanent: true },
      { source: "/industries/construction",      destination: "/industries#construction",     permanent: true },
      { source: "/industries/commercial-retail", destination: "/industries#retail-chains",    permanent: true },
    ];
  },
};

export default nextConfig;
