import type { Metadata } from "next";
import { CompareClient } from "./page.client";
import { ToolStructuredData } from "@/components/ToolStructuredData";
import { ToolTldr } from "@/components/ToolTldr";

export const metadata: Metadata = {
  title: "Compare Faces — 1:1 Identity Verification with Confidence Score",
  description:
    "Compare two facial photos to verify if they belong to the same person (1:1 matching). Guess Your Face returns a matching confidence score and applies Face++ false-positive thresholds (1e-3, 1e-4, 1e-5).",
  keywords: [
    "face comparison",
    "1:1 face matching",
    "face verification",
    "identity verification",
    "Face++ compare",
    "confidence score",
    "false-positive threshold",
  ],
  alternates: {
    canonical: "/compare",
    languages: {
      "id-ID": "/compare",
      "x-default": "/compare",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Guess Your Face",
    title: "Compare — Guess Your Face",
    description:
      "1:1 face matching with confidence score and Face++ thresholds.",
    url: "/compare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare — Guess Your Face",
    description:
      "1:1 face matching with confidence score and Face++ thresholds.",
  },
};

export default function ComparePage() {
  return (
    <>
      <ToolStructuredData slug="compare" />
      <ToolTldr slug="compare" />
      <CompareClient />
    </>
  );
}