"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import CareerPageShell from "@/components/careers/hub/CareerPageShell";
import CareersHomeHero from "@/components/careers/hub/CareersHomeHero";
import CareersHomeLadder from "@/components/careers/hub/CareersHomeLadder";
import RbtScrollReveal, { RbtStaggerGrid, RbtStaggerItem } from "@/components/careers/rbt/RbtScrollReveal";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";
import {
  CAREERS_HOME_BENEFITS,
  CAREERS_HOME_BENEFITS_DISCLAIMER,
  CAREERS_HOME_COMPLIANCE_COPY,
  CAREERS_HOME_COMPLIANCE_DISCLAIMER,
  CAREERS_HOME_FIND_YOUR_FIT,
  CAREERS_HOME_HIRING_STEPS,
  CAREERS_HOME_LOCATIONS,
  CAREERS_HOME_RECRUITING_EMAIL,
  CAREERS_HOME_ROLE_CARDS,
  CAREERS_HOME_SNAPSHOT_STATS,
  CAREERS_HOME_WHY_JOIN_CARDS,
} from "@/lib/careers/careers-home-data";
import { getButtonClasses } from "@/lib/button-styles";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

export default function CareersHubHome() {
  const reduceMotion = useReducedMotion();
  const { language } = useSiteLanguage();
  const t = getTranslation(language);
  const snapshotStats = useLocalizedContent("CAREERS_HOME_SNAPSHOT_STATS", CAREERS_HOME_SNAPSHOT_STATS);
  const whyJoinCards = useLocalizedContent("CAREERS_HOME_WHY_JOIN_CARDS", CAREERS_HOME_WHY_JOIN_CARDS);

  return (
    <CareerPageShell>
      <CareersHomeHero />

      {/* Snapshot bar */}
      <section
        className="border-y border-teal-100 bg-gradient-to-r from-teal-50/60 via-white to-emerald-50/50 px-4 py-10 lg:px-8"
        aria-label="Careers snapshot"
      >
        <div className="mx-auto max-w-6xl">
          <RbtStaggerGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {snapshotStats.map((stat) => (
              <RbtStaggerItem key={stat.title}>
                <div className="h-full rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="h-1 w-8 rounded-full bg-teal-600" aria-hidden="true" />
                  <p className="mt-3 text-base font-extrabold text-slate-900">{stat.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{stat.description}</p>
                </div>
              </RbtStaggerItem>
            ))}
          </RbtStaggerGrid>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 pb-24 lg:px-8 lg:py-20 lg:pb-20">
        {/* Why join Eden */}
        <RbtScrollReveal>
          <section aria-labelledby="careers-intro-heading">
            <h2 id="careers-intro-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
              {t.pages?.careers?.hubTitle || "Careers at Eden ABA Therapy"}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              {t.pages?.careers?.hubIntro ||
                "Eden is building a team of clinicians and support professionals who care about ethical ABA practice, family partnership, measurable progress, and sustainable career growth."}
            </p>
            <RbtStaggerGrid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {whyJoinCards.map((card) => (
                <RbtStaggerItem key={card.title}>
                  <div className="h-full rounded-[1.5rem] border border-teal-100 bg-gradient-to-br from-white to-teal-50/30 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <h3 className="text-lg font-extrabold text-teal-900">{card.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                  </div>
                </RbtStaggerItem>
              ))}
            </RbtStaggerGrid>
          </section>
        </RbtScrollReveal>

        {/* Career pathways grid */}
        <RbtScrollReveal>
          <section aria-labelledby="career-roles-heading">
            <h2 id="career-roles-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Explore career pathways
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              Find the pathway that matches your experience, credentials, and career goals.
            </p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {CAREERS_HOME_ROLE_CARDS.map((card) => (
                <li key={card.title}>
                  <motion.article
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-full flex-col rounded-[1.75rem] border border-teal-100 bg-white p-6 shadow-sm hover:border-teal-200 hover:shadow-md"
                  >
                    <h3 className="text-xl font-extrabold text-slate-900">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
                    <dl className="mt-4 space-y-3 text-sm">
                      <div>
                        <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-teal-800">Best fit</dt>
                        <dd className="mt-1 leading-6 text-slate-600">{card.bestFit}</dd>
                      </div>
                      <div>
                        <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-teal-800">Growth path</dt>
                        <dd className="mt-1 font-semibold leading-6 text-slate-700">{card.growthPath}</dd>
                      </div>
                    </dl>
                    <div className="mt-6 flex flex-col gap-2">
                      <Link href={card.href} className={getButtonClasses("secondary", "w-full py-2.5 text-sm")}>
                        Learn More
                        <ArrowRight size={14} aria-hidden="true" />
                      </Link>
                      {card.openingsHref && (
                        <Link
                          href={card.openingsHref}
                          className="inline-flex w-full items-center justify-center gap-1 rounded-full px-4 py-2.5 text-sm font-bold text-teal-800 transition hover:bg-teal-50"
                        >
                          View Openings
                          <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </motion.article>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Interactive career ladder */}
        <CareersHomeLadder />

        {/* Find your fit */}
        <RbtScrollReveal>
          <section aria-labelledby="find-fit-heading">
            <h2 id="find-fit-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Find your fit
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              Not sure where to start? Choose the option that best describes you.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CAREERS_HOME_FIND_YOUR_FIT.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex h-full flex-col rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-md"
                  >
                    <p className="text-sm font-semibold text-slate-500">{item.label}</p>
                    <p className="mt-2 flex flex-1 items-center gap-2 text-lg font-extrabold text-slate-900 group-hover:text-teal-800">
                      {item.cta}
                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Benefits preview */}
        <RbtScrollReveal>
          <section aria-labelledby="benefits-preview-heading">
            <h2 id="benefits-preview-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Benefits preview
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              Eden invests in sustainable careers through competitive support, training, and team culture.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CAREERS_HOME_BENEFITS.map((benefit) => (
                <li
                  key={benefit.title}
                  className="rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="text-base font-extrabold text-teal-900">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{benefit.description}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl border border-amber-200/80 bg-amber-50/60 px-4 py-3 text-sm leading-6 text-amber-950">
              {CAREERS_HOME_BENEFITS_DISCLAIMER}
            </p>
            <div className="mt-4">
              <Link href="/careers/benefits" className={getButtonClasses("secondary", "inline-flex text-sm")}>
                See full benefits overview
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </RbtScrollReveal>

        {/* Hiring process preview */}
        <RbtScrollReveal>
          <section
            className="rounded-[2rem] border border-teal-100 bg-white p-8 shadow-sm sm:p-10"
            aria-labelledby="hiring-preview-heading"
          >
            <h2 id="hiring-preview-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Hiring process preview
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              A respectful, efficient process that helps candidates evaluate fit and helps families gain consistent,
              prepared support.
            </p>
            <ol className="relative mt-10 space-y-0 border-l-2 border-teal-200 pl-8">
              {CAREERS_HOME_HIRING_STEPS.map((step, index) => (
                <motion.li
                  key={step.title}
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.06, ease: EASE_OUT }}
                  className="relative pb-8 last:pb-0"
                >
                  <span
                    className="absolute -left-[2.35rem] flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-xs font-black text-white"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900">{step.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-slate-600">{step.description}</p>
                </motion.li>
              ))}
            </ol>
            <div className="mt-8">
              <Link href="/careers/hiring-process" className={getButtonClasses("primary", "inline-flex")}>
                See Hiring Process
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </RbtScrollReveal>

        {/* Northern Virginia growth */}
        <RbtScrollReveal>
          <section aria-labelledby="nv-growth-heading">
            <h2 id="nv-growth-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Northern Virginia growth
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              Eden is actively hiring in Annandale while planning thoughtful expansion across Northern Virginia
              communities.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {CAREERS_HOME_LOCATIONS.map((location) => (
                <li key={location.city}>
                  <article className="flex h-full flex-col rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <div className="inline-flex items-center gap-2 text-teal-800">
                      <MapPin size={16} aria-hidden="true" />
                      <h3 className="text-lg font-extrabold text-slate-900">{location.city}</h3>
                    </div>
                    <span
                      className={`mt-2 inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        location.label === "Current hiring hub"
                          ? "bg-teal-100 text-teal-900"
                          : "bg-emerald-50 text-emerald-800"
                      }`}
                    >
                      {location.label}
                    </span>
                    <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{location.description}</p>
                  </article>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/careers/talent-network" className={getButtonClasses("secondary", "inline-flex")}>
                Join Talent Network
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </RbtScrollReveal>

        {/* Compliance-aware culture */}
        <RbtScrollReveal>
          <section
            className="rounded-[2rem] border border-teal-100 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 p-8 shadow-sm sm:p-10"
            aria-labelledby="compliance-culture-heading"
          >
            <h2 id="compliance-culture-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Compliance-aware culture
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{CAREERS_HOME_COMPLIANCE_COPY}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "BACB-aware career pathways",
                "DBHDS-aware provider culture",
                "Medicaid documentation awareness",
                "Family-centered ABA practice",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-2 rounded-xl border border-teal-100 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  <span className="text-teal-600" aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
              {CAREERS_HOME_COMPLIANCE_DISCLAIMER}
            </p>
          </section>
        </RbtScrollReveal>

        {/* Final CTA */}
        <RbtScrollReveal>
          <section
            className="rounded-[2rem] border border-teal-200 bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-700 p-8 text-white shadow-lg sm:p-10"
            aria-labelledby="careers-final-cta-heading"
          >
            <h2 id="careers-final-cta-heading" className="text-2xl font-extrabold sm:text-3xl">
              Ready to join our team?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-teal-50">
              Search current openings in Annandale and Northern Virginia, explore career pathways, or join Eden&apos;s
              talent network for future opportunities.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/careers/open-roles"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-900 shadow-sm transition hover:bg-teal-50"
              >
                Search Open Roles
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/careers/career-paths"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Explore Career Paths
              </Link>
              <Link
                href="/careers/talent-network"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Join Talent Network
              </Link>
              <Link
                href={`mailto:${CAREERS_HOME_RECRUITING_EMAIL}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Contact Recruiting
              </Link>
            </div>
          </section>
        </RbtScrollReveal>
      </div>
    </CareerPageShell>
  );
}
