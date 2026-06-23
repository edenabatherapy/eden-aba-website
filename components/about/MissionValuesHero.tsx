"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import CtaLink from "@/components/about/CtaLink";
import { MISSION_VALUES_PAGE } from "@/lib/mission-values-content";
import { SITE_IMAGES } from "@/lib/site-images";
import { fadeUp, staggerContainer, staggerItem } from "./shared";

export default function MissionValuesHero() {
  const content = MISSION_VALUES_PAGE.hero;

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#e8f8f2] via-white to-[#dff5f0] px-4 py-16 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/40 lg:px-8 lg:py-24"
      aria-labelledby="mission-values-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-20 top-8 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-teal-100/50 blur-3xl" />
        <div className="absolute left-[8%] top-[20%] h-16 w-16 rotate-12 rounded-3xl bg-[#f7c72f]/30" />
        <div className="absolute right-[12%] top-[28%] h-24 w-24 rounded-full border-4 border-emerald-200/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
            {content.eyebrow}
          </p>
          <h1
            id="mission-values-hero-heading"
            className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl"
          >
            {content.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            {content.subheadline}
          </p>
        </motion.div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
            <div className="space-y-4 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              {content.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
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

            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              className="mt-10 grid gap-3 sm:grid-cols-2"
            >
              {content.trustBadges.map((badge) => (
                <motion.li
                  key={badge}
                  variants={staggerItem}
                  className="flex items-center gap-2 rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-bold text-emerald-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-emerald-200"
                >
                  <ShieldCheck size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  {badge}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.14 }} className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-emerald-950/10 ring-1 ring-emerald-100 dark:ring-emerald-900/40">
              <img
                src={SITE_IMAGES.aboutEden.familyCentered}
                alt="Child and family receiving compassionate, values-led ABA therapy support at Eden ABA Therapy"
                className="aspect-[4/5] w-full object-cover lg:aspect-[5/6]"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
