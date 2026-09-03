import type { Metadata } from "next";
import { AnalyzeClient } from "./page.client";
import { ToolStructuredData } from "@/components/ToolStructuredData";
import { ToolTldr } from "@/components/ToolTldr";

export const metadata: Metadata = {
  title: "Analyze Face Tokens — Deep Attribute Inspector (Up to 5 Tokens)",
  description:
    "Inspect up to 5 face tokens for deep attributes: gender, age, emotion, smiling, face quality, beauty, mouth status (mask detection), and eye status (glasses / occlusion). Reuse face tokens from Detect without re-uploading.",
  keywords: [
    "face token",
    "face token analysis",
    "mask detection",
    "eye status",
    "glasses detection",
    "deep attribute inspector",
    "Face++ analyze",
  ],
  alternates: {
    canonical: "/analyze",
    languages: {
      id: "/analyze",
      en: "/en/analyze",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Guess Your Face",
    title: "Analyze — Guess Your Face",
    description:
      "Deep inspection for up to 5 face tokens: mask, glasses, emotion, beauty and more.",
    url: "/analyze",
  },
  twitter: {
    card: "summary_large_image",
    title: "Analyze — Guess Your Face",
    description:
      "Deep inspection for up to 5 face tokens: mask, glasses, emotion, beauty and more.",
  },
};

export default function AnalyzePage() {
  return (
    <>
      <ToolStructuredData slug="analyze" />
      <ToolTldr slug="analyze" />
      <AnalyzeClient />
    </>
  );
}