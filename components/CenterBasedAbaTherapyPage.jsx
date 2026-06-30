"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  GraduationCap,
  Home,
  Laptop,
  MapPin,
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

const SETTING_ICONS = [Home, Users, GraduationCap, Laptop];

function PageSchema({ p, faqs }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: p.meta.title,
    description: p.meta.description,
    about: { "@type": "MedicalTherapy", name: "Center-Based Applied Behavior Analysis" },
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
        const panelId = `center-aba-faq-${i}`;
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

function BenefitCarousel({ benefits, testimonial }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);

  const scroll = (direction) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild;
    const width = card?.getBoundingClientRect().width || 340;
    el.scrollBy({ left: direction * (width + 16), behavior: "smooth" });
    setIndex((i) => Math.max(0, Math.min(benefits.length - 1, i + direction)));
  };

  return (
    <div>
      <div ref={ref} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {benefits.map((benefit) => (
          <article
            key={benefit.title}
            className="min-w-[85%] shrink-0 snap-center rounded-[1.75rem] border border-slate-100 bg-white p-8 shadow-lg shadow-slate-900/5 sm:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(33.333%-0.75rem)]"
          >
            <h3 className="text-xl font-black text-[#0b4f4f] md:text-2xl">{benefit.title}</h3>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">{benefit.text}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => scroll(-1)}
          disabled={index === 0}
          className="grid h-11 w-11 place-items-center rounded-full border border-[#1f7a2e]/20 bg-white text-[#1f7a2e] shadow-sm transition hover:bg-[#1f7a2e]/5 disabled:opacity-40"
          aria-label="Previous benefit"
        >
          <ChevronLeft size={22} />
        </button>
        <span className="text-sm font-black text-slate-500">
          {index + 1} of {benefits.length}
        </span>
        <button
          type="button"
          onClick={() => scroll(1)}
          disabled={index >= benefits.length - 1}
          className="grid h-11 w-11 place-items-center rounded-full bg-[#1f7a2e] text-white shadow-sm transition hover:bg-[#166326] disabled:opacity-40"
          aria-label="Next benefit"
        >
          <ChevronRight size={22} />
        </button>
      </div>
      {testimonial && (
        <blockquote className="mx-auto mt-10 max-w-3xl text-center text-lg font-semibold italic leading-8 text-slate-600">
          “{testimonial.quote}”
          <footer className="mt-3 text-sm font-black not-italic text-[#1f7a2e]">— {testimonial.attribution}</footer>
        </blockquote>
      )}
    </div>
  );
}

function ProgramCarousel({ programs, onLearnMore }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);

  const scroll = (direction) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild;
    const width = card?.getBoundingClientRect().width || 320;
    el.scrollBy({ left: direction * (width + 16), behavior: "smooth" });
    setIndex((i) => Math.max(0, Math.min(programs.length - 1, i + direction)));
  };

  return (
    <div>
      <div ref={ref} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {programs.map((program, i) => (
          <article
            key={program.title}
            className="min-w-[85%] shrink-0 snap-center overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-lg sm:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(33.333%-0.75rem)]"
          >
            <div className="h-44 overflow-hidden">
              <img src={program.image} alt="" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-black text-[#0b4f4f]">{program.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{program.text}</p>
              <EdenButton variant="secondarySite" className="mt-5 w-full" onClick={onLearnMore}>
                {program.cta} <ArrowRight size={16} />
              </EdenButton>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <button type="button" onClick={() => scroll(-1)} disabled={index === 0} className="grid h-11 w-11 place-items-center rounded-full border border-[#1f7a2e]/20 bg-white text-[#1f7a2e] disabled:opacity-40" aria-label="Previous program">
          <ChevronLeft size={22} />
        </button>
        <span className="text-sm font-black text-slate-500">{index + 1} of {programs.length}</span>
        <button type="button" onClick={() => scroll(1)} disabled={index >= programs.length - 1} className="grid h-11 w-11 place-items-center rounded-full bg-[#1f7a2e] text-white disabled:opacity-40" aria-label="Next program">
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}

export default function CenterBasedAbaTherapyPage({
  t,
  onStart,
  onLocations,
  onAba,
  onHomeBased,
  onCommunityBased,
  onSchoolBased,
  onVirtual,
}) {
  const p = t.pages.centerBasedAbaTherapy;
  const img = SITE_IMAGES.centerBasedAba;
  const [searchQuery, setSearchQuery] = useState("");

  const programCards = p.programs.items.map((program, i) => ({
    ...program,
    image: img.programs[i],
  }));

  const settingActions = [onHomeBased, onCommunityBased, onSchoolBased, onVirtual];

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
            <p className="mt-6 text-lg font-semibold leading-8 text-slate-700">{p.hero.paragraph}</p>
            <EdenButton variant="primarySite" className="mt-8" onClick={onLocations}>
              {p.hero.cta} <ArrowRight size={18} />
            </EdenButton>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="relative mx-auto w-full max-w-lg">
            <div className="absolute -left-6 top-8 h-28 w-28 rounded-full bg-[#49b8c8]/25 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl ring-4 ring-white/80">
              <img src={img.hero} alt={p.hero.imageAlt} className="aspect-[4/5] w-full object-cover" loading="eager" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* OUR CENTERS */}
      <section className="eden-section eden-section--mint mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div {...fadeUp} className="overflow-hidden rounded-[2rem] shadow-xl">
            <img src={img.centers} alt={p.centers.imageAlt} className="aspect-[4/3] w-full object-cover" loading="lazy" />
          </motion.div>
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.centers.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">{p.centers.text}</p>
            <EdenButton variant="primarySite" className="mt-8" onClick={onLocations}>
              {p.centers.cta} <ArrowRight size={18} />
            </EdenButton>
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
          <motion.div {...fadeUp} className="mt-8 rounded-[1.5rem] border border-[#0E6B4F]/15 bg-[#eef9f4]/60 p-6 md:p-8">
            <p className="text-sm font-black uppercase tracking-widest text-[#128c8c]">{p.whatIs.researchLabel}</p>
            <p className="mt-3 text-base font-semibold leading-7 text-slate-700">{p.whatIs.researchNote}</p>
          </motion.div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="eden-section eden-section--mint mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.benefits.title}</h2>
          <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">{p.benefits.intro}</p>
          <p className="mt-3 text-sm font-bold uppercase tracking-widest text-[#128c8c]">{p.benefits.subtitle}</p>
        </motion.div>
        <motion.div {...fadeUp} className="mt-12">
          <BenefitCarousel benefits={p.benefits.items} testimonial={p.benefits.testimonial} />
        </motion.div>
      </section>

      {/* IS IT RIGHT */}
      <section className="bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-black text-white md:text-4xl lg:text-5xl">{p.fit.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-white/90">{p.fit.text}</p>
          </motion.div>
          <motion.div {...fadeUp} className="flex justify-center lg:justify-end">
            <EdenButton variant="gold" size="form" onClick={onLocations}>
              {p.fit.cta} <ArrowRight size={18} />
            </EdenButton>
          </motion.div>
        </div>
      </section>

      {/* SERVICE SETTINGS */}
      <section className="eden-section eden-section--mint mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
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
      </section>

      {/* PROGRAMS */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.programs.title}</h2>
              <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">{p.programs.intro}</p>
              <p className="mt-4 text-base font-semibold leading-7 text-slate-600">{p.programs.secondary}</p>
            </motion.div>
            <motion.div {...fadeUp}>
              <ProgramCarousel programs={programCards} onLearnMore={onStart} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FIND A CENTER */}
      <section className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20">
        <motion.div
          {...fadeUp}
          className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ddf4f4] via-white to-[#fff8df] p-8 shadow-xl md:p-12 lg:p-14"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl">{p.findCenter.title}</h2>
              <p className="mt-4 text-lg font-semibold leading-8 text-slate-600">{p.findCenter.text}</p>
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
                  placeholder={p.findCenter.placeholder}
                  aria-label={p.findCenter.placeholder}
                />
              </div>
              <EdenButton type="submit" variant="primarySite" size="form" className="whitespace-nowrap">
                {p.findCenter.button} <ArrowRight size={18} />
              </EdenButton>
            </form>
          </div>
        </motion.div>
      </section>

      {/* GALLERY */}
      <section className="eden-section eden-section--mint mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <motion.h2 {...fadeUp} className="text-center text-3xl font-black text-[#0b4f4f] md:text-4xl">
          {p.gallery.title}
        </motion.h2>
        <motion.p {...fadeUp} className="mx-auto mt-4 max-w-2xl text-center text-lg font-semibold text-slate-600">
          {p.gallery.intro}
        </motion.p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {img.gallery.map((src, i) => (
            <motion.div key={src} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }} className="overflow-hidden rounded-[1.5rem] shadow-lg">
              <img src={src} alt={p.gallery.alts[i]} className="aspect-[4/3] w-full object-cover transition hover:scale-105" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="eden-section eden-section--white px-4 py-16 lg:px-8 lg:py-20">
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

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-4 py-16 lg:px-8">
        <motion.div {...fadeUp} className="mx-auto max-w-4xl text-center">
          <Building2 className="mx-auto text-[#f7c72f]" size={40} aria-hidden="true" />
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
