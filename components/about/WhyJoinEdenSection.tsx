"use client";

import {
  Award,
  HeartHandshake,
  Lightbulb,
  Rocket,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOurTeamPage } from "@/contexts/OurTeamContent";
import { fadeUp, SectionEyebrow, staggerContainer, staggerItem } from "./shared";

const WHY_ICONS = [HeartHandshake, Award, Users, Sparkles, Lightbulb, Rocket];

export default function WhyJoinEdenSection() {
  const content = useOurTeamPage().whyJoin;

  return (
    <section className="px-4 py-20 lg:px-8 dark:bg-slate-950" aria-labelledby="why-join-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Why Join Eden</SectionEyebrow>
          <h2 id="why-join-heading" className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            {content.headline}
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {content.cards.map((card, index) => {
            const Icon = WHY_ICONS[index] || HeartHandshake;
            return (
              <motion.div key={card.title} variants={staggerItem}>
                <Card className="h-full transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
                  <CardHeader>
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700 dark:from-emerald-900/40 dark:to-teal-900/30 dark:text-emerald-300">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <CardTitle className="mt-4 text-xl">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-7 text-slate-600 dark:text-slate-300">{card.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
