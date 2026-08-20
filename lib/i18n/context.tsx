"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Dictionary, Locale } from "./types";
import { idDictionary } from "./dictionaries/id";
import { enDictionary } from "./dictionaries/en";

const STORAGE_KEY = "gyf-locale";

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

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "id";
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved === "id" || saved === "en") {
      return saved;
    }
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith("en") ? "en" : "id";
  } catch {
    return "id";
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

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
