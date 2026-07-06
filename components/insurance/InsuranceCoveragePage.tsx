"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  FileSignature,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import InsuranceProviderLogoGrid from "@/components/InsuranceProviderLogoGrid";
import InsuranceVerificationForm from "@/components/InsuranceVerificationForm";
import {
  INSURANCE_COVERAGE_PAGE_DISCLAIMER,
  INSURANCE_COVERAGE_PAGE_LOGOS,
} from "@/lib/insurance-coverage-logos";
import { getButtonClasses } from "@/lib/button-styles";
import { SITE_IMAGES } from "@/lib/site-images";

const OVERVIEW_ICONS = [ShieldCheck, ClipboardCheck, HeartHandshake];
const VIRGINIA_CARD_ICONS = [ShieldCheck, BadgeCheck, ClipboardCheck];
const PRIOR_AUTH_ICONS = [Stethoscope, Clock3, FileSignature, HeartHandshake];

const sectionPad = "px-4 py-16 lg:px-8 lg:py-20";
const cardClass =
  "flex h-full flex-col rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-lg shadow-emerald-900/5 sm:p-8";

type InsuranceCoveragePageProps = {
  t: {
    pages: {
      insurance: Record<string, unknown>;
    };
    insuranceForm?: Record<string, unknown>;
    [key: string]: unknown;
  };
  onSchedule: () => void;
  onHome: () => void;
  onStart: () => void;
};

function MiniCheck({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-sm font-semibold leading-7 text-slate-700">
      <CheckCircle2 className="mt-1 shrink-0 text-[#1f7a2e]" size={18} aria-hidden />
      {children}
    </li>
  );
}

export default function InsuranceCoveragePage({ t, onSchedule, onHome, onStart }: InsuranceCoveragePageProps) {
  const ins = t.pages.insurance as {
    submitted: {
      title: string;
      intro: string;
      followUp: string;
      scheduleAppointment: string;
      returnHome: string;
    };
    hero: {
      eyebrow: string;
      title: string;
      intro: string;
      verifyInsurance: string;
      startABA: string;
      supportItems: string[];
      imageAlt: string;
    };
    virginia: {
      badge: string;
      title: string;
      intro: string;
      coverageOptionsTitle?: string;
      prepareTitle: string;
      prepareItems: string[];
      cards: [string, string][];
      helpTitle: string;
      helpItems: string[];
      plansTitle: string;
      plansIntro: string;
      plansDisclaimer?: string;
    };
    priorAuth: {
      badge: string;
      title: string;
      intro: string;
      steps: [string, string][];
      disclaimer: string;
      imageAlt: string;
    };
    faqTitle: string;
    faqs: [string, string][];
  };

  const [openFaq, setOpenFaq] = useState(ins.faqs[0]?.[0] || "");

  const va = ins.virginia;
  const pa = ins.priorAuth;
  const virginiaCards = va.cards.map(([title, text], i) => [VIRGINIA_CARD_ICONS[i], title, text] as const);

  const scrollToVerify = () =>
    document.getElementById("verify-form")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="eden-page-shell min-h-screen text-slate-900">
      {/* 1. Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br from-[#fff8df] via-white to-[#ddf4f4] ${sectionPad}`}>
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">{ins.hero.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#0b4f4f] sm:text-5xl lg:text-6xl">
              {ins.hero.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-9 text-slate-700">{ins.hero.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button type="button" onClick={scrollToVerify} className={getButtonClasses("primarySite")}>
                {ins.hero.verifyInsurance}
                <ArrowRight size={18} aria-hidden />
              </button>
              <button type="button" onClick={onStart} className={getButtonClasses("secondarySite")}>
                {ins.hero.startABA}
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-8 -top-8 h-36 w-36 rounded-full bg-[#f7c72f]" aria-hidden />
            <div className="relative h-[360px] w-full overflow-hidden rounded-[2rem] shadow-2xl ring-8 ring-white sm:h-[440px] sm:rounded-[3rem]">
              <Image
                src={SITE_IMAGES.insurance.hero}
                alt={ins.hero.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three overview cards */}
      <section className={`bg-[#eef9f4] ${sectionPad}`}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            {ins.hero.supportItems.map((item, index) => {
              const Icon = OVERVIEW_ICONS[index] || ShieldCheck;
              return (
                <article key={item} className={cardClass}>
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#ddf4f4] to-[#fff8df] text-[#1f7a2e]">
                    <Icon size={28} aria-hidden />
                  </div>
                  <h2 className="mt-5 flex-1 text-lg font-black leading-snug text-[#0b4f4f] sm:text-xl">{item}</h2>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. What Families Should Prepare */}
      <section className={sectionPad}>
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#49b8c8]/30 bg-[#eef9f4] px-5 py-2.5 text-sm font-black text-[#0b4f4f]">
            <MapPin size={18} className="text-[#1f7a2e]" aria-hidden />
            {va.badge}
          </div>
          <h2 className="mt-6 text-3xl font-black leading-tight text-[#0b4f4f] sm:text-4xl md:text-5xl">
            {va.prepareTitle}
          </h2>
          <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{va.intro}</p>
          <article className={`mt-8 ${cardClass}`}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {va.prepareItems.map((item) => (
                <MiniCheck key={item}>{item}</MiniCheck>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* 4. Coverage Options in Virginia */}
      <section className={`bg-[#eef9f4] ${sectionPad}`}>
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black text-[#0b4f4f] sm:text-4xl md:text-5xl">
            {va.coverageOptionsTitle || "Coverage Options in Virginia"}
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {virginiaCards.map(([Icon, title, text]) => (
              <article key={title} className={cardClass}>
                <div className="flex items-start gap-5">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#ddf4f4] to-[#fff8df] text-[#1f7a2e]">
                    <Icon size={30} aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#0b4f4f] sm:text-2xl">{title}</h3>
                    <p className="mt-3 font-semibold leading-8 text-slate-700">{text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How Eden Helps */}
      <section className={sectionPad}>
        <div className="mx-auto max-w-5xl">
          <article className={`${cardClass} bg-gradient-to-br from-white to-[#ddf4f4]/40`}>
            <h2 className="text-3xl font-black text-[#0b4f4f] sm:text-4xl">{va.helpTitle}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {va.helpItems.map((item) => (
                <MiniCheck key={item}>{item}</MiniCheck>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* 6. Insurance Plans We Can Help Review */}
      <section className={`bg-[#eef9f4] ${sectionPad}`}>
        <div className="mx-auto max-w-7xl">
          <InsuranceProviderLogoGrid
            title={va.plansTitle}
            subtitle={va.plansIntro}
            disclaimer={INSURANCE_COVERAGE_PAGE_DISCLAIMER}
            logos={INSURANCE_COVERAGE_PAGE_LOGOS}
            variant="homepage"
          />
        </div>
      </section>

      {/* 7. Prior Authorization Support */}
      <section className={sectionPad}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-[#f7c72f]/70" aria-hidden />
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-[2.5rem] bg-[#49b8c8]/20" aria-hidden />
            <div className="relative h-[360px] w-full overflow-hidden rounded-[2rem] shadow-2xl ring-8 ring-white sm:h-[420px] sm:rounded-[2.5rem]">
              <Image
                src={SITE_IMAGES.insurance.priorAuth}
                alt={pa.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <article className={`order-1 lg:order-2 ${cardClass}`}>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#eef9f4] px-4 py-2 text-sm font-black text-[#1f7a2e]">
              <ClipboardCheck size={18} aria-hidden />
              {pa.badge}
            </div>
            <h2 className="mt-5 text-3xl font-black leading-tight text-[#0b4f4f] sm:text-4xl md:text-5xl">{pa.title}</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">{pa.intro}</p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {pa.steps.map(([title, text], i) => {
                const Icon = PRIOR_AUTH_ICONS[i];
                return (
                  <div
                    key={title}
                    className="flex h-full flex-col rounded-2xl border border-emerald-50 bg-gradient-to-br from-white to-[#eef9f4] p-5 shadow-sm"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1f7a2e] text-white">
                      <Icon size={24} aria-hidden />
                    </div>
                    <h3 className="mt-4 text-lg font-black text-[#0b4f4f]">{title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{text}</p>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 rounded-2xl bg-[#fff8df] p-5 text-base font-bold leading-7 text-[#0b4f4f]">{pa.disclaimer}</p>
          </article>
        </div>
      </section>

      {/* 8. Secure Insurance Verification Form */}
      <section id="verify-form" className={`scroll-mt-24 bg-[#fff8df] ${sectionPad}`}>
        <div className="mx-auto max-w-5xl">
          <InsuranceVerificationForm t={t} onSchedule={onSchedule} onHome={onHome} onStart={onStart} />
        </div>
      </section>

      {/* 9. FAQ */}
      <section className={sectionPad}>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-black text-[#0b4f4f] sm:text-4xl md:text-5xl">{ins.faqTitle}</h2>
          </div>
          <div className="grid gap-3">
            {ins.faqs.map(([question, answer]) => (
              <div key={question} className="rounded-2xl border border-emerald-100 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === question ? "" : question)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-black text-[#0b4f4f]"
                  aria-expanded={openFaq === question}
                >
                  {question}
                  <ChevronDown
                    className={openFaq === question ? "rotate-180 transition" : "transition"}
                    size={20}
                    aria-hidden
                  />
                </button>
                {openFaq === question ? (
                  <div className="border-t border-slate-100 px-5 pb-5 pt-4 text-base font-medium leading-8 text-slate-700">
                    {answer}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
