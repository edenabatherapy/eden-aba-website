"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import CareerBreadcrumbs from "@/components/careers/hub/CareerBreadcrumbs";
import CareerPageShell from "@/components/careers/hub/CareerPageShell";
import FAQAccordion from "@/components/careers/hub/FAQAccordion";
import ClinicalLeadershipCompetencyDashboard from "@/components/careers/clinical-leadership/ClinicalLeadershipCompetencyDashboard";
import ClinicalLeadershipHeroSection from "@/components/careers/clinical-leadership/ClinicalLeadershipHeroSection";
import ClinicalLeadershipJourneySection from "@/components/careers/clinical-leadership/ClinicalLeadershipJourneySection";
import ClinicalLeadershipReadinessSection from "@/components/careers/clinical-leadership/ClinicalLeadershipReadinessSection";
import ClinicalLeadershipStickyBar from "@/components/careers/clinical-leadership/ClinicalLeadershipStickyBar";
import ClinicalLeadershipTabs from "@/components/careers/clinical-leadership/ClinicalLeadershipTabs";
import RbtScrollReveal, { RbtStaggerGrid, RbtStaggerItem } from "@/components/careers/rbt/RbtScrollReveal";
import {
  CL_CULTURE_VALUES,
  CL_DAY_TIMELINE,
  CL_EDUCATIONAL_NOTICE,
  CL_FUTURE_LEADERS_PATH,
  CL_INTERVIEW_PREP_CARDS,
  CL_LEADERSHIP_RESPONSIBILITY_CARDS,
  CL_PHOTO_GALLERY,
  CL_READINESS_INDICATORS_LEGACY,
  CL_RECRUITING_EMAIL,
  CL_ROLE_CATEGORIES,
  CL_SAMPLE_INTERVIEW_QUESTIONS,
  CL_SUPPORT_CARDS,
  CL_SUPPORT_DISCLAIMER,
  CL_WHAT_LEADERS_DO,
  CL_WHY_MATTERS_STATS,
} from "@/lib/careers/clinical-leadership-careers-data";
import { getButtonClasses } from "@/lib/button-styles";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

const FRAME = "rounded-[2rem] border border-teal-100 bg-white p-8 shadow-sm sm:p-10";

export default function ClinicalLeadershipCareersPage() {
  const clCultureValues = useLocalizedContent("CL_CULTURE_VALUES", CL_CULTURE_VALUES);
  const clDayTimeline = useLocalizedContent("CL_DAY_TIMELINE", CL_DAY_TIMELINE);
  const clEducationalNotice = useLocalizedContent("CL_EDUCATIONAL_NOTICE", CL_EDUCATIONAL_NOTICE);
  const clInterviewPrepCards = useLocalizedContent("CL_INTERVIEW_PREP_CARDS", CL_INTERVIEW_PREP_CARDS);
  const clLeadershipResponsibilityCards = useLocalizedContent("CL_LEADERSHIP_RESPONSIBILITY_CARDS", CL_LEADERSHIP_RESPONSIBILITY_CARDS);
  const clPhotoGallery = useLocalizedContent("CL_PHOTO_GALLERY", CL_PHOTO_GALLERY);
  const clReadinessIndicatorsLegacy = useLocalizedContent("CL_READINESS_INDICATORS_LEGACY", CL_READINESS_INDICATORS_LEGACY);
  const clRoleCategories = useLocalizedContent("CL_ROLE_CATEGORIES", CL_ROLE_CATEGORIES);
  const clSampleInterviewQuestions = useLocalizedContent("CL_SAMPLE_INTERVIEW_QUESTIONS", CL_SAMPLE_INTERVIEW_QUESTIONS);
  const clSupportCards = useLocalizedContent("CL_SUPPORT_CARDS", CL_SUPPORT_CARDS);
  const clSupportDisclaimer = useLocalizedContent("CL_SUPPORT_DISCLAIMER", CL_SUPPORT_DISCLAIMER);
  const clWhatLeadersDo = useLocalizedContent("CL_WHAT_LEADERS_DO", CL_WHAT_LEADERS_DO);
  const clWhyMattersStats = useLocalizedContent("CL_WHY_MATTERS_STATS", CL_WHY_MATTERS_STATS);

  const reduceMotion = useReducedMotion();

  return (
    <CareerPageShell>
      <ClinicalLeadershipStickyBar />
      <CareerBreadcrumbs
        items={[
          { label: "Careers", href: "/careers" },
          { label: "Clinical Leadership Opportunities at Eden" },
        ]}
      />

      <ClinicalLeadershipHeroSection />

      {/* Why clinical leadership matters */}
      <section className="border-y border-teal-100 bg-gradient-to-r from-teal-50/70 via-white to-emerald-50/60 px-4 py-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <RbtScrollReveal>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
              Strong clinical leadership creates stronger outcomes.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Clinical leadership roles influence far more than individual cases. Effective leaders help shape
              supervision quality, treatment consistency, caregiver confidence, staff development, documentation
              standards, and long-term organizational growth.
            </p>
          </RbtScrollReveal>
          <RbtStaggerGrid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clWhyMattersStats.map((stat) => (
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
        {/* Preserved — leadership responsibilities */}
        <RbtScrollReveal>
          <section aria-labelledby="cl-responsibilities-heading">
            <h2 id="cl-responsibilities-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Leadership responsibilities
            </h2>
            <RbtStaggerGrid className="mt-8 grid gap-4 sm:grid-cols-3">
              {clLeadershipResponsibilityCards.map((card) => (
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

        <ClinicalLeadershipJourneySection />

        {/* Role categories */}
        <RbtScrollReveal>
          <section aria-labelledby="cl-roles-heading">
            <h2 id="cl-roles-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Leadership role categories
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              Eden may hire for a range of clinical leadership roles depending on experience, credential eligibility, and
              organizational needs.
            </p>
            <RbtStaggerGrid className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {clRoleCategories.map((role) => (
                <RbtStaggerItem key={role.title}>
                  <div className="h-full rounded-[1.5rem] border border-teal-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <h3 className="text-lg font-extrabold text-teal-900">{role.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{role.description}</p>
                  </div>
                </RbtStaggerItem>
              ))}
            </RbtStaggerGrid>
          </section>
        </RbtScrollReveal>

        <ClinicalLeadershipCompetencyDashboard />

        {/* What leaders do */}
        <RbtScrollReveal>
          <section aria-labelledby="cl-what-leaders-heading">
            <h2 id="cl-what-leaders-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              What leaders do at Eden
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {clWhatLeadersDo.map((item, index) => (
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

        <ClinicalLeadershipReadinessSection />

        {/* Preserved — leadership readiness indicators */}
        <RbtScrollReveal>
          <section className={FRAME} aria-labelledby="cl-readiness-legacy-heading">
            <h2 id="cl-readiness-legacy-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Leadership readiness indicators
            </h2>
            <ol className="relative mt-10 space-y-0">
              {clReadinessIndicatorsLegacy.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: EASE_OUT }}
                  className="relative flex gap-5 pb-10 last:pb-0"
                >
                  {index < clReadinessIndicatorsLegacy.length - 1 && (
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

        {/* Future leaders */}
        <RbtScrollReveal>
          <section
            className="rounded-[2rem] border border-teal-100 bg-gradient-to-br from-white via-teal-50/25 to-emerald-50/40 p-8 shadow-sm sm:p-10"
            aria-labelledby="cl-future-leaders-heading"
          >
            <h2 id="cl-future-leaders-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Not in leadership yet?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Many clinical leaders begin as Behavior Technicians, RBTs, and BCBAs. Leadership development happens through
              mentorship, experience, supervision, and a commitment to continuous growth.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {CL_FUTURE_LEADERS_PATH.map((step, index) => (
                <span key={step} className="flex items-center gap-2 sm:gap-3">
                  <span className="rounded-xl border border-teal-200 bg-white px-4 py-2 text-sm font-extrabold text-teal-900 shadow-sm">
                    {step}
                  </span>
                  {index < CL_FUTURE_LEADERS_PATH.length - 1 && (
                    <span className="text-lg font-black text-teal-500" aria-hidden="true">
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/careers/bt" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
                Explore BT Careers
              </Link>
              <Link href="/careers/rbt" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
                Explore RBT Careers
              </Link>
              <Link href="/careers/bcba" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
                Explore BCBA Careers
              </Link>
            </div>
          </section>
        </RbtScrollReveal>

        {/* Educational notice */}
        <RbtScrollReveal>
          <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
            {clEducationalNotice}
          </p>
        </RbtScrollReveal>

        {/* Tabs */}
        <RbtScrollReveal>
          <ClinicalLeadershipTabs />
        </RbtScrollReveal>

        {/* Interview prep */}
        <RbtScrollReveal>
          <section aria-labelledby="cl-interview-prep-heading">
            <h2 id="cl-interview-prep-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              How to stand out as a clinical leader
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {clInterviewPrepCards.map((card) => (
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
              <FAQAccordion title="Sample interview questions to prepare for" items={clSampleInterviewQuestions} />
            </div>
          </section>
        </RbtScrollReveal>

        {/* Day in the life */}
        <RbtScrollReveal>
          <section className={FRAME} aria-labelledby="cl-day-heading">
            <h2 id="cl-day-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Day in the life of clinical leadership
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              Executive clinical leadership balances quality oversight, team development, family-centered initiatives, and
              strategic collaboration.
            </p>
            <ol className="relative mt-10 space-y-0 border-l-2 border-teal-200 pl-8">
              {clDayTimeline.map((item, index) => (
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
          <section aria-labelledby="cl-photos-heading">
            <h2 id="cl-photos-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Clinical leadership in action
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {clPhotoGallery.map((photo, index) => (
                <li
                  key={`${photo.src}-${index}`}
                  className="overflow-hidden rounded-[1.5rem] border border-teal-100 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-teal-50">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="px-4 py-3 text-sm font-semibold text-slate-700">{photo.caption}</p>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Support systems */}
        <RbtScrollReveal>
          <section aria-labelledby="cl-support-heading">
            <h2 id="cl-support-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Support designed for sustainable leadership
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {clSupportCards.map((card) => (
                <li
                  key={card.title}
                  className="rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="text-base font-extrabold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-7 text-slate-500">{clSupportDisclaimer}</p>
          </section>
        </RbtScrollReveal>

        {/* Leadership culture */}
        <RbtScrollReveal>
          <section
            className="rounded-[2rem] border border-teal-100 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/40 p-8 shadow-sm sm:p-10"
            aria-labelledby="cl-culture-heading"
          >
            <h2 id="cl-culture-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Leadership at Eden is about service, not status.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Clinical leadership exists to support children, families, clinicians, and communities. Eden leaders are
              expected to model professionalism, humility, accountability, ethical care, and continuous improvement.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {clCultureValues.map((value) => (
                <li key={value.title} className="rounded-xl border border-teal-100 bg-white p-5 shadow-sm">
                  <h3 className="font-extrabold text-teal-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{value.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Executive CTA */}
        <RbtScrollReveal>
          <section
            className="rounded-[2rem] border border-teal-200 bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-700 p-8 text-white shadow-lg sm:p-10"
            aria-labelledby="cl-executive-cta-heading"
          >
            <h2 id="cl-executive-cta-heading" className="text-2xl font-extrabold sm:text-3xl">
              Ready to help shape the future of autism care?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-teal-50">
              If you are passionate about developing clinicians, improving quality systems, strengthening
              family-centered care, and helping organizations grow responsibly, Eden ABA Therapy would love to connect
              with you.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/careers/open-roles"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-900 shadow-sm transition hover:bg-teal-50"
              >
                View Leadership Roles
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="#cl-leadership-pathways"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Explore Leadership Pathways
              </Link>
              <Link
                href={`mailto:${CL_RECRUITING_EMAIL}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Contact Recruiting
              </Link>
              <Link
                href="/careers/talent-network"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Join Talent Network
              </Link>
            </div>
            <p className="mt-6 text-sm text-teal-100">
              Leadership opportunities may vary based on experience, credential eligibility, organizational needs, and
              service area growth.
            </p>
          </section>
        </RbtScrollReveal>

        {/* Preserved original CTA */}
        <RbtScrollReveal>
          <section
            className="rounded-[2rem] border border-teal-100 bg-gradient-to-br from-teal-50 via-white to-emerald-50 p-8 sm:p-10"
            aria-labelledby="cl-cta-heading"
          >
            <h2 id="cl-cta-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Pursue leadership roles
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Review leadership openings and discuss fit with the recruiting team.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/careers/open-roles" className={getButtonClasses("primary", "w-full sm:w-auto")}>
                View Leadership Roles
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href={`mailto:${CL_RECRUITING_EMAIL}`} className={getButtonClasses("secondary", "w-full sm:w-auto")}>
                Contact Recruiting
              </Link>
            </div>
          </section>
        </RbtScrollReveal>
      </div>
    </CareerPageShell>
  );
}
