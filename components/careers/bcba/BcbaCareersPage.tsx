"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import CareerBreadcrumbs from "@/components/careers/hub/CareerBreadcrumbs";
import CareerPageShell from "@/components/careers/hub/CareerPageShell";
import FAQAccordion from "@/components/careers/hub/FAQAccordion";
import BcbaCareersTabs from "@/components/careers/bcba/BcbaCareersTabs";
import BcbaGrowthPathSection from "@/components/careers/bcba/BcbaGrowthPathSection";
import BcbaHeroSection from "@/components/careers/bcba/BcbaHeroSection";
import BcbaStickyApplyBar from "@/components/careers/bcba/BcbaStickyApplyBar";
import RbtScrollReveal, { RbtStaggerGrid, RbtStaggerItem } from "@/components/careers/rbt/RbtScrollReveal";
import {
  BCBA_BACB_NOTICE,
  BCBA_CONFIDENCE_CARDS,
  BCBA_CREDENTIAL_DISCLAIMER,
  BCBA_DAY_TIMELINE,
  BCBA_IMPACT_CARDS,
  BCBA_INTERVIEW_PREP_CARDS,
  BCBA_JOURNEY_TIMELINE,
  BCBA_LEADERSHIP_PATHWAY,
  BCBA_MOTIVATION_STATS,
  BCBA_PHOTO_GALLERY,
  BCBA_RESPONSIBILITIES_DETAILED,
  BCBA_ROLE_SNAPSHOT,
  BCBA_SAMPLE_INTERVIEW_QUESTIONS,
  BCBA_SKILL_CATEGORIES,
  BCBA_SUPPORT_CARDS,
  BCBA_SUPPORT_DISCLAIMER,
} from "@/lib/careers/bcba-careers-data";
import { getButtonClasses } from "@/lib/button-styles";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

const FRAME = "rounded-[2rem] border border-teal-100 bg-white p-8 shadow-sm sm:p-10";

export default function BcbaCareersPage() {
  const reduceMotion = useReducedMotion();

  return (
    <CareerPageShell>
      <BcbaStickyApplyBar />
      <CareerBreadcrumbs
        items={[
          { label: "Careers", href: "/careers" },
          { label: "Board Certified Behavior Analyst (BCBA) Careers" },
        ]}
      />

      <BcbaHeroSection />

      {/* Motivation banner */}
      <section className="border-y border-teal-100 bg-gradient-to-r from-teal-50/70 via-white to-emerald-50/60 px-4 py-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <RbtScrollReveal>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
              Your clinical leadership can shape a child&apos;s progress and a family&apos;s confidence.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              As a BCBA, your work extends beyond treatment plans. You guide clinical decision-making, coach
              technicians, support caregivers, monitor progress, and help create treatment consistency across natural
              environments. At Eden ABA Therapy, BCBAs are valued as clinical leaders, mentors, and trusted partners for
              families.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              BCBAs at Eden guide treatment direction, coach teams, and align programming with family priorities and
              measurable outcomes.
            </p>
          </RbtScrollReveal>
          <RbtStaggerGrid className="mt-10 grid gap-4 sm:grid-cols-3">
            {BCBA_MOTIVATION_STATS.map((stat) => (
              <RbtStaggerItem key={stat.title}>
                <div className="h-full rounded-[1.5rem] border border-teal-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="h-1 w-10 rounded-full bg-teal-600" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-extrabold text-slate-900">{stat.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{stat.description}</p>
                </div>
              </RbtStaggerItem>
            ))}
          </RbtStaggerGrid>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 pb-24 lg:px-8 lg:py-20 lg:pb-20">
        {/* Journey timeline */}
        <RbtScrollReveal>
          <section className={FRAME} aria-labelledby="bcba-journey-heading">
            <h2 id="bcba-journey-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Your BCBA journey at Eden
            </h2>
            <p className="mt-3 text-base leading-8 text-slate-600">
              From application to clinical leadership—how many Eden BCBA careers develop over time.
            </p>
            <ol className="relative mt-10 space-y-0">
              {BCBA_JOURNEY_TIMELINE.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: EASE_OUT }}
                  className="relative flex gap-5 pb-10 last:pb-0"
                >
                  {index < BCBA_JOURNEY_TIMELINE.length - 1 && (
                    <span className="absolute left-4 top-10 h-[calc(100%-0.5rem)] w-0.5 bg-teal-200" aria-hidden="true" />
                  )}
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-slate-600">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </section>
        </RbtScrollReveal>

        {/* Preserved impact areas */}
        <RbtScrollReveal>
          <section aria-labelledby="bcba-impact-heading">
            <h2 id="bcba-impact-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              BCBA impact areas
            </h2>
            <RbtStaggerGrid className="mt-8 grid gap-4 sm:grid-cols-3">
              {BCBA_IMPACT_CARDS.map((card) => (
                <RbtStaggerItem key={card.title}>
                  <div className="h-full rounded-[1.5rem] border border-teal-100 bg-gradient-to-br from-white to-teal-50/30 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <h3 className="text-lg font-extrabold text-slate-900">{card.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                  </div>
                </RbtStaggerItem>
              ))}
            </RbtStaggerGrid>
          </section>
        </RbtScrollReveal>

        {/* Role snapshot */}
        <RbtScrollReveal>
          <section className={`${FRAME} bg-gradient-to-br from-white to-teal-50/25`} aria-labelledby="bcba-snapshot-heading">
            <h2 id="bcba-snapshot-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              BCBA Role Snapshot
            </h2>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Role Type", BCBA_ROLE_SNAPSHOT.roleType],
                ["Supervision", BCBA_ROLE_SNAPSHOT.supervision],
                ["Service Setting", BCBA_ROLE_SNAPSHOT.serviceSetting],
                ["Focus Areas", BCBA_ROLE_SNAPSHOT.focusAreas],
                ["Growth Path", BCBA_ROLE_SNAPSHOT.growthPath],
                ["Best Fit", BCBA_ROLE_SNAPSHOT.bestFit],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-teal-100 bg-white px-4 py-3">
                  <dt className="text-xs font-black uppercase tracking-[0.12em] text-teal-800">{label}</dt>
                  <dd className="mt-1 text-sm font-semibold leading-7 text-slate-700">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </RbtScrollReveal>

        {/* Skill areas */}
        <RbtScrollReveal>
          <section aria-labelledby="bcba-skills-heading">
            <h2 id="bcba-skills-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Clinical skill areas
            </h2>
            <RbtStaggerGrid className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BCBA_SKILL_CATEGORIES.map((cat) => (
                <RbtStaggerItem key={cat.title}>
                  <div className="h-full rounded-[1.5rem] border border-teal-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <h3 className="text-lg font-extrabold text-teal-900">{cat.title}</h3>
                    <ul className="mt-4 space-y-2">
                      {cat.skills.map((skill) => (
                        <li key={skill} className="flex gap-2 text-sm text-slate-600">
                          <span className="text-teal-600" aria-hidden="true">
                            ✓
                          </span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RbtStaggerItem>
              ))}
            </RbtStaggerGrid>
          </section>
        </RbtScrollReveal>

        {/* What you'll lead */}
        <RbtScrollReveal>
          <section className={FRAME} aria-labelledby="bcba-lead-heading">
            <h2 id="bcba-lead-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              What you&apos;ll lead at Eden
            </h2>
            <p className="mt-3 text-base leading-8 text-slate-600">You&apos;ll help lead:</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {BCBA_LEADERSHIP_PATHWAY.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-teal-100 bg-teal-50/40 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-teal-50/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Responsibilities */}
        <RbtScrollReveal>
          <section aria-labelledby="bcba-responsibilities-heading">
            <h2 id="bcba-responsibilities-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              What BCBAs do
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              Clinical leadership responsibilities span assessment, supervision, family partnership, and quality care.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {BCBA_RESPONSIBILITIES_DETAILED.map((item, index) => (
                <motion.li
                  key={item.title}
                  whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="group rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm hover:border-teal-200 hover:shadow-md"
                >
                  <div className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-700 text-sm font-black text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-slate-600">{item.description}</p>
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.1em] text-teal-800">Why it matters</p>
                      <p className="mt-1 text-sm leading-7 text-slate-600">{item.whyItMatters}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Confidence */}
        <RbtScrollReveal>
          <section className={`${FRAME} bg-gradient-to-br from-emerald-50/40 to-white`} aria-labelledby="bcba-confidence-heading">
            <h2 id="bcba-confidence-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Eden supports clinicians who want to lead with quality, not burnout.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              BCBAs do their best work when clinical expectations are clear, supervision systems are reliable, and
              families receive consistent communication. Eden looks for clinicians who care about ethical practice,
              thoughtful documentation, team mentorship, and meaningful client progress.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BCBA_CONFIDENCE_CARDS.map((card) => (
                <li key={card.title} className="rounded-xl border border-teal-100 bg-white p-5 shadow-sm">
                  <h3 className="font-extrabold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Educational notices — preserved from original page */}
        <RbtScrollReveal>
          <section className="space-y-4" aria-labelledby="bcba-notice-heading">
            <h2 id="bcba-notice-heading" className="sr-only">
              Educational notices
            </h2>
            <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
              {BCBA_BACB_NOTICE}
            </p>
            <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
              {BCBA_CREDENTIAL_DISCLAIMER}
            </p>
          </section>
        </RbtScrollReveal>

        {/* Tabs */}
        <RbtScrollReveal>
          <BcbaCareersTabs />
        </RbtScrollReveal>

        <BcbaGrowthPathSection />

        {/* Interview prep */}
        <RbtScrollReveal>
          <section aria-labelledby="bcba-interview-prep-heading">
            <h2 id="bcba-interview-prep-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              How to stand out in your BCBA interview
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {BCBA_INTERVIEW_PREP_CARDS.map((card) => (
                <li
                  key={card.title}
                  className="rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="font-extrabold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <FAQAccordion title="Sample interview questions to prepare for" items={BCBA_SAMPLE_INTERVIEW_QUESTIONS} />
            </div>
          </section>
        </RbtScrollReveal>

        {/* Day in the life */}
        <RbtScrollReveal>
          <section className={FRAME} aria-labelledby="bcba-day-heading">
            <h2 id="bcba-day-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              A day in the life
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              A BCBA day balances clinical review, supervision, family communication, documentation, and team
              collaboration.
            </p>
            <ol className="relative mt-10 space-y-0 border-l-2 border-teal-200 pl-8">
              {BCBA_DAY_TIMELINE.map((item, index) => (
                <li key={item.step} className="relative pb-8 last:pb-0">
                  <span
                    className="absolute -left-[2.35rem] flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-xs font-black text-white"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900">{item.step}</h3>
                  <p className="mt-1 text-sm leading-7 text-slate-600">{item.detail}</p>
                </li>
              ))}
            </ol>
          </section>
        </RbtScrollReveal>

        {/* Photos */}
        <RbtScrollReveal>
          <section aria-labelledby="bcba-photos-heading">
            <h2 id="bcba-photos-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              BCBA clinical leadership in action
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BCBA_PHOTO_GALLERY.map((photo) => (
                <li
                  key={photo.src}
                  className="overflow-hidden rounded-[1.5rem] border border-teal-100 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-teal-50">
                    <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <p className="px-4 py-3 text-sm font-semibold text-slate-700">{photo.caption}</p>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Clinical support */}
        <RbtScrollReveal>
          <section aria-labelledby="bcba-support-heading">
            <h2 id="bcba-support-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Support designed for clinical quality
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {BCBA_SUPPORT_CARDS.map((card) => (
                <li
                  key={card.title}
                  className="rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="text-base font-extrabold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-7 text-slate-500">{BCBA_SUPPORT_DISCLAIMER}</p>
          </section>
        </RbtScrollReveal>

        {/* Apply with confidence */}
        <RbtScrollReveal>
          <section
            className="rounded-[2rem] border border-teal-200 bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-700 p-8 text-white shadow-lg sm:p-10"
            aria-labelledby="bcba-apply-heading"
          >
            <h2 id="bcba-apply-heading" className="text-2xl font-extrabold sm:text-3xl">
              Ready to lead meaningful clinical care with Eden?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-teal-50">
              If you are a BCBA who values ethical ABA practice, strong supervision, caregiver partnership, and
              thoughtful clinical decision-making, Eden ABA Therapy wants to hear from you.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/careers/open-roles"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-900 shadow-sm transition hover:bg-teal-50"
              >
                View BCBA Openings
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/careers/talent-network"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Join Talent Network
              </Link>
              <Link
                href="/careers/career-paths#advanced-clinical-leadership"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Explore Career Paths
              </Link>
            </div>
            <p className="mt-6 text-sm text-teal-100">
              Not sure if the current role fits your goals? Submit your interest and Eden&apos;s recruiting team can
              review potential fit.
            </p>
          </section>
        </RbtScrollReveal>

        {/* Preserved original CTA */}
        <RbtScrollReveal>
          <section
            className="rounded-[2rem] border border-teal-100 bg-gradient-to-br from-teal-50 via-white to-emerald-50 p-8 sm:p-10"
            aria-labelledby="bcba-cta-heading"
          >
            <h2 id="bcba-cta-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Explore BCBA and senior BCBA roles
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Join a clinically focused team committed to high standards and sustainable care across Annandale and
              Northern Virginia.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/careers/open-roles" className={getButtonClasses("primary", "w-full sm:w-auto")}>
                View BCBA Roles
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/careers/career-paths#advanced-clinical-leadership"
                className={getButtonClasses("secondary", "w-full sm:w-auto")}
              >
                Explore Career Paths
              </Link>
              <Link href="/careers/talent-network" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
                Join Talent Network
              </Link>
            </div>
          </section>
        </RbtScrollReveal>
      </div>
    </CareerPageShell>
  );
}
