"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock3,
  FileCheck,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";
import { SITE_IMAGES } from "@/lib/site-images";
import EdenButton from "@/components/EdenButton";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

function CastFaqAccordion({ title, items }) {
  const [open, setOpen] = useState(0);

  return (
    <section id="cast-faq" className="scroll-mt-28 bg-white px-4 py-20 lg:px-8">
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

function CastSchema({ p }) {
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

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function CastScreenerPage({ t, onStart, onMchat, questionnaire }) {
  const p = t.pages.castScreener;
  const img = SITE_IMAGES.castScreener;

  const scrollToForm = () => {
    document.getElementById("cast-questionnaire")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const howIcons = [Users, Clock3, MessageCircle];
  const journeyIcons = [FileCheck, Brain, ClipboardList];

  return (
    <div className="bg-white text-[#0F172A]">
      <CastSchema p={p} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#FAF7F0] px-4 py-16 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.12),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm font-bold text-[#0E6B4F]">
            <ol className="flex flex-wrap items-center gap-2">
              {p.hero.breadcrumb.map((crumb, i) => (
                <li key={crumb} className="flex items-center gap-2">
                  {i > 0 && <span className="text-slate-400">›</span>}
                  <span className={i === p.hero.breadcrumb.length - 1 ? "text-[#0F172A]" : ""}>{crumb}</span>
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid items-center gap-14 lg:grid-cols-2">
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
                <EdenButton variant="outline" onClick={onMchat}>
                  {p.hero.mchatButton}
                </EdenButton>
              </div>
              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-amber-600" />
                <p className="text-sm font-bold leading-7 text-amber-900">{p.hero.notice}</p>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl ring-4 ring-white">
                <img src={img.hero} alt={p.hero.imageAlt} loading="eager" className="aspect-[4/3] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/30 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW CAST WORKS */}
      <section id="cast-how-it-works" className="scroll-mt-28 bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <motion.h2 {...fadeUp} className="text-4xl font-black text-[#0F172A] md:text-5xl">
              {p.howItWorks.title}
            </motion.h2>
            <EdenButton onClick={scrollToForm}>{p.howItWorks.startButton}</EdenButton>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {p.howItWorks.cards.map(([title, text], i) => {
              const Icon = howIcons[i];
              return (
                <motion.article
                  key={title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className="rounded-[2rem] border border-[#0E6B4F]/10 bg-[#FAF7F0] p-8 shadow-lg"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#0E6B4F] text-white shadow-lg">
                    <Icon size={28} />
                  </div>
                  <h3 className="mt-6 text-xl font-black text-[#0F172A]">{title}</h3>
                  <p className="mt-3 font-semibold leading-8 text-slate-600">{text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SCORING */}
      <section id="cast-scoring" className="scroll-mt-28 bg-[#0F172A] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="text-center text-4xl font-black text-white md:text-5xl">
            {p.scoring.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-4 max-w-3xl text-center text-lg font-semibold leading-8 text-white/75">
            {p.scoring.intro}
          </motion.p>
          <motion.h3 {...fadeUp} className="mt-10 text-center text-2xl font-black text-[#10B981]">
            {p.scoring.methodTitle}
          </motion.h3>
          <motion.p {...fadeUp} className="mx-auto mt-3 max-w-3xl text-center font-semibold leading-8 text-white/70">
            {p.scoring.methodText}
          </motion.p>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {p.scoring.cards.map(([range, label, text, tone], i) => {
              const tones = {
                green: "from-emerald-500/20 to-emerald-900/10 border-emerald-400/30 text-white",
                yellow: "from-amber-500/20 to-amber-900/10 border-amber-400/30 text-white",
                red: "from-rose-500/20 to-rose-900/10 border-rose-400/30 text-white",
              };
              const badge = { green: "bg-emerald-500", yellow: "bg-amber-400", red: "bg-rose-500" };
              return (
                <motion.article
                  key={range}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                  className={`rounded-[2rem] border bg-gradient-to-br p-8 shadow-xl ${tones[tone]}`}
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

          <motion.div {...fadeUp} className="mx-auto mt-12 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="font-bold leading-8 text-white/90">{p.scoring.disclaimer}</p>
          </motion.div>
        </div>
      </section>

      {/* AFTER CAST */}
      <section className="bg-[#FAF7F0] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.h2 {...fadeUp} className="text-center text-4xl font-black text-[#0F172A] md:text-5xl">
            {p.after.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-4 max-w-2xl text-center text-lg font-semibold leading-8 text-slate-600">
            {p.after.intro}
          </motion.p>
          <div className="mt-8 text-center">
            <EdenButton onClick={scrollToForm}>{p.after.startButton}</EdenButton>
          </div>

          <div className="relative mt-16">
            <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-gradient-to-b from-[#10B981] via-[#0E6B4F] to-transparent md:left-1/2 md:block md:-translate-x-1/2" />
            {p.after.steps.map(([step, title, text], i) => {
              const Icon = journeyIcons[i];
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                  className={`relative mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-center ${isEven ? "" : "md:flex-row-reverse"}`}
                >
                  <div className={`md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-[#0E6B4F]">{step}</span>
                    <h3 className="mt-2 text-2xl font-black text-[#0F172A]">{title}</h3>
                    <p className="mt-3 font-semibold leading-8 text-slate-600">{text}</p>
                  </div>
                  <div className="absolute left-0 hidden md:left-1/2 md:block md:-translate-x-1/2">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-[#0E6B4F] ring-4 ring-[#FAF7F0]">
                      <Icon size={22} className="text-white" />
                    </div>
                  </div>
                  <div className="md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section
        id="cast-questionnaire"
        className="scroll-mt-28 bg-gradient-to-br from-[#FAF7F0] via-white to-[#eef9f4] px-4 py-20 lg:px-8"
      >
        {questionnaire}
      </section>

      <CastFaqAccordion title={p.faq.title} items={p.faq.items} />

      {/* FINAL CTA */}
      <section className="px-4 py-20 lg:px-8">
        <motion.div
          {...fadeUp}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-[#0F172A] px-8 py-14 text-center shadow-2xl md:px-16 md:py-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.2),transparent_55%)]" />
          <div className="relative">
            <h2 className="text-4xl font-black text-white md:text-5xl">{p.finalCta.title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold leading-8 text-white/80">{p.finalCta.text}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <EdenButton onClick={scrollToForm}>{p.finalCta.startButton}</EdenButton>
              <EdenButton variant="outlineOnDark" onClick={onStart}>
                {p.finalCta.contactButton}
              </EdenButton>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
