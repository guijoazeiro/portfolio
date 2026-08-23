import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    "pt-BR": absoluteUrl("/pt"),
    en: absoluteUrl("/en"),
    "x-default": absoluteUrl("/pt"),
  };

  return [
    {
      url: absoluteUrl("/pt"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: absoluteUrl("/en"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
