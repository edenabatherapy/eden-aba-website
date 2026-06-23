"use client";

import { motion } from "framer-motion";
import { MISSION_VALUES_PAGE } from "@/lib/mission-values-content";
import { fadeUp, SectionEyebrow, staggerContainer, staggerItem } from "./shared";

export default function MissionInActionSection() {
  const content = MISSION_VALUES_PAGE.missionInAction;

  return (
    <section
      className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-20 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20 lg:px-8"
      aria-labelledby="mission-in-action-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2
            id="mission-in-action-heading"
            className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl"
          >
            {content.headline}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">{content.intro}</p>
        </motion.div>

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative mt-14 grid gap-6 lg:grid-cols-2"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-emerald-200 via-emerald-300 to-transparent lg:block"
            aria-hidden="true"
          />

          {content.steps.map((step, index) => (
            <motion.li
              key={step.title}
              variants={staggerItem}
              className="relative rounded-[1.75rem] border border-emerald-100 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex items-start gap-4">
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#0b4f4f] to-[#128c8c] text-sm font-black text-white"
                  aria-hidden="true"
                >
                  {index + 1}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                    {step.step}
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">{step.description}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
