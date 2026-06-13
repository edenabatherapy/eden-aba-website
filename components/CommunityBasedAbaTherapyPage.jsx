"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  GraduationCap,
  Home,
  Laptop,
  MapPin,
  Minus,
  Plus,
  TreePine,
} from "lucide-react";
import EdenButton from "@/components/EdenButton";
import { SITE_IMAGES } from "@/lib/site-images";

const fadeUp = {
  initial: false,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const SETTING_ICONS = [Home, Building2, GraduationCap, Laptop];

function PageSchema({ p }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: p.meta.title,
    description: p.meta.description,
    about: { "@type": "MedicalTherapy", name: "Community-Based Applied Behavior Analysis" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function SkillsAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `community-aba-skill-${i}`;
        return (
          <article
            key={item.title}
            className={`overflow-hidden rounded-[1.5rem] border bg-white shadow-md transition ${
              isOpen ? "border-[#f7c72f]/60 ring-1 ring-[#f7c72f]/30" : "border-slate-100"
            }`}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-base font-black text-[#0b4f4f] md:text-lg">{item.title}</span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#128c8c]/10 text-[#128c8c]">
                  {isOpen ? <Minus size={20} aria-hidden="true" /> : <Plus size={20} aria-hidden="true" />}
                </span>
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
                  <div className="border-t border-slate-100 px-6 py-5">
                    <p className="text-base font-semibold leading-7 text-slate-600">{item.intro}</p>
                    <ul className="mt-4 space-y-2">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-sm font-bold text-[#0b4f4f]">
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#f7c72f]" aria-hidden="true" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    {item.closing && (
                      <p className="mt-4 text-base font-semibold leading-7 text-slate-600">{item.closing}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}

export default function CommunityBasedAbaTherapyPage({
  t,
  onStart,
  onLocations,
  onSchedule,
  onHomeBased,
  onCenterBased,
  onSchoolBased,
  onVirtual,
  onInsurance,
}) {
  const p = t.pages.communityBasedAbaTherapy;
  const img = SITE_IMAGES.communityBasedAba;
  const [searchQuery, setSearchQuery] = useState("");

  const settingActions = [onHomeBased, onCenterBased, onSchoolBased, onVirtual];

  return (
    <div className="bg-[#FAF7F0] text-[#0F172A]">
      <PageSchema p={p} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#ddf4f4] via-white to-[#49b8c8]/10 px-4 py-16 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute -left-16 top-20 h-48 w-48 rounded-full bg-[#128c8c]/20 blur-3xl" aria-hidden="true" />
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
            <EdenButton variant="primarySite" className="mt-8" onClick={onLocations}>
              {p.hero.cta} <ArrowRight size={18} />
            </EdenButton>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="relative mx-auto w-full max-w-lg">
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl ring-4 ring-white/80">
              <img src={img.hero} alt={p.hero.imageAlt} className="aspect-[4/5] w-full object-cover" loading="eager" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT IS */}
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.h2 {...fadeUp} className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">
            {p.whatIs.title}
          </motion.h2>
          {p.whatIs.paragraphs.map((paragraph) => (
            <motion.p key={paragraph.slice(0, 40)} {...fadeUp} className="mt-5 text-lg font-semibold leading-8 text-slate-600">
              {paragraph}
            </motion.p>
          ))}
          <motion.div {...fadeUp} className="mt-8 rounded-[1.75rem] border border-[#1f7a2e]/20 bg-[#FAF7F0] p-8">
            <p className="text-sm font-black uppercase tracking-widest text-[#128c8c]">{p.whatIs.goalsLabel}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {p.whatIs.goals.map((goal) => (
                <li key={goal} className="flex items-start gap-3 text-sm font-bold text-[#0b4f4f]">
                  <Check size={16} className="mt-0.5 shrink-0 text-[#1f7a2e]" aria-hidden="true" />
                  {goal}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base font-semibold leading-7 text-slate-600">{p.whatIs.researchNote}</p>
          </motion.div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.whyMatters.title}</h2>
          {p.whyMatters.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-5 text-lg font-semibold leading-8 text-slate-600">
              {paragraph}
            </p>
          ))}
          <p className="mt-4 text-sm font-black uppercase tracking-widest text-[#128c8c]">{p.whyMatters.benefitsLabel}</p>
        </motion.div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.whyMatters.benefits.map((benefit, i) => (
            <motion.div
              key={benefit}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className="rounded-[1.5rem] border border-slate-100 bg-white p-6 shadow-md"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#128c8c]/10 text-[#128c8c]">
                <Check size={20} aria-hidden="true" />
              </span>
              <p className="mt-4 text-base font-black text-[#0b4f4f]">{benefit}</p>
            </motion.div>
          ))}
        </div>
        <motion.p {...fadeUp} className="mx-auto mt-10 max-w-3xl text-center text-lg font-semibold leading-8 text-slate-600">
          {p.whyMatters.closing}
        </motion.p>
      </section>

      {/* HOW IT SUPPORTS */}
      <section className="bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-start">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-black text-white md:text-4xl">{p.howSupports.title}</h2>
            {p.howSupports.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-5 text-lg font-semibold leading-8 text-white/90">
                {paragraph}
              </p>
            ))}
          </motion.div>
          <motion.div {...fadeUp} className="rounded-[1.75rem] bg-white p-8 shadow-2xl">
            <p className="text-sm font-black uppercase tracking-widest text-[#128c8c]">{p.howSupports.focusLabel}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {p.howSupports.focusAreas.map((area) => (
                <li key={area} className="flex items-center gap-2 text-sm font-bold text-[#0b4f4f]">
                  <Check size={16} className="shrink-0 text-[#1f7a2e]" aria-hidden="true" />
                  {area}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-semibold leading-7 text-slate-600">{p.howSupports.closing}</p>
          </motion.div>
        </div>
      </section>

      {/* SKILLS ACCORDION */}
      <section className="mx-auto max-w-4xl px-4 py-20 lg:px-8">
        <motion.div {...fadeUp} className="text-center">
          <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.skills.title}</h2>
        </motion.div>
        <motion.div {...fadeUp} className="mt-12">
          <SkillsAccordion items={p.skills.items} />
        </motion.div>
      </section>

      {/* HOW IT HELPS - decorative callout */}
      <section className="bg-white px-4 py-20 lg:px-8">
        <motion.div
          {...fadeUp}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-[#128c8c]/20 bg-gradient-to-br from-[#eef9f4] via-white to-[#ddf4f4] p-8 md:p-12"
        >
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#128c8c]/10" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-[#f7c72f]/20" aria-hidden="true" />
          <h2 className="text-center text-2xl font-black text-[#0b4f4f] md:text-3xl">{p.howHelps.title}</h2>
          {p.howHelps.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-5 text-center text-lg font-semibold leading-8 text-slate-600">
              {paragraph}
            </p>
          ))}
        </motion.div>
      </section>

      {/* MEDICAID */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <motion.div {...fadeUp} className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-lg md:p-10">
          <h2 className="text-2xl font-black text-[#0b4f4f] md:text-3xl">{p.medicaid.title}</h2>
          {p.medicaid.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-4 text-base font-semibold leading-8 text-slate-600">
              {paragraph}
            </p>
          ))}
          <EdenButton variant="secondarySite" className="mt-6" onClick={onInsurance}>
            {p.medicaid.cta} <ArrowRight size={18} />
          </EdenButton>
        </motion.div>
      </section>

      {/* SERVICE SETTINGS */}
      <section className="bg-gradient-to-br from-[#fff8df] via-white to-[#49b8c8]/10 px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="text-center text-3xl font-black text-[#0b4f4f] md:text-4xl">
            {p.serviceSettings.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-4 max-w-2xl text-center text-lg font-semibold leading-8 text-slate-600">
            {p.serviceSettings.intro}
          </motion.p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {p.serviceSettings.items.map((item, i) => {
              const Icon = SETTING_ICONS[i];
              const onClick = settingActions[i] || onStart;
              const isActive = item.active;
              return (
                <motion.button
                  key={item.title}
                  type="button"
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                  onClick={onClick}
                  className={`flex h-full flex-col rounded-[1.75rem] border p-6 text-left shadow-md transition hover:-translate-y-0.5 hover:shadow-lg ${
                    isActive
                      ? "border-[#1f7a2e] bg-[#eef9f4] ring-2 ring-[#1f7a2e]/20"
                      : "border-slate-100 bg-white"
                  }`}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1f7a2e]/10 text-[#1f7a2e]">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-black text-[#0b4f4f]">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm font-semibold leading-6 text-slate-600">{item.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-[#1f7a2e]">
                    {item.cta} <ArrowRight size={16} />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* GET STARTED */}
      <section className="px-4 py-20 lg:px-8">
        <motion.div
          {...fadeUp}
          className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ddf4f4] via-white to-[#fff8df] p-8 shadow-xl md:p-12"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl">{p.getStarted.title}</h2>
              {p.getStarted.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-4 text-lg font-semibold leading-8 text-slate-600">
                  {paragraph}
                </p>
              ))}
              <p className="mt-4 text-sm font-black uppercase tracking-widest text-[#128c8c]">{p.getStarted.buildsLabel}</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {p.getStarted.builds.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-bold text-[#0b4f4f]">
                    <Check size={16} className="shrink-0 text-[#1f7a2e]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-base font-semibold leading-7 text-slate-600">{p.getStarted.closing}</p>
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
                  placeholder={p.getStarted.placeholder}
                  aria-label={p.getStarted.placeholder}
                />
              </div>
              <EdenButton type="submit" variant="primarySite" size="form" className="whitespace-nowrap">
                {p.getStarted.button} <ArrowRight size={18} />
              </EdenButton>
            </form>
          </div>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-4 py-16 lg:px-8">
        <motion.div {...fadeUp} className="mx-auto max-w-4xl text-center">
          <TreePine className="mx-auto text-[#f7c72f]" size={40} aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">{p.finalCta.title}</h2>
          <p className="mt-4 text-lg font-semibold leading-8 text-white/90">{p.finalCta.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <EdenButton variant="gold" onClick={onStart}>{p.finalCta.startButton}</EdenButton>
            <EdenButton variant="secondarySite" onClick={onSchedule}>{p.finalCta.scheduleButton}</EdenButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
