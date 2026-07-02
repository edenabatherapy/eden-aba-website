"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Droplets,
  Gamepad2,
  HeartHandshake,
  Home,
  LineChart,
  MapPin,
  MessageCircle,
  Moon,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import EdenButton from "@/components/EdenButton";
import { SITE_IMAGES } from "@/lib/site-images";

const fadeUp = {
  initial: false,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const BENEFIT_ICONS = [Users, Target, Home, Sparkles, Clock3, MessageCircle, HeartHandshake, BookOpen];
const SKILL_ICONS = [MessageCircle, Users, Home, Target, Clock3, ShieldCheck, Sparkles, MapPin];
const ROUTINE_ICONS = [UtensilsCrossed, Gamepad2, Droplets, BookOpen, Moon, MapPin];

function PageSchema({ p, faqs }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: p.meta.title,
    description: p.meta.description,
    about: { "@type": "MedicalTherapy", name: "Home-Based Applied Behavior Analysis" },
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `home-aba-faq-${i}`;
        return (
          <article key={item.q} className="overflow-hidden rounded-[1.5rem] border border-[#0E6B4F]/10 bg-white shadow-md">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-base font-black text-[#0b4f4f] md:text-lg">{item.q}</span>
                <ChevronDown size={22} className={`shrink-0 text-[#1f7a2e] transition ${isOpen ? "rotate-180" : ""}`} />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
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

function RoutineTabs({ routines }) {
  const [active, setActive] = useState(0);
  const routine = routines[active];
  const panelId = "home-aba-routine-panel";

  const focusTab = (index) => {
    document.getElementById(`routine-tab-${index}`)?.focus();
  };

  const handleTabKeyDown = (e, index) => {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % routines.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + routines.length) % routines.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = routines.length - 1;
    else return;

    e.preventDefault();
    setActive(next);
    focusTab(next);
  };

  return (
    <div>
      <div role="tablist" aria-label="Home routine examples" className="flex flex-wrap gap-2">
        {routines.map((r, i) => {
          const Icon = ROUTINE_ICONS[i] ?? Home;
          const selected = active === i;
          return (
            <button
              key={r.title}
              type="button"
              role="tab"
              id={`routine-tab-${i}`}
              aria-selected={selected}
              aria-controls={panelId}
              onClick={() => setActive(i)}
              onKeyDown={(e) => handleTabKeyDown(e, i)}
              tabIndex={selected ? 0 : -1}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-black transition ${
                selected
                  ? "bg-[#0b4f4f] text-white shadow-md"
                  : "border border-[#0E6B4F]/15 bg-white text-[#0b4f4f] hover:border-[#1f7a2e]/40"
              }`}
            >
              <Icon size={16} aria-hidden="true" />
              {r.title}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={routine.title}
          id={panelId}
          role="tabpanel"
          aria-labelledby={`routine-tab-${active}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-6 rounded-[1.75rem] border border-[#0E6B4F]/10 bg-white p-8 shadow-lg"
        >
          <h3 className="text-xl font-black text-[#0b4f4f]">{routine.title}</h3>
          <p className="mt-3 text-base font-semibold leading-7 text-slate-600">{routine.text}</p>
          {routine.goals?.length > 0 && (
            <ul className="mt-6 space-y-2">
              {routine.goals.map((goal) => (
                <li key={goal} className="flex items-start gap-3 text-sm font-bold text-[#0b4f4f]">
                  <Check size={16} className="mt-0.5 shrink-0 text-[#1f7a2e]" aria-hidden="true" />
                  {goal}
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function FirstWeeksTimeline({ weeks }) {
  return (
    <ol className="relative space-y-0 border-l-2 border-[#1f7a2e]/25 pl-8">
      {weeks.map((week, i) => (
        <motion.li
          key={week.title}
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: i * 0.06 }}
          className="relative pb-10 last:pb-0"
        >
          <span
            className="absolute -left-[2.35rem] top-1 grid h-8 w-8 place-items-center rounded-full bg-[#1f7a2e] text-xs font-black text-white ring-4 ring-[#eef9f4]"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <p className="text-xs font-black uppercase tracking-widest text-[#128c8c]">{week.label}</p>
          <h3 className="mt-1 text-lg font-black text-[#0b4f4f]">{week.title}</h3>
          <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{week.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}

function MidCtaBand({ cta, onStart, onVerifyInsurance, onSpeakWithPerson }) {
  if (!cta) return null;
  return (
    <section className="bg-gradient-to-r from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-4 py-14 lg:px-8">
      <motion.div {...fadeUp} className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-black text-white md:text-3xl">{cta.title}</h2>
        <p className="mt-4 text-base font-semibold leading-7 text-white/90 md:text-lg">{cta.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <EdenButton variant="gold" onClick={onStart}>
            {cta.startButton} <ArrowRight size={18} />
          </EdenButton>
          <EdenButton variant="secondarySite" onClick={onVerifyInsurance ?? onStart}>
            {cta.verifyButton}
          </EdenButton>
          <EdenButton variant="secondarySite" onClick={onSpeakWithPerson ?? onStart}>
            {cta.speakButton}
          </EdenButton>
        </div>
      </motion.div>
    </section>
  );
}

function ComplianceBar({ text }) {
  if (!text) return null;
  return (
    <div className="border-t border-slate-200 bg-slate-50 px-4 py-6 lg:px-8">
      <p className="mx-auto max-w-4xl text-center text-xs font-semibold leading-6 text-slate-500 md:text-sm">
        {text}
      </p>
    </div>
  );
}

export default function HomeBasedAbaTherapyPage({
  t,
  onStart,
  onVerifyInsurance,
  onSpeakWithPerson,
  onLocations,
  onSchedule,
  onCenterBased,
  onSchoolBased,
  onCommunityBased,
  onVirtual,
}) {
  const p = t.pages.homeBasedAbaTherapy;
  const img = SITE_IMAGES.homeBasedAba;
  const [searchQuery, setSearchQuery] = useState("");

  const settingLinks = [
    { label: p.internalLinks.centerBased, onClick: onCenterBased },
    { label: p.internalLinks.schoolBased, onClick: onSchoolBased },
    { label: p.internalLinks.communityBased, onClick: onCommunityBased },
    { label: p.internalLinks.virtual, onClick: onVirtual },
  ];

  return (
    <div className="text-[#0F172A]">
      <PageSchema p={p} faqs={p.faq.items} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff8df] via-white to-[#49b8c8]/10 px-4 py-16 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-[#f7c72f]/25 blur-3xl" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div {...fadeUp}>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#128c8c]">{p.hero.eyebrow}</p>
            <nav aria-label="Breadcrumb" className="mt-2 text-sm font-bold text-slate-500">
              {p.hero.breadcrumb.join(" › ")}
            </nav>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#0b4f4f] md:text-5xl lg:text-6xl">
              {p.hero.title}
            </h1>
            {p.hero.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="mt-5 text-lg font-semibold leading-8 text-slate-700">
                {paragraph}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <EdenButton variant="primarySite" onClick={onStart}>
                {p.heroCtas.startIntake} <ArrowRight size={18} />
              </EdenButton>
              <EdenButton variant="secondarySite" onClick={onVerifyInsurance ?? onStart}>
                {p.heroCtas.verifyInsurance}
              </EdenButton>
              <EdenButton variant="secondarySite" onClick={onSpeakWithPerson ?? onStart}>
                {p.heroCtas.speakWithPerson}
              </EdenButton>
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="relative mx-auto w-full max-w-lg">
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl ring-4 ring-white/80">
              <img src={img.hero} alt={p.hero.imageAlt} className="aspect-[4/5] w-full object-cover" loading="eager" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT IS */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.h2 {...fadeUp} className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">
            {p.whatIs.title}
          </motion.h2>
          {p.whatIs.paragraphs.map((paragraph) => (
            <motion.p key={paragraph.slice(0, 40)} {...fadeUp} className="mt-5 text-lg font-semibold leading-8 text-slate-600">
              {paragraph}
            </motion.p>
          ))}
          <motion.div {...fadeUp} className="mt-10 rounded-[1.75rem] border border-[#1f7a2e]/20 bg-gradient-to-br from-[#eef9f4] to-white p-8 shadow-lg">
            <h3 className="text-xl font-black text-[#0b4f4f]">{p.whatIs.calloutTitle}</h3>
            <ul className="mt-5 space-y-3">
              {p.whatIs.calloutItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base font-bold text-[#0b4f4f]">
                  <Check size={18} className="mt-0.5 shrink-0 text-[#1f7a2e]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* NATURAL SETTING */}
      {p.naturalSetting && (
        <section className="eden-section eden-section--mint mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.naturalSetting.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">{p.naturalSetting.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {p.naturalSetting.points.map((point, i) => (
              <motion.article
                key={point.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.04 }}
                className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-lg"
              >
                <h3 className="text-lg font-black text-[#0b4f4f]">{point.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{point.text}</p>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* SKILL AREAS */}
      {p.skillAreas && (
        <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.skillAreas.title}</h2>
              <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">{p.skillAreas.intro}</p>
            </motion.div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {p.skillAreas.items.map((item, i) => {
                const Icon = SKILL_ICONS[i] ?? Target;
                return (
                  <motion.article
                    key={item.title}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: i * 0.03 }}
                    className="rounded-[1.75rem] border border-[#0E6B4F]/10 bg-[#FAF7F0] p-6"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#128c8c]/10 text-[#128c8c]">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-base font-black text-[#0b4f4f]">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* BENEFITS */}
      <section className="eden-section eden-section--mint mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <motion.h2 {...fadeUp} className="text-center text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">
          {p.benefits.title}
        </motion.h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {p.benefits.items.map((benefit, i) => {
            const Icon = BENEFIT_ICONS[i];
            return (
              <motion.article
                key={benefit.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.04 }}
                className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-lg shadow-slate-900/5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#1f7a2e]/10 text-[#1f7a2e]">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-black text-[#0b4f4f]">{benefit.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{benefit.text}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* CLINICAL MODEL */}
      <section className="bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-white md:text-4xl lg:text-5xl">{p.clinicalModel.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-white/90">{p.clinicalModel.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.clinicalModel.steps.map((step, i) => (
              <motion.article
                key={step.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.04 }}
                className="rounded-[1.75rem] border border-white/10 bg-white/10 p-6 backdrop-blur-sm"
              >
                <span className="text-sm font-black uppercase tracking-widest text-[#f7c72f]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-black text-white">{step.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-white/85">{step.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* PARENT TRAINING */}
      {p.parentTraining && (
        <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp} className="max-w-3xl">
              <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.parentTraining.title}</h2>
              <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">{p.parentTraining.intro}</p>
            </motion.div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {p.parentTraining.items.map((item, i) => (
                <motion.article
                  key={item.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.04 }}
                  className="flex gap-4 rounded-[1.75rem] border border-[#f7c72f]/30 bg-gradient-to-br from-[#fff8df]/60 to-white p-6 shadow-md"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f7c72f]/20 text-[#0b4f4f]">
                    <HeartHandshake size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-black text-[#0b4f4f]">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{item.text}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOME ROUTINES */}
      {p.homeRoutines && (
        <section className="eden-section eden-section--mint mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <motion.div {...fadeUp} className="max-w-3xl">
            <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.homeRoutines.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">{p.homeRoutines.intro}</p>
          </motion.div>
          <motion.div {...fadeUp} className="mt-10">
            <RoutineTabs routines={p.homeRoutines.routines} />
          </motion.div>
        </section>
      )}

      {/* PROGRESS MONITORING */}
      {p.progressMonitoring && (
        <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <motion.div {...fadeUp}>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#128c8c]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#128c8c]">
                  <LineChart size={14} aria-hidden="true" />
                  Data-informed care
                </span>
                <h2 className="mt-4 text-3xl font-black text-[#0b4f4f] md:text-4xl">{p.progressMonitoring.title}</h2>
                <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">{p.progressMonitoring.intro}</p>
              </motion.div>
              <div className="space-y-4">
                {p.progressMonitoring.steps.map((step, i) => (
                  <motion.article
                    key={step.title}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                    className="rounded-[1.5rem] border border-slate-100 bg-[#FAF7F0] p-5 shadow-sm"
                  >
                    <h3 className="text-base font-black text-[#0b4f4f]">{step.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{step.text}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* WHY FAMILIES CHOOSE — light section */}
      <section className="eden-section eden-section--mint mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl">{p.whyChoose.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">{p.whyChoose.intro}</p>
            <p className="mt-4 text-sm font-black uppercase tracking-widest text-[#128c8c]">{p.whyChoose.skillsLabel}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {p.whyChoose.skills.map((skill) => (
                <li key={skill} className="text-sm font-bold text-[#0b4f4f]">
                  · {skill}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeUp} className="rounded-[1.75rem] border border-[#0E6B4F]/10 bg-white p-8 shadow-xl">
            <ul className="space-y-4">
              {p.whyChoose.checklist.map((item) => (
                <li key={item} className="flex items-center gap-3 text-base font-black text-[#0b4f4f]">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#1f7a2e]/10 text-[#1f7a2e]">
                    <Check size={16} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* WHO BENEFITS */}
      {p.whoBenefits && (
        <section className="bg-gradient-to-br from-[#fff8df] via-white to-[#49b8c8]/10 px-4 py-16 lg:px-8 lg:py-20">
          <motion.div {...fadeUp} className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-black text-[#0b4f4f] md:text-4xl">{p.whoBenefits.title}</h2>
            <p className="mt-5 text-center text-lg font-semibold leading-8 text-slate-600">{p.whoBenefits.intro}</p>
            <ul className="mt-10 space-y-3">
              {p.whoBenefits.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-[#0E6B4F]/10 bg-white px-5 py-4 text-sm font-bold text-[#0b4f4f] shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#1f7a2e]" size={18} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            {p.whoBenefits.note && (
              <p className="mt-6 text-center text-sm font-semibold text-slate-500">{p.whoBenefits.note}</p>
            )}
          </motion.div>
        </section>
      )}

      {/* FIRST WEEKS */}
      {p.firstWeeks && (
        <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <motion.div {...fadeUp}>
                <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.firstWeeks.title}</h2>
                <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">{p.firstWeeks.intro}</p>
              </motion.div>
              <FirstWeeksTimeline weeks={p.firstWeeks.weeks} />
            </div>
          </div>
        </section>
      )}

      {/* WHY EDEN */}
      {p.whyEden && (
        <section className="eden-section eden-section--mint mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.whyEden.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">{p.whyEden.intro}</p>
          </motion.div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.whyEden.items.map((item, i) => (
              <motion.article
                key={item.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.04 }}
                className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-lg"
              >
                <span className="text-xs font-black uppercase tracking-widest text-[#f7c72f]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg font-black text-[#0b4f4f]">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* GETTING STARTED */}
      {p.gettingStarted && (
        <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <motion.div {...fadeUp} className="text-center">
              <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl">{p.gettingStarted.title}</h2>
              <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-600">{p.gettingStarted.intro}</p>
            </motion.div>
            <ol className="mt-12 grid gap-5 sm:grid-cols-2">
              {p.gettingStarted.steps.map((step, i) => (
                <motion.li
                  key={step.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                  className="list-none rounded-[1.75rem] border border-[#128c8c]/15 bg-gradient-to-br from-[#ddf4f4]/40 to-white p-6 shadow-md"
                >
                  <span className="text-sm font-black text-[#128c8c]">Step {i + 1}</span>
                  <h3 className="mt-2 text-lg font-black text-[#0b4f4f]">{step.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{step.text}</p>
                </motion.li>
              ))}
            </ol>
            {p.gettingStarted.note && (
              <motion.p {...fadeUp} className="mt-8 text-center text-sm font-semibold text-slate-500">
                {p.gettingStarted.note}
              </motion.p>
            )}
          </div>
        </section>
      )}

      <MidCtaBand
        cta={p.midCta}
        onStart={onStart}
        onVerifyInsurance={onVerifyInsurance}
        onSpeakWithPerson={onSpeakWithPerson}
      />

      {/* PREPARING */}
      <section className="eden-section eden-section--mint mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <motion.div {...fadeUp} className="max-w-3xl">
          <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.preparing.title}</h2>
          <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">{p.preparing.intro}</p>
        </motion.div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {p.preparing.cards.map((card, i) => (
            <motion.div
              key={card.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="rounded-[1.75rem] border border-[#0E6B4F]/10 bg-white p-6 shadow-md"
            >
              <h3 className="text-lg font-black text-[#0b4f4f]">{card.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <motion.h2 {...fadeUp} className="text-center text-3xl font-black text-[#0b4f4f] md:text-4xl">
            {p.comparison.title}
          </motion.h2>
          <motion.div {...fadeUp} className="mt-10 overflow-hidden rounded-[1.75rem] border border-slate-200 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="bg-[#0b4f4f] text-white">
                    <th scope="col" className="px-6 py-4 text-sm font-black">{p.comparison.homeHeader}</th>
                    <th scope="col" className="px-6 py-4 text-sm font-black">{p.comparison.centerHeader}</th>
                  </tr>
                </thead>
                <tbody>
                  {p.comparison.rows.map(([home, center], i) => (
                    <tr key={home} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-700">{home}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-700">{center}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          <motion.p {...fadeUp} className="mt-6 text-center text-sm font-semibold leading-7 text-slate-600">
            {p.comparison.note}
          </motion.p>
          <motion.div {...fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
            {settingLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={link.onClick}
                className="rounded-full border border-[#1f7a2e]/30 bg-[#eef9f4] px-5 py-2.5 text-sm font-black text-[#1f7a2e] transition hover:bg-[#1f7a2e] hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="eden-section eden-section--mint mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <motion.h2 {...fadeUp} className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">
          {p.programs.title}
        </motion.h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {p.programs.items.map((program, i) => (
            <motion.article
              key={program.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-lg"
            >
              <div className="h-40 overflow-hidden">
                <img src={img.programs[i]} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-black text-[#0b4f4f]">{program.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{program.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* IS IT RIGHT */}
      <section className="bg-gradient-to-br from-[#fff8df] via-white to-[#49b8c8]/10 px-4 py-20 lg:px-8">
        <motion.div {...fadeUp} className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.fit.title}</h2>
          {p.fit.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-5 text-lg font-semibold leading-8 text-slate-600">
              {paragraph}
            </p>
          ))}
          <EdenButton variant="primarySite" className="mt-8" onClick={onSchedule}>
            {p.fit.cta} <ArrowRight size={18} />
          </EdenButton>
        </motion.div>
      </section>

      {/* FIND NEAR YOU */}
      <section className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <motion.div
          {...fadeUp}
          className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ddf4f4] via-white to-[#fff8df] p-8 shadow-xl md:p-12"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl">{p.findNear.title}</h2>
              {p.findNear.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-4 text-lg font-semibold leading-8 text-slate-600">
                  {paragraph}
                </p>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onLocations?.(searchQuery);
              }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <div className="relative min-w-0 flex-1">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1f7a2e]" size={20} />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 w-full rounded-full border border-slate-200 bg-white py-3 pl-12 pr-5 text-base font-bold text-slate-800 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  placeholder={p.findNear.placeholder}
                  aria-label={p.findNear.placeholder}
                />
              </div>
              <EdenButton type="submit" variant="primarySite" size="form" className="whitespace-nowrap">
                {p.findNear.button} <ArrowRight size={18} />
              </EdenButton>
            </form>
          </div>
        </motion.div>
      </section>

      {/* TRUST */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
        <motion.div {...fadeUp} className="mx-auto max-w-4xl rounded-[1.75rem] border border-[#0E6B4F]/10 bg-[#FAF7F0] p-8 md:p-10">
          <h2 className="text-2xl font-black text-[#0b4f4f] md:text-3xl">{p.trust.title}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-600">{p.trust.text}</p>
          <ul className="mt-6 space-y-2">
            {p.trust.sources.map((source) => (
              <li key={source} className="text-sm font-bold text-[#128c8c]">
                · {source}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* INSURANCE */}
      <section className="bg-slate-900 px-4 py-16 text-white lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div {...fadeUp} className="text-center">
            <ShieldCheck className="mx-auto text-emerald-300" size={40} aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-black md:text-4xl">{p.insurance.title}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-white/85">{p.insurance.intro}</p>
          </motion.div>
          <motion.ul {...fadeUp} className="mt-10 grid gap-3 sm:grid-cols-2">
            {p.insurance.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold leading-7 text-white/90"
              >
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={18} aria-hidden="true" />
                {bullet}
              </li>
            ))}
          </motion.ul>
          <motion.p {...fadeUp} className="mt-8 text-center text-sm font-semibold leading-7 text-white/70">
            {p.insurance.note}
          </motion.p>
        </div>
      </section>

      {/* FAQ */}
      <section className="eden-section eden-section--mint mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.faq.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">{p.faq.intro}</p>
          </motion.div>
          <motion.div {...fadeUp}>
            <FaqAccordion items={p.faq.items} />
          </motion.div>
        </div>
      </section>

      <ComplianceBar text={p.complianceNote} />

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-4 py-16 lg:px-8">
        <motion.div {...fadeUp} className="mx-auto max-w-4xl text-center">
          <Home className="mx-auto text-[#f7c72f]" size={40} aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">{p.finalCta.title}</h2>
          <p className="mt-4 text-lg font-semibold leading-8 text-white/90">{p.finalCta.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <EdenButton variant="gold" onClick={onStart}>{p.finalCta.startButton}</EdenButton>
            <EdenButton variant="secondarySite" onClick={onVerifyInsurance ?? onStart}>{p.finalCta.verifyButton}</EdenButton>
            <EdenButton variant="secondarySite" onClick={onSpeakWithPerson ?? onStart}>{p.finalCta.speakButton}</EdenButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
