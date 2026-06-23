"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getButtonClasses } from "@/lib/button-styles";

type CareerCTAProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function CareerCTA({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CareerCTAProps) {
  return (
    <section className="rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-8 dark:border-slate-700 dark:from-emerald-950/30 dark:via-slate-900 dark:to-teal-950/20 sm:p-10">
      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">{description}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link href={primaryHref} className={getButtonClasses("primary", "w-full sm:w-auto")}>
          {primaryLabel}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        {secondaryLabel && secondaryHref && (
          <Link href={secondaryHref} className={getButtonClasses("secondary", "w-full sm:w-auto")}>
            {secondaryLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
