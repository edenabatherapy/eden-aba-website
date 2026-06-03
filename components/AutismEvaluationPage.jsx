"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Baby,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import { SITE_IMAGES } from "@/lib/site-images";
import EdenButton from "@/components/EdenButton";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

function TrustPill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#0E6B4F]/15 bg-white px-4 py-2 text-sm font-bold text-[#0F172A] shadow-sm">
      <CheckCircle2 size={16} className="shrink-0 text-[#10B981]" />
      {children}
    </span>
  );
}

export default function AutismEvaluationPage({ t, onStart, onMchat, onCast, onAdos, onExploreEvaluations }) {
  const p = t.pages.autismAssessment;
  const img = SITE_IMAGES.autismEvaluation;
  const diagnosedFeatures = [ShieldCheck, ClipboardList, Users, HeartHandshake];

  const scrollToPaths = () => {
    document.getElementById("evaluation-paths")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white text-[#0F172A]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#FAF7F0] px-4 py-16 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.12),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(14,107,79,0.08),transparent_40%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <motion.div {...fadeUp}>
            <span className="inline-flex rounded-full bg-[#0E6B4F]/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.22em] text-[#0E6B4F]">
              {p.hero.badge}
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-[#0F172A] md:text-5xl lg:text-6xl">
              {p.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg font-semibold leading-9 text-slate-600">{p.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <EdenButton onClick={scrollToPaths}>
                {p.hero.startScreening} <ArrowRight size={18} />
              </EdenButton>
              <EdenButton variant="outline" onClick={onExploreEvaluations || scrollToPaths}>
                {p.hero.exploreEvaluations}
              </EdenButton>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {p.hero.trust.map((item) => (
                <TrustPill key={item}>{item}</TrustPill>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.12 }}
            className="relative mx-auto h-[440px] w-full max-w-lg lg:h-[520px] lg:max-w-none"
          >
            <div className="absolute left-0 top-6 z-10 w-[55%] rotate-[-2deg] overflow-hidden rounded-[1.75rem] shadow-2xl ring-4 ring-white">
              <img src={img.collage[0]} alt={p.hero.collageAlts[0]} loading="eager" className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="absolute right-0 top-0 z-20 w-[50%] rotate-[3deg] overflow-hidden rounded-[1.75rem] shadow-2xl ring-4 ring-white">
              <img src={img.collage[1]} alt={p.hero.collageAlts[1]} loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="absolute bottom-6 left-[10%] z-30 w-[46%] rotate-[1deg] overflow-hidden rounded-[1.5rem] shadow-xl ring-4 ring-white">
              <img src={img.collage[2]} alt={p.hero.collageAlts[2]} loading="lazy" className="aspect-square w-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-[4%] z-40 w-[42%] rotate-[-3deg] overflow-hidden rounded-[1.5rem] shadow-xl ring-4 ring-white">
              <img src={img.collage[3]} alt={p.hero.collageAlts[3]} loading="lazy" className="aspect-square w-full object-cover" />
            </div>
            <div className="absolute left-1/2 top-1/2 z-0 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#10B981]/20 blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* WHAT SHOULD I DO NEXT */}
      <section id="evaluation-paths" className="scroll-mt-28 bg-white px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="text-center text-4xl font-black text-[#0F172A] md:text-5xl">
            {p.paths.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-4 max-w-3xl text-center text-lg font-semibold leading-8 text-slate-600">
            {p.paths.subtitle}
          </motion.p>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {/* Card 1 — No diagnosis */}
            <motion.article
              {...fadeUp}
              className="rounded-[2.5rem] border border-[#0E6B4F]/10 bg-[#FAF7F0] p-8 shadow-xl shadow-[#0E6B4F]/5 md:p-10"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#0E6B4F] text-white shadow-lg">
                <Baby size={28} />
              </div>
              <h3 className="mt-6 text-2xl font-black text-[#0F172A] md:text-3xl">{p.paths.noDiagnosis.title}</h3>
              <p className="mt-3 font-semibold leading-8 text-slate-600">{p.paths.noDiagnosis.intro}</p>

              <div className="mt-8 grid gap-4">
                {p.paths.noDiagnosis.options.map(([title, description, buttonLabel, key], i) => (
                  <div
                    key={title}
                    className="rounded-[1.75rem] border border-[#0E6B4F]/10 bg-white p-6 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0E6B4F]/10 text-sm font-black text-[#0E6B4F]">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-lg font-black text-[#0F172A]">{title}</h4>
                        <p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{description}</p>
                        <EdenButton
                          className="mt-4 !px-5 !py-2.5 !text-xs"
                          variant={key === "assessment" ? "outline" : "primary"}
                          onClick={key === "mchat" ? onMchat : key === "cast" ? onCast : key === "assessment" ? onAdos : onStart}
                        >
                          {buttonLabel} <ArrowRight size={14} />
                        </EdenButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>

            {/* Card 2 — Has diagnosis */}
            <motion.article
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="rounded-[2.5rem] border border-[#0E6B4F]/10 bg-gradient-to-br from-[#0F172A] to-[#1e293b] p-8 text-white shadow-xl md:p-10"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#10B981] text-white shadow-lg">
                <Sparkles size={28} />
              </div>
              <h3 className="mt-6 text-2xl font-black md:text-3xl">{p.paths.hasDiagnosis.title}</h3>
              <p className="mt-3 font-semibold leading-8 text-white/80">{p.paths.hasDiagnosis.intro}</p>

              <ul className="mt-8 grid gap-3">
                {p.paths.hasDiagnosis.features.map((feature, i) => {
                  const Icon = diagnosedFeatures[i];
                  return (
                    <li
                      key={feature}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                    >
                      <Icon size={22} className="shrink-0 text-[#10B981]" />
                      <span className="font-bold">{feature}</span>
                    </li>
                  );
                })}
              </ul>

              <EdenButton className="mt-8 bg-[#10B981] hover:bg-[#059669]" onClick={onStart}>
                {p.paths.hasDiagnosis.button} <ArrowRight size={18} />
              </EdenButton>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Supporting: how evaluation support works */}
      <section className="bg-[#0F172A] px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...fadeUp} className="text-center text-4xl font-black text-white md:text-5xl">
            {p.howItWorks.title}
          </motion.h2>
          <motion.p {...fadeUp} className="mx-auto mt-4 max-w-2xl text-center text-lg font-semibold leading-8 text-white/70">
            {p.howItWorks.subtitle}
          </motion.p>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {p.howItWorks.steps.map(([title, text], i) => (
              <motion.article
                key={title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur-sm"
              >
                <span className="text-sm font-black uppercase tracking-[0.2em] text-[#10B981]">
                  {p.howItWorks.stepLabel} {i + 1}
                </span>
                <h3 className="mt-3 text-xl font-black text-white">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-white/70">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 lg:px-8">
        <motion.div
          {...fadeUp}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0E6B4F] to-[#10B981] px-8 py-14 text-center shadow-2xl md:px-16 md:py-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="relative">
            <Stethoscope size={40} className="mx-auto text-white/80" />
            <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">{p.cta.title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold leading-8 text-white/90">{p.cta.text}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <EdenButton variant="secondaryOnDark" onClick={scrollToPaths}>
                {p.cta.startScreening}
              </EdenButton>
              <EdenButton variant="outlineOnDark" onClick={onStart}>
                {p.cta.contactEden}
              </EdenButton>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
