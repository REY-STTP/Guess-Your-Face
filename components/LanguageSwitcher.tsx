"use client";

import { useLanguage } from "@/lib/i18n/context";
import type { Locale } from "@/lib/i18n/types";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  const options: { code: Locale; label: string }[] = [
    { code: "id", label: "ID" },
    { code: "en", label: "EN" },
  ];

  return (
    <div
      role="group"
      aria-label={t.common.languageSelectorLabel}
      className="flex items-center rounded-full border border-line bg-surface2 p-0.5"
    >
      {options.map((opt) => {
        const active = locale === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLocale(opt.code)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 font-mono text-xs font-semibold transition-[background-color,color] duration-150 ${
              active
                ? "bg-surface text-accent shadow-xs"
                : "text-muted hover:text-foreground"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
