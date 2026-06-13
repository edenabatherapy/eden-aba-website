"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Eye,
  FileText,
  Heart,
  MapPin,
  MessageCircle,
  Puzzle,
  Repeat,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import { SITE_IMAGES } from "@/lib/site-images";
import IdeScheduleForm from "@/components/IdeScheduleForm";
import EdenButton from "@/components/EdenButton";

const fadeUp = {
  initial: false,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

function IdeFaqAccordion({ title, items }) {
  const [open, setOpen] = useState(0);
  return (
    <section id="ide-faq" className="scroll-mt-28 bg-white px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.h2 {...fadeUp} className="text-center text-4xl font-black text-[#0F172A] md:text-5xl">
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
                className="overflow-hidden rounded-2xl border border-[#0E6B4F]/10 bg-[#FAF7F0]/60 shadow-sm"
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
                      transition={{ duration: 0.3 }}
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

function IdeSchema({ p }) {
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
        mainEntity: [...p.timing.cards, ...p.faq.items].map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function IdeEvaluationPage({
  t,
  onStart,
  onMchat,
  onCast,
  onAdos,
  onLocations,
  onInsurance,
  onContact,
}) {
  const p = t.pages.ideEvaluation;
  const img = SITE_IMAGES.ideEvaluation;

  const scrollToForm = () => {
    document.getElementById("ide-get-started")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const stepIcons = [MessageCircle, Eye, ClipboardList, FileText];
  const measureIcons = [Users, Puzzle, MessageCircle, Repeat, Heart];
  const screenerHandlers = { mchat: onMchat, cast: onCast };

  return (
    <div className="bg-white text-[#0F172A]">
      <IdeSchema p={p} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF7F0] via-white to-[#eef9f4] px-4 py-16 lg:px-8 lg:py-24">
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

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div {...fadeUp}>
              <span className="inline-flex rounded-full bg-[#0E6B4F]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.22em] text-[#0E6B4F]">
                {p.hero.badge}
              </span>
              <h1 className="mt-6 text-3xl font-black leading-[1.08] tracking-tight text-[#0F172A] md:text-5xl lg:text-[3.25rem]">
                {p.hero.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg font-semibold leading-9 text-slate-600">{p.hero.subtitle}</p>
              <div className="mt-6 rounded-2xl border border-amber-200/80 bg-amber-50/90 p-5">
                <p className="text-sm font-bold leading-7 text-amber-900">{p.hero.availabilityNote}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <EdenButton onClick={scrollToForm}>
                  {p.hero.scheduleButton} <ArrowRight size={18} />
                </EdenButton>
                <EdenButton variant="outline" onClick={onLocations}>
                  <MapPin size={18} /> {p.hero.findCenterButton}
                </EdenButton>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="relative">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#F7C948]/30 blur-2xl" />
              <div className="overflow-hidden rounded-[2.5rem] shadow-2xl ring-4 ring-white">
                <img src={img.hero} alt={p.hero.imageAlt} loading="eager" className="aspect-[5/4] w-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT IS IDE */}
      <section className="bg-[#0F172A] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-black text-white md:text-5xl">{p.whatIs.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-white/75">{p.whatIs.intro}</p>
            <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-[#10B981]">{p.whatIs.subheading}</p>
          </motion.div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {p.whatIs.steps.map(([title, text], i) => {
              const Icon = stepIcons[i];
              return (
                <motion.article
                  key={title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className="rounded-[1.75rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#0E6B4F] text-lg font-black text-white">
                      {i + 1}
                    </span>
                    <Icon size={24} className="text-[#10B981]" />
                  </div>
                  <h3 className="mt-5 text-xl font-black text-white">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-white/70">{text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHO CAN COMPLETE */}
      <section className="bg-[#FAF7F0] px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <motion.div {...fadeUp}>
            <h2 className="text-4xl font-black text-[#0F172A] md:text-5xl">{p.whoCan.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-600">{p.whoCan.intro}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {p.whoCan.signs.map((sign) => (
                <li
                  key={sign}
                  className="rounded-full border border-[#0E6B4F]/20 bg-[#0E6B4F]/10 px-4 py-2 text-sm font-bold text-[#0E6B4F]"
                >
                  {sign}
                </li>
              ))}
            </ul>
            <p className="mt-8 font-semibold leading-8 text-slate-600">{p.whoCan.referralText}</p>
            <p className="mt-4 rounded-2xl border border-[#0E6B4F]/10 bg-white p-5 text-sm font-semibold leading-7 text-slate-600">
              {p.whoCan.complexNote}
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="grid gap-4">
            {p.whoCan.relatedCards.map(([title, subtitle, key]) => (
              <button
                key={title}
                type="button"
                onClick={screenerHandlers[key]}
                className="group rounded-[1.75rem] border border-[#0E6B4F]/10 bg-white p-6 text-left shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="text-xs font-black uppercase tracking-wide text-[#10B981]">Online Screener</span>
                <h3 className="mt-2 text-xl font-black text-[#0F172A]">{title}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-600">{subtitle}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-[#0E6B4F]">
                  Take screener <ArrowRight size={14} />
                </span>
              </button>
            ))}
            <button
              type="button"
              onClick={onAdos}
              className="group rounded-[1.75rem] border border-[#0E6B4F]/10 bg-[#0E6B4F] p-6 text-left shadow-lg transition hover:-translate-y-1"
            >
              <span className="text-xs font-black uppercase tracking-wide text-[#10B981]">Professional</span>
              <h3 className="mt-2 text-xl font-black text-white">ADOS-2 Assessment</h3>
              <p className="mt-2 text-sm font-semibold text-white/80">Play-based, in-person ASD assessment tool.</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-[#10B981]">
                Learn more <ArrowRight size={14} />
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* WHAT MEASURES */}
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="text-center text-4xl font-black text-[#0F172A] md:text-5xl">
            {p.measure.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-4 max-w-2xl text-center text-lg font-semibold leading-8 text-slate-600">
            {p.measure.intro}
          </motion.p>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {p.measure.areas.map(([title, text], i) => {
              const Icon = measureIcons[i];
              const spanFull = i === 4;
              return (
                <motion.article
                  key={title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                  className={`rounded-[2rem] border border-[#0E6B4F]/10 bg-[#FAF7F0] p-7 shadow-md ${spanFull ? "lg:col-span-3 lg:mx-auto lg:max-w-2xl" : ""}`}
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#0E6B4F] text-white">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-lg font-black text-[#0E6B4F]">
                    {i + 1}. {title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="bg-[#FAF7F0] px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <motion.div {...fadeUp}>
            <img
              src={img.tools}
              alt={p.tools.imageAlt}
              loading="lazy"
              className="rounded-[2rem] object-cover shadow-xl ring-4 ring-white"
            />
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <h2 className="text-4xl font-black text-[#0F172A] md:text-5xl">{p.tools.title}</h2>
            <p className="mt-4 font-semibold leading-8 text-slate-600">{p.tools.intro}</p>
            <p className="mt-6 text-sm font-black uppercase tracking-wide text-[#0E6B4F]">{p.tools.listLabel}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {p.tools.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#10B981]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* WHERE PERFORMED */}
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.h2 {...fadeUp} className="text-center text-4xl font-black text-[#0F172A] md:text-5xl">
            {p.where.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-4 max-w-3xl text-center text-lg font-semibold leading-8 text-slate-600">
            {p.where.intro}
          </motion.p>
          <p className="mt-8 text-center text-sm font-black uppercase tracking-[0.2em] text-[#0E6B4F]">{p.where.howTitle}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <motion.article {...fadeUp} className="rounded-[2rem] border border-[#0E6B4F]/10 bg-[#FAF7F0] p-8">
              <Video size={32} className="text-[#0E6B4F]" />
              <h3 className="mt-4 text-xl font-black text-[#0F172A]">{p.where.virtual.title}</h3>
              <p className="mt-3 font-semibold leading-8 text-slate-600">{p.where.virtual.text}</p>
            </motion.article>
            <motion.article
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.08 }}
              className="rounded-[2rem] border border-[#0E6B4F]/10 bg-[#0E6B4F] p-8 text-white"
            >
              <Building2 size={32} className="text-[#10B981]" />
              <h3 className="mt-4 text-xl font-black">{p.where.inCenter.title}</h3>
              <p className="mt-3 font-semibold leading-8 text-white/85">{p.where.inCenter.text}</p>
            </motion.article>
          </div>
          <motion.div {...fadeUp} className="mt-10 text-center">
            <EdenButton onClick={onContact || scrollToForm}>{p.where.cta}</EdenButton>
          </motion.div>
        </div>
      </section>

      {/* INSURANCE */}
      <section className="px-4 py-16 lg:px-8">
        <motion.div
          {...fadeUp}
          className="mx-auto max-w-4xl rounded-[2rem] border border-[#0E6B4F]/10 bg-gradient-to-r from-[#0E6B4F] to-[#10B981] p-10 text-center text-white shadow-xl md:p-14"
        >
          <ShieldCheck size={40} className="mx-auto text-white/90" />
          <h2 className="mt-4 text-3xl font-black md:text-4xl">{p.insurance.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl font-semibold leading-8 text-white/90">{p.insurance.text}</p>
          <EdenButton className="mt-8" variant="secondaryOnDark" onClick={onInsurance}>
            {p.insurance.button} <ArrowRight size={18} />
          </EdenButton>
        </motion.div>
      </section>

      {/* AFTER IDE */}
      <section className="bg-[#FAF7F0] px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div {...fadeUp}>
            <img
              src={img.after}
              alt="Parent reviewing evaluation feedback with a clinician"
              loading="lazy"
              className="rounded-[2rem] object-cover shadow-xl ring-4 ring-white"
            />
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <h2 className="text-4xl font-black text-[#0F172A] md:text-5xl">{p.after.title}</h2>
            <p className="mt-4 font-semibold leading-8 text-slate-600">{p.after.intro}</p>
            <ul className="mt-6 grid gap-3">
              {p.after.checklist.map((item) => (
                <li key={item} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
                  <CheckCircle2 size={22} className="shrink-0 text-[#10B981]" />
                  <span className="text-sm font-semibold leading-7 text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-semibold leading-7 text-slate-600">{p.after.additional}</p>
          </motion.div>
        </div>
      </section>

      {/* TIMING FAQ CARDS */}
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.h2 {...fadeUp} className="text-center text-4xl font-black text-[#0F172A] md:text-5xl">
            {p.timing.title}
          </motion.h2>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {p.timing.cards.map(([question, answer], i) => (
              <motion.article
                key={question}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                className="rounded-[1.75rem] border border-[#0E6B4F]/10 bg-[#FAF7F0] p-7 shadow-md"
              >
                <Sparkles size={22} className="text-[#0E6B4F]" />
                <h3 className="mt-4 text-lg font-black text-[#0F172A]">{question}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{answer}</p>
                {question.includes("ADOS-2") && onAdos && (
                  <button type="button" onClick={onAdos} className="mt-4 text-sm font-black text-[#0E6B4F] hover:underline">
                    Learn about ADOS-2 →
                  </button>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* GET STARTED FORM */}
      <section id="ide-get-started" className="scroll-mt-28 bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A] px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div {...fadeUp} className="text-white">
            <h2 className="text-4xl font-black md:text-5xl">{p.getStarted.title}</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-white/80">{p.getStarted.intro}</p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <IdeScheduleForm t={t} />
          </motion.div>
        </div>
      </section>

      <IdeFaqAccordion title={p.faq.title} items={p.faq.items} />
    </div>
  );
}
