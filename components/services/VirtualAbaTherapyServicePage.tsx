"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle2,
  ClipboardList,
  FileText,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Lock,
  MessageCircle,
  Monitor,
  Phone,
  ShieldCheck,
  Smartphone,
  Tablet,
  Users,
  Video,
  Wifi,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import LiveVideoIntakeModals from "@/components/home/ai-intake/LiveVideoIntakeModals";
import FAQAccordion from "@/components/getting-started/FAQAccordion";
import { TelehealthHeroIllustration } from "@/components/illustrations/VirtualAbaIllustrations";
import VirtualAbaHomeTelehealthVisual from "@/components/services/virtual-aba/VirtualAbaHomeTelehealthVisual";
import VirtualAbaLiveVideoSupport from "@/components/services/virtual-aba/VirtualAbaLiveVideoSupport";
import VirtualAbaPageSchema from "@/components/services/virtual-aba/VirtualAbaPageSchema";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { useLiveVideoIntake } from "@/hooks/useLiveVideoIntake";
import {
  VIRTUAL_ABA_CARE_TIMELINE,
  VIRTUAL_ABA_COMPARISON,
  VIRTUAL_ABA_DEVICE_READINESS,
  VIRTUAL_ABA_DIGITAL_PLATFORM,
  VIRTUAL_ABA_EVIDENCE,
  VIRTUAL_ABA_FAQ,
  VIRTUAL_ABA_FINAL_CTA,
  VIRTUAL_ABA_HERO,
  VIRTUAL_ABA_INSURANCE,
  VIRTUAL_ABA_LIVE_VIDEO,
  VIRTUAL_ABA_LIMITATIONS,
  VIRTUAL_ABA_MEANING,
  VIRTUAL_ABA_PARENT_COACHING,
  VIRTUAL_ABA_PRIVACY,
  VIRTUAL_ABA_PROGRESS_ANALYTICS,
  VIRTUAL_ABA_RELATED_SERVICES,
  VIRTUAL_ABA_SAFETY,
  VIRTUAL_ABA_SCHOOL_COLLABORATION,
  VIRTUAL_ABA_TECHNOLOGY,
  VIRTUAL_ABA_WHEN_APPROPRIATE,
} from "@/lib/services/virtual-aba-therapy-data";
import { getButtonClasses } from "@/lib/button-styles";
import { EDEN_CARD } from "@/lib/eden-design-system";

const WHEN_ICONS = [Users, ClipboardList, MessageCircle, MessageCircle, HeartHandshake, GraduationCap, BarChart3, Users] as const;
const PLATFORM_ICONS = [Video, ClipboardList, BarChart3, Users, FileText, Calendar] as const;
const TECH_ICONS = [Video, ClipboardList, ShieldCheck, ShieldCheck, Monitor, ClipboardList, Smartphone, Laptop] as const;
const PRIVACY_ICONS = [ShieldCheck, Lock, FileText, Lock, Users, ClipboardList, Monitor, Users] as const;
const SCHOOL_ICONS = [GraduationCap, Users, BookOpen, BookOpen, Calendar, HeartHandshake, MessageCircle] as const;

const cardClass = `${EDEN_CARD} eden-clinical-card flex h-full flex-col border-slate-200/80 bg-white/90 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-900/8`;
const glassCardClass = `${EDEN_CARD} eden-clinical-card border-white/80 bg-white/85 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-900/8`;

type RevealFn = (delay?: number) => Record<string, unknown>;

function SectionHeader({
  title,
  intro,
  reveal,
}: {
  title: string;
  intro: string;
  reveal: RevealFn;
}) {
  return (
    <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{title}</h2>
      <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{intro}</p>
    </motion.div>
  );
}

function ProgressBar({
  label,
  value,
  text,
  index,
  reduceMotion,
}: {
  label: string;
  value: number;
  text: string;
  index: number;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`${glassCardClass} p-6`}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-black text-[#1e5a8a]">{label}</h3>
        <span className="text-xs font-bold text-slate-500">{value}%</span>
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#1e5a8a] via-[#128c8c] to-[#0E6B4F]"
          initial={reduceMotion ? false : { width: 0 }}
          whileInView={reduceMotion ? undefined : { width: `${value}%` }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.9, delay: index * 0.05 + 0.15, ease: "easeOut" }}
        />
      </div>
      <p className="mt-3 text-xs font-semibold leading-6 text-slate-600">{text}</p>
    </motion.article>
  );
}

export default function VirtualAbaTherapyServicePage() {
  const hero = useLocalizedContent("VIRTUAL_ABA_HERO", VIRTUAL_ABA_HERO);
  const meaning = useLocalizedContent("VIRTUAL_ABA_MEANING", VIRTUAL_ABA_MEANING);
  const digitalPlatform = useLocalizedContent("VIRTUAL_ABA_DIGITAL_PLATFORM", VIRTUAL_ABA_DIGITAL_PLATFORM);
  const whenAppropriate = useLocalizedContent("VIRTUAL_ABA_WHEN_APPROPRIATE", VIRTUAL_ABA_WHEN_APPROPRIATE);
  const careTimeline = useLocalizedContent("VIRTUAL_ABA_CARE_TIMELINE", VIRTUAL_ABA_CARE_TIMELINE);
  const progressAnalytics = useLocalizedContent("VIRTUAL_ABA_PROGRESS_ANALYTICS", VIRTUAL_ABA_PROGRESS_ANALYTICS);
  const privacy = useLocalizedContent("VIRTUAL_ABA_PRIVACY", VIRTUAL_ABA_PRIVACY);
  const technology = useLocalizedContent("VIRTUAL_ABA_TECHNOLOGY", VIRTUAL_ABA_TECHNOLOGY);
  const evidence = useLocalizedContent("VIRTUAL_ABA_EVIDENCE", VIRTUAL_ABA_EVIDENCE);
  const parentCoaching = useLocalizedContent("VIRTUAL_ABA_PARENT_COACHING", VIRTUAL_ABA_PARENT_COACHING);
  const deviceReadiness = useLocalizedContent("VIRTUAL_ABA_DEVICE_READINESS", VIRTUAL_ABA_DEVICE_READINESS);
  const schoolCollaboration = useLocalizedContent("VIRTUAL_ABA_SCHOOL_COLLABORATION", VIRTUAL_ABA_SCHOOL_COLLABORATION);
  const safety = useLocalizedContent("VIRTUAL_ABA_SAFETY", VIRTUAL_ABA_SAFETY);
  const limitations = useLocalizedContent("VIRTUAL_ABA_LIMITATIONS", VIRTUAL_ABA_LIMITATIONS);
  const comparison = useLocalizedContent("VIRTUAL_ABA_COMPARISON", VIRTUAL_ABA_COMPARISON);
  const insurance = useLocalizedContent("VIRTUAL_ABA_INSURANCE", VIRTUAL_ABA_INSURANCE);
  const faq = useLocalizedContent("VIRTUAL_ABA_FAQ", VIRTUAL_ABA_FAQ);
  const finalCta = useLocalizedContent("VIRTUAL_ABA_FINAL_CTA", VIRTUAL_ABA_FINAL_CTA);
  const relatedServices = useLocalizedContent("VIRTUAL_ABA_RELATED_SERVICES", VIRTUAL_ABA_RELATED_SERVICES);
  const liveVideoSupport = useLocalizedContent("VIRTUAL_ABA_LIVE_VIDEO", VIRTUAL_ABA_LIVE_VIDEO);
  const reduceMotion = useReducedMotion();

  const liveVideo = useLiveVideoIntake({
    onScheduleCall: () => {
      window.location.assign("/about/contact-us");
    },
  });

  const reveal: RevealFn = (delay = 0) =>
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
    <AboutPremiumLayout schema={<VirtualAbaPageSchema />}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b4f4f] via-[#1e5a8a] to-[#0E6B4F] px-4 py-16 text-white lg:px-8 lg:py-24">
        <div className="virtual-aba-glow virtual-aba-glow--1" aria-hidden />
        <div className="virtual-aba-glow virtual-aba-glow--2" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.p {...heroMotion} className="text-sm font-black uppercase tracking-[0.2em] text-[#FACC15]/90">
              {hero.eyebrow}
            </motion.p>
            <motion.h1
              {...(reduceMotion ? {} : { ...heroMotion, transition: { duration: 0.65, delay: 0.06 } })}
              className="mt-4 text-4xl font-black leading-tight md:text-5xl lg:text-[3.25rem]"
            >
              {hero.title}
            </motion.h1>
            <motion.p
              {...(reduceMotion ? {} : { ...heroMotion, transition: { duration: 0.65, delay: 0.12 } })}
              className="mt-5 text-lg font-semibold leading-8 text-white/90"
            >
              {hero.subtitle}
            </motion.p>
            <motion.div
              {...(reduceMotion ? {} : { ...heroMotion, transition: { duration: 0.65, delay: 0.18 } })}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link href="/start-aba-therapy" className={`${getButtonClasses("primarySite")} shadow-lg shadow-emerald-900/25`}>
                {hero.primaryCta} <ArrowRight size={18} aria-hidden />
              </Link>
              <Link href="/insurance-coverage" className={getButtonClasses("gold")}>
                {hero.verifyCta}
              </Link>
              <button type="button" className={getButtonClasses("secondaryOnDark")} onClick={liveVideo.openPreCallModal}>
                {hero.secondaryCta}
              </button>
            </motion.div>
          </div>
          <motion.div
            {...(reduceMotion ? {} : { ...heroMotion, transition: { duration: 0.65, delay: 0.1 } })}
            className="mx-auto w-full max-w-md"
          >
            <TelehealthHeroIllustration
              ariaLabel="Illustration of a secure virtual ABA therapy video session at home"
              className="drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Premium animated visual strip */}
      <section className="relative overflow-hidden border-y border-sky-100 bg-gradient-to-r from-slate-50 via-sky-50/80 to-emerald-50/60 px-4 py-12 lg:px-8">
        <div className="virtual-aba-connection-lines pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            { icon: Video, title: "Secure video sessions", text: "HIPAA-conscious telehealth for coaching and consultation" },
            { icon: ShieldCheck, title: "Clinical oversight", text: "BCBA-guided plans with documented session review" },
            { icon: Wifi, title: "Flexible devices", text: "Phone, tablet, or computer when connectivity supports care" },
          ].map((item, i) => (
            <motion.article
              key={item.title}
              {...reveal(i * 0.06)}
              className="rounded-2xl border border-white/80 bg-white/90 p-6 shadow-md backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="inline-flex rounded-xl bg-gradient-to-br from-sky-50 to-emerald-50 p-3 text-[#1e5a8a]">
                <item.icon size={22} aria-hidden />
              </div>
              <h3 className="mt-4 text-base font-black text-[#0F172A]">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* What virtual ABA means */}
      <section className="eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title={meaning.title} intro={meaning.intro} reveal={reveal} />
          <motion.p
            {...reveal(0.06)}
            className="mx-auto mt-6 max-w-4xl rounded-[1.75rem] border border-sky-100 bg-white p-8 text-base font-semibold leading-8 text-slate-700 shadow-sm"
          >
            {meaning.body}
          </motion.p>
          <motion.ul {...reveal(0.08)} className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">
            {meaning.includes.map((item) => (
              <li key={item} className="flex gap-3 text-sm font-semibold leading-7 text-slate-700">
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={18} aria-hidden />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Eden Digital Care Platform */}
      <section className="relative overflow-hidden px-4 py-16 lg:px-8 lg:py-20">
        <div className="virtual-aba-glow virtual-aba-glow--1 pointer-events-none opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeader title={digitalPlatform.title} intro={digitalPlatform.subtitle} reveal={reveal} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {digitalPlatform.cards.map((card, index) => {
              const Icon = PLATFORM_ICONS[index] ?? Video;
              return (
                <motion.article
                  key={card.title}
                  {...reveal(index * 0.04)}
                  className={`${glassCardClass} group border-sky-100/80 bg-gradient-to-br from-white/95 to-sky-50/40 p-6`}
                >
                  <div className="inline-flex rounded-2xl bg-gradient-to-br from-sky-100 to-emerald-50 p-3 text-[#1e5a8a] transition group-hover:scale-105">
                    <Icon size={22} aria-hidden />
                  </div>
                  <h3 className="mt-4 text-base font-black text-[#0F172A]">{card.title}</h3>
                  <p className="mt-2 flex-1 text-sm font-semibold leading-7 text-slate-600">{card.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Home telehealth visual */}
      <section className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <motion.div {...reveal()} className="order-2 lg:order-1">
            <VirtualAbaHomeTelehealthVisual className="mx-auto max-w-xl" />
          </motion.div>
          <motion.div {...reveal(0.08)} className="order-1 lg:order-2">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#128c8c]">Connected Care at Home</p>
            <h2 className="mt-3 text-3xl font-black text-[#0F172A] md:text-4xl">
              Virtual support designed for real family routines
            </h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
              Eden&apos;s telehealth experience connects caregivers, children, and BCBAs through secure video, documented
              progress review, and scheduling tools—when virtual care is clinically appropriate for your child&apos;s plan.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Parent and child participate from a familiar home environment",
                "BCBA consultation appears on screen with clear clinical guidance",
                "Secure connection workflows protect confidential health information",
                "Progress and scheduling elements support continuity between sessions",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm font-semibold leading-7 text-slate-700">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={18} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* When appropriate */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={whenAppropriate.title} intro={whenAppropriate.intro} reveal={reveal} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whenAppropriate.cards.map((card, index) => {
              const Icon = WHEN_ICONS[index] ?? Users;
              return (
                <motion.article key={card.title} {...reveal(index * 0.04)} className={cardClass}>
                  <div className="inline-flex rounded-2xl bg-sky-50 p-3 text-[#1e5a8a]">
                    <Icon size={20} aria-hidden />
                  </div>
                  <h3 className="mt-4 text-base font-black text-[#0F172A]">{card.title}</h3>
                  <p className="mt-2 flex-1 text-sm font-semibold leading-7 text-slate-600">{card.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive virtual care timeline */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white px-4 py-16 lg:px-8 lg:py-20">
        <div className="virtual-aba-connection-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-5xl">
          <SectionHeader title={careTimeline.title} intro={careTimeline.intro} reveal={reveal} />
          <ol className="relative mt-14 space-y-0">
            {careTimeline.steps.map((step, i) => (
              <motion.li
                key={step.title}
                {...reveal(i * 0.05)}
                className={`relative flex gap-6 pb-12 last:pb-0 md:gap-10 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="hidden w-1/2 md:block" aria-hidden />
                <div
                  className={`relative z-10 w-full md:w-1/2 ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"}`}
                >
                  <span
                    className="absolute top-0 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1e5a8a] to-[#0E6B4F] text-sm font-black text-white shadow-lg md:-translate-x-1/2 md:left-1/2 md:top-2"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <article className={`${glassCardClass} ml-14 p-6 md:ml-0 ${i % 2 === 0 ? "md:mr-6" : "md:ml-6"}`}>
                    <h3 className="text-lg font-black text-[#1e5a8a]">{step.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{step.text}</p>
                  </article>
                </div>
                <div
                  className="absolute left-5 top-0 hidden h-full w-0.5 bg-gradient-to-b from-sky-200 via-emerald-200 to-sky-200 md:left-1/2 md:block md:-translate-x-1/2"
                  aria-hidden
                />
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Progress analytics */}
      <section className="eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title={progressAnalytics.title} intro={progressAnalytics.intro} reveal={reveal} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {progressAnalytics.examples.map((example, index) => (
              <ProgressBar
                key={example.label}
                label={example.label}
                value={example.value}
                text={example.text}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
          <motion.p
            {...reveal(0.1)}
            className="mx-auto mt-8 max-w-3xl rounded-xl border border-amber-200/80 bg-amber-50/70 p-5 text-center text-sm font-semibold leading-7 text-slate-700"
          >
            {progressAnalytics.disclaimer}
          </motion.p>
        </div>
      </section>

      {/* Privacy, security, and clinical documentation */}
      <section className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={privacy.title} intro={privacy.intro} reveal={reveal} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {privacy.items.map((item, index) => {
              const Icon = PRIVACY_ICONS[index] ?? ShieldCheck;
              return (
                <motion.article key={item.title} {...reveal(index * 0.03)} className={cardClass}>
                  <div className="inline-flex rounded-xl bg-emerald-50 p-2.5 text-emerald-700">
                    <Icon size={18} aria-hidden />
                  </div>
                  <h3 className="mt-3 text-sm font-black text-[#0F172A]">{item.title}</h3>
                  <p className="mt-2 flex-1 text-xs font-semibold leading-6 text-slate-600 sm:text-sm sm:leading-7">
                    {item.text}
                  </p>
                </motion.article>
              );
            })}
          </div>
          {privacy.note ? (
            <motion.p
              {...reveal(0.08)}
              className="mx-auto mt-8 max-w-3xl rounded-xl border border-sky-200/80 bg-sky-50/70 p-5 text-center text-sm font-semibold leading-7 text-slate-700"
            >
              {privacy.note}
            </motion.p>
          ) : null}
        </div>
      </section>

      {/* Technology */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={technology.title} intro={technology.intro} reveal={reveal} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {technology.items.map((item, index) => {
              const Icon = TECH_ICONS[index] ?? Video;
              return (
                <motion.article key={item.title} {...reveal(index * 0.03)} className={`${cardClass} p-5`}>
                  <Icon className="text-[#0E6B4F]" size={20} aria-hidden />
                  <h3 className="mt-3 text-sm font-black text-[#0F172A]">{item.title}</h3>
                  <p className="mt-1 text-xs font-semibold leading-6 text-slate-600 sm:text-sm sm:leading-7">{item.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Evidence-based practice */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div {...reveal()} className="eden-clinical-panel rounded-[1.75rem] border border-sky-200/60 p-8 md:p-10">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50 p-3 text-[#1e5a8a]">
                <Brain size={24} aria-hidden />
              </div>
              <h2 className="text-2xl font-black text-[#0b4f4f] md:text-3xl">{evidence.title}</h2>
            </div>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-700">{evidence.intro}</p>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{evidence.body}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {evidence.pillars.map((pillar) => (
                <li key={pillar} className="flex gap-3 text-sm font-semibold leading-7 text-slate-700">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={18} aria-hidden />
                  {pillar}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Parent coaching expansion */}
      <section className="eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={parentCoaching.title} intro={parentCoaching.intro} reveal={reveal} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {parentCoaching.examples.map((example, index) => (
              <motion.article key={example.title} {...reveal(index * 0.02)} className={cardClass}>
                <h3 className="text-sm font-black text-[#1e5a8a]">{example.title}</h3>
                <p className="mt-2 flex-1 text-xs font-semibold leading-6 text-slate-600 sm:text-sm sm:leading-7">
                  {example.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Device readiness */}
      <section className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={deviceReadiness.title} intro={deviceReadiness.intro} reveal={reveal} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deviceReadiness.devices.map((device, index) => {
              const deviceIcons = [Smartphone, Smartphone, Tablet, Laptop, Monitor, Laptop] as const;
              const Icon = deviceIcons[index] ?? Monitor;
              return (
                <motion.article key={device.name} {...reveal(index * 0.03)} className={`${cardClass} p-5`}>
                  <Icon className="text-[#1e5a8a]" size={22} aria-hidden />
                  <h3 className="mt-3 text-base font-black text-[#0F172A]">{device.name}</h3>
                  <p className="mt-1 text-sm font-semibold leading-7 text-slate-600">{device.text}</p>
                </motion.article>
              );
            })}
          </div>
          <motion.div {...reveal(0.08)} className="mx-auto mt-10 max-w-4xl">
            <h3 className="text-center text-lg font-black text-[#0F172A]">Readiness checklist</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {deviceReadiness.checklist.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold leading-7 text-slate-700 shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={18} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* School collaboration */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={schoolCollaboration.title} intro={schoolCollaboration.intro} reveal={reveal} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {schoolCollaboration.cards.map((card, index) => {
              const Icon = SCHOOL_ICONS[index] ?? GraduationCap;
              return (
                <motion.article key={card.title} {...reveal(index * 0.03)} className={cardClass}>
                  <div className="inline-flex rounded-2xl bg-sky-50 p-3 text-[#1e5a8a]">
                    <Icon size={20} aria-hidden />
                  </div>
                  <h3 className="mt-4 text-base font-black text-[#0F172A]">{card.title}</h3>
                  <p className="mt-2 flex-1 text-sm font-semibold leading-7 text-slate-600">{card.text}</p>
                </motion.article>
              );
            })}
          </div>
          {schoolCollaboration.note ? (
            <motion.p
              {...reveal(0.08)}
              className="mx-auto mt-8 max-w-3xl rounded-xl border border-amber-200/80 bg-amber-50/70 p-5 text-center text-sm font-semibold leading-7 text-slate-700"
            >
              {schoolCollaboration.note}
            </motion.p>
          ) : null}
        </div>
      </section>

      {/* Safety and readiness */}
      <section className="eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeader title={safety.title} intro={safety.intro} reveal={reveal} />
          <motion.ul {...reveal(0.06)} className="mt-10 space-y-3">
            {safety.checklist.map((item) => (
              <li
                key={item}
                className="flex gap-4 rounded-2xl border border-emerald-100 bg-white px-5 py-4 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={20} aria-hidden />
                <span className="text-sm font-semibold leading-7 text-slate-700">{item}</span>
              </li>
            ))}
          </motion.ul>
          {safety.note ? (
            <motion.p
              {...reveal(0.1)}
              className="mt-8 rounded-xl border border-amber-200/80 bg-amber-50/70 p-5 text-center text-sm font-semibold leading-7 text-slate-700"
            >
              {safety.note}
            </motion.p>
          ) : null}
        </div>
      </section>

      {/* Limitations */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div {...reveal()} className="eden-clinical-panel rounded-[1.75rem] border border-sky-200/60 p-8">
            <h2 className="text-2xl font-black text-[#0b4f4f] md:text-3xl">{limitations.title}</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{limitations.intro}</p>
            <ul className="mt-6 space-y-3">
              {limitations.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm font-semibold leading-7 text-slate-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden />
                  {bullet}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl border border-sky-200/80 bg-sky-50/70 p-4 text-sm font-semibold leading-7 text-slate-700">
              {limitations.note}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service setting comparison table */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={comparison.title} intro={comparison.intro} reveal={reveal} />
          <motion.div {...reveal(0.06)} className="mt-12 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-gradient-to-r from-sky-50 to-emerald-50">
                  <th scope="col" className="px-4 py-4 font-black text-[#0F172A]">
                    &nbsp;
                  </th>
                  {comparison.columns.map((col) => (
                    <th key={col} scope="col" className="px-4 py-4 font-black text-[#1e5a8a]">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, rowIndex) => (
                  <tr key={row.label} className={rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                    <th scope="row" className="px-4 py-4 align-top font-black text-[#0F172A]">
                      {row.label}
                    </th>
                    {row.values.map((value, colIndex) => (
                      <td key={`${row.label}-${colIndex}`} className="px-4 py-4 align-top font-semibold leading-7 text-slate-600">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Insurance */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0b4f4f] to-[#1e5a8a] px-4 py-16 text-white lg:px-8 lg:py-20">
        <motion.div {...reveal()} className="relative mx-auto max-w-4xl text-center">
          <ShieldCheck className="mx-auto text-emerald-300" size={40} aria-hidden />
          <h2 className="mt-4 text-3xl font-black md:text-4xl">{insurance.title}</h2>
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
          <Link href="/insurance-coverage" className={`${getButtonClasses("gold")} mt-8 inline-flex`}>
            Verify Insurance <ArrowRight size={18} aria-hidden />
          </Link>
        </motion.div>
      </section>

      <VirtualAbaLiveVideoSupport
        title={liveVideoSupport.title}
        text={liveVideoSupport.text}
        availability={liveVideoSupport.availability}
        disclaimer={liveVideoSupport.disclaimer}
        startLiveVideoCta={liveVideoSupport.startLiveVideoCta}
        callCta={liveVideoSupport.callCta}
        phoneHref={liveVideoSupport.phoneHref}
        onStartLiveVideo={liveVideo.openPreCallModal}
        reveal={reveal}
      />

      {/* FAQ */}
      <section className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div {...reveal()} className="text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
              Common questions about virtual ABA at Eden.
            </p>
          </motion.div>
          <motion.div {...reveal(0.08)} className="mt-10">
            <FAQAccordion items={faq} />
          </motion.div>
        </div>
      </section>

      {/* Related services */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title={relatedServices.title} intro={relatedServices.intro} reveal={reveal} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.items.map((item, index) => (
              <motion.article key={item.href} {...reveal(index * 0.03)}>
                <Link
                  href={item.href}
                  className={`${cardClass} group block p-6 transition hover:border-emerald-200 hover:shadow-emerald-900/10`}
                >
                  <h3 className="text-base font-black text-[#1e5a8a] group-hover:text-[#0E6B4F]">{item.label}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{item.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                    Learn more <ArrowRight size={16} aria-hidden />
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0E6B4F] via-[#128c8c] to-[#1e5a8a] px-4 py-16 text-white lg:px-8 lg:py-20">
        <div className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-[#FACC15]/20 blur-3xl" aria-hidden />
        <motion.div {...reveal()} className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black md:text-4xl">{finalCta.title}</h2>
          <p className="mt-4 text-lg font-semibold leading-8 text-white/90">{finalCta.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/start-aba-therapy" className={getButtonClasses("primarySite")}>
              {finalCta.primaryCta} <ArrowRight size={18} aria-hidden />
            </Link>
            <Link href="/insurance-coverage" className={getButtonClasses("gold")}>
              {finalCta.verifyCta}
            </Link>
            <a href={finalCta.phoneHref} className={getButtonClasses("secondaryOnDark")}>
              <Phone size={18} aria-hidden /> {finalCta.callCta}
            </a>
          </div>
          <p className="mt-4 text-sm font-semibold text-white/75">{finalCta.phoneDisplay}</p>
        </motion.div>
      </section>

      <LiveVideoIntakeModals {...liveVideo} />
    </AboutPremiumLayout>
  );
}
