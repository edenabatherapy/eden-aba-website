"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import CareerBreadcrumbs from "@/components/careers/hub/CareerBreadcrumbs";
import CareerPageShell from "@/components/careers/hub/CareerPageShell";
import FAQAccordion from "@/components/careers/hub/FAQAccordion";
import RbtScrollReveal, { RbtStaggerGrid, RbtStaggerItem } from "@/components/careers/rbt/RbtScrollReveal";
import {
  BT_RBT_DIFFERENCES,
  BT_RBT_EDUCATIONAL_NOTICE,
  BT_RBT_FAQ,
  BT_RBT_GROWTH_PATH,
  BT_RBT_HERO_BADGES,
  BT_RBT_RESPONSIBILITIES,
  BT_RBT_SUPERVISION,
  BT_RBT_WHAT_IS_BT,
  BT_RBT_WHAT_IS_RBT,
} from "@/lib/careers/behavior-technician-careers-data";
import { getButtonClasses } from "@/lib/button-styles";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

const FRAME = "rounded-[2rem] border border-teal-100 bg-white p-8 shadow-sm sm:p-10";

export default function BehaviorTechnicianCareersPage() {
  const reduceMotion = useReducedMotion();

  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, ease: EASE_OUT, delay },
        };

  return (
    <CareerPageShell>
      <CareerBreadcrumbs
        items={[
          { label: "Careers", href: "/careers" },
          { label: "Behavior Technician Careers (BT & RBT)" },
        ]}
      />

      <section
        className="relative overflow-hidden bg-gradient-to-br from-[#e8f8f2] via-white to-[#dff5f0] px-4 py-14 lg:px-8 lg:py-20"
        aria-labelledby="bt-rbt-hub-heading"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-16 top-6 h-56 w-56 rounded-full bg-teal-200/40 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p {...fade(0)} className="text-xs font-black uppercase tracking-[0.16em] text-teal-800">
            Direct Care Careers
          </motion.p>
          <motion.h1
            {...fade(0.08)}
            id="bt-rbt-hub-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Behavior Technician Careers (BT &amp; RBT)
          </motion.h1>
          <motion.p {...fade(0.16)} className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Entry-level and certified ABA therapy careers with supervised practice, family-centered care, and clear
            pathways toward clinical growth across Annandale and Northern Virginia.
          </motion.p>
          <motion.ul {...fade(0.24)} className="mt-6 flex flex-wrap justify-center gap-2">
            {BT_RBT_HERO_BADGES.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-teal-200 bg-white/90 px-3 py-1.5 text-xs font-bold text-teal-900 shadow-sm"
              >
                {badge}
              </li>
            ))}
          </motion.ul>
          <motion.div {...fade(0.32)} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/careers/bt" className={getButtonClasses("primary", "w-full sm:w-auto")}>
              Explore BT Careers
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/careers/rbt" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
              Explore RBT Careers
            </Link>
            <Link href="/careers/open-roles" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
              Search Open Roles
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 pb-24 lg:px-8 lg:py-20 lg:pb-20">
        <RbtScrollReveal>
          <section className="grid gap-6 lg:grid-cols-2" aria-labelledby="what-is-bt-heading">
            <article className={`${FRAME} bg-gradient-to-br from-white to-teal-50/30`}>
              <h2 id="what-is-bt-heading" className="text-2xl font-extrabold text-slate-900">
                {BT_RBT_WHAT_IS_BT.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{BT_RBT_WHAT_IS_BT.summary}</p>
              <ul className="mt-6 space-y-3">
                {BT_RBT_WHAT_IS_BT.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-7 text-slate-600">
                    <CheckCircle2 size={16} className="mt-1 shrink-0 text-teal-700" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link href="/careers/bt" className={`${getButtonClasses("secondary", "mt-8 inline-flex text-sm")}`}>
                BT role details
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </article>

            <article className={`${FRAME} bg-gradient-to-br from-white to-emerald-50/30`}>
              <h2 className="text-2xl font-extrabold text-slate-900">{BT_RBT_WHAT_IS_RBT.title}</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{BT_RBT_WHAT_IS_RBT.summary}</p>
              <ul className="mt-6 space-y-3">
                {BT_RBT_WHAT_IS_RBT.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-7 text-slate-600">
                    <CheckCircle2 size={16} className="mt-1 shrink-0 text-teal-700" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link href="/careers/rbt" className={`${getButtonClasses("secondary", "mt-8 inline-flex text-sm")}`}>
                RBT role details
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </article>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section aria-labelledby="differences-heading">
            <h2 id="differences-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Key differences between BT and RBT
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              Both roles support children and families through direct ABA care. The main distinction is typically
              credential status, supervision expectations, and career entry point.
            </p>
            <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-teal-100 bg-white shadow-sm">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-teal-50/80">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-extrabold text-slate-900 sm:px-6">
                      Aspect
                    </th>
                    <th scope="col" className="px-4 py-3 font-extrabold text-slate-900 sm:px-6">
                      BT
                    </th>
                    <th scope="col" className="px-4 py-3 font-extrabold text-slate-900 sm:px-6">
                      RBT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {BT_RBT_DIFFERENCES.map((row) => (
                    <tr key={row.aspect} className="border-t border-teal-50">
                      <th scope="row" className="px-4 py-4 font-bold text-slate-800 sm:px-6">
                        {row.aspect}
                      </th>
                      <td className="px-4 py-4 leading-7 text-slate-600 sm:px-6">{row.bt}</td>
                      <td className="px-4 py-4 leading-7 text-slate-600 sm:px-6">{row.rbt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section className={FRAME} aria-labelledby="responsibilities-heading">
            <h2 id="responsibilities-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Typical responsibilities
            </h2>
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.12em] text-teal-800">Shared focus</h3>
                <ul className="mt-4 space-y-2">
                  {BT_RBT_RESPONSIBILITIES.shared.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-7 text-slate-600">
                      <span className="text-teal-600" aria-hidden="true">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.12em] text-teal-800">BT emphasis</h3>
                <ul className="mt-4 space-y-2">
                  {BT_RBT_RESPONSIBILITIES.bt.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-7 text-slate-600">
                      <span className="text-teal-600" aria-hidden="true">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.12em] text-teal-800">RBT emphasis</h3>
                <ul className="mt-4 space-y-2">
                  {BT_RBT_RESPONSIBILITIES.rbt.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-7 text-slate-600">
                      <span className="text-teal-600" aria-hidden="true">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section aria-labelledby="supervision-heading">
            <h2 id="supervision-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Training and supervision expectations
            </h2>
            <RbtStaggerGrid className="mt-8 grid gap-4 sm:grid-cols-2">
              {BT_RBT_SUPERVISION.map((item) => (
                <RbtStaggerItem key={item.title}>
                  <div className="h-full rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <h3 className="text-base font-extrabold text-teal-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                  </div>
                </RbtStaggerItem>
              ))}
            </RbtStaggerGrid>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section className={`${FRAME} bg-gradient-to-br from-white via-teal-50/20 to-emerald-50/30`} aria-labelledby="growth-heading">
            <h2 id="growth-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Career progression pathway
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
              Advancement depends on credential eligibility, performance, supervision, and organizational needs—not
              guaranteed timelines.
            </p>
            <div className="mt-8 flex flex-col items-center">
              {BT_RBT_GROWTH_PATH.map((step, index) => (
                <div key={step.stage} className="flex w-full max-w-xl flex-col items-center">
                  <motion.article
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: index * 0.05, ease: EASE_OUT }}
                    className="w-full rounded-xl border border-teal-100 bg-white px-5 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <h3 className="text-base font-extrabold text-teal-900">{step.stage}</h3>
                    <p className="mt-1 text-sm leading-7 text-slate-600">{step.note}</p>
                  </motion.article>
                  {index < BT_RBT_GROWTH_PATH.length - 1 && (
                    <span className="my-2 text-xl font-black text-teal-500" aria-hidden="true">
                      ↓
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/careers/career-paths" className={getButtonClasses("secondary", "inline-flex")}>
                Explore Career Paths
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/careers/bcba" className={getButtonClasses("secondary", "inline-flex")}>
                BCBA Careers
              </Link>
            </div>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <FAQAccordion title="BT & RBT career questions" items={BT_RBT_FAQ} />
        </RbtScrollReveal>

        <RbtScrollReveal>
          <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
            {BT_RBT_EDUCATIONAL_NOTICE}
          </p>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section
            className="rounded-[2rem] border border-teal-200 bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-700 p-8 text-white shadow-lg sm:p-10"
            aria-labelledby="bt-rbt-cta-heading"
          >
            <h2 id="bt-rbt-cta-heading" className="text-2xl font-extrabold sm:text-3xl">
              Ready to choose your pathway?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-teal-50">
              Explore the role that fits your experience today, then review open positions or join Eden&apos;s talent
              network for future opportunities.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/careers/bt"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-900 shadow-sm transition hover:bg-teal-50"
              >
                Explore BT Careers
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/careers/rbt"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Explore RBT Careers
              </Link>
              <Link
                href="/careers/open-roles"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Search Open Roles
              </Link>
            </div>
          </section>
        </RbtScrollReveal>
      </div>
    </CareerPageShell>
  );
}
