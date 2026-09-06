import type { Metadata } from "next";
import { HomeClient } from "./page.client";
import { MarketingSections } from "@/components/MarketingSections";
import { FaqStructuredData } from "@/components/FaqStructuredData";

export const metadata: Metadata = {
  title: "Guess Your Face — Baca wajahmu dengan AI real-time",
  description:
    "Playground analisis wajah AI gratis dan real-time. Deteksi wajah, bandingkan dua potret (pencocokan 1:1), dan periksa token wajah — berteknologi Face++ tanpa menyimpan data. Tanpa login, tanpa daftar.",
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Guess Your Face",
    title: "Guess Your Face — Baca wajahmu dengan AI real-time",
    description:
      "Deteksi wajah, perbandingan, dan analisis token AI gratis dan real-time. Privasi utama.",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Guess Your Face — Baca wajahmu dengan AI real-time",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <HomeClient />
      <MarketingSections />
      <FaqStructuredData />
    </>
  );
}