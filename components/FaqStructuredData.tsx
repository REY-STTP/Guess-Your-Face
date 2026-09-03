/**
 * Server component that emits FAQPage JSON-LD schema.
 *
 * The schema is intentionally English-only to maximise global SEO reach
 * (Google, Bing, AI answer engines). The on-page FAQ in `MarketingSections`
 * is rendered in the user's active locale from the i18n dictionary.
 */

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: "Is Guess Your Face free?",
    answer:
      "Yes, Guess Your Face is completely free. There is no signup, no subscription, and no analytics on your photos. All three tools (Detect, Compare, Analyze) run in your browser against our secure API.",
  },
  {
    question: "Are my photos stored on a server?",
    answer:
      "No. All uploaded images are processed in-memory and immediately discarded after the Face++ API responds. Nothing is written to disk, server, or database. The privacy-first architecture is verifiable in the open-source code.",
  },
  {
    question: "How accurate is the emotion detection?",
    answer:
      "Emotion scores are produced by Face++ deep learning models trained on large datasets. Confidence varies by image quality, lighting, and face angle, but the seven emotion classes (Anger, Disgust, Fear, Happiness, Neutral, Sadness, Surprise) are typically reliable for clear frontal faces.",
  },
  {
    question: "What is the difference between Detect, Compare, and Analyze?",
    answer:
      "Detect finds all faces in a photo and reads 7 emotions plus age, gender, smile, beauty, headpose, and face quality. Compare verifies whether two portrait photos show the same person with a 1:1 matching confidence score. Analyze inspects previously detected faces (via face_token) for deeper attributes like mask wearing, eye status, and glasses, up to 5 tokens per request.",
  },
  {
    question: "What is a face token?",
    answer:
      "A face_token is a unique identifier returned by Face++ for each detected face. You can copy it from Detect results and paste it into the Analyze tool to inspect deep attributes without re-uploading the original photo. Face tokens are session-only and expire automatically.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. Guess Your Face has no login, no signup, and no user accounts. Upload an image, read the result, and close the tab.",
  },
  {
    question: "Which languages are supported?",
    answer:
      "Indonesian (default) and English. Switch via the language toggle in the page header. Your choice is saved in your browser's localStorage.",
  },
  {
    question: "Which image formats and sizes are supported?",
    answer:
      "JPG and PNG only, with a maximum file size of 2 MB. Photos are cropped to a 1:1 aspect ratio via an interactive canvas cropper before being sent to Face++.",
  },
  {
    question: "Why does the API sometimes fail?",
    answer:
      "Common reasons: image too large (over 2 MB), unsupported format, no face detected in the photo, Face++ quota exhausted, or temporary rate limit. The UI displays a localized error message explaining the exact cause.",
  },
  {
    question: "Is Guess Your Face open source?",
    answer:
      "Yes. The full source code is available at https://github.com/REY-STTP/Guess-Your-Face under the MIT License. You can audit the privacy claims, file issues, or fork it for your own project.",
  },
];

export function FaqStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
