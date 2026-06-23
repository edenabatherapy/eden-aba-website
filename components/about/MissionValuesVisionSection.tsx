"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import CtaLink from "@/components/about/CtaLink";
import { MISSION_VALUES_PAGE } from "@/lib/mission-values-content";
import { fadeUp, SectionEyebrow, staggerContainer, staggerItem } from "./shared";

export default function MissionValuesVisionSection() {
  const content = MISSION_VALUES_PAGE.vision;

  return (
    <section
      className="bg-gradient-to-br from-emerald-900 via-[#0b4f4f] to-emerald-800 px-4 py-20 text-white lg:px-8"
      aria-labelledby="vision-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">{content.eyebrow}</p>
          <h2 id="vision-heading" className="mt-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            {content.headline}
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.08 }}
          className="mx-auto mt-10 max-w-4xl space-y-5 text-base leading-8 text-emerald-50 sm:text-lg"
        >
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {content.pillars.map((pillar) => (
            <motion.li
              key={pillar}
              variants={staggerItem}
              className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-bold backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/15"
            >
              {pillar}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.14 }} className="mt-10 text-center">
          <CtaLink href={content.ctaHref} variant="secondary" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
            {content.cta}
            <ArrowRight size={18} aria-hidden="true" />
          </CtaLink>
        </motion.div>
      </div>
    </section>
  );
}
