"use client";

import React, { useRef, useState } from "react";
import AdmissionsNewsletterSection from "@/components/admissions/AdmissionsNewsletterSection";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Blocks,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock3,
  HeartHandshake,
  HelpCircle,
  Laptop,
  MapPin,
  Stethoscope,
  Star,
  TrainFront,
  Users,
} from "lucide-react";
import EdenButton from "@/components/EdenButton";
import { SITE_IMAGES } from "@/lib/site-images";

/** Admissions page insurance logos — one canonical mark per payer. */
const ADMISSIONS_INSURANCE_LOGOS = [
  { name: "Cigna", src: "/assets/insurance/cigna.png" },
  { name: "Aetna", src: "/assets/insurance/aetna-1.png" },
  { name: "Anthem HealthKeepers", src: "/assets/insurance/anthem-healthkeepers.png", compact: true },
  { name: "Blue Cross Blue Shield", src: "/assets/insurance/bcbs-4.png" },
  { name: "UMR", src: "/assets/insurance/umr.png", contrast: true },
  { name: "Sentara", src: "/assets/insurance/sentara.png" },
  { name: "Molina Healthcare", src: "/images/insurance/molina-healthcare.png", compact: true },
  { name: "UnitedHealthcare", src: "/assets/insurance/united-healthcare.png" },
  { name: "TRICARE", src: "/images/insurance/tricare.png", contrast: true },
];

const fadeUp = {
  initial: false,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const STEP_ICONS = [MapPin, ClipboardList, Blocks];
const PATH_ICONS = [Laptop, MapPin];
const FEATURE_ICONS = [Users, Stethoscope, Clock3, HeartHandshake, ClipboardList, BookOpen];

function Stars() {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={18} className="fill-[#f7c72f] text-[#f7c72f]" />
      ))}
    </div>
  );
}

function PageSchema({ p }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: p.meta.title,
    description: p.meta.description,
    about: { "@type": "MedicalTherapy", name: "Applied Behavior Analysis" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function TestimonialCard({ item }) {
  return (
    <article className="min-w-[85%] shrink-0 snap-center rounded-[1.75rem] border border-slate-100 bg-white p-8 shadow-lg shadow-slate-900/5 sm:min-w-[calc(50%-0.75rem)] lg:min-w-0">
      <Stars />
      <p className="mt-5 text-base font-semibold leading-8 text-slate-700">{item.quote}</p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-5">
        <div>
          <p className="text-sm font-black text-[#1f7a2e]">{item.name}</p>
          {item.source && <p className="mt-1 text-xs font-bold text-slate-500">{item.source}</p>}
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#128c8c]">
          5 stars
        </span>
      </div>
    </article>
  );
}

export default function AdmissionsPage({
  t,
  onStart,
  onIntake,
  onDiagnosticSupport,
  onAba,
  onInsurance,
  onLocations,
  onAbaRightForMe,
  onAsdSupport,
  onContact,
}) {
  const p = t.pages.admissions;
  const img = SITE_IMAGES.admissions;

  const [searchQuery, setSearchQuery] = useState("");

  const carouselRef = useRef(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const scrollCarousel = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width || 320;
    el.scrollBy({ left: direction * (cardWidth + 16), behavior: "smooth" });
    setCarouselIndex((i) =>
      Math.max(0, Math.min(p.testimonials.items.length - 1, i + direction)),
    );
  };

  const openLocations = (event) => {
    event?.preventDefault?.();
    onLocations?.(searchQuery);
  };

  return (
    <div className="bg-[#FAF7F0] text-[#0F172A]">
      <PageSchema p={p} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff8df] via-white to-[#49b8c8]/10 px-4 py-16 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-[#f7c72f]/25 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[#49b8c8]/20 blur-3xl" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div {...fadeUp}>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#128c8c]">{p.hero.breadcrumb}</p>
            {p.hero.badge && (
              <span className="mt-4 inline-flex rounded-full bg-[#1f7a2e]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#1f7a2e]">
                {p.hero.badge}
              </span>
            )}
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#0b4f4f] md:text-5xl lg:text-6xl">
              {p.hero.title}
            </h1>
            <p className="mt-6 text-lg font-semibold leading-8 text-slate-700">{p.hero.paragraph1}</p>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{p.hero.paragraph2}</p>
            {p.hero.supportLine && (
              <p className="mt-5 inline-flex rounded-2xl bg-[#49b8c8]/10 px-4 py-2 text-sm font-bold text-[#0b4f4f]">
                {p.hero.supportLine}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              <EdenButton variant="primarySite" onClick={onStart}>
                {p.hero.primaryButton} <ArrowRight size={18} />
              </EdenButton>
              <EdenButton variant="secondarySite" onClick={onDiagnosticSupport}>
                {p.hero.secondaryButton}
              </EdenButton>
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="relative mx-auto w-full max-w-lg">
            <div className="absolute -right-6 -top-6 h-full w-full rounded-[2.5rem] bg-[#1f7a2e]/15" aria-hidden="true" />
            <img
              src={img.hero}
              alt={p.hero.imageAlt}
              loading="eager"
              className="relative aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-2xl ring-8 ring-white"
            />
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.h2 {...fadeUp} className="text-3xl font-black text-[#0b4f4f] md:text-4xl">
            {p.testimonials.title}
          </motion.h2>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollCarousel(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-[#0b4f4f] shadow-sm transition hover:bg-emerald-50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-[#0b4f4f] shadow-sm transition hover:bg-emerald-50"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:pb-0 xl:grid-cols-2"
        >
          {p.testimonials.items.map((item) => (
            <TestimonialCard key={`${item.name}-${item.quote.slice(0, 24)}`} item={item} />
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2 md:hidden">
          {p.testimonials.items.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${i === carouselIndex ? "bg-[#1f7a2e]" : "bg-slate-300"}`}
              aria-hidden="true"
            />
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-10 overflow-hidden rounded-[2rem] shadow-xl lg:hidden">
          <img src={img.testimonialAccent} alt="" className="h-48 w-full object-cover" loading="lazy" />
        </motion.div>
      </section>

      {/* GETTING STARTED 1-2-3 */}
      <section className="relative overflow-hidden bg-white px-4 py-20 lg:px-8">
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/3 opacity-20 lg:block">
          <img src={img.stepsAccent} alt="" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="relative mx-auto max-w-7xl text-center">
          <motion.h2 {...fadeUp} className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">
            {p.steps.titlePrefix}{" "}
            <span className="text-[#1f7a2e]">{p.steps.titleHighlight}</span>
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-600">
            {p.steps.intro}
          </motion.p>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {p.steps.cards.map((card, i) => {
              const Icon = STEP_ICONS[i] || TrainFront;
              const handlers = [onStart, onDiagnosticSupport, onAba];
              return (
                <motion.div
                  key={card.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className="flex h-full flex-col rounded-[1.75rem] border border-slate-100 bg-[#FAF7F0] p-8 text-left shadow-lg"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1f7a2e]/10 text-[#1f7a2e]">
                    <Icon size={24} />
                  </span>
                  <h3 className="mt-6 text-xl font-black text-[#0b4f4f]">{card.title}</h3>
                  <p className="mt-4 flex-1 text-base font-semibold leading-7 text-slate-600">{card.text}</p>
                  <EdenButton variant="secondarySite" className="mt-8 w-full" onClick={handlers[i]}>
                    {card.button}
                  </EdenButton>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DIAGNOSTIC STATUS DECISION */}
      <section className="bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="mx-auto max-w-4xl text-center text-3xl font-black text-white md:text-4xl">
            {p.pathChoice.title}
          </motion.h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {p.pathChoice.cards.map((card, i) => {
              const Icon = PATH_ICONS[i];
              const isDark = i === 0;
              const onClick = i === 0 ? onIntake : onDiagnosticSupport;
              return (
                <motion.div
                  key={card.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className={`flex h-full flex-col rounded-[2rem] p-8 text-left shadow-2xl md:p-10 ${
                    isDark ? "bg-[#083d3d] text-white ring-2 ring-white/10" : "bg-white text-[#0b4f4f] ring-2 ring-[#1f7a2e]/10"
                  }`}
                >
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-2xl ${
                      isDark ? "bg-white/10 text-[#f7c72f]" : "bg-[#1f7a2e]/10 text-[#1f7a2e]"
                    }`}
                  >
                    <Icon size={28} />
                  </span>
                  <h3 className="mt-6 text-2xl font-black">{card.title}</h3>
                  <p className={`mt-4 flex-1 text-base font-semibold leading-7 ${isDark ? "text-white/90" : "text-slate-600"}`}>
                    {card.text}
                  </p>
                  <EdenButton
                    variant={isDark ? "gold" : "primarySite"}
                    className="mt-8 w-full md:w-auto"
                    onClick={onClick}
                  >
                    {card.button} <ArrowRight size={18} />
                  </EdenButton>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE EDEN */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">{p.whyChoose.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">{p.whyChoose.intro}</p>
            <div className="mt-8 overflow-hidden rounded-[2rem] shadow-xl">
              <img
                src={img.whyChooseAccent}
                alt="Parent and child receiving family-centered ABA support"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
            <EdenButton variant="primarySite" className="mt-8" onClick={onAba}>
              {p.whyChoose.cta} <ArrowRight size={18} />
            </EdenButton>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2">
            {p.whyChoose.features.map((feature, i) => {
              const Icon = FEATURE_ICONS[i];
              const isLast = i === p.whyChoose.features.length - 1;
              return (
                <motion.div
                  key={feature.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                  className="rounded-[1.5rem] border border-[#0E6B4F]/10 bg-white p-6 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#0E6B4F]/10 text-[#0E6B4F]">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-4 text-lg font-black text-[#0b4f4f]">{feature.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{feature.text}</p>
                  {isLast && p.whyChoose.resourceNote && (
                    <button
                      type="button"
                      onClick={onContact}
                      className="mt-4 text-left text-sm font-black text-[#1f7a2e] underline-offset-2 hover:underline"
                    >
                      {p.whyChoose.resourceNote}
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INSURANCE */}
      <section className="bg-white px-4 py-20 lg:px-8">
        <motion.div {...fadeUp} className="mx-auto max-w-6xl rounded-[2rem] border border-slate-100 bg-gradient-to-br from-[#fff8df] via-white to-[#49b8c8]/5 px-6 py-12 text-center shadow-xl md:px-12 md:py-16">
          <h2 className="text-3xl font-black text-[#0b4f4f] md:text-4xl lg:text-5xl">
            {p.insurance.titleBefore}
            <span className="text-[#1f7a2e]">{p.insurance.titleEmphasis}</span>
          </h2>
          <ul
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Insurance providers accepted at Eden ABA Therapy"
          >
            {ADMISSIONS_INSURANCE_LOGOS.map((provider) => (
              <li
                key={provider.name}
                className="flex min-h-[108px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <Image
                  src={provider.src}
                  alt={`${provider.name} logo`}
                  width={180}
                  height={70}
                  className={`max-h-[70px] w-auto max-w-[180px] object-contain ${
                    provider.compact ? "max-h-[58px]" : ""
                  } ${provider.contrast ? "contrast-125 saturate-110" : ""}`}
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 28vw"
                />
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-3xl text-lg font-semibold leading-8 text-slate-600">{p.insurance.text}</p>
          <EdenButton variant="primarySite" className="mt-8" onClick={onInsurance}>
            {p.insurance.button} <ArrowRight size={18} />
          </EdenButton>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <motion.h2 {...fadeUp} className="text-3xl font-black text-white md:text-4xl lg:text-5xl">
            {p.finalCta.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-white/90">
            {p.finalCta.subtitle}
          </motion.p>
          <motion.div
            {...fadeUp}
            className="mx-auto mt-10 w-full rounded-[2rem] bg-white p-6 shadow-2xl shadow-emerald-950/20 md:p-10 lg:p-12"
          >
            <form onSubmit={openLocations}>
              <label className="mb-4 block text-left text-lg font-black text-[#0b4f4f]">{p.finalCta.searchLabel}</label>
              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-600" size={22} />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full rounded-full border border-slate-200 bg-slate-50 py-4 pl-14 pr-5 text-base font-bold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                    placeholder={p.finalCta.searchPlaceholder}
                  />
                </div>
                <EdenButton type="submit" variant="primarySite" size="form" className="whitespace-nowrap">
                  {p.finalCta.searchButton} <ArrowRight size={18} />
                </EdenButton>
              </div>
            </form>
            <p className="my-5 text-sm font-bold uppercase tracking-widest text-slate-400">{p.finalCta.divider}</p>
            <EdenButton variant="secondarySite" className="w-full" onClick={onIntake}>
              {p.finalCta.interestForm}
            </EdenButton>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-[#128c8c]">
              <button type="button" onClick={onAbaRightForMe} className="inline-flex items-center gap-2 hover:text-[#1f7a2e]">
                <HelpCircle size={16} /> {p.finalCta.helperLinks.abaRight}
              </button>
              <button type="button" onClick={onAsdSupport} className="inline-flex items-center gap-2 hover:text-[#1f7a2e]">
                <HelpCircle size={16} /> {p.finalCta.helperLinks.asdSupport}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <AdmissionsNewsletterSection labels={p.newsletter} />
    </div>
  );
}
