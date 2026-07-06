"use client";

import { Fragment } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  HandHeart,
  Lock,
  Phone,
  Search,
  ShieldCheck,
} from "lucide-react";
import InsuranceProviderLogoGrid from "@/components/InsuranceProviderLogoGrid";

const HERO_IMAGE = "/images/services/insurance-support.webp";

const CTA_LABEL = "Verify My Insurance";

const processSteps = [
  {
    number: 1,
    icon: ClipboardCheck,
    title: "Verify Insurance",
    text: "Submit your insurance information securely in less than 60 seconds.",
  },
  {
    number: 2,
    icon: Search,
    title: "We Review Benefits",
    text: "Our team verifies your benefits and explains your coverage.",
  },
  {
    number: 3,
    icon: HandHeart,
    title: "Start Services",
    text: "We guide you through the next steps and help your child begin ABA.",
  },
];

const stats = [
  {
    value: "98%",
    label: "Verification Success Rate",
    note: "Most families get coverage",
  },
  {
    value: "24 Hours",
    label: "Average response time",
    note: "",
  },
  {
    value: "100%",
    label: "HIPAA Secure",
    note: "Your information is safe",
  },
  {
    value: "50+",
    label: "Insurance Plans Accepted",
    note: "We accept most major plans",
  },
];

type InsuranceSectionProps = {
  onVerify?: () => void;
  intakePhone?: string;
};

function phoneHref(phone?: string) {
  const digits = (phone || "").replace(/\D/g, "");
  return digits ? `tel:${digits}` : undefined;
}

function VerifyButton({ onClick, className = "" }: { onClick?: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-7 py-4 text-base font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-xl ${className}`}
    >
      {CTA_LABEL}
      <ArrowRight size={18} aria-hidden />
    </button>
  );
}

export default function InsuranceSection({ onVerify, intakePhone }: InsuranceSectionProps) {
  const telLink = phoneHref(intakePhone);

  return (
    <section className="w-full bg-gradient-to-b from-emerald-50/40 via-white to-white py-16 sm:py-20 lg:py-24" aria-labelledby="insurance-section-heading">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:space-y-10 lg:px-8">
        {/* Hero */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="mb-5 inline-flex items-center rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700 shadow-sm">
              Insurance Verification
            </div>

            <h2
              id="insurance-section-heading"
              className="max-w-xl text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]"
            >
              Check ABA Insurance Coverage{" "}
              <span className="text-emerald-700">in Minutes</span>
            </h2>

            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
              Tell us your insurance provider and we&apos;ll verify your ABA benefits, explain your coverage, and
              guide you through the next steps.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <VerifyButton onClick={onVerify} />

              {telLink ? (
                <a
                  href={telLink}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-white px-7 py-4 text-base font-bold text-emerald-800 shadow-sm transition hover:bg-emerald-50"
                >
                  <Phone size={18} aria-hidden />
                  Call Intake Team
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 text-base font-bold text-slate-400"
                >
                  <Phone size={18} aria-hidden />
                  Call Intake Team
                </button>
              )}
            </div>

            <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
              {["HIPAA Secure", "Response Within 24 Hours", "No Referral Required"].map((badge) => (
                <li key={badge} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={16} className="shrink-0 text-emerald-600" aria-hidden />
                  {badge}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-emerald-950/10 ring-1 ring-emerald-100">
              <img
                src={HERO_IMAGE}
                alt="Parent and child playing with blocks during ABA therapy support at home"
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/6] lg:aspect-[4/5]"
                loading="lazy"
              />
            </div>

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[18rem] sm:p-5">
              <p className="text-sm font-bold leading-6 text-slate-800 sm:text-[0.95rem]">
                We make insurance simple so you can focus on your child.
              </p>
            </div>
          </div>
        </div>

        <InsuranceProviderLogoGrid />

        {/* Process */}
        <div className="rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/60 p-8 shadow-sm sm:p-10 lg:p-12">
          <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Our Simple Process</p>
          <h3 className="mt-2 text-center text-3xl font-extrabold text-slate-900 sm:text-4xl">Getting started is easy</h3>

          <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-4">
            {processSteps.map((step, index) => (
              <Fragment key={step.title}>
                <article className="flex-1 rounded-2xl border border-white bg-white/90 p-6 shadow-md shadow-emerald-900/5">
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                        <step.icon size={22} strokeWidth={2.2} aria-hidden />
                      </div>
                      <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-700 text-[10px] font-black text-white">
                        {step.number}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-extrabold text-slate-900">{step.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
                    </div>
                  </div>
                </article>

                {index < processSteps.length - 1 ? (
                  <div className="hidden shrink-0 items-center justify-center lg:flex" aria-hidden>
                    <ArrowRight size={22} className="text-emerald-400" />
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <VerifyButton onClick={onVerify} className="px-8" />
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-lg shadow-slate-200/50 sm:p-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="text-3xl font-extrabold text-emerald-700 sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-base font-bold text-slate-900">{stat.label}</p>
                {stat.note ? <p className="mt-1 text-sm text-slate-600">{stat.note}</p> : null}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-slate-100 pt-6 text-xs font-semibold text-slate-500 lg:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <Lock size={14} className="text-emerald-600" aria-hidden />
              HIPAA Secure
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-600" aria-hidden />
              Trusted intake support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
