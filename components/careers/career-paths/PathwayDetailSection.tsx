"use client";

import { CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { CareerPathwayDetail } from "@/lib/careers/career-paths-careers-data";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

const FRAME = "rounded-[2rem] border border-teal-100 bg-white p-8 shadow-sm sm:p-10";

type PathwayDetailSectionProps = {
  pathway: CareerPathwayDetail;
  sectionId: string;
};

export default function PathwayDetailSection({ pathway, sectionId }: PathwayDetailSectionProps) {
  const reduceMotion = useReducedMotion();

  const columns = [
    { title: "Requirements", items: pathway.requirements },
    { title: "Skills", items: pathway.skills },
    { title: "Training", items: pathway.training },
    { title: "Milestones", items: pathway.milestones },
  ];

  return (
    <section id={sectionId} className={FRAME} aria-labelledby={`${sectionId}-heading`}>
      <h2 id={`${sectionId}-heading`} className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
        {pathway.title}
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">{pathway.summary}</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {columns.map((col, colIndex) => (
          <motion.div
            key={col.title}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: colIndex * 0.06, ease: EASE_OUT }}
            className="rounded-xl border border-teal-100 bg-gradient-to-br from-white to-teal-50/20 p-5"
          >
            <h3 className="text-sm font-black uppercase tracking-[0.12em] text-teal-800">{col.title}</h3>
            <ul className="mt-4 space-y-2">
              {col.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-7 text-slate-600">
                  <CheckCircle2 size={16} className="mt-1 shrink-0 text-teal-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
