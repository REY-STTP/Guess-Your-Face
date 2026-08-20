"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useImageUpload } from "@/lib/use-image-upload";
import { sortedEmotions, translateGender } from "@/lib/emotions";
import type { DetectResult, FaceRectangle } from "@/lib/facepp";
import { Dropzone, PreviewActions, PrimaryButton, GhostButton, FaceToken } from "@/components/ui";
import { EmotionBars } from "@/components/EmotionBars";
import { FacePreview } from "@/components/FacePreview";
import { useLanguage } from "@/lib/i18n/context";

type Status = "idle" | "loading" | "result" | "error";

const TOKEN_STORAGE_KEY = "guess-face-tokens";

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-faint">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

export function DetectTool() {
  const { file, preview, dims, dragOver, pick, clear, setDragOver, inputRef, cropModal } =
    useImageUpload();
  const router = useRouter();
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<DetectResult | null>(null);

  const run = async () => {
    if (!file) return;
    setStatus("loading");

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await fetch("/api/detect", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        toast.error(data.error ?? t.detect.toasts.unknownError);
        return;
      }
      const payload = data as DetectResult;
      setResult(payload);
      setStatus("result");
      const tokens = payload.faces.map((f) => f.face_token).join("\n");
      sessionStorage.setItem(TOKEN_STORAGE_KEY, tokens);
      try {
        await navigator.clipboard.writeText(tokens);
        toast.success(t.detect.toasts.tokensCopied);
      } catch {
        toast(t.common.manualCopyToast);
      }
    } catch {
      setStatus("error");
      toast.error(t.detect.toasts.connectionError);
    }
  };

  const boxes =
    (result?.faces ?? []).map((face, i) => ({
      index: i,
      rect: face.face_rectangle as FaceRectangle,
    })) ?? [];

  const reset = () => {
    clear();
    setResult(null);
    setStatus("idle");
  };

  return (
    <div>
      {status === "result" && result ? (
        <div className="animate-rise">
          <div className="grid gap-5 lg:grid-cols-2">
            <div>
              <FacePreview src={preview ?? ""} dims={dims} boxes={boxes} />
              <p className="mt-3 text-xs text-faint">
                {(result.faces ?? []).length} {t.detect.faceDetected}. {t.detect.indexInfo}
              </p>
            </div>

            <ul className="space-y-4">
              {(result.faces ?? []).map((face, i) => {
                const attrs = face.attributes ?? {};
                const emotions = sortedEmotions(attrs.emotion, t.emotions);
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
                const pose =
                  attrs.headpose &&
                  typeof attrs.headpose.yaw_angle === "number" &&
                  typeof attrs.headpose.pitch_angle === "number"
                    ? attrs.headpose
                    : null;
                return (
                  <li
                    key={face.face_token}
                    className="rounded-2xl border border-line bg-surface p-5"
                  >
                    <div className="mb-4 border-b border-line pb-3">
                      <h2 className="font-display text-base font-semibold">
                        {t.detect.faceTitle} {i + 1}
                      </h2>
                      <div className="mt-2">
                        <FaceToken token={face.face_token ?? ""} />
                      </div>
                    </div>

                    <EmotionBars emotions={emotions} />

                    <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
                      <Metric
                        label={t.detect.metrics.gender}
                        value={translateGender(attrs.gender?.value, t.emotions)}
                      />
                      <Metric
                        label={t.detect.metrics.age}
                        value={age != null ? `${age} ${t.common.yearsOld}` : "-"}
                      />
                      <Metric
                        label={t.detect.metrics.smiling}
                        value={smiling != null ? `${smiling.toFixed(0)}%` : "-"}
                      />
                      <Metric
                        label={t.detect.metrics.beauty}
                        value={avgBeauty != null ? `${avgBeauty}/100` : "-"}
                      />
                      <Metric
                        label={t.detect.metrics.faceQuality}
                        value={faceQuality != null ? `${faceQuality.toFixed(0)}/100` : "-"}
                      />
                      <Metric
                        label={t.detect.metrics.headpose}
                        value={
                          pose
                            ? `y ${pose.yaw_angle.toFixed(0)}° · p ${pose.pitch_angle.toFixed(0)}°`
                            : "-"
                        }
                      />
                    </dl>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
            <GhostButton onClick={reset}>{t.detect.detectAnother}</GhostButton>
            <PrimaryButton onClick={() => router.push("/analyze")}>
              {t.detect.goToAnalyze}
              <ArrowRight size={16} />
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <div>
          <Dropzone
            preview={preview}
            dragOver={dragOver}
            onPick={(f) => pick(f)}
            onDragOver={setDragOver}
            label={t.common.dropzoneLabel}
            hint={t.common.dropzoneHint}
            inputRef={inputRef}
          />

          {preview && (
            <div className="animate-rise">
              <FacePreview src={preview} dims={dims} />
              <PreviewActions
                onClear={clear}
                onAction={run}
                actionLabel={t.detect.actionLabel}
                loading={status === "loading"}
                loadingLabel={t.common.analyzing}
                className="mx-auto w-full max-w-md"
              />
            </div>
          )}
        </div>
      )}
      {cropModal}
    </div>
  );
}