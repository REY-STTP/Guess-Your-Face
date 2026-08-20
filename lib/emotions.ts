import type { Dictionary } from "./i18n/types";

export const EMOTION_ORDER = [
  "anger",
  "disgust",
  "fear",
  "happiness",
  "neutral",
  "sadness",
  "surprise",
] as const;

export type EmotionKey = (typeof EMOTION_ORDER)[number];

export const EMOTION_COLORS: Record<EmotionKey, string> = {
  anger: "#f87171",
  disgust: "#a3e635",
  fear: "#a78bfa",
  happiness: "#fbbf24",
  neutral: "#a1a1aa",
  sadness: "#60a5fa",
  surprise: "#fb923c",
};

export const EMOTION_EMOJIS: Record<EmotionKey, string> = {
  anger: "😠",
  disgust: "🤢",
  fear: "😨",
  happiness: "😄",
  neutral: "😐",
  sadness: "😢",
  surprise: "😲",
};

export type EmotionResult = {
  key: EmotionKey;
  label: string;
  emoji: string;
  color: string;
  value: number;
};

export function sortedEmotions(
  raw: Record<string, number> | undefined,
  emotionsDict?: Dictionary["emotions"]
): EmotionResult[] {
  const source = raw ?? {};
  return EMOTION_ORDER.map((key) => {
    const label = emotionsDict ? emotionsDict[key] : key;
    return {
      key,
      label,
      emoji: EMOTION_EMOJIS[key],
      color: EMOTION_COLORS[key],
      value: Number(source[key] ?? 0),
    };
  }).sort((a, b) => b.value - a.value);
}

export function translateGender(
  value: string | undefined,
  emotionsDict?: Dictionary["emotions"]
): string {
  if (!value) return "-";
  const v = value.toLowerCase();
  if (v === "male") return emotionsDict ? emotionsDict.genderMale : "Pria";
  if (v === "female") return emotionsDict ? emotionsDict.genderFemale : "Wanita";
  return "-";
}