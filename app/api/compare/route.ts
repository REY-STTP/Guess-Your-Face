import { NextResponse } from "next/server";
import { compareFaces, validateImageFile } from "@/lib/facepp";

const CLIENT_ERRORS = new Set([
  "NO_FILE",
  "BAD_TYPE",
  "TOO_LARGE",
  "Tidak ada wajah terdeteksi dalam gambar.",
]);

function validationDetail(message: string) {
  return message === "NO_FILE"
    ? "File gambar tidak ditemukan."
    : message === "BAD_TYPE"
      ? "Format tidak didukung. Gunakan JPG atau PNG (maks 2 MB)."
      : message === "TOO_LARGE"
        ? "Ukuran gambar maksimal 2 MB."
        : "File gambar tidak valid.";
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Permintaan tidak valid." },
      { status: 400 }
    );
  }

  try {
    const file1 = validateImageFile(formData, "file1");
    const file2 = validateImageFile(formData, "file2");
    const result = await compareFaces(file1, file2);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message === "NO_FILE" || message === "BAD_TYPE" || message === "TOO_LARGE") {
      return NextResponse.json(
        { error: validationDetail(message) },
        { status: 400 }
      );
    }
    if (message === "FACE_NOT_CONFIGURED") {
      return NextResponse.json(
        { error: "Server belum dikonfigurasi dengan kredensial Face++." },
        { status: 500 }
      );
    }
    if (CLIENT_ERRORS.has(message)) {
      return NextResponse.json({ error: message }, { status: 400 });
    }
    console.error("Compare failed:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat membandingkan wajah." },
      { status: 502 }
    );
  }
}