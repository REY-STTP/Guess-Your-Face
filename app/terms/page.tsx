import type { Metadata } from "next";
import { TermsClient } from "./page.client";

const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.guess-your-face.web.id";

export const metadata: Metadata = {
  title: "Syarat",
  description:
    "Syarat penggunaan Guess Your Face: gratis apa adanya, hasil estimasi AI, penggunaan yang wajar.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    type: "website",
    siteName: "Guess Your Face",
    title: "Syarat — Guess Your Face",
    description:
      "Gratis apa adanya. Hasil estimasi AI, bukan nasihat profesional.",
    url: "/terms",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Syarat — Guess Your Face",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Syarat — Guess Your Face",
    description:
      "Gratis apa adanya. Hasil estimasi AI, bukan nasihat profesional.",
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
  "@id": `${SITE_URL}/terms#webpage`,
  url: `${SITE_URL}/terms`,
  name: "Syarat — Guess Your Face",
  description: "Syarat penggunaan Guess Your Face.",
  isPartOf: { "@id": `${SITE_URL}#website` },
  inLanguage: ["id", "en"],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Syarat", item: `${SITE_URL}/terms` },
  ],
};

export default function TermsPage() {
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
        <TermsClient />
      </main>
    </>
  );
}
