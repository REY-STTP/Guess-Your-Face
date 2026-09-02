import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Guess Your Face — Read your face with real-time AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: "#f5b301",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#f5b301",
              display: "flex",
            }}
          >
            GUESS YOUR FACE
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
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              maxWidth: 980,
              display: "flex",
            }}
          >
            Read your face
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              maxWidth: 980,
              display: "flex",
            }}
          >
            with real-time AI.
          </div>
          <div
            style={{
              fontSize: 28,
              marginTop: 24,
              opacity: 0.85,
              maxWidth: 880,
              lineHeight: 1.35,
              display: "flex",
            }}
          >
            Facial detection · 1:1 comparison · Token analysis
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginTop: 56,
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.18)",
            fontSize: 22,
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