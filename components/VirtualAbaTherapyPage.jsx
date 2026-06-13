"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  Clock3,
  GraduationCap,
  Home,
  Laptop,
  MapPin,
  ShieldCheck,
  TreePine,
  Users,
  Wifi,
} from "lucide-react";
import EdenButton from "@/components/EdenButton";
import {
  FamilyCoachingIllustration,
  TelehealthDecorCircles,
  TelehealthHeroIllustration,
  TelehealthInsuranceIllustration,
  VirtualProgressDashboardIllustration,
  VirtualVsInPersonIllustration,
} from "@/components/illustrations/VirtualAbaIllustrations";

const fadeUp = {
  initial: false,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const BENEFIT_ICONS = [Wifi, Clock3, Calendar, Users, Home, ShieldCheck];
const SETTING_ICONS = [GraduationCap, TreePine, Home, Building2];

function PageSchema({ p, faqs }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: p.meta.title,
    description: p.meta.description,
    about: { "@type": "MedicalTherapy", name: "Virtual Applied Behavior Analysis" },
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
        const panelId = `virtual-aba-faq-${i}`;
        return (
          <article key={item.q} className="overflow-hidden rounded-[1.5rem] border border-[#128c8c]/20 bg-white shadow-md">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-base font-black text-[#0b4f4f] md:text-lg">{item.q}</span>
                <ChevronDown size={22} className={`shrink-0 text-[#128c8c] transition ${isOpen ? "rotate-180" : ""}`} />
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

export default function VirtualAbaTherapyPage({
  t,
  onStart,
  onLocations,
  onSchedule,
  onInsurance,
  onHomeBased,
  onCenterBased,
  onCommunityBased,
  onSchoolBased,
}) {
  const p = t.pages.virtualAbaTherapy;
  const ill = p.illustrations;
  const [searchQuery, setSearchQuery] = useState("");

  const settingActions = [onSchoolBased, onCommunityBased, onHomeBased, onCenterBased];

  return (
    <div className="bg-gradient-to-b from-[#eef9f4] via-[#FAF7F0] to-white text-[#0F172A]">
      <PageSchema p={p} faqs={p.faq.items} />

      {/* HERO */}
      <section className="relative overflow-hidden px-4 py-16 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute -left-10 top-0 h-72 w-72 opacity-60" aria-hidden="true">
          <TelehealthDecorCircles className="h-full w-full" />
        </div>
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
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="mx-auto w-full max-w-md">
            <TelehealthHeroIllustration ariaLabel={ill.hero} className="drop-shadow-xl" />
          </motion.div>
        </div>
      </section>

      {/* SUPPORTING DEVELOPMENT */}
      <section className="bg-white px-4 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl">{p.supporting.title}</h2>
            {p.supporting.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-5 text-lg font-semibold leading-8 text-slate-600">
                {paragraph}
              </p>
            ))}
          </motion.div>
          <motion.div {...fadeUp}>
            <VirtualProgressDashboardIllustration ariaLabel={ill.progressDashboard} />
          </motion.div>
        </div>
      </section>

      {/* COMPARE */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl">{p.compare.title}</h2>
            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-lg">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#128c8c] text-white">
                    <th scope="col" className="px-5 py-4 text-sm font-black">{p.compare.virtualHeader}</th>
                    <th scope="col" className="px-5 py-4 text-sm font-black">{p.compare.inPersonHeader}</th>
                  </tr>
                </thead>
                <tbody>
                  {p.compare.rows.map(([virtual, inPerson], i) => (
                    <tr key={virtual} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-700">{virtual}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-700">{inPerson}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          <motion.div {...fadeUp}>
            <VirtualVsInPersonIllustration ariaLabel={ill.compare} />
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.h2 {...fadeUp} className="text-center text-3xl font-black text-white md:text-4xl">
            {p.howItWorks.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mt-5 text-center text-lg font-semibold leading-8 text-white/90">
            {p.howItWorks.intro}
          </motion.p>
          <motion.ul {...fadeUp} className="mt-10 grid gap-3 sm:grid-cols-2">
            {p.howItWorks.items.map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white">
                <Check size={18} className="shrink-0 text-[#f7c72f]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </motion.ul>
          <motion.p {...fadeUp} className="mt-8 text-center text-base font-semibold leading-7 text-white/85">
            {p.howItWorks.closing}
          </motion.p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <motion.h2 {...fadeUp} className="text-center text-3xl font-black text-[#0b4f4f] md:text-4xl">
          {p.benefits.title}
        </motion.h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {p.benefits.items.map((benefit, i) => {
            const Icon = BENEFIT_ICONS[i];
            return (
              <motion.article
                key={benefit.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.04 }}
                className="rounded-[1.75rem] border border-[#128c8c]/15 bg-white p-6 shadow-lg"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#128c8c]/10 text-[#128c8c]">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-black text-[#0b4f4f]">{benefit.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{benefit.text}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* FAMILY COACHING */}
      <section className="bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div {...fadeUp} className="order-2 lg:order-1">
            <FamilyCoachingIllustration ariaLabel={ill.familyCoaching} />
          </motion.div>
          <motion.div {...fadeUp} className="order-1 lg:order-2">
            <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl">{p.familyCoaching.title}</h2>
            {p.familyCoaching.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-5 text-lg font-semibold leading-8 text-slate-600">
                {paragraph}
              </p>
            ))}
            <p className="mt-4 text-sm font-black uppercase tracking-widest text-[#128c8c]">{p.familyCoaching.learnLabel}</p>
            <ul className="mt-4 space-y-2">
              {p.familyCoaching.learnItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-bold text-[#0b4f4f]">
                  <Check size={16} className="mt-0.5 shrink-0 text-[#1f7a2e]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-base font-semibold leading-7 text-slate-600">{p.familyCoaching.closing}</p>
            <EdenButton variant="primarySite" className="mt-6" onClick={onSchedule}>
              {p.familyCoaching.cta} <ArrowRight size={18} />
            </EdenButton>
          </motion.div>
        </div>
      </section>

      {/* INSURANCE */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div {...fadeUp}>
            <h2 className="text-2xl font-black text-[#0b4f4f] md:text-3xl">{p.insurance.title}</h2>
            {p.insurance.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-4 text-base font-semibold leading-8 text-slate-600">
                {paragraph}
              </p>
            ))}
            <p className="mt-4 text-sm font-black uppercase tracking-widest text-[#128c8c]">{p.insurance.varyLabel}</p>
            <ul className="mt-3 space-y-2">
              {p.insurance.varyItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-bold text-[#0b4f4f]">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#f7c72f]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <EdenButton variant="secondarySite" className="mt-6" onClick={onInsurance}>
              {p.insurance.cta} <ArrowRight size={18} />
            </EdenButton>
          </motion.div>
          <motion.div {...fadeUp}>
            <TelehealthInsuranceIllustration ariaLabel={ill.insurance} />
          </motion.div>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="bg-gradient-to-br from-[#ddf4f4] via-white to-[#fff8df] px-4 py-20 lg:px-8">
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
              return (
                <motion.button
                  key={item.title}
                  type="button"
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                  onClick={onClick}
                  className="flex h-full flex-col rounded-[1.75rem] border border-slate-100 bg-white p-6 text-left shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#128c8c]/10 text-[#128c8c]">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-black text-[#0b4f4f]">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm font-semibold leading-6 text-slate-600">{item.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-[#128c8c]">
                    {item.cta} <ArrowRight size={16} />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FIND NEAR YOU */}
      <section className="relative px-4 py-20 lg:px-8">
        <div className="pointer-events-none absolute right-8 top-8 h-32 w-32 opacity-50" aria-hidden="true">
          <TelehealthDecorCircles className="h-full w-full" />
        </div>
        <motion.div
          {...fadeUp}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#128c8c]/20 bg-gradient-to-br from-[#ddf4f4] via-white to-[#eef9f4] p-8 shadow-xl md:p-12"
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
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-[#128c8c]" size={20} />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 w-full rounded-full border border-slate-200 bg-white py-3 pl-12 pr-5 text-base font-bold text-slate-800 outline-none focus:border-[#128c8c] focus:ring-4 focus:ring-[#128c8c]/20"
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
      <section className="bg-white px-4 py-20 lg:px-8">
        <motion.div {...fadeUp} className="mx-auto max-w-4xl rounded-[1.75rem] border border-[#128c8c]/15 bg-[#eef9f4] p-8 md:p-10">
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

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
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

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-4 py-16 lg:px-8">
        <motion.div {...fadeUp} className="mx-auto max-w-4xl text-center">
          <Laptop className="mx-auto text-[#f7c72f]" size={40} aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">{p.finalCta.title}</h2>
          {p.finalCta.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-4 text-lg font-semibold leading-8 text-white/90">
              {paragraph}
            </p>
          ))}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <EdenButton variant="gold" onClick={onSchedule}>{p.finalCta.scheduleButton}</EdenButton>
            <EdenButton variant="secondarySite" onClick={onStart}>{p.finalCta.startButton}</EdenButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
