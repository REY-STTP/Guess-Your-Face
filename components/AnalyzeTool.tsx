"use client";

import { useState } from "react";
import { FunnelSimple } from "@phosphor-icons/react";
import { toast } from "sonner";
import { sortedEmotions, translateGender } from "@/lib/emotions";
import type { AnalyzeResult } from "@/lib/facepp";
import { PrimaryButton, GhostButton, inputClass } from "@/components/ui";
import { EmotionBars } from "@/components/EmotionBars";
import { useLanguage } from "@/lib/i18n/context";
import type { Dictionary } from "@/lib/i18n/types";

type Status = "idle" | "loading" | "result" | "error";

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-faint">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

function mouthSummary(
  status: Record<string, number> | undefined,
  dict: Dictionary["analyze"]["mouth"]
): string {
  if (!status) return "-";
  const parts: string[] = [];
  if (status.no_mask) parts.push(dict.noMask);
  if (status.surgical_mask_ok) parts.push(dict.surgicalMask);
  if (status.medical_mask_ok) parts.push(dict.medicalMask);
  if (status.mouth_open) parts.push(dict.mouthOpen);
  if (status.mouth_occluded) parts.push(dict.mouthOccluded);
  return parts.length > 0 ? parts.join(", ") : "-";
}

function eyeSummary(
  side: Record<string, number> | undefined,
  dict: Dictionary["analyze"]["eye"]
): string {
  if (!side) return "-";
  if (side.no_glass_eye_open) return dict.open;
  if (side.no_glass_eye_close) return dict.closed;
  if (side.normal_glass_eye_open) return dict.normalGlassesOpen;
  if (side.normal_glass_eye_close) return dict.normalGlassesClosed;
  if (side.dark_glasses) return dict.darkGlasses;
  if (side.occlusion) return dict.occlusion;
  return "-";
}

function parseTokens(text: string): string[] {
  return text
    .split(/[\n,]+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

type AttrBag = {
  gender?: { value: string };
  age?: { value: number };
  emotion?: Record<string, number>;
  smiling?: { value: number };
  facequality?: { value: number; threshold: number };
  beauty?: { male_score: number; female_score: number };
  mouthstatus?: Record<string, number>;
  eyestatus?: {
    left_eye_status?: Record<string, number>;
    right_eye_status?: Record<string, number>;
  };
};

const TOKEN_STORAGE_KEY = "guess-face-tokens";

export function AnalyzeTool() {
  const { t } = useLanguage();
  const [text, setText] = useState(() => {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem(TOKEN_STORAGE_KEY) ?? "";
  });
  const [selected, setSelected] = useState<string[]>(["gender", "age", "emotion"]);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  const attrOptions = [
    { key: "gender", label: t.analyze.attributes.gender },
    { key: "age", label: t.analyze.attributes.age },
    { key: "emotion", label: t.analyze.attributes.emotion },
    { key: "smiling", label: t.analyze.attributes.smiling },
    { key: "facequality", label: t.analyze.attributes.facequality },
    { key: "beauty", label: t.analyze.attributes.beauty },
    { key: "mouthstatus", label: t.analyze.attributes.mouthstatus },
    { key: "eyestatus", label: t.analyze.attributes.eyestatus },
  ];

  const tokens = parseTokens(text);

  const toggle = (key: string) =>
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  const run = async () => {
    if (tokens.length === 0) return;
    const invalid =
      tokens.length > 5 ? t.analyze.maxTokensError : null;
    if (invalid) {
      toast.error(invalid);
      return;
    }
    setStatus("loading");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faceTokens: tokens, attributes: selected }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        toast.error(data.error ?? t.analyze.toasts.unknownError);
        return;
      }
      setResult(data as AnalyzeResult);
      setStatus("result");
    } catch {
      setStatus("error");
      toast.error(t.analyze.toasts.connectionError);
    }
  };

  return (
    <div>
      {status === "result" && result ? (
        <div className="animate-rise">
          <ul className="space-y-4">
            {(result.faces ?? []).map((face, index) => {
              const attrs = (face.attributes ?? {}) as AttrBag;
              const beauty = attrs.beauty;
              const avgBeauty =
                beauty &&
                typeof beauty.male_score === "number" &&
                typeof beauty.female_score === "number"
                  ? Math.round((beauty.male_score + beauty.female_score) / 2)
                  : null;
              const age =
                typeof attrs.age?.value === "number" ? attrs.age.value : null;
              const smiling =
                typeof attrs.smiling?.value === "number"
                  ? attrs.smiling.value
                  : null;
              const faceQuality =
                typeof attrs.facequality?.value === "number"
                  ? attrs.facequality.value
                  : null;
              return (
                <li
                  key={face.face_token ?? ""}
                  className="rounded-2xl border border-line bg-surface p-5"
                >
                  <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
                    <h2 className="font-display text-base font-semibold">
                      {t.analyze.faceTitle} {(result.faces ?? []).length > 1 ? index + 1 : ""}
                    </h2>
                    <span className="font-mono text-[11px] text-faint">
                      {(face.face_token ?? "").slice(0, 14)}...
                    </span>
                  </div>

                  {attrs.emotion && (
                    <EmotionBars emotions={sortedEmotions(attrs.emotion, t.emotions)} />
                  )}

                  <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
                    <Metric
                      label={t.analyze.attributes.gender}
                      value={translateGender(attrs.gender?.value, t.emotions)}
                    />
                    <Metric
                      label={t.analyze.attributes.age}
                      value={age != null ? `${age} ${t.common.yearsOld}` : "-"}
                    />
                    <Metric
                      label={t.analyze.attributes.smiling}
                      value={smiling != null ? `${smiling.toFixed(0)}%` : "-"}
                    />
                    <Metric
                      label={t.analyze.attributes.beauty}
                      value={avgBeauty != null ? `${avgBeauty}/100` : "-"}
                    />
                    <Metric
                      label={t.analyze.attributes.facequality}
                      value={faceQuality != null ? `${faceQuality.toFixed(0)}/100` : "-"}
                    />
                    <Metric
                      label={t.analyze.attributes.mouthstatus}
                      value={mouthSummary(attrs.mouthstatus, t.analyze.mouth)}
                    />
                    <Metric
                      label={t.analyze.attributes.leftEye}
                      value={eyeSummary(attrs.eyestatus?.left_eye_status, t.analyze.eye)}
                    />
                    <Metric
                      label={t.analyze.attributes.rightEye}
                      value={eyeSummary(attrs.eyestatus?.right_eye_status, t.analyze.eye)}
                    />
                  </dl>
                </li>
              );
            })}
          </ul>

          <div className="mt-6">
            <GhostButton
              onClick={() => {
                setResult(null);
                setStatus("idle");
              }}
            >
              <FunnelSimple size={16} />
              {t.analyze.analyzeAgain}
            </GhostButton>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-foreground">
                {t.analyze.textareaLabel}
              </span>
              <textarea
                className={`${inputClass} min-h-28 resize-y`}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t.analyze.textareaPlaceholder}
              />
              <span className="text-xs text-faint">
                {t.analyze.textareaHint}
              </span>
            </label>
          </div>

          <div className="mb-5">
            <span className="mb-2 block text-sm font-medium text-foreground">
              {t.analyze.filterLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              {attrOptions.map((opt) => {
                const active = selected.includes(opt.key);
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => toggle(opt.key)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      active
                        ? "border-accent bg-accent-soft font-medium text-accent"
                        : "border-line bg-surface text-muted hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <PrimaryButton
            onClick={run}
            disabled={tokens.length === 0 || tokens.length > 5}
            loading={status === "loading"}
            loadingLabel={t.common.analyzing}
          >
            {t.analyze.actionLabel}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}