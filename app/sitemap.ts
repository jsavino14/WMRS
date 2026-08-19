import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://wmrservice.com";

  const routes = [
    { path: "",                priority: 1.0,  changeFrequency: "monthly" as const },
    { path: "/what-we-find",   priority: 0.9,  changeFrequency: "monthly" as const },
    { path: "/site-management",priority: 0.9,  changeFrequency: "monthly" as const },
    { path: "/how-we-work",    priority: 0.8,  changeFrequency: "monthly" as const },
    { path: "/industries",     priority: 0.7,  changeFrequency: "monthly" as const },
    { path: "/who-we-are",     priority: 0.6,  changeFrequency: "yearly"  as const },
    { path: "/faq",            priority: 0.6,  changeFrequency: "monthly" as const },
    { path: "/contact",        priority: 0.8,  changeFrequency: "yearly"  as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
