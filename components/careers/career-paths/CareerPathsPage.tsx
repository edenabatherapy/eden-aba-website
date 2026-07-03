"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import CareerBreadcrumbs from "@/components/careers/hub/CareerBreadcrumbs";
import CareerPageShell from "@/components/careers/hub/CareerPageShell";
import CareerSectionNav from "@/components/careers/hub/CareerSectionNav";
import AnimatedStatCounter from "@/components/careers/hub/AnimatedStatCounter";
import FAQAccordion from "@/components/careers/hub/FAQAccordion";
import CareersHomeLadder from "@/components/careers/hub/CareersHomeLadder";
import InterviewGuideSection from "@/components/careers/career-paths/InterviewGuideSection";
import PathwayDetailSection from "@/components/careers/career-paths/PathwayDetailSection";
import ResumeTipsSection from "@/components/careers/career-paths/ResumeTipsSection";
import RbtScrollReveal, { RbtStaggerGrid, RbtStaggerItem } from "@/components/careers/rbt/RbtScrollReveal";
import {
  CAREER_PATHS_ADVANCED_LEADERSHIP,
  CAREER_PATHS_BCBA,
  CAREER_PATHS_BT_RBT,
  CAREER_PATHS_DISCLAIMER,
  CAREER_PATHS_FAQ,
  CAREER_PATHS_HERO_BADGES,
  CAREER_PATHS_LONG_TERM,
  CAREER_PATHS_MENTORSHIP,
  CAREER_PATHS_OVERVIEW,
  CAREER_PATHS_ROLE_ENTRIES,
  CAREER_PATHS_SECTION_NAV,
  CAREER_PATHS_STATS,
  CAREER_PATHS_TRAINING_ROADMAP,
} from "@/lib/careers/career-paths-careers-data";
import { ADVANCED_LEADERSHIP_PATH_STEPS, PUBLIC_CAREER_PROGRESSION_LABELS } from "@/lib/careers/career-path-data";
import { getButtonClasses } from "@/lib/button-styles";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

const FRAME = "scroll-mt-28 rounded-[2rem] border border-teal-100 bg-white p-8 shadow-sm sm:p-10";

export default function CareerPathsPage() {
  const careerPathsAdvancedLeadership = useLocalizedContent("CAREER_PATHS_ADVANCED_LEADERSHIP", CAREER_PATHS_ADVANCED_LEADERSHIP);
  const careerPathsBcba = useLocalizedContent("CAREER_PATHS_BCBA", CAREER_PATHS_BCBA);
  const careerPathsBtRbt = useLocalizedContent("CAREER_PATHS_BT_RBT", CAREER_PATHS_BT_RBT);
  const careerPathsDisclaimer = useLocalizedContent("CAREER_PATHS_DISCLAIMER", CAREER_PATHS_DISCLAIMER);
  const careerPathsFaq = useLocalizedContent("CAREER_PATHS_FAQ", CAREER_PATHS_FAQ);
  const careerPathsHeroBadges = useLocalizedContent("CAREER_PATHS_HERO_BADGES", CAREER_PATHS_HERO_BADGES);
  const careerPathsLongTerm = useLocalizedContent("CAREER_PATHS_LONG_TERM", CAREER_PATHS_LONG_TERM);
  const careerPathsMentorship = useLocalizedContent("CAREER_PATHS_MENTORSHIP", CAREER_PATHS_MENTORSHIP);
  const careerPathsOverview = useLocalizedContent("CAREER_PATHS_OVERVIEW", CAREER_PATHS_OVERVIEW);
  const careerPathsRoleEntries = useLocalizedContent("CAREER_PATHS_ROLE_ENTRIES", CAREER_PATHS_ROLE_ENTRIES);
  const careerPathsSectionNav = useLocalizedContent("CAREER_PATHS_SECTION_NAV", CAREER_PATHS_SECTION_NAV);
  const careerPathsStats = useLocalizedContent("CAREER_PATHS_STATS", CAREER_PATHS_STATS);
  const careerPathsTrainingRoadmap = useLocalizedContent("CAREER_PATHS_TRAINING_ROADMAP", CAREER_PATHS_TRAINING_ROADMAP);
  const publicCareerProgressionLabels = useLocalizedContent("PUBLIC_CAREER_PROGRESSION_LABELS", PUBLIC_CAREER_PROGRESSION_LABELS);

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
      <CareerBreadcrumbs items={[{ label: "Careers", href: "/careers" }, { label: "Career Growth Pathways" }]} />

      <section
        className="relative overflow-hidden bg-gradient-to-br from-[#e8f8f2] via-white to-[#dff5f0] px-4 py-14 lg:px-8 lg:py-20"
        aria-labelledby="career-paths-heading"
      >
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p {...fade(0)} className="text-xs font-black uppercase tracking-[0.16em] text-teal-800">
            Career Growth Pathways
          </motion.p>
          <motion.h1
            {...fade(0.08)}
            id="career-paths-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Build a long-term future with Eden
          </motion.h1>
          <motion.p {...fade(0.16)} className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Credential-aware pathways from BT through BCBA—with interview prep, resume guidance, training roadmaps, and
            mentorship across Northern Virginia.
          </motion.p>
          <motion.ul {...fade(0.24)} className="mt-6 flex flex-wrap justify-center gap-2">
            {careerPathsHeroBadges.map((badge) => (
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
            <Link href="#interview-guide" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
              Interview Guide
            </Link>
          </motion.div>
        </div>
      </section>

      <CareerSectionNav items={[...careerPathsSectionNav]} ariaLabel="Career pathways sections" />

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 pb-24 lg:px-8 lg:py-20 lg:pb-20">
        <RbtScrollReveal>
          <section id="career-overview" className={FRAME} aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Career Overview
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{careerPathsOverview.philosophy}</p>
            <AnimatedStatCounter stats={careerPathsStats} className="mt-8" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {careerPathsOverview.opportunities.map((item) => (
                <li key={item} className="flex gap-2 rounded-xl border border-teal-100 bg-teal-50/40 px-4 py-3 text-sm text-slate-700">
                  <span className="font-black text-teal-600" aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {publicCareerProgressionLabels.map((step, index) => (
                <span key={step} className="flex items-center gap-2 sm:gap-3">
                  <span className="rounded-xl border border-teal-200 bg-teal-50/50 px-3 py-2 text-xs font-extrabold text-teal-900 sm:text-sm">
                    {step}
                  </span>
                  {index < publicCareerProgressionLabels.length - 1 && (
                    <span className="text-lg font-black text-teal-500" aria-hidden="true">
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
          </section>
        </RbtScrollReveal>

        <CareersHomeLadder />

        <RbtScrollReveal>
          <PathwayDetailSection pathway={careerPathsBtRbt} sectionId="bt-rbt-pathway" />
        </RbtScrollReveal>

        <RbtScrollReveal>
          <PathwayDetailSection pathway={careerPathsBcba} sectionId="bcba-pathway" />
        </RbtScrollReveal>

        <RbtScrollReveal>
          <InterviewGuideSection />
        </RbtScrollReveal>

        <RbtScrollReveal>
          <ResumeTipsSection />
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section id="training-roadmap" className={FRAME} aria-labelledby="roadmap-heading">
            <h2 id="roadmap-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Training Roadmap
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              Structured development milestones from your first 30 days through annual growth planning.
            </p>
            <div className="relative mt-10">
              <div className="absolute bottom-8 left-4 top-8 hidden w-0.5 bg-teal-200 sm:block" aria-hidden="true" />
              <ol className="space-y-6">
                {careerPathsTrainingRoadmap.map((phase, index) => (
                  <motion.li
                    key={phase.period}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: index * 0.07, ease: EASE_OUT }}
                    className="relative sm:pl-12"
                  >
                    <span className="absolute left-0 top-5 hidden h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-xs font-black text-white sm:flex">
                      {index + 1}
                    </span>
                    <article className="rounded-xl border border-teal-100 bg-gradient-to-br from-white to-teal-50/25 p-6 shadow-sm">
                      <span className="text-xs font-black uppercase tracking-[0.14em] text-teal-800">{phase.period}</span>
                      <h3 className="mt-2 text-lg font-extrabold text-slate-900">{phase.title}</h3>
                      <ul className="mt-4 space-y-2">
                        {phase.items.map((item) => (
                          <li key={item} className="flex gap-2 text-sm leading-7 text-slate-600">
                            <span className="text-teal-600" aria-hidden="true">
                              •
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </motion.li>
                ))}
              </ol>
            </div>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section id="mentorship-program" className={FRAME} aria-labelledby="mentorship-heading">
            <h2 id="mentorship-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Mentorship Program
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {careerPathsMentorship.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.06, ease: EASE_OUT }}
                  className="rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </motion.li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section id="long-term-planning" className={FRAME} aria-labelledby="planning-heading">
            <h2 id="planning-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Long-Term Career Planning
            </h2>
            <ul className="mt-8 space-y-4">
              {careerPathsLongTerm.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.06, ease: EASE_OUT }}
                  className="rounded-xl border border-teal-100 bg-gradient-to-r from-white to-emerald-50/30 p-5"
                >
                  <h3 className="text-base font-extrabold text-teal-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </motion.li>
              ))}
            </ul>

            <div
              id="advanced-clinical-leadership"
              className="mt-12 rounded-[1.25rem] border border-teal-100 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 p-6 sm:p-8"
            >
              <h3 className="text-xl font-extrabold text-slate-900">{careerPathsAdvancedLeadership.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{careerPathsAdvancedLeadership.summary}</p>
              <ol className="mt-6 space-y-3">
                {ADVANCED_LEADERSHIP_PATH_STEPS.map((step) => (
                  <li key={step.id} className="rounded-lg border border-teal-100 bg-white p-4 text-sm">
                    <span className="font-extrabold text-teal-900">{step.title}</span>
                    <p className="mt-1 leading-7 text-slate-600">{step.roleDescription}</p>
                  </li>
                ))}
              </ol>
              <Link
                href={careerPathsAdvancedLeadership.detailPageHref}
                className={`${getButtonClasses("secondary", "inline-flex")} mt-6`}
              >
                {careerPathsAdvancedLeadership.detailPageLabel}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section aria-labelledby="role-entries-heading">
            <h2 id="role-entries-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Explore role pages
            </h2>
            <RbtStaggerGrid className="mt-8 grid gap-4 sm:grid-cols-3">
              {careerPathsRoleEntries.map((role) => (
                <RbtStaggerItem key={role.title}>
                  <Link
                    href={role.href}
                    className="group flex h-full flex-col rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-md"
                  >
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-teal-800">{role.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">{role.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-teal-800">
                      Learn more
                      <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </Link>
                </RbtStaggerItem>
              ))}
            </RbtStaggerGrid>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <FAQAccordion title="Career pathway FAQ" items={careerPathsFaq} />
        </RbtScrollReveal>

        <RbtScrollReveal>
          <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
            {careerPathsDisclaimer}
          </p>
        </RbtScrollReveal>
      </div>
    </CareerPageShell>
  );
}
