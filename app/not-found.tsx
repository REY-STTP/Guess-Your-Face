"use client";

import Link from "next/link";
import { Logo } from "@/components/SiteHeader";
import { useLanguage } from "@/lib/i18n/context";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-5 py-20 text-center">
      <div className="animate-rise flex max-w-md flex-col items-center">
        <div className="mb-6 flex items-center justify-center">
          <Logo size={96} priority />
        </div>

        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {t.notFound.title}
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          {t.notFound.desc}
        </p>

        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-accent-ink transition-[transform,opacity] hover:opacity-90 active:scale-[0.98]"
          >
            {t.common.backToHome}
          </Link>
          <Link
            href="/detect"
            className="inline-flex items-center justify-center rounded-full border border-line bg-surface px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent/50 hover:text-foreground"
          >
            {t.notFound.startDetect}
          </Link>
        </div>
      </div>
    </main>
  );
}