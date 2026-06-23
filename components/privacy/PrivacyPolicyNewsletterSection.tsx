"use client";

import { useState } from "react";
import { useSimpleNewsletterSignup } from "@/hooks/useSimpleNewsletterSignup";

type NewsletterLabels = {
  title: string;
  fullName: string;
  email: string;
  joinNewsletter: string;
  newsletterThanks: string;
  newsletterThanksEnd: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function PrivacyPolicyNewsletterSection({ labels }: { labels: NewsletterLabels }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const { submitting, error, success, submit, honeypot, setHoneypot, formDisabled } =
    useSimpleNewsletterSignup();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fullName.trim() || !email.trim() || !isValidEmail(email.trim())) return;

    await submit({
      fullName: fullName.trim(),
      email: email.trim(),
      source: "privacy-policy-newsletter",
      consent: true,
    });
  };

  const canSubmit = Boolean(fullName.trim() && email.trim() && isValidEmail(email.trim()));

  return (
    <section className="w-full bg-emerald-950 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-emerald-800 px-6 py-10 text-center shadow-2xl shadow-emerald-950/30 sm:px-10 lg:px-14 lg:py-12">
          <h2 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            {labels.title}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex w-full max-w-none flex-col gap-4 lg:flex-row lg:items-center lg:justify-center"
          >
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder={labels.fullName}
              autoComplete="name"
              disabled={formDisabled || success}
              aria-label={labels.fullName}
              className="h-14 w-full rounded-full border-0 bg-white px-6 text-base font-bold text-slate-900 placeholder:text-slate-500 outline-none shadow-lg transition focus:ring-4 focus:ring-emerald-400/30 lg:min-w-0 lg:flex-1"
            />

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={labels.email}
              autoComplete="email"
              disabled={formDisabled || success}
              aria-label={labels.email}
              className="h-14 w-full rounded-full border-0 bg-white px-6 text-base font-bold text-slate-900 placeholder:text-slate-500 outline-none shadow-lg transition focus:ring-4 focus:ring-emerald-400/30 lg:min-w-0 lg:flex-1"
            />

            <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <label htmlFor="privacy-newsletter-website">Website</label>
              <input
                id="privacy-newsletter-website"
                name="website"
                type="text"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              disabled={formDisabled || success || !canSubmit}
              className="h-14 shrink-0 rounded-full bg-emerald-500 px-8 text-base font-bold text-white shadow-xl transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting…" : labels.joinNewsletter}
            </button>
          </form>

          {error ? (
            <p role="alert" className="mt-4 text-xs text-red-200">
              {error}
            </p>
          ) : null}

          {success ? (
            <p role="status" aria-live="polite" className="mt-5 text-sm font-bold text-emerald-100">
              {labels.newsletterThanks}, {fullName}! {labels.newsletterThanksEnd}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
