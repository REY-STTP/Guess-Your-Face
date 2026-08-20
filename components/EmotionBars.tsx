"use client";

import type { EmotionResult } from "@/lib/emotions";

export function EmotionBars({
  emotions,
  compact = false,
}: {
  emotions: EmotionResult[];
  compact?: boolean;
}) {
  const dominant = emotions[0];

  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="text-2xl">{dominant.emoji}</span>
        <span className="text-lg font-semibold tracking-tight">
          {dominant.label}
        </span>
        <span className="ml-auto font-mono text-sm text-faint">
          {dominant.value.toFixed(0)}%
        </span>
      </div>

      <ul className={`${compact ? "mt-3 space-y-1.5" : "mt-4 space-y-2.5"}`}>
        {emotions.map((e, i) => (
          <li key={e.key}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted">
                <span className="text-sm leading-none">{e.emoji}</span>
                {e.label}
              </span>
              <span className="font-mono text-faint">
                {e.value.toFixed(0)}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface2">
              <div
                className="bar-fill h-full rounded-full"
                style={{
                  width: `${Math.max(e.value, 1.5)}%`,
                  backgroundColor: e.color,
                  animationDelay: `${i * 50}ms`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}