"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { OUR_STORY_PAGE } from "@/lib/our-story-content";
import { fadeUp, GlassPanel, SectionEyebrow } from "./shared";

export default function ApproachSection() {
  const content = OUR_STORY_PAGE.approach;

  return (
    <section className="px-4 py-20 lg:px-8 dark:bg-slate-950" aria-labelledby="clinical-approach-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Our Approach</SectionEyebrow>
          <h2
            id="clinical-approach-heading"
            className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
          >
            {content.headline}
          </h2>
        </motion.div>

        <motion.ul
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.08 }}
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {content.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
            >
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span className="text-sm font-semibold leading-6 text-slate-800 dark:text-slate-200 sm:text-base">
                {feature}
              </span>
            </li>
          ))}
        </motion.ul>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.12 }} className="mt-12">
          <GlassPanel className="mx-auto max-w-4xl">
            <div className="space-y-4 text-base leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">
              {content.body.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className={index >= 1 ? "font-semibold text-slate-900 dark:text-white" : undefined}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
