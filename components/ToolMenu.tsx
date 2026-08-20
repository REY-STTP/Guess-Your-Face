"use client";

import Link from "next/link";
import {
  ArrowRight,
  Equals,
  Fingerprint,
  Scan,
} from "@phosphor-icons/react";
import { EMOTION_ORDER } from "@/lib/emotions";
import { useLanguage } from "@/lib/i18n/context";

export function ToolMenu() {
  const { t } = useLanguage();

  const tools = [
    {
      href: "/detect",
      icon: Scan,
      title: t.tools.detect.title,
      badge: t.tools.detect.badge,
      desc: t.tools.detect.desc,
      featured: true,
      action: t.tools.detect.action,
    },
    {
      href: "/compare",
      icon: Equals,
      title: t.tools.compare.title,
      badge: t.tools.compare.badge,
      desc: t.tools.compare.desc,
      featured: false,
      action: t.tools.compare.action,
    },
    {
      href: "/analyze",
      icon: Fingerprint,
      title: t.tools.analyze.title,
      badge: t.tools.analyze.badge,
      desc: t.tools.analyze.desc,
      featured: false,
      action: t.tools.analyze.action,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2">
      {tools.map((tool) => {
        const Icon = tool.icon;
        if (tool.featured) {
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-accent-soft p-6 transition-[border-color,background-color] hover:border-accent/60 lg:col-span-2 lg:row-span-2 lg:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-accent shadow-xs">
                      <Icon size={22} weight="bold" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
                        {tool.title}
                      </h2>
                      <span className="font-mono text-[11px] font-medium text-accent">
                        {tool.badge}
                      </span>
                    </div>
                  </div>
                  <span className="rounded-full border border-accent/30 bg-surface px-3 py-1 font-mono text-[11px] font-semibold text-accent">
                    {tool.badge}
                  </span>
                </div>

                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-6">
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  {EMOTION_ORDER.map((key) => (
                    <span
                      key={key}
                      title={t.emotions[key]}
                      className="flex h-7 w-7 items-center justify-center text-lg transition-transform group-hover:scale-110"
                    >
                      {key === "anger" && "😠"}
                      {key === "disgust" && "🤢"}
                      {key === "fear" && "😨"}
                      {key === "happiness" && "😄"}
                      {key === "neutral" && "😐"}
                      {key === "sadness" && "😢"}
                      {key === "surprise" && "😲"}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  {tool.action}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          );
        }
        return (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex flex-col justify-between rounded-3xl border border-line bg-surface p-6 transition-[border-color,background-color] hover:border-accent/60"
          >
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface2 text-accent">
                    <Icon size={18} weight="bold" />
                  </div>
                  <h2 className="font-display text-lg font-bold tracking-tight text-foreground">
                    {tool.title}
                  </h2>
                </div>
                <span className="font-mono text-[10px] text-faint">
                  {tool.badge}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                {tool.desc}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-line/60 pt-3">
              <span className="text-xs font-medium text-muted group-hover:text-foreground">
                {tool.action}
              </span>
              <ArrowRight
                size={16}
                className="text-faint transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-accent"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}