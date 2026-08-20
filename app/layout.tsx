import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import "sonner/dist/styles.css";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LanguageProvider } from "@/lib/i18n/context";

export const metadata: Metadata = {
  title: {
    default: "Guess Your Face",
    template: "%s - Guess Your Face",
  },
  description:
    "Real-time AI-powered facial emotion detection, comparison, and attribute analysis playground.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <LanguageProvider>
          <SiteHeader />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter />
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