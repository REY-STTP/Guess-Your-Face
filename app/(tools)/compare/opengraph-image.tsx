import { renderToolOg } from "@/components/og/ToolOgTemplate";

export const runtime = "nodejs";
export const alt = "Compare — Guess Your Face";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function CompareOg() {
  return renderToolOg({
    toolLabel: "COMPARE",
    toolBadge: "1:1 VERIFICATION",
    headlineLines: ["Same person?", "Let AI verify."],
    subtitle:
      "Upload two portraits and a confidence score, plus Face++ false-positive thresholds, in one read.",
    highlights: [
      "1:1 matching",
      "Confidence score",
      "Threshold verdicts",
      "Zero data retention",
    ],
  });
}