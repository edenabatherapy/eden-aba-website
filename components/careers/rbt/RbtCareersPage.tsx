"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import CareerBreadcrumbs from "@/components/careers/hub/CareerBreadcrumbs";
import CareerPageShell from "@/components/careers/hub/CareerPageShell";
import RbtCareersTabs from "@/components/careers/rbt/RbtCareersTabs";
import RbtGrowthPathSection from "@/components/careers/rbt/RbtGrowthPathSection";
import RbtHeroSection from "@/components/careers/rbt/RbtHeroSection";
import RbtScrollReveal, { RbtStaggerGrid, RbtStaggerItem } from "@/components/careers/rbt/RbtScrollReveal";
import RbtStickyApplyBar from "@/components/careers/rbt/RbtStickyApplyBar";
import FAQAccordion from "@/components/careers/hub/FAQAccordion";
import {
  RBT_BACB_NOTICE,
  RBT_CANDIDATE_FIT,
  RBT_CONFIDENCE_CARDS,
  RBT_DAY_TIMELINE,
  RBT_INTERVIEW_PREP_CARDS,
  RBT_JOURNEY_TIMELINE,
  RBT_LEARNING_PATHWAY,
  RBT_MOTIVATION_STATS,
  RBT_OVERVIEW_CARDS,
  RBT_PHOTO_GALLERY_EXTENDED,
  RBT_PREFERRED_QUALIFICATIONS,
  RBT_REQUIRED_QUALIFICATIONS,
  RBT_RESPONSIBILITIES_DETAILED,
  RBT_ROLE_SNAPSHOT,
  RBT_SAMPLE_INTERVIEW_QUESTIONS,
  RBT_SKILL_CATEGORIES,
  RBT_SKILLS,
  RBT_SUPPORT_CARDS,
  RBT_SUPPORT_DISCLAIMER,
} from "@/lib/careers/rbt-careers-data";
import { getButtonClasses } from "@/lib/button-styles";
import { EASE_OUT } from "./rbt-motion";

const FRAME =
  "rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-sm sm:p-10";

export default function RbtCareersPage() {
  const rbtBacbNotice = useLocalizedContent("RBT_BACB_NOTICE", RBT_BACB_NOTICE);
  const rbtCandidateFit = useLocalizedContent("RBT_CANDIDATE_FIT", RBT_CANDIDATE_FIT);
  const rbtConfidenceCards = useLocalizedContent("RBT_CONFIDENCE_CARDS", RBT_CONFIDENCE_CARDS);
  const rbtDayTimeline = useLocalizedContent("RBT_DAY_TIMELINE", RBT_DAY_TIMELINE);
  const rbtInterviewPrepCards = useLocalizedContent("RBT_INTERVIEW_PREP_CARDS", RBT_INTERVIEW_PREP_CARDS);
  const rbtJourneyTimeline = useLocalizedContent("RBT_JOURNEY_TIMELINE", RBT_JOURNEY_TIMELINE);
  const rbtLearningPathway = useLocalizedContent("RBT_LEARNING_PATHWAY", RBT_LEARNING_PATHWAY);
  const rbtMotivationStats = useLocalizedContent("RBT_MOTIVATION_STATS", RBT_MOTIVATION_STATS);
  const rbtOverviewCards = useLocalizedContent("RBT_OVERVIEW_CARDS", RBT_OVERVIEW_CARDS);
  const rbtPhotoGalleryExtended = useLocalizedContent("RBT_PHOTO_GALLERY_EXTENDED", RBT_PHOTO_GALLERY_EXTENDED);
  const rbtPreferredQualifications = useLocalizedContent("RBT_PREFERRED_QUALIFICATIONS", RBT_PREFERRED_QUALIFICATIONS);
  const rbtRequiredQualifications = useLocalizedContent("RBT_REQUIRED_QUALIFICATIONS", RBT_REQUIRED_QUALIFICATIONS);
  const rbtResponsibilitiesDetailed = useLocalizedContent("RBT_RESPONSIBILITIES_DETAILED", RBT_RESPONSIBILITIES_DETAILED);
  const rbtRoleSnapshot = useLocalizedContent("RBT_ROLE_SNAPSHOT", RBT_ROLE_SNAPSHOT);
  const rbtSampleInterviewQuestions = useLocalizedContent("RBT_SAMPLE_INTERVIEW_QUESTIONS", RBT_SAMPLE_INTERVIEW_QUESTIONS);
  const rbtSkillCategories = useLocalizedContent("RBT_SKILL_CATEGORIES", RBT_SKILL_CATEGORIES);
  const rbtSkills = useLocalizedContent("RBT_SKILLS", RBT_SKILLS);
  const rbtSupportCards = useLocalizedContent("RBT_SUPPORT_CARDS", RBT_SUPPORT_CARDS);
  const rbtSupportDisclaimer = useLocalizedContent("RBT_SUPPORT_DISCLAIMER", RBT_SUPPORT_DISCLAIMER);

  const reduceMotion = useReducedMotion();

  return (
    <CareerPageShell>
      <RbtStickyApplyBar />
      <CareerBreadcrumbs
        items={[
          { label: "Careers", href: "/careers" },
          { label: "Registered Behavior Technician (RBT) Careers" },
        ]}
      />

      <RbtHeroSection />

      {/* Motivation banner */}
      <section className="border-y border-emerald-100 bg-gradient-to-r from-emerald-50/80 via-white to-teal-50/60 px-4 py-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <RbtScrollReveal>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
              Your work can become a child&apos;s breakthrough moment.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              As an RBT, every session matters. You help children practice communication, independence, play, social
              connection, and everyday life skills while receiving supervision and coaching from Eden&apos;s clinical
              team.
            </p>
          </RbtScrollReveal>
          <RbtStaggerGrid className="mt-10 grid gap-4 sm:grid-cols-3">
            {rbtMotivationStats.map((stat) => (
              <RbtStaggerItem key={stat.title}>
                <div className="h-full rounded-[1.5rem] border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <p className="text-2xl font-black text-emerald-700">•</p>
                  <h3 className="mt-2 text-lg font-extrabold text-slate-900">{stat.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{stat.description}</p>
                </div>
              </RbtStaggerItem>
            ))}
          </RbtStaggerGrid>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 pb-24 lg:px-8 lg:py-20 lg:pb-20">
        {/* RBT Journey Timeline */}
        <RbtScrollReveal>
          <section className={FRAME} aria-labelledby="rbt-journey-heading">
            <h2 id="rbt-journey-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Your RBT journey at Eden
            </h2>
            <p className="mt-3 text-base leading-8 text-slate-600">
              From application to long-term growth—here is how many Eden RBT careers take shape.
            </p>
            <ol className="relative mt-10 space-y-0">
              {rbtJourneyTimeline.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: EASE_OUT }}
                  className="relative flex gap-5 pb-10 last:pb-0"
                >
                  {index < rbtJourneyTimeline.length - 1 && (
                    <span className="absolute left-4 top-10 h-[calc(100%-0.5rem)] w-0.5 bg-emerald-200" aria-hidden="true" />
                  )}
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-black text-white">
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

        {/* Role overview — existing content */}
        <RbtScrollReveal>
          <section aria-labelledby="rbt-overview-heading">
            <h2 id="rbt-overview-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              High-impact direct care
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              RBTs implement individualized ABA programs under supervision, helping children build communication, social,
              daily living, play, and learning-readiness skills. At Eden ABA Therapy, RBTs are supported through practical
              feedback, reliable scheduling coordination, data-quality expectations, and values-based collaboration with
              families and supervisors.
            </p>
            <RbtStaggerGrid className="mt-8 grid gap-4 sm:grid-cols-3">
              {rbtOverviewCards.map((card) => (
                <RbtStaggerItem key={card.title}>
                  <div className="h-full rounded-[1.5rem] border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <h3 className="text-lg font-extrabold text-slate-900">{card.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                  </div>
                </RbtStaggerItem>
              ))}
            </RbtStaggerGrid>
          </section>
        </RbtScrollReveal>

        {/* Role Snapshot */}
        <RbtScrollReveal>
          <section className={`${FRAME} bg-gradient-to-br from-white to-emerald-50/30`} aria-labelledby="rbt-snapshot-heading">
            <h2 id="rbt-snapshot-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              RBT Role Snapshot
            </h2>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Role Type", rbtRoleSnapshot.roleType],
                ["Supervision", rbtRoleSnapshot.supervision],
                ["Service Setting", rbtRoleSnapshot.serviceSetting],
                ["Focus Areas", rbtRoleSnapshot.focusAreas],
                ["Growth Path", rbtRoleSnapshot.growthPath],
                ["Best Fit", rbtRoleSnapshot.bestFit],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-emerald-100 bg-white px-4 py-3">
                  <dt className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">{label}</dt>
                  <dd className="mt-1 text-sm font-semibold leading-7 text-slate-700">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </RbtScrollReveal>

        {/* Skill area cards */}
        <RbtScrollReveal>
          <section aria-labelledby="rbt-skill-areas-heading">
            <h2 id="rbt-skill-areas-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Skill areas that matter
            </h2>
            <RbtStaggerGrid className="mt-8 grid gap-4 sm:grid-cols-2">
              {rbtSkillCategories.map((cat) => (
                <RbtStaggerItem key={cat.title}>
                  <div className="h-full rounded-[1.5rem] border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <h3 className="text-lg font-extrabold text-emerald-800">{cat.title}</h3>
                    <ul className="mt-4 space-y-2">
                      {cat.skills.map((skill) => (
                        <li key={skill} className="flex gap-2 text-sm text-slate-600">
                          <span className="text-emerald-600" aria-hidden="true">
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

        {/* What you'll learn */}
        <RbtScrollReveal>
          <section className={FRAME} aria-labelledby="rbt-learn-heading">
            <h2 id="rbt-learn-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              What you&apos;ll learn at Eden
            </h2>
            <p className="mt-3 text-base leading-8 text-slate-600">You&apos;ll build confidence in:</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rbtLearningPathway.map((item) => (
                <li
                  key={item}
                  className="rounded-xl bg-emerald-50/70 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-emerald-100/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* What RBTs do — enhanced */}
        <RbtScrollReveal>
          <section aria-labelledby="rbt-responsibilities-heading">
            <h2 id="rbt-responsibilities-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              What RBTs do
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              Day-to-day responsibilities focus on supervised, ethical direct care with accurate data and professional
              communication.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {rbtResponsibilitiesDetailed.map((item, index) => (
                <motion.li
                  key={item.title}
                  whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="group rounded-[1.25rem] border border-emerald-100 bg-white p-5 shadow-sm hover:border-emerald-200 hover:shadow-md"
                >
                  <div className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-black text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-slate-600">{item.description}</p>
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.1em] text-emerald-700">Why it matters</p>
                      <p className="mt-1 text-sm leading-7 text-slate-600">{item.whyItMatters}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Skills grid — existing */}
        <RbtScrollReveal>
          <section aria-labelledby="rbt-skills-heading">
            <h2 id="rbt-skills-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Skills Eden looks for
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rbtSkills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" aria-hidden="true" />
                  <span className="text-sm font-semibold text-slate-700">{skill}</span>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Candidate confidence */}
        <RbtScrollReveal>
          <section className={`${FRAME} bg-gradient-to-br from-teal-50/50 to-white`} aria-labelledby="rbt-confidence-heading">
            <h2 id="rbt-confidence-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              You do not need to know everything on day one.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Eden looks for candidates who are reliable, compassionate, coachable, and committed to learning. Strong RBTs
              grow through practice, feedback, consistency, and teamwork.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {rbtConfidenceCards.map((card) => (
                <li key={card.title} className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
                  <h3 className="font-extrabold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Candidate fit — existing */}
        <RbtScrollReveal>
          <section aria-labelledby="rbt-fit-heading">
            <h2 id="rbt-fit-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              This role may be a strong fit if you are:
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rbtCandidateFit.map((item) => (
                <li
                  key={item}
                  className="rounded-[1.25rem] border border-emerald-100 bg-emerald-50/50 p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <p className="text-sm font-semibold leading-7 text-slate-700">{item}</p>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Requirements — existing */}
        <RbtScrollReveal>
          <section aria-labelledby="rbt-qualifications-heading">
            <h2 id="rbt-qualifications-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Requirements and preferred qualifications
            </h2>
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div className="rounded-[1.5rem] border border-emerald-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-extrabold text-slate-900">Required / Expected</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
                  {rbtRequiredQualifications.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.5rem] border border-teal-100 bg-teal-50/30 p-6 shadow-sm">
                <h3 className="text-lg font-extrabold text-slate-900">Preferred</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
                  {rbtPreferredQualifications.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
              {rbtBacbNotice}
            </p>
          </section>
        </RbtScrollReveal>

        {/* Tabs */}
        <RbtScrollReveal>
          <RbtCareersTabs />
        </RbtScrollReveal>

        {/* Growth path animation */}
        <RbtGrowthPathSection />

        {/* Interview prep */}
        <RbtScrollReveal>
          <section aria-labelledby="rbt-interview-prep-heading">
            <h2 id="rbt-interview-prep-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              How to stand out in your RBT interview
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {rbtInterviewPrepCards.map((card) => (
                <li
                  key={card.title}
                  className="rounded-[1.25rem] border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="font-extrabold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <FAQAccordion title="Sample interview questions to prepare for" items={rbtSampleInterviewQuestions} />
            </div>
          </section>
        </RbtScrollReveal>

        {/* Day in the life — existing */}
        <RbtScrollReveal>
          <section className={FRAME} aria-labelledby="rbt-day-heading">
            <h2 id="rbt-day-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              A day in the life
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              A typical RBT shift balances preparation, direct care, documentation, and supervision touchpoints.
            </p>
            <ol className="relative mt-10 space-y-0 border-l-2 border-emerald-200 pl-8">
              {rbtDayTimeline.map((item, index) => (
                <li key={item.step} className="relative pb-8 last:pb-0">
                  <span
                    className="absolute -left-[2.35rem] flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-xs font-black text-white"
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
          <section aria-labelledby="rbt-photos-heading">
            <h2 id="rbt-photos-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              RBT care in action
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              Eden RBTs support children and families through structured sessions, play-based learning, and collaboration
              across home and community settings.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rbtPhotoGalleryExtended.map((photo) => (
                <li
                  key={photo.src}
                  className="overflow-hidden rounded-[1.5rem] border border-emerald-100 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-emerald-50">
                    <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <p className="px-4 py-3 text-sm font-semibold text-slate-700">{photo.caption}</p>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Support — existing */}
        <RbtScrollReveal>
          <section aria-labelledby="rbt-support-heading">
            <h2 id="rbt-support-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Support designed for growth
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rbtSupportCards.map((card) => (
                <li
                  key={card.title}
                  className="rounded-[1.25rem] border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="text-base font-extrabold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-7 text-slate-500">{rbtSupportDisclaimer}</p>
          </section>
        </RbtScrollReveal>

        {/* Apply with confidence CTA */}
        <RbtScrollReveal>
          <section
            className="rounded-[2rem] border border-emerald-200 bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 p-8 text-white shadow-lg sm:p-10"
            aria-labelledby="rbt-apply-heading"
          >
            <h2 id="rbt-apply-heading" className="text-2xl font-extrabold sm:text-3xl">
              Ready to start your RBT journey with Eden?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-emerald-50">
              If you are dependable, compassionate, and ready to grow in autism care, Eden ABA Therapy wants to hear from
              you.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/careers/open-roles"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-800 shadow-sm transition hover:bg-emerald-50"
              >
                View RBT Openings
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
                See Career Paths
              </Link>
            </div>
            <p className="mt-6 text-sm text-emerald-100">
              Not sure if you qualify? Submit your interest and our recruiting team can review potential fit.
            </p>
          </section>
        </RbtScrollReveal>

        {/* Continue growth — existing final CTA */}
        <RbtScrollReveal>
          <section
            className="rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-8 sm:p-10"
            aria-labelledby="rbt-cta-heading"
          >
            <h2 id="rbt-cta-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Continue your growth with Eden
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Explore opportunities for senior technician, lead technician, BCaBA, BCBA, and clinical leadership pathways as
              Eden ABA Therapy grows across Annandale and Northern Virginia.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/careers/open-roles" className={getButtonClasses("primary", "w-full sm:w-auto")}>
                View RBT Openings
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/careers/career-paths" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
                See Career Paths
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
