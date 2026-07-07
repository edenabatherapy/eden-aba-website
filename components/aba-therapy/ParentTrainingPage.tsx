"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Download,
  FileText,
  HeartHandshake,
  Home,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import FAQAccordion from "@/components/getting-started/FAQAccordion";
import ParentTrainingPageSchema from "@/components/aba-therapy/ParentTrainingPageSchema";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import ClinicalGlassSection, {
  ClinicalBulletPanel,
  ClinicalCardGrid,
} from "@/components/clinical/ClinicalGlassSection";
import {
  BEHAVIOR_PREVENTION_SECTION,
  CAREGIVER_COACHING_SECTION,
  CLINICAL_PROCESS_TIMELINE,
  DAILY_ROUTINES_SECTION,
  DOWNLOADABLE_RESOURCES,
  FAMILY_TRAINING_SECTION,
  MEDICAL_NECESSITY_PARENT_TRAINING,
  PARENT_GUIDES_SECTION,
  PARENT_TRAINING_CTA,
  PARENT_TRAINING_HERO,
  PARENT_TRAINING_RELATED_LINKS,
  PARENT_TRAINING_FAQ,
  SCHOOL_COLLABORATION_SECTION,
  WHAT_IS_PARENT_TRAINING,
  WHY_PARENT_INVOLVEMENT,
} from "@/lib/aba-therapy/parent-training-data";
import ServiceFeatureImage from "@/components/services/ServiceFeatureImage";
import { SITE_IMAGES } from "@/lib/site-images";
import { getButtonClasses } from "@/lib/button-styles";
import { EDEN_CARD } from "@/lib/eden-design-system";

const GUIDE_ICONS = [Target, Sparkles, BookOpen, MessageCircle, Calendar, Home] as const;
const FAMILY_ICONS = [Calendar, Home, Users, BookOpen, HeartHandshake, MessageCircle] as const;
const BENEFIT_ICONS = [Sparkles, Users, HeartHandshake, MessageCircle, CheckCircle2] as const;
const ROUTINE_ICONS = [Calendar, Home, HeartHandshake, Users, Sparkles, CheckCircle2] as const;
const COACHING_ICONS = [Users, MessageCircle, Target, HeartHandshake, BookOpen, Sparkles] as const;
const SCHOOL_ICONS = [BookOpen, Target, Users, MessageCircle, ShieldCheck, CheckCircle2] as const;

const cardClass = EDEN_CARD;

export default function ParentTrainingPage() {
  const hero = useLocalizedContent("PARENT_TRAINING_HERO", PARENT_TRAINING_HERO);
  const whatIs = useLocalizedContent("WHAT_IS_PARENT_TRAINING", WHAT_IS_PARENT_TRAINING);
  const whyInvolve = useLocalizedContent("WHY_PARENT_INVOLVEMENT", WHY_PARENT_INVOLVEMENT);
  const guides = useLocalizedContent("PARENT_GUIDES_SECTION", PARENT_GUIDES_SECTION);
  const familyTraining = useLocalizedContent("FAMILY_TRAINING_SECTION", FAMILY_TRAINING_SECTION);
  const caregiverCoaching = useLocalizedContent("CAREGIVER_COACHING_SECTION", CAREGIVER_COACHING_SECTION);
  const dailyRoutines = useLocalizedContent("DAILY_ROUTINES_SECTION", DAILY_ROUTINES_SECTION);
  const behaviorPrevention = useLocalizedContent("BEHAVIOR_PREVENTION_SECTION", BEHAVIOR_PREVENTION_SECTION);
  const schoolCollaboration = useLocalizedContent("SCHOOL_COLLABORATION_SECTION", SCHOOL_COLLABORATION_SECTION);
  const clinicalTimeline = useLocalizedContent("CLINICAL_PROCESS_TIMELINE", CLINICAL_PROCESS_TIMELINE);
  const medicalNecessity = useLocalizedContent("MEDICAL_NECESSITY_PARENT_TRAINING", MEDICAL_NECESSITY_PARENT_TRAINING);
  const downloads = useLocalizedContent("DOWNLOADABLE_RESOURCES", DOWNLOADABLE_RESOURCES);
  const faq = useLocalizedContent("PARENT_TRAINING_FAQ", PARENT_TRAINING_FAQ);
  const relatedLinks = useLocalizedContent("PARENT_TRAINING_RELATED_LINKS", PARENT_TRAINING_RELATED_LINKS);
  const cta = useLocalizedContent("PARENT_TRAINING_CTA", PARENT_TRAINING_CTA);
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-48px" },
          transition: { duration: 0.5, delay },
        };

  return (
    <AboutPremiumLayout schema={<ParentTrainingPageSchema />}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0E6B4F] to-[#10B981] px-4 py-16 text-white lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FACC15]/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div {...reveal()}>
            <nav aria-label="Breadcrumb" className="mb-6 text-sm font-bold text-[#10B981]">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/aba-therapy/what-is-aba-therapy" className="hover:text-white">
                    ABA Therapy
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/50">
                  ›
                </li>
                <li className="text-white">Parent Training</li>
              </ol>
            </nav>
            <span className="inline-flex rounded-full bg-[#FACC15] px-4 py-1.5 text-xs font-black uppercase tracking-[0.22em] text-[#0F172A]">
              {hero.badge}
            </span>
            <h1 className="mt-6 text-3xl font-black leading-tight md:text-5xl">{hero.title}</h1>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-white/90">
              {hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/intake" className={getButtonClasses("primarySite")}>
                Start Intake <ArrowRight size={18} aria-hidden />
              </Link>
              <Link href="/about/contact-us" className={getButtonClasses("secondaryOnDark")}>
                Contact Eden
              </Link>
            </div>
          </motion.div>
          <motion.div {...reveal(0.08)} className="relative">
            <ServiceFeatureImage
              src={SITE_IMAGES.home.services[7]}
              alt={hero.imageAlt}
              variant="hero"
              tone="onDark"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* What Is Parent Training */}
      <section className="eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{whatIs.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{whatIs.intro}</p>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">{whatIs.body}</p>
          </motion.div>
        </div>
      </section>

      {/* Why Parent Involvement */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{whyInvolve.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{whyInvolve.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyInvolve.benefits.map((benefit, i) => {
              const Icon = BENEFIT_ICONS[i] ?? CheckCircle2;
              return (
                <motion.article key={benefit.title} {...reveal(i * 0.06)} className={cardClass}>
                  <div className="inline-flex rounded-2xl bg-emerald-50 p-3 text-[#0E6B4F]">
                    <Icon size={24} aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-[#0E6B4F]">{benefit.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{benefit.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Caregiver Coaching */}
      <ClinicalGlassSection title={caregiverCoaching.title} intro={caregiverCoaching.intro} tone="mint">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caregiverCoaching.cards.map((card, i) => {
            const Icon = COACHING_ICONS[i] ?? Users;
            return (
              <motion.article key={card.title} {...reveal(i * 0.05)} className={`${cardClass} eden-clinical-card border-emerald-100/60`}>
                <div className="inline-flex rounded-2xl bg-emerald-50 p-3 text-[#0E6B4F]">
                  <Icon size={24} aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-black text-[#0F172A]">{card.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{card.text}</p>
              </motion.article>
            );
          })}
        </div>
      </ClinicalGlassSection>

      {/* Daily Routines */}
      <ClinicalGlassSection title={dailyRoutines.title} intro={dailyRoutines.intro} tone="warm">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dailyRoutines.cards.map((card, i) => {
            const Icon = ROUTINE_ICONS[i] ?? Calendar;
            return (
              <motion.article key={card.title} {...reveal(i * 0.05)} className={`${cardClass} eden-clinical-card border-emerald-100/60`}>
                <div className="inline-flex rounded-2xl bg-teal-50 p-3 text-teal-700">
                  <Icon size={24} aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-black text-[#0F172A]">{card.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{card.text}</p>
              </motion.article>
            );
          })}
        </div>
      </ClinicalGlassSection>

      {/* Behavior Prevention */}
      <ClinicalGlassSection title={behaviorPrevention.title} intro={behaviorPrevention.intro} tone="white">
        <ClinicalCardGrid items={behaviorPrevention.cards} />
      </ClinicalGlassSection>

      {/* Parent Guides */}
      <section className="bg-gradient-to-br from-[#e8f8f2] via-white to-[#fff8df] px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{guides.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{guides.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.cards.map((card, i) => {
              const Icon = GUIDE_ICONS[i] ?? BookOpen;
              return (
                <motion.article key={card.title} {...reveal(i * 0.05)} className={cardClass}>
                  <div className="inline-flex rounded-2xl bg-amber-50 p-3 text-amber-700">
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

      {/* Family Training & Support */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{familyTraining.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{familyTraining.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {familyTraining.cards.map((card, i) => {
              const Icon = FAMILY_ICONS[i] ?? Users;
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
        </div>
      </section>

      {/* School Collaboration */}
      <ClinicalGlassSection title={schoolCollaboration.title} intro={schoolCollaboration.intro} tone="mint">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schoolCollaboration.cards.map((card, i) => {
            const Icon = SCHOOL_ICONS[i] ?? BookOpen;
            return (
              <motion.article key={card.title} {...reveal(i * 0.05)} className={`${cardClass} eden-clinical-card border-emerald-100/60`}>
                <div className="inline-flex rounded-2xl bg-sky-50 p-3 text-sky-700">
                  <Icon size={24} aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-black text-[#0F172A]">{card.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{card.text}</p>
              </motion.article>
            );
          })}
        </div>
      </ClinicalGlassSection>

      {/* Clinical Process Timeline */}
      <section className="eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.div {...reveal()} className="text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{clinicalTimeline.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{clinicalTimeline.intro}</p>
          </motion.div>
          <ol className="relative mt-12 space-y-0 border-l-2 border-emerald-200 pl-8">
            {clinicalTimeline.steps.map((step, i) => (
              <motion.li key={step.title} {...reveal(i * 0.06)} className="relative pb-10 last:pb-0">
                <span
                  className="absolute -left-[2.55rem] flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0E6B4F] to-[#10B981] text-sm font-black text-white shadow-lg shadow-emerald-900/20"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <h3 className="text-lg font-black text-[#0E6B4F]">{step.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Medical Necessity */}
      <ClinicalGlassSection title={medicalNecessity.title} intro={medicalNecessity.intro} tone="white">
        <ClinicalBulletPanel title="Documentation & payer alignment" bullets={medicalNecessity.bullets} note={medicalNecessity.note} />
      </ClinicalGlassSection>

      {/* Downloadable Resources */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{downloads.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{downloads.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {downloads.items.map((item, i) => (
              <motion.article
                key={item.title}
                {...reveal(i * 0.06)}
                className="flex gap-5 rounded-[1.75rem] border border-dashed border-emerald-200 bg-emerald-50/40 p-6"
              >
                <div className="shrink-0 rounded-2xl bg-white p-3 text-[#0E6B4F] shadow-sm">
                  {i % 2 === 0 ? <FileText size={24} aria-hidden /> : <Download size={24} aria-hidden />}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-black text-[#0F172A]">{item.title}</h3>
                    <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-black uppercase tracking-wide text-amber-800">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div {...reveal()} className="text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
              Common questions families ask about parent training and caregiver coaching at Eden.
            </p>
          </motion.div>
          <motion.div {...reveal(0.08)} className="mt-10">
            <FAQAccordion items={faq} />
          </motion.div>
        </div>
      </section>

      {/* Related links */}
      <section className="px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-black text-[#0F172A]">Explore More ABA Resources</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
              >
                <p className="font-extrabold text-emerald-800 group-hover:text-emerald-900">{link.label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{link.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
                  Learn more <ArrowRight size={14} aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0E6B4F] to-[#10B981] px-4 py-16 text-white lg:px-8 lg:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.2),transparent_50%)]" aria-hidden />
        <motion.div {...reveal()} className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black md:text-4xl">{cta.title}</h2>
          <p className="mt-4 text-lg font-semibold leading-8 text-white/90">{cta.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/intake" className={getButtonClasses("primarySite")}>
              {cta.primaryLabel} <ArrowRight size={18} aria-hidden />
            </Link>
            <Link href="/about/contact-us" className={getButtonClasses("secondaryOnDark")}>
              {cta.secondaryLabel}
            </Link>
          </div>
        </motion.div>
      </section>
    </AboutPremiumLayout>
  );
}
