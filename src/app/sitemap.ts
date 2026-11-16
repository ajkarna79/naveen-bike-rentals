import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { bikes } from "@/lib/fleet";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/bikes`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/pricing`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];
  return [
    ...pages,
    ...bikes.map((b) => ({
      url: `${SITE_URL}/bikes/${b.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
