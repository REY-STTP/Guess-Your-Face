import type { Metadata } from "next";
import { DetectClient } from "./page.client";
import { ToolStructuredData } from "@/components/ToolStructuredData";
import { ToolTldr } from "@/components/ToolTldr";

export const metadata: Metadata = {
  title: "Detect Faces — Multi-Face Emotion, Age & Attribute Analysis",
  description:
    "Upload a photo to detect all faces at once. Guess Your Face reads 7 emotions, age, gender, smile intensity, beauty score, 3D headpose, and face quality — powered by Face++, real-time and zero-retention.",
  keywords: [
    "face detection",
    "multi-face detection",
    "emotion recognition",
    "age estimation",
    "gender detection",
    "beauty score",
    "headpose",
    "face quality",
    "Face++",
  ],
  alternates: {
    canonical: "/detect",
    languages: {
      id: "/detect",
      en: "/en/detect",
    },
  },
  openGraph: {
    type: "website",
    title: "Detect — Guess Your Face",
    description:
      "Upload a photo, detect all faces, and read 7 emotions plus 10+ attributes in real time.",
    url: "/detect",
  },
  twitter: {
    card: "summary_large_image",
    title: "Detect — Guess Your Face",
    description:
      "Upload a photo, detect all faces, and read 7 emotions plus 10+ attributes in real time.",
  },
};

export default function DetectPage() {
  return (
    <>
      <ToolStructuredData slug="detect" />
      <ToolTldr slug="detect" />
      <DetectClient />
    </>
  );
}