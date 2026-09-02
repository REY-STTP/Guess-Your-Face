import { renderToolOg } from "@/components/og/ToolOgTemplate";

export const runtime = "nodejs";
export const alt = "Analyze — Guess Your Face";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function AnalyzeOg() {
  return renderToolOg({
    toolLabel: "ANALYZE",
    toolBadge: "DEEP BATCH INSPECTOR",
    headlineLines: ["Inspect face tokens.", "Skip the re-upload."],
    subtitle:
      "Paste up to 5 face tokens from Detect. Get mask, glasses, eye status, emotion, beauty and more.",
    highlights: [
      "Up to 5 tokens",
      "Mask detection",
      "Glasses detection",
      "Eye status",
    ],
  });
}