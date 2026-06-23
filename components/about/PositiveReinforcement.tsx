"use client";

import { ArrowRight, Award, Heart, Sparkles, Star, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import CtaLink from "@/components/about/CtaLink";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OUR_APPROACH_PAGE } from "@/lib/our-approach-content";
import { fadeUp, SectionEyebrow, staggerContainer, staggerItem } from "./shared";

const HIGHLIGHT_ICONS = [Star, TrendingUp, Award, Sparkles, Heart, Target];

export default function PositiveReinforcement() {
  const content = OUR_APPROACH_PAGE.positiveReinforcement;

  return (
    <section
      className="bg-gradient-to-br from-emerald-900 via-[#0b4f4f] to-emerald-800 px-4 py-20 text-white lg:px-8"
      aria-labelledby="positive-reinforcement-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">{content.eyebrow}</p>
          <h2 id="positive-reinforcement-heading" className="mt-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {content.highlights.map((highlight, index) => {
            const Icon = HIGHLIGHT_ICONS[index] || Star;
            return (
              <motion.div key={highlight} variants={staggerItem}>
                <Card className="h-full border-white/10 bg-white/10 text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                  <CardHeader>
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 text-lime-200">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <CardTitle className="mt-3 text-lg text-white">{highlight}</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

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
