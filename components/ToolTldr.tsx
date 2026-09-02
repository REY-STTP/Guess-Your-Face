/**
 * Server-rendered TL;DR + "how it works" block for each tool page.
 * Sits between the client tool component and the main interactive area.
 * Pure HTML, crawlable, quote-friendly.
 */
type TldrConfig = {
  tldr: string;
  steps: string[];
};

const CONFIG: Record<"detect" | "compare" | "analyze", TldrConfig> = {
  detect: {
    tldr:
      "Upload a photo to detect every face at once and read seven emotions (Anger, Disgust, Fear, Happiness, Neutral, Sadness, Surprise), age, gender, smile intensity, beauty score, 3D headpose, and face quality. Results render in real time with interactive bounding boxes drawn on each detected face.",
    steps: [
      "Drop a JPG or PNG photo (max 2 MB) into the dropzone.",
      "Crop to 1:1 with the interactive canvas if needed.",
      "Read the per-face metric cards: emotion bars, age, gender, smile, beauty, headpose, face quality.",
      "Copy each face_token to inspect deeper attributes in Analyze.",
    ],
  },
  compare: {
    tldr:
      "Upload two portrait photos and decide whether they show the same person (1:1 face matching). Guess Your Face returns a confidence score and applies Face++ false-positive thresholds (1e-3, 1e-4, 1e-5) so you can pick how strict the verdict should be.",
    steps: [
      "Drop the first photo (Photo 1) into the left dropzone.",
      "Drop the second photo (Photo 2) into the right dropzone.",
      "Crop each independently to 1:1 if needed.",
      "Read the confidence score and the threshold verdict (Same / Different).",
    ],
  },
  analyze: {
    tldr:
      "Paste up to 5 face_tokens from a previous Detect run to inspect deep attributes without re-uploading the photo: gender, age, emotion, smiling, face quality, beauty, mouth status (surgical / medical mask), and eye status (glasses / sunglasses / occlusion).",
    steps: [
      "Copy one or more face_tokens from the Detect result cards.",
      "Paste them into the textarea (comma- or newline-separated).",
      "Pick which attributes to analyze (modular filters).",
      "Read the deep attribute breakdown per token.",
    ],
  },
};

export function ToolTldr({ slug }: { slug: "detect" | "compare" | "analyze" }) {
  const cfg = CONFIG[slug];

  return (
    <section
      aria-label={`${slug} summary`}
      className="mx-auto mb-10 max-w-3xl rounded-2xl border border-line bg-surface2/60 p-5 text-sm leading-relaxed text-muted"
    >
      <p className="text-base text-foreground">
        <strong className="font-semibold">TL;DR.</strong> {cfg.tldr}
      </p>
      <ol className="mt-4 list-decimal space-y-1 pl-5">
        {cfg.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  );
}