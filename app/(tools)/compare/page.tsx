import type { Metadata } from "next";
import { CompareClient } from "./page.client";
import { ToolStructuredData } from "@/components/ToolStructuredData";
import { ToolTldr } from "@/components/ToolTldr";

export const metadata: Metadata = {
  title: "Bandingkan Wajah — Verifikasi Identitas 1:1",
  description:
    "Verifikasi dua foto wajah milik orang yang sama (1:1) dengan skor confidence. Gratis, real-time, tanpa menyimpan data.",
  keywords: [
    "perbandingan wajah",
    "pencocokan wajah 1:1",
    "verifikasi wajah",
    "verifikasi identitas",
    "skor confidence",
    "ambang false-positive",
    "face comparison",
    "Face++",
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
    title: "Bandingkan — Guess Your Face",
    description:
      "Pencocokan wajah 1:1 dengan skor confidence dan ambang Face++.",
    url: "/compare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bandingkan — Guess Your Face",
    description:
      "Pencocokan wajah 1:1 dengan skor confidence dan ambang Face++.",
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