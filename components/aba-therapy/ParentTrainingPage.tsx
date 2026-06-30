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
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import FAQAccordion from "@/components/getting-started/FAQAccordion";
import ParentTrainingPageSchema from "@/components/aba-therapy/ParentTrainingPageSchema";
import {
  DOWNLOADABLE_RESOURCES,
  FAMILY_TRAINING_SECTION,
  PARENT_GUIDES_SECTION,
  PARENT_TRAINING_CTA,
  PARENT_TRAINING_HERO,
  PARENT_TRAINING_RELATED_LINKS,
  PARENT_TRAINING_FAQ,
  WHAT_IS_PARENT_TRAINING,
  WHY_PARENT_INVOLVEMENT,
} from "@/lib/aba-therapy/parent-training-data";
import { getButtonClasses } from "@/lib/button-styles";
import { EDEN_CARD } from "@/lib/eden-design-system";

const GUIDE_ICONS = [Target, Sparkles, BookOpen, MessageCircle, Calendar, Home] as const;
const FAMILY_ICONS = [Calendar, Home, Users, BookOpen, HeartHandshake, MessageCircle] as const;
const BENEFIT_ICONS = [Sparkles, Users, HeartHandshake, MessageCircle, CheckCircle2] as const;

const cardClass = EDEN_CARD;

export default function ParentTrainingPage() {
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
              {PARENT_TRAINING_HERO.badge}
            </span>
            <h1 className="mt-6 text-3xl font-black leading-tight md:text-5xl">{PARENT_TRAINING_HERO.title}</h1>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-white/90">
              {PARENT_TRAINING_HERO.subtitle}
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
            <div className="aspect-[5/4] w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-white/20 to-white/5 shadow-2xl ring-4 ring-white/20">
              <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                <HeartHandshake className="text-[#FACC15]" size={64} aria-hidden />
                <p className="max-w-sm text-lg font-bold leading-8 text-white/95">
                  Caregiver coaching that fits your family&apos;s daily life
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Is Parent Training */}
      <section className="eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{WHAT_IS_PARENT_TRAINING.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{WHAT_IS_PARENT_TRAINING.intro}</p>
            <p className="mt-4 text-base font-semibold leading-8 text-slate-600">{WHAT_IS_PARENT_TRAINING.body}</p>
          </motion.div>
        </div>
      </section>

      {/* Why Parent Involvement */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{WHY_PARENT_INVOLVEMENT.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{WHY_PARENT_INVOLVEMENT.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_PARENT_INVOLVEMENT.benefits.map((benefit, i) => {
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

      {/* Parent Guides */}
      <section className="bg-gradient-to-br from-[#e8f8f2] via-white to-[#fff8df] px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{PARENT_GUIDES_SECTION.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{PARENT_GUIDES_SECTION.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PARENT_GUIDES_SECTION.cards.map((card, i) => {
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
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{FAMILY_TRAINING_SECTION.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{FAMILY_TRAINING_SECTION.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FAMILY_TRAINING_SECTION.cards.map((card, i) => {
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

      {/* Downloadable Resources */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{DOWNLOADABLE_RESOURCES.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{DOWNLOADABLE_RESOURCES.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {DOWNLOADABLE_RESOURCES.items.map((item, i) => (
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
            <FAQAccordion items={PARENT_TRAINING_FAQ} />
          </motion.div>
        </div>
      </section>

      {/* Related links */}
      <section className="px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-black text-[#0F172A]">Explore More ABA Resources</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PARENT_TRAINING_RELATED_LINKS.map((link) => (
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
          <h2 className="text-3xl font-black md:text-4xl">{PARENT_TRAINING_CTA.title}</h2>
          <p className="mt-4 text-lg font-semibold leading-8 text-white/90">{PARENT_TRAINING_CTA.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/intake" className={getButtonClasses("primarySite")}>
              {PARENT_TRAINING_CTA.primaryLabel} <ArrowRight size={18} aria-hidden />
            </Link>
            <Link href="/about/contact-us" className={getButtonClasses("secondaryOnDark")}>
              {PARENT_TRAINING_CTA.secondaryLabel}
            </Link>
          </div>
        </motion.div>
      </section>
    </AboutPremiumLayout>
  );
}
