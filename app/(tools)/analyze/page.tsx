import type { Metadata } from "next";
import { AnalyzeClient } from "./page.client";
import { ToolStructuredData } from "@/components/ToolStructuredData";
import { ToolTldr } from "@/components/ToolTldr";

export const metadata: Metadata = {
  title: "Analisis Token Wajah — Inspektor Atribut Mendalam (Hingga 5 Token)",
  description:
    "Inspeksi hingga 5 token wajah: masker, kacamata, emosi, dan atribut mendalam. Tanpa unggah ulang, tanpa menyimpan data.",
  keywords: [
    "face token",
    "analisis token wajah",
    "deteksi masker",
    "status mata",
    "deteksi kacamata",
    "inspektor atribut",
    "Face++",
  ],
  alternates: {
    canonical: "/analyze",
    languages: {
      "id-ID": "/analyze",
      "x-default": "/analyze",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Guess Your Face",
    title: "Analisis — Guess Your Face",
    description:
      "Inspeksi mendalam hingga 5 token wajah: masker, kacamata, emosi, beauty, dan lainnya.",
    url: "/analyze",
  },
  twitter: {
    card: "summary_large_image",
    title: "Analisis — Guess Your Face",
    description:
      "Inspeksi mendalam hingga 5 token wajah: masker, kacamata, emosi, beauty, dan lainnya.",
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