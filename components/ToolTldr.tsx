"use client";

/**
 * Server-initial-rendered, client-hydrated TL;DR + "how it works" block
 * for each tool page. Sits between the client tool component and the
 * main interactive area. Pure HTML, crawlable, quote-friendly.
 *
 * The component is a client component so it can read the active locale
 * from the LanguageContext, but it renders no interactive UI — meaning
 * SSR can still produce static HTML for the default locale on first paint.
 */
import { useLanguage } from "@/lib/i18n/context";

type Slug = "detect" | "compare" | "analyze";

export function ToolTldr({ slug }: { slug: Slug }) {
  const { t } = useLanguage();
  const cfg = t.tldr.items[slug];

  return (
    <section
      aria-label={`${slug} summary`}
      className="relative mb-10 overflow-hidden rounded-2xl border border-line bg-surface p-5 sm:p-6"
    >
      {/* Subtle accent rail — keeps the block grounded without shouting */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[3px] bg-accent/80"
      />

      <header className="mb-3 flex items-center gap-2">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
          {t.tldr.label}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </header>

      <p className="text-balance text-[15px] leading-relaxed text-foreground sm:text-base">
        {cfg.tldr}
      </p>

      <div className="mt-5 border-t border-line pt-4">
        <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-faint">
          {t.tldr.howItWorks}
        </h2>
        <ol className="mt-3 space-y-2">
          {cfg.steps.map((step, i) => (
            <li
              key={step}
              className="flex gap-3 text-sm leading-relaxed text-muted"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent-soft font-mono text-[10px] font-semibold tabular-nums text-accent"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-pretty">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
