"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import dynamic from "next/dynamic";
import AboutSiteHeader from "@/components/about/AboutSiteHeader";
import MissionValuesPageSchema from "@/components/about/MissionValuesPageSchema";
import StickyCtaBar from "@/components/about/StickyCtaBar";
import { MissionValuesContentProvider } from "@/contexts/MissionValuesContent";

const MissionValuesHero = dynamic(() => import("@/components/about/MissionValuesHero"));
const MissionValuesMissionSection = dynamic(() => import("@/components/about/MissionValuesMissionSection"));
const MissionValuesVisionSection = dynamic(() => import("@/components/about/MissionValuesVisionSection"));
const CoreValuesSection = dynamic(() => import("@/components/about/CoreValuesSection"));
const MissionImpactSection = dynamic(() => import("@/components/about/MissionImpactSection"));
const MissionValuesOutcomesSection = dynamic(() => import("@/components/about/MissionValuesOutcomesSection"));
const EdenDifferenceSection = dynamic(() => import("@/components/about/EdenDifferenceSection"));
const MissionInActionSection = dynamic(() => import("@/components/about/MissionInActionSection"));
const MissionFinalCTA = dynamic(() => import("@/components/about/MissionFinalCTA"));
import EdenNewsletter from "@/components/common/EdenNewsletter";
const Footer = dynamic(() => import("@/components/common/Footer"));

export default function MissionValuesPage() {
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
    <MissionValuesContentProvider>
    <div className={darkMode ? "dark bg-slate-950 text-white" : "eden-page-shell min-h-screen text-slate-900"}>
      <MissionValuesPageSchema />
      <AboutSiteHeader />

      <button
        type="button"
        onClick={() => setDarkMode((value) => !value)}
        className="fixed bottom-20 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2.5 text-sm font-bold text-emerald-800 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-emerald-300 sm:bottom-5"
        aria-pressed={darkMode}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
        {darkMode ? "Light" : "Dark"}
      </button>

      <main id="main-content">
        <MissionValuesHero />
        <MissionValuesMissionSection />
        <MissionValuesVisionSection />
        <CoreValuesSection />
        <MissionImpactSection />
        <MissionValuesOutcomesSection />
        <EdenDifferenceSection />
        <MissionInActionSection />
        <MissionFinalCTA />
      </main>

      <EdenNewsletter source="about-page" />
      <Footer />

      <StickyCtaBar />
    </div>
    </MissionValuesContentProvider>
  );
}
