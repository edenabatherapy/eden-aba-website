"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import CareersActionLink from "@/components/careers/CareersActionLink";
import { CAREERS_PAGE } from "@/lib/careers-content";
import { HOMEPAGE_OPEN_JOBS } from "@/lib/careers/jobs-data";
import { resolveJobApplyHref, resolveJobDetailsHref } from "@/lib/careers-routes";
import { getButtonClasses } from "@/lib/button-styles";

export default function CareersHomeSection() {
  const careersPage = useLocalizedContent("CAREERS_PAGE", CAREERS_PAGE);

  const featured = HOMEPAGE_OPEN_JOBS.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8" aria-labelledby="home-careers-heading">
      <div className="rounded-[2.5rem] bg-gradient-to-br from-emerald-50 via-white to-yellow-50 p-8 md:p-12 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
              {careersPage.hero.badge}
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold text-emerald-800 dark:border-slate-700 dark:bg-slate-900 dark:text-emerald-200">
              <MapPin size={14} aria-hidden="true" />
              {careersPage.hero.locationChip}
            </div>
            <h2 id="home-careers-heading" className="mt-4 text-4xl font-black text-emerald-950 dark:text-white">
              {careersPage.hero.headline}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {careersPage.hero.subheadline}
            </p>
          </div>
          <Link href="/careers/open-roles" className={getButtonClasses("primary", "shrink-0")}>
            Search Open Roles
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4">
          {featured.map((job) => (
            <div
              key={job.id}
              className="flex flex-col justify-between gap-4 rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 md:flex-row md:items-center"
            >
              <div>
                <p className="text-xl font-black text-emerald-950 dark:text-white">{job.title}</p>
                <p className="mt-1 text-sm font-bold text-slate-600 dark:text-slate-300">
                  {job.department} • {job.employment} • {job.location}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{job.summary}</p>
              </div>
              <div className="relative z-[111] flex flex-col gap-2 sm:flex-row sm:items-center">
                {/* LOCKED: Do not change careers button routes unless intentionally updating the careers application flow. */}
                <CareersActionLink href={resolveJobDetailsHref(job)} className={getButtonClasses("secondary", "shrink-0")}>
                  {careersPage.viewDetailsLabel}
                </CareersActionLink>
                <CareersActionLink href={resolveJobApplyHref(job)} className={getButtonClasses("dark", "shrink-0")}>
                  {careersPage.applyLabel}
                  <ArrowRight size={16} aria-hidden="true" />
                </CareersActionLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
