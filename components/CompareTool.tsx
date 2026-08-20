"use client";

import { useState } from "react";
import { Equals } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useImageUpload } from "@/lib/use-image-upload";
import type { CompareResult, FaceRectangle } from "@/lib/facepp";
import { Dropzone, GhostButton, PrimaryButton } from "@/components/ui";
import { FacePreview } from "@/components/FacePreview";
import { useLanguage } from "@/lib/i18n/context";

type Status = "idle" | "loading" | "result" | "error";

export function CompareTool() {
  const left = useImageUpload();
  const right = useImageUpload();
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<CompareResult | null>(null);

  const run = async () => {
    if (!left.file || !right.file) return;
    setStatus("loading");

    const form = new FormData();
    form.append("file1", left.file);
    form.append("file2", right.file);

    try {
      const res = await fetch("/api/compare", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        toast.error(data.error ?? t.compare.toasts.unknownError);
        return;
      }
      setResult(data as CompareResult);
      setStatus("result");
    } catch {
      setStatus("error");
      toast.error(t.compare.toasts.connectionError);
    }
  };

  const reset = () => {
    left.clear();
    right.clear();
    setResult(null);
    setStatus("idle");
  };

  const leftBoxes: { index: number; rect: FaceRectangle }[] =
    (result?.faces1 ?? []).map((f, i) => ({
      index: i,
      rect: f.face_rectangle,
    })) ?? [];
  const rightBoxes: { index: number; rect: FaceRectangle }[] =
    (result?.faces2 ?? []).map((f, i) => ({
      index: i,
      rect: f.face_rectangle,
    })) ?? [];

  const thresholds = result?.thresholds
    ? Object.entries(result.thresholds)
    : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-3">
          {left.preview ? (
            <div className="animate-rise">
              <FacePreview
                src={left.preview}
                dims={left.dims}
                boxes={leftBoxes}
              />
              <GhostButton
                onClick={left.clear}
                disabled={status === "loading"}
                className="mt-3 w-full"
              >
                {t.compare.changePhoto1}
              </GhostButton>
            </div>
          ) : (
            <Dropzone
              preview={left.preview}
              dragOver={left.dragOver}
              onPick={(f) => left.pick(f)}
              onDragOver={left.setDragOver}
              label={t.compare.photo1Label}
              hint={t.common.dropzoneHint}
              inputRef={left.inputRef}
            />
          )}
        </div>

        <div className="space-y-3">
          {right.preview ? (
            <div className="animate-rise">
              <FacePreview
                src={right.preview}
                dims={right.dims}
                boxes={rightBoxes}
              />
              <GhostButton
                onClick={right.clear}
                disabled={status === "loading"}
                className="mt-3 w-full"
              >
                {t.compare.changePhoto2}
              </GhostButton>
            </div>
          ) : (
            <Dropzone
              preview={right.preview}
              dragOver={right.dragOver}
              onPick={(f) => right.pick(f)}
              onDragOver={right.setDragOver}
              label={t.compare.photo2Label}
              hint={t.common.dropzoneHint}
              inputRef={right.inputRef}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <PrimaryButton
          onClick={run}
          disabled={!left.file || !right.file || status === "loading"}
          loading={status === "loading"}
          loadingLabel={t.common.comparing}
          className="w-full sm:w-auto"
        >
          <Equals size={16} />
          {t.compare.actionLabel}
        </PrimaryButton>
        {status === "result" && result && (
          <GhostButton onClick={reset} className="w-full sm:w-auto">
            {t.compare.compareAgain}
          </GhostButton>
        )}
      </div>

      {status === "result" && result && (
        <div className="animate-rise rounded-2xl border border-line bg-surface p-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-faint">
              {t.compare.confidenceTitle}
            </h2>
            <span className="mt-1 font-mono text-5xl font-bold text-accent">
              {typeof result.confidence === "number"
                ? result.confidence.toFixed(1)
                : "-"}
            </span>
            <span className="mt-1 text-xs text-faint">
              {t.compare.confidenceExplanation}
            </span>
          </div>

          <div className="mx-auto mt-5 h-2 max-w-md overflow-hidden rounded-full bg-surface2">
            <div
              className="h-full w-full origin-left rounded-full bg-accent transition-transform duration-500 ease-out"
              style={{
                transform: `scaleX(${Math.min(
                  1,
                  Math.max(0, (typeof result.confidence === "number" ? result.confidence : 0) / 100)
                )})`,
              }}
            />
          </div>

          {thresholds && (
            <div className="mx-auto mt-6 grid max-w-md grid-cols-3 divide-x divide-line rounded-xl bg-surface2 py-3">
              {thresholds.map(([level, value]) => {
                const same =
                  typeof result.confidence === "number" &&
                  result.confidence >= value;
                return (
                  <div key={level} className="px-3 text-center">
                    <p className="font-mono text-[11px] text-faint">{level}</p>
                    <p className="font-mono text-sm font-semibold text-foreground">
                      {value.toFixed(1)}
                    </p>
                    <p
                      className={`mt-0.5 text-[11px] font-medium ${
                        same ? "text-accent" : "text-faint"
                      }`}
                    >
                      {same ? t.compare.same : t.compare.different}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          <p className="mx-auto mt-4 max-w-sm text-center text-xs leading-relaxed text-faint">
            {t.compare.footnote}
          </p>
        </div>
      )}
      {left.cropModal}
      {right.cropModal}
    </div>
  );
}