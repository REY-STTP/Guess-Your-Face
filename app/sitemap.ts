import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.guess-your-face.web.id";

type SitemapEntry = MetadataRoute.Sitemap[number];

const LOCALES = ["id", "en"] as const;
const ROUTES = ["", "/detect", "/compare", "/analyze"] as const;

function urlFor(locale: (typeof LOCALES)[number], route: string): string {
  const prefix = locale === "id" ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${route}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: SitemapEntry[] = ROUTES.flatMap((route) =>
    LOCALES.map((locale) => {
      const canonical = urlFor("id", route); // Indonesian = canonical / default
      const enUrl = urlFor("en", route);

      return {
        url: canonical,
        lastModified: now,
        changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
        priority: route === "" ? 1.0 : 0.8,
        alternates: {
          languages: {
            id: canonical,
            en: enUrl,
          },
        },
      };
    }),
  );

  return entries;
}