"use client";

import { ArrowRight, GraduationCap, Heart, MapPin, MessageCircle, School, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import CtaLink from "@/components/about/CtaLink";
import { useOurApproachPage } from "@/contexts/OurApproachContent";
import { fadeUp, GlassPanel, SectionEyebrow, staggerContainer, staggerItem } from "./shared";

const PILLAR_ICONS = [MessageCircle, Sparkles, Heart, GraduationCap, School, MapPin];

export default function LifelongGrowth() {
  const content = useOurApproachPage().lifelongGrowth;

  return (
    <section
      className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-20 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20 lg:px-8"
      aria-labelledby="lifelong-growth-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 id="lifelong-growth-heading" className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
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
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {content.pillars.map((pillar, index) => {
            const Icon = PILLAR_ICONS[index] || Sparkles;
            return (
              <motion.li
                key={pillar}
                variants={staggerItem}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-2.5 text-sm font-bold text-emerald-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-emerald-200"
              >
                <Icon size={16} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                {pillar}
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.14 }} className="mt-10 text-center">
          <CtaLink href="/intake">
            {content.cta}
            <ArrowRight size={18} aria-hidden="true" />
          </CtaLink>
        </motion.div>
      </div>
    </section>
  );
}
