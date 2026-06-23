"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import FAQAccordion from "@/components/getting-started/FAQAccordion";
import WhatIsAbaTherapyPageSchema from "@/components/aba-therapy/WhatIsAbaTherapyPageSchema";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";
import {
  ABA_BENEFITS,
  ASSESSMENT_AND_PLANNING,
  BCBA_RBT_ROLES,
  HOW_ABA_WORKS,
  PARENT_INVOLVEMENT_SECTION,
  WHAT_IS_ABA_CTA,
  WHAT_IS_ABA_FAQ,
  WHAT_IS_ABA_HERO,
  WHAT_IS_ABA_RELATED_LINKS,
  WHAT_IS_ABA_SECTION,
  WHO_CAN_BENEFIT,
} from "@/lib/aba-therapy/what-is-aba-data";
import { getButtonClasses } from "@/lib/button-styles";
import { SITE_IMAGES } from "@/lib/site-images";

const BENEFIT_ICONS = [MessageCircle, GraduationCap, ShieldCheck, Users, Sparkles, Target] as const;
const SIGN_ICONS = [MessageCircle, ShieldCheck, Sparkles, Users] as const;
const PROCESS_ICONS = [
  ClipboardList,
  Stethoscope,
  Target,
  CheckCircle2,
  HeartHandshake,
  Users,
  BarChart3,
  GraduationCap,
] as const;

const cardClass =
  "rounded-[1.75rem] border border-emerald-100/80 bg-white p-6 shadow-sm shadow-emerald-900/5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/10";

export default function WhatIsAbaTherapyPage() {
  const reduceMotion = useReducedMotion();
  const heroImage = SITE_IMAGES.abaTherapy.hero;
  const { language } = useSiteLanguage();
  const t = getTranslation(language);
  const hero = useLocalizedContent("WHAT_IS_ABA_HERO", WHAT_IS_ABA_HERO);
  const section = useLocalizedContent("WHAT_IS_ABA_SECTION", WHAT_IS_ABA_SECTION);
  const cta = useLocalizedContent("WHAT_IS_ABA_CTA", WHAT_IS_ABA_CTA);

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
    <AboutPremiumLayout schema={<WhatIsAbaTherapyPageSchema />}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0E6B4F] to-[#10B981] px-4 py-16 text-white lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FACC15]/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div {...reveal()}>
            <nav aria-label="Breadcrumb" className="mb-6 text-sm font-bold text-[#10B981]">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-white">
                    {t.navHome}
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/50">
                  ›
                </li>
                <li className="text-white">{hero.title}</li>
              </ol>
            </nav>
            <h1 className="text-3xl font-black leading-tight md:text-5xl">{hero.title}</h1>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-white/90">{hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/intake" className={getButtonClasses("primarySite")}>
                Start Intake <ArrowRight size={18} aria-hidden />
              </Link>
              <a href="#how-aba-therapy-works" className={getButtonClasses("secondaryOnDark")}>
                How ABA Works
              </a>
            </div>
          </motion.div>
          <motion.div {...reveal(0.08)} className="relative">
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
      </section>

      {/* What Is ABA */}
      <section className="bg-[#FAF7F0] px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div {...reveal()}>
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="mt-5 text-lg font-semibold leading-8 text-slate-700">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{ABA_BENEFITS.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{ABA_BENEFITS.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ABA_BENEFITS.cards.map((card, i) => {
              const Icon = BENEFIT_ICONS[i] ?? Sparkles;
              return (
                <motion.article key={card.title} {...reveal(i * 0.05)} className={cardClass}>
                  <div className="inline-flex rounded-2xl bg-emerald-50 p-3 text-[#0E6B4F]">
                    <Icon size={24} aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-[#0E6B4F]">{card.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{card.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who Can Benefit */}
      <section className="bg-gradient-to-br from-[#e8f8f2] via-white to-[#fff8df] px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{WHO_CAN_BENEFIT.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{WHO_CAN_BENEFIT.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {WHO_CAN_BENEFIT.signs.map((sign, i) => {
              const Icon = SIGN_ICONS[i] ?? Users;
              return (
                <motion.article key={sign.title} {...reveal(i * 0.06)} className={cardClass}>
                  <div className="inline-flex rounded-2xl bg-amber-50 p-3 text-amber-700">
                    <Icon size={24} aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-[#0F172A]">{sign.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{sign.text}</p>
                </motion.article>
              );
            })}
          </div>
          <motion.p {...reveal(0.2)} className="mx-auto mt-10 max-w-3xl text-center text-base font-semibold leading-8 text-slate-600">
            {WHO_CAN_BENEFIT.ageNote}
          </motion.p>
        </div>
      </section>

      {/* How ABA Works */}
      <section id="how-aba-therapy-works" className="scroll-mt-28 px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{HOW_ABA_WORKS.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{HOW_ABA_WORKS.intro}</p>
          </motion.div>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_ABA_WORKS.steps.map((step, i) => {
              const Icon = PROCESS_ICONS[i] ?? CheckCircle2;
              return (
                <motion.li key={step.title} {...reveal(i * 0.04)} className={`${cardClass} h-full`}>
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0E6B4F] text-sm font-black text-white">
                      {i + 1}
                    </span>
                    <div className="rounded-xl bg-emerald-50 p-2 text-[#0E6B4F]">
                      <Icon size={20} aria-hidden />
                    </div>
                  </div>
                  <h3 className="mt-4 text-lg font-black text-[#0F172A]">{step.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{step.text}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Assessment & Treatment Planning */}
      <section className="bg-white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{ASSESSMENT_AND_PLANNING.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{ASSESSMENT_AND_PLANNING.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ASSESSMENT_AND_PLANNING.assessmentSteps.map((step, i) => (
              <motion.article key={step.title} {...reveal(i * 0.06)} className={cardClass}>
                <span className="text-sm font-black uppercase tracking-widest text-emerald-700">Step {i + 1}</span>
                <h3 className="mt-2 text-lg font-black text-[#0F172A]">{step.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{step.text}</p>
              </motion.article>
            ))}
          </div>
          <motion.div {...reveal(0.15)} className="mx-auto mt-12 max-w-3xl rounded-[1.75rem] border border-emerald-200 bg-emerald-50/60 p-8">
            <h3 className="text-xl font-black text-[#0E6B4F]">Individualized treatment plans include</h3>
            <p className="mt-3 text-base font-semibold leading-8 text-slate-700">{ASSESSMENT_AND_PLANNING.planIntro}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {ASSESSMENT_AND_PLANNING.planItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={18} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* BCBA & RBT Roles */}
      <section className="bg-[#FAF7F0] px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{BCBA_RBT_ROLES.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{BCBA_RBT_ROLES.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {BCBA_RBT_ROLES.roles.map((role, i) => (
              <motion.article
                key={role.badge}
                {...reveal(i * 0.08)}
                className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-lg shadow-emerald-900/5"
              >
                <span className="inline-flex rounded-full bg-[#0E6B4F] px-4 py-1 text-xs font-black uppercase tracking-widest text-white">
                  {role.badge}
                </span>
                <h3 className="mt-4 text-2xl font-black text-[#0F172A]">{role.title}</h3>
                <p className="mt-3 text-base font-semibold leading-8 text-slate-600">{role.text}</p>
                <ul className="mt-6 space-y-3">
                  {role.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={16} aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Involvement */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div {...reveal()}>
              <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{PARENT_INVOLVEMENT_SECTION.title}</h2>
              <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{PARENT_INVOLVEMENT_SECTION.intro}</p>
              <ul className="mt-6 space-y-3">
                {PARENT_INVOLVEMENT_SECTION.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base font-semibold leading-7 text-slate-700">
                    <CheckCircle2 className="mt-1 shrink-0 text-emerald-600" size={20} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={PARENT_INVOLVEMENT_SECTION.linkHref}
                className={`mt-8 inline-flex ${getButtonClasses("primarySite")}`}
              >
                {PARENT_INVOLVEMENT_SECTION.linkLabel} <ArrowRight size={18} aria-hidden />
              </Link>
            </motion.div>
            <motion.div {...reveal(0.08)} className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-100 to-amber-50 p-10">
              <HeartHandshake className="text-[#0E6B4F]" size={56} aria-hidden />
              <p className="mt-6 text-xl font-black leading-8 text-[#0F172A]">
                Families are partners in every step—from goal-setting to daily practice at home.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gradient-to-br from-[#e8f8f2] via-white to-[#fff8df] px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div {...reveal()} className="text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
              Common questions families ask about ABA therapy and getting started with Eden.
            </p>
          </motion.div>
          <motion.div {...reveal(0.08)} className="mt-10">
            <FAQAccordion items={WHAT_IS_ABA_FAQ} />
          </motion.div>
        </div>
      </section>

      {/* Related links */}
      <section className="px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-black text-[#0F172A]">Continue Exploring Eden</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {WHAT_IS_ABA_RELATED_LINKS.map((link) => (
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
