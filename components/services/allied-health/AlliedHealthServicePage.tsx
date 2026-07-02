"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import FAQAccordion from "@/components/getting-started/FAQAccordion";
import ServiceMeaningAnimation, {
  type ServiceMeaningAnimationType,
} from "@/components/ServiceMeaningAnimation";
import AlliedHealthProgressDashboard from "@/components/services/allied-health/AlliedHealthProgressDashboard";
import AlliedHealthServiceSchema from "@/components/services/allied-health/AlliedHealthServiceSchema";
import AlliedHealthShareBar from "@/components/services/allied-health/AlliedHealthShareBar";
import AlliedHealthStickyToc from "@/components/services/allied-health/AlliedHealthStickyToc";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";
import { ALLIED_HEALTH_HERO_IMAGES } from "@/lib/services/allied-health-images";
import { ALLIED_HEALTH_CONTENT_KEYS, type AlliedHealthSlug } from "@/lib/services/allied-health-slugs";
import { ALLIED_HEALTH_THEMES } from "@/lib/services/allied-health-themes";
import { getButtonClasses } from "@/lib/button-styles";
import { EDEN_CARD } from "@/lib/eden-design-system";

const ANIMATION_BY_SLUG: Record<AlliedHealthSlug, ServiceMeaningAnimationType> = {
  "occupational-therapy": "occupational",
  "speech-language-therapy": "speech",
  "feeding-swallowing-therapy": "feeding",
};

const SECTION_ICONS = [ClipboardList, Target, Users, BookOpen, HeartHandshake, Sparkles] as const;

const cardClass = EDEN_CARD;

type AlliedHealthServicePageProps = {
  slug: AlliedHealthSlug;
};

export default function AlliedHealthServicePage({ slug }: AlliedHealthServicePageProps) {
  const reduceMotion = useReducedMotion();
  const { language } = useSiteLanguage();
  const t = getTranslation(language);
  const bundle = t.alliedHealthServices as Record<string, Record<string, unknown>>;
  const shared = bundle.shared as Record<string, string>;
  const contentKey = ALLIED_HEALTH_CONTENT_KEYS[slug];
  const content = bundle[contentKey] as Record<string, Record<string, unknown>>;
  const theme = ALLIED_HEALTH_THEMES[slug];
  const heroImage = ALLIED_HEALTH_HERO_IMAGES[slug];

  const hero = content.hero as {
    eyebrow: string;
    title: string;
    subtitle: string;
    breadcrumbLabel: string;
    imageAlt: string;
    readingTime: string;
    screeningCta?: { label: string; href: string };
  };
  const overview = content.overview as {
    title: string;
    whatIs: string;
    whyMatters: string;
    benefits: { title: string; text: string }[];
  };
  const whoBenefits = content.whoBenefits as {
    title: string;
    intro: string;
    ageGroups: { age: string; text: string }[];
    signs: string[];
    redFlags: string[];
    milestones: string[];
    whenToSeek: string;
  };
  const conditions = content.conditions as {
    title: string;
    intro: string;
    items: { name: string; text: string }[];
  };
  const howDeliver = content.howDeliver as { title: string; intro: string; steps: { title: string; text: string }[] };
  const timeline = content.timeline as { title: string; intro: string; steps: { title: string; text: string }[] };
  const assessment = content.assessment as { title: string; intro: string; methods: { title: string; text: string }[] };
  const techniques = content.techniques as {
    title: string;
    intro: string;
    categories: { title: string; items: string[] }[];
  };
  const abaIntegration = content.abaIntegration as {
    title: string;
    intro: string;
    points: { title: string; text: string }[];
  };
  const dataCollection = content.dataCollection as {
    title: string;
    intro: string;
    metrics: { label: string; value: number }[];
    chartTitle: string;
    chartBars: { label: string; value: number }[];
    items: { title: string; text: string }[];
  };
  const familyEducation = content.familyEducation as {
    title: string;
    intro: string;
    cards: { title: string; text: string }[];
  };
  const insurance = content.insurance as { title: string; intro: string; bullets: string[]; note: string };
  const faq = content.faq as { title: string; items: { question: string; answer: string }[] };
  const resources = content.resources as { title: string; intro: string; items: { title: string; text: string }[] };
  const cta = content.cta as {
    title: string;
    subtitle: string;
    buttons: { label: string; href: string }[];
  };

  const tocItems = [
    { id: "overview", label: shared.tocOverview },
    { id: "who-benefits", label: shared.tocWhoBenefits },
    { id: "conditions", label: shared.tocConditions },
    { id: "how-deliver", label: shared.tocHowDeliver },
    { id: "timeline", label: shared.tocTimeline },
    { id: "assessment", label: shared.tocAssessment },
    { id: "techniques", label: shared.tocTechniques },
    { id: "aba-integration", label: shared.tocAbaIntegration },
    { id: "data-collection", label: shared.tocData },
    { id: "family-education", label: shared.tocFamily },
    { id: "insurance", label: shared.tocInsurance },
    { id: "faq", label: shared.tocFaq },
    { id: "resources", label: shared.tocResources },
    { id: "cta", label: shared.tocCta },
  ];

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
    <AboutPremiumLayout
      schema={<AlliedHealthServiceSchema slug={slug} faq={faq.items} />}
    >
      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${theme.heroGradient} px-4 py-16 text-white lg:px-8 lg:py-24`}>
        <div className={`pointer-events-none absolute -left-10 top-20 h-48 w-48 rounded-full ${theme.orb} blur-3xl`} aria-hidden />
        <div className={`pointer-events-none absolute -right-10 bottom-10 h-56 w-56 rounded-full ${theme.orb} blur-3xl`} aria-hidden />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div {...heroMotion}>
              <p className={`text-sm font-black uppercase tracking-[0.2em] ${theme.heroAccent}`}>{hero.eyebrow}</p>
              <nav aria-label="Breadcrumb" className={`mt-3 text-sm font-bold ${theme.heroAccent}`}>
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
                  <li className="text-white">{hero.breadcrumbLabel}</li>
                </ol>
              </nav>
              <h1 className="mt-5 text-3xl font-black leading-tight md:text-5xl lg:text-6xl">{hero.title}</h1>
              <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-white/90">{hero.subtitle}</p>
              <p className="mt-4 text-sm font-bold text-white/70">
                {shared.readingTimeLabel}: {hero.readingTime}
              </p>
              <div className="mt-6">
                <AlliedHealthShareBar
                  title={hero.title}
                  shareLabel={shared.sharePage}
                  copyLabel={shared.copyLink}
                  copiedLabel={shared.copiedLink}
                />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/start-aba-therapy" className={primaryCtaClass}>
                  {shared.startAbaTherapy} <ArrowRight size={18} aria-hidden />
                </Link>
                <Link
                  href={hero.screeningCta?.href ?? "/services/evaluations-diagnosis/screening-evaluation"}
                  className={getButtonClasses("secondaryOnDark")}
                >
                  {hero.screeningCta?.label ?? shared.scheduleEvaluation}
                </Link>
                <Link href="/contact" className={getButtonClasses("secondaryOnDark")}>
                  {shared.contactEden}
                </Link>
              </div>
            </motion.div>
            <motion.div {...heroMotion} transition={{ duration: 0.65, delay: 0.1 }} className="relative">
              <div className="absolute -right-4 -top-4 z-10 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                <ServiceMeaningAnimation type={ANIMATION_BY_SLUG[slug]} />
              </div>
              <Image
                src={heroImage}
                alt={hero.imageAlt}
                width={800}
                height={640}
                priority
                className="aspect-[5/4] w-full rounded-[2rem] object-cover shadow-2xl ring-4 ring-white/20"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Body with sticky TOC */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <AlliedHealthStickyToc items={tocItems} title={shared.tocTitle} />
          </aside>

          <div className="min-w-0 space-y-20">
            {/* Overview */}
            <section id="overview" className="scroll-mt-24">
              <motion.h2 {...reveal()} className="text-3xl font-black text-[#0F172A] md:text-4xl">
                {overview.title}
              </motion.h2>
              <motion.p {...reveal(0.04)} className="mt-5 text-lg font-semibold leading-8 text-slate-700">
                {overview.whatIs}
              </motion.p>
              <motion.p {...reveal(0.08)} className="mt-4 text-lg font-semibold leading-8 text-slate-700">
                {overview.whyMatters}
              </motion.p>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {overview.benefits.map((item, i) => {
                  const Icon = SECTION_ICONS[i] ?? Target;
                  return (
                    <motion.article
                      key={item.title}
                      {...reveal(i * 0.04)}
                      className={`${cardClass} ${theme.cardBorder} ${theme.cardHover}`}
                    >
                      <div className={`inline-flex rounded-2xl p-3 ${theme.iconBg} ${theme.iconText}`}>
                        <Icon size={22} aria-hidden />
                      </div>
                      <h3 className="mt-4 text-lg font-black text-[#0F172A]">{item.title}</h3>
                      <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
                    </motion.article>
                  );
                })}
              </div>
            </section>

            {/* Who benefits */}
            <section id="who-benefits" className="scroll-mt-24">
              <motion.h2 {...reveal()} className="text-3xl font-black text-[#0F172A] md:text-4xl">
                {whoBenefits.title}
              </motion.h2>
              <motion.p {...reveal(0.04)} className="mt-4 text-lg font-semibold leading-8 text-slate-700">
                {whoBenefits.intro}
              </motion.p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {whoBenefits.ageGroups.map((group, i) => (
                  <motion.article
                    key={group.age}
                    {...reveal(i * 0.03)}
                    className={`${cardClass} ${theme.cardBorder} bg-gradient-to-br from-white to-slate-50/80`}
                  >
                    <h3 className="text-base font-black text-[#0F172A]">{group.age}</h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{group.text}</p>
                  </motion.article>
                ))}
              </div>
              <div className="mt-10 grid gap-8 lg:grid-cols-2">
                <motion.div {...reveal()} className={`${EDEN_CARD} p-6`}>
                  <h3 className="text-lg font-black text-[#0F172A]">{shared.signsTitle}</h3>
                  <ul className="mt-4 space-y-2">
                    {whoBenefits.signs.map((sign) => (
                      <li key={sign} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                        <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={16} aria-hidden />
                        {sign}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div {...reveal(0.06)} className="rounded-[1.75rem] border border-orange-100 bg-orange-50/50 p-6">
                  <h3 className="text-lg font-black text-[#0F172A]">{shared.redFlagsTitle}</h3>
                  <ul className="mt-4 space-y-2">
                    {whoBenefits.redFlags.map((flag) => (
                      <li key={flag} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                        <ShieldCheck className="mt-0.5 shrink-0 text-orange-600" size={16} aria-hidden />
                        {flag}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
              <motion.div {...reveal(0.08)} className="mt-8 rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-black text-[#0F172A]">{shared.milestonesTitle}</h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {whoBenefits.milestones.map((m) => (
                    <li key={m} className="text-sm font-semibold text-slate-700">
                      • {m}
                    </li>
                  ))}
                </ul>
                <h3 className="mt-6 text-lg font-black text-[#0F172A]">{shared.whenToSeekTitle}</h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{whoBenefits.whenToSeek}</p>
              </motion.div>
            </section>

            {/* Conditions */}
            <section id="conditions" className="scroll-mt-24">
              <motion.h2 {...reveal()} className="text-3xl font-black text-[#0F172A] md:text-4xl">
                {conditions.title}
              </motion.h2>
              <motion.p {...reveal(0.04)} className="mt-4 text-lg font-semibold leading-8 text-slate-700">
                {conditions.intro}
              </motion.p>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {conditions.items.map((item, i) => (
                  <motion.article
                    key={item.name}
                    {...reveal(i * 0.02)}
                    className={`${cardClass} ${theme.cardBorder} ${theme.cardHover}`}
                  >
                    <h3 className="text-base font-black text-[#0F172A]">{item.name}</h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* How deliver */}
            <section id="how-deliver" className="scroll-mt-24">
              <motion.h2 {...reveal()} className="text-3xl font-black text-[#0F172A] md:text-4xl">
                {howDeliver.title}
              </motion.h2>
              <motion.p {...reveal(0.04)} className="mt-4 text-lg font-semibold leading-8 text-slate-700">
                {howDeliver.intro}
              </motion.p>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {howDeliver.steps.map((step, i) => (
                  <motion.article
                    key={step.title}
                    {...reveal(i * 0.03)}
                    className={`${cardClass} border-slate-100 bg-gradient-to-br from-white to-emerald-50/30`}
                  >
                    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-black ${theme.timelineStep}`}>
                      {i + 1}
                    </span>
                    <h3 className="mt-3 text-base font-black text-[#0F172A]">{step.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{step.text}</p>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* Timeline */}
            <section
              id="timeline"
              className={`scroll-mt-24 overflow-hidden rounded-[2rem] ${theme.timelineBg} px-6 py-12 text-white lg:px-10`}
            >
              <motion.h2 {...reveal()} className="text-3xl font-black md:text-4xl">
                {timeline.title}
              </motion.h2>
              <motion.p {...reveal(0.04)} className="mt-4 text-lg font-semibold leading-8 text-white/85">
                {timeline.intro}
              </motion.p>
              <ol className="relative mt-12 space-y-0 pl-8">
                <div
                  className={`pointer-events-none absolute bottom-4 left-[19px] top-4 w-0.5 bg-gradient-to-b ${theme.progressLine}`}
                  aria-hidden
                />
                {timeline.steps.map((step, i) => (
                  <motion.li key={step.title} {...reveal(i * 0.03)} className="relative pb-8">
                    <div
                      className={`absolute -left-[41px] top-0 flex h-10 w-10 items-center justify-center rounded-full text-sm font-black shadow-lg ${theme.timelineStep}`}
                    >
                      {i + 1}
                    </div>
                    <h3 className="text-lg font-black">{step.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-white/80">{step.text}</p>
                  </motion.li>
                ))}
              </ol>
            </section>

            {/* Assessment */}
            <section id="assessment" className="scroll-mt-24">
              <motion.h2 {...reveal()} className="text-3xl font-black text-[#0F172A] md:text-4xl">
                {assessment.title}
              </motion.h2>
              <motion.p {...reveal(0.04)} className="mt-4 text-lg font-semibold leading-8 text-slate-700">
                {assessment.intro}
              </motion.p>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {assessment.methods.map((method, i) => (
                  <motion.article
                    key={method.title}
                    {...reveal(i * 0.04)}
                    className={`${cardClass} ${theme.cardBorder} ${theme.cardHover}`}
                  >
                    <h3 className="text-base font-black text-[#0F172A]">{method.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{method.text}</p>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* Techniques */}
            <section id="techniques" className="scroll-mt-24">
              <motion.h2 {...reveal()} className="text-3xl font-black text-[#0F172A] md:text-4xl">
                {techniques.title}
              </motion.h2>
              <motion.p {...reveal(0.04)} className="mt-4 text-lg font-semibold leading-8 text-slate-700">
                {techniques.intro}
              </motion.p>
              <div className="mt-10 space-y-6">
                {techniques.categories.map((cat, i) => (
                  <motion.article
                    key={cat.title}
                    {...reveal(i * 0.03)}
                    className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-black text-[#0F172A]">{cat.title}</h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* ABA Integration */}
            <section id="aba-integration" className="scroll-mt-24 rounded-[2rem] bg-slate-900 px-6 py-12 text-white lg:px-10">
              <motion.h2 {...reveal()} className="text-3xl font-black md:text-4xl">
                {abaIntegration.title}
              </motion.h2>
              <motion.p {...reveal(0.04)} className="mt-4 text-lg font-semibold leading-8 text-white/85">
                {abaIntegration.intro}
              </motion.p>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {abaIntegration.points.map((point, i) => (
                  <motion.article
                    key={point.title}
                    {...reveal(i * 0.04)}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                  >
                    <h3 className="text-base font-black">{point.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-white/80">{point.text}</p>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* Data collection */}
            <section id="data-collection" className="scroll-mt-24">
              <motion.h2 {...reveal()} className="text-3xl font-black text-[#0F172A] md:text-4xl">
                {dataCollection.title}
              </motion.h2>
              <motion.p {...reveal(0.04)} className="mt-4 text-lg font-semibold leading-8 text-slate-700">
                {dataCollection.intro}
              </motion.p>
              <motion.div {...reveal(0.08)} className="mt-10">
                <AlliedHealthProgressDashboard
                  title={dataCollection.title}
                  metrics={dataCollection.metrics}
                  chartTitle={dataCollection.chartTitle}
                  chartBars={dataCollection.chartBars}
                />
              </motion.div>
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {dataCollection.items.map((item, i) => (
                  <motion.article
                    key={item.title}
                    {...reveal(i * 0.03)}
                    className={`${cardClass} border-slate-100`}
                  >
                    <h3 className="text-sm font-black text-[#0F172A]">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* Family education */}
            <section id="family-education" className="scroll-mt-24 eden-section eden-section--warm rounded-[2rem] px-6 py-12 lg:px-10">
              <motion.h2 {...reveal()} className="text-3xl font-black text-[#0F172A] md:text-4xl">
                {familyEducation.title}
              </motion.h2>
              <motion.p {...reveal(0.04)} className="mt-4 text-lg font-semibold leading-8 text-slate-700">
                {familyEducation.intro}
              </motion.p>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {familyEducation.cards.map((card, i) => (
                  <motion.article
                    key={card.title}
                    {...reveal(i * 0.04)}
                    className={`${cardClass} ${theme.cardBorder} ${theme.cardHover}`}
                  >
                    <h3 className="text-base font-black text-[#0F172A]">{card.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{card.text}</p>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* Insurance */}
            <section id="insurance" className="scroll-mt-24">
              <motion.div {...reveal()} className="text-center">
                <ShieldCheck className="mx-auto text-emerald-600" size={40} aria-hidden />
                <h2 className="mt-4 text-3xl font-black text-[#0F172A] md:text-4xl">{insurance.title}</h2>
                <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-slate-700">
                  {insurance.intro}
                </p>
              </motion.div>
              <motion.ul {...reveal(0.06)} className="mt-10 grid gap-3 sm:grid-cols-2">
                {insurance.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm font-semibold leading-7 text-slate-700 shadow-sm"
                  >
                    <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={18} aria-hidden />
                    {bullet}
                  </li>
                ))}
              </motion.ul>
              <motion.p {...reveal(0.1)} className="mt-6 text-center text-sm font-semibold leading-7 text-slate-600">
                {insurance.note}
              </motion.p>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-24">
              <motion.h2 {...reveal()} className="text-3xl font-black text-[#0F172A] md:text-4xl">
                {faq.title}
              </motion.h2>
              <motion.div {...reveal(0.06)} className="mt-10">
                <FAQAccordion items={faq.items} />
              </motion.div>
            </section>

            {/* Resources */}
            <section id="resources" className="scroll-mt-24">
              <motion.h2 {...reveal()} className="text-3xl font-black text-[#0F172A] md:text-4xl">
                {resources.title}
              </motion.h2>
              <motion.p {...reveal(0.04)} className="mt-4 text-lg font-semibold leading-8 text-slate-700">
                {resources.intro}
              </motion.p>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {resources.items.map((item, i) => (
                  <motion.article
                    key={item.title}
                    {...reveal(i * 0.04)}
                    className={`${cardClass} border-slate-100 bg-gradient-to-br from-white to-blue-50/30`}
                  >
                    <BookOpen className={theme.iconText} size={22} aria-hidden />
                    <h3 className="mt-3 text-base font-black text-[#0F172A]">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section
              id="cta"
              className={`scroll-mt-24 overflow-hidden rounded-[2rem] bg-gradient-to-br ${theme.heroGradient} px-6 py-12 text-white lg:px-10`}
            >
              <motion.div {...reveal()} className="text-center">
                <h2 className="text-3xl font-black md:text-4xl">{cta.title}</h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold leading-8 text-white/90">{cta.subtitle}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {cta.buttons.map((button) => (
                    <Link
                      key={button.href}
                      href={button.href}
                      className={
                        button.href === "/start-aba-therapy"
                          ? primaryCtaClass
                          : getButtonClasses("secondaryOnDark")
                      }
                    >
                      {button.label}
                      {button.href === "/start-aba-therapy" ? (
                        <ArrowRight size={18} aria-hidden className="ml-1 inline" />
                      ) : null}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </section>
          </div>
        </div>
      </div>
    </AboutPremiumLayout>
  );
}
