export const FACEPP_BASE = "https://api-us.faceplusplus.com/facepp/v3";

export const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // Face++ limit: 2 MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const DETECT_ATTRIBUTES = [
  "gender",
  "age",
  "emotion",
  "smiling",
  "headpose",
  "facequality",
  "beauty",
];

export type FaceRectangle = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type DetectedFace = {
  face_token: string;
  face_rectangle: FaceRectangle;
  attributes: {
    gender?: { value: string };
    age?: { value: number };
    emotion?: Record<string, number>;
    smiling?: { value: number };
    facequality?: { value: number; threshold: number };
    beauty?: { male_score: number; female_score: number };
    headpose?: { pitch_angle: number; roll_angle: number; yaw_angle: number };
    [key: string]: unknown;
  };
};

export type DetectResult = {
  faces: DetectedFace[];
  image_id: string;
  request_id: string;
};

export type CompareFace = {
  face_token: string;
  face_rectangle: FaceRectangle;
};

export type CompareResult = {
  confidence: number;
  thresholds: Record<string, number>;
  faces1: CompareFace[];
  faces2: CompareFace[];
  request_id: string;
};

export type AnalyzeFace = {
  face_token: string;
  attributes?: Record<string, unknown>;
};

export type AnalyzeResult = {
  faces: AnalyzeFace[];
  request_id: string;
};

type FaceppError = { error_message?: string };

const FRIENDLY_ERRORS: Record<string, string> = {
  INVALID_API_KEY: "API key Face++ tidak valid.",
  INVALID_API_SECRET: "API secret Face++ tidak valid.",
  AUTHENTICATION_ERROR: "Autentikasi ke Face++ gagal.",
  INVALID_IMAGE_FILE: "File gambar rusak atau tidak valid.",
  INVALID_IMAGE_SIZE: "Dimensi gambar tidak didukung (minimal 48x48 piksel).",
  IMAGE_FILE_TOO_LARGE: "Ukuran gambar terlalu besar (maksimal 2 MB).",
  IMAGE_NOT_SUPPORTED: "Format gambar tidak didukung.",
  NO_FACE_FOUND: "Tidak ada wajah terdeteksi dalam gambar.",
  INVALID_FACE_TOKEN: "Face token tidak valid atau kedaluwarsa.",
  INVALID_IMAGE_URL: "URL gambar tidak valid.",
  OUT_OF_QUOTA: "Kuota Face++ telah habis.",
  EXCEED_QPS: "Terlalu banyak permintaan. Coba lagi sebentar lagi.",
  CONCURRENCY_LIMIT_EXCEEDED: "Terlalu banyak permintaan bersamaan.",
};

function credentials() {
  const apiKey = process.env.FACEPP_API_KEY;
  const apiSecret = process.env.FACEPP_API_SECRET;
  if (!apiKey || !apiSecret) {
    throw new Error("FACE_NOT_CONFIGURED");
  }
  return { apiKey, apiSecret };
}

function isImageFile(value: FormDataEntryValue | null): value is File {
  return (
    value !== null &&
    typeof value !== "string" &&
    typeof value.name === "string"
  );
}

export function validateImageFile(formData: FormData, field = "file"): File {
  const value = formData.get(field);
  if (!isImageFile(value)) {
    throw new Error("NO_FILE");
  }
  if (!ALLOWED_IMAGE_TYPES.includes(value.type)) {
    throw new Error("BAD_TYPE");
  }
  if (value.size > MAX_IMAGE_BYTES) {
    throw new Error("TOO_LARGE");
  }
  return value;
}

async function postToFacepp(
  endpoint: string,
  buildBody: (key: string, secret: string, form: FormData) => void,
  files: { name: string; data: File }[] = []
): Promise<unknown> {
  const { apiKey, apiSecret } = credentials();
  const form = new FormData();
  buildBody(apiKey, apiSecret, form);
  for (const f of files) form.append(f.name, f.data, f.data.name);

  const res = await fetch(`${FACEPP_BASE}${endpoint}`, {
    method: "POST",
    body: form,
    cache: "no-store",
  });

  const data = (await res.json().catch(() => ({}))) as FaceppError & unknown;

  const errorMessage = (data as FaceppError).error_message;
  if (!res.ok || errorMessage !== undefined) {
    throw new Error(mapFaceppError(errorMessage ?? ""));
  }
  return data;
}

function mapFaceppError(raw: string): string {
  const codeMatch = raw.match(/^([A-Z_]+)/);
  const code = codeMatch ? codeMatch[1] : "";
  return FRIENDLY_ERRORS[code] ?? `Face++ mengembalikan error: ${raw}`;
}

export async function detectFaces(file: File): Promise<DetectResult> {
  const data = (await postToFacepp(
    "/detect",
    (key, secret, form) => {
      form.append("api_key", key);
      form.append("api_secret", secret);
      form.append("return_attributes", DETECT_ATTRIBUTES.join(","));
    },
    [{ name: "image_file", data: file }]
  )) as DetectResult;
  return data;
}

export async function compareFaces(
  file1: File,
  file2: File
): Promise<CompareResult> {
  const data = (await postToFacepp(
    "/compare",
    (key, secret, form) => {
      form.append("api_key", key);
      form.append("api_secret", secret);
    },
    [
      { name: "image_file1", data: file1 },
      { name: "image_file2", data: file2 },
    ]
  )) as Partial<CompareResult>;
  return {
    confidence:
      typeof data.confidence === "number" ? data.confidence : 0,
    thresholds: data.thresholds ?? {},
    faces1: data.faces1 ?? [],
    faces2: data.faces2 ?? [],
    request_id: data.request_id ?? "",
  };
}

export async function analyzeFaces(params: {
  faceTokens: string[];
  attributes: string[];
}): Promise<AnalyzeResult> {
  const { faceTokens, attributes } = params;

  const data = (await postToFacepp(
    "/face/analyze",
    (key, secret, form) => {
      form.append("api_key", key);
      form.append("api_secret", secret);
      form.append("face_tokens", faceTokens.join(","));
      form.append("return_attributes", attributes.join(","));
    }
  )) as AnalyzeResult;
  return data;
}