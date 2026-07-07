"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Building2,
  Calendar,
  ClipboardList,
  GraduationCap,
  Heart,
  Home,
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
  AFTER_SCHOOL_AGE_BASED,
  AFTER_SCHOOL_CLINICAL_QUALITY,
  AFTER_SCHOOL_COMMUNICATION,
  AFTER_SCHOOL_COMMUNITY,
  AFTER_SCHOOL_CONTINUITY,
  AFTER_SCHOOL_CTA,
  AFTER_SCHOOL_EMOTIONAL_REGULATION,
  AFTER_SCHOOL_EXECUTIVE_FUNCTION,
  AFTER_SCHOOL_EXPECTATIONS,
  AFTER_SCHOOL_FAMILY_COLLABORATION,
  AFTER_SCHOOL_FAQ,
  AFTER_SCHOOL_HERO,
  AFTER_SCHOOL_HOMEWORK_READINESS,
  AFTER_SCHOOL_INDEPENDENCE,
  AFTER_SCHOOL_INSURANCE,
  AFTER_SCHOOL_SAFETY,
  AFTER_SCHOOL_SCHOOL_COLLABORATION,
  AFTER_SCHOOL_SCHOOL_DAY,
  AFTER_SCHOOL_SOCIAL_DEVELOPMENT,
  AFTER_SCHOOL_TRUST,
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

const WHY_ICONS = [Calendar, Sparkles, Brain, Heart, Home, BookOpen, Users, Sparkles, MessageCircle, BarChart3] as const;

const cardClass = `${EDEN_CARD} eden-clinical-card flex h-full flex-col border-slate-200/80 bg-white/90 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-900/8`;

type TopicSection = {
  title: string;
  intro: string;
  items: ReadonlyArray<{ title: string; text: string }>;
  note?: string;
};

type SectionShellProps = {
  id?: string;
  title: string;
  intro: string;
  tone?: "white" | "mint" | "warm" | "neutral";
  children: React.ReactNode;
  reveal: (delay?: number) => Record<string, unknown>;
};

const toneClass = {
  white: "eden-section eden-section--white",
  mint: "eden-section eden-section--mint",
  warm: "eden-section eden-section--warm",
  neutral: "bg-gradient-to-b from-slate-50 to-white",
} as const;

function SectionShell({ id, title, intro, tone = "white", children, reveal }: SectionShellProps) {
  return (
    <section id={id} className={`px-4 py-16 lg:px-8 lg:py-20 ${toneClass[tone]}`}>
      <div className="mx-auto max-w-7xl">
        <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{intro}</p>
        </motion.div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function TopicGrid({
  items,
  reveal,
  columns = 2,
}: {
  items: ReadonlyArray<{ title: string; text: string }>;
  reveal: (delay?: number) => Record<string, unknown>;
  columns?: 2 | 3;
}) {
  const gridClass = columns === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";
  return (
    <div className={`grid gap-5 ${gridClass}`}>
      {items.map((item, index) => (
        <motion.article key={item.title} {...reveal(index * 0.03)} className={cardClass}>
          <h3 className="text-base font-black text-[#1e5a8a]">{item.title}</h3>
          <p className="mt-2 flex-1 text-sm font-semibold leading-7 text-slate-600">{item.text}</p>
        </motion.article>
      ))}
    </div>
  );
}

function TopicSectionBlock({
  section,
  tone,
  reveal,
  columns = 2,
}: {
  section: TopicSection;
  tone?: SectionShellProps["tone"];
  reveal: (delay?: number) => Record<string, unknown>;
  columns?: 2 | 3;
}) {
  return (
    <SectionShell title={section.title} intro={section.intro} tone={tone} reveal={reveal}>
      <TopicGrid items={section.items} reveal={reveal} columns={columns} />
      {section.note ? (
        <motion.p
          {...reveal(0.08)}
          className="mx-auto mt-8 max-w-3xl rounded-xl border border-amber-200/80 bg-amber-50/70 p-5 text-center text-sm font-semibold leading-7 text-slate-700"
        >
          {section.note}
        </motion.p>
      ) : null}
    </SectionShell>
  );
}

export default function AfterSchoolProgramsPage() {
  const hero = useLocalizedContent("AFTER_SCHOOL_HERO", AFTER_SCHOOL_HERO);
  const whyMatters = useLocalizedContent("AFTER_SCHOOL_WHY_MATTERS", AFTER_SCHOOL_WHY_MATTERS);
  const continuity = useLocalizedContent("AFTER_SCHOOL_CONTINUITY", AFTER_SCHOOL_CONTINUITY);
  const expectations = useLocalizedContent("AFTER_SCHOOL_EXPECTATIONS", AFTER_SCHOOL_EXPECTATIONS);
  const executiveFunction = useLocalizedContent("AFTER_SCHOOL_EXECUTIVE_FUNCTION", AFTER_SCHOOL_EXECUTIVE_FUNCTION);
  const homework = useLocalizedContent("AFTER_SCHOOL_HOMEWORK_READINESS", AFTER_SCHOOL_HOMEWORK_READINESS);
  const communication = useLocalizedContent("AFTER_SCHOOL_COMMUNICATION", AFTER_SCHOOL_COMMUNICATION);
  const emotional = useLocalizedContent("AFTER_SCHOOL_EMOTIONAL_REGULATION", AFTER_SCHOOL_EMOTIONAL_REGULATION);
  const social = useLocalizedContent("AFTER_SCHOOL_SOCIAL_DEVELOPMENT", AFTER_SCHOOL_SOCIAL_DEVELOPMENT);
  const community = useLocalizedContent("AFTER_SCHOOL_COMMUNITY", AFTER_SCHOOL_COMMUNITY);
  const independence = useLocalizedContent("AFTER_SCHOOL_INDEPENDENCE", AFTER_SCHOOL_INDEPENDENCE);
  const safety = useLocalizedContent("AFTER_SCHOOL_SAFETY", AFTER_SCHOOL_SAFETY);
  const family = useLocalizedContent("AFTER_SCHOOL_FAMILY_COLLABORATION", AFTER_SCHOOL_FAMILY_COLLABORATION);
  const schoolCollab = useLocalizedContent("AFTER_SCHOOL_SCHOOL_COLLABORATION", AFTER_SCHOOL_SCHOOL_COLLABORATION);
  const clinical = useLocalizedContent("AFTER_SCHOOL_CLINICAL_QUALITY", AFTER_SCHOOL_CLINICAL_QUALITY);
  const schoolDay = useLocalizedContent("AFTER_SCHOOL_SCHOOL_DAY", AFTER_SCHOOL_SCHOOL_DAY);
  const ageBased = useLocalizedContent("AFTER_SCHOOL_AGE_BASED", AFTER_SCHOOL_AGE_BASED);
  const insurance = useLocalizedContent("AFTER_SCHOOL_INSURANCE", AFTER_SCHOOL_INSURANCE);
  const trust = useLocalizedContent("AFTER_SCHOOL_TRUST", AFTER_SCHOOL_TRUST);
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b4f4f] via-[#1e5a8a] to-[#0E6B4F] px-4 py-16 text-white lg:px-8 lg:py-28">
        <div className="after-school-geo after-school-geo--1" aria-hidden />
        <div className="after-school-geo after-school-geo--2" aria-hidden />
        <div className="after-school-geo after-school-geo--3" aria-hidden />
        <div
          className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#49b8c8]/25 blur-3xl after-school-float-slow"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[#FACC15]/15 blur-3xl after-school-float"
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p {...heroMotion} className="text-sm font-black uppercase tracking-[0.2em] text-[#FACC15]/90">
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            {...(reduceMotion ? {} : { ...heroMotion, transition: { duration: 0.65, delay: 0.06 } })}
            className="mt-4 text-4xl font-black leading-tight md:text-5xl lg:text-[3.35rem]"
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
        <div className="after-school-hero-line mx-auto mt-14 max-w-md" aria-hidden />
      </section>

      {/* Why after-school matters — expanded */}
      <section className="eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{whyMatters.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{whyMatters.intro}</p>
          </motion.div>
          <motion.p
            {...reveal(0.06)}
            className="mx-auto mt-6 max-w-4xl rounded-[1.75rem] border border-sky-100 bg-gradient-to-br from-white to-sky-50/50 p-8 text-center text-base font-semibold leading-8 text-slate-700 shadow-sm"
          >
            {whyMatters.body}
          </motion.p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyMatters.topics.map((topic, index) => {
              const Icon = WHY_ICONS[index] ?? Sparkles;
              return (
                <motion.article key={topic.title} {...reveal(index * 0.03)} className={cardClass}>
                  <div className="inline-flex rounded-2xl bg-gradient-to-br from-amber-50 to-sky-50 p-3 text-[#0E6B4F]">
                    <Icon size={20} aria-hidden />
                  </div>
                  <h3 className="mt-4 text-base font-black text-[#0F172A]">{topic.title}</h3>
                  <p className="mt-2 flex-1 text-sm font-semibold leading-7 text-slate-600">{topic.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* School → Home continuity */}
      <section id="continuity" className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white px-4 py-16 lg:px-8 lg:py-20">
        <div className="pointer-events-none absolute left-0 top-1/4 h-48 w-48 rounded-full bg-emerald-100/50 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{continuity.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{continuity.intro}</p>
          </motion.div>

          {/* Journey visualization */}
          <motion.ol
            {...reveal(0.06)}
            className="after-school-journey mx-auto mt-14 flex max-w-5xl flex-col gap-4 md:flex-row md:items-stretch md:gap-0"
            aria-label="School to home journey"
          >
            {continuity.journey.map((step, index) => (
              <li key={step.step} className="after-school-journey-step relative flex-1">
                <div className="mx-2 flex h-full flex-col rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0E6B4F] to-[#49b8c8] text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-3 text-sm font-black text-[#1e5a8a]">{step.step}</h3>
                  <p className="mt-2 flex-1 text-xs font-semibold leading-6 text-slate-600 sm:text-sm sm:leading-7">{step.text}</p>
                </div>
              </li>
            ))}
          </motion.ol>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {continuity.pillars.map((pillar, index) => (
              <motion.article key={pillar.title} {...reveal(index * 0.04)} className={cardClass}>
                <h3 className="text-lg font-black text-[#0E6B4F]">{pillar.title}</h3>
                <p className="mt-2 flex-1 text-sm font-semibold leading-7 text-slate-600">{pillar.text}</p>
              </motion.article>
            ))}
          </div>

          <motion.div
            {...reveal(0.1)}
            className="eden-clinical-panel mx-auto mt-12 max-w-4xl rounded-[1.75rem] border border-emerald-200/60 p-8"
          >
            <h3 className="text-xl font-black text-[#0b4f4f]">{continuity.collaboration.title}</h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{continuity.collaboration.intro}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {continuity.collaboration.partners.map((partner) => (
                <li key={partner} className="flex gap-2 text-sm font-semibold text-slate-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  {partner}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 text-sm font-semibold leading-7 text-slate-700">
              {continuity.collaboration.note}
            </p>
          </motion.div>
        </div>
      </section>

      {/* What families can expect */}
      <section className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
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

      <TopicSectionBlock section={executiveFunction} tone="white" reveal={reveal} columns={3} />
      <TopicSectionBlock section={homework} tone="warm" reveal={reveal} columns={2} />
      <TopicSectionBlock section={communication} tone="mint" reveal={reveal} columns={2} />
      <TopicSectionBlock section={emotional} tone="white" reveal={reveal} columns={2} />
      <TopicSectionBlock section={social} tone="warm" reveal={reveal} columns={2} />
      <TopicSectionBlock section={community} tone="neutral" reveal={reveal} columns={2} />
      <TopicSectionBlock section={independence} tone="mint" reveal={reveal} columns={2} />
      <TopicSectionBlock section={safety} tone="white" reveal={reveal} columns={2} />

      {/* Family collaboration */}
      <SectionShell id="family" title={family.title} intro={family.intro} tone="warm" reveal={reveal}>
        <TopicGrid items={family.items} reveal={reveal} columns={2} />
      </SectionShell>

      {/* School collaboration */}
      <SectionShell id="school-collaboration" title={schoolCollab.title} intro={schoolCollab.intro} tone="mint" reveal={reveal}>
        <TopicGrid items={schoolCollab.items} reveal={reveal} columns={2} />
        <motion.p
          {...reveal(0.08)}
          className="mx-auto mt-8 max-w-3xl rounded-xl border border-sky-200/80 bg-sky-50/70 p-5 text-center text-sm font-semibold leading-7 text-slate-700"
        >
          {schoolCollab.note}
        </motion.p>
      </SectionShell>

      {/* Clinical quality */}
      <SectionShell id="clinical-quality" title={clinical.title} intro={clinical.intro} tone="white" reveal={reveal}>
        <TopicGrid items={clinical.items} reveal={reveal} columns={2} />
      </SectionShell>

      {/* Designed around school day */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{schoolDay.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{schoolDay.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {schoolDay.points.map((point, index) => (
              <motion.article key={point.title} {...reveal(index * 0.05)} className={cardClass}>
                <h3 className="text-lg font-black text-[#1e5a8a]">{point.title}</h3>
                <p className="mt-3 flex-1 text-sm font-semibold leading-7 text-slate-600">{point.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Age-based support */}
      <section className="eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{ageBased.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{ageBased.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {ageBased.groups.map((group, index) => {
              const icons = [GraduationCap, BookOpen, Building2, Users];
              const Icon = icons[index] ?? GraduationCap;
              return (
                <motion.article
                  key={group.age}
                  {...reveal(index * 0.06)}
                  className={`${cardClass} border-l-4 border-l-[#FACC15]`}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-amber-50 p-2 text-amber-700">
                      <Icon size={22} aria-hidden />
                    </div>
                    <h3 className="text-lg font-black text-[#0F172A]">{group.age}</h3>
                  </div>
                  <p className="mt-4 flex-1 text-sm font-semibold leading-7 text-slate-600">{group.text}</p>
                </motion.article>
              );
            })}
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

      {/* Trust & clinical standards */}
      <section className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{trust.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{trust.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trust.commitments.map((item, index) => (
              <motion.article key={item.title} {...reveal(index * 0.04)} className={cardClass}>
                <div className="inline-flex rounded-full bg-emerald-100 p-2 text-[#0E6B4F]">
                  <ShieldCheck size={18} aria-hidden />
                </div>
                <h3 className="mt-3 text-sm font-black text-[#0F172A]">{item.title}</h3>
                <p className="mt-2 flex-1 text-xs font-semibold leading-6 text-slate-600 sm:text-sm sm:leading-7">{item.text}</p>
              </motion.article>
            ))}
          </div>
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
