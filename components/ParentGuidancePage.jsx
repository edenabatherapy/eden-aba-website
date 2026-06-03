"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Calendar,
  Check,
  ChevronDown,
  ClipboardList,
  Ear,
  ExternalLink,
  HandHeart,
  Heart,
  MessageCircle,
  Repeat,
  Shield,
  Sparkles,
  Users,
  Utensils,
} from "lucide-react";
import { SITE_IMAGES } from "@/lib/site-images";
import EdenButton from "@/components/EdenButton";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const cardHover =
  "rounded-[1.75rem] border border-[#0E6B4F]/10 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl";

const INFO_ICONS = [MessageCircle, Users, Repeat, Ear];
const ABA_ICONS = [MessageCircle, Users, Utensils, Shield, Sparkles, HandHeart];

function PageSchema({ p, faqs }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: p.meta.title,
        description: p.meta.description,
        about: { "@type": "MedicalCondition", name: "Autism Spectrum Disorder" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function CheckList({ items }) {
  return (
    <ul className="mt-4 grid gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#0E6B4F]/10 text-[#0E6B4F]" aria-hidden="true">
            <Check size={12} strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function FaqAccordion({ items }) {
  const [openIds, setOpenIds] = useState(new Set());

  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="grid gap-3">
      {items.map((item, i) => {
        const id = `pg-faq-${i}`;
        const open = openIds.has(id);
        return (
          <div key={item.q} className="overflow-hidden rounded-[1.5rem] border border-[#0E6B4F]/10 bg-white shadow-md">
            <h3>
              <button
                type="button"
                id={`${id}-btn`}
                aria-expanded={open}
                aria-controls={`${id}-panel`}
                onClick={() => toggle(id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-black text-[#0F172A] transition hover:bg-[#FAF7F0]"
              >
                {item.q}
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-[#0E6B4F] transition-transform ${open ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`${id}-panel`}
                  role="region"
                  aria-labelledby={`${id}-btn`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="border-t border-[#0E6B4F]/10 px-6 py-5 text-sm font-semibold leading-7 text-slate-700">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function MilestoneTimeline({ ages, image, imageAlt }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
      <div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Developmental milestones by age">
          {ages.map((age, i) => (
            <button
              key={age.label}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-controls={`milestone-panel-${i}`}
              id={`milestone-tab-${i}`}
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2.5 text-sm font-black transition ${
                active === i ? "bg-[#0E6B4F] text-white shadow-lg" : "bg-white text-[#0E6B4F] shadow-sm hover:bg-[#0E6B4F]/10"
              }`}
            >
              {age.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id={`milestone-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`milestone-tab-${active}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className={`mt-6 ${cardHover}`}
          >
            <h3 className="text-2xl font-black text-[#0E6B4F]">{ages[active].label}</h3>
            <CheckList items={ages[active].items} />
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.div {...fadeUp}>
        <img src={image} alt={imageAlt} loading="lazy" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-2xl" />
      </motion.div>
    </div>
  );
}

function DiagnosisJourney({ steps }) {
  return (
    <ol className="relative grid gap-6 md:grid-cols-5">
      {steps.map((step, i) => (
        <motion.li
          key={step.title}
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: i * 0.06 }}
          className="relative"
        >
          <div className={`${cardHover} h-full text-center`}>
            <motion.span
              className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#0E6B4F] text-lg font-black text-white shadow-lg"
              whileHover={{ scale: 1.08 }}
            >
              {i + 1}
            </motion.span>
            <p className="mt-4 text-sm font-black text-[#0E6B4F]">Step {i + 1}</p>
            <h3 className="mt-2 text-base font-black text-[#0F172A]">{step.title}</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{step.text}</p>
          </div>
          {i < steps.length - 1 && (
            <span className="absolute right-0 top-1/2 hidden h-0.5 w-6 translate-x-full -translate-y-1/2 bg-[#0E6B4F]/20 md:block" aria-hidden="true" />
          )}
        </motion.li>
      ))}
    </ol>
  );
}

export default function ParentGuidancePage({
  t,
  onMchat,
  onCast,
  onAdos,
  onIde,
  onSchedule,
  onAssessment,
  onInsurance,
  onAba,
  onStart,
}) {
  const p = t.pages.parentGuidance;
  const img = SITE_IMAGES.parentGuidance;

  return (
    <div className="bg-[#FAF7F0] text-[#0F172A]">
      <PageSchema p={p} faqs={p.faqs.items} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0E6B4F] to-[#10B981] px-4 py-16 text-white lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FACC15]/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div {...fadeUp}>
            <nav aria-label="Breadcrumb" className="mb-6 text-sm font-bold text-[#10B981]">
              <ol className="flex flex-wrap items-center gap-2">
                {p.hero.breadcrumb.map((crumb, i) => (
                  <li key={crumb} className="flex items-center gap-2">
                    {i > 0 && <span className="text-white/50">›</span>}
                    <span className={i === p.hero.breadcrumb.length - 1 ? "text-white" : ""}>{crumb}</span>
                  </li>
                ))}
              </ol>
            </nav>
            <span className="inline-flex rounded-full bg-[#FACC15] px-4 py-1.5 text-xs font-black uppercase tracking-[0.22em] text-[#0F172A]">
              {p.hero.badge}
            </span>
            <h1 className="mt-6 text-3xl font-black leading-tight md:text-5xl">{p.hero.title}</h1>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-white/90">{p.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <EdenButton onClick={onMchat}>
                {p.hero.buttons.screener} <ArrowRight size={18} />
              </EdenButton>
              <EdenButton variant="accent" onClick={onSchedule}>
                <Calendar size={18} /> {p.hero.buttons.schedule}
              </EdenButton>
              <EdenButton variant="secondaryOnDark" onClick={onAssessment}>
                {p.hero.buttons.evaluations}
              </EdenButton>
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
            <img
              src={img.hero}
              alt={p.hero.imageAlt}
              loading="eager"
              className="aspect-[5/4] w-full rounded-[2rem] object-cover shadow-2xl ring-4 ring-white/20"
            />
          </motion.div>
        </div>
      </section>

      {/* WHAT IS AUTISM */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{p.whatIsAutism.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{p.whatIsAutism.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {p.whatIsAutism.cards.map((card, i) => {
              const Icon = INFO_ICONS[i];
              return (
                <motion.div
                  key={card.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.07 }}
                  whileHover={{ y: -6 }}
                  className={cardHover}
                >
                  <motion.div whileHover={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 0.4 }}>
                    <Icon className="text-[#0E6B4F]" size={28} aria-hidden="true" />
                  </motion.div>
                  <h3 className="mt-4 text-lg font-black text-[#0E6B4F]">{card.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{card.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EARLY SIGNS */}
      <section className="bg-white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{p.earlySigns.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{p.earlySigns.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {p.earlySigns.cards.map((card, i) => (
              <motion.article
                key={card.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className={`${cardHover} ${i === 4 ? "md:col-span-2 xl:col-span-1" : ""}`}
              >
                <h3 className="text-xl font-black text-[#0E6B4F]">{card.title}</h3>
                <CheckList items={card.examples} />
              </motion.article>
            ))}
          </div>
          <motion.div {...fadeUp} className="mt-10 text-center">
            <EdenButton onClick={onMchat}>{p.earlySigns.cta} <ArrowRight size={18} /></EdenButton>
          </motion.div>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{p.milestones.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{p.milestones.intro}</p>
          </motion.div>
          <div className="mt-12">
            <MilestoneTimeline ages={p.milestones.ages} image={img.milestones} imageAlt={p.milestones.imageAlt} />
          </div>
        </div>
      </section>

      {/* CAUSES */}
      <section className="bg-gradient-to-br from-[#0F172A] to-[#0E6B4F] px-4 py-16 text-white lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black md:text-4xl">{p.causes.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-white/90">{p.causes.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {p.causes.mythFacts.map((item, i) => (
              <motion.div
                key={item.myth}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-sm"
              >
                <p className="text-xs font-black uppercase tracking-widest text-[#FACC15]">{p.causes.mythLabel}</p>
                <p className="mt-2 text-sm font-bold text-white/80">{item.myth}</p>
                <p className="mt-4 text-xs font-black uppercase tracking-widest text-[#10B981]">{p.causes.factLabel}</p>
                <p className="mt-2 text-sm font-semibold leading-6">{item.fact}</p>
              </motion.div>
            ))}
          </div>
          <motion.ul {...fadeUp} className="mx-auto mt-10 grid max-w-3xl gap-3">
            {p.causes.notes.map((note) => (
              <li key={note} className="flex items-start gap-3 text-sm font-semibold leading-6 text-white/90">
                <Brain className="mt-0.5 shrink-0 text-[#FACC15]" size={18} aria-hidden="true" />
                {note}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* SUPPORT LEVELS */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{p.supportLevels.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{p.supportLevels.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {p.supportLevels.levels.map((level, i) => (
              <motion.div
                key={level.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.07 }}
                className={`${cardHover} border-t-4 ${i === 0 ? "border-t-[#10B981]" : i === 1 ? "border-t-[#0E6B4F]" : "border-t-[#0F172A]"}`}
              >
                <span className="inline-flex rounded-full bg-[#0E6B4F]/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-[#0E6B4F]">
                  {level.badge}
                </span>
                <h3 className="mt-4 text-xl font-black text-[#0F172A]">{level.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{level.text}</p>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeUp} className="mx-auto mt-8 max-w-3xl rounded-2xl bg-[#FACC15]/20 px-6 py-4 text-center text-sm font-bold leading-7 text-[#0F172A]">
            {p.supportLevels.note}
          </motion.p>
        </div>
      </section>

      {/* DIAGNOSIS */}
      <section className="bg-white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{p.diagnosis.title}</h2>
            <p className="mt-5 text-sm font-semibold leading-7 text-slate-600">{p.diagnosis.note}</p>
          </motion.div>
          <div className="mt-12">
            <DiagnosisJourney steps={p.diagnosis.steps} />
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {p.diagnosis.tools.map((tool) => (
              <motion.button
                key={tool.title}
                type="button"
                {...fadeUp}
                onClick={tool.action === "mchat" ? onMchat : tool.action === "cast" ? onCast : tool.action === "ados" ? onAdos : onIde}
                className={`${cardHover} text-left`}
              >
                <ClipboardList className="text-[#0E6B4F]" size={24} aria-hidden="true" />
                <h3 className="mt-3 text-base font-black text-[#0F172A]">{tool.title}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-600">{tool.text}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-black text-[#0E6B4F]">
                  {tool.button} <ArrowRight size={14} />
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* WHICH SCREENER */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="text-center text-3xl font-black text-[#0F172A] md:text-4xl">
            {p.whichScreener.title}
          </motion.h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {p.whichScreener.cards.map((card, i) => (
              <motion.div key={card.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className={cardHover}>
                <h3 className="text-2xl font-black text-[#0E6B4F]">{card.title}</h3>
                <p className="mt-2 text-sm font-black uppercase tracking-widest text-slate-500">{card.audience}</p>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{card.text}</p>
                <div className="mt-6">
                  <EdenButton onClick={i === 0 ? onMchat : onCast}>{card.button}</EdenButton>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeUp} className="mx-auto mt-8 max-w-2xl text-center text-sm font-semibold leading-7 text-slate-600">
            {p.whichScreener.note}
          </motion.p>
        </div>
      </section>

      {/* EVALUATION OPTIONS */}
      <section className="bg-white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="text-center text-3xl font-black text-[#0F172A] md:text-4xl">
            {p.evaluationOptions.title}
          </motion.h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {p.evaluationOptions.cards.map((card, i) => (
              <motion.div key={card.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className={cardHover}>
                <h3 className="text-2xl font-black text-[#0E6B4F]">{card.title}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-700">{card.text}</p>
                <div className="mt-6">
                  <EdenButton onClick={i === 0 ? onAdos : onIde}>{card.button}</EdenButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INSURANCE */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{p.insurance.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{p.insurance.intro}</p>
          </motion.div>
          <motion.ul {...fadeUp} className="mx-auto mt-8 grid max-w-3xl gap-3">
            {p.insurance.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700">
                <Shield className="mt-0.5 shrink-0 text-[#0E6B4F]" size={18} aria-hidden="true" />
                {point}
              </li>
            ))}
          </motion.ul>
          <motion.div {...fadeUp} className="mt-10 text-center">
            <EdenButton onClick={onInsurance}>{p.insurance.cta} <ArrowRight size={18} /></EdenButton>
          </motion.div>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section className="bg-gradient-to-br from-[#0E6B4F] to-[#10B981] px-4 py-16 text-white lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="text-center text-3xl font-black md:text-4xl">
            {p.nextSteps.title}
          </motion.h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {p.nextSteps.cards.map((card, i) => {
              const handlers = [onMchat, onCast, onSchedule, onStart];
              return (
                <motion.div
                  key={card.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                  className="rounded-[1.75rem] border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-black">{card.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-white/90">{card.text}</p>
                  <button
                    type="button"
                    onClick={handlers[i]}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#FACC15] hover:underline"
                  >
                    {card.link} <ArrowRight size={14} />
                  </button>
                </motion.div>
              );
            })}
          </div>
          <motion.div {...fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <EdenButton variant="primary" onClick={onMchat}>{p.nextSteps.buttons.screener}</EdenButton>
            <EdenButton variant="accent" onClick={onSchedule}>
              {p.nextSteps.buttons.schedule}
            </EdenButton>
            <EdenButton variant="secondaryOnDark" onClick={onStart}>
              {p.nextSteps.buttons.aba}
            </EdenButton>
          </motion.div>
        </div>
      </section>

      {/* ABA HELP */}
      <section className="px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0F172A] md:text-4xl">{p.abaHelp.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{p.abaHelp.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.abaHelp.cards.map((card, i) => {
              const Icon = ABA_ICONS[i];
              return (
                <motion.div key={card} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }} whileHover={{ y: -4 }} className={cardHover}>
                  <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.2 }}>
                    <Icon className="text-[#0E6B4F]" size={24} aria-hidden="true" />
                  </motion.div>
                  <p className="mt-3 text-base font-black text-[#0F172A]">{card}</p>
                </motion.div>
              );
            })}
          </div>
          <motion.div {...fadeUp} className="mt-10 text-center">
            <EdenButton onClick={onAba}>{p.abaHelp.cta} <ArrowRight size={18} /></EdenButton>
          </motion.div>
        </div>
      </section>

      {/* FAQS */}
      <section className="bg-white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <motion.h2 {...fadeUp} className="text-center text-3xl font-black text-[#0F172A] md:text-4xl">
            {p.faqs.title}
          </motion.h2>
          <div className="mt-10">
            <FaqAccordion items={p.faqs.items.map((item) => ({ q: item.q, a: item.a }))} />
          </div>
        </div>
      </section>

      {/* HELPFUL RESOURCES */}
      <section className="px-4 py-16 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div {...fadeUp} className={`${cardHover} bg-[#FAF7F0]`}>
            <h2 className="text-2xl font-black text-[#0F172A]">{p.helpfulResources.title}</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{p.helpfulResources.intro}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.helpfulResources.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-[#0E6B4F] transition hover:bg-[#0E6B4F]/10"
                  >
                    <ExternalLink size={16} aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#0F172A] px-4 py-20 text-white lg:px-8">
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#FACC15]/20 blur-3xl" aria-hidden="true" />
        <div className="mx-auto max-w-3xl text-center">
          <motion.div {...fadeUp}>
            <Heart className="mx-auto text-[#FACC15]" size={32} aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-black md:text-4xl">{p.finalCta.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-white/90">{p.finalCta.text}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <EdenButton variant="accent" onClick={onSchedule}>{p.finalCta.buttons.schedule}</EdenButton>
              <EdenButton variant="outlineOnDark" onClick={onMchat}>
                {p.finalCta.buttons.screener}
              </EdenButton>
              <EdenButton variant="primary" onClick={onStart}>{p.finalCta.buttons.contact}</EdenButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
