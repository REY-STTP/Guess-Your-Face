import type { MetadataRoute } from "next";
import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";
import { join } from "node:path";

const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.guess-your-face.web.id";

const FALLBACK_DATE = "2026-09-01T00:00:00+07:00";
const REPO_ROOT = process.cwd();

type SitemapEntry = MetadataRoute.Sitemap[number];

// Waktu commit terakhir yang menyentuh file-file sumber (null jika git tak tersedia).
function gitLastModified(paths: string[]): Date | null {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      cwd: REPO_ROOT,
      encoding: "utf-8",
      timeout: 10_000,
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (!out) return null;
    const date = new Date(out);
    return Number.isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

// mtime terbaru di antara file-file sumber (null jika file tak terbaca).
function mtimeNewest(paths: string[]): Date | null {
  try {
    let newest = 0;
    for (const p of paths) {
      const m = statSync(join(/*turbopackIgnore: true*/ REPO_ROOT, p)).mtimeMs;
      if (m > newest) newest = m;
    }
    return newest > 0 ? new Date(newest) : null;
  } catch {
    return null;
  }
}

function lastModified(paths: string[]): Date {
  return gitLastModified(paths) ?? mtimeNewest(paths) ?? new Date(FALLBACK_DATE);
}

// File sumber yang menentukan "kapan konten route ini terakhir berubah".
// Single-URL site — client-side i18n toggle, no separate /en routes.
// Only canonical URLs are emitted; hreflang declares id-ID + x-default.
const SHARED_SOURCES = [
  "app/layout.tsx",
  "lib/i18n/dictionaries/id.ts",
  "lib/i18n/dictionaries/en.ts",
  "components/StructuredData.tsx",
  "components/SiteHeader.tsx",
  "components/SiteFooter.tsx",
];
const HOME_SOURCES = [
  ...SHARED_SOURCES,
  "app/page.tsx",
  "app/page.client.tsx",
  "components/MarketingSections.tsx",
  "components/FaqStructuredData.tsx",
];
const TOOL_SOURCES: Record<string, string[]> = {
  detect: [...SHARED_SOURCES, "app/(tools)/detect/page.tsx", "components/DetectTool.tsx", "components/ToolStructuredData.tsx", "components/ToolTldr.tsx"],
  compare: [...SHARED_SOURCES, "app/(tools)/compare/page.tsx", "components/CompareTool.tsx", "components/ToolStructuredData.tsx", "components/ToolTldr.tsx"],
  analyze: [...SHARED_SOURCES, "app/(tools)/analyze/page.tsx", "components/AnalyzeTool.tsx", "components/ToolStructuredData.tsx", "components/ToolTldr.tsx"],
};
const LEGAL_SOURCES = [...SHARED_SOURCES, "app/privacy/page.tsx", "app/terms/page.tsx"];

const ROUTES = ["", "/detect", "/compare", "/analyze", "/privacy", "/terms"] as const;

function routeSources(route: (typeof ROUTES)[number]): string[] {
  if (route === "") return HOME_SOURCES;
  if (route === "/privacy" || route === "/terms") return LEGAL_SOURCES;
  return TOOL_SOURCES[route.slice(1)] ?? SHARED_SOURCES;
}

const PRIORITY: Record<(typeof ROUTES)[number], number> = {
  "": 1.0,
  "/detect": 0.8,
  "/compare": 0.8,
  "/analyze": 0.8,
  "/privacy": 0.3,
  "/terms": 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: SitemapEntry[] = ROUTES.map((route) => {
    const url = `${SITE_URL}${route}`;

    return {
      url,
      lastModified: lastModified(routeSources(route)),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: PRIORITY[route],
      alternates: {
        languages: {
          "id-ID": url,
          "x-default": url,
        },
      },
    };
  });

  entries.push(
    {
      url: `${SITE_URL}/llms.txt`,
      lastModified: lastModified(["public/llms.txt"]),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/llms-full.txt`,
      lastModified: lastModified(["public/llms-full.txt"]),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  );

  return entries;
}
