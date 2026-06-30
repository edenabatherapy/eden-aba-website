"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  HeartHandshake,
  Home,
  MapPin,
  MessageCircle,
  Sparkles,
  Target,
  Users,
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

export default function HomeBasedAbaTherapyPage({
  t,
  onStart,
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
    <div className="eden-page-shell text-[#0F172A]">
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

      {/* BENEFITS */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
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

      {/* WHY FAMILIES CHOOSE */}
      <section className="bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-start">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-black text-white md:text-4xl">{p.whyChoose.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-white/90">{p.whyChoose.intro}</p>
            <p className="mt-4 text-sm font-black uppercase tracking-widest text-[#f7c72f]">{p.whyChoose.skillsLabel}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {p.whyChoose.skills.map((skill) => (
                <li key={skill} className="text-sm font-bold text-white/90">
                  · {skill}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeUp} className="rounded-[1.75rem] bg-white p-8 shadow-2xl">
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

      {/* PREPARING */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
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
      <section className="bg-white px-4 py-20 lg:px-8">
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
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
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
      <section className="px-4 py-20 lg:px-8">
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
      <section className="bg-white px-4 py-20 lg:px-8">
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
          <Home className="mx-auto text-[#f7c72f]" size={40} aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">{p.finalCta.title}</h2>
          <p className="mt-4 text-lg font-semibold leading-8 text-white/90">{p.finalCta.text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <EdenButton variant="gold" onClick={onStart}>{p.finalCta.startButton}</EdenButton>
            <EdenButton variant="secondarySite" onClick={onLocations}>{p.finalCta.findButton}</EdenButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
