"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo } from "react";
import CareersActionLink from "@/components/careers/CareersActionLink";
import { ALL_JOBS } from "@/lib/careers/jobs-data";
import { CAREERS_PAGE } from "@/lib/careers-content";
import { resolveJobApplyHref, resolveJobDetailsHref } from "@/lib/careers-routes";
import { useSavedJobs } from "@/components/careers/useSavedJobs";
import { getButtonClasses } from "@/lib/button-styles";

export default function CareersSavedJobsView() {
  const { savedIds, hydrated, toggleSaved } = useSavedJobs();

  const savedJobs = useMemo(() => {
    return savedIds
      .map((id) => ALL_JOBS.find((job) => job.id === id))
      .filter((job): job is (typeof ALL_JOBS)[number] => Boolean(job));
  }, [savedIds]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
      <Link
        href="/careers"
        className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900 dark:text-emerald-300"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        {CAREERS_PAGE.backToCareers}
      </Link>

      <h1 className="mt-8 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
        {CAREERS_PAGE.savedJobsTitle}
      </h1>

      {!hydrated ? (
        <p className="mt-6 text-base font-semibold text-slate-600 dark:text-slate-300">Loading saved roles...</p>
      ) : savedJobs.length === 0 ? (
        <div className="mt-8 rounded-[1.75rem] border border-emerald-100 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-base font-semibold text-slate-700 dark:text-slate-300">{CAREERS_PAGE.savedJobsEmpty}</p>
          <Link href="/careers" className={`${getButtonClasses("primary")} mt-6 inline-flex`}>
            {CAREERS_PAGE.browseRoles}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4">
          {savedJobs.map((job) => (
            <li
              key={job.id}
              className="rounded-[1.5rem] border border-emerald-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{job.title}</h2>
              <p className="mt-1 text-sm font-bold text-slate-600 dark:text-slate-300">
                {job.department} • {job.location} • {job.employment}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{job.summary}</p>
              <div className="relative z-[111] mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {/* LOCKED: Do not change careers button routes unless intentionally updating the careers application flow. */}
                <CareersActionLink href={resolveJobApplyHref(job)} className={getButtonClasses("primary", "w-full sm:w-auto")}>
                  {CAREERS_PAGE.applyLabel}
                  <ArrowRight size={16} aria-hidden="true" />
                </CareersActionLink>
                <CareersActionLink href={resolveJobDetailsHref(job)} className={getButtonClasses("secondary", "w-full sm:w-auto")}>
                  {CAREERS_PAGE.viewDetailsLabel}
                </CareersActionLink>
                <button
                  type="button"
                  onClick={() => toggleSaved(job.id)}
                  className={getButtonClasses("secondary", "w-full sm:w-auto")}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
