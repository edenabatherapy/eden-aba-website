"use client";

import { useState } from "react";
import {
  Award,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OUR_TEAM_PAGE } from "@/lib/our-team-content";
import { fadeUp, SectionEyebrow, staggerContainer, staggerItem } from "./shared";

const VALUE_ICONS = [HeartHandshake, ShieldCheck, Users, Sparkles, Lightbulb, Award];

export default function TeamValuesSection() {
  const content = OUR_TEAM_PAGE.teamValues;
  const [expandedTitle, setExpandedTitle] = useState<string | null>(null);

  return (
    <section className="bg-slate-50 px-4 py-20 dark:bg-slate-900/50 lg:px-8" aria-labelledby="team-values-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Our Values In Action</SectionEyebrow>
          <h2 id="team-values-heading" className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
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
          {content.items.map((value, index) => {
            const Icon = VALUE_ICONS[index] || Target;
            const isExpanded = expandedTitle === value.title;

            return (
              <motion.div key={value.title} variants={staggerItem}>
                <Card
                  className={`h-full transition duration-300 dark:border-slate-700 dark:bg-slate-900 ${
                    isExpanded
                      ? "-translate-y-1 border-emerald-300 shadow-xl"
                      : "hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
                  }`}
                >
                  <CardHeader>
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                      <Icon size={24} aria-hidden="true" />
                    </div>
                    <CardTitle className="mt-4 text-2xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-7 text-slate-600 dark:text-slate-300">{value.shortDescription}</p>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isExpanded ? "mt-4 max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                      id={`team-value-${value.title.replace(/\s+/g, "-").toLowerCase()}`}
                    >
                      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{value.fullDescription}</p>
                    </div>
                    <button
                      type="button"
                      className="mt-4 text-sm font-bold text-emerald-700 underline-offset-4 transition hover:text-emerald-900 hover:underline dark:text-emerald-300"
                      aria-expanded={isExpanded}
                      aria-controls={`team-value-${value.title.replace(/\s+/g, "-").toLowerCase()}`}
                      onClick={() => setExpandedTitle(isExpanded ? null : value.title)}
                    >
                      {isExpanded ? "Show less" : "Learn more"}
                    </button>
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
