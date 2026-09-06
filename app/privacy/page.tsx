import type { Metadata } from "next";
import { PrivacyClient } from "./page.client";

const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.guess-your-face.web.id";

export const metadata: Metadata = {
  title: "Privasi",
  description:
    "Kebijakan privasi Guess Your Face: foto diproses di memori dan langsung dibuang, tanpa akun, tanpa database, tanpa pelacakan.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    type: "website",
    siteName: "Guess Your Face",
    title: "Privasi — Guess Your Face",
    description:
      "Foto diproses di memori dan langsung dibuang. Tanpa akun, tanpa database.",
    url: "/privacy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Privasi — Guess Your Face",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privasi — Guess Your Face",
    description:
      "Foto diproses di memori dan langsung dibuang. Tanpa akun, tanpa database.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

const webpageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/privacy#webpage`,
  url: `${SITE_URL}/privacy`,
  name: "Privasi — Guess Your Face",
  description: "Kebijakan privasi Guess Your Face.",
  isPartOf: { "@id": `${SITE_URL}#website` },
  inLanguage: ["id", "en"],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Privasi", item: `${SITE_URL}/privacy` },
  ],
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(webpageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:py-14">
        <PrivacyClient />
      </main>
    </>
  );
}
