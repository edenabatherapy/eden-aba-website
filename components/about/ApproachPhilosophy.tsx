"use client";

import { ArrowRight, Heart, Lightbulb, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";
import CtaLink from "@/components/about/CtaLink";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { OUR_APPROACH_PAGE } from "@/lib/our-approach-content";
import { fadeUp, GlassPanel, SectionEyebrow, staggerContainer, staggerItem } from "./shared";

const PHILOSOPHY_ICONS = [Heart, Lightbulb, Sparkles, Users];

export default function ApproachPhilosophy() {
  const content = OUR_APPROACH_PAGE.philosophy;

  return (
    <section className="px-4 py-20 lg:px-8 dark:bg-slate-950" aria-labelledby="approach-philosophy-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2
            id="approach-philosophy-heading"
            className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {content.cards.map((card, index) => {
            const Icon = PHILOSOPHY_ICONS[index] || Heart;
            return (
              <motion.div key={card} variants={staggerItem}>
                <Card className="h-full transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
                  <CardHeader>
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <CardTitle className="mt-3 text-lg">{card}</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

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
