"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Award,
  Baby,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileCheck,
  GraduationCap,
  MapPin,
  MessageCircle,
  Puzzle,
  Sparkles,
  Users,
} from "lucide-react";
import { SITE_IMAGES } from "@/lib/site-images";
import Ados2ScheduleForm from "@/components/Ados2ScheduleForm";
import EdenButton from "@/components/EdenButton";

const fadeUp = {
  initial: false,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

function Ados2FaqAccordion({ title, items }) {
  const [open, setOpen] = useState(0);

  return (
    <section id="ados2-faq" className="scroll-mt-28 eden-section eden-section--warm px-4 py-20 lg:px-8">
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
                transition={{ ...fadeUp.transition, delay: index * 0.04 }}
                className="overflow-hidden rounded-2xl border border-[#0E6B4F]/10 bg-white shadow-sm"
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

function Ados2Schema({ p }) {
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

export default function Ados2AssessmentPage({ t, onStart, onMchat, onCast, onLocations, onIde, onEvaluationHub }) {
  const p = t.pages.ados2Assessment;
  const img = SITE_IMAGES.ados2Assessment;

  const scrollToSchedule = () => {
    document.getElementById("ados2-schedule")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const featureIcons = [Award, Sparkles, BookOpen];
  const resultsIcons = [CheckCircle2, FileCheck, Brain, MessageCircle];
  const measureIcons = [Users, Puzzle, MessageCircle, Sparkles];

  const optionHandlers = {
    mchat: onMchat,
    cast: onCast,
    ados: scrollToSchedule,
    ide: onIde || scrollToSchedule,
  };

  return (
    <div className="bg-white text-[#0F172A]">
      <Ados2Schema p={p} />

      {/* HERO */}
      <section className="relative overflow-hidden eden-section eden-section--warm px-4 py-16 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(16,185,129,0.14),transparent_50%),radial-gradient(circle_at_90%_10%,rgba(14,107,79,0.08),transparent_40%)]" />
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
                <EdenButton onClick={scrollToSchedule}>
                  {p.hero.scheduleButton} <ArrowRight size={18} />
                </EdenButton>
                <EdenButton variant="outline" onClick={onLocations}>
                  <MapPin size={18} /> {p.hero.findCenterButton}
                </EdenButton>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl ring-4 ring-white">
                <img
                  src={img.hero}
                  alt={p.hero.imageAlt}
                  loading="eager"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/25 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT IS THE ADOS-2 */}
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black text-[#0F172A] md:text-5xl">{p.whatIs.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-600">{p.whatIs.intro}</p>
          </motion.div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {p.whatIs.cards.map(([title, text], i) => {
              const Icon = featureIcons[i];
              return (
                <motion.article
                  key={title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className="rounded-[2rem] border border-[#0E6B4F]/10 bg-[#FAF7F0] p-8 shadow-lg shadow-[#0E6B4F]/5"
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

      {/* WHAT DOES IT MEASURE */}
      <section className="bg-[#0F172A] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.h2 {...fadeUp} className="text-center text-4xl font-black text-white md:text-5xl">
            {p.measure.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-4 max-w-3xl text-center text-lg font-semibold leading-8 text-white/75">
            {p.measure.intro}
          </motion.p>

          <motion.div
            {...fadeUp}
            className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <div className="grid lg:grid-cols-[1fr_1.1fr]">
              <img
                src={img.measure}
                alt={p.measure.imageAlt}
                loading="lazy"
                className="h-64 w-full object-cover lg:h-full lg:min-h-[360px]"
              />
              <div className="p-8 md:p-10">
                <ul className="grid gap-5">
                  {p.measure.areas.map(([title, text], i) => {
                    const Icon = measureIcons[i];
                    return (
                      <li key={title} className="flex gap-4">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#10B981]/20 text-[#10B981]">
                          <Icon size={22} />
                        </div>
                        <div>
                          <h3 className="font-black text-white">{title}</h3>
                          <p className="mt-1 text-sm font-semibold leading-7 text-white/70">{text}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-8 text-sm font-semibold leading-7 text-white/60">{p.measure.closing}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MODULES */}
      <section className="eden-section eden-section--warm px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.h2 {...fadeUp} className="text-center text-4xl font-black text-[#0F172A] md:text-5xl">
            {p.modules.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-4 max-w-2xl text-center text-lg font-semibold leading-8 text-slate-600">
            {p.modules.intro}
          </motion.p>
          <div className="mt-12 grid gap-3">
            {p.modules.list.map(([name, description], i) => (
              <motion.div
                key={name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className="flex gap-4 rounded-2xl border border-[#0E6B4F]/10 bg-white p-5 shadow-sm"
              >
                <CheckCircle2 size={24} className="mt-0.5 shrink-0 text-[#10B981]" />
                <div>
                  <h3 className="font-black text-[#0F172A]">{name}</h3>
                  <p className="mt-1 text-sm font-semibold leading-7 text-slate-600">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeUp} className="mt-8 rounded-2xl border border-[#0E6B4F]/15 bg-white p-6 text-sm font-semibold leading-7 text-slate-600">
            <span className="font-black text-[#0E6B4F]">{p.modules.edenNoteLabel}</span> {p.modules.edenNote}
          </motion.p>
        </div>
      </section>

      {/* UNDERSTANDING RESULTS */}
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div {...fadeUp}>
              <h2 className="text-4xl font-black text-[#0F172A] md:text-5xl">{p.results.title}</h2>
              <p className="mt-4 font-semibold leading-8 text-slate-600">{p.results.intro}</p>
              <p className="mt-4 font-semibold leading-8 text-slate-600">{p.results.additional}</p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
              <img
                src={img.results}
                alt={p.results.imageAlt}
                loading="lazy"
                className="rounded-[2rem] object-cover shadow-xl ring-4 ring-[#FAF7F0]"
              />
            </motion.div>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {p.results.steps.map(([step, title, text], i) => {
              const Icon = resultsIcons[i];
              return (
                <motion.article
                  key={step}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className="relative rounded-[1.75rem] border border-[#0E6B4F]/10 bg-[#FAF7F0] p-6"
                >
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0E6B4F]">{step}</span>
                  <div className="mt-3 grid h-10 w-10 place-items-center rounded-xl bg-[#0E6B4F] text-white">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-[#0F172A]">{title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHO CAN TAKE */}
      <section className="eden-section eden-section--warm px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="text-center text-4xl font-black text-[#0F172A] md:text-5xl">
            {p.whoCan.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-4 max-w-3xl text-center text-lg font-semibold leading-8 text-slate-600">
            {p.whoCan.intro}
          </motion.p>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {p.whoCan.options.map(([badge, title, subtitle, key], i) => {
              const isProfessional = badge === p.whoCan.professionalBadge;
              const icons = [Baby, GraduationCap, ClipboardCheck, FileCheck];
              const Icon = icons[i];
              return (
                <motion.button
                  key={title}
                  type="button"
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                  onClick={optionHandlers[key]}
                  className={`group rounded-[2rem] p-6 text-left shadow-lg transition hover:-translate-y-1 ${
                    isProfessional
                      ? "bg-[#0E6B4F] text-white shadow-[#0E6B4F]/20"
                      : "border border-[#0E6B4F]/10 bg-white shadow-[#0E6B4F]/5"
                  }`}
                >
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${
                      isProfessional ? "bg-white/20 text-white" : "bg-[#0E6B4F]/10 text-[#0E6B4F]"
                    }`}
                  >
                    {badge}
                  </span>
                  <Icon size={28} className={`mt-5 ${isProfessional ? "text-[#10B981]" : "text-[#0E6B4F]"}`} />
                  <h3 className={`mt-4 text-xl font-black ${isProfessional ? "text-white" : "text-[#0F172A]"}`}>{title}</h3>
                  <p className={`mt-2 text-sm font-semibold leading-7 ${isProfessional ? "text-white/80" : "text-slate-600"}`}>
                    {subtitle}
                  </p>
                  <span
                    className={`mt-4 inline-flex items-center gap-1 text-sm font-black ${
                      isProfessional ? "text-[#10B981]" : "text-[#0E6B4F]"
                    }`}
                  >
                    {p.whoCan.learnMore} <ArrowRight size={14} />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <Ados2FaqAccordion title={p.faq.title} items={p.faq.items} />

      {/* SCHEDULE FORM */}
      <section
        id="ados2-schedule"
        className="scroll-mt-28 bg-gradient-to-br from-[#FAF7F0] via-white to-[#eef9f4] px-4 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2 {...fadeUp} className="text-4xl font-black text-[#0F172A] md:text-5xl">
            {p.schedule.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mt-4 text-lg font-semibold leading-8 text-slate-600">
            {p.schedule.intro}
          </motion.p>
        </div>
        <div className="mt-10">
          <Ados2ScheduleForm t={t} />
        </div>
      </section>

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
              <EdenButton onClick={onEvaluationHub || onMchat}>{p.finalCta.startScreener}</EdenButton>
              <EdenButton variant="outlineOnDark" onClick={onStart}>
                {p.finalCta.contactEden}
              </EdenButton>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
