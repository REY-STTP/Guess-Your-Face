"use client";

import { ToolMenu } from "@/components/ToolMenu";
import { Logo } from "@/components/SiteHeader";
import { useLanguage } from "@/lib/i18n/context";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-16 sm:py-20">
      <section className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
          {t.home.heroTitlePart1}{" "}
          <span className="text-accent">{t.home.heroTitleAccent}</span>,{" "}
          <br className="hidden sm:block" />
          {t.home.heroTitlePart2}
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
          {t.home.heroDesc}
        </p>
      </section>

      <section className="mt-12">
        <ToolMenu />
      </section>

      <div className="mt-12 flex max-w-md items-center gap-2 text-xs text-faint">
        <Logo size={16} />
        <span>{t.home.builtWith}</span>
      </div>
    </main>
  );
}