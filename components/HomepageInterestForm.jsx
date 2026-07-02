"use client";

import { useState } from "react";
import { CalendarDays, Check, LockKeyhole } from "lucide-react";
import ReCaptchaVerification from "@/components/security/ReCaptchaVerification";
import RecaptchaNotice from "@/components/RecaptchaNotice";
import { useReCaptchaV2 } from "@/hooks/useReCaptchaV2";
import { START_ABA_THERAPY_SUCCESS_MESSAGE } from "@/lib/intake/messages.js";

export default function HomepageInterestForm({ t, smsConsentLabel }) {
  const {
    recaptchaRef,
    recaptchaError,
    verifying,
    verifyingMessage,
    canSubmit: recaptchaReady,
    handleTokenChange,
    handleExpired,
    validating,
    resetRecaptcha,
    requireRecaptcha,
    verifyRecaptchaWithServer,
    releaseSubmitLock,
  } = useReCaptchaV2();

  const [consentUpdates, setConsentUpdates] = useState(false);
  const [consentTerms, setConsentTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [confirmationId, setConfirmationId] = useState("");
  const [form, setForm] = useState({
    parentName: "",
    childFirstName: "",
    childLastName: "",
    childBirthdate: "",
    phone: "",
    email: "",
    preferredContact: t?.homeIntakePlaceholders?.preferredContactOptions?.[0] ?? "Phone Call",
    diagnosisStatus: t?.homeIntakePlaceholders?.diagnosisOptions?.[0] ?? "Select Diagnosis Status",
    state: t?.homeIntakePlaceholders?.stateOptions?.[0] ?? "Virginia",
    message: "",
  });

  const update = (key, value) => setForm((old) => ({ ...old, [key]: value }));

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100";

  const formDisabled = submitting || verifying || validating;

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.parentName.trim() || !form.email.trim() || !form.phone.trim()) {
      setError(t.contactFormErrors?.incomplete || "Please complete all required fields.");
      return;
    }

    if (!consentTerms) {
      setError(t.contactFormErrors?.consentRequired || "You must agree to the Privacy Policy and Terms of Service.");
      return;
    }

    if (!requireRecaptcha()) {
      setError(t.startAbaRecaptchaIncomplete || "Please complete the security verification.");
      return;
    }

    setSubmitting(true);

    try {
      const recaptcha = await verifyRecaptchaWithServer();
      if (!recaptcha.success) {
        setError(t.recaptchaFailed || "Security verification failed. Please try again.");
        releaseSubmitLock();
        return;
      }

      const response = await fetch("/api/start-aba-therapy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          consentUpdates,
          consentTerms,
          recaptchaToken: recaptcha.token,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        setError(result.message || t.startAbaRecaptchaIncomplete || "Please complete the security verification.");
        resetRecaptcha();
        return;
      }

      resetRecaptcha();
      setConfirmationId(result.confirmationId || "");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(t.contactFormErrors?.submitRetry || "Security verification failed. Please try again.");
      resetRecaptcha();
    } finally {
      setSubmitting(false);
      releaseSubmitLock();
    }
  };

  if (submitted) {
    return (
      <div className="rounded-[2.25rem] border border-white/70 bg-white p-8 text-center shadow-2xl shadow-emerald-950/25 lg:p-8">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <Check size={32} />
        </div>
        <h3 className="mt-5 text-2xl font-black text-emerald-950">{t.contactFormSuccessTitle}</h3>
        <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
          {START_ABA_THERAPY_SUCCESS_MESSAGE}
        </p>
        {confirmationId ? (
          <p className="mt-3 text-sm font-bold text-emerald-800">
            Confirmation ID: {confirmationId}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="rounded-[2.25rem] border border-white/70 bg-white p-6 shadow-2xl shadow-emerald-950/25 lg:p-8">
      <fieldset disabled={formDisabled} className="min-w-0 border-0 p-0">
        <header className="mb-8 px-2 pt-2 text-center sm:mb-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0b4f4f] md:text-[28px] lg:text-[32px]">
            {t.homeIntakeFormHeading || "Start Your Child's ABA Journey"}
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-sm font-medium leading-relaxed text-slate-600 md:text-base">
            {t.homeIntakeFormSubtitle ||
              "Secure family intake. Our team will review your information and contact you to discuss services, insurance, and next steps."}
          </p>
        </header>

        <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
            {t.parentName}
            <input
              className={inputClass}
              value={form.parentName}
              onChange={(e) => update("parentName", e.target.value)}
              placeholder={t.homeIntakePlaceholders?.parentName}
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-700">
            {t.childFirstName}
            <input
              className={inputClass}
              value={form.childFirstName}
              onChange={(e) => update("childFirstName", e.target.value)}
              placeholder={t.homeIntakePlaceholders?.childFirstName}
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-700">
            {t.childLastName}
            <input
              className={inputClass}
              value={form.childLastName}
              onChange={(e) => update("childLastName", e.target.value)}
              placeholder={t.homeIntakePlaceholders?.childLastName}
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-700">
            {t.childBirthdate}
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                className={`${inputClass} pl-11`}
                value={form.childBirthdate}
                onChange={(e) => update("childBirthdate", e.target.value)}
                placeholder={t.childBirthdate}
              />
            </div>
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-700">
            {t.phoneNumber}
            <input
              type="tel"
              className={inputClass}
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder={t.homeIntakePlaceholders?.phone}
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
            {t.emailAddress}
            <input
              type="email"
              className={inputClass}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder={t.homeIntakePlaceholders?.email}
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-700">
            {t.preferredContact}
            <select
              className={inputClass}
              value={form.preferredContact}
              onChange={(e) => update("preferredContact", e.target.value)}
            >
              {(t.homeIntakePlaceholders?.preferredContactOptions ?? []).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-700">
            {t.diagnosisQuestion}
            <select
              className={inputClass}
              value={form.diagnosisStatus}
              onChange={(e) => update("diagnosisStatus", e.target.value)}
            >
              {(t.homeIntakePlaceholders?.diagnosisOptions ?? []).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
            {t.state}
            <select
              className={inputClass}
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
            >
              {(t.homeIntakePlaceholders?.stateOptions ?? []).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
            {t.message}
            <textarea
              className={`${inputClass} min-h-28`}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder={t.homeIntakePlaceholders?.message}
            />
          </label>

          <label className="flex items-start gap-3 text-sm font-semibold text-slate-600 md:col-span-2">
            <input
              type="checkbox"
              checked={consentUpdates}
              onChange={(e) => setConsentUpdates(e.target.checked)}
              className="mt-1 h-4 w-4 accent-emerald-600"
            />
            <span>{smsConsentLabel ?? t.consentUpdates}</span>
          </label>

          <label className="flex items-start gap-3 text-sm font-semibold text-slate-600 md:col-span-2">
            <input
              type="checkbox"
              checked={consentTerms}
              onChange={(e) => setConsentTerms(e.target.checked)}
              className="mt-1 h-4 w-4 accent-emerald-600"
              required
            />
            <span className="inline-flex items-center gap-2">
              <LockKeyhole size={16} className="text-emerald-700" />
              {t.consentTerms}
            </span>
          </label>

          {error ? (
            <p className="md:col-span-2 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">{error}</p>
          ) : null}

          <div className="md:col-span-2">
            <ReCaptchaVerification
              ref={recaptchaRef}
              onTokenChange={handleTokenChange}
              onExpired={handleExpired}
              error={recaptchaError}
              disabled={formDisabled}
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={!recaptchaReady || formDisabled}
              className="w-full rounded-full bg-gradient-to-r from-[#168f30] to-[#006d19] px-8 py-4 text-base font-extrabold text-white shadow-xl shadow-emerald-900/15 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? t.contactFormSubmitting : verifying ? "Verifying…" : t.submitRequest}
            </button>
            <RecaptchaNotice align="center" />
          </div>
        </form>
      </fieldset>
    </div>
  );
}
