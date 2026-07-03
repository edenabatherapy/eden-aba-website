"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";
import { FILTER_OPTIONS } from "@/lib/careers-content";
import { getButtonClasses } from "@/lib/button-styles";

const inputClassName =
  "h-12 w-full rounded-2xl border border-emerald-100 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-900";

const RESUME_EMAIL = "info@edenabatherapy.com";

export default function TalentNetworkForm() {
  const filterOptions = useLocalizedContent("FILTER_OPTIONS", FILTER_OPTIONS);

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

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-[1.75rem] border border-emerald-200 bg-white p-8 text-base font-semibold leading-8 text-emerald-900 dark:border-emerald-800 dark:bg-slate-900 dark:text-emerald-200"
      >
        Thank you. Eden ABA Therapy will contact you when a matching opportunity becomes available.
      </div>
    );
  }

  return (
    <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
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
          Credential
        </span>
        <select name="credential" className={inputClassName} defaultValue="">
          <option value="">Select credential (optional)</option>
          {filterOptions.credentials.map((credential) => (
            <option key={credential} value={credential}>
              {credential}
            </option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-1">
        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
          Preferred Location
        </span>
        <select name="preferredLocation" required className={inputClassName} defaultValue="">
          <option value="" disabled>
            Select a location
          </option>
          {filterOptions.locations.map((location) => (
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
          {filterOptions.employmentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-1">
        <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
          Availability
        </span>
        <input name="availability" type="text" placeholder="e.g. Full-time, weekday mornings" className={inputClassName} />
      </label>
      <div className="sm:col-span-2">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
            Resume Upload
          </span>
          <input
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold file:mr-4 file:rounded-full file:border-0 file:bg-emerald-700 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white dark:border-slate-700 dark:bg-slate-900"
          />
        </label>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          You may also email your resume to{" "}
          <a href={`mailto:${RESUME_EMAIL}`} className="font-bold text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-300">
            {RESUME_EMAIL}
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
      <div className="sm:col-span-2">
        <button type="submit" disabled={submitting} className={getButtonClasses("primary", "w-full sm:w-auto")} aria-busy={submitting}>
          {submitting ? "Submitting..." : "Submit Interest"}
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
