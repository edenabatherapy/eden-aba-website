"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Bookmark, MapPin, Share2 } from "lucide-react";
import { useState } from "react";
import CareersActionLink from "@/components/careers/CareersActionLink";
import {
  CAREERS_PAGE,
  getStatusBadgeClasses,
  type CareersJob,
} from "@/lib/careers-content";
import { resolveJobApplyHref } from "@/lib/careers-routes";
import { shareJob } from "@/lib/careers-share";
import { useSavedJobs } from "@/components/careers/useSavedJobs";
import { getButtonClasses } from "@/lib/button-styles";

type CareersJobDetailsViewProps = {
  job: CareersJob;
};

export default function CareersJobDetailsView({ job }: CareersJobDetailsViewProps) {
  const applyHref = resolveJobApplyHref(job);
  const { toggleSaved, isSaved, hydrated } = useSavedJobs();
  const saved = hydrated && isSaved(job.id);
  const [shareMessage, setShareMessage] = useState<string | null>(null);

  const handleShare = async () => {
    const result = await shareJob(job);
    if (result === "copied") {
      setShareMessage(CAREERS_PAGE.shareSuccess);
    } else if (result === "shared") {
      setShareMessage("Job shared.");
    }
    if (result !== "failed") {
      window.setTimeout(() => setShareMessage(null), 2500);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
      <Link
        href="/careers"
        className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900 dark:text-emerald-300"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        {CAREERS_PAGE.backToCareers}
      </Link>

      <header className="mt-8 rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-8 dark:border-slate-700 dark:from-emerald-950/30 dark:via-slate-900 dark:to-teal-950/20">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${getStatusBadgeClasses(job.status)}`}
          >
            {job.status}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
            <MapPin size={12} aria-hidden="true" />
            {job.location}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{job.title}</h1>
        <p className="mt-2 text-sm font-bold text-slate-600 dark:text-slate-300">
          {job.department} • {job.employment} • {job.experienceLevel}
        </p>
        <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{job.summary}</p>

        <div className="relative z-[111] mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {/* LOCKED: Do not change careers button routes unless intentionally updating the careers application flow. */}
          <CareersActionLink href={applyHref} className={getButtonClasses("primary", "w-full sm:w-auto")}>
            {CAREERS_PAGE.applyLabel}
            <ArrowRight size={16} aria-hidden="true" />
          </CareersActionLink>
          <button
            type="button"
            onClick={() => toggleSaved(job.id)}
            className={getButtonClasses(saved ? "dark" : "secondary", "w-full sm:w-auto")}
            aria-pressed={saved}
          >
            <Bookmark size={16} className={saved ? "fill-current" : ""} aria-hidden="true" />
            {saved ? CAREERS_PAGE.unsaveJobLabel : CAREERS_PAGE.saveJobLabel}
          </button>
          <button type="button" onClick={handleShare} className={getButtonClasses("secondary", "w-full sm:w-auto")}>
            <Share2 size={16} aria-hidden="true" />
            {CAREERS_PAGE.shareJobLabel}
          </button>
          {shareMessage && (
            <span role="status" className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
              {shareMessage}
            </span>
          )}
        </div>
      </header>

      <div className="mt-10 space-y-10">
        <section aria-labelledby="job-overview">
          <h2 id="job-overview" className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Overview
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{job.details.overview}</p>
        </section>

        <section aria-labelledby="job-responsibilities">
          <h2 id="job-responsibilities" className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Responsibilities
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-8 text-slate-600 dark:text-slate-300">
            {job.details.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="job-qualifications">
          <h2 id="job-qualifications" className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Qualifications
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-8 text-slate-600 dark:text-slate-300">
            {job.details.qualifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="job-preferred">
          <h2 id="job-preferred" className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Preferred Experience
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-8 text-slate-600 dark:text-slate-300">
            {job.details.preferredExperience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="job-benefits">
          <h2 id="job-benefits" className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Benefits
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-8 text-slate-600 dark:text-slate-300">
            {job.details.benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="job-schedule">
          <h2 id="job-schedule" className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Schedule
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{job.details.schedule}</p>
        </section>

        <section aria-labelledby="job-location">
          <h2 id="job-location" className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Location / Service Area
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
            {job.details.locationServiceArea}
          </p>
        </section>

        <section
          aria-labelledby="job-apply-cta"
          className="rounded-[1.75rem] border border-emerald-100 bg-emerald-50/60 p-8 dark:border-slate-700 dark:bg-emerald-950/20"
        >
          <h2 id="job-apply-cta" className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Ready to Apply?
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
            Submit your application for {job.title} at Eden ABA Therapy.
          </p>
          <div className="relative z-[111] mt-5">
            {/* LOCKED: Do not change careers button routes unless intentionally updating the careers application flow. */}
            <CareersActionLink href={applyHref} className={getButtonClasses("primary")}>
              {CAREERS_PAGE.applyLabel}
              <ArrowRight size={16} aria-hidden="true" />
            </CareersActionLink>
          </div>
        </section>
      </div>
    </div>
  );
}
