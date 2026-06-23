"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import CtaLink from "@/components/about/CtaLink";
import { OUR_STORY_PAGE } from "@/lib/our-story-content";
import { SITE_IMAGES } from "@/lib/site-images";
import { fadeUp } from "./shared";

export default function HeroSection() {
  const content = OUR_STORY_PAGE.hero;

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 px-4 py-16 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/30 lg:px-8 lg:py-24"
      aria-labelledby="about-hero-heading"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl dark:bg-emerald-700/10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute right-[10%] top-[18%] hidden h-28 w-28 rounded-full border border-emerald-200/60 bg-white/40 backdrop-blur-md dark:border-emerald-700/30 dark:bg-emerald-900/20 lg:block"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
            {content.eyebrow}
          </p>
          <h1
            id="about-hero-heading"
            className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl"
          >
            {content.headline}
          </h1>
        </motion.div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
            <div className="space-y-4 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              {content.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CtaLink href="/intake" className="w-full sm:w-auto">
                {content.primaryCta}
                <ArrowRight size={18} aria-hidden="true" />
              </CtaLink>
              <CtaLink href="/intake" variant="secondary" className="w-full sm:w-auto">
                {content.secondaryCta}
              </CtaLink>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.14 }} className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-emerald-950/10 ring-1 ring-emerald-100 dark:ring-emerald-900/40">
              <img
                src={SITE_IMAGES.aboutEden.hero}
                alt="Eden ABA Therapy team supporting a child and family during compassionate autism care"
                className="aspect-[4/5] w-full object-cover lg:aspect-[5/6]"
                loading="eager"
              />
            </div>
            <div
              className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-white/70 bg-white/80 px-5 py-4 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70 lg:block"
              aria-hidden="true"
            >
              <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Family-centered care</p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Evidence-based ABA therapy</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
