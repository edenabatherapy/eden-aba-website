"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { RBT_HERO_BADGES, RBT_HERO_JOURNEY_STEPS } from "@/lib/careers/rbt-careers-data";
import { getButtonClasses } from "@/lib/button-styles";
import { EASE_OUT } from "./rbt-motion";

export default function RbtHeroSection() {
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
      id="rbt-hero-section"
      className="relative overflow-hidden bg-gradient-to-br from-[#e8f8f2] via-white to-[#dff5f0] px-4 py-14 lg:px-8 lg:py-20"
      aria-labelledby="rbt-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-16 top-6 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-teal-100/50 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          <motion.p {...fade(0)} className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
            Clinical Roles
          </motion.p>
          <motion.h1
            {...fade(0.08)}
            id="rbt-hero-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Registered Behavior Technician (RBT) Careers
          </motion.h1>
          <motion.p {...fade(0.16)} className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            RBTs play a central role in child progress, caregiver confidence, and treatment consistency across natural
            environments.
          </motion.p>
          <motion.ul {...fade(0.24)} className="mt-6 flex flex-wrap gap-2">
            {RBT_HERO_BADGES.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-emerald-200 bg-white/90 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-sm"
              >
                {badge}
              </li>
            ))}
          </motion.ul>
          <motion.div {...fade(0.32)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/careers/open-roles" className={getButtonClasses("primary", "w-full sm:w-auto")}>
              View RBT Openings
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/careers/career-paths" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
              See Career Paths
            </Link>
          </motion.div>
        </div>

        <motion.aside
          {...fade(0.2)}
          className="rounded-[1.75rem] border border-emerald-100 bg-white p-6 shadow-lg shadow-emerald-900/5"
          aria-label="Your RBT journey starts here"
        >
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">Your RBT journey starts here</p>
          <ol className="relative mt-6 space-y-0">
            <div
              className="absolute bottom-4 left-[15px] top-4 w-0.5 origin-top bg-emerald-200"
              aria-hidden="true"
            >
              <motion.div
                className="h-full w-full bg-emerald-600"
                initial={reduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: reduceMotion ? 0 : 1.2, ease: EASE_OUT, delay: 0.4 }}
                style={{ transformOrigin: "top" }}
              />
            </div>
            {RBT_HERO_JOURNEY_STEPS.map((item, index) => (
              <motion.li
                key={item.label}
                initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.35 + index * 0.1, ease: EASE_OUT }}
                className="relative flex items-start gap-4 pb-5 last:pb-0"
              >
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-black text-white">
                  {item.step}
                </span>
                <div className="pt-1">
                  <p className="text-sm font-extrabold text-slate-900">{item.label}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.aside>
      </div>
    </section>
  );
}
