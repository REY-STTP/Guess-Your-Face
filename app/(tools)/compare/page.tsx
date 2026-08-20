"use client";

import { CompareTool } from "@/components/CompareTool";
import { useLanguage } from "@/lib/i18n/context";

export default function ComparePage() {
  const { t } = useLanguage();

  return (
    <div className="animate-rise">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {t.tools.compare.title}
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
          {t.tools.compare.pageDesc}
        </p>
      </div>
      <CompareTool />
    </div>
  );
}