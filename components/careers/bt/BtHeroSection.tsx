"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { BT_HERO_BADGES, BT_HERO_JOURNEY_STEPS } from "@/lib/careers/bt-careers-data";
import { getButtonClasses } from "@/lib/button-styles";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

export default function BtHeroSection() {
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
      id="bt-hero-section"
      className="relative overflow-hidden bg-gradient-to-br from-[#f0faf0] via-white to-[#e8f8f2] px-4 py-14 lg:px-8 lg:py-20"
      aria-labelledby="bt-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-16 top-6 h-56 w-56 rounded-full bg-lime-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <motion.p {...fade(0)} className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
            Clinical Entry Roles
          </motion.p>
          <motion.h1
            {...fade(0.08)}
            id="bt-hero-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Behavior Technician (BT) Careers
          </motion.h1>
          <motion.p {...fade(0.16)} className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Start a meaningful career in autism care by helping children build communication, independence, play, social,
            and daily living skills with guidance from Eden&apos;s clinical team.
          </motion.p>
          <motion.p {...fade(0.2)} className="mt-3 max-w-xl text-base leading-7 text-slate-500">
            BT roles at Eden are designed for early-career professionals who want direct coaching, meaningful client
            impact, and a clear growth pathway.
          </motion.p>
          <motion.ul {...fade(0.24)} className="mt-6 flex flex-wrap gap-2">
            {BT_HERO_BADGES.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-lime-300/70 bg-white/90 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-sm"
              >
                {badge}
              </li>
            ))}
          </motion.ul>
          <motion.div {...fade(0.32)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/careers/open-roles" className={getButtonClasses("primary", "w-full sm:w-auto")}>
              View BT Openings
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/careers/rbt" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
              Learn About RBT Pathway
            </Link>
          </motion.div>
        </div>

        <motion.aside
          {...fade(0.2)}
          className="rounded-[1.75rem] border border-lime-200 bg-white p-6 shadow-lg shadow-emerald-900/5"
          aria-label="Your BT journey starts here"
        >
          <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">Your BT journey starts here</p>
          <ol className="relative mt-6 space-y-0">
            <div className="absolute bottom-4 left-[15px] top-4 w-0.5 bg-lime-200" aria-hidden="true">
              <motion.div
                className="h-full w-full bg-emerald-600"
                initial={reduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: reduceMotion ? 0 : 1.4, ease: EASE_OUT, delay: 0.4 }}
                style={{ transformOrigin: "top" }}
              />
            </div>
            {BT_HERO_JOURNEY_STEPS.map((item, index) => (
              <motion.li
                key={item.label}
                initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.35 + index * 0.09, ease: EASE_OUT }}
                className="relative flex items-start gap-4 pb-4 last:pb-0"
              >
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-black text-white">
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
