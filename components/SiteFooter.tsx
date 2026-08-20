"use client";

import { useLanguage } from "@/lib/i18n/context";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-line py-6">
      <div className="mx-auto w-full max-w-5xl px-5 text-center">
        <p className="mx-auto max-w-md text-xs leading-relaxed text-faint">
          {t.footer.disclaimer}
        </p>
      </div>
    </footer>
  );
}
