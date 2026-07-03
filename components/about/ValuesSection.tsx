"use client";

import { motion } from "framer-motion";
import {
  Award,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOurStoryPage } from "@/contexts/OurStoryContent";
import { fadeUp, SectionEyebrow, staggerContainer, staggerItem } from "./shared";

const VALUE_ICONS = [HeartHandshake, Award, Users, ShieldCheck, Sparkles, Target];

export default function ValuesSection() {
  const values = useOurStoryPage().values.items;

  return (
    <section className="bg-slate-50 px-4 py-20 dark:bg-slate-900/50 lg:px-8" aria-labelledby="core-values-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Our Values</SectionEyebrow>
          <h2 id="core-values-heading" className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            The Principles That Guide Everything We Do
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {values.map((value, index) => {
            const Icon = VALUE_ICONS[index] || HeartHandshake;
            return (
              <motion.div key={value.title} variants={staggerItem}>
                <Card className="h-full transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
                  <CardHeader>
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                      <Icon size={24} aria-hidden="true" />
                    </div>
                    <CardTitle className="mt-4 text-2xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-7 text-slate-600 dark:text-slate-300">{value.description}</p>
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
