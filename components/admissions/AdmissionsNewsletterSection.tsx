"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSimpleNewsletterSignup } from "@/hooks/useSimpleNewsletterSignup";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

type Labels = {
  title: string;
  intro: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  submit: string;
  success: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function AdmissionsNewsletterSection({ labels }: { labels: Labels }) {
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
      source: "admissions-newsletter",
      consent: true,
    });
  };

  const canSubmit = Boolean(fullName.trim() && email.trim() && isValidEmail(email.trim()));

  return (
    <section className="bg-[#FAF7F0] px-4 py-20 lg:px-8">
      <motion.div
        {...fadeUp}
        className="mx-auto w-full max-w-7xl rounded-[2rem] bg-gradient-to-br from-[#0b4f4f] via-[#128c8c] to-[#1f7a2e] px-8 py-12 text-center shadow-2xl md:px-12 md:py-14 lg:px-16"
      >
        <h2 className="text-3xl font-black text-white md:text-4xl">{labels.title}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-white/90">{labels.intro}</p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex w-full max-w-none flex-col gap-4 sm:flex-row sm:items-center"
        >
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="h-14 min-w-0 flex-1 rounded-full border border-white/10 bg-white px-6 text-base font-bold text-slate-900 outline-none focus:ring-4 focus:ring-lime-300/30"
            placeholder={labels.namePlaceholder}
            autoComplete="name"
            disabled={formDisabled || success}
            aria-label={labels.namePlaceholder}
          />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-14 min-w-0 flex-1 rounded-full border border-white/10 bg-white px-6 text-base font-bold text-slate-900 outline-none focus:ring-4 focus:ring-lime-300/30"
            placeholder={labels.emailPlaceholder}
            autoComplete="email"
            disabled={formDisabled || success}
            aria-label={labels.emailPlaceholder}
          />

          <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden>
            <label htmlFor="admissions-newsletter-website">Website</label>
            <input
              id="admissions-newsletter-website"
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
            className="h-14 shrink-0 rounded-full bg-[#f7c72f] px-8 text-base font-black text-[#0b4f4f] shadow-xl transition hover:bg-[#ff8a1f] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting…" : labels.submit}
          </button>
        </form>

        {error ? (
          <p role="alert" className="mt-4 text-xs text-red-200">
            {error}
          </p>
        ) : null}

        {success ? (
          <p role="status" aria-live="polite" className="mt-5 text-sm font-bold text-lime-200">
            {labels.success}
          </p>
        ) : null}
      </motion.div>
    </section>
  );
}
