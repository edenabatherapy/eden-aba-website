"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OUR_TEAM_PAGE } from "@/lib/our-team-content";
import { fadeUp, SectionEyebrow, staggerContainer, staggerItem } from "./shared";

function FounderAvatar({ initials, name }: { initials: string; name: string }) {
  return (
    <div
      className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-[#0b4f4f] to-[#128c8c] text-xl font-black text-white shadow-lg"
      role="img"
      aria-label={`${name} profile placeholder`}
    >
      {initials}
    </div>
  );
}

export default function FoundersSection() {
  const content = OUR_TEAM_PAGE.founders;

  return (
    <section
      id="our-founders"
      className="px-4 py-20 lg:px-8 dark:bg-slate-950"
      aria-labelledby="founders-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 id="founders-heading" className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            {content.headline}
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-8 lg:grid-cols-2"
        >
          {content.members.map((founder) => (
            <motion.article key={founder.name} variants={staggerItem}>
              <Card className="h-full overflow-hidden border-emerald-100 transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                <CardHeader className="border-b border-emerald-50 bg-gradient-to-br from-emerald-50/80 to-white p-8 dark:border-slate-800 dark:from-emerald-950/20 dark:to-slate-900">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <FounderAvatar initials={founder.initials} name={founder.name} />
                    <div>
                      <CardTitle className="text-2xl">{founder.name}</CardTitle>
                      <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                        {founder.title}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-8 text-base leading-8 text-slate-600 dark:text-slate-300">
                  {founder.bio.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
