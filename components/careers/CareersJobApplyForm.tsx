"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";
import { getJobDetailsPath } from "@/lib/careers-routes";
import { CAREERS_PAGE, type CareersJob } from "@/lib/careers-content";
import { getButtonClasses } from "@/lib/button-styles";

const inputClassName =
  "h-12 w-full rounded-2xl border border-emerald-100 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-900";

type CareersJobApplyFormProps = {
  job: CareersJob;
};

export default function CareersJobApplyForm({ job }: CareersJobApplyFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8 lg:py-16">
      <Link
        href={getJobDetailsPath(job.id)}
        className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-emerald-300"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to job details
      </Link>

      <header className="mt-8 rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-8 dark:border-slate-700 dark:from-emerald-950/30 dark:via-slate-900 dark:to-teal-950/20">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
          {CAREERS_PAGE.applyPageTitle}
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{job.title}</h1>
        <p className="mt-2 text-sm font-bold text-slate-600 dark:text-slate-300">
          {job.department} • {job.location} • {job.employment}
        </p>
        <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{job.summary}</p>
        {job.isFutureOpening && (
          <p className="mt-4 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-900 dark:border-sky-800 dark:bg-sky-950/30 dark:text-sky-200">
            This is a future opening. Your application will be reviewed for priority consideration when the role
            becomes available.
          </p>
        )}
      </header>

      {submitted ? (
        <div
          role="status"
          className="mt-8 rounded-[1.75rem] border border-emerald-200 bg-white p-8 text-base font-semibold leading-8 text-emerald-900 dark:border-emerald-800 dark:bg-slate-900 dark:text-emerald-200"
        >
          {CAREERS_PAGE.applicationSuccess}
          <div className="mt-6">
            <Link href="/careers" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
              {CAREERS_PAGE.backToCareers}
            </Link>
          </div>
        </div>
      ) : (
        <form className="mt-8 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
          <label className="block sm:col-span-1">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
              Full Name
            </span>
            <input name="fullName" type="text" required autoComplete="name" className={inputClassName} />
          </label>
          <label className="block sm:col-span-1">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
              Email Address
            </span>
            <input name="email" type="email" required autoComplete="email" className={inputClassName} />
          </label>
          <label className="block sm:col-span-1">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
              Phone Number
            </span>
            <input name="phone" type="tel" required autoComplete="tel" className={inputClassName} />
          </label>
          <label className="block sm:col-span-1">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
              Position Applying For
            </span>
            <input
              name="position"
              type="text"
              required
              readOnly
              defaultValue={job.title}
              className={`${inputClassName} bg-slate-50 dark:bg-slate-800/60`}
            />
          </label>
          <label className="block sm:col-span-1">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
              Department
            </span>
            <input
              name="department"
              type="text"
              readOnly
              defaultValue={job.department}
              className={`${inputClassName} bg-slate-50 dark:bg-slate-800/60`}
            />
          </label>
          <label className="block sm:col-span-1">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
              Location
            </span>
            <input
              name="location"
              type="text"
              readOnly
              defaultValue={job.location}
              className={`${inputClassName} bg-slate-50 dark:bg-slate-800/60`}
            />
          </label>
          <label className="block sm:col-span-1">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
              Preferred Start Date
            </span>
            <input name="startDate" type="date" className={inputClassName} />
          </label>
          <label className="block sm:col-span-1">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
              Availability
            </span>
            <input
              name="availability"
              type="text"
              placeholder="e.g. Full-time, weekday mornings"
              className={inputClassName}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
              Resume Upload
            </span>
            <input
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold file:mr-4 file:rounded-full file:border-0 file:bg-emerald-700 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white dark:border-slate-700 dark:bg-slate-900"
            />
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {CAREERS_PAGE.resumeNote}{" "}
              <a
                href={`mailto:${CAREERS_PAGE.recruitmentCta.resumeEmail}`}
                className="font-bold text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-300"
              >
                {CAREERS_PAGE.recruitmentCta.resumeEmail}
              </a>
            </p>
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
              Cover Letter / Message
            </span>
            <textarea
              name="message"
              rows={5}
              className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-900"
            />
          </label>
          <label className="flex items-start gap-3 sm:col-span-2">
            <input
              name="accurate"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
              I confirm that the information provided in this application is accurate to the best of my knowledge.
            </span>
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className={getButtonClasses("primary", "w-full sm:w-auto")}
              aria-busy={submitting}
            >
              {submitting ? "Submitting..." : CAREERS_PAGE.submitApplication}
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
