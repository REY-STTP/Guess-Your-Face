"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { X } from "@phosphor-icons/react";
import { GhostButton, PrimaryButton } from "@/components/ui";
import { useLanguage } from "@/lib/i18n/context";

const MAX_OUTPUT = 1024;

export function CropModal({
  file,
  onConfirm,
  onCancel,
}: {
  file: File | null;
  onConfirm: (cropped: File, size: number) => void;
  onCancel: () => void;
}) {
  const { t } = useLanguage();
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [viewSize, setViewSize] = useState(0);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ px: number; py: number; ox: number; oy: number } | null>(
    null
  );

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const im = new Image();
    im.onload = () => {
      setImg(im);
      setSrcUrl(url);
    };
    im.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setViewSize(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [file]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  if (!file) return null;

  const ready = img !== null && srcUrl !== null && viewSize > 0;

  const iw = img?.naturalWidth ?? 0;
  const ih = img?.naturalHeight ?? 0;
  const coverScale =
    iw > 0 && ih > 0 ? Math.max(viewSize / iw, viewSize / ih) : 1;
  const effScale = coverScale * scale;
  const dw = iw * effScale;
  const dh = ih * effScale;
  const clampX = Math.max(0, (dw - viewSize) / 2);
  const clampY = Math.max(0, (dh - viewSize) / 2);
  const cx = ready ? Math.max(-clampX, Math.min(clampX, offset.x)) : 0;
  const cy = ready ? Math.max(-clampY, Math.min(clampY, offset.y)) : 0;
  const tx = ready ? (viewSize - dw) / 2 + cx : 0;
  const ty = ready ? (viewSize - dh) / 2 + cy : 0;

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!ready) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { px: e.clientX, py: e.clientY, ox: cx, oy: cy };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const nx = dragRef.current.ox + (e.clientX - dragRef.current.px);
    const ny = dragRef.current.oy + (e.clientY - dragRef.current.py);
    setOffset({
      x: Math.max(-clampX, Math.min(clampX, nx)),
      y: Math.max(-clampY, Math.min(clampY, ny)),
    });
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  const applyCrop = () => {
    if (!ready || !img) return;
    const sx = (0 - tx) / effScale;
    const sy = (0 - ty) / effScale;
    const sw = viewSize / effScale;
    const outSize = Math.min(Math.round(sw), MAX_OUTPUT);
    const canvas = document.createElement("canvas");
    canvas.width = outSize;
    canvas.height = outSize;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, sx, sy, sw, sw, 0, 0, outSize, outSize);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        onConfirm(
          new File([blob], "crop.jpg", { type: "image/jpeg" }),
          outSize
        );
      },
      "image/jpeg",
      0.92
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="crop-title"
        className="w-full max-w-md rounded-3xl border border-line bg-surface p-5 sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="crop-title" className="text-sm font-semibold text-foreground">
            {t.common.cropTitle}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            aria-label={t.common.close}
            className="rounded-md p-1.5 text-muted transition-colors hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>

        <div
          ref={containerRef}
          className="relative aspect-square w-full touch-none select-none overflow-hidden rounded-2xl border border-line bg-surface2"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {ready ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={srcUrl}
                alt=""
                draggable={false}
                className="absolute max-w-none cursor-grab active:cursor-grabbing"
                style={{ width: dw, height: dh, left: tx, top: ty }}
              />
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/3 top-0 h-full w-px bg-white/25" />
                <div className="absolute left-2/3 top-0 h-full w-px bg-white/25" />
                <div className="absolute left-0 top-1/3 h-px w-full bg-white/25" />
                <div className="absolute left-0 top-2/3 h-px w-full bg-white/25" />
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">
              {t.common.cropLoading}
            </div>
          )}
        </div>

        <label className="mt-4 flex items-center gap-3 text-xs text-faint">
          {t.common.cropZoom}
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="h-1.5 flex-1 cursor-pointer accent-accent"
          />
        </label>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <GhostButton onClick={onCancel} className="w-full sm:w-auto">
            {t.common.cropCancel}
          </GhostButton>
          <PrimaryButton
            onClick={applyCrop}
            disabled={!ready}
            className="w-full sm:w-auto"
          >
            {t.common.cropApply}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}