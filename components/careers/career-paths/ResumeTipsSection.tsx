"use client";

import { FileText } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import FAQAccordion from "@/components/careers/hub/FAQAccordion";
import {
  RESUME_BEST_PRACTICES,
  RESUME_CLINICAL_SKILLS,
  RESUME_EDUCATION_GUIDANCE,
  RESUME_EXPERIENCE_EXAMPLES,
  RESUME_FAQ,
  RESUME_FORMATTING_TIPS,
} from "@/lib/careers/career-paths-interview-data";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

const FRAME = "scroll-mt-28 rounded-[2rem] border border-teal-100 bg-white p-8 shadow-sm sm:p-10";

export default function ResumeTipsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="resume-tips" className={FRAME} aria-labelledby="resume-tips-heading">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white">
          <FileText size={20} aria-hidden="true" />
        </span>
        <h2 id="resume-tips-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Resume Tips
        </h2>
      </div>
      <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
        Build a stronger application with role clarity, impact language, and professional formatting for ABA careers.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {RESUME_BEST_PRACTICES.map((item, index) => (
          <motion.article
            key={item.title}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: EASE_OUT }}
            className="rounded-xl border border-teal-100 bg-gradient-to-br from-white to-teal-50/20 p-5 shadow-sm"
          >
            <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
          </motion.article>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">Experience examples</h3>
          <ul className="mt-4 space-y-2">
            {RESUME_EXPERIENCE_EXAMPLES.map((line) => (
              <li key={line} className="rounded-lg border border-teal-50 bg-teal-50/40 px-4 py-3 text-sm leading-7 text-slate-700">
                {line}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">Clinical skills to highlight</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {RESUME_CLINICAL_SKILLS.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-teal-200 bg-white px-3 py-1.5 text-xs font-bold text-teal-900"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-extrabold text-slate-900">Education guidance</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {RESUME_EDUCATION_GUIDANCE.map((item) => (
            <li key={item.title} className="rounded-xl border border-teal-100 bg-white p-4 shadow-sm">
              <h4 className="text-sm font-extrabold text-teal-900">{item.title}</h4>
              <p className="mt-1 text-sm leading-7 text-slate-600">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 rounded-[1.25rem] border border-teal-100 bg-gradient-to-br from-emerald-50/30 to-white p-6">
        <h3 className="text-lg font-extrabold text-slate-900">Professional formatting tips</h3>
        <ul className="mt-4 space-y-2">
          {RESUME_FORMATTING_TIPS.map((tip) => (
            <li key={tip} className="flex gap-2 text-sm leading-7 text-slate-600">
              <span className="font-black text-teal-600" aria-hidden="true">
                •
              </span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <FAQAccordion title="Resume FAQ" items={RESUME_FAQ} />
      </div>
    </section>
  );
}
