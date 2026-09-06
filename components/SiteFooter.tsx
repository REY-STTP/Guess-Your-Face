"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-line py-6">
      <div className="mx-auto w-full max-w-5xl px-5 text-center">
        <p className="mx-auto max-w-md text-xs leading-relaxed text-faint">
          {t.footer.disclaimer}{" "}
          {t.footer.read}{" "}
          <Link href="/terms" className="underline transition-colors hover:text-foreground">
            {t.footer.terms}
          </Link>{" "}
          {t.footer.and}{" "}
          <Link href="/privacy" className="underline transition-colors hover:text-foreground">
            {t.footer.privacy}
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
