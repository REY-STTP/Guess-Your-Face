import type { Metadata } from "next";
import { HomeClient } from "./page.client";
import { MarketingSections } from "@/components/MarketingSections";
import { FaqStructuredData } from "@/components/FaqStructuredData";

export const metadata: Metadata = {
  title: "Guess Your Face — Read your face with real-time AI",
  description:
    "Guess Your Face is a free, real-time AI facial analysis playground. Detect faces, compare two portraits (1:1 matching), and inspect face tokens — powered by Face++ with zero data retention. No login, no signup.",
  alternates: {
    canonical: "/",
    languages: {
      id: "/",
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    title: "Guess Your Face — Read your face with real-time AI",
    description:
      "Free real-time AI face detection, comparison, and token analysis. Privacy-first.",
    url: "/",
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