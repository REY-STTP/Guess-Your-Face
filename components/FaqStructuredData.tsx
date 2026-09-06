/**
 * Server component that emits FAQPage JSON-LD schema in both locales.
 *
 * Two blocks (id + en) with distinct @ids, sourced from the same i18n
 * dictionaries that render the visible FAQ — so each block always matches
 * one visible language state (SSR default = Indonesian, toggle = English).
 */
import { idDictionary } from "@/lib/i18n/dictionaries/id";
import { enDictionary } from "@/lib/i18n/dictionaries/en";

type FaqItem = {
  question: string;
  answer: string;
};

const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.guess-your-face.web.id";

function faqPage(locale: "id" | "en", faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq-${locale}`,
    inLanguage: locale === "id" ? "id-ID" : "en",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function FaqStructuredData() {
  const id = faqPage("id", idDictionary.faqs);
  const en = faqPage("en", enDictionary.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(id) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(en) }}
      />
    </>
  );
}
