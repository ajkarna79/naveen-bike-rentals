import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Everyone may crawl everything. The AI search and assistant crawlers are named
 * explicitly so the intent is clear: we want to be found and cited by ChatGPT,
 * Perplexity, Claude, Gemini, Copilot and Apple, not only by classic search.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "Meta-ExternalAgent",
  "MistralAI-User",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
