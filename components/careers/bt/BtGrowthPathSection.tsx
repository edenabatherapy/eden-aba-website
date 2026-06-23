"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { BT_GROWTH_LADDER_DETAILED } from "@/lib/careers/bt-careers-data";
import { getButtonClasses } from "@/lib/button-styles";
import RbtScrollReveal from "@/components/careers/rbt/RbtScrollReveal";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

export default function BtGrowthPathSection() {
  const reduceMotion = useReducedMotion();

  return (
    <RbtScrollReveal>
      <section
        className="rounded-[2rem] border border-lime-200 bg-gradient-to-br from-white via-lime-50/30 to-emerald-50/40 p-8 shadow-sm sm:p-10"
        aria-labelledby="bt-growth-path-heading"
      >
        <h2 id="bt-growth-path-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Your growth path at Eden
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
          Many BTs grow toward RBT credentialing and long-term clinical leadership over time. Advancement depends on
          training, performance, supervision, and organizational needs.
        </p>

        <div className="mt-10 flex flex-col items-center">
          {BT_GROWTH_LADDER_DETAILED.map((step, index) => (
            <div key={step.title} className="flex w-full max-w-xl flex-col items-center">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.07, ease: EASE_OUT }}
                className="w-full rounded-xl border border-lime-200 bg-white px-5 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="text-base font-extrabold text-slate-900">{step.title}</h3>
                <p className="mt-1 text-sm leading-7 text-slate-600">{step.description}</p>
              </motion.div>
              {index < BT_GROWTH_LADDER_DETAILED.length - 1 && (
                <span className="my-2 text-xl font-black text-emerald-500" aria-hidden="true">
                  ↓
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:text-left">
          <Link href="/careers/career-paths" className={getButtonClasses("secondary", "inline-flex")}>
            Learn About Career Paths
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </RbtScrollReveal>
  );
}
