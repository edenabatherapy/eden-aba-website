"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  BookOpen,
  Brain,
  CheckCircle2,
  ClipboardList,
  Eye,
  FileText,
  GraduationCap,
  HeartHandshake,
  MessageCircle,
  Repeat,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import FAQAccordion from "@/components/getting-started/FAQAccordion";
import ScreeningEvaluationPageSchema from "@/components/evaluations/ScreeningEvaluationPageSchema";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import {
  ADOS2_SECTION,
  AFTER_EVALUATION,
  AUTISM_SCREENING_TOOLS,
  DOCUMENTS_CHECKLIST,
  EARLY_SIGNS,
  EVALUATION_PROCESS,
  MCHAT_SECTION,
  SCREENING_CTA,
  SCREENING_EVALUATION_FAQ,
  SCREENING_HERO,
  SCREENING_RELATED_LINKS,
  SCREENING_VS_EVALUATION,
  WHAT_IS_SCREENING,
} from "@/lib/evaluations/screening-evaluation-data";
import { getButtonClasses } from "@/lib/button-styles";
import { SITE_IMAGES } from "@/lib/site-images";

const SCREENING_ICONS = [MessageCircle, Users, Repeat, Sparkles, Baby, HeartHandshake] as const;
const SIGN_ICONS = [Eye, MessageCircle, Users, Repeat, Sparkles, Sparkles, Sparkles, Sparkles, Users] as const;
const MCHAT_ICONS = [ClipboardList, ShieldCheck, ArrowRight, Stethoscope] as const;
const ADOS_ICONS = [Eye, MessageCircle, Sparkles, Repeat, Brain, HeartHandshake] as const;
const AFTER_ICONS = [FileText, BookOpen, HeartHandshake, Users, GraduationCap, ShieldCheck, Target, ArrowRight] as const;

const TOOL_ICONS = [Baby, GraduationCap] as const;

const cardClass =
  "rounded-[1.75rem] border border-emerald-100/80 bg-white p-6 shadow-sm shadow-emerald-900/5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/10";

function FloatingShape({ className, delay = 0 }: { className: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div className={className} aria-hidden />;
  }
  return (
    <motion.div
      className={className}
      aria-hidden
      animate={{ y: [0, -12, 0], opacity: [0.5, 0.85, 0.5] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

export default function ScreeningEvaluationPage() {
  const ados2Section = useLocalizedContent("ADOS2_SECTION", ADOS2_SECTION);
  const afterEvaluation = useLocalizedContent("AFTER_EVALUATION", AFTER_EVALUATION);
  const autismScreeningTools = useLocalizedContent("AUTISM_SCREENING_TOOLS", AUTISM_SCREENING_TOOLS);
  const documentsChecklist = useLocalizedContent("DOCUMENTS_CHECKLIST", DOCUMENTS_CHECKLIST);
  const earlySigns = useLocalizedContent("EARLY_SIGNS", EARLY_SIGNS);
  const evaluationProcess = useLocalizedContent("EVALUATION_PROCESS", EVALUATION_PROCESS);
  const mchatSection = useLocalizedContent("MCHAT_SECTION", MCHAT_SECTION);
  const screeningCta = useLocalizedContent("SCREENING_CTA", SCREENING_CTA);
  const screeningEvaluationFaq = useLocalizedContent("SCREENING_EVALUATION_FAQ", SCREENING_EVALUATION_FAQ);
  const screeningHero = useLocalizedContent("SCREENING_HERO", SCREENING_HERO);
  const screeningRelatedLinks = useLocalizedContent("SCREENING_RELATED_LINKS", SCREENING_RELATED_LINKS);
  const screeningVsEvaluation = useLocalizedContent("SCREENING_VS_EVALUATION", SCREENING_VS_EVALUATION);
  const whatIsScreening = useLocalizedContent("WHAT_IS_SCREENING", WHAT_IS_SCREENING);
  const reduceMotion = useReducedMotion();
  const heroImage = SITE_IMAGES.autismEvaluation.hero;

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-48px" },
          transition: { duration: 0.5, delay },
        };

  const heroReveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
      };

  return (
    <AboutPremiumLayout schema={<ScreeningEvaluationPageSchema />}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e8f8f2] via-[#f0fdfa] to-[#fff8df] px-4 py-16 lg:px-8 lg:py-24">
        <FloatingShape className="pointer-events-none absolute left-[8%] top-[12%] h-24 w-24 rounded-full bg-emerald-300/30 blur-sm" />
        <FloatingShape className="pointer-events-none absolute right-[10%] top-[20%] h-16 w-16 rounded-full bg-teal-400/25 blur-sm" delay={1.2} />
        <FloatingShape className="pointer-events-none absolute bottom-[15%] left-[20%] h-20 w-20 rounded-full bg-amber-200/40 blur-sm" delay={0.6} />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div {...heroReveal}>
            <span className="inline-flex rounded-full border border-emerald-200 bg-white/80 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-emerald-800 shadow-sm">
              {screeningHero.trustBadge}
            </span>
            <h1 className="mt-6 text-3xl font-black leading-tight text-[#0F172A] md:text-5xl">{screeningHero.title}</h1>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-slate-700">{screeningHero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/intake" className={getButtonClasses("primarySite")}>
                Start Evaluation <ArrowRight size={18} aria-hidden />
              </Link>
              <Link href="/m-chat-r" className={getButtonClasses("secondarySite")}>
                Take Screening Step
              </Link>
              <Link href="/about/contact-us" className={getButtonClasses("secondarySite")}>
                Contact Eden
              </Link>
            </div>
          </motion.div>

          <motion.div {...heroReveal} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-emerald-200/40 to-amber-100/30 blur-2xl" aria-hidden />
            <Image
              src={heroImage}
              alt={screeningHero.imageAlt}
              width={800}
              height={640}
              priority
              className="relative aspect-[5/4] w-full rounded-[2rem] object-cover shadow-2xl ring-4 ring-white/80"
            />
          </motion.div>
        </div>
      </section>

      {/* What Is Screening */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{whatIsScreening.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{whatIsScreening.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whatIsScreening.cards.map((card, i) => {
              const Icon = SCREENING_ICONS[i] ?? Sparkles;
              return (
                <motion.article key={card.title} {...reveal(i * 0.05)} className={cardClass}>
                  <div className="inline-flex rounded-2xl bg-emerald-50 p-3 text-[#0E6B4F]">
                    <Icon size={24} aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-[#0F172A]">{card.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{card.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Early Signs */}
      <section className="eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{earlySigns.title}</h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">{earlySigns.intro}</p>
          </motion.div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {earlySigns.signs.map((sign, i) => {
              const Icon = SIGN_ICONS[i] ?? CheckCircle2;
              return (
                <motion.div
                  key={sign}
                  {...reveal(i * 0.03)}
                  className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-sm"
                >
                  <Icon className="shrink-0 text-emerald-600" size={20} aria-hidden />
                  <span className="text-sm font-bold text-slate-800">{sign}</span>
                </motion.div>
              );
            })}
          </div>
          <motion.p
            {...reveal(0.15)}
            className="mx-auto mt-10 max-w-3xl rounded-2xl border border-amber-200/80 bg-amber-50/70 px-6 py-4 text-center text-sm font-semibold leading-7 text-amber-950"
          >
            {earlySigns.disclaimer}
          </motion.p>
        </div>
      </section>

      {/* M-CHAT-R */}
      <section id="mchat-r-online-screener" className="scroll-mt-28 bg-gradient-to-br from-[#0F172A] via-[#0E6B4F] to-[#10B981] px-4 py-16 text-white lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black md:text-4xl">{mchatSection.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-white/90">{mchatSection.intro}</p>
          </motion.div>
          <ul className="mx-auto mt-8 grid max-w-2xl gap-2">
            {mchatSection.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm font-semibold leading-7 text-white/85">
                <CheckCircle2 className="mt-0.5 shrink-0 text-[#FACC15]" size={18} aria-hidden />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mchatSection.featureCards.map((card, i) => {
              const Icon = MCHAT_ICONS[i] ?? ClipboardList;
              return (
                <motion.article
                  key={card.title}
                  {...reveal(i * 0.06)}
                  className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/15"
                >
                  <Icon className="text-[#FACC15]" size={28} aria-hidden />
                  <h3 className="mt-4 text-lg font-black">{card.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-white/80">{card.text}</p>
                </motion.article>
              );
            })}
          </div>
          <motion.div {...reveal(0.12)} className="mt-10 text-center">
            <Link href={mchatSection.ctaHref} className={getButtonClasses("primarySite")}>
              {mchatSection.ctaLabel} <ArrowRight size={18} aria-hidden />
            </Link>
            <p className="mx-auto mt-6 max-w-2xl text-sm font-semibold leading-7 text-white/75">{mchatSection.disclaimer}</p>
          </motion.div>
        </div>
      </section>

      {/* Autism Screening Tools */}
      <section id="autism-screening-tools" className="scroll-mt-28 bg-gradient-to-br from-[#e8f8f2] via-white to-[#fff8df] px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{autismScreeningTools.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{autismScreeningTools.intro}</p>
          </motion.div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {autismScreeningTools.tools.map((tool, i) => {
              const Icon = TOOL_ICONS[i] ?? ClipboardList;
              return (
                <motion.article
                  key={tool.id}
                  {...reveal(i * 0.08)}
                  whileHover={reduceMotion ? undefined : { y: -8 }}
                  className={`group relative overflow-hidden rounded-[2rem] border border-emerald-100/80 bg-gradient-to-br ${tool.gradient} p-8 shadow-lg shadow-emerald-900/5 transition hover:shadow-xl hover:shadow-emerald-900/10`}
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-200/30 blur-2xl transition group-hover:bg-emerald-300/40" aria-hidden />
                  <div className="relative">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className={`inline-flex rounded-2xl bg-white p-3 shadow-sm ${tool.accent}`}>
                        <Icon size={28} aria-hidden />
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${tool.badgeClass}`}>
                        {tool.badge}
                      </span>
                    </div>
                    <h3 className="mt-6 text-2xl font-black text-[#0F172A]">{tool.title}</h3>
                    <ul className="mt-5 space-y-3">
                      {tool.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm font-semibold leading-7 text-slate-700">
                          <CheckCircle2 className={`mt-0.5 shrink-0 ${tool.accent}`} size={18} aria-hidden />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href={tool.href} className={`mt-8 inline-flex ${getButtonClasses("primarySite")}`}>
                      {tool.buttonLabel} <ArrowRight size={18} aria-hidden />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.p
            {...reveal(0.12)}
            className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200/80 bg-white/80 px-6 py-4 text-center text-sm font-semibold leading-7 text-slate-600"
          >
            {autismScreeningTools.disclaimer}
          </motion.p>
        </div>
      </section>

      {/* Evaluation Process Timeline */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{evaluationProcess.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{evaluationProcess.intro}</p>
          </motion.div>
          <ol className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {evaluationProcess.steps.map((step, i) => (
              <motion.li
                key={step.title}
                {...reveal(i * 0.05)}
                whileHover={reduceMotion ? undefined : { y: -6, scale: 1.02 }}
                className={`${cardClass} relative h-full list-none`}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0E6B4F] text-sm font-black text-white shadow-md">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-black text-[#0F172A]">{step.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ADOS-2 */}
      <section id="ados-2-assessment" className="scroll-mt-28 eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{ados2Section.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{ados2Section.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ados2Section.cards.map((card, i) => {
              const Icon = ADOS_ICONS[i] ?? Eye;
              return (
                <motion.article key={card.title} {...reveal(i * 0.05)} className={cardClass}>
                  <div className="inline-flex rounded-2xl bg-teal-50 p-3 text-teal-700">
                    <Icon size={24} aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-[#0F172A]">{card.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{card.text}</p>
                </motion.article>
              );
            })}
          </div>
          <motion.div {...reveal(0.1)} className="mt-10 text-center">
            <Link href={ados2Section.ctaHref} className={getButtonClasses("primarySite")}>
              {ados2Section.ctaLabel} <ArrowRight size={18} aria-hidden />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* After Evaluation */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{afterEvaluation.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{afterEvaluation.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {afterEvaluation.cards.map((card, i) => {
              const Icon = AFTER_ICONS[i] ?? CheckCircle2;
              return (
                <motion.article key={card.title} {...reveal(i * 0.04)} className={cardClass}>
                  <Icon className="text-emerald-600" size={22} aria-hidden />
                  <h3 className="mt-3 text-base font-black text-[#0F172A]">{card.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{card.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="bg-gradient-to-br from-[#e8f8f2] via-white to-[#fff8df] px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div {...reveal()} className="text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{documentsChecklist.title}</h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">{documentsChecklist.intro}</p>
          </motion.div>
          <motion.ul {...reveal(0.08)} className="mt-10 grid gap-3 sm:grid-cols-2">
            {documentsChecklist.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={18} aria-hidden />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Screening vs Evaluation */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div {...reveal()} className="text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{screeningVsEvaluation.title}</h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">{screeningVsEvaluation.intro}</p>
          </motion.div>
          <motion.div
            {...reveal(0.08)}
            className="mt-10 overflow-hidden rounded-[1.75rem] border border-emerald-100 bg-white shadow-lg"
          >
            <div className="grid md:grid-cols-2">
              <div className="border-b border-emerald-100 bg-emerald-50/60 p-8 md:border-b-0 md:border-r">
                <h3 className="text-xl font-black text-emerald-900">{screeningVsEvaluation.screening.label}</h3>
                <ul className="mt-5 space-y-3">
                  {screeningVsEvaluation.screening.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-semibold leading-7 text-slate-700">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={16} aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black text-[#0F172A]">{screeningVsEvaluation.evaluation.label}</h3>
                <ul className="mt-5 space-y-3">
                  {screeningVsEvaluation.evaluation.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-semibold leading-7 text-slate-700">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-teal-600" size={16} aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div {...reveal()} className="text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">Frequently Asked Questions</h2>
          </motion.div>
          <motion.div {...reveal(0.08)} className="mt-10">
            <FAQAccordion items={screeningEvaluationFaq} />
          </motion.div>
        </div>
      </section>

      {/* Related links */}
      <section className="px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-black text-[#0F172A]">Related Resources</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {screeningRelatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
              >
                <p className="font-extrabold text-emerald-800 group-hover:text-emerald-900">{link.label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0E6B4F] to-[#10B981] px-4 py-16 text-white lg:px-8 lg:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.2),transparent_50%)]" aria-hidden />
        <motion.div {...reveal()} className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black md:text-4xl">{screeningCta.title}</h2>
          <p className="mt-4 text-lg font-semibold leading-8 text-white/90">{screeningCta.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/intake" className={getButtonClasses("primarySite")}>
              {screeningCta.primaryLabel} <ArrowRight size={18} aria-hidden />
            </Link>
            <Link href="/about/contact-us" className={getButtonClasses("secondaryOnDark")}>
              {screeningCta.secondaryLabel}
            </Link>
            <Link href="/getting-started" className={getButtonClasses("secondaryOnDark")}>
              {screeningCta.tertiaryLabel}
            </Link>
          </div>
        </motion.div>
      </section>
    </AboutPremiumLayout>
  );
}
