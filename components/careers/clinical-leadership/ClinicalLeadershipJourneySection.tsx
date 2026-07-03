"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { motion, useReducedMotion } from "framer-motion";
import { CL_LEADERSHIP_LADDER } from "@/lib/careers/clinical-leadership-careers-data";
import RbtScrollReveal from "@/components/careers/rbt/RbtScrollReveal";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

export default function ClinicalLeadershipJourneySection() {
  const clLeadershipLadder = useLocalizedContent("CL_LEADERSHIP_LADDER", CL_LEADERSHIP_LADDER);

  const reduceMotion = useReducedMotion();

  return (
    <RbtScrollReveal>
      <section
        id="cl-leadership-pathways"
        className="rounded-[2rem] border border-teal-100 bg-gradient-to-br from-white via-teal-50/25 to-emerald-50/40 p-8 shadow-sm sm:p-10"
        aria-labelledby="cl-journey-heading"
      >
        <h2 id="cl-journey-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Leadership journey timeline
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
          Advancement depends on credential eligibility, performance, mentorship, and organizational needs—not guaranteed
          timelines.
        </p>

        <div className="mt-10 flex flex-col items-center">
          {clLeadershipLadder.map((level, index) => (
            <div key={level.title} className="flex w-full max-w-2xl flex-col items-center">
              <motion.article
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: EASE_OUT }}
                className="w-full rounded-xl border border-teal-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
              >
                <h3 className="text-lg font-extrabold text-teal-900">{level.title}</h3>
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-black uppercase tracking-[0.1em] text-teal-800">Primary responsibilities</dt>
                    <dd className="mt-1 text-sm leading-7 text-slate-600">{level.primaryResponsibilities}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-black uppercase tracking-[0.1em] text-teal-800">Leadership focus</dt>
                    <dd className="mt-1 text-sm leading-7 text-slate-600">{level.leadershipFocus}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-black uppercase tracking-[0.1em] text-teal-800">Team impact</dt>
                    <dd className="mt-1 text-sm leading-7 text-slate-600">{level.teamImpact}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-black uppercase tracking-[0.1em] text-teal-800">Growth opportunities</dt>
                    <dd className="mt-1 text-sm leading-7 text-slate-600">{level.growthOpportunities}</dd>
                  </div>
                </dl>
              </motion.article>
              {index < clLeadershipLadder.length - 1 && (
                <span className="my-2 text-xl font-black text-teal-500" aria-hidden="true">
                  ↓
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    </RbtScrollReveal>
  );
}
