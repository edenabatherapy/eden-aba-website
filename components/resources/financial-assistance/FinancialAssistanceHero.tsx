"use client";

import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { getButtonClasses } from "@/lib/button-styles";

type FinancialAssistanceHeroProps = {
  title: string;
  subtitle: string;
};

export default function FinancialAssistanceHero({ title, subtitle }: FinancialAssistanceHeroProps) {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay },
        };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-4 py-20 text-white lg:px-8 lg:py-28"
      aria-labelledby="fa-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {!reduceMotion ? (
          <>
            <div className="fa-aurora fa-aurora--1 absolute -left-1/4 top-0 h-[480px] w-[480px] rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="fa-aurora fa-aurora--2 absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-amber-300/15 blur-3xl" />
            <div className="fa-aurora fa-aurora--3 absolute left-1/3 top-1/2 h-[320px] w-[320px] rounded-full bg-cyan-300/10 blur-3xl" />
          </>
        ) : null}
        <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden>
          <defs>
            <linearGradient id="fa-grid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <pattern id="fa-dots" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="url(#fa-grid)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#fa-dots)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.p
          {...reveal(0)}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-emerald-100 backdrop-blur-sm"
        >
          <HeartHandshake size={14} aria-hidden />
          Family Financial Resources
        </motion.p>
        <motion.h1
          {...reveal(0.08)}
          id="fa-hero-heading"
          className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p {...reveal(0.14)} className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-emerald-50/90">
          {subtitle}
        </motion.p>
        <motion.div
          {...reveal(0.2)}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a href="#assistance-resources" className={getButtonClasses("gold")}>
            Explore resources
            <ArrowRight size={18} aria-hidden />
          </a>
          <Link href="/insurance-coverage" className={getButtonClasses("secondarySite", "border-white/30 bg-white/10 text-white hover:bg-white/20")}>
            Insurance coverage
          </Link>
          <a href="#autism-care-fund" className={getButtonClasses("secondarySite", "border-white/30 bg-white/10 text-white hover:bg-white/20")}>
            Autism Care Fund
          </a>
        </motion.div>
      </div>
    </section>
  );
}
