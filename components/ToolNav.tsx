"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";

export function ToolNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const tools = [
    { href: "/detect", label: t.nav.detect, hint: t.nav.detectHint },
    { href: "/compare", label: t.nav.compare, hint: t.nav.compareHint },
    { href: "/analyze", label: t.nav.analyze, hint: t.nav.analyzeHint },
  ];

  return (
    <div className="mb-8 grid grid-cols-3 gap-1 rounded-2xl border border-line bg-surface2 p-1">
      {tools.map((tool) => {
        const active = pathname === tool.href;
        return (
          <Link
            key={tool.href}
            href={tool.href}
            className={`rounded-xl px-3 py-2.5 text-center transition-colors ${
              active ? "bg-surface shadow-sm" : "text-muted hover:text-foreground"
            }`}
          >
            <span
              className={`block text-sm font-semibold ${
                active ? "text-accent" : ""
              }`}
            >
              {tool.label}
            </span>
            <span className="mt-0.5 hidden text-[11px] text-faint sm:block">
              {tool.hint}
            </span>
          </Link>
        );
      })}
    </div>
  );
}