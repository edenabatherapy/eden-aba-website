"use client";

import { FormEvent, useState } from "react";
import { useSimpleNewsletterSignup } from "@/hooks/useSimpleNewsletterSignup";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function FamilyNewsletter() {
  const { language } = useSiteLanguage();
  const t = getTranslation(language);
  const copy = t.pages?.home?.newsletter ?? {
    title: t.newsletterTitle,
    namePlaceholder: t.fullName,
    emailPlaceholder: t.email,
    submit: t.joinNewsletter,
    success: t.newsletterSuccess || "Thank you for joining the Eden ABA Therapy family newsletter.",
  };

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
  const { submitting, error, success, submit, honeypot, setHoneypot, formDisabled } =
    useSimpleNewsletterSignup();

  function validateForm() {
    const nextErrors: { fullName?: string; email?: string } = {};

    if (!fullName.trim()) {
      nextErrors.fullName = t.newsletterNameRequired || "Please enter your full name.";
    }

    if (!email.trim()) {
      nextErrors.email = t.newsletterEmailRequired || "Please enter your email address.";
    } else if (!isValidEmail(email.trim())) {
      nextErrors.email = t.newsletterEmailInvalid || "Please enter a valid email address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateForm()) return;

    await submit({
      fullName: fullName.trim(),
      email: email.trim(),
      source: "family-newsletter",
      consent: true,
    });
  }

  const canSubmit = Boolean(fullName.trim() && email.trim() && isValidEmail(email.trim()));

  return (
    <section
      aria-labelledby="family-newsletter-heading"
      className="bg-white px-4 py-14 dark:bg-slate-950 lg:px-8"
    >
      <div className="mx-auto w-full max-w-[100rem] rounded-[2.5rem] bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-6 py-12 text-center shadow-2xl shadow-[#128c8c]/20 transition-shadow duration-300 hover:shadow-[#128c8c]/30 md:px-10 md:py-16">
        <h2
          id="family-newsletter-heading"
          className="mx-auto max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl"
        >
          {copy.title}
        </h2>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="mx-auto mt-9 flex w-full max-w-none flex-col gap-4 md:flex-row md:items-start md:justify-center"
        >
          <div className="min-w-0 flex-1 text-left">
            <label htmlFor="newsletter-full-name" className="sr-only">
              {copy.namePlaceholder}
            </label>
            <input
              id="newsletter-full-name"
              name="fullName"
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
                if (errors.fullName) setErrors((current) => ({ ...current, fullName: undefined }));
              }}
              placeholder={copy.namePlaceholder}
              autoComplete="name"
              className="w-full rounded-2xl border border-white/20 bg-white/95 px-5 py-4 text-base font-semibold text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-lime-300 focus:ring-2 focus:ring-lime-300/40"
            />
            {errors.fullName ? (
              <p className="mt-2 text-sm font-semibold text-lime-100" role="alert">
                {errors.fullName}
              </p>
            ) : null}
          </div>

          <div className="min-w-0 flex-1 text-left">
            <label htmlFor="newsletter-email" className="sr-only">
              {copy.emailPlaceholder}
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
              }}
              placeholder={copy.emailPlaceholder}
              autoComplete="email"
              className="w-full rounded-2xl border border-white/20 bg-white/95 px-5 py-4 text-base font-semibold text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-lime-300 focus:ring-2 focus:ring-lime-300/40"
            />
            {errors.email ? (
              <p className="mt-2 text-sm font-semibold text-lime-100" role="alert">
                {errors.email}
              </p>
            ) : null}
          </div>

          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <button
            type="submit"
            disabled={!canSubmit || submitting || formDisabled}
            className="inline-flex min-h-[56px] shrink-0 items-center justify-center rounded-2xl bg-lime-400 px-8 py-4 text-base font-black text-emerald-950 shadow-lg transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? t.submitting || "Submitting..." : copy.submit}
          </button>
        </form>

        {success ? (
          <p className="mt-6 text-lg font-bold text-lime-200" role="status">
            {copy.success}
          </p>
        ) : null}

        {error ? (
          <p className="mt-6 text-lg font-bold text-red-200" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  );
}
