"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import dynamic from "next/dynamic";
import AboutSiteHeader from "@/components/about/AboutSiteHeader";
import EdenNewsletter from "@/components/common/EdenNewsletter";
import { EDEN_PAGE_SHELL } from "@/lib/eden-design-system";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";

const Footer = dynamic(() => import("@/components/common/Footer"));

type AboutPremiumLayoutProps = {
  children: ReactNode;
  schema?: ReactNode;
};

export default function AboutPremiumLayout({ children, schema }: AboutPremiumLayoutProps) {
  const { language } = useSiteLanguage();
  const t = getTranslation(language);
  const aria = t.ariaLabels ?? {};
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("eden-about-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(stored === "dark" || (!stored && prefersDark));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("eden-about-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className={
        darkMode
          ? "dark min-h-screen bg-slate-950 text-white"
          : `${EDEN_PAGE_SHELL} dark:bg-slate-950 dark:text-white`
      }
    >
      {schema}
      <AboutSiteHeader />
      <button
        type="button"
        onClick={() => setDarkMode((value) => !value)}
        className="fixed bottom-20 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2.5 text-sm font-bold text-emerald-800 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-emerald-300 sm:bottom-5"
        aria-pressed={darkMode}
        aria-label={
          darkMode
            ? (aria.switchToLightMode ?? "Switch to light mode")
            : (aria.switchToDarkMode ?? "Switch to dark mode")
        }
      >
        {darkMode ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
        {darkMode ? (aria.lightMode ?? "Light") : (aria.darkMode ?? "Dark")}
      </button>
      <main id="main-content">{children}</main>
      <EdenNewsletter source="about-premium-layout" />
      <Footer />
    </div>
  );
}
