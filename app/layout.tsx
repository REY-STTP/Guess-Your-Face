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

// Bing Webmaster Tools verification token for the site.
const BING_SITE_VERIFICATION = "251DD7C241139056B7F36D7E05ABA7E2";

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
    default: "Guess Your Face — Read your face with real-time AI",
    template: "%s - Guess Your Face",
  },
  description:
    "Guess Your Face is a free, real-time AI facial analysis playground powered by Face++. Detect faces, compare two portraits (1:1), and inspect face tokens — all processed in-memory with zero data retention.",
  applicationName: "Guess Your Face",
  keywords: [
    "Guess Your Face",
    "GYF",
    "face detection",
    "facial emotion recognition",
    "face comparison",
    "1:1 face matching",
    "face token",
    "Face++",
    "AI face analysis",
    "privacy-first",
    "zero data retention",
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
      id: "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Guess Your Face",
    title: "Guess Your Face — Read your face with real-time AI",
    description:
      "Real-time AI facial detection, 1:1 comparison, and token analysis. Privacy-first, zero data retention.",
    url: "/",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Guess Your Face — Read your face with real-time AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guess Your Face — Read your face with real-time AI",
    description:
      "Real-time AI facial detection, 1:1 comparison, and token analysis.",
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
      "msvalidate.01": BING_SITE_VERIFICATION,
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