"use client";

import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  CAREERS_PAGE,
  FILTER_OPTIONS,
} from "@/lib/careers-content";
import { getButtonClasses } from "@/lib/button-styles";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const inputClassName =
  "h-12 w-full rounded-2xl border border-emerald-100 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-900";

export default function CareersTalentNetwork() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="talent-network" className="px-4 py-16 lg:px-8" aria-labelledby="recruitment-cta-heading">
      <motion.div
        {...fadeUp}
        className="mx-auto max-w-5xl rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-8 shadow-xl dark:border-slate-700 dark:from-emerald-950/30 dark:via-slate-900 dark:to-teal-950/20 sm:p-12"
      >
        <div className="max-w-2xl">
          <h2 id="recruitment-cta-heading" className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            {CAREERS_PAGE.recruitmentCta.headline}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
            {CAREERS_PAGE.recruitmentCta.body}
          </p>
        </div>

        {submitted ? (
          <div
            role="status"
            className="mt-8 rounded-[1.5rem] border border-emerald-200 bg-white p-6 text-base font-semibold leading-7 text-emerald-900 dark:border-emerald-800 dark:bg-slate-900 dark:text-emerald-200"
          >
            Thank you. Eden ABA Therapy will contact you when a matching role becomes available.
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
                Email
              </span>
              <input name="email" type="email" required autoComplete="email" className={inputClassName} />
            </label>
            <label className="block sm:col-span-1">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
                Phone
              </span>
              <input name="phone" type="tel" autoComplete="tel" className={inputClassName} />
            </label>
            <label className="block sm:col-span-1">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
                Desired Role
              </span>
              <input name="desiredRole" type="text" required className={inputClassName} />
            </label>
            <label className="block sm:col-span-1">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
                Preferred Location
              </span>
              <select name="preferredLocation" required className={inputClassName} defaultValue="">
                <option value="" disabled>
                  Select a location
                </option>
                {FILTER_OPTIONS.locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-1">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
                Employment Type
              </span>
              <select name="employmentType" required className={inputClassName} defaultValue="">
                <option value="" disabled>
                  Select employment type
                </option>
                {FILTER_OPTIONS.employmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <div className="sm:col-span-2">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Email your resume to{" "}
                <a
                  href={`mailto:${CAREERS_PAGE.recruitmentCta.resumeEmail}`}
                  className="font-bold text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-300"
                >
                  {CAREERS_PAGE.recruitmentCta.resumeEmail}
                </a>
              </p>
            </div>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
                Message
              </span>
              <textarea
                name="message"
                rows={4}
                className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-900"
              />
            </label>
            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:flex-wrap">
              <button
                type="submit"
                disabled={submitting}
                className={getButtonClasses("primary", "w-full sm:w-auto")}
                aria-busy={submitting}
              >
                {submitting ? "Submitting..." : CAREERS_PAGE.recruitmentCta.primaryCta}
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <a
                href={`mailto:${CAREERS_PAGE.recruitmentCta.resumeEmail}?subject=Eden%20ABA%20Therapy%20Recruiting%20Inquiry`}
                className={getButtonClasses("secondary", "w-full sm:w-auto")}
              >
                {CAREERS_PAGE.recruitmentCta.secondaryCta}
              </a>
            </div>
          </form>
        )}
      </motion.div>
    </section>
  );
}
