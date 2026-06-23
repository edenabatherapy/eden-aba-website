"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, LockKeyhole } from "lucide-react";
import ReCaptchaVerification from "@/components/security/ReCaptchaVerification";
import RecaptchaNotice from "@/components/RecaptchaNotice";
import { useReCaptchaV2 } from "@/hooks/useReCaptchaV2";
import {
  CLIENT_SUPPORT_TOPICS,
  DIAGNOSIS_STATUS_OPTIONS,
  INQUIRY_TYPES,
  type InquiryType,
} from "@/lib/about/contact-us-data";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500 dark:focus:ring-emerald-900/40";

const labelClass = "mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-200";

type FormState = {
  parentName: string;
  email: string;
  phone: string;
  inquiryType: InquiryType;
  message: string;
  childFirstName: string;
  childLastName: string;
  childBirthdate: string;
  diagnosisStatus: string;
  organizationName: string;
  patientName: string;
  referralReason: string;
  clientName: string;
  supportTopic: string;
  roleOfInterest: string;
};

const INITIAL_FORM: FormState = {
  parentName: "",
  email: "",
  phone: "",
  inquiryType: INQUIRY_TYPES[0],
  message: "",
  childFirstName: "",
  childLastName: "",
  childBirthdate: "",
  diagnosisStatus: DIAGNOSIS_STATUS_OPTIONS[0],
  organizationName: "",
  patientName: "",
  referralReason: "",
  clientName: "",
  supportTopic: CLIENT_SUPPORT_TOPICS[0],
  roleOfInterest: "",
};

function isValidInquiryType(value: string | null): value is InquiryType {
  return Boolean(value && INQUIRY_TYPES.includes(value as InquiryType));
}

function buildMessagePayload(form: FormState) {
  const lines = [`Inquiry: ${form.inquiryType}`];

  if (form.inquiryType === "Family Inquiry") {
    if (form.childFirstName || form.childLastName) {
      lines.push(`Child: ${[form.childFirstName, form.childLastName].filter(Boolean).join(" ")}`);
    }
    if (form.childBirthdate) lines.push(`Child DOB: ${form.childBirthdate}`);
    if (form.diagnosisStatus) lines.push(`Diagnosis status: ${form.diagnosisStatus}`);
  }

  if (form.inquiryType === "Referral Inquiry") {
    if (form.organizationName) lines.push(`Organization: ${form.organizationName}`);
    if (form.patientName) lines.push(`Patient/Child: ${form.patientName}`);
    if (form.referralReason) lines.push(`Referral reason: ${form.referralReason}`);
  }

  if (form.inquiryType === "Current Client Support") {
    if (form.clientName) lines.push(`Client/Child: ${form.clientName}`);
    if (form.supportTopic) lines.push(`Support topic: ${form.supportTopic}`);
  }

  if (form.inquiryType === "Career Inquiry" && form.roleOfInterest) {
    lines.push(`Role of interest: ${form.roleOfInterest}`);
  }

  if (form.message.trim()) lines.push(`Message: ${form.message.trim()}`);

  return lines.join("\n");
}

export default function AboutContactForm() {
  const searchParams = useSearchParams();
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

  const [consentTerms, setConsentTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  useEffect(() => {
    const preset = searchParams.get("inquiry");
    if (isValidInquiryType(preset)) {
      setForm((current) => ({ ...current, inquiryType: preset }));
    }
  }, [searchParams]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((old) => ({ ...old, [key]: value }));

  const formDisabled = submitting || verifying || validating;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!form.parentName.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    if (!consentTerms) {
      setError("You must agree to the Privacy Policy and Terms of Service.");
      return;
    }

    if (!requireRecaptcha()) {
      setError("Please complete the security verification.");
      return;
    }

    setSubmitting(true);

    try {
      const recaptcha = await verifyRecaptchaWithServer();
      if (!recaptcha.success) {
        setError("Security verification failed. Please try again.");
        releaseSubmitLock();
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: form.parentName,
          email: form.email,
          phone: form.phone,
          childFirstName: form.childFirstName,
          childLastName: form.childLastName,
          childBirthdate: form.childBirthdate,
          diagnosisStatus: form.diagnosisStatus,
          message: buildMessagePayload(form),
          preferredContact: form.inquiryType,
          consentTerms: true,
          consentUpdates: false,
          recaptchaToken: recaptcha.token,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        setError(result.message || "Unable to submit your message. Please try again.");
        resetRecaptcha();
        return;
      }

      resetRecaptcha();
      setSubmitted(true);
    } catch {
      setError("Unable to submit your message. Please try again.");
      resetRecaptcha();
    } finally {
      setSubmitting(false);
      releaseSubmitLock();
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center dark:border-emerald-800 dark:bg-emerald-950/40">
        <Check className="mx-auto text-emerald-700 dark:text-emerald-400" size={44} aria-hidden="true" />
        <h3 className="mt-4 text-xl font-extrabold text-slate-900 dark:text-white">Message Received</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
          Thank you for contacting Eden ABA Therapy. Our team will respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="contact-inquiry-type" className={labelClass}>
            Inquiry Type <span className="text-red-600">*</span>
          </label>
          <select
            id="contact-inquiry-type"
            value={form.inquiryType}
            onChange={(e) => update("inquiryType", e.target.value as InquiryType)}
            className={inputClass}
            disabled={formDisabled}
          >
            {INQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            required
            value={form.parentName}
            onChange={(e) => update("parentName", e.target.value)}
            className={inputClass}
            disabled={formDisabled}
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            Phone <span className="text-red-600">*</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
            disabled={formDisabled}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-email" className={labelClass}>
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
            disabled={formDisabled}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={form.inquiryType}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid gap-5 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 dark:border-slate-700 dark:bg-slate-800/40 sm:grid-cols-2 sm:p-6"
        >
          {form.inquiryType === "Family Inquiry" && (
            <>
              <div>
                <label htmlFor="child-first-name" className={labelClass}>
                  Child First Name
                </label>
                <input
                  id="child-first-name"
                  type="text"
                  value={form.childFirstName}
                  onChange={(e) => update("childFirstName", e.target.value)}
                  className={inputClass}
                  disabled={formDisabled}
                />
              </div>
              <div>
                <label htmlFor="child-last-name" className={labelClass}>
                  Child Last Name
                </label>
                <input
                  id="child-last-name"
                  type="text"
                  value={form.childLastName}
                  onChange={(e) => update("childLastName", e.target.value)}
                  className={inputClass}
                  disabled={formDisabled}
                />
              </div>
              <div>
                <label htmlFor="child-birthdate" className={labelClass}>
                  Child Date of Birth
                </label>
                <input
                  id="child-birthdate"
                  type="date"
                  value={form.childBirthdate}
                  onChange={(e) => update("childBirthdate", e.target.value)}
                  className={inputClass}
                  disabled={formDisabled}
                />
              </div>
              <div>
                <label htmlFor="diagnosis-status" className={labelClass}>
                  Diagnosis Status
                </label>
                <select
                  id="diagnosis-status"
                  value={form.diagnosisStatus}
                  onChange={(e) => update("diagnosisStatus", e.target.value)}
                  className={inputClass}
                  disabled={formDisabled}
                >
                  {DIAGNOSIS_STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {form.inquiryType === "Referral Inquiry" && (
            <>
              <div className="sm:col-span-2">
                <label htmlFor="organization-name" className={labelClass}>
                  Organization / Practice Name
                </label>
                <input
                  id="organization-name"
                  type="text"
                  value={form.organizationName}
                  onChange={(e) => update("organizationName", e.target.value)}
                  className={inputClass}
                  disabled={formDisabled}
                  placeholder="Pediatric practice, school, or agency"
                />
              </div>
              <div>
                <label htmlFor="patient-name" className={labelClass}>
                  Patient / Child Name
                </label>
                <input
                  id="patient-name"
                  type="text"
                  value={form.patientName}
                  onChange={(e) => update("patientName", e.target.value)}
                  className={inputClass}
                  disabled={formDisabled}
                />
              </div>
              <div>
                <label htmlFor="referral-reason" className={labelClass}>
                  Reason for Referral
                </label>
                <input
                  id="referral-reason"
                  type="text"
                  value={form.referralReason}
                  onChange={(e) => update("referralReason", e.target.value)}
                  className={inputClass}
                  disabled={formDisabled}
                  placeholder="ABA evaluation, ongoing services, etc."
                />
              </div>
            </>
          )}

          {form.inquiryType === "Current Client Support" && (
            <>
              <div>
                <label htmlFor="client-name" className={labelClass}>
                  Client / Child Name
                </label>
                <input
                  id="client-name"
                  type="text"
                  value={form.clientName}
                  onChange={(e) => update("clientName", e.target.value)}
                  className={inputClass}
                  disabled={formDisabled}
                />
              </div>
              <div>
                <label htmlFor="support-topic" className={labelClass}>
                  Support Topic
                </label>
                <select
                  id="support-topic"
                  value={form.supportTopic}
                  onChange={(e) => update("supportTopic", e.target.value)}
                  className={inputClass}
                  disabled={formDisabled}
                >
                  {CLIENT_SUPPORT_TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {form.inquiryType === "Career Inquiry" && (
            <div className="sm:col-span-2">
              <label htmlFor="role-interest" className={labelClass}>
                Role of Interest
              </label>
              <input
                id="role-interest"
                type="text"
                value={form.roleOfInterest}
                onChange={(e) => update("roleOfInterest", e.target.value)}
                className={inputClass}
                disabled={formDisabled}
                placeholder="RBT, BCBA, clinical leadership, operations, etc."
              />
            </div>
          )}

          {form.inquiryType === "General Question" && (
            <p className="sm:col-span-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Share your question below and our team will route it to the right department.
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          {form.inquiryType === "General Question" ? "Your Question" : "Additional Details"}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={inputClass}
          disabled={formDisabled}
          placeholder="How can we help?"
        />
      </div>

      <label className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        <input
          type="checkbox"
          checked={consentTerms}
          onChange={(e) => setConsentTerms(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-500"
          disabled={formDisabled}
        />
        <span>
          I agree to the{" "}
          <Link href="/privacy-policy" className="font-semibold text-emerald-800 underline dark:text-emerald-400">
            Privacy Policy
          </Link>{" "}
          and authorize Eden ABA Therapy to contact me about my inquiry.
        </span>
      </label>

      <ReCaptchaVerification
        ref={recaptchaRef}
        onTokenChange={handleTokenChange}
        onExpired={handleExpired}
        error={recaptchaError}
        disabled={formDisabled}
      />

      {error ? (
        <p
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={formDisabled || !recaptchaReady}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-8 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        <LockKeyhole size={16} aria-hidden="true" />
        {submitting ? "Sending…" : verifying ? "Verifying…" : "Submit Inquiry"}
      </button>

      <RecaptchaNotice />
    </form>
  );
}
