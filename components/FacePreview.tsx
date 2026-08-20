"use client";

import type { ImageDims } from "@/lib/use-image-upload";
import type { FaceRectangle } from "@/lib/facepp";

export type FaceBox = {
  index: number;
  rect: FaceRectangle;
};

export function FacePreview({
  src,
  dims,
  boxes = [],
  maxWidth = "max-w-md",
}: {
  src: string;
  dims: ImageDims | null;
  boxes?: FaceBox[];
  maxWidth?: string;
}) {
  return (
    <div
      className={`relative w-full ${maxWidth} mx-auto overflow-hidden rounded-2xl border border-line bg-surface2`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Pratinjau wajah"
        className="block h-auto w-full"
      />
      {boxes.map((box) => (
        <div
          key={box.index}
          className="absolute border-2 border-accent/90"
          style={{
            left: `${(box.rect.left / (dims?.w ?? 1)) * 100}%`,
            top: `${(box.rect.top / (dims?.h ?? 1)) * 100}%`,
            width: `${(box.rect.width / (dims?.w ?? 1)) * 100}%`,
            height: `${(box.rect.height / (dims?.h ?? 1)) * 100}%`,
          }}
        >
          <span className="absolute -left-0.5 -top-0.5 rounded-br-md rounded-tl-md bg-accent px-1.5 py-0.5 font-mono text-[10px] font-semibold text-accent-ink">
            {box.index + 1}
          </span>
        </div>
      ))}
    </div>
  );
}