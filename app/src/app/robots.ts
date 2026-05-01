import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        // Major LLM crawlers welcomed by default. Adjust if Bernardo wants to
        // block specific ones (e.g., for content protection).
        userAgent: ["GPTBot", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Google-Extended"],
        allow: "/",
      },
    ],
    sitemap: "https://10xai.us/sitemap.xml",
    host: "https://10xai.us",
  };
}
