import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.guess-your-face.web.id";

// AI crawlers we explicitly allow — for maximum visibility on AI answer engines
// (Google AI Overviews, Perplexity, ChatGPT Search, Claude, etc.).
const AI_CRAWLERS = [
  "GPTBot",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-Web",
  "Anthropic-AI",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Google-Extended",
  "GoogleOther",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "Applebot-Extended",
  "Applebot",
  "cohere-ai",
  "DuckAssistBot",
  "Diffbot",
  "FacebookBot",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: new URL(SITE_URL).hostname,
  };
}

// Note: `llms.txt` lives in /public and is served as a static file at
// `${SITE_URL}/llms.txt` — see public/llms.txt and public/llms-full.txt.