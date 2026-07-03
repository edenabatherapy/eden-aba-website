"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import dynamic from "next/dynamic";
import AboutSiteHeader from "@/components/about/AboutSiteHeader";
import AboutPageSchema from "@/components/about/PageSchema";
import StickyCtaBar from "@/components/about/StickyCtaBar";
import { OurStoryContentProvider } from "@/contexts/OurStoryContent";

const HeroSection = dynamic(() => import("@/components/about/HeroSection"));
const StorySection = dynamic(() => import("@/components/about/StorySection"));
const MissionSection = dynamic(() => import("@/components/about/MissionSection"));
const ValuesSection = dynamic(() => import("@/components/about/ValuesSection"));
const ApproachSection = dynamic(() => import("@/components/about/ApproachSection"));
const HistoryTimeline = dynamic(() => import("@/components/about/HistoryTimeline"));
const TeamSection = dynamic(() => import("@/components/about/TeamSection"));
const FutureSection = dynamic(() => import("@/components/about/FutureSection"));
const ImpactSection = dynamic(() => import("@/components/about/ImpactSection"));
const FinalCTA = dynamic(() => import("@/components/about/FinalCTA"));
import EdenNewsletter from "@/components/common/EdenNewsletter";
const Footer = dynamic(() => import("@/components/common/Footer"));

export default function AboutStoryPage() {
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
    <OurStoryContentProvider>
    <div className={darkMode ? "dark bg-slate-950 text-white" : "eden-page-shell min-h-screen text-slate-900"}>
      <AboutPageSchema />
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
        <HeroSection />
        <StorySection />
        <MissionSection />
        <ValuesSection />
        <ApproachSection />
        <HistoryTimeline />
        <TeamSection />
        <FutureSection />
        <ImpactSection />
        <FinalCTA />
      </main>

      <EdenNewsletter source="about-page" />
      <Footer />

      <StickyCtaBar />
    </div>
    </OurStoryContentProvider>
  );
}
