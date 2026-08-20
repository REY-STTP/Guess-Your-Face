"use client";

import { DetectTool } from "@/components/DetectTool";
import { useLanguage } from "@/lib/i18n/context";

export default function DetectPage() {
  const { t } = useLanguage();

  return (
    <div className="animate-rise">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {t.tools.detect.title}
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
          {t.tools.detect.pageDesc}
        </p>
      </div>
      <DetectTool />
    </div>
  );
}