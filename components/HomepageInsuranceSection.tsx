"use client";

import {
  ArrowRight,
  CircleDollarSign,
  ClipboardList,
  MessageCircle,
  Phone,
  Shield,
  ShieldCheck,
  Users,
} from "lucide-react";
import InsuranceLogoToolbox, { type InsuranceToolboxContent } from "@/components/home/InsuranceLogoToolbox";

const BENEFIT_ICONS = [ShieldCheck, ClipboardList, CircleDollarSign, Users];
const STEP_ICONS = [ClipboardList, ShieldCheck, MessageCircle];

export type HomepageInsuranceContent = {
  eyebrow?: string;
  headlineBefore?: string;
  headlineAccent?: string;
  headlineAfter?: string;
  intro?: string;
  benefits?: Array<{ title: string; description: string }>;
  verifyCta?: string;
  talkCta?: string;
  trustNote?: string;
  processTitle?: string;
  processSubtitle?: string;
  processSteps?: Array<{ title: string; description: string }>;
  toolbox?: InsuranceToolboxContent;
};

type HomepageInsuranceSectionProps = {
  t: HomepageInsuranceContent;
  onVerify: () => void;
  onTalkToTeam: () => void;
};

export default function HomepageInsuranceSection({ t, onVerify, onTalkToTeam }: HomepageInsuranceSectionProps) {
  const benefits = t.benefits ?? [];
  const steps = t.processSteps ?? [];

  return (
    <section
      id="insurance-support"
      className="scroll-mt-28 bg-white px-4 py-16 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="homepage-insurance-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#bbf7d0] bg-[#ecfdf5] px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#166534]">
              <Shield size={14} className="text-[#22c55e]" aria-hidden />
              {t.eyebrow}
            </span>

            <h2
              id="homepage-insurance-heading"
              className="mt-6 text-4xl font-black leading-[1.12] tracking-tight text-[#0b4f4f] sm:text-[2.65rem] lg:text-5xl xl:text-[3.25rem]"
            >
              {t.headlineBefore}{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10 font-serif italic text-[#1f7a2e]">{t.headlineAccent}</span>
                <span
                  className="absolute -bottom-1 left-0 right-0 z-0 h-3 rounded-full bg-[#f7c72f]/55 sm:h-3.5"
                  aria-hidden
                />
              </span>{" "}
              {t.headlineAfter}
            </h2>

            <p className="mt-5 max-w-xl text-base font-medium leading-8 text-slate-600 sm:text-lg">{t.intro}</p>

            <ul className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6">
              {benefits.map((benefit, index) => {
                const Icon = BENEFIT_ICONS[index] ?? ShieldCheck;
                return (
                  <li key={benefit.title} className="flex gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#eef9f4] text-[#1f7a2e] ring-1 ring-[#cde6d2]/80">
                      <Icon size={20} strokeWidth={2.2} aria-hidden />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-sm font-extrabold leading-snug text-[#0b4f4f] sm:text-base">{benefit.title}</p>
                      <p className="mt-1 text-sm font-medium leading-6 text-slate-600">{benefit.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={onVerify}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#1f7a2e] px-7 py-4 text-base font-extrabold text-white shadow-lg shadow-[#1f7a2e]/20 transition hover:bg-[#166326] sm:w-auto"
              >
                {t.verifyCta}
                <ArrowRight size={18} aria-hidden />
              </button>
              <button
                type="button"
                onClick={onTalkToTeam}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#1f7a2e]/25 bg-white px-7 py-4 text-base font-extrabold text-[#1f7a2e] shadow-sm transition hover:border-[#1f7a2e]/45 hover:bg-[#f6fbf7] sm:w-auto"
              >
                <Phone size={18} aria-hidden />
                {t.talkCta}
              </button>
            </div>

            <p className="mt-5 flex items-start gap-2 text-sm font-semibold leading-6 text-slate-500">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#128c8c]" aria-hidden />
              {t.trustNote}
            </p>
          </div>

          <div className="min-w-0 lg:pt-2">
            <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8 lg:p-9">
              <h3 className="text-2xl font-black leading-tight text-[#0b4f4f] sm:text-[1.75rem]">{t.processTitle}</h3>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-600 sm:text-base">{t.processSubtitle}</p>

              <ol className="relative mt-8 space-y-0">
                {steps.map((step, index) => {
                  const Icon = STEP_ICONS[index] ?? ClipboardList;
                  const isLast = index === steps.length - 1;

                  return (
                    <li key={step.title} className="relative flex gap-4 pb-8 last:pb-0">
                      {!isLast && (
                        <span
                          className="absolute left-5 top-12 bottom-0 w-px border-l-2 border-dashed border-slate-200"
                          aria-hidden
                        />
                      )}
                      <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#eef9f4] text-[#128c8c] ring-1 ring-[#cde6d2]/70">
                        <Icon size={20} strokeWidth={2.2} aria-hidden />
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <p className="text-base font-extrabold text-[#0b4f4f]">{step.title}</p>
                        <p className="mt-1.5 text-sm font-medium leading-6 text-slate-600">{step.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>

        {t.toolbox && (
          <div className="mt-12">
            <InsuranceLogoToolbox t={t.toolbox} onVerify={onVerify} coverageHref="/insurance-coverage" />
          </div>
        )}
      </div>
    </section>
  );
}
