"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import dynamic from "next/dynamic";
import AboutSiteHeader from "@/components/about/AboutSiteHeader";
import TeamPageSchema from "@/components/about/TeamPageSchema";
import StickyCtaBar from "@/components/about/StickyCtaBar";

const TeamHero = dynamic(() => import("@/components/about/TeamHero"));
const FoundersSection = dynamic(() => import("@/components/about/FoundersSection"));
const LeadershipVisionSection = dynamic(() => import("@/components/about/LeadershipVisionSection"));
const ClinicalStructureSection = dynamic(() => import("@/components/about/ClinicalStructureSection"));
const RecruitingSection = dynamic(() => import("@/components/about/RecruitingSection"));
const WhyJoinEdenSection = dynamic(() => import("@/components/about/WhyJoinEdenSection"));
const TeamValuesSection = dynamic(() => import("@/components/about/TeamValuesSection"));
const GrowthTimelineSection = dynamic(() => import("@/components/about/GrowthTimelineSection"));
const TeamFinalCTA = dynamic(() => import("@/components/about/TeamFinalCTA"));
const FamilyNewsletter = dynamic(() => import("@/components/common/FamilyNewsletter"));
const Footer = dynamic(() => import("@/components/common/Footer"));

export default function TeamPage() {
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
    <div className={darkMode ? "dark bg-slate-950 text-white" : "bg-white text-slate-900"}>
      <TeamPageSchema />
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
        <TeamHero />
        <FoundersSection />
        <LeadershipVisionSection />
        <ClinicalStructureSection />
        <RecruitingSection />
        <WhyJoinEdenSection />
        <TeamValuesSection />
        <GrowthTimelineSection />
        <TeamFinalCTA />
      </main>

      <FamilyNewsletter />
      <Footer />

      <StickyCtaBar />
    </div>
  );
}
