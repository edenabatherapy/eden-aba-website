"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ClipboardList,
  Heart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import FAQAccordion from "@/components/getting-started/FAQAccordion";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import {
  AFTER_SCHOOL_CTA,
  AFTER_SCHOOL_EXPECTATIONS,
  AFTER_SCHOOL_FAQ,
  AFTER_SCHOOL_HERO,
  AFTER_SCHOOL_INSURANCE,
  AFTER_SCHOOL_SCHOOL_DAY,
  AFTER_SCHOOL_SKILLS,
  AFTER_SCHOOL_WHY_MATTERS,
} from "@/lib/services/after-school-programs-data";
import { getButtonClasses } from "@/lib/button-styles";
import { EDEN_CARD } from "@/lib/eden-design-system";

const EXPECTATION_ICONS = [
  MessageCircle,
  BookOpen,
  MessageCircle,
  ShieldCheck,
  Heart,
  Users,
  ClipboardList,
  BarChart3,
] as const;

const cardClass = `${EDEN_CARD} eden-clinical-card h-full border-slate-200/80 bg-white/90 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-900/8`;

export default function AfterSchoolProgramsPage() {
  const hero = useLocalizedContent("AFTER_SCHOOL_HERO", AFTER_SCHOOL_HERO);
  const whyMatters = useLocalizedContent("AFTER_SCHOOL_WHY_MATTERS", AFTER_SCHOOL_WHY_MATTERS);
  const expectations = useLocalizedContent("AFTER_SCHOOL_EXPECTATIONS", AFTER_SCHOOL_EXPECTATIONS);
  const skills = useLocalizedContent("AFTER_SCHOOL_SKILLS", AFTER_SCHOOL_SKILLS);
  const schoolDay = useLocalizedContent("AFTER_SCHOOL_SCHOOL_DAY", AFTER_SCHOOL_SCHOOL_DAY);
  const insurance = useLocalizedContent("AFTER_SCHOOL_INSURANCE", AFTER_SCHOOL_INSURANCE);
  const faq = useLocalizedContent("AFTER_SCHOOL_FAQ", AFTER_SCHOOL_FAQ);
  const cta = useLocalizedContent("AFTER_SCHOOL_CTA", AFTER_SCHOOL_CTA);
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-48px" },
          transition: { duration: 0.55, delay },
        };

  const heroMotion = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.65 } };

  return (
    <AboutPremiumLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b4f4f] via-[#1e5a8a] to-[#0E6B4F] px-4 py-16 text-white lg:px-8 lg:py-24">
        <div
          className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#49b8c8]/25 blur-3xl after-school-float-slow"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[#FACC15]/15 blur-3xl after-school-float"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-white/5 blur-2xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p {...heroMotion} className="text-sm font-black uppercase tracking-[0.2em] text-[#FACC15]/90">
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            {...(reduceMotion ? {} : { ...heroMotion, transition: { duration: 0.65, delay: 0.06 } })}
            className="mt-4 text-4xl font-black md:text-5xl lg:text-[3.25rem]"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            {...(reduceMotion ? {} : { ...heroMotion, transition: { duration: 0.65, delay: 0.12 } })}
            className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-white/90"
          >
            {hero.subtitle}
          </motion.p>
          <motion.div
            {...(reduceMotion ? {} : { ...heroMotion, transition: { duration: 0.65, delay: 0.18 } })}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Link href="/start-aba-therapy" className={`${getButtonClasses("primarySite")} shadow-lg shadow-emerald-900/25`}>
              {hero.primaryCta} <ArrowRight size={18} aria-hidden />
            </Link>
            <Link href="/about/contact-us" className={getButtonClasses("secondaryOnDark")}>
              {hero.secondaryCta}
            </Link>
          </motion.div>
        </div>
        <div className="after-school-hero-line mx-auto mt-14 max-w-xs" aria-hidden />
      </section>

      {/* Why after-school support matters */}
      <section className="eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div {...reveal()} className="text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{whyMatters.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{whyMatters.intro}</p>
          </motion.div>
          <motion.p
            {...reveal(0.08)}
            className="mt-6 rounded-[1.75rem] border border-sky-100 bg-gradient-to-br from-white to-sky-50/50 p-8 text-base font-semibold leading-8 text-slate-700 shadow-sm"
          >
            {whyMatters.body}
          </motion.p>
        </div>
      </section>

      {/* What families can expect */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white px-4 py-16 lg:px-8 lg:py-20">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-amber-100/40 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{expectations.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{expectations.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {expectations.cards.map((card, index) => {
              const Icon = EXPECTATION_ICONS[index] ?? Sparkles;
              return (
                <motion.article key={card.title} {...reveal(index * 0.04)} className={cardClass}>
                  <div className="inline-flex rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50 p-3 text-[#1e5a8a]">
                    <Icon size={22} aria-hidden />
                  </div>
                  <h3 className="mt-4 text-base font-black leading-snug text-[#0F172A]">{card.title}</h3>
                  <p className="mt-2 flex-1 text-sm font-semibold leading-7 text-slate-600">{card.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills we may target */}
      <section className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div {...reveal()} className="text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{skills.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{skills.intro}</p>
          </motion.div>
          <motion.ul {...reveal(0.06)} className="mt-10 space-y-4">
            {skills.items.map((item) => (
              <li
                key={item}
                className="flex gap-4 rounded-2xl border border-emerald-100/80 bg-white/80 px-5 py-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-[#0E6B4F] to-[#49b8c8]" aria-hidden />
                <span className="text-sm font-semibold leading-7 text-slate-700">{item}</span>
              </li>
            ))}
          </motion.ul>
          {skills.note ? (
            <motion.p
              {...reveal(0.1)}
              className="mt-8 rounded-xl border border-amber-200/80 bg-amber-50/70 p-5 text-center text-sm font-semibold leading-7 text-slate-700"
            >
              {skills.note}
            </motion.p>
          ) : null}
        </div>
      </section>

      {/* Designed around the school day */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{schoolDay.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{schoolDay.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {schoolDay.points.map((point, index) => (
              <motion.article
                key={point.title}
                {...reveal(index * 0.05)}
                className={`${cardClass} ${index === schoolDay.points.length - 1 && schoolDay.points.length % 3 !== 0 ? "lg:col-span-1" : ""}`}
              >
                <h3 className="text-lg font-black text-[#1e5a8a]">{point.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{point.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0b4f4f] to-[#1e5a8a] px-4 py-16 text-white lg:px-8 lg:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_55%)]" aria-hidden />
        <motion.div {...reveal()} className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-black md:text-4xl">{insurance.title}</h2>
          <p className="mt-4 text-lg font-semibold leading-8 text-white/85">{insurance.intro}</p>
          <p className="mx-auto mt-6 max-w-3xl rounded-2xl border border-white/15 bg-white/5 p-6 text-base font-semibold leading-8 text-white/90">
            {insurance.body}
          </p>
          <ul className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            {insurance.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold leading-7 text-white/85"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FACC15]" aria-hidden />
                {bullet}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div {...reveal()} className="text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
              Common questions families ask about after-school ABA at Eden.
            </p>
          </motion.div>
          <motion.div {...reveal(0.08)} className="mt-10">
            <FAQAccordion items={faq} />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0E6B4F] via-[#128c8c] to-[#1e5a8a] px-4 py-16 text-white lg:px-8 lg:py-20">
        <div className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-[#FACC15]/20 blur-3xl" aria-hidden />
        <motion.div {...reveal()} className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black md:text-4xl">{cta.title}</h2>
          <p className="mt-4 text-lg font-semibold leading-8 text-white/90">{cta.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/start-aba-therapy" className={getButtonClasses("primarySite")}>
              {cta.primaryCta} <ArrowRight size={18} aria-hidden />
            </Link>
            <Link href="/about/contact-us" className={getButtonClasses("secondaryOnDark")}>
              {cta.secondaryCta}
            </Link>
          </div>
        </motion.div>
      </section>
    </AboutPremiumLayout>
  );
}
