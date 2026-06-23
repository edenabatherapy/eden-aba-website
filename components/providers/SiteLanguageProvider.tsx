"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_LANGUAGE, STORAGE_KEY } from "@/lib/i18n";
import type { SiteLanguage } from "@/hooks/useSiteLanguage";
import { isSiteLanguage } from "@/hooks/useSiteLanguage";

type SiteLanguageContextValue = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
};

export const SiteLanguageContext = createContext<SiteLanguageContextValue | null>(null);

function readStoredLanguage(): SiteLanguage {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = localStorage.getItem(STORAGE_KEY);
  return isSiteLanguage(stored) ? stored : DEFAULT_LANGUAGE;
}

export default function SiteLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SiteLanguage>(DEFAULT_LANGUAGE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLanguageState(readStoredLanguage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.lang = language;
  }, [hydrated, language]);

  const setLanguage = useCallback((nextLanguage: SiteLanguage) => {
    setLanguageState(nextLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, nextLanguage);
      document.documentElement.lang = nextLanguage;
    }
  }, []);

  const value = useMemo(
    () => ({
      language: hydrated ? language : DEFAULT_LANGUAGE,
      setLanguage,
    }),
    [hydrated, language, setLanguage],
  );

  return <SiteLanguageContext.Provider value={value}>{children}</SiteLanguageContext.Provider>;
}
