"use client";

import { ArrowUp, Check, Copy, UploadSimple } from "@phosphor-icons/react";
import { useState } from "react";
import type { DragEvent, ReactNode, RefObject } from "react";
import { useLanguage } from "@/lib/i18n/context";

export function PrimaryButton({
  children,
  onClick,
  disabled,
  loading,
  loadingLabel,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-accent-ink transition-[transform,opacity] hover:opacity-90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ${className}`}
    >
      {loading ? (
        <>
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-accent-ink/30 border-t-accent-ink" />
          {loadingLabel ?? children}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  disabled,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent/50 hover:text-foreground active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
      {hint && <span className="text-xs text-faint">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-line bg-surface2 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-faint focus:border-accent";

export function Dropzone({
  preview,
  dragOver,
  onPick,
  onDragOver,
  label,
  hint,
  inputRef,
}: {
  preview: string | null;
  dragOver: boolean;
  onPick: (file: File | null) => void;
  onDragOver: (over: boolean) => void;
  label?: string;
  hint?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
}) {
  const { t } = useLanguage();
  if (preview) {
    return null;
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    onDragOver(false);
    onPick(e.dataTransfer.files?.[0] ?? null);
  };

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          onDragOver(true);
        }}
        onDragLeave={() => onDragOver(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors focus-within:border-accent ${
          dragOver
            ? "border-accent bg-accent-soft"
            : "border-line bg-surface hover:border-accent/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={(e) => onPick(e.target.files?.[0] ?? null)}
        />
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface2">
          <UploadSimple size={20} className="text-accent" />
        </div>
        <p className="text-sm font-medium text-foreground">
          {label ?? t.common.dropzoneLabel}
        </p>
        <p className="mt-1 text-xs text-faint">
          {hint ?? t.common.dropzoneHint}
        </p>
      </label>
    </div>
  );
}

export function PreviewActions({
  onClear,
  onAction,
  actionLabel,
  loading,
  loadingLabel,
  className = "",
}: {
  onClear: () => void;
  onAction: () => void;
  actionLabel: string;
  loading?: boolean;
  loadingLabel?: string;
  className?: string;
}) {
  const { t } = useLanguage();
  return (
    <div className={`mt-5 flex flex-col gap-3 sm:flex-row ${className}`}>
      <div className="flex-1">
        <GhostButton onClick={onClear} disabled={loading} className="w-full">
          <ArrowUp size={16} className="rotate-45" />
          {t.common.changeImage}
        </GhostButton>
      </div>
      <div className="flex-1">
        <PrimaryButton
          onClick={onAction}
          loading={loading}
          loadingLabel={loadingLabel}
          className="w-full"
        >
          {actionLabel}
        </PrimaryButton>
      </div>
    </div>
  );
}

export function FaceToken({ token }: { token: string }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard tidak tersedia; abaikan
    }
  };

  return (
    <div className="flex items-start gap-2">
      <code className="min-w-0 flex-1 break-all font-mono text-[11px] leading-relaxed text-faint">
        {token}
      </code>
      <button
        type="button"
        onClick={copy}
        title={t.common.copyFaceToken}
        aria-label={t.common.copyFaceToken}
        className="shrink-0 p-1 text-muted transition-colors hover:text-accent focus-visible:rounded-md"
      >
        {copied ? (
          <Check size={14} className="text-accent" />
        ) : (
          <Copy size={14} />
        )}
      </button>
    </div>
  );
}