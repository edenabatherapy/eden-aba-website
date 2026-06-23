"use client";

import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { CAREERS_PAGE, FUTURE_GROWTH_AREAS } from "@/lib/careers-content";
import { getButtonClasses } from "@/lib/button-styles";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export default function CareersFutureLocations() {
  return (
    <section className="bg-slate-50 px-4 py-16 dark:bg-slate-900/50 lg:px-8" aria-labelledby="future-locations-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="max-w-3xl">
          <h2 id="future-locations-heading" className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            {CAREERS_PAGE.futureLocations.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
            {CAREERS_PAGE.futureLocations.description}
          </p>
        </motion.div>

        <motion.ul
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.08 }}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {FUTURE_GROWTH_AREAS.map((city) => (
            <li key={city}>
              <article className="flex h-full flex-col rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
                <div className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                  <MapPin size={16} aria-hidden="true" />
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{city}</h3>
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {CAREERS_PAGE.futureGrowthLabel}
                </p>
                <a
                  href="#talent-network"
                  className={`${getButtonClasses("secondary", "mt-5 w-full")} mt-auto`}
                >
                  {CAREERS_PAGE.joinTalentNetwork}
                </a>
              </article>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
