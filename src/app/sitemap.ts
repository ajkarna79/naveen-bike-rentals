import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { bikes } from "@/lib/fleet";
import { rides } from "@/lib/content";
import { landings } from "@/lib/landings";

/** Date the content was last reviewed; bump it when prices or pages change. */
const UPDATED = "2026-11-16";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string) => `${SITE_URL}${path}`;
  const page = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly",
    images?: string[],
  ): MetadataRoute.Sitemap[number] => ({ url: u(path), lastModified: UPDATED, changeFrequency, priority, ...(images ? { images } : {}) });

  return [
    page("/", 1, "weekly", [u("/opengraph-image"), ...bikes.filter((b) => b.image).slice(0, 3).map((b) => u(b.image!))]),
    page("/bikes", 0.9, "weekly", bikes.filter((b) => b.image).map((b) => u(b.image!))),
    page("/pricing", 0.9, "monthly"),
    ...landings.map((l) => page(`/${l.slug}`, 0.9, "monthly")),
    ...bikes.map((b) => page(`/bikes/${b.slug}`, 0.8, "monthly", b.image ? [u(b.image)] : undefined)),
    page("/rides", 0.7, "monthly", rides.map((r) => u(r.photo.src))),
    ...rides.map((r) => page(`/rides/${r.slug}`, 0.7, "monthly", [u(r.photo.src)])),
    page("/contact", 0.7, "yearly"),
    page("/faq", 0.6, "monthly"),
    page("/terms", 0.3, "yearly"),
  ];
}
