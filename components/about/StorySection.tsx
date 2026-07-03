"use client";

import { motion } from "framer-motion";
import { useOurStoryPage } from "@/contexts/OurStoryContent";
import { SITE_IMAGES } from "@/lib/site-images";
import { fadeUp, SectionEyebrow } from "./shared";

export default function StorySection() {
  const content = useOurStoryPage().foundation;

  return (
    <section className="px-4 py-20 lg:px-8 dark:bg-slate-950" aria-labelledby="our-foundation-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <motion.div {...fadeUp}>
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2
            id="our-foundation-heading"
            className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
          >
            {content.headline}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            {content.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
          <img
            src={SITE_IMAGES.aboutEden.familyCentered}
            alt="Family-centered autism care at Eden ABA Therapy"
            className="h-full min-h-[320px] w-full rounded-[2rem] object-cover shadow-xl shadow-emerald-900/10"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
