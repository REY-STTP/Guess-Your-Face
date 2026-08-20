"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { CropModal } from "@/components/CropModal";

const ACCEPTED = ["image/jpeg", "image/png"];

export type ImageDims = { w: number; h: number };

export function useImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dims, setDims] = useState<ImageDims | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [cropKey, setCropKey] = useState(0);
  const instanceId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const pick = useCallback((f: File | null) => {
    if (!f) return;
    if (!ACCEPTED.includes(f.type)) {
      toast.error("Gunakan file gambar JPG atau PNG.");
      return;
    }
    if (inputRef.current) inputRef.current.value = "";
    setCropKey((k) => k + 1);
    setPendingFile(f);
  }, []);

  const confirmCrop = useCallback((cropped: File, size: number) => {
    setFile(cropped);
    setPreview(URL.createObjectURL(cropped));
    setDims({ w: size, h: size });
    setPendingFile(null);
    setDragOver(false);
  }, []);

  const cancelCrop = useCallback(() => {
    setPendingFile(null);
    setDragOver(false);
  }, []);

  const clear = useCallback(() => {
    setFile(null);
    setPreview(null);
    setDims(null);
    setPendingFile(null);
    setDragOver(false);
  }, []);

  const cropModal: ReactNode = (
    <CropModal
      key={`${instanceId}-${cropKey}`}
      file={pendingFile}
      onConfirm={confirmCrop}
      onCancel={cancelCrop}
    />
  );

  return {
    file,
    preview,
    dims,
    dragOver,
    inputRef,
    pick,
    clear,
    setDragOver,
    cropModal,
  };
}