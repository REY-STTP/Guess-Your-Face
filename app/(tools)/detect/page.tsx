import type { Metadata } from "next";
import { DetectClient } from "./page.client";
import { ToolStructuredData } from "@/components/ToolStructuredData";
import { ToolTldr } from "@/components/ToolTldr";

export const metadata: Metadata = {
  title: "Deteksi Wajah — Emosi, Usia & Atribut Multi-Wajah",
  description:
    "Deteksi semua wajah dalam foto sekaligus: 7 emosi, usia, gender, senyum, dan kualitas wajah. Real-time, gratis, tanpa menyimpan data.",
  keywords: [
    "deteksi wajah",
    "deteksi multi-wajah",
    "pengenalan emosi",
    "estimasi usia",
    "deteksi gender",
    "skor beauty",
    "headpose",
    "kualitas wajah",
    "face detection",
    "Face++",
  ],
  alternates: {
    canonical: "/detect",
    languages: {
      "id-ID": "/detect",
      "x-default": "/detect",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Guess Your Face",
    title: "Deteksi — Guess Your Face",
    description:
      "Unggah foto, deteksi semua wajah, dan baca 7 emosi plus 10+ atribut secara real-time.",
    url: "/detect",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deteksi — Guess Your Face",
    description:
      "Unggah foto, deteksi semua wajah, dan baca 7 emosi plus 10+ atribut secara real-time.",
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