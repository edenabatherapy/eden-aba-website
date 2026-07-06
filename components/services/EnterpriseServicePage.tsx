"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  LineChart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import FAQAccordion from "@/components/getting-started/FAQAccordion";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";
import {
  ENTERPRISE_SERVICE_CONTENT_KEYS,
  ENTERPRISE_SERVICE_IMAGE_INDEX,
  type EnterpriseServiceSlug,
} from "@/lib/services/enterprise-service-slugs";
import { ENTERPRISE_SERVICE_THEMES } from "@/lib/services/enterprise-service-themes";
import ServiceFeatureImage from "@/components/services/ServiceFeatureImage";
import { SITE_IMAGES } from "@/lib/site-images";
import { getButtonClasses } from "@/lib/button-styles";
import { EDEN_CARD } from "@/lib/eden-design-system";

const cardClass = EDEN_CARD;
const INCLUDE_ICONS = [ClipboardList, Target, Users, Brain, ShieldCheck, Sparkles] as const;
const WHO_ICONS = [Users, MessageCircle, HeartHandshake, BookOpen, Target, Sparkles] as const;
const GOAL_ICONS = [Target, MessageCircle, BookOpen, Users, LineChart, ShieldCheck] as const;
const FAMILY_ICONS = [HeartHandshake, Users, BookOpen, MessageCircle, Target, Sparkles] as const;
const PROGRESS_ICONS = [BarChart3, LineChart, ClipboardList, Target, CheckCircle2, ShieldCheck] as const;

type EnterpriseServicePageProps = {
  slug: EnterpriseServiceSlug;
};

type ServiceContent = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    breadcrumbLabel: string;
    imageAlt: string;
  };
  includes: { title: string; intro: string; items: { title: string; text: string }[] };
  whoHelps: { title: string; intro: string; items: { title: string; summary: string; detail: string }[] };
  howDeliver: { title: string; intro: string; steps: { title: string; text: string }[] };
  clinicalGoals: { title: string; intro: string; goals: { title: string; text: string }[] };
  familyInvolvement: { title: string; intro: string; cards: { title: string; text: string }[] };
  progressTracking: { title: string; intro: string; items: { title: string; text: string }[] };
  insurance: { title: string; intro: string; bullets: string[]; note: string };
  faq: { title: string; items: { question: string; answer: string }[] };
  cta: { title: string; subtitle: string; primaryLabel: string; secondaryLabel: string };
};

type EnterpriseServicesBundle = {
  shared: {
    breadcrumbHome: string;
    breadcrumbServices: string;
    startServices: string;
    gettingStarted: string;
    contactEden: string;
  };
  behaviorAssessment: ServiceContent;
  individualizedAbaPrograms: ServiceContent;
  earlyInterventionAbaTherapy: ServiceContent;
  socialSkillsTraining: ServiceContent;
};

export default function EnterpriseServicePage({ slug }: EnterpriseServicePageProps) {
  const reduceMotion = useReducedMotion();
  const { language } = useSiteLanguage();
  const t = getTranslation(language);
  const bundle = t.enterpriseServices as EnterpriseServicesBundle;
  const contentKey = ENTERPRISE_SERVICE_CONTENT_KEYS[slug] as keyof EnterpriseServicesBundle;
  const content = bundle[contentKey] as ServiceContent;
  const shared = bundle.shared;
  const theme = ENTERPRISE_SERVICE_THEMES[slug];
  const heroImage = SITE_IMAGES.home.services[ENTERPRISE_SERVICE_IMAGE_INDEX[slug]];
  const [expandedWho, setExpandedWho] = useState<string | null>(content.whoHelps.items[0]?.title ?? null);

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-48px" },
          transition: { duration: 0.55, delay },
        };

  const heroMotion = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.65 } };

  const primaryCtaClass = `${getButtonClasses("primarySite")} transition hover:scale-[1.02] ${theme.ctaGlow}`;

  return (
    <AboutPremiumLayout>
      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${theme.heroGradient} px-4 py-16 text-white lg:px-8 lg:py-24`}>
        <div className="pointer-events-none absolute -right-16 top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div {...heroMotion}>
            <p className={`text-sm font-black uppercase tracking-[0.2em] ${theme.heroAccentText}`}>{content.hero.eyebrow}</p>
            <nav aria-label="Breadcrumb" className={`mt-3 text-sm font-bold ${theme.heroAccentText}`}>
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    {shared.breadcrumbHome}
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/40">
                  ›
                </li>
                <li>
                  <span className="text-white/80">{shared.breadcrumbServices}</span>
                </li>
                <li aria-hidden="true" className="text-white/40">
                  ›
                </li>
                <li className="text-white">{content.hero.breadcrumbLabel}</li>
              </ol>
            </nav>
            <h1 className="mt-5 text-3xl font-black leading-tight md:text-5xl lg:text-6xl">{content.hero.title}</h1>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-white/90">{content.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/start-aba-therapy" className={primaryCtaClass}>
                {shared.startServices} <ArrowRight size={18} aria-hidden />
              </Link>
              <Link href="/getting-started" className={getButtonClasses("secondaryOnDark")}>
                {shared.gettingStarted}
              </Link>
              <Link href="/contact" className={getButtonClasses("secondaryOnDark")}>
                {shared.contactEden}
              </Link>
            </div>
          </motion.div>
          <motion.div {...heroMotion} transition={{ duration: 0.65, delay: 0.1 }}>
            <ServiceFeatureImage
              src={heroImage}
              alt={content.hero.imageAlt}
              variant="hero"
              tone="onDark"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* What this service includes */}
      <section className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{content.includes.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{content.includes.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.includes.items.map((item, i) => {
              const Icon = INCLUDE_ICONS[i] ?? Target;
              return (
                <motion.article
                  key={item.title}
                  {...reveal(i * 0.05)}
                  className={`${cardClass} ${theme.cardBorder} ${theme.cardHover}`}
                >
                  <div className={`inline-flex rounded-2xl p-3 ${theme.iconBg} ${theme.iconText}`}>
                    <Icon size={24} aria-hidden />
                  </div>
                  <h3 className="mt-4 text-xl font-black text-[#0F172A]">{item.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who this service helps */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{content.whoHelps.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{content.whoHelps.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {content.whoHelps.items.map((item, i) => {
              const Icon = WHO_ICONS[i] ?? Users;
              const isOpen = expandedWho === item.title;
              return (
                <motion.button
                  key={item.title}
                  type="button"
                  {...reveal(i * 0.04)}
                  onClick={() => setExpandedWho(isOpen ? null : item.title)}
                  className={`${cardClass} ${theme.cardBorder} ${theme.cardHover} text-left`}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <div className={`shrink-0 rounded-xl p-2.5 ${theme.iconBg} ${theme.iconText}`}>
                      <Icon size={20} aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-[#0F172A]">{item.title}</h3>
                      <p className="mt-2 text-sm font-semibold text-slate-600">{item.summary}</p>
                      {isOpen ? (
                        <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.detail}</p>
                      ) : null}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* How Eden delivers care — timeline */}
      <section className={`${theme.timelineBg} px-4 py-16 text-white lg:px-8 lg:py-20`}>
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black md:text-4xl">{content.howDeliver.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-white/85">{content.howDeliver.intro}</p>
          </motion.div>
          <ol className="relative mt-14 space-y-0 pl-8 md:pl-0">
            <div
              className={`pointer-events-none absolute bottom-4 left-[19px] top-4 w-0.5 bg-gradient-to-b ${theme.progressLine} md:left-[39px]`}
              aria-hidden
            />
            {content.howDeliver.steps.map((step, i) => (
              <motion.li
                key={step.title}
                {...reveal(i * 0.04)}
                className="relative pb-10 md:grid md:grid-cols-[80px_1fr] md:gap-6 md:pb-8"
              >
                <div
                  className={`absolute -left-[41px] top-0 flex h-10 w-10 items-center justify-center rounded-full text-sm font-black shadow-lg md:relative md:left-0 ${theme.timelineStep}`}
                >
                  {i + 1}
                </div>
                <div className="md:col-start-2">
                  <h3 className="text-lg font-black">{step.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-white/80">{step.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Clinical goals */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{content.clinicalGoals.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{content.clinicalGoals.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.clinicalGoals.goals.map((goal, i) => {
              const Icon = GOAL_ICONS[i] ?? Target;
              return (
                <motion.article
                  key={goal.title}
                  {...reveal(i * 0.05)}
                  className={`${cardClass} ${theme.cardBorder} ${theme.cardHover}`}
                >
                  <Icon className={theme.iconText} size={26} aria-hidden />
                  <h3 className="mt-4 text-lg font-black text-[#0F172A]">{goal.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{goal.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Family involvement */}
      <section className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{content.familyInvolvement.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{content.familyInvolvement.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.familyInvolvement.cards.map((card, i) => {
              const Icon = FAMILY_ICONS[i] ?? HeartHandshake;
              return (
                <motion.article
                  key={card.title}
                  {...reveal(i * 0.05)}
                  className={`${cardClass} ${theme.cardBorder} ${theme.cardHover}`}
                >
                  <div className={`inline-flex rounded-2xl p-3 ${theme.iconBg} ${theme.iconText}`}>
                    <Icon size={22} aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-[#0F172A]">{card.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{card.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Progress tracking */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{content.progressTracking.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{content.progressTracking.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.progressTracking.items.map((item, i) => {
              const Icon = PROGRESS_ICONS[i] ?? BarChart3;
              return (
                <motion.article
                  key={item.title}
                  {...reveal(i * 0.05)}
                  className={`${cardClass} border-slate-100 bg-gradient-to-br from-white to-slate-50/80 ${theme.cardHover}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-xl p-2 ${theme.iconBg} ${theme.iconText}`}>
                      <Icon size={20} aria-hidden />
                    </div>
                    <h3 className="text-base font-black text-[#0F172A]">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Insurance / Medicaid */}
      <section className="bg-slate-900 px-4 py-16 text-white lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div {...reveal()} className="text-center">
            <ShieldCheck className="mx-auto text-emerald-300" size={40} aria-hidden />
            <h2 className="mt-4 text-3xl font-black md:text-4xl">{content.insurance.title}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-white/85">{content.insurance.intro}</p>
          </motion.div>
          <motion.ul {...reveal(0.08)} className="mt-10 grid gap-3 sm:grid-cols-2">
            {content.insurance.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold leading-7 text-white/90"
              >
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={18} aria-hidden />
                {bullet}
              </li>
            ))}
          </motion.ul>
          <motion.p {...reveal(0.12)} className="mt-8 text-center text-sm font-semibold leading-7 text-white/70">
            {content.insurance.note}
          </motion.p>
        </div>
      </section>

      {/* FAQ */}
      <section className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <motion.h2 {...reveal()} className="text-center text-3xl font-black text-[#0F172A] md:text-4xl">
            {content.faq.title}
          </motion.h2>
          <motion.div {...reveal(0.06)} className="mt-10">
            <FAQAccordion items={content.faq.items} />
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`bg-gradient-to-br ${theme.heroGradient} px-4 py-16 text-white lg:px-8 lg:py-20`}>
        <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black md:text-4xl">{content.cta.title}</h2>
          <p className="mt-4 text-lg font-semibold leading-8 text-white/90">{content.cta.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/start-aba-therapy" className={primaryCtaClass}>
              {content.cta.primaryLabel} <ArrowRight size={18} aria-hidden />
            </Link>
            <Link href="/getting-started" className={getButtonClasses("secondaryOnDark")}>
              {content.cta.secondaryLabel}
            </Link>
          </div>
        </motion.div>
      </section>
    </AboutPremiumLayout>
  );
}
