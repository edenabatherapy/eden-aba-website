"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  Laptop,
  MessageCircle,
  Monitor,
  Phone,
  ShieldCheck,
  Smartphone,
  Users,
  Video,
  Wifi,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import FAQAccordion from "@/components/getting-started/FAQAccordion";
import {
  FamilyCoachingIllustration,
  TelehealthHeroIllustration,
  VirtualProgressDashboardIllustration,
} from "@/components/illustrations/VirtualAbaIllustrations";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import {
  VIRTUAL_ABA_EXPECTATIONS,
  VIRTUAL_ABA_FAQ,
  VIRTUAL_ABA_FINAL_CTA,
  VIRTUAL_ABA_HERO,
  VIRTUAL_ABA_INSURANCE,
  VIRTUAL_ABA_LIMITATIONS,
  VIRTUAL_ABA_MEANING,
  VIRTUAL_ABA_OTHER_SETTINGS,
  VIRTUAL_ABA_SAFETY,
  VIRTUAL_ABA_TECHNOLOGY,
  VIRTUAL_ABA_WHEN_APPROPRIATE,
} from "@/lib/services/virtual-aba-therapy-data";
import { getButtonClasses } from "@/lib/button-styles";
import { EDEN_CARD } from "@/lib/eden-design-system";

const WHEN_ICONS = [Users, ClipboardList, MessageCircle, MessageCircle, HeartHandshake, Users, ClipboardList, Users] as const;
const TECH_ICONS = [Video, ClipboardList, ShieldCheck, ShieldCheck, Monitor, ClipboardList, Smartphone, Laptop] as const;

const cardClass = `${EDEN_CARD} eden-clinical-card flex h-full flex-col border-slate-200/80 bg-white/90 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-900/8`;

export default function VirtualAbaTherapyServicePage() {
  const hero = useLocalizedContent("VIRTUAL_ABA_HERO", VIRTUAL_ABA_HERO);
  const meaning = useLocalizedContent("VIRTUAL_ABA_MEANING", VIRTUAL_ABA_MEANING);
  const whenAppropriate = useLocalizedContent("VIRTUAL_ABA_WHEN_APPROPRIATE", VIRTUAL_ABA_WHEN_APPROPRIATE);
  const technology = useLocalizedContent("VIRTUAL_ABA_TECHNOLOGY", VIRTUAL_ABA_TECHNOLOGY);
  const expectations = useLocalizedContent("VIRTUAL_ABA_EXPECTATIONS", VIRTUAL_ABA_EXPECTATIONS);
  const safety = useLocalizedContent("VIRTUAL_ABA_SAFETY", VIRTUAL_ABA_SAFETY);
  const limitations = useLocalizedContent("VIRTUAL_ABA_LIMITATIONS", VIRTUAL_ABA_LIMITATIONS);
  const insurance = useLocalizedContent("VIRTUAL_ABA_INSURANCE", VIRTUAL_ABA_INSURANCE);
  const faq = useLocalizedContent("VIRTUAL_ABA_FAQ", VIRTUAL_ABA_FAQ);
  const finalCta = useLocalizedContent("VIRTUAL_ABA_FINAL_CTA", VIRTUAL_ABA_FINAL_CTA);
  const otherSettings = useLocalizedContent("VIRTUAL_ABA_OTHER_SETTINGS", VIRTUAL_ABA_OTHER_SETTINGS);
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
              <Link href="/about/contact-us" className={getButtonClasses("secondaryOnDark")}>
                {hero.secondaryCta}
              </Link>
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
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{meaning.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{meaning.intro}</p>
          </motion.div>
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

      {/* When appropriate */}
      <section className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{whenAppropriate.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{whenAppropriate.intro}</p>
          </motion.div>
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

      {/* Technology */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <motion.div {...reveal()}>
              <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{technology.title}</h2>
              <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{technology.intro}</p>
            </motion.div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {technology.items.map((item, index) => {
                const Icon = TECH_ICONS[index] ?? Video;
                return (
                  <motion.article key={item.title} {...reveal(index * 0.03)} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <Icon className="text-[#0E6B4F]" size={20} aria-hidden />
                    <h3 className="mt-3 text-sm font-black text-[#0F172A]">{item.title}</h3>
                    <p className="mt-1 text-xs font-semibold leading-6 text-slate-600 sm:text-sm sm:leading-7">{item.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
          <motion.div {...reveal(0.08)} className="space-y-6">
            <FamilyCoachingIllustration ariaLabel="Parent and child during virtual family coaching" className="drop-shadow-lg" />
            <VirtualProgressDashboardIllustration ariaLabel="Progress tracking dashboard illustration" className="drop-shadow-lg" />
          </motion.div>
        </div>
      </section>

      {/* What families can expect — timeline */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div {...reveal()} className="text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{expectations.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{expectations.intro}</p>
          </motion.div>
          <ol className="relative mt-12 space-y-0 border-l-2 border-sky-200 pl-8">
            {expectations.steps.map((step, i) => (
              <motion.li key={step.title} {...reveal(i * 0.06)} className="relative pb-10 last:pb-0">
                <span
                  className="absolute -left-[2.55rem] flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#1e5a8a] to-[#0E6B4F] text-sm font-black text-white shadow-lg"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <h3 className="text-lg font-black text-[#1e5a8a]">{step.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Safety and readiness */}
      <section className="eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div {...reveal()} className="text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{safety.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{safety.intro}</p>
          </motion.div>
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

      {/* Other settings links */}
      <section className="eden-section eden-section--mint px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-black text-[#0F172A]">{otherSettings.title}</h2>
          <p className="mt-3 text-base font-semibold text-slate-600">{otherSettings.intro}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {otherSettings.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-emerald-200 bg-white px-5 py-2.5 text-sm font-bold text-emerald-800 transition hover:border-emerald-400 hover:shadow-md"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
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
    </AboutPremiumLayout>
  );
}
