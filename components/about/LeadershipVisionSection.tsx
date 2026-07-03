"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useOurTeamPage } from "@/contexts/OurTeamContent";
import { fadeUp, GlassPanel, SectionEyebrow } from "./shared";

export default function LeadershipVisionSection() {
  const content = useOurTeamPage().leadershipVision;

  return (
    <section
      className="bg-slate-50 px-4 py-20 dark:bg-slate-900/50 lg:px-8"
      aria-labelledby="leadership-vision-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Our Leadership Vision</SectionEyebrow>
          <h2
            id="leadership-vision-heading"
            className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl"
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
              <p className="font-semibold text-slate-900 dark:text-white">Our goal is simple:</p>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {content.goals.map((goal) => (
                <li
                  key={goal}
                  className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-bold text-emerald-900 dark:border-slate-700 dark:bg-slate-900 dark:text-emerald-200"
                >
                  <CheckCircle2 size={18} className="shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  {goal}
                </li>
              ))}
            </ul>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
