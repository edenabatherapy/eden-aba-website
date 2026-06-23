"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { HOME_INSURANCE_LOGOS } from "@/lib/home-insurance-logos";

export type InsuranceToolboxContent = {
  headline?: string;
  subheadline?: string;
  disclaimer?: string;
  verifyCta?: string;
  viewCoverageLink?: string;
};

type InsuranceLogoToolboxProps = {
  t: InsuranceToolboxContent;
  onVerify: () => void;
  coverageHref?: string;
};

function LogoCard({ name, logo, compact = false }: { name: string; logo: string; compact?: boolean }) {
  return (
    <div className="flex h-24 items-center justify-center rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <Image
        src={logo}
        alt={`${name} insurance logo`}
        width={180}
        height={72}
        className={`w-auto max-w-full object-contain ${compact ? "max-h-12" : "max-h-14"}`}
      />
    </div>
  );
}

export default function InsuranceLogoToolbox({
  t,
  onVerify,
  coverageHref = "/insurance-coverage",
}: InsuranceLogoToolboxProps) {
  return (
    <div
      className="overflow-hidden rounded-3xl border border-emerald-100/80 bg-gradient-to-br from-[#eef9f4] via-white to-[#f6fbf7] p-6 shadow-lg shadow-emerald-900/5 sm:p-8 lg:p-10"
      aria-labelledby="insurance-toolbox-heading"
    >
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10 xl:gap-12">
        {/* Left — copy + CTAs */}
        <div className="min-w-0">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#1f7a2e] text-white shadow-md">
              <ShieldCheck size={24} aria-hidden />
            </div>
            <div className="min-w-0">
              <h3
                id="insurance-toolbox-heading"
                className="text-2xl font-black leading-tight text-[#0b4f4f] sm:text-3xl"
              >
                {t.headline}
              </h3>
            </div>
          </div>

          <p className="mt-5 text-base font-medium leading-8 text-slate-600">{t.subheadline}</p>

          <p className="mt-4 rounded-2xl border border-emerald-100/80 bg-white/70 px-4 py-3 text-sm font-medium leading-6 text-slate-600">
            {t.disclaimer}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={onVerify}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1f7a2e] px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#1f7a2e]/20 transition hover:bg-[#166326] sm:w-auto"
            >
              {t.verifyCta}
              <ArrowRight size={18} aria-hidden />
            </button>
            <Link
              href={coverageHref}
              className="inline-flex w-full items-center justify-center gap-1 rounded-2xl border-2 border-[#1f7a2e]/20 bg-white px-6 py-3.5 text-sm font-extrabold text-[#1f7a2e] transition hover:border-[#1f7a2e]/40 hover:bg-[#f6fbf7] sm:w-auto"
            >
              {t.viewCoverageLink}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>

        {/* Right — logo grid */}
        <div
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5"
          role="list"
          aria-label="Insurance plans Eden ABA Therapy can help review"
        >
          {HOME_INSURANCE_LOGOS.map((plan) => (
            <div key={plan.name} role="listitem">
              <LogoCard name={plan.name} logo={plan.src} compact={plan.compact} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
