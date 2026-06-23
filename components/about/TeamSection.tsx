"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OUR_STORY_PAGE } from "@/lib/our-story-content";
import { fadeUp, SectionEyebrow, staggerContainer, staggerItem } from "./shared";

export default function TeamSection() {
  const content = OUR_STORY_PAGE.team;

  return (
    <section className="px-4 py-20 lg:px-8 dark:bg-slate-950" aria-labelledby="our-team-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="max-w-3xl">
          <SectionEyebrow>Our Team</SectionEyebrow>
          <h2 id="our-team-heading" className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            {content.headline}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">{content.body}</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {content.roles.map((role) => (
            <motion.div key={role} variants={staggerItem}>
              <Card className="h-full transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900">
                <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                    <Users size={20} aria-hidden="true" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">{role}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Dedicated professionals supporting meaningful outcomes for children and families.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
