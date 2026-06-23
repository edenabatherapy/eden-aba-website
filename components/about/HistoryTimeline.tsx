"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { OUR_STORY_PAGE } from "@/lib/our-story-content";
import { fadeUp } from "./shared";

export default function HistoryTimeline() {
  const content = OUR_STORY_PAGE.timeline;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      className="bg-gradient-to-b from-emerald-50/50 to-white px-4 py-20 dark:from-emerald-950/20 dark:to-slate-950 lg:px-8"
      aria-labelledby="aba-timeline-heading"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div {...fadeUp} className="text-center">
          <h2 id="aba-timeline-heading" className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">{content.intro}</p>
        </motion.div>

        <ol className="relative mt-12">
          <div
            className="absolute bottom-0 left-[1.15rem] top-0 w-0.5 bg-gradient-to-b from-emerald-300 via-emerald-200 to-emerald-100 dark:from-emerald-700 dark:via-emerald-800 dark:to-emerald-900 sm:left-6"
            aria-hidden="true"
          />

          {content.events.map((event, index) => {
            const isActive = activeIndex === index;
            const isToday = event.year === "Today";

            return (
              <motion.li
                key={`${event.year}-${index}`}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.04 }}
                className="relative grid gap-4 pb-10 pl-12 sm:grid-cols-[7rem_1fr] sm:gap-8 sm:pl-0 sm:pb-12"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
              >
                <div
                  className={`absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border-2 bg-white shadow-sm transition sm:relative sm:left-auto sm:top-auto sm:mx-auto sm:h-12 sm:w-12 ${
                    isActive || isToday
                      ? "border-emerald-600 scale-110 shadow-lg shadow-emerald-600/20"
                      : "border-emerald-400 dark:border-emerald-600"
                  }`}
                >
                  <BookOpen size={16} className="text-emerald-700 dark:text-emerald-300 sm:hidden" aria-hidden="true" />
                  <span className="sr-only">{event.year}</span>
                </div>

                <div className="sm:col-start-1 sm:text-right">
                  <p
                    className={`text-lg font-extrabold sm:text-xl ${
                      isToday ? "text-emerald-700 dark:text-emerald-300" : "text-emerald-700 dark:text-emerald-400"
                    }`}
                  >
                    {event.year}
                  </p>
                </div>

                <div
                  className={`rounded-2xl border p-5 shadow-md transition sm:col-start-2 ${
                    isActive || isToday
                      ? "border-emerald-300 bg-white shadow-xl shadow-emerald-900/10 dark:border-emerald-700 dark:bg-slate-900"
                      : "border-slate-100 bg-white/90 shadow-slate-200/40 dark:border-slate-700 dark:bg-slate-900/70"
                  }`}
                >
                  <p className="text-base leading-7 text-slate-700 dark:text-slate-300">{event.text}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
