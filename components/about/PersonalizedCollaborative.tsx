"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import CtaLink from "@/components/about/CtaLink";
import { OUR_APPROACH_PAGE } from "@/lib/our-approach-content";
import { fadeUp, GlassPanel, SectionEyebrow, staggerContainer, staggerItem } from "./shared";

export default function PersonalizedCollaborative() {
  const content = OUR_APPROACH_PAGE.personalized;

  return (
    <section className="bg-slate-50 px-4 py-20 dark:bg-slate-900/50 lg:px-8" aria-labelledby="personalized-collaborative-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2
            id="personalized-collaborative-heading"
            className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl"
          >
            {content.headline}
          </h2>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="mt-12">
          <GlassPanel className="mx-auto max-w-4xl">
            <div className="space-y-5 text-base leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </GlassPanel>
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {content.features.map((feature) => (
            <motion.li
              key={feature}
              variants={staggerItem}
              className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
            >
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span className="text-sm font-semibold leading-6 text-slate-800 dark:text-slate-200 sm:text-base">
                {feature}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.12 }} className="mt-10 text-center">
          <CtaLink href="/intake">
            {content.cta}
            <ArrowRight size={18} aria-hidden="true" />
          </CtaLink>
        </motion.div>
      </div>
    </section>
  );
}
