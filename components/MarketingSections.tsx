import { FAQS } from "@/components/FaqStructuredData";

/**
 * Server-rendered About + FAQ sections for the landing page.
 * Pure HTML (no client interactivity) so it is crawlable end-to-end
 * and quotable by AI answer engines.
 */
export function MarketingSections() {
  return (
    <div className="mx-auto mt-20 w-full max-w-5xl px-5 pb-20">
      {/* About — inverted pyramid: definition first, details after */}
      <section aria-labelledby="about-heading" className="max-w-3xl">
        <h2
          id="about-heading"
          className="font-display text-2xl font-bold tracking-tight sm:text-3xl"
        >
          About Guess Your Face
        </h2>
        <div className="mt-4 space-y-3 text-base leading-relaxed text-muted">
          <p>
            <strong className="text-foreground">Guess Your Face</strong> is a
            free, real-time AI facial analysis web application powered by{" "}
            <strong className="text-foreground">Face++ Cognitive Services</strong>.
            It detects faces in photos, compares two portraits for identity
            verification (1:1 matching), and analyzes face tokens for seven
            emotional states and ten or more facial attributes — all processed
            in-memory with zero data retention.
          </p>
          <p>
            Three tools are available: <strong className="text-foreground">Detect</strong>{" "}
            (multi-face detection with emotion, age, gender, smile, beauty,
            headpose, and face quality scores),{" "}
            <strong className="text-foreground">Compare</strong> (1:1 face
            matching with confidence score and Face++ false-positive
            thresholds), and{" "}
            <strong className="text-foreground">Analyze</strong> (deep
            attribute inspection for up to 5 face tokens, including mask and
            glasses detection).
          </p>
          <p>
            All uploaded images are processed in-memory and never stored on
            disk, server, or database. No login is required. The codebase is
            open source under the MIT License.
          </p>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4">
          <Stat label="Emotion classes" value="7" />
          <Stat label="Attributes" value="10+" />
          <Stat label="Max tokens / request" value="5" />
          <Stat label="Image size limit" value="2 MB" />
        </dl>
      </section>

      {/* Comparison table — snippet-friendly */}
      <section
        aria-labelledby="compare-tools-heading"
        className="mt-16 max-w-3xl"
      >
        <h2
          id="compare-tools-heading"
          className="font-display text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Which tool should I use?
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="py-2 pr-3 font-medium text-foreground">Tool</th>
                <th className="py-2 pr-3 font-medium text-foreground">Use when</th>
                <th className="py-2 pr-3 font-medium text-foreground">Input</th>
                <th className="py-2 font-medium text-foreground">Output</th>
              </tr>
            </thead>
            <tbody className="text-muted">
              <tr className="border-b border-line/60">
                <td className="py-2 pr-3 font-medium text-foreground">Detect</td>
                <td className="py-2 pr-3">
                  You want to read emotions and attributes from a photo.
                </td>
                <td className="py-2 pr-3">1 photo</td>
                <td className="py-2">
                  face_token + 7 emotions + age + gender + smile + beauty +
                  headpose + face quality
                </td>
              </tr>
              <tr className="border-b border-line/60">
                <td className="py-2 pr-3 font-medium text-foreground">Compare</td>
                <td className="py-2 pr-3">
                  You want to check if two photos show the same person.
                </td>
                <td className="py-2 pr-3">2 photos</td>
                <td className="py-2">
                  confidence score + thresholds (1e-3, 1e-4, 1e-5) + verdict
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-3 font-medium text-foreground">Analyze</td>
                <td className="py-2 pr-3">
                  You already have face_tokens from Detect and want deep
                  attributes.
                </td>
                <td className="py-2 pr-3">1–5 face tokens</td>
                <td className="py-2">
                  mask status + glasses status + emotion + beauty + more
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ — AEO target */}
      <section aria-labelledby="faq-heading" className="mt-16 max-w-3xl">
        <h2
          id="faq-heading"
          className="font-display text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Frequently Asked Questions
        </h2>
        <dl className="mt-6 space-y-6">
          {FAQS.map((faq, i) => (
            <div key={faq.question} className="border-b border-line/60 pb-5 last:border-0">
              <dt className="font-medium text-foreground">
                <span className="mr-2 text-faint">{i + 1}.</span>
                {faq.question}
              </dt>
              <dd className="mt-2 pl-6 text-sm leading-relaxed text-muted">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-faint">{label}</dt>
      <dd className="mt-0.5 font-display text-2xl font-bold text-foreground">
        {value}
      </dd>
    </div>
  );
}