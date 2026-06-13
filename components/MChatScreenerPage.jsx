"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  FileCheck,
  HandHeart,
  MessageCircle,
  Phone,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { SITE_IMAGES } from "@/lib/site-images";
import EdenButton from "@/components/EdenButton";

const fadeUp = {
  initial: false,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

function TrustPill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#0E6B4F]/15 bg-white px-4 py-2 text-sm font-bold text-[#0F172A] shadow-sm">
      <CheckCircle2 size={16} className="text-[#10B981]" aria-hidden />
      {children}
    </span>
  );
}

function MChatFaqAccordion({ title, items }) {
  const [open, setOpen] = useState(0);

  return (
    <section id="mchat-faq" className="scroll-mt-28 bg-white px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.h2 {...fadeUp} className="text-center text-4xl font-black tracking-tight text-[#0F172A] md:text-5xl">
          {title}
        </motion.h2>
        <div className="mt-12 grid gap-3">
          {items.map(([question, answer], index) => {
            const isOpen = open === index;
            return (
              <motion.article
                key={question}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.05 }}
                className="overflow-hidden rounded-2xl border border-[#0E6B4F]/10 bg-[#FAF7F0]/50 shadow-sm"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-lg font-black text-[#0F172A]">{question}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={22} className="shrink-0 text-[#0E6B4F]" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-[#0E6B4F]/10 px-6 pb-6 pt-2 text-base font-semibold leading-8 text-slate-600">
                        {answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MChatSchema({ p }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        name: p.hero.title,
        description: p.hero.subtitle,
        medicalAudience: { "@type": "MedicalAudience", audienceType: "Parent" },
        publisher: { "@type": "Organization", name: "Eden ABA Therapy" },
      },
      {
        "@type": "FAQPage",
        mainEntity: p.faq.items.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function MChatScreenerPage({ t, onStart, onCast, questionnaire }) {
  const p = t.pages.mchatScreener;
  const img = SITE_IMAGES.mchatScreener;

  const scrollToForm = () => {
    document.getElementById("mchat-questionnaire")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const whyIcons = [Target, TrendingUp, Sparkles];
  const timelineIcons = [ClipboardList, MessageCircle, FileCheck, HandHeart];
  const journeyIcons = [FileCheck, Brain, Phone, ArrowRight];

  return (
    <div className="bg-white text-[#0F172A]">
      <MChatSchema p={p} />

      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden bg-[#FAF7F0] px-4 py-16 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(14,107,79,0.08),transparent_40%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <motion.div {...fadeUp}>
            <span className="inline-flex rounded-full bg-[#0E6B4F]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.22em] text-[#0E6B4F]">
              {p.hero.badge}
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-[#0F172A] md:text-5xl lg:text-6xl">
              {p.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg font-semibold leading-9 text-slate-600">{p.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <EdenButton onClick={scrollToForm}>
                {p.hero.startButton} <ArrowRight size={18} />
              </EdenButton>
              <EdenButton variant="outline" onClick={onCast}>
                {p.hero.castButton}
              </EdenButton>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {p.hero.trust.map((item) => (
                <TrustPill key={item}>{item}</TrustPill>
              ))}
            </div>
            <p className="mt-6 text-xs font-semibold text-slate-500">{p.copyright}</p>
          </motion.div>

          {/* Image collage */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.12 }}
            className="relative mx-auto h-[420px] w-full max-w-lg lg:h-[520px] lg:max-w-none"
            aria-hidden={false}
          >
            <div className="absolute left-0 top-8 z-10 w-[58%] rotate-[-3deg] overflow-hidden rounded-[1.75rem] shadow-2xl ring-4 ring-white">
              <img src={img.collage[0]} alt={p.hero.collageAlts[0]} loading="eager" className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="absolute right-0 top-0 z-20 w-[52%] rotate-[2deg] overflow-hidden rounded-[1.75rem] shadow-2xl ring-4 ring-white">
              <img src={img.collage[1]} alt={p.hero.collageAlts[1]} loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="absolute bottom-4 left-[8%] z-30 w-[48%] rotate-[1deg] overflow-hidden rounded-[1.5rem] shadow-xl ring-4 ring-white">
              <img src={img.collage[2]} alt={p.hero.collageAlts[2]} loading="lazy" className="aspect-square w-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-[6%] z-40 w-[44%] rotate-[-2deg] overflow-hidden rounded-[1.5rem] shadow-xl ring-4 ring-white">
              <img src={img.collage[3]} alt={p.hero.collageAlts[3]} loading="lazy" className="aspect-square w-full object-cover" />
            </div>
            <div className="absolute left-1/2 top-1/2 z-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#10B981]/20 blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — WHY EARLY SCREENING */}
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="text-center text-4xl font-black text-[#0F172A] md:text-5xl">
            {p.whyEarly.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-4 max-w-3xl text-center text-lg font-semibold leading-8 text-slate-600">
            {p.whyEarly.subtitle}
          </motion.p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {p.whyEarly.cards.map(([title, text], i) => {
              const Icon = whyIcons[i];
              return (
                <motion.article
                  key={title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className="group rounded-[2rem] border border-[#0E6B4F]/10 bg-[#FAF7F0] p-8 shadow-lg shadow-[#0E6B4F]/5 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#0E6B4F] text-white shadow-lg shadow-[#0E6B4F]/30">
                    <Icon size={28} />
                  </div>
                  <h3 className="mt-6 text-2xl font-black text-[#0F172A]">{title}</h3>
                  <p className="mt-3 font-semibold leading-8 text-slate-600">{text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS TIMELINE */}
      <section id="mchat-how-it-works" className="scroll-mt-28 bg-[#0F172A] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.h2 {...fadeUp} className="text-center text-4xl font-black text-white md:text-5xl">
            {p.timeline.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-4 max-w-2xl text-center text-lg font-semibold leading-8 text-white/75">
            {p.timeline.subtitle}
          </motion.p>
          <div className="relative mt-16">
            <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-[#10B981] via-[#0E6B4F] to-transparent md:left-1/2 md:block md:-translate-x-1/2" />
            {p.timeline.steps.map(([step, title, text], i) => {
              const Icon = timelineIcons[i];
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                  className={`relative mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-center ${isEven ? "" : "md:flex-row-reverse"}`}
                >
                  <div className={`md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-[#10B981]">{step}</span>
                    <h3 className="mt-2 text-2xl font-black text-white">{title}</h3>
                    <p className="mt-3 font-semibold leading-8 text-white/70">{text}</p>
                  </div>
                  <div className="absolute left-0 hidden md:left-1/2 md:block md:-translate-x-1/2">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-[#0E6B4F] ring-4 ring-[#0F172A]">
                      <Icon size={22} className="text-white" />
                    </div>
                  </div>
                  <div className="md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
          <motion.p {...fadeUp} className="mt-4 text-center text-sm font-semibold leading-7 text-white/60">
            {p.timeline.supporting}
          </motion.p>
        </div>
      </section>

      {/* SECTION 4 — WHAT QUESTIONS ARE ASKED */}
      <section className="bg-[#FAF7F0] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="text-center text-4xl font-black text-[#0F172A] md:text-5xl">
            {p.topics.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-4 max-w-3xl text-center text-lg font-semibold leading-8 text-slate-600">
            {p.topics.subtitle}
          </motion.p>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {p.topics.cards.map(([title, text, imageKey], i) => (
              <motion.article
                key={title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                className={`overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-[#0E6B4F]/8 ${i === 4 ? "lg:col-span-2 lg:mx-auto lg:max-w-2xl" : ""}`}
              >
                <img
                  src={img.topics[imageKey]}
                  alt={p.topics.imageAlts[imageKey]}
                  loading="lazy"
                  className="h-52 w-full object-cover"
                />
                <div className="p-7">
                  <h3 className="text-2xl font-black text-[#0E6B4F]">{title}</h3>
                  <p className="mt-3 font-semibold leading-8 text-slate-600">{text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — SCORING */}
      <section id="mchat-scoring" className="scroll-mt-28 bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="text-center text-4xl font-black text-[#0F172A] md:text-5xl">
            {p.scoring.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-4 max-w-3xl text-center text-lg font-semibold leading-8 text-slate-600">
            {p.scoring.intro}
          </motion.p>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {p.scoring.cards.map(([range, label, text, tone], i) => {
              const tones = {
                green: "from-emerald-50 to-white border-emerald-200 text-emerald-800",
                yellow: "from-amber-50 to-white border-amber-200 text-amber-900",
                red: "from-rose-50 to-white border-rose-200 text-rose-900",
              };
              const badge = { green: "bg-emerald-500", yellow: "bg-amber-400", red: "bg-rose-500" };
              return (
                <motion.article
                  key={range}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                  className={`rounded-[2rem] border bg-gradient-to-br p-8 shadow-lg ${tones[tone]}`}
                >
                  <span className={`inline-block rounded-full px-4 py-1 text-sm font-black text-white ${badge[tone]}`}>
                    {range}
                  </span>
                  <h3 className="mt-5 text-2xl font-black">{label}</h3>
                  <p className="mt-3 font-semibold leading-8 opacity-90">{text}</p>
                </motion.article>
              );
            })}
          </div>

          <motion.div {...fadeUp} className="mt-12 rounded-[2rem] border border-[#0E6B4F]/10 bg-[#FAF7F0] p-8 md:p-10">
            <h3 className="text-xl font-black text-[#0F172A]">{p.scoring.howTitle}</h3>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {p.scoring.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm font-semibold leading-7 text-slate-600">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#10B981]" />
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.p {...fadeUp} className="mx-auto mt-8 max-w-3xl text-center text-sm font-bold leading-7 text-slate-500">
            {p.scoring.disclaimer}
          </motion.p>
        </div>
      </section>

      {/* SECTION 6 — WHAT HAPPENS AFTER */}
      <section id="mchat-after" className="scroll-mt-28 bg-gradient-to-br from-[#0E6B4F] to-[#0a5640] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="text-center text-4xl font-black text-white md:text-5xl">
            {p.afterJourney.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-4 max-w-3xl text-center text-lg font-semibold leading-8 text-white/85">
            {p.afterJourney.subtitle}
          </motion.p>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.afterJourney.steps.map(([step, title, text], i) => {
              const Icon = journeyIcons[i];
              return (
                <motion.div
                  key={step}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className="rounded-[1.75rem] bg-white/10 p-6 backdrop-blur-sm"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/20 text-white">
                    <Icon size={22} />
                  </div>
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-[#10B981]">{step}</p>
                  <h3 className="mt-2 text-lg font-black text-white">{title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-white/75">{text}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {p.afterJourney.scoreCards.map(([badge, range, title, items, tone], i) => {
              const border = { low: "border-emerald-300", medium: "border-amber-300", high: "border-rose-300" };
              return (
                <motion.article
                  key={range}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className={`rounded-[2rem] border-2 bg-white p-7 shadow-2xl ${border[tone]}`}
                >
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0E6B4F]">{badge}</p>
                  <p className="mt-2 text-4xl font-black text-[#0F172A]">{range}</p>
                  <h3 className="mt-2 text-xl font-black text-[#0F172A]">{title}</h3>
                  <ul className="mt-4 grid gap-2">
                    {items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm font-semibold leading-7 text-slate-600">
                        <CheckCircle2 size={16} className="mt-1 shrink-0 text-[#10B981]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7 — FORM */}
      <section
        id="mchat-questionnaire"
        className="scroll-mt-28 bg-gradient-to-br from-[#FAF7F0] via-white to-emerald-50/40 px-4 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2 {...fadeUp} className="text-4xl font-black text-[#0F172A] md:text-5xl">
            {p.formSection.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mt-4 text-lg font-semibold leading-8 text-slate-600">
            {p.formSection.subtitle}
          </motion.p>
        </div>
        <div className="mt-10">{questionnaire}</div>
      </section>

      {/* SECTION 8 — FAQ */}
      <MChatFaqAccordion title={p.faq.title} items={p.faq.items} />

      {/* SECTION 9 — FINAL CTA */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <motion.div
          {...fadeUp}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-[#0F172A] px-8 py-14 text-center shadow-2xl md:px-16 md:py-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_50%)]" />
          <h2 className="text-3xl font-black text-white md:text-5xl">{p.finalCta.headline}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-8 text-white/75">{p.finalCta.text}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <EdenButton onClick={scrollToForm}>{p.finalCta.startButton} <ArrowRight size={18} /></EdenButton>
            <EdenButton variant="secondary" onClick={onStart}>
              {p.finalCta.contactButton}
            </EdenButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
