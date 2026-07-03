"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { CAREERS_HOME_HERO_COPY, CAREERS_HOME_HERO_JOURNEY } from "@/lib/careers/careers-home-data";
import { getButtonClasses } from "@/lib/button-styles";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

export default function CareersHomeHero() {
  const careersHomeHeroJourney = useLocalizedContent("CAREERS_HOME_HERO_JOURNEY", CAREERS_HOME_HERO_JOURNEY);
  const heroCopy = useLocalizedContent("CAREERS_HOME_HERO_COPY", CAREERS_HOME_HERO_COPY);
  const reduceMotion = useReducedMotion();

  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, ease: EASE_OUT, delay },
        };

  return (
    <section
      id="careers-home-hero"
      className="relative overflow-hidden bg-gradient-to-br from-[#e8f8f2] via-white to-[#dff5f0] px-4 py-14 lg:px-8 lg:py-20"
      aria-labelledby="careers-home-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-20 top-8 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-teal-100/50 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="text-center lg:text-left">
          <motion.span
            {...fade(0)}
            className="inline-flex rounded-full border border-lime-300/50 bg-lime-400/15 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-emerald-800"
          >
            {heroCopy.badge}
          </motion.span>
          <motion.div
            {...fade(0.08)}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-emerald-800 shadow-sm"
          >
            <MapPin size={16} aria-hidden="true" />
            {heroCopy.location}
          </motion.div>
          <motion.h1
            {...fade(0.16)}
            id="careers-home-heading"
            className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            {heroCopy.title}
          </motion.h1>
          <motion.p {...fade(0.24)} className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600 lg:mx-0">
            {heroCopy.subtitle}
          </motion.p>
          <motion.div {...fade(0.32)} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
            <Link href="/careers/open-roles" className={getButtonClasses("primary", "w-full sm:w-auto")}>
              {heroCopy.searchRoles}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/careers/career-paths" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
              {heroCopy.viewPaths}
            </Link>
            <Link href="/careers/talent-network" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
              {heroCopy.joinNetwork}
            </Link>
          </motion.div>
        </div>

        <motion.aside
          {...fade(0.2)}
          className="rounded-[1.75rem] border border-teal-100 bg-white p-6 shadow-lg shadow-teal-900/5"
          aria-label={heroCopy.journeyAria}
        >
          <p className="text-xs font-black uppercase tracking-[0.14em] text-teal-800">{heroCopy.journeyLabel}</p>
          <ol className="relative mt-6 space-y-0">
            <div className="absolute bottom-4 left-[15px] top-4 w-0.5 bg-teal-200" aria-hidden="true">
              <motion.div
                className="h-full w-full bg-teal-600"
                initial={reduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: reduceMotion ? 0 : 1.2, ease: EASE_OUT, delay: 0.35 }}
                style={{ transformOrigin: "top" }}
              />
            </div>
            {careersHomeHeroJourney.map((item, index) => (
              <motion.li
                key={item.label}
                initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.09, ease: EASE_OUT }}
                className="relative flex items-start gap-4 pb-4 last:pb-0"
              >
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-black text-white">
                  {item.step}
                </span>
                <p className="pt-1 text-sm font-extrabold text-slate-900">{item.label}</p>
              </motion.li>
            ))}
          </ol>
        </motion.aside>
      </div>
    </section>
  );
}
