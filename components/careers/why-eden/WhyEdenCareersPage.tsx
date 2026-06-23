"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import CareerBreadcrumbs from "@/components/careers/hub/CareerBreadcrumbs";
import CareerPageShell from "@/components/careers/hub/CareerPageShell";
import RbtScrollReveal, { RbtStaggerGrid, RbtStaggerItem } from "@/components/careers/rbt/RbtScrollReveal";
import {
  WHY_EDEN_CHOOSE_CARDS,
  WHY_EDEN_DIFFERENT_ITEMS,
  WHY_EDEN_GROWTH_PATH,
  WHY_EDEN_HERO_BADGES,
  WHY_EDEN_THRIVES_CARDS,
} from "@/lib/careers/why-eden-careers-data";
import { getButtonClasses } from "@/lib/button-styles";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

const FRAME = "rounded-[2rem] border border-teal-100 bg-white p-8 shadow-sm sm:p-10";

export default function WhyEdenCareersPage() {
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
      <CareerBreadcrumbs items={[{ label: "Careers", href: "/careers" }, { label: "Why Eden?" }]} />

      {/* Hero */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-[#e8f8f2] via-white to-[#dff5f0] px-4 py-14 lg:px-8 lg:py-20"
        aria-labelledby="why-eden-heading"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-16 top-6 h-56 w-56 rounded-full bg-teal-200/40 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p {...fade(0)} className="text-xs font-black uppercase tracking-[0.16em] text-teal-800">
            Why Eden?
          </motion.p>
          <motion.h1
            {...fade(0.08)}
            id="why-eden-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Why Eden ABA Therapy?
          </motion.h1>
          <motion.p {...fade(0.16)} className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Join a team built around ethical ABA practice, family partnership, clinical support, and meaningful career
            growth across Annandale and Northern Virginia.
          </motion.p>
          <motion.ul {...fade(0.24)} className="mt-6 flex flex-wrap justify-center gap-2">
            {WHY_EDEN_HERO_BADGES.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-teal-200 bg-white/90 px-3 py-1.5 text-xs font-bold text-teal-900 shadow-sm"
              >
                {badge}
              </li>
            ))}
          </motion.ul>
          <motion.div {...fade(0.32)} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/careers/open-roles" className={getButtonClasses("primary", "w-full sm:w-auto")}>
              Search Open Roles
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/careers/career-paths" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
              View Career Paths
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 pb-24 lg:px-8 lg:py-20 lg:pb-20">
        {/* Why choose Eden */}
        <RbtScrollReveal>
          <section aria-labelledby="why-choose-heading">
            <h2 id="why-choose-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Why choose Eden
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              Eden is designed for professionals who want meaningful clinical work, respectful team culture, and room to
              grow.
            </p>
            <RbtStaggerGrid className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_EDEN_CHOOSE_CARDS.map((card) => (
                <RbtStaggerItem key={card.title}>
                  <div className="h-full rounded-[1.5rem] border border-teal-100 bg-gradient-to-br from-white to-teal-50/30 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <div className="h-1 w-8 rounded-full bg-teal-600" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-extrabold text-slate-900">{card.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                  </div>
                </RbtStaggerItem>
              ))}
            </RbtStaggerGrid>
          </section>
        </RbtScrollReveal>

        {/* What makes Eden different */}
        <RbtScrollReveal>
          <section
            className={`${FRAME} bg-gradient-to-br from-white via-teal-50/20 to-emerald-50/30`}
            aria-labelledby="different-heading"
          >
            <h2 id="different-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              What makes Eden different
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              At Eden, team members are supported by:
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {WHY_EDEN_DIFFERENT_ITEMS.map((item, index) => (
                <motion.li
                  key={item}
                  initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: EASE_OUT }}
                  className="flex items-center gap-3 rounded-xl border border-teal-100 bg-white px-4 py-3 shadow-sm"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">{item}</span>
                </motion.li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Candidate promise */}
        <RbtScrollReveal>
          <section
            className="rounded-[2rem] border border-teal-100 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/40 p-8 shadow-sm sm:p-10"
            aria-labelledby="promise-heading"
          >
            <h2 id="promise-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              A workplace where care and growth both matter.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Eden ABA Therapy is building a team where clinicians, technicians, and support professionals can do
              meaningful work while continuing to grow. We value reliability, compassion, ethical practice, family
              communication, and long-term professional development.
            </p>
          </section>
        </RbtScrollReveal>

        {/* Growth at Eden */}
        <RbtScrollReveal>
          <section className={FRAME} aria-labelledby="growth-heading">
            <h2 id="growth-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Growth at Eden
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
              Advancement depends on credential eligibility, performance, and organizational needs—not guaranteed
              timelines.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {WHY_EDEN_GROWTH_PATH.map((step, index) => (
                <span key={step} className="flex items-center gap-2 sm:gap-3">
                  <span className="rounded-xl border border-teal-200 bg-teal-50/50 px-4 py-2 text-sm font-extrabold text-teal-900">
                    {step}
                  </span>
                  {index < WHY_EDEN_GROWTH_PATH.length - 1 && (
                    <span className="text-lg font-black text-teal-500" aria-hidden="true">
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
            <div className="mt-8 text-center sm:text-left">
              <Link href="/careers/career-paths" className={getButtonClasses("secondary", "inline-flex")}>
                Explore Career Paths
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </RbtScrollReveal>

        {/* Who thrives at Eden */}
        <RbtScrollReveal>
          <section aria-labelledby="thrives-heading">
            <h2 id="thrives-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Who thrives at Eden
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              Eden is a strong fit for professionals who combine clinical heart with professional discipline.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_EDEN_THRIVES_CARDS.map((card) => (
                <li
                  key={card.title}
                  className="rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="text-base font-extrabold text-teal-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Final CTA */}
        <RbtScrollReveal>
          <section
            className="rounded-[2rem] border border-teal-200 bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-700 p-8 text-white shadow-lg sm:p-10"
            aria-labelledby="why-eden-cta-heading"
          >
            <h2 id="why-eden-cta-heading" className="text-2xl font-extrabold sm:text-3xl">
              Ready to see where you fit at Eden?
            </h2>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/careers/open-roles"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-900 shadow-sm transition hover:bg-teal-50"
              >
                Search Open Roles
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/careers/talent-network"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Join Talent Network
              </Link>
              <Link
                href="/careers/career-paths"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                View Career Paths
              </Link>
            </div>
          </section>
        </RbtScrollReveal>
      </div>
    </CareerPageShell>
  );
}
