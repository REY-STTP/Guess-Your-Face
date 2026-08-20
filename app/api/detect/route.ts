import { NextResponse } from "next/server";
import { detectFaces, validateImageFile } from "@/lib/facepp";

const CLIENT_ERRORS = new Set([
  "NO_FILE",
  "BAD_TYPE",
  "TOO_LARGE",
  "Tidak ada wajah terdeteksi dalam gambar.",
]);

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

  let file: File;
  try {
    file = validateImageFile(formData);
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    const detail =
      message === "NO_FILE"
        ? "File gambar tidak ditemukan."
        : message === "BAD_TYPE"
          ? "Format tidak didukung. Gunakan JPG atau PNG (maks 2 MB)."
          : message === "TOO_LARGE"
            ? "Ukuran gambar maksimal 2 MB."
            : "File gambar tidak valid.";
    return NextResponse.json({ error: detail }, { status: 400 });
  }

  try {
    const result = await detectFaces(file);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message === "FACE_NOT_CONFIGURED") {
      return NextResponse.json(
        { error: "Server belum dikonfigurasi dengan kredensial Face++." },
        { status: 500 }
      );
    }
    if (CLIENT_ERRORS.has(message)) {
      return NextResponse.json({ error: message }, { status: 400 });
    }
    console.error("Detect failed:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mendeteksi wajah." },
      { status: 502 }
    );
  }
}