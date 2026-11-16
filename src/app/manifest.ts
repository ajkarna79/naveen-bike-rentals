import type { MetadataRoute } from "next";
import { business } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: business.shortName,
    description: business.description,
    start_url: "/",
    display: "standalone",
    background_color: "#eeeeeb",
    theme_color: "#eeeeeb",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
