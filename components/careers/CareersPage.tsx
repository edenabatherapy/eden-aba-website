"use client";

import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Suspense } from "react";
import AboutSiteHeader from "@/components/about/AboutSiteHeader";
import EdenNewsletter from "@/components/common/EdenNewsletter";
import Footer from "@/components/common/Footer";
import CareersFutureLocations from "@/components/careers/CareersFutureLocations";
import CareersPortal from "@/components/careers/CareersPortal";
import CareersTalentNetwork from "@/components/careers/CareersTalentNetwork";
import { CAREERS_PAGE } from "@/lib/careers-content";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

function CareersPortalFallback() {
  return null;
}

export default function CareersPage() {
  return (
    <div className="eden-page-shell min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <AboutSiteHeader />

      <main id="main-content">
        <section
          className="relative overflow-hidden bg-gradient-to-br from-[#e8f8f2] via-white to-[#dff5f0] px-4 py-16 lg:px-8 lg:py-24"
          aria-labelledby="careers-hero-heading"
        >
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -left-20 top-8 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-teal-100/50 blur-3xl" />
          </div>

          <motion.div {...fadeUp} className="relative z-10 mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-lime-300/50 bg-lime-400/15 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-emerald-800 dark:text-lime-200">
              {CAREERS_PAGE.hero.badge}
            </span>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-emerald-800 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-emerald-200">
              <MapPin size={16} aria-hidden="true" />
              {CAREERS_PAGE.hero.locationChip}
            </div>
            <h1 id="careers-hero-heading" className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              {CAREERS_PAGE.hero.headline}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {CAREERS_PAGE.hero.subheadline}
            </p>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8" aria-labelledby="open-positions-heading">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 id="open-positions-heading" className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              {CAREERS_PAGE.openings.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{CAREERS_PAGE.openings.description}</p>
            <p className="mt-3 text-sm font-semibold text-emerald-800 dark:text-emerald-300">{CAREERS_PAGE.openings.note}</p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
            <Suspense fallback={<CareersPortalFallback />}>
              <CareersPortal />
            </Suspense>
          </motion.div>
        </section>

        <CareersFutureLocations />
        <CareersTalentNetwork />
      </main>

      <EdenNewsletter source="careers-hub" />
      <Footer />
    </div>
  );
}
