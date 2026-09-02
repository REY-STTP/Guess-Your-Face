import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Guess Your Face";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type ToolOgProps = {
  toolLabel: string;
  toolBadge: string;
  headlineLines: string[];
  subtitle: string;
  highlights: string[];
  accent?: string;
};

export function renderToolOg({
  toolLabel,
  toolBadge,
  headlineLines,
  subtitle,
  highlights,
  accent = "#f5b301",
}: ToolOgProps) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #0a0a0b 0%, #1c1608 55%, #4a3508 100%)",
          padding: "72px 88px",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                background: accent,
                display: "flex",
              }}
            />
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: accent,
                letterSpacing: "0.02em",
                display: "flex",
              }}
            >
              GUESS YOUR FACE
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 16px",
              borderRadius: 999,
              border: `1px solid ${accent}`,
              color: accent,
              fontSize: 18,
              fontWeight: 700,
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.04em",
            }}
          >
            {toolBadge}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: accent,
              letterSpacing: "0.02em",
              marginBottom: 14,
              display: "flex",
            }}
          >
            {toolLabel}
          </div>
          {headlineLines.map((line, idx) => (
            <div
              key={`${toolLabel}-h-${idx}`}
              style={{
                fontSize: 70,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                maxWidth: 980,
                display: "flex",
              }}
            >
              {line}
            </div>
          ))}
          <div
            style={{
              fontSize: 28,
              marginTop: 24,
              opacity: 0.85,
              maxWidth: 900,
              lineHeight: 1.35,
              display: "flex",
            }}
          >
            {subtitle}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 40,
            }}
          >
            {highlights.map((h) => (
              <div
                key={h}
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  borderRadius: 999,
                  background: "rgba(245, 179, 1, 0.12)",
                  border: "1px solid rgba(245, 179, 1, 0.4)",
                  color: accent,
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {h}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.18)",
            fontSize: 20,
            opacity: 0.7,
          }}
        >
          <div style={{ display: "flex" }}>Powered by Face++</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>Privacy-first</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>Zero data retention</div>
        </div>
      </div>
    ),
    { ...size },
  );
}