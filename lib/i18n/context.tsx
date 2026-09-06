"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Dictionary, Locale } from "./types";
import { idDictionary } from "./dictionaries/id";
import { enDictionary } from "./dictionaries/en";

const STORAGE_KEY = "guess-your-face-locale";

const DICTIONARIES: Record<Locale, Dictionary> = {
  id: idDictionary,
  en: enDictionary,
};

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "id",
  setLocale: () => {},
  t: idDictionary,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // State awal HARUS "id" agar sama persis dengan SSR (server selalu render
  // Indonesia). Preferensi tersimpan/browser diterapkan di effect pasca-hydrate
  // — inilah yang sebelumnya menyebabkan hydration mismatch.
  const [locale, setLocaleState] = useState<Locale>("id");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const resolveLocale = (): Locale | null => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
        if (saved === "id" || saved === "en") {
          return saved === "id" ? null : saved;
        }
        return navigator.language.toLowerCase().startsWith("en") ? "en" : null;
      } catch {
        return null;
      }
    };
    const next = resolveLocale();
    if (next) {
      // Ditunda keluar dari body effect agar selaras dengan aturan lint
      // (preferensi client diterapkan sekali setelah hydrate).
      queueMicrotask(() => setLocaleState(next));
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // ignore
    }
  };

  const t = DICTIONARIES[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
