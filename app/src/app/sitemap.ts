import type { MetadataRoute } from "next";
import { getAllEngineSlugs } from "@/data/engines";

const SITE_URL = "https://10xai.us";
const LOCALES = ["en", "pt", "es"] as const;

function localeUrl(path: string, locale: string) {
  if (locale === "en") return `${SITE_URL}${path || "/"}`;
  return `${SITE_URL}/${locale}${path || ""}`;
}

function multiLocaleEntries(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: localeUrl(path, locale),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        "en-US": localeUrl(path, "en"),
        "pt-BR": localeUrl(path, "pt"),
        "es-MX": localeUrl(path, "es"),
      },
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const engineEntries = getAllEngineSlugs().flatMap((slug) =>
    multiLocaleEntries(`/engines/${slug}`, 0.7, "monthly")
  );

  return [
    ...multiLocaleEntries("", 1.0, "weekly"),
    ...multiLocaleEntries("/lighthouse-demo", 0.9, "monthly"),
    ...multiLocaleEntries("/engines", 0.8, "monthly"),
    ...multiLocaleEntries("/about", 0.8, "monthly"),
    ...multiLocaleEntries("/methodology", 0.8, "monthly"),
    ...engineEntries,
    ...multiLocaleEntries("/privacy", 0.3, "yearly"),
    ...multiLocaleEntries("/terms", 0.3, "yearly"),
  ];
}
