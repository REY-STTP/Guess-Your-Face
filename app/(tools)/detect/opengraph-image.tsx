import { renderToolOg } from "@/components/og/ToolOgTemplate";

export const runtime = "nodejs";
export const alt = "Detect — Guess Your Face";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function DetectOg() {
  return renderToolOg({
    toolLabel: "DETECT",
    toolBadge: "MULTI-FACE & ATTRIBUTES",
    headlineLines: ["Detect every face.", "Read every emotion."],
    subtitle:
      "Upload one photo. Get 7 emotions, age, gender, smile, beauty, headpose and face quality for every face.",
    highlights: [
      "Multi-face",
      "7 emotions",
      "Age & gender",
      "Beauty score",
      "Headpose",
    ],
  });
}