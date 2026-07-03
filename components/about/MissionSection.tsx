"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useOurStoryPage } from "@/contexts/OurStoryContent";
import { fadeUp, GlassPanel } from "./shared";

export default function MissionSection() {
  const content = useOurStoryPage().mission;

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 to-white px-4 py-20 dark:from-emerald-950/20 dark:to-slate-950 lg:px-8"
      aria-labelledby="our-mission-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent dark:via-emerald-700/40" aria-hidden="true" />

      <div className="mx-auto max-w-5xl">
        <motion.div {...fadeUp} className="text-center">
          <h2
            id="our-mission-heading"
            className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
          >
            {content.headline}
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-10"
        >
          <GlassPanel className="relative overflow-hidden">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-200/40 blur-2xl dark:bg-emerald-600/20" aria-hidden="true" />
            <Card className="border-0 bg-transparent shadow-none">
              <CardContent className="relative p-8 sm:p-10">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                  <Sparkles size={16} aria-hidden="true" />
                  Our Mission
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-xl font-semibold leading-9 text-slate-800 dark:text-slate-100 sm:text-2xl sm:leading-10"
                >
                  {content.statement}
                </motion.p>
              </CardContent>
            </Card>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
