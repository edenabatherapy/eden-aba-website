"use client";

import { ArrowRight, Award, HeartHandshake, Lightbulb, ShieldCheck, Sparkles, Target, Users } from "lucide-react";
import { motion } from "framer-motion";
import CtaLink from "@/components/about/CtaLink";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { OUR_APPROACH_PAGE } from "@/lib/our-approach-content";
import { fadeUp, SectionEyebrow, staggerContainer, staggerItem } from "./shared";

const VALUE_ICONS = [HeartHandshake, ShieldCheck, Users, Sparkles, Lightbulb, Award];

export default function ApproachValuesPreview() {
  const content = OUR_APPROACH_PAGE.valuesPreview;

  return (
    <section className="px-4 py-20 lg:px-8 dark:bg-slate-950" aria-labelledby="approach-values-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 id="approach-values-heading" className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            {content.headline}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">{content.intro}</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {content.values.map((value, index) => {
            const Icon = VALUE_ICONS[index] || Target;
            return (
              <motion.div key={value} variants={staggerItem}>
                <Card className="h-full transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
                  <CardHeader>
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <CardTitle className="mt-3 text-xl">{value}</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.12 }} className="mt-10 text-center">
          <CtaLink href={content.ctaHref} variant="secondary">
            {content.cta}
            <ArrowRight size={18} aria-hidden="true" />
          </CtaLink>
        </motion.div>
      </div>
    </section>
  );
}
