"use client";

import { useState } from "react";
import { useSimpleNewsletterSignup } from "@/hooks/useSimpleNewsletterSignup";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function NewsletterBanner({ t }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const { submitting, error, success, submit, honeypot, setHoneypot, formDisabled } =
    useSimpleNewsletterSignup();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!fullName.trim() || !email.trim() || !isValidEmail(email.trim())) return;

    await submit({
      fullName: fullName.trim(),
      email: email.trim(),
      source: "homepage-banner",
      consent: true,
    });
  };

  const canSubmit = Boolean(fullName.trim() && email.trim() && isValidEmail(email.trim()));

  return (
    <section className="bg-white px-4 py-14 lg:px-8">
      <div className="mx-auto w-full max-w-[100rem] rounded-[2.5rem] bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-6 py-12 text-center shadow-2xl shadow-[#128c8c]/20 md:px-10 md:py-16">
        <h2 className="mx-auto max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
          {t.newsletterTitle}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-9 flex w-full max-w-none flex-col gap-4 md:flex-row md:items-center md:justify-center"
        >
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="h-14 min-w-0 flex-1 rounded-full border border-white/10 bg-white px-6 text-base font-bold text-slate-900 outline-none shadow-lg transition focus:ring-4 focus:ring-lime-300/30"
            placeholder={t.fullName}
            autoComplete="name"
            disabled={formDisabled || success}
            aria-label={t.fullName}
          />

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-14 min-w-0 flex-1 rounded-full border border-white/10 bg-white px-6 text-base font-bold text-slate-900 outline-none shadow-lg transition focus:ring-4 focus:ring-lime-300/30"
            placeholder={t.email}
            autoComplete="email"
            disabled={formDisabled || success}
            aria-label={t.email}
          />

          <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden>
            <label htmlFor="homepage-newsletter-website">Website</label>
            <input
              id="homepage-newsletter-website"
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
            className="h-14 rounded-full bg-[#f7c72f] px-8 text-base font-black text-[#0b4f4f] shadow-xl transition hover:bg-[#ff8a1f] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting…" : t.joinNewsletter}
          </button>
        </form>

        {error ? (
          <p role="alert" className="mt-4 text-xs text-red-200">
            {error}
          </p>
        ) : null}

        {success && (
          <p role="status" aria-live="polite" className="mt-5 text-sm font-bold text-lime-200">
            {t.newsletterThanks}, {fullName}! {t.newsletterThanksEnd}
          </p>
        )}
      </div>
    </section>
  );
}
