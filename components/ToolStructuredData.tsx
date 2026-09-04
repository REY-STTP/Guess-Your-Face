/**
 * Server component that emits JSON-LD structured data for a tool page:
 *   - SoftwareApplication schema describing the tool
 *   - BreadcrumbList for the tool path
 *
 * Used inside the server `page.tsx` files for /detect, /compare, /analyze.
 */
type ToolConfig = {
  slug: "detect" | "compare" | "analyze";
  name: string;
  description: string;
  featureList: string[];
  category: string;
};

const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.guess-your-face.web.id";

const TOOL_CONFIG: Record<ToolConfig["slug"], ToolConfig> = {
  detect: {
    slug: "detect",
    name: "Guess Your Face — Detect",
    description:
      "Multi-face detection with 7 emotional spectra, age, gender, smile, beauty, 3D headpose, and face quality scores. Powered by Face++.",
    category: "https://schema.org/MultimediaApplication",
    featureList: [
      "Multi-face detection",
      "7 emotional spectra (Anger, Disgust, Fear, Happiness, Neutral, Sadness, Surprise)",
      "Age estimation",
      "Gender prediction",
      "Smiling score",
      "Beauty score (male & female perception)",
      "3D headpose angles (pitch, roll, yaw)",
      "Face quality score",
      "Interactive bounding boxes",
      "Zero data retention",
    ],
  },
  compare: {
    slug: "compare",
    name: "Guess Your Face — Compare",
    description:
      "1:1 face verification with confidence score and Face++ false-positive thresholds (1e-3, 1e-4, 1e-5).",
    category: "https://schema.org/MultimediaApplication",
    featureList: [
      "1:1 face matching",
      "Confidence score visualization",
      "Face++ false-positive thresholds",
      "Dual image cropper",
      "Same / Different verdict",
      "Zero data retention",
    ],
  },
  analyze: {
    slug: "analyze",
    name: "Guess Your Face — Analyze",
    description:
      "Deep attribute inspector for up to 5 face tokens: gender, age, emotion, smile, face quality, beauty, mouth status (mask), eye status (glasses / occlusion).",
    category: "https://schema.org/MultimediaApplication",
    featureList: [
      "Deep face token analysis",
      "Up to 5 tokens per request",
      "Mouth status (surgical / medical mask, open, occluded)",
      "Eye status (open, closed, glasses, sunglasses, occlusion)",
      "Modular attribute filters",
      "Zero re-upload required",
      "Zero data retention",
    ],
  },
};

export function ToolStructuredData({ slug }: { slug: ToolConfig["slug"] }) {
  const cfg = TOOL_CONFIG[slug];
  const toolUrl = `${SITE_URL}/${cfg.slug}`;

  const ogImageUrl = `${SITE_URL}/og-image.png`;

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${toolUrl}#webapp`,
    name: cfg.name,
    url: toolUrl,
    description: cfg.description,
    applicationCategory: cfg.category,
    operatingSystem: "Any (Web-based)",
    inLanguage: ["id", "en"],
    isAccessibleForFree: true,
    image: ogImageUrl,
    screenshot: ogImageUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: cfg.featureList.join(", "),
    publisher: { "@id": `${SITE_URL}#organization` },
    provider: { "@id": `${SITE_URL}#organization` },
    isPartOf: { "@id": `${SITE_URL}#website` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": toolUrl,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: cfg.name,
        item: toolUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}