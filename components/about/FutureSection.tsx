"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useOurStoryPage } from "@/contexts/OurStoryContent";
import { fadeUp, SectionEyebrow } from "./shared";

export default function FutureSection() {
  const content = useOurStoryPage().future;

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-900 px-4 py-20 text-white lg:px-8"
      aria-labelledby="looking-ahead-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_45%)]" aria-hidden="true" />

      <motion.div {...fadeUp} className="relative mx-auto max-w-4xl">
        <SectionEyebrow>
          <span className="text-emerald-100">Looking Ahead</span>
        </SectionEyebrow>
        <h2 id="looking-ahead-heading" className="mt-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
          {content.headline}
        </h2>
        <div className="mt-6 space-y-4 text-base leading-8 text-emerald-50 sm:text-lg">
          {content.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <ul className="mt-6 space-y-3">
          {content.commitments.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base font-semibold sm:text-lg">
              <CheckCircle2 size={20} className="mt-1 shrink-0 text-emerald-200" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
