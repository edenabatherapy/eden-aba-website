"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import Link from "next/link";
import { ArrowRight, Brain, Calendar, DollarSign, Heart, Shield, Sparkles, Stethoscope } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import CareerBreadcrumbs from "@/components/careers/hub/CareerBreadcrumbs";
import CareerPageShell from "@/components/careers/hub/CareerPageShell";
import CareerSectionNav from "@/components/careers/hub/CareerSectionNav";
import AnimatedStatCounter from "@/components/careers/hub/AnimatedStatCounter";
import CareerIconGrid from "@/components/careers/hub/CareerIconGrid";
import FAQAccordion from "@/components/careers/hub/FAQAccordion";
import SalaryEstimator from "@/components/careers/benefits/SalaryEstimator";
import RbtScrollReveal from "@/components/careers/rbt/RbtScrollReveal";
import {
  BENEFITS_FAQ_BENEFITS,
  BENEFITS_FAQ_ELIGIBILITY,
  BENEFITS_FAQ_TRAINING,
  BENEFITS_HEALTH_ITEMS,
  BENEFITS_HERO_BADGES,
  BENEFITS_HERO_JOURNEY,
  BENEFITS_OVERVIEW_CARDS,
  BENEFITS_PTO_ITEMS,
  BENEFITS_REQUIRED_DISCLAIMER,
  BENEFITS_SECTION_NAV,
  BENEFITS_STATS,
} from "@/lib/careers/benefits-careers-data";
import { COMPENSATION_PHILOSOPHY } from "@/lib/careers/salary-estimator-data";
import { getButtonClasses } from "@/lib/button-styles";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

const FRAME = "scroll-mt-28 rounded-[2rem] border border-teal-100 bg-white p-8 shadow-sm sm:p-10";

export default function BenefitsCareersPage() {
  const benefitsFaqBenefits = useLocalizedContent("BENEFITS_FAQ_BENEFITS", BENEFITS_FAQ_BENEFITS);
  const benefitsFaqEligibility = useLocalizedContent("BENEFITS_FAQ_ELIGIBILITY", BENEFITS_FAQ_ELIGIBILITY);
  const benefitsFaqTraining = useLocalizedContent("BENEFITS_FAQ_TRAINING", BENEFITS_FAQ_TRAINING);
  const benefitsHealthItems = useLocalizedContent("BENEFITS_HEALTH_ITEMS", BENEFITS_HEALTH_ITEMS);
  const benefitsHeroBadges = useLocalizedContent("BENEFITS_HERO_BADGES", BENEFITS_HERO_BADGES);
  const benefitsHeroJourney = useLocalizedContent("BENEFITS_HERO_JOURNEY", BENEFITS_HERO_JOURNEY);
  const benefitsOverviewCards = useLocalizedContent("BENEFITS_OVERVIEW_CARDS", BENEFITS_OVERVIEW_CARDS);
  const benefitsPtoItems = useLocalizedContent("BENEFITS_PTO_ITEMS", BENEFITS_PTO_ITEMS);
  const benefitsRequiredDisclaimer = useLocalizedContent("BENEFITS_REQUIRED_DISCLAIMER", BENEFITS_REQUIRED_DISCLAIMER);
  const benefitsSectionNav = useLocalizedContent("BENEFITS_SECTION_NAV", BENEFITS_SECTION_NAV);
  const benefitsStats = useLocalizedContent("BENEFITS_STATS", BENEFITS_STATS);
  const compensationPhilosophy = useLocalizedContent("COMPENSATION_PHILOSOPHY", COMPENSATION_PHILOSOPHY);

  const reduceMotion = useReducedMotion();

  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: EASE_OUT, delay },
        };

  return (
    <CareerPageShell>
      <CareerBreadcrumbs items={[{ label: "Careers", href: "/careers" }, { label: "Benefits & Compensation" }]} />

      <section
        className="relative overflow-hidden bg-gradient-to-br from-[#e8f8f2] via-white to-[#dff5f0] px-4 py-14 lg:px-8 lg:py-20"
        aria-labelledby="benefits-heading"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-16 top-6 h-56 w-56 rounded-full bg-teal-200/40 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-center lg:text-left">
            <motion.p {...fade(0)} className="text-xs font-black uppercase tracking-[0.16em] text-teal-800">
              Total Rewards
            </motion.p>
            <motion.h1
              {...fade(0.08)}
              id="benefits-heading"
              className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
              Benefits &amp; Compensation at Eden
            </motion.h1>
            <motion.p {...fade(0.16)} className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600 lg:mx-0">
              Support for your health, growth, and future—competitive pay, wellness resources, paid leave, and an
              informational salary estimator for Northern Virginia clinical roles.
            </motion.p>
            <motion.ul {...fade(0.24)} className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              {benefitsHeroBadges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-full border border-teal-200 bg-white/90 px-3 py-1.5 text-xs font-bold text-teal-900 shadow-sm"
                >
                  {badge}
                </li>
              ))}
            </motion.ul>
            <motion.div {...fade(0.32)} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link href="/careers/open-roles" className={getButtonClasses("primary", "w-full sm:w-auto")}>
                Search Open Roles
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href="#salary-estimator" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
                Salary Estimator
              </Link>
            </motion.div>
          </div>
          <motion.aside
            {...fade(0.2)}
            className="rounded-[1.75rem] border border-teal-100 bg-white p-6 shadow-lg shadow-teal-900/5"
            aria-label="Your benefits journey"
          >
            <p className="text-xs font-black uppercase tracking-[0.14em] text-teal-800">Your benefits journey</p>
            <ol className="relative mt-6 space-y-0">
              <div className="absolute bottom-4 left-[15px] top-4 w-0.5 bg-teal-200" aria-hidden="true" />
              {benefitsHeroJourney.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.09, ease: EASE_OUT }}
                  className="relative flex items-start gap-4 pb-4 last:pb-0"
                >
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-black text-white">
                    {item.step}
                  </span>
                  <p className="pt-1 text-sm font-extrabold text-slate-900">{item.label}</p>
                </motion.li>
              ))}
            </ol>
          </motion.aside>
        </div>
      </section>

      <CareerSectionNav items={[...benefitsSectionNav]} ariaLabel="Benefits page sections" />

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 pb-24 lg:px-8 lg:py-20 lg:pb-20">
        <RbtScrollReveal>
          <section id="benefits-overview" className={FRAME} aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Benefits Overview
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              Eden&apos;s total rewards approach supports the whole professional—not just the job description.
            </p>
            <AnimatedStatCounter stats={benefitsStats} className="mt-8" scaleReveal />
            <ul className="mt-10 grid gap-4 lg:grid-cols-3">
              {benefitsOverviewCards.map((card) => (
                <li
                  key={card.title}
                  className="rounded-[1.25rem] border border-teal-100 bg-gradient-to-br from-white to-teal-50/30 p-6 shadow-sm"
                >
                  <div className="h-1 w-8 rounded-full bg-teal-600" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-extrabold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section id="health-wellness" className={FRAME} aria-labelledby="health-heading">
            <h2 id="health-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Health &amp; Wellness
            </h2>
            <CareerIconGrid
              items={benefitsHealthItems.map((item, i) => ({
                ...item,
                icon: [Stethoscope, Heart, Sparkles, Brain, Shield][i] ?? Heart,
              }))}
            />
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section id="pto-leave" className={FRAME} aria-labelledby="pto-heading">
            <h2 id="pto-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              PTO &amp; Leave
            </h2>
            <CareerIconGrid
              items={benefitsPtoItems.map((item, i) => ({
                ...item,
                icon: [Calendar, Heart, Shield, Sparkles][i] ?? Calendar,
              }))}
            />
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section
            id="compensation-philosophy"
            className="scroll-mt-28 rounded-[2rem] border border-teal-100 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 p-8 shadow-sm sm:p-10"
            aria-labelledby="philosophy-heading"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white">
                <DollarSign size={20} aria-hidden="true" />
              </span>
              <h2 id="philosophy-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Compensation Philosophy
              </h2>
            </div>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{compensationPhilosophy.intro}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {compensationPhilosophy.pillars.map((pillar, index) => (
                <motion.li
                  key={pillar.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.06, ease: EASE_OUT }}
                  className="rounded-xl border border-teal-100 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-base font-extrabold text-teal-900">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{pillar.description}</p>
                </motion.li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section id="salary-estimator" className={FRAME} aria-labelledby="estimator-heading">
            <h2 id="estimator-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Salary &amp; Benefits Estimator
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              Explore illustrative compensation ranges, total rewards, career fit, and pathway milestones by role,
              employment type, experience, and service area. Estimates are informational only—not job offers.
            </p>
            <div className="mt-8">
              <SalaryEstimator />
            </div>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section id="benefits-faq" className="scroll-mt-28 space-y-12" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Benefits FAQ
            </h2>
            <FAQAccordion title="Benefits questions" items={benefitsFaqBenefits} />
            <FAQAccordion title="Eligibility questions" items={benefitsFaqEligibility} />
            <FAQAccordion title="Training & development questions" items={benefitsFaqTraining} />
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
            {benefitsRequiredDisclaimer}
          </p>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section className="rounded-[2rem] border border-teal-200 bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-700 p-8 text-white shadow-lg sm:p-10">
            <h2 className="text-2xl font-extrabold sm:text-3xl">Ready to join a team that invests in you?</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-teal-50">
              Explore open roles, career pathways, and the culture that supports clinicians across Northern Virginia.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/careers/open-roles"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-900"
              >
                Search Open Roles
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/careers/career-growth-pathways"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-6 py-3 text-sm font-bold text-white"
              >
                Career Growth Pathways
              </Link>
            </div>
          </section>
        </RbtScrollReveal>
      </div>
    </CareerPageShell>
  );
}
