"use client";

import { AlertCircle, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { GRANTS_DISCLAIMER, NATIONAL_GRANTS } from "@/lib/financial-assistance/national-grants";

const STATUS_STYLES = {
  Active: "bg-emerald-100 text-emerald-800",
  Seasonal: "bg-amber-100 text-amber-800",
  Verify: "bg-sky-100 text-sky-800",
  Limited: "bg-orange-100 text-orange-800",
} as const;

export default function NationalGrantsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="national-grants"
      className="scroll-mt-28 px-4 py-16 lg:px-8 lg:py-20"
      aria-labelledby="national-grants-heading"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
              })}
        >
          <h2 id="national-grants-heading" className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            National Autism Grants & Family Support
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
            Grant programs that families sometimes explore for autism-related expenses. Deadlines and funding change
            frequently—verify all details on official sites.
          </p>

          <div
            className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 dark:border-amber-800 dark:bg-amber-950/30"
            role="note"
          >
            <AlertCircle className="mt-0.5 shrink-0 text-amber-700 dark:text-amber-400" size={20} aria-hidden />
            <p className="text-sm leading-7 text-amber-900 dark:text-amber-100">{GRANTS_DISCLAIMER}</p>
          </div>
        </motion.div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {NATIONAL_GRANTS.map((grant) => (
            <li
              key={grant.id}
              className="flex h-full flex-col rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                    {grant.organization}
                  </p>
                  <h3 className="mt-2 text-lg font-extrabold text-slate-900 dark:text-white">{grant.title}</h3>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${STATUS_STYLES[grant.status]}`}
                >
                  {grant.status}
                </span>
              </div>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{grant.summary}</p>
              <p className="mt-3 text-sm">
                <span className="font-extrabold text-slate-800 dark:text-slate-200">Eligibility: </span>
                <span className="text-slate-600 dark:text-slate-400">{grant.eligibility}</span>
              </p>
              <p className="mt-2 text-xs font-semibold text-amber-800 dark:text-amber-300">{grant.deadlineNote}</p>
              <a
                href={grant.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-800 hover:underline dark:text-emerald-300"
              >
                View official program
                <ExternalLink size={14} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
