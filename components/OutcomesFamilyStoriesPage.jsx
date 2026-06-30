"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  ChevronDown,
  ClipboardCheck,
  HeartHandshake,
  MessageCircle,
  School,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  Utensils,
} from "lucide-react";
import EdenButton from "@/components/EdenButton";
import { SITE_IMAGES } from "@/lib/site-images";

const fadeUp = {
  initial: false,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const MEASURE_ICONS = [MessageCircle, Users, Utensils, HeartHandshake, Sparkles, ShieldCheck];
const EVIDENCE_ICONS = [BarChart3, ClipboardCheck, Target, MessageCircle];

function PageSchema({ p, faqs }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: p.meta.title,
    description: p.meta.description,
    about: { "@type": "MedicalTherapy", name: "Applied Behavior Analysis" },
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function ProgressRing({ value, label, delay = 0 }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay }}
      className="flex flex-col items-center rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-lg shadow-slate-900/5"
    >
      <div className="relative h-36 w-36" aria-hidden="true">
        <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
          <circle cx="64" cy="64" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="#1f7a2e"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference - (value / 100) * circumference }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-black text-[#0b4f4f]">
          {value}%
        </span>
      </div>
      <p className="mt-4 text-center text-sm font-black leading-snug text-[#0b4f4f]">{label}</p>
    </motion.div>
  );
}

function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `outcomes-faq-${i}`;
        return (
          <article key={item.q} className="overflow-hidden rounded-[1.5rem] border border-[#0E6B4F]/10 bg-white shadow-md">
            <h3>
              <button
                type="button"
                id={`${panelId}-trigger`}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-base font-black text-[#0b4f4f] md:text-lg">{item.q}</span>
                <ChevronDown
                  size={22}
                  className={`shrink-0 text-[#1f7a2e] transition ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={`${panelId}-trigger`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-slate-100 px-6 py-5 text-base font-semibold leading-7 text-slate-600">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}

export default function OutcomesFamilyStoriesPage({
  t,
  onStart,
  onSchedule,
  onLocations,
  onAdmissions,
  onAba,
}) {
  const p = t.pages.outcomesFamilyStories;
  const img = SITE_IMAGES.outcomesFamilyStories;
  const storiesRef = useRef(null);

  const scrollToStories = () => {
    storiesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="eden-page-shell text-[#0F172A]">
      <PageSchema p={p} faqs={p.faq.items} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff8df] via-white to-[#49b8c8]/10 px-4 py-16 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-[#f7c72f]/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#49b8c8]/15 blur-3xl" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div {...fadeUp}>
            <nav aria-label="Breadcrumb" className="text-sm font-bold text-[#128c8c]">
              {p.hero.breadcrumb.join(" › ")}
            </nav>
            <span className="mt-4 inline-flex rounded-full bg-[#1f7a2e]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#1f7a2e]">
              {p.hero.badge}
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#0b4f4f] md:text-5xl lg:text-6xl">
              {p.hero.title}
            </h1>
            <p className="mt-6 text-lg font-semibold leading-8 text-slate-700">{p.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <EdenButton variant="primarySite" onClick={scrollToStories}>
                {p.hero.primaryButton} <ArrowRight size={18} />
              </EdenButton>
              <EdenButton variant="secondarySite" onClick={onAba}>
                {p.hero.secondaryButton}
              </EdenButton>
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="relative mx-auto w-full max-w-lg">
            <div className="absolute -left-6 top-8 h-28 w-28 rounded-full bg-[#f7c72f]/30 blur-2xl" aria-hidden="true" />
            <div className="absolute -right-4 bottom-6 h-32 w-32 rounded-full bg-[#49b8c8]/25 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl ring-4 ring-white/80">
              <img src={img.hero} alt={p.hero.imageAlt} className="aspect-[4/5] w-full object-cover" loading="eager" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAMILY STORIES */}
      <section ref={storiesRef} className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 lg:px-8" id="family-stories">
        <motion.div {...fadeUp} className="text-center">
          <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.stories.title}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-600">{p.stories.intro}</p>
        </motion.div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {p.stories.items.map((story, i) => (
            <motion.article
              key={story.parent}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-lg shadow-slate-900/5"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={img.stories[i]} alt="" className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute left-4 top-4 rounded-full bg-[#1f7a2e] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                  {story.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-black text-[#128c8c]">
                  {story.parent} · {story.childAge}
                </p>
                <p className="mt-4 flex-1 text-sm font-semibold leading-7 text-slate-600">{story.story}</p>
                <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5">
                  {story.achievements.map((achievement) => (
                    <li key={achievement} className="flex items-start gap-2 text-sm font-bold text-[#0b4f4f]">
                      <Check size={16} className="mt-0.5 shrink-0 text-[#1f7a2e]" aria-hidden="true" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs font-semibold leading-6 text-slate-500">
          {p.stories.disclaimer}
        </p>
      </section>

      {/* WHAT WE MEASURE */}
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="text-center text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">
            {p.measure.title}
          </motion.h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.measure.items.map((item, i) => {
              const Icon = MEASURE_ICONS[i];
              return (
                <motion.div
                  key={item.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                  className="rounded-[1.75rem] border border-[#0E6B4F]/10 bg-gradient-to-br from-white to-[#eef9f4]/40 p-6 shadow-md"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0E6B4F]/10 text-[#0E6B4F]">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-black text-[#0b4f4f]">{item.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.description}</p>
                  <p className="mt-4 text-xs font-black uppercase tracking-wider text-[#128c8c]">{item.milestonesLabel}</p>
                  <ul className="mt-2 space-y-1">
                    {item.milestones.map((milestone) => (
                      <li key={milestone} className="text-sm font-bold text-slate-700">
                        · {milestone}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm font-semibold leading-6 text-[#1f7a2e]">{item.whyItMatters}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW WE TRACK */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <motion.h2 {...fadeUp} className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">
          {p.tracking.title}
        </motion.h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
          <motion.div {...fadeUp} className="space-y-5">
            {p.tracking.points.map((point) => (
              <div key={point.title} className="rounded-[1.5rem] border border-slate-100 bg-white p-6 shadow-md">
                <h3 className="text-lg font-black text-[#0b4f4f]">{point.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{point.text}</p>
              </div>
            ))}
          </motion.div>
          <motion.div
            {...fadeUp}
            className="rounded-[2rem] bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] p-8 text-white shadow-2xl md:p-10"
            aria-label={p.tracking.flowTitle}
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-white/80">{p.tracking.flowTitle}</p>
            <ol className="mt-8 space-y-0">
              {p.tracking.flowSteps.map((step, i) => (
                <li key={step} className="relative flex flex-col items-center pb-8 last:pb-0">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 text-lg font-black backdrop-blur-sm">
                    {i + 1}
                  </span>
                  <p className="mt-3 text-center text-base font-black">{step}</p>
                  {i < p.tracking.flowSteps.length - 1 && (
                    <ArrowDown className="mt-3 text-white/70" size={22} aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      {/* OUTCOME DASHBOARD */}
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.dashboard.title}</h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-600">{p.dashboard.intro}</p>
            <p className="mx-auto mt-3 max-w-2xl text-xs font-semibold leading-6 text-slate-500">{p.dashboard.note}</p>
          </motion.div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
            {p.dashboard.metrics.map((metric, i) => (
              <ProgressRing key={metric.label} value={metric.value} label={metric.label} delay={i * 0.08} />
            ))}
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {p.dashboard.bars.map((bar, i) => (
              <motion.div
                key={bar.label}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                className="rounded-[1.5rem] border border-slate-100 bg-[#FAF7F0] p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-[#0b4f4f]">{bar.label}</p>
                  <p className="text-lg font-black text-[#1f7a2e]">{bar.value}%</p>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#1f7a2e] to-[#49b8c8]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.08 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHOOL READINESS */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.school.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">{p.school.intro}</p>
            <ul className="mt-6 space-y-3">
              {p.school.focusAreas.map((area) => (
                <li key={area} className="flex items-start gap-3 text-base font-bold text-[#0b4f4f]">
                  <School size={20} className="mt-0.5 shrink-0 text-[#1f7a2e]" aria-hidden="true" />
                  {area}
                </li>
              ))}
            </ul>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2">
            <motion.div {...fadeUp} className="rounded-[1.75rem] border-2 border-slate-200 bg-white p-6 shadow-md">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">{p.school.beforeLabel}</p>
              <ul className="mt-4 space-y-3">
                {p.school.beforeItems.map((item) => (
                  <li key={item} className="text-sm font-semibold leading-6 text-slate-600">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.08 }}
              className="rounded-[1.75rem] border-2 border-[#1f7a2e]/30 bg-gradient-to-br from-[#eef9f4] to-white p-6 shadow-lg"
            >
              <p className="text-xs font-black uppercase tracking-widest text-[#1f7a2e]">{p.school.afterLabel}</p>
              <ul className="mt-4 space-y-3">
                {p.school.afterItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-bold leading-6 text-[#0b4f4f]">
                    <Check size={16} className="mt-0.5 shrink-0 text-[#1f7a2e]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
        <div className="mt-10 overflow-hidden rounded-[2rem] shadow-xl">
          <img src={img.school} alt={p.school.imageAlt} className="aspect-[21/9] w-full object-cover" loading="lazy" />
        </div>
      </section>

      {/* FAMILY IMPACT */}
      <section className="bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-3xl font-black text-white md:text-4xl lg:text-5xl">{p.family.title}</h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-white/90">{p.family.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {p.family.metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                className="rounded-[1.75rem] bg-white/10 p-6 text-center backdrop-blur-sm"
              >
                <p className="text-4xl font-black text-[#f7c72f]">{metric.value}</p>
                <p className="mt-2 text-sm font-black text-white">{metric.label}</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-white/80">{metric.detail}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {p.family.pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                {...fadeUp}
                className="rounded-[1.5rem] bg-white p-6 shadow-xl"
              >
                <h3 className="text-lg font-black text-[#0b4f4f]">{pillar.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{pillar.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EVIDENCE-INFORMED CARE */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <motion.div {...fadeUp} className="max-w-3xl">
          <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.evidence.title}</h2>
          <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">{p.evidence.intro}</p>
        </motion.div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {p.evidence.cards.map((card, i) => {
            const Icon = EVIDENCE_ICONS[i];
            return (
              <motion.div
                key={card.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-lg"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#1f7a2e]/10 text-[#1f7a2e]">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-black text-[#0b4f4f]">{card.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{card.text}</p>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <motion.p {...fadeUp} className="text-base font-semibold leading-8 text-slate-600">
            {p.evidence.closing}
          </motion.p>
          <motion.div {...fadeUp} className="overflow-hidden rounded-[2rem] shadow-xl">
            <img src={img.evidence} alt={p.evidence.imageAlt} className="aspect-[4/3] w-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.faq.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">{p.faq.intro}</p>
          </motion.div>
          <motion.div {...fadeUp}>
            <FaqAccordion items={p.faq.items} />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#fff8df] via-white to-[#49b8c8]/10 px-4 py-20 lg:px-8">
        <motion.div
          {...fadeUp}
          className="mx-auto max-w-7xl rounded-[2rem] border border-[#0E6B4F]/10 bg-white px-8 py-12 text-center shadow-2xl md:px-12 md:py-16"
        >
          <div className="mx-auto flex max-w-3xl justify-center gap-1" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} className="fill-[#f7c72f] text-[#f7c72f]" />
            ))}
          </div>
          <h2 className="mt-6 text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.cta.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-600">{p.cta.text}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <EdenButton variant="primarySite" onClick={onSchedule}>
              {p.cta.scheduleButton} <ArrowRight size={18} />
            </EdenButton>
            <EdenButton variant="secondarySite" onClick={onAdmissions}>
              {p.cta.admissionsButton}
            </EdenButton>
            <EdenButton variant="gold" onClick={onLocations}>
              {p.cta.findCenterButton}
            </EdenButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
