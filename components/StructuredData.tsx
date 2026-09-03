/**
 * Server-rendered JSON-LD structured data for the root layout.
 * Renders Organization + WebSite schema; per-tool schemas are
 * emitted from each tool page itself (see the (tools) group page files).
 *
 * Logo URL must be an absolute URL with declared width/height for
 * Google Knowledge Panel eligibility.
 */
const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.guess-your-face.web.id";
const LOGO_URL = `${SITE_URL}/icon.png`;

export function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: "Guess Your Face",
    alternateName: ["GYF", "GuessYourFace"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
      caption: "Guess Your Face",
    },
    image: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    description:
      "Guess Your Face is a free, real-time AI facial analysis web app powered by Face++. Multi-face detection, 1:1 comparison, and face-token analysis with zero data retention.",
    foundingDate: "2025",
    sameAs: [
      "https://github.com/REY-STTP/Guess-Your-Face",
      "https://github.com/REY-STTP",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "technical support",
      url: "https://github.com/REY-STTP/Guess-Your-Face/issues",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: "Guess Your Face",
    url: SITE_URL,
    inLanguage: ["id", "en"],
    description:
      "Real-time AI facial detection, comparison, and token analysis. Privacy-first.",
    publisher: { "@id": `${SITE_URL}#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/detect?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
