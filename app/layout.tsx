import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import "sonner/dist/styles.css";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LanguageProvider } from "@/lib/i18n/context";
import { StructuredData } from "@/components/StructuredData";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.guess-your-face.web.id";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Guess Your Face — Baca wajahmu dengan AI real-time",
    template: "%s - Guess Your Face",
  },
  description:
    "Guess Your Face adalah playground analisis wajah AI gratis dan real-time berteknologi Face++. Deteksi wajah, bandingkan dua potret (1:1), dan periksa token wajah — diproses di memori tanpa menyimpan data.",
  applicationName: "Guess Your Face",
  keywords: [
    "Guess Your Face",
    "deteksi wajah",
    "tes emosi wajah",
    "perbandingan wajah",
    "face token",
    "Face++",
    "analisis wajah AI",
    "privasi",
    "tanpa menyimpan data",
    "face detection",
    "facial emotion recognition",
    "face comparison",
    "Indonesian",
    "English",
  ],
  authors: [{ name: "REY-STTP", url: "https://github.com/REY-STTP" }],
  creator: "REY-STTP",
  publisher: "REY-STTP",
  category: "DeveloperApplication",
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
      "Deteksi wajah AI real-time, perbandingan 1:1, dan analisis token. Privasi utama, tanpa menyimpan data.",
    url: "/",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Guess Your Face — Baca wajahmu dengan AI real-time",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guess Your Face — Baca wajahmu dengan AI real-time",
    description:
      "Deteksi wajah AI real-time, perbandingan 1:1, dan analisis token. Privasi utama.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Guess Your Face — Read your face with real-time AI",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", rel: "icon", type: "image/x-icon" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
  manifest: "/manifest.webmanifest",
  verification: {
    // Google Search Console verification token.
    google: "Y7vUvy3ieL5E3-uUMiCEqb3M_yvHBxMQrytRpNfMOpU",
    other: {
      "msvalidate.01": "251DD7C241139056B7F36D7E05ABA7E2",
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="h-full antialiased">
      <head>
        <link rel="alternate" type="text/plain" title="LLMs" href="/llms.txt" />
        <link rel="alternate" type="text/plain" title="LLMs (full)" href="/llms-full.txt" />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <LanguageProvider>
          <SiteHeader />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter />
          <StructuredData />
          <Toaster
            theme="system"
            position="bottom-right"
            gap={8}
            closeButton
            toastOptions={{
              style: {
                fontFamily: "var(--font-sans)",
                borderRadius: "1rem",
                border: "1px solid var(--line)",
                background: "var(--surface)",
                color: "var(--foreground)",
              },
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}