"use client";

import { useLanguage } from "@/lib/i18n/context";

/**
 * Client-rendered About + tool comparison + FAQ sections for the landing page.
 *
 * Uses the active locale from LanguageContext so the page can swap between
 * Indonesian and English without a server round-trip. The FAQ JSON-LD schema
 * (in FaqStructuredData) is kept English-only for global SEO crawlers.
 *
 * Pure HTML markup — no client interactivity beyond language swapping.
 */
export function MarketingSections() {
  const { t, locale } = useLanguage();

  return (
    <div
      className="mx-auto mt-20 w-full max-w-5xl px-5 pb-20"
      lang={locale}
    >
      {/* Zone 1 — Asymmetric editorial: sticky About panel on the left,
          comparison + FAQ stacked on the right. */}
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* About — inverted pyramid: definition first, details after */}
        <aside
          aria-labelledby="about-heading"
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
            {t.marketing.aboutKicker}
          </span>
          <h2
            id="about-heading"
            className="mt-2 font-display text-3xl font-bold leading-[1.08] tracking-tight text-balance sm:text-4xl"
          >
            {t.marketing.aboutHeading}
          </h2>
          <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted">
            <p>{t.marketing.aboutP1}</p>
            <p>{t.marketing.aboutP2}</p>
            <p>{t.marketing.aboutP3}</p>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
            <Stat label={t.marketing.stats.emotionClasses} value="7" />
            <Stat label={t.marketing.stats.attributes} value="10+" />
            <Stat label={t.marketing.stats.maxTokens} value="5" />
            <Stat label={t.marketing.stats.imageSize} value="2 MB" />
          </dl>
        </aside>

        <div className="flex flex-col gap-16">
          {/* Comparison — three tool cards, Detect highlighted as the entry point */}
          <section aria-labelledby="compare-tools-heading">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
              {t.marketing.pickKicker}
            </span>
            <h2
              id="compare-tools-heading"
              className="mt-2 font-display text-2xl font-bold leading-[1.12] tracking-tight text-balance sm:text-3xl"
            >
              {t.marketing.pickHeading}
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <ToolCard
                name={t.tools.detect.title}
                href="/detect"
                when={t.marketing.compareCards.detect.when}
                input={t.marketing.compareCards.detect.input}
                output={t.marketing.compareCards.detect.output}
                highlighted
                badge={t.marketing.card.featured}
                inLabel={t.marketing.card.inLabel}
                openLabel={`${t.marketing.card.open} ${t.tools.detect.title}`}
              />
              <ToolCard
                name={t.tools.compare.title}
                href="/compare"
                when={t.marketing.compareCards.compare.when}
                input={t.marketing.compareCards.compare.input}
                output={t.marketing.compareCards.compare.output}
                badge={t.marketing.card.tool}
                inLabel={t.marketing.card.inLabel}
                openLabel={`${t.marketing.card.open} ${t.tools.compare.title}`}
              />
              <ToolCard
                name={t.tools.analyze.title}
                href="/analyze"
                when={t.marketing.compareCards.analyze.when}
                input={t.marketing.compareCards.analyze.input}
                output={t.marketing.compareCards.analyze.output}
                badge={t.marketing.card.tool}
                inLabel={t.marketing.card.inLabel}
                openLabel={`${t.marketing.card.open} ${t.tools.analyze.title}`}
              />
            </div>
          </section>

          {/* FAQ — AEO target, kept fully expanded for crawlability.
              Uses the locale-aware FAQ list from the dictionary. The
              JSON-LD schema (FaqStructuredData) ships separately and is
              English for global SEO. */}
          <section aria-labelledby="faq-heading">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
              {t.marketing.faqKicker}
            </span>
            <h2
              id="faq-heading"
              className="mt-2 font-display text-2xl font-bold leading-[1.12] tracking-tight text-balance sm:text-3xl"
            >
              {t.marketing.faqHeading}
            </h2>

            <dl className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {t.faqs.map((faq, i) => (
                <div
                  key={faq.question}
                  className="group border-b border-line/60 py-5 last:border-0 sm:[&:nth-last-child(2)]:border-b-0"
                >
                  <dt className="flex gap-3 font-medium text-foreground">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent-soft font-mono text-[10px] font-semibold tabular-nums text-accent transition-colors group-hover:bg-accent group-hover:text-accent-ink"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-pretty">{faq.question}</span>
                  </dt>
                  <dd className="mt-2 pl-8 text-sm leading-relaxed text-muted">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-faint">
        {label}
      </dt>
      <dd className="mt-1 font-display text-2xl font-bold tabular-nums leading-none text-foreground">
        {value}
      </dd>
    </div>
  );
}

function ToolCard({
  name,
  href,
  when,
  input,
  output,
  badge,
  inLabel,
  openLabel,
  highlighted = false,
}: {
  name: string;
  href: string;
  when: string;
  input: string;
  output: string[];
  badge: string;
  inLabel: string;
  openLabel: string;
  highlighted?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group flex flex-col rounded-2xl border p-5 transition-colors ${
        highlighted
          ? "border-accent/40 bg-accent-soft/40 hover:border-accent"
          : "border-line bg-surface hover:border-accent/50"
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
          {name}
        </h3>
        <span
          aria-hidden="true"
          className={`font-mono text-[10px] font-medium uppercase tracking-[0.14em] ${
            highlighted ? "text-accent" : "text-faint"
          }`}
        >
          {badge}
        </span>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-muted">{when}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-[11px]">
        <span className="text-faint">{inLabel}</span>
        <span className="rounded-md border border-line bg-background px-1.5 py-0.5 text-foreground">
          {input}
        </span>
      </div>

      <ul className="mt-3 space-y-1.5 text-xs text-muted">
        {output.map((line) => (
          <li key={line} className="flex gap-2">
            <span aria-hidden="true" className="text-accent/70">
              ·
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <span
        className={`mt-5 inline-flex items-center gap-1 text-xs font-semibold transition-transform group-hover:translate-x-0.5 ${
          highlighted ? "text-accent" : "text-muted group-hover:text-accent"
        }`}
      >
        {openLabel}
        <span aria-hidden="true">→</span>
      </span>
    </a>
  );
}
