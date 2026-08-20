"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Logo({
  size = 32,
  priority = true,
  loading = "eager",
}: {
  size?: number;
  priority?: boolean;
  loading?: "eager" | "lazy";
}) {
  return (
    <Image
      src="/logo.png"
      alt="Guess Your Face logo"
      width={1254}
      height={1254}
      priority={priority}
      loading={loading}
      className="h-auto w-auto rounded-lg"
      style={{ width: size, height: size }}
    />
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const links = [
    { href: "/detect", label: t.nav.detect },
    { href: "/compare", label: t.nav.compare },
    { href: "/analyze", label: t.nav.analyze },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight"
        >
          <Logo />
          <span className="font-display hidden sm:inline text-base font-bold">Guess Your Face</span>
          <span className="font-display sm:hidden text-base font-bold">GYF</span>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    active
                      ? "bg-accent-soft font-medium text-accent"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}