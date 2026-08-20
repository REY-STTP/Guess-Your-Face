import { NextResponse } from "next/server";
import { analyzeFaces } from "@/lib/facepp";

const ANALYZE_ATTRIBUTES = [
  "gender",
  "age",
  "emotion",
  "smiling",
  "facequality",
  "beauty",
  "mouthstatus",
  "eyestatus",
];

export async function POST(request: Request) {
  let body: { faceTokens?: string[]; attributes?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Permintaan tidak valid." },
      { status: 400 }
    );
  }

  const faceTokens = (body.faceTokens ?? [])
    .map((t) => String(t).trim())
    .filter(Boolean);

  if (faceTokens.length === 0) {
    return NextResponse.json(
      { error: "Masukkan minimal satu face token." },
      { status: 400 }
    );
  }
  if (faceTokens.length > 5) {
    return NextResponse.json(
      { error: "Face Analyze API hanya menerima maksimal 5 face token." },
      { status: 400 }
    );
  }

  const requested = Array.isArray(body.attributes)
    ? body.attributes.filter((a) => ANALYZE_ATTRIBUTES.includes(String(a)))
    : ["gender", "age", "emotion"];

  const attributes =
    requested.length > 0 ? requested : ["gender", "age", "emotion"];

  try {
    const result = await analyzeFaces({ faceTokens, attributes });
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message === "FACE_NOT_CONFIGURED") {
      return NextResponse.json(
        { error: "Server belum dikonfigurasi dengan kredensial Face++." },
        { status: 500 }
      );
    }
    console.error("Analyze failed:", err);
    return NextResponse.json(
      { error: message || "Terjadi kesalahan saat menganalisis wajah." },
      { status: 400 }
    );
  }
}