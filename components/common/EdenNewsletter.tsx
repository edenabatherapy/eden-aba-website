"use client";

import { FormEvent, useState } from "react";
import { useSimpleNewsletterSignup } from "@/hooks/useSimpleNewsletterSignup";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";

export type EdenNewsletterProps = {
  /** Analytics / API source identifier */
  source?: string;
  className?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Canonical Eden newsletter — matches the Home page `eden-newsletter-banner` design.
 * Use this component everywhere (layouts, legal pages, SPA routes).
 */
export default function EdenNewsletter({ source = "eden-newsletter", className = "" }: EdenNewsletterProps) {
  const { language } = useSiteLanguage();
  const t = getTranslation(language);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const { submitting, error, success, submit, honeypot, setHoneypot, formDisabled } =
    useSimpleNewsletterSignup();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!fullName.trim() || !email.trim() || !isValidEmail(email.trim())) return;

    await submit({
      fullName: fullName.trim(),
      email: email.trim(),
      source,
      consent: true,
    });
  }

  const canSubmit = Boolean(fullName.trim() && email.trim() && isValidEmail(email.trim()));

  return (
    <section
      className={`eden-newsletter-banner ${className}`.trim()}
      aria-labelledby="eden-newsletter-heading"
    >
      <div className="eden-newsletter-banner__card">
        <h2 id="eden-newsletter-heading" className="eden-newsletter-banner__title">
          {t.newsletterTitle}
        </h2>

        <form onSubmit={handleSubmit} className="eden-newsletter-banner__form">
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="eden-newsletter-banner__input"
            placeholder={t.fullName}
            autoComplete="name"
            disabled={formDisabled || success}
            aria-label={t.fullName}
          />

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="eden-newsletter-banner__input"
            placeholder={t.email}
            autoComplete="email"
            disabled={formDisabled || success}
            aria-label={t.email}
          />

          <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden>
            <label htmlFor="eden-newsletter-website">Website</label>
            <input
              id="eden-newsletter-website"
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
            className="eden-newsletter-banner__button"
          >
            {submitting ? t.submitting || "Submitting…" : t.joinNewsletter}
          </button>
        </form>

        {error ? (
          <p role="alert" className="eden-newsletter-banner__feedback eden-newsletter-banner__feedback--error">
            {error}
          </p>
        ) : null}

        {success ? (
          <p
            role="status"
            aria-live="polite"
            className="eden-newsletter-banner__feedback eden-newsletter-banner__feedback--success"
          >
            {t.newsletterThanks}, {fullName}! {t.newsletterThanksEnd}
          </p>
        ) : null}
      </div>
    </section>
  );
}
