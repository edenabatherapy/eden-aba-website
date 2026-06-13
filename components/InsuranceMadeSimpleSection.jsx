"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileText,
  Gift,
  Headphones,
  ListChecks,
  LockKeyhole,
  MessageCircle,
  Phone,
  PieChart,
  Shield,
  ShieldCheck,
  UserRound,
  Users,
  Zap,
} from "lucide-react";
import { insuranceProviders } from "@/lib/insurance-logos";

const BENEFIT_CARD_ICONS = [Zap, Shield, UserRound, Headphones];
const FEATURE_CARD_ICONS = [BookOpen, MessageCircle, PieChart, Users];
const VERIFICATION_STEP_ICONS = [ClipboardList, ShieldCheck, ListChecks, Gift];
const SUPPORT_CARD_ICONS = [CalendarDays, FileText, UserRound, MessageCircle];

const DEFAULT_BENEFIT_CARDS = [
  { title: "Fast & Accurate", description: "Benefit verification typically completed within 24–48 hours." },
  { title: "Maximize Benefits", description: "We identify your full coverage so you understand what's available." },
  { title: "Hassle-Free", description: "We handle insurance details from start to finish on your behalf." },
  { title: "Ongoing Support", description: "Dedicated support throughout your child's therapy journey." },
];

const DEFAULT_FEATURE_ITEMS = [
  { title: "Step-by-Step Guidance", description: "Clear guidance through verification and authorization." },
  { title: "Transparent Communication", description: "Plain-language updates on coverage and next steps." },
  { title: "Benefit Maximization", description: "Help identifying eligible services and plan details." },
  { title: "Dedicated Support", description: "A responsive intake team for questions along the way." },
];

const DEFAULT_VERIFICATION_STEPS = [
  { title: "Submit Info", description: "Share insurance details securely" },
  { title: "We Verify", description: "Our team checks your benefits" },
  { title: "Review Benefits", description: "Understand coverage & costs" },
  { title: "Plan Your Care", description: "Move forward with confidence" },
];

const DEFAULT_WHAT_YOU_RECEIVE = [
  "Coverage summary",
  "Deductibles & copays",
  "Authorization requirements",
  "Out-of-pocket estimates",
];

const DEFAULT_SUPPORT_CARDS = [
  { title: "Appointment Assistance", description: "Help scheduling evaluations and intake appointments." },
  { title: "Claims Support", description: "Guidance on claims questions and documentation." },
  { title: "Plan Changes", description: "Support when your insurance or coverage changes." },
  { title: "Resource Center", description: "Access to family guides and educational resources." },
];

function VerificationSteps({ steps, icons }) {
  return (
    <ol className="mt-5 grid grid-cols-2 gap-x-2 gap-y-5 sm:grid-cols-4 sm:gap-x-1">
      {steps.map((step, index) => {
        const Icon = icons[index] || ClipboardList;
        const isFirst = index === 0;
        const isLast = index === steps.length - 1;

        return (
          <li key={step.title} className="flex min-w-0 flex-col items-center text-center">
            <div className="flex w-full items-center">
              <span
                className={`hidden h-px min-w-3 flex-1 border-t border-dashed border-slate-300 sm:block ${isFirst ? "invisible" : ""}`}
                aria-hidden="true"
              />
              <div className="relative shrink-0 px-0.5 sm:px-1">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#eef9f4] text-[#128c8c] sm:h-14 sm:w-14">
                  <Icon size={22} strokeWidth={2} aria-hidden />
                </div>
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#1f7a2e] text-[10px] font-black text-white">
                  {index + 1}
                </span>
              </div>
              <span
                className={`hidden h-px min-w-3 flex-1 border-t border-dashed border-slate-300 sm:block ${isLast ? "invisible" : ""}`}
                aria-hidden="true"
              />
            </div>
            <p className="mt-2.5 w-full text-xs font-extrabold leading-tight text-[#0b4f4f] sm:text-sm">
              {step.title}
            </p>
            <p className="mt-1 w-full max-w-[8.5rem] text-[10px] font-medium leading-4 text-slate-500 sm:max-w-[9rem] sm:text-[11px] sm:leading-[1.35]">
              {step.description}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

function ProviderLogoCell({ provider, reduceMotion, index }) {
  return (
    <motion.div
      initial={false}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex h-full min-h-[72px] flex-col items-center justify-center rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition hover:border-[#128c8c]/20 hover:shadow-md"
    >
      <div className="relative flex h-10 w-full items-center justify-center sm:h-11">
        <Image
          src={provider.logo}
          alt={`${provider.name} logo`}
          width={160}
          height={80}
          className="max-h-10 w-full object-contain sm:max-h-11"
        />
      </div>
    </motion.div>
  );
}

export default function InsuranceMadeSimpleSection({ t, onVerify, onSpeakIntake }) {
  const reduceMotion = useReducedMotion();

  const benefitCards = t.benefitCards?.length ? t.benefitCards : DEFAULT_BENEFIT_CARDS;
  const featureItems = t.featureCard?.items?.length ? t.featureCard.items : DEFAULT_FEATURE_ITEMS;
  const verificationSteps = t.verificationSteps?.length ? t.verificationSteps : DEFAULT_VERIFICATION_STEPS;
  const whatYouReceive = t.whatYouReceive?.items?.length ? t.whatYouReceive.items : DEFAULT_WHAT_YOU_RECEIVE;
  const supportCards = t.supportSection?.cards?.length ? t.supportSection.cards : DEFAULT_SUPPORT_CARDS;
  const trustIndicators = t.trustIndicators?.length
    ? t.trustIndicators
    : [{ label: "HIPAA Compliant" }, { label: "Secure & Private" }, { label: "Your information is safe with us" }];

  const sectionMotion = reduceMotion
    ? {}
    : {
        initial: false,
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <section
      id="insurance-made-simple"
      className="relative scroll-mt-28 overflow-hidden bg-[#f7faf8] px-4 py-12 lg:px-8 lg:py-16"
      aria-labelledby="insurance-made-simple-title"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #49b8c8 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <motion.div {...sectionMotion} className="relative mx-auto max-w-7xl">
        <div className="grid items-start gap-10 xl:grid-cols-2 xl:gap-12">
          {/* Left column — hero */}
          <div className="max-w-xl xl:max-w-none">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#86efac]/50 bg-[#ecfdf5] px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#166534]">
              <ShieldCheck size={13} className="text-[#22c55e]" aria-hidden />
              {t.badge}
            </span>

            <h2
              id="insurance-made-simple-title"
              className="mt-5 text-4xl font-black leading-[1.08] tracking-tight md:text-[2.75rem] lg:text-5xl"
            >
              <span className="text-[#1f7a2e]">{t.headingInsurance || "Insurance"}</span>{" "}
              <span className="text-slate-900">{t.headingMade || "Made"}</span>{" "}
              <span className="text-[#1f7a2e]">{t.headingAccent || "Simple"}</span>
            </h2>

            <p className="mt-4 max-w-lg text-base font-medium leading-7 text-slate-600 md:text-lg md:leading-8">
              {t.description}
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {benefitCards.map((card, index) => {
                const Icon = BENEFIT_CARD_ICONS[index] || Shield;
                return (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-[#128c8c]/15 hover:shadow-md"
                  >
                    <div className="mb-2.5 grid h-10 w-10 place-items-center rounded-xl bg-[#eef9f4] text-[#1f7a2e]">
                      <Icon size={20} strokeWidth={2.2} aria-hidden />
                    </div>
                    <p className="text-sm font-extrabold text-[#0b4f4f]">{card.title}</p>
                    <p className="mt-1 text-xs font-medium leading-5 text-slate-600">{card.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={onVerify}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#1f7a2e] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#1f7a2e]/20 transition hover:bg-[#166326] sm:w-auto sm:min-w-[220px]"
              >
                <ShieldCheck size={18} aria-hidden />
                {t.verifyCta}
                <ArrowRight size={18} aria-hidden />
              </button>
              <button
                type="button"
                onClick={onSpeakIntake}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#1f7a2e]/30 bg-white px-5 py-3.5 text-sm font-extrabold text-[#1f7a2e] shadow-sm transition hover:border-[#1f7a2e] hover:bg-[#eef9f4] sm:w-auto"
              >
                <Phone size={17} aria-hidden />
                {t.speakCta}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              {trustIndicators.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500"
                >
                  <LockKeyhole size={13} className="text-[#128c8c]" aria-hidden />
                  {item.label}
                </span>
              ))}
            </div>

            <div className="mt-7 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] p-5 shadow-xl sm:p-6">
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 shrink-0 text-white/90" size={22} aria-hidden />
                <h3 className="text-lg font-extrabold leading-snug text-white sm:text-xl">
                  {t.featureCard?.title || "We Handle the Complex, You Focus on Progress"}
                </h3>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {featureItems.map((item, index) => {
                  const Icon = FEATURE_CARD_ICONS[index] || BookOpen;
                  return (
                    <div key={item.title} className="rounded-xl bg-white/10 p-3.5 backdrop-blur-sm">
                      <div className="mb-2 grid h-9 w-9 place-items-center rounded-lg bg-white/15 text-white">
                        <Icon size={18} aria-hidden />
                      </div>
                      <p className="text-sm font-bold text-white">{item.title}</p>
                      <p className="mt-1 text-xs font-medium leading-5 text-white/80">{item.description}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 flex flex-col gap-2 border-t border-white/15 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-medium leading-5 text-white/85 sm:max-w-[70%]">
                  {t.featureCard?.footer ||
                    "We work with major insurance providers across Virginia and beyond."}
                </p>
                <button
                  type="button"
                  onClick={onVerify}
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-[#f7c72f] transition hover:text-white"
                >
                  {t.featureCard?.viewAllLink || "View all providers"}
                  <ArrowRight size={14} aria-hidden />
                </button>
              </div>
            </div>
          </div>

          {/* Right column — verification + providers + support */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-[#128c8c]/8 sm:p-6 lg:p-7">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#eef9f4] text-[#1f7a2e]">
                  <ShieldCheck size={22} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-xl font-extrabold leading-tight text-[#0b4f4f] sm:text-2xl">{t.cardTitle}</h3>
                      {t.cardSubtitle ? (
                        <p className="mt-1 text-sm font-medium leading-snug text-slate-500">{t.cardSubtitle}</p>
                      ) : null}
                    </div>
                    <span className="inline-flex w-fit shrink-0 items-center self-start rounded-full border border-[#bbf7d0] bg-[#ecfdf5] px-3 py-1.5 text-[10px] font-black uppercase leading-none tracking-wide text-[#166534] sm:mt-0.5">
                      {t.cardBadge}
                    </span>
                  </div>
                </div>
              </div>

              <VerificationSteps steps={verificationSteps} icons={VERIFICATION_STEP_ICONS} />

              <div className="mt-6 grid gap-4 md:grid-cols-2 md:items-stretch">
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-extrabold text-[#0b4f4f]">
                    {t.whatYouReceive?.title || "What you'll receive"}
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {whatYouReceive.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm font-medium leading-snug text-slate-700">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#dcfce7] text-[#1f7a2e]">
                          <ShieldCheck size={12} strokeWidth={2.5} aria-hidden />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex h-full flex-col justify-center rounded-xl border border-[#bbf7d0]/60 bg-[#ecfdf5]/80 p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-[#128c8c] shadow-sm">
                      <FileText size={20} aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold leading-snug text-[#0b4f4f]">
                        {t.reportHighlight?.title || "Clear, Easy-to-Understand Report"}
                      </p>
                      <p className="mt-1.5 text-xs font-medium leading-5 text-slate-600">
                        {t.reportHighlight?.description ||
                          "A family-friendly summary of your benefits and recommended next steps."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-base font-extrabold text-[#0b4f4f] sm:text-lg">
                  {t.providersSection?.title || "We Work With Major Insurance Providers"}
                </h3>
                <button
                  type="button"
                  onClick={onVerify}
                  className="shrink-0 text-xs font-extrabold text-[#128c8c] transition hover:text-[#1f7a2e]"
                >
                  {t.providersSection?.viewAll || "View all"} →
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {insuranceProviders.map((provider, index) => (
                  <ProviderLogoCell
                    key={provider.name}
                    provider={provider}
                    index={index}
                    reduceMotion={reduceMotion}
                  />
                ))}
                <div className="flex min-h-[72px] flex-col items-center justify-center rounded-xl border border-dashed border-[#128c8c]/30 bg-[#eef9f4]/50 p-3 text-center">
                  <p className="text-sm font-extrabold text-[#128c8c]">
                    {t.providersSection?.manyMore || "+ Many More"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-base font-extrabold text-[#0b4f4f] sm:text-lg">
                {t.supportSection?.title || "More Ways We Support You"}
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {supportCards.map((card, index) => {
                  const Icon = SUPPORT_CARD_ICONS[index] || MessageCircle;
                  return (
                    <div
                      key={card.title}
                      className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-[#128c8c]/15 hover:shadow-md"
                    >
                      <div className="mb-2 grid h-9 w-9 place-items-center rounded-lg bg-[#eef9f4] text-[#128c8c]">
                        <Icon size={18} aria-hidden />
                      </div>
                      <p className="text-sm font-extrabold text-[#0b4f4f]">{card.title}</p>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-600">{card.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-start gap-2.5 sm:items-center">
            <LockKeyhole size={18} className="mt-0.5 shrink-0 text-[#128c8c] sm:mt-0" aria-hidden />
            <div>
              <p className="text-sm font-extrabold text-[#0b4f4f]">
                {t.privacyBar?.title || "Your Privacy Matters"}
              </p>
              <p className="text-xs font-medium text-slate-600">
                {t.privacyBar?.text || "Your information is encrypted and handled with care."}{" "}
                {t.disclaimer}{" "}
                <strong className="font-extrabold text-[#1f7a2e]">{t.disclaimerHighlight}</strong>
              </p>
            </div>
          </div>
          <a
            href="#"
            className="inline-flex shrink-0 items-center gap-1 self-start text-xs font-extrabold text-[#128c8c] transition hover:text-[#1f7a2e] sm:self-center"
          >
            {t.privacyBar?.link || "HIPAA & Privacy Practices"}
            <ArrowRight size={14} aria-hidden />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
