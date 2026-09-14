import type { MetadataRoute } from "next";
import { industryPages } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://wmrservice.com";

  const routes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
    { path: "",                                   priority: 1.0, changeFrequency: "monthly" },
    { path: "/services",                          priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/waste-cost-savings",       priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/temp-containers",          priority: 0.8, changeFrequency: "monthly" },
    { path: "/services/international-waste",      priority: 0.7, changeFrequency: "monthly" },
    { path: "/site-management",                   priority: 0.9, changeFrequency: "monthly" },
    { path: "/who-we-are",                        priority: 0.6, changeFrequency: "yearly"  },
    { path: "/faq",                               priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact",                           priority: 0.8, changeFrequency: "yearly"  },
  ];

  const industryRoutes = industryPages.map((p) => ({
    path: `/industries/${p.slug}`,
    priority: 0.7 as const,
    changeFrequency: "monthly" as const,
  }));

  return [...routes, ...industryRoutes].map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
