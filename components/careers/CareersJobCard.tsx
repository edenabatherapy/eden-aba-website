"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Building2,
  Clock,
  GraduationCap,
  Headphones,
  MapPin,
  Share2,
  Stethoscope,
  Users,
} from "lucide-react";
import CareersActionLink from "@/components/careers/CareersActionLink";
import {
  CAREERS_PAGE,
  DEPARTMENT_ICONS,
  getStatusBadgeClasses,
  type CareersJob,
} from "@/lib/careers-content";
import {
  getJobListingStatus,
  getRequirementsSummary,
  resolveJobApplyHref,
  resolveJobDetailsHref,
} from "@/lib/careers-routes";
import { getButtonClasses } from "@/lib/button-styles";

type CareersJobCardProps = {
  job: CareersJob;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
  onShare: (job: CareersJob) => void;
  shareFeedbackId: string | null;
};

function DepartmentIcon({ department }: { department: string }) {
  const kind = DEPARTMENT_ICONS[department] || "clinical";
  const className = "h-6 w-6";
  switch (kind) {
    case "leadership":
      return <GraduationCap className={className} aria-hidden="true" />;
    case "training":
      return <Users className={className} aria-hidden="true" />;
    case "client":
      return <Headphones className={className} aria-hidden="true" />;
    case "operations":
    case "administration":
      return <Building2 className={className} aria-hidden="true" />;
    default:
      return <Stethoscope className={className} aria-hidden="true" />;
  }
}

export default function CareersJobCard({
  job,
  isSaved,
  onToggleSave,
  onShare,
  shareFeedbackId,
}: CareersJobCardProps) {
  return (
    <article
      className="overflow-hidden rounded-[1.75rem] border border-emerald-100 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
      aria-labelledby={`job-title-${job.id}`}
    >
      <div className="p-6 sm:p-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700 dark:from-emerald-900/40 dark:to-teal-900/30 dark:text-emerald-300">
              <DepartmentIcon department={job.department} />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${getStatusBadgeClasses(job.status)}`}
                >
                  {getJobListingStatus(job)}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
                  <MapPin size={12} aria-hidden="true" />
                  {job.location}
                </span>
              </div>
              <h3
                id={`job-title-${job.id}`}
                className="mt-3 text-xl font-extrabold text-slate-900 dark:text-white sm:text-2xl"
              >
                <CareersActionLink href={resolveJobDetailsHref(job)} className="hover:text-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:hover:text-emerald-300">
                  {job.title}
                </CareersActionLink>
              </h3>
              <p className="mt-2 text-sm font-bold text-slate-600 dark:text-slate-300">
                {job.department} • {job.employment}
              </p>
              <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">{job.summary}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-800 dark:text-slate-200">Requirements: </span>
                {getRequirementsSummary(job)}
              </p>
            </div>
          </div>
        </div>

        <dl className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
            <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">Experience</dt>
            <dd className="text-sm font-bold text-slate-800 dark:text-slate-100">{job.experienceLevel}</dd>
          </div>
          <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
            <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">Credential</dt>
            <dd className="text-sm font-bold text-slate-800 dark:text-slate-100">{job.credential}</dd>
          </div>
          <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60">
            <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">Work Setting</dt>
            <dd className="text-sm font-bold text-slate-800 dark:text-slate-100">{job.workSetting.join(", ")}</dd>
          </div>
          <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60 sm:col-span-2 lg:col-span-3">
            <dt className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
              <Clock size={12} aria-hidden="true" /> Schedule
            </dt>
            <dd className="text-sm font-bold text-slate-800 dark:text-slate-100">{job.schedule.join(", ")}</dd>
          </div>
        </dl>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Role highlights">
          {job.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-full border border-emerald-100 bg-emerald-50/80 px-3 py-1 text-xs font-bold text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200"
            >
              {highlight}
            </li>
          ))}
        </ul>

        <div className="relative z-[111] mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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
            onClick={() => onToggleSave(job.id)}
            className={getButtonClasses(isSaved ? "dark" : "secondary", "w-full sm:w-auto")}
            aria-pressed={isSaved}
            aria-label={isSaved ? `Unsave ${job.title}` : `Save ${job.title}`}
          >
            <Bookmark size={16} className={isSaved ? "fill-current" : ""} aria-hidden="true" />
            {isSaved ? CAREERS_PAGE.unsaveJobLabel : CAREERS_PAGE.saveJobLabel}
          </button>
          <button
            type="button"
            onClick={() => onShare(job)}
            className={getButtonClasses("secondary", "w-full sm:w-auto")}
            aria-label={`Share ${job.title}`}
          >
            <Share2 size={16} aria-hidden="true" />
            {CAREERS_PAGE.shareJobLabel}
          </button>
          {shareFeedbackId === job.id && (
            <span role="status" className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
              {CAREERS_PAGE.shareSuccess}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
