"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";

/**
 * Privacy page body — fully localized via dictionaries, following the
 * site's locale-toggle pattern (MarketingSections). SSR renders Indonesian
 * (default locale); English appears after the header toggle.
 */
export function PrivacyClient() {
  const { t } = useLanguage();
  const p = t.privacy;

  return (
    <article className="mt-6">
      <Link
        href="/"
        className="font-mono text-xs font-bold uppercase tracking-wider text-muted hover:text-foreground"
      >
        {p.back}
      </Link>

      <p className="mt-6 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
        {p.updated}
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {p.title}
      </h1>

      <div className="mt-8 space-y-8">
        {p.sections.map((section) => (
          <section key={section.heading} aria-label={section.heading}>
            <h2 className="font-display text-xl font-bold tracking-tight">
              {section.heading}
            </h2>
            {section.body.map((paragraph, i) => (
              <p
                key={i}
                className="mt-3 text-[15px] leading-relaxed text-muted"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
