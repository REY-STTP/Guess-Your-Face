"use client";

import { AnalyzeTool } from "@/components/AnalyzeTool";
import { useLanguage } from "@/lib/i18n/context";

export function AnalyzeClient() {
  const { t } = useLanguage();

  return (
    <div className="animate-rise">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {t.tools.analyze.title}
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
          {t.tools.analyze.pageDesc}
        </p>
      </div>
      <AnalyzeTool />
    </div>
  );
}