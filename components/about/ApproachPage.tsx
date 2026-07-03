"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import dynamic from "next/dynamic";
import AboutSiteHeader from "@/components/about/AboutSiteHeader";
import ApproachPageSchema from "@/components/about/ApproachPageSchema";
import StickyCtaBar from "@/components/about/StickyCtaBar";
import { OurApproachContentProvider } from "@/contexts/OurApproachContent";

const ApproachHero = dynamic(() => import("@/components/about/ApproachHero"));
const ApproachPhilosophy = dynamic(() => import("@/components/about/ApproachPhilosophy"));
const PersonalizedCollaborative = dynamic(() => import("@/components/about/PersonalizedCollaborative"));
const ChildFocusedLearning = dynamic(() => import("@/components/about/ChildFocusedLearning"));
const PositiveReinforcement = dynamic(() => import("@/components/about/PositiveReinforcement"));
const HolisticDevelopment = dynamic(() => import("@/components/about/HolisticDevelopment"));
const ClinicalProcess = dynamic(() => import("@/components/about/ClinicalProcess"));
const TreatmentSettings = dynamic(() => import("@/components/about/TreatmentSettings"));
const DataDrivenProgress = dynamic(() => import("@/components/about/DataDrivenProgress"));
const LifelongGrowth = dynamic(() => import("@/components/about/LifelongGrowth"));
const ApproachValuesPreview = dynamic(() => import("@/components/about/ApproachValuesPreview"));
const ApproachFAQ = dynamic(() => import("@/components/about/ApproachFAQ"));
const ApproachFinalCTA = dynamic(() => import("@/components/about/ApproachFinalCTA"));
import EdenNewsletter from "@/components/common/EdenNewsletter";
const Footer = dynamic(() => import("@/components/common/Footer"));

export default function ApproachPage() {
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
    <OurApproachContentProvider>
    <div className={darkMode ? "dark bg-slate-950 text-white" : "eden-page-shell min-h-screen text-slate-900"}>
      <ApproachPageSchema />
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
        <ApproachHero />
        <ApproachPhilosophy />
        <PersonalizedCollaborative />
        <ChildFocusedLearning />
        <PositiveReinforcement />
        <HolisticDevelopment />
        <ClinicalProcess />
        <TreatmentSettings />
        <DataDrivenProgress />
        <LifelongGrowth />
        <ApproachValuesPreview />
        <ApproachFAQ />
        <ApproachFinalCTA />
      </main>

      <EdenNewsletter source="about-page" />
      <Footer />

      <StickyCtaBar />
    </div>
    </OurApproachContentProvider>
  );
}
