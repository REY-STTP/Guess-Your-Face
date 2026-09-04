import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.guess-your-face.web.id";

type SitemapEntry = MetadataRoute.Sitemap[number];

// Single-URL site — client-side i18n toggle, no separate /en routes.
// Only 4 canonical URLs are emitted; hreflang declares id-ID + x-default.
const ROUTES = ["", "/detect", "/compare", "/analyze"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  // Use a stable lastModified so Google can trust the signal.
  // Update this date only when the corresponding route's content changes.
  const now = new Date();

  const entries: SitemapEntry[] = ROUTES.map((route) => {
    const url = `${SITE_URL}${route}`;

    return {
      url,
      lastModified: now,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1.0 : 0.8,
      alternates: {
        languages: {
          "id-ID": url,
          "x-default": url,
        },
      },
    };
  });

  return entries;
}