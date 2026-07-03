"use client";

import { useMemo, useState, type ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Shield } from "lucide-react";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import EdenButton from "@/components/EdenButton";
import ReCaptchaVerification from "@/components/security/ReCaptchaVerification";
import { useReCaptchaV2 } from "@/hooks/useReCaptchaV2";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { EDEN_CARD } from "@/lib/eden-design-system";
import { getTranslation } from "@/lib/i18n";
import {
  calculateScreeningResult,
  RED_FLAG_FIELDS,
  SCREENING_SCORE_FIELDS,
} from "@/lib/speech-language-screening/scoring";

type ScoreOption = { label: string; value: string };

const INITIAL_FORM = {
  childName: "",
  childDob: "",
  primaryLanguage: "",
  school: "",
  parentName: "",
  relationship: "",
  phone: "",
  email: "",
  preferredContact: "Phone",
  concerns: "",
  followDirections: "0",
  understanding: "0",
  fewWords: "0",
  frustration: "0",
  clarity: "0",
  sounds: "0",
  social: "0",
  gestures: "0",
  aac: "0",
  aacDetails: "",
  fluency: "0",
  voice: "0",
  swallowSafety: "0",
  feedingConcern: "0",
  hearingTest: "Not sure",
  diagnosis: "",
  developmentalHistory: "",
  insuranceType: "Select",
  referral: "Not yet",
  policyHolder: "",
  consent: false,
  signature: "",
};

const RISK_KEY_BY_LEVEL: Record<string, "low" | "moderate" | "high" | "highSafety"> = {
  "Low concern": "low",
  "Moderate concern": "moderate",
  "High concern": "high",
  "High priority / safety review": "highSafety",
};

const fieldClass =
  "w-full rounded-2xl border border-[#0E6B4F]/15 bg-white px-4 py-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0E6B4F] focus:ring-4 focus:ring-[#0E6B4F]/10";

const labelClass = "mb-2 block text-sm font-black text-[#0b4f4f]";

function FieldError({ show, message }: { show: boolean; message: string }) {
  if (!show || !message) return null;
  return <p className="mt-1 text-sm font-semibold text-red-700">{message}</p>;
}

function ScreeningQuestion({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  options: ScoreOption[];
}) {
  return (
    <div className="grid gap-3 border-b border-slate-200 py-4 sm:grid-cols-[1fr_9.5rem] sm:items-center">
      <span className="text-sm font-semibold leading-relaxed text-slate-800">{label}</span>
      <select
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        className={fieldClass}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function FormCard({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`${EDEN_CARD} ${className}`}>
      <h2 className="text-2xl font-black text-[#0b4f4f]">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function optionEntries(options: Record<string, string>) {
  return Object.entries(options) as Array<[string, string]>;
}

export default function SpeechLanguageScreeningForm() {
  const { language } = useSiteLanguage();
  const copy = getTranslation(language).pages.speechLanguageScreening;

  const frequencyOptions = useMemo<ScoreOption[]>(
    () => [
      { label: copy.options.frequency["0"], value: "0" },
      { label: copy.options.frequency["1"], value: "1" },
      { label: copy.options.frequency["2"], value: "2" },
    ],
    [copy],
  );

  const yesNoOptions = useMemo<ScoreOption[]>(
    () => [
      { label: copy.options.yesNo["0"], value: "0" },
      { label: copy.options.yesNo["2"], value: "2" },
    ],
    [copy],
  );

  const {
    recaptchaRef,
    recaptchaError,
    verifying,
    canSubmit: recaptchaReady,
    handleTokenChange,
    handleExpired,
    resetRecaptcha,
    requireRecaptcha,
    verifyRecaptchaWithServer,
    releaseSubmitLock,
  } = useReCaptchaV2();

  const [form, setForm] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);
  const [confirmationId, setConfirmationId] = useState("");

  const update = (key: keyof typeof INITIAL_FORM, value: string | boolean) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const screeningResult = useMemo(() => {
    const answers = Object.fromEntries(
      [...SCREENING_SCORE_FIELDS, ...RED_FLAG_FIELDS].map((field) => [field, form[field as keyof typeof form]]),
    );
    return calculateScreeningResult(answers);
  }, [form]);

  const riskDisplay = useMemo(() => {
    const key = RISK_KEY_BY_LEVEL[screeningResult.riskLevel];
    if (!key) {
      return {
        level: screeningResult.riskLevel,
        recommendation: screeningResult.recommendation,
      };
    }
    return copy.risk[key];
  }, [copy, screeningResult.recommendation, screeningResult.riskLevel]);

  const errors = useMemo(
    () => ({
      childName: !form.childName.trim() ? copy.errors.childName : "",
      childDob: !form.childDob ? copy.errors.childDob : "",
      parentName: !form.parentName.trim() ? copy.errors.parentName : "",
      phone: !form.phone.trim() ? copy.errors.phone : "",
      email: !form.email.trim()
        ? copy.errors.emailRequired
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
          ? copy.errors.emailInvalid
          : "",
      consent: !form.consent ? copy.errors.consent : "",
      signature: !form.signature.trim() ? copy.errors.signature : "",
    }),
    [copy, form],
  );

  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    setSubmitError("");

    if (hasErrors) return;

    if (!requireRecaptcha()) {
      setSubmitError(copy.errors.recaptchaIncomplete);
      return;
    }

    setSubmitting(true);

    try {
      const recaptcha = await verifyRecaptchaWithServer();
      if (!recaptcha.success) {
        setSubmitError(copy.errors.recaptchaFailed);
        releaseSubmitLock();
        return;
      }

      const response = await fetch("/api/speech-language-screening", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken: recaptcha.token }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        setSubmitError(result.message || copy.errors.submitFailed);
        resetRecaptcha();
        return;
      }

      resetRecaptcha();
      setConfirmationId(result.confirmationId || "");
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError(copy.errors.submitFailed);
      resetRecaptcha();
    } finally {
      setSubmitting(false);
      releaseSubmitLock();
    }
  };

  if (success) {
    return (
      <AboutPremiumLayout>
        <section className="bg-gradient-to-br from-[#eefaf5] via-white to-[#49b8c8]/10 px-4 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl">
            <div className={`${EDEN_CARD} text-center`}>
              <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" aria-hidden />
              <h1 className="mt-4 text-3xl font-black text-[#0b4f4f]">{copy.success.title}</h1>
              <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">{copy.success.message}</p>
              {confirmationId ? (
                <p className="mt-4 text-base font-bold text-slate-800">
                  {copy.success.confirmationLabel}{" "}
                  <span className="text-[#128c8c]">{confirmationId}</span>
                </p>
              ) : null}
              {screeningResult.redFlags ? (
                <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5 text-left text-sm font-semibold leading-relaxed text-orange-950">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-700" aria-hidden />
                    <p>{copy.redFlagAlert}</p>
                  </div>
                </div>
              ) : null}
              <p className="mt-6 text-sm leading-relaxed text-slate-600">{copy.success.disclaimer}</p>
            </div>
          </div>
        </section>
      </AboutPremiumLayout>
    );
  }

  return (
    <AboutPremiumLayout>
      <header className="bg-gradient-to-br from-[#0b4f4f] via-[#0E6B4F] to-[#06291f] px-4 py-14 text-white lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em]">
            {copy.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight md:text-5xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-lg font-semibold leading-relaxed text-emerald-50">{copy.intro}</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 lg:px-8 lg:py-12">
        <form
          id="speech-language-screening-form"
          method="post"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit(event);
          }}
          className="grid gap-6 lg:grid-cols-[1.5fr_0.75fr] lg:gap-8"
          noValidate
        >
          <div className="space-y-6">
            <FormCard title={copy.sections.childInfo}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="childName">
                    {copy.fields.childName}
                  </label>
                  <input
                    id="childName"
                    name="childName"
                    value={form.childName}
                    onChange={(event) => update("childName", event.target.value)}
                    className={fieldClass}
                    autoComplete="name"
                  />
                  <FieldError show={touched} message={errors.childName} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="childDob">
                    {copy.fields.childDob}
                  </label>
                  <input
                    id="childDob"
                    name="childDob"
                    type="date"
                    value={form.childDob}
                    onChange={(event) => update("childDob", event.target.value)}
                    className={fieldClass}
                  />
                  <FieldError show={touched} message={errors.childDob} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="primaryLanguage">
                    {copy.fields.primaryLanguage}
                  </label>
                  <input
                    id="primaryLanguage"
                    name="primaryLanguage"
                    value={form.primaryLanguage}
                    onChange={(event) => update("primaryLanguage", event.target.value)}
                    className={fieldClass}
                    placeholder={copy.placeholders.primaryLanguage}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="school">
                    {copy.fields.school}
                  </label>
                  <input
                    id="school"
                    name="school"
                    value={form.school}
                    onChange={(event) => update("school", event.target.value)}
                    className={fieldClass}
                    placeholder={copy.placeholders.school}
                  />
                </div>
              </div>
            </FormCard>

            <FormCard title={copy.sections.parentGuardian}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="parentName">
                    {copy.fields.parentName}
                  </label>
                  <input
                    id="parentName"
                    name="parentName"
                    value={form.parentName}
                    onChange={(event) => update("parentName", event.target.value)}
                    className={fieldClass}
                  />
                  <FieldError show={touched} message={errors.parentName} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="relationship">
                    {copy.fields.relationship}
                  </label>
                  <input
                    id="relationship"
                    name="relationship"
                    value={form.relationship}
                    onChange={(event) => update("relationship", event.target.value)}
                    className={fieldClass}
                    placeholder={copy.placeholders.relationship}
                  />
                </div>
              </div>
            </FormCard>

            <FormCard title={copy.sections.contact}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="phone">
                    {copy.fields.phone}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    className={fieldClass}
                    placeholder={copy.placeholders.phone}
                  />
                  <FieldError show={touched} message={errors.phone} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">
                    {copy.fields.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    className={fieldClass}
                  />
                  <FieldError show={touched} message={errors.email} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="preferredContact">
                    {copy.fields.preferredContact}
                  </label>
                  <select
                    id="preferredContact"
                    name="preferredContact"
                    value={form.preferredContact}
                    onChange={(event) => update("preferredContact", event.target.value)}
                    className={fieldClass}
                  >
                    {optionEntries(copy.options.preferredContact).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </FormCard>

            <FormCard title={copy.sections.primaryConcerns}>
              <label className={labelClass} htmlFor="concerns">
                {copy.concernsLabel}
              </label>
              <textarea
                id="concerns"
                name="concerns"
                value={form.concerns}
                onChange={(event) => update("concerns", event.target.value)}
                className={`${fieldClass} min-h-[110px] resize-y`}
                placeholder={copy.placeholders.concerns}
              />
            </FormCard>

            <FormCard title={copy.sections.speechLanguage}>
              <p className="mb-4 text-sm font-semibold text-slate-600">{copy.scoringNote}</p>
              <h3 className="text-lg font-black text-[#0E6B4F]">{copy.subsections.understandingLanguage}</h3>
              <ScreeningQuestion
                label={copy.questions.followDirections}
                name="followDirections"
                value={form.followDirections}
                onChange={update}
                options={frequencyOptions}
              />
              <ScreeningQuestion
                label={copy.questions.understanding}
                name="understanding"
                value={form.understanding}
                onChange={update}
                options={frequencyOptions}
              />
              <h3 className="mt-4 text-lg font-black text-[#0E6B4F]">{copy.subsections.expressiveLanguage}</h3>
              <ScreeningQuestion
                label={copy.questions.fewWords}
                name="fewWords"
                value={form.fewWords}
                onChange={update}
                options={frequencyOptions}
              />
              <ScreeningQuestion
                label={copy.questions.frustration}
                name="frustration"
                value={form.frustration}
                onChange={update}
                options={frequencyOptions}
              />
              <h3 className="mt-4 text-lg font-black text-[#0E6B4F]">{copy.subsections.speechClarity}</h3>
              <ScreeningQuestion
                label={copy.questions.clarity}
                name="clarity"
                value={form.clarity}
                onChange={update}
                options={frequencyOptions}
              />
              <ScreeningQuestion
                label={copy.questions.sounds}
                name="sounds"
                value={form.sounds}
                onChange={update}
                options={frequencyOptions}
              />
            </FormCard>

            <FormCard title={copy.sections.socialCommunication}>
              <ScreeningQuestion
                label={copy.questions.social}
                name="social"
                value={form.social}
                onChange={update}
                options={frequencyOptions}
              />
              <ScreeningQuestion
                label={copy.questions.gestures}
                name="gestures"
                value={form.gestures}
                onChange={update}
                options={frequencyOptions}
              />
            </FormCard>

            <FormCard title={copy.sections.aac}>
              <ScreeningQuestion
                label={copy.questions.aac}
                name="aac"
                value={form.aac}
                onChange={update}
                options={frequencyOptions}
              />
              <div className="mt-4">
                <label className={labelClass} htmlFor="aacDetails">
                  {copy.fields.aacDetails}
                </label>
                <textarea
                  id="aacDetails"
                  name="aacDetails"
                  value={form.aacDetails}
                  onChange={(event) => update("aacDetails", event.target.value)}
                  className={`${fieldClass} min-h-[90px] resize-y`}
                  placeholder={copy.placeholders.aacDetails}
                />
              </div>
            </FormCard>

            <FormCard title={copy.sections.fluencyVoice}>
              <ScreeningQuestion
                label={copy.questions.fluency}
                name="fluency"
                value={form.fluency}
                onChange={update}
                options={frequencyOptions}
              />
              <ScreeningQuestion
                label={copy.questions.voice}
                name="voice"
                value={form.voice}
                onChange={update}
                options={frequencyOptions}
              />
            </FormCard>

            <FormCard title={copy.sections.feedingSwallowing}>
              <ScreeningQuestion
                label={copy.questions.swallowSafety}
                name="swallowSafety"
                value={form.swallowSafety}
                onChange={update}
                options={yesNoOptions}
              />
              <ScreeningQuestion
                label={copy.questions.feedingConcern}
                name="feedingConcern"
                value={form.feedingConcern}
                onChange={update}
                options={yesNoOptions}
              />
              {screeningResult.redFlags ? (
                <div className="mt-4 rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm font-semibold leading-relaxed text-orange-950">
                  {copy.redFlagAlert}
                </div>
              ) : null}
            </FormCard>

            <FormCard title={copy.sections.medicalHistory}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="hearingTest">
                    {copy.fields.hearingTest}
                  </label>
                  <select
                    id="hearingTest"
                    name="hearingTest"
                    value={form.hearingTest}
                    onChange={(event) => update("hearingTest", event.target.value)}
                    className={fieldClass}
                  >
                    {optionEntries(copy.options.hearingTest).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="diagnosis">
                    {copy.fields.diagnosis}
                  </label>
                  <input
                    id="diagnosis"
                    name="diagnosis"
                    value={form.diagnosis}
                    onChange={(event) => update("diagnosis", event.target.value)}
                    className={fieldClass}
                    placeholder={copy.placeholders.diagnosis}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className={labelClass} htmlFor="developmentalHistory">
                  {copy.fields.developmentalHistory}
                </label>
                <textarea
                  id="developmentalHistory"
                  name="developmentalHistory"
                  value={form.developmentalHistory}
                  onChange={(event) => update("developmentalHistory", event.target.value)}
                  className={`${fieldClass} min-h-[100px] resize-y`}
                  placeholder={copy.placeholders.developmentalHistory}
                />
              </div>
            </FormCard>

            <FormCard title={copy.sections.insurance}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="insuranceType">
                    {copy.fields.insuranceType}
                  </label>
                  <select
                    id="insuranceType"
                    name="insuranceType"
                    value={form.insuranceType}
                    onChange={(event) => update("insuranceType", event.target.value)}
                    className={fieldClass}
                  >
                    {optionEntries(copy.options.insuranceType).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="referral">
                    {copy.fields.referral}
                  </label>
                  <select
                    id="referral"
                    name="referral"
                    value={form.referral}
                    onChange={(event) => update("referral", event.target.value)}
                    className={fieldClass}
                  >
                    {optionEntries(copy.options.referral).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="policyHolder">
                    {copy.fields.policyHolder}
                  </label>
                  <input
                    id="policyHolder"
                    name="policyHolder"
                    value={form.policyHolder}
                    onChange={(event) => update("policyHolder", event.target.value)}
                    className={fieldClass}
                  />
                </div>
              </div>
            </FormCard>

            <FormCard title={copy.sections.consentPrivacy} className="border-teal-100 bg-[#f0fdfa]">
              <div className="flex items-start gap-3 rounded-2xl border border-teal-100 bg-white/80 p-4">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-[#128c8c]" aria-hidden />
                <p className="text-sm font-semibold leading-relaxed text-slate-700">{copy.consentPrivacyText}</p>
              </div>
              <label className="mt-5 flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) => update("consent", event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300"
                />
                <span className="text-sm font-semibold leading-relaxed text-slate-800">{copy.consentCheckbox}</span>
              </label>
              <FieldError show={touched} message={errors.consent} />
              <div className="mt-4">
                <label className={labelClass} htmlFor="signature">
                  {copy.fields.signature}
                </label>
                <input
                  id="signature"
                  name="signature"
                  value={form.signature}
                  onChange={(event) => update("signature", event.target.value)}
                  className={fieldClass}
                />
                <FieldError show={touched} message={errors.signature} />
              </div>
            </FormCard>

            <section className="rounded-[1.75rem] border border-orange-200 bg-orange-50 p-5 text-sm font-semibold leading-relaxed text-orange-950">
              <strong>{copy.disclaimerLabel}</strong> {copy.disclaimerText}
            </section>

            {submitError ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
                {submitError}
              </div>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-[1.75rem] bg-gradient-to-br from-[#0b4f4f] to-[#06291f] p-6 text-white shadow-xl shadow-emerald-950/20">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-100">
                {copy.sidebar.scoreLabel}
              </p>
              <p className="mt-2 text-5xl font-black leading-none">{screeningResult.screeningScore}</p>
              <span
                className={`mt-4 inline-block rounded-full px-4 py-2 text-sm font-black ${
                  screeningResult.redFlags ? "bg-red-100 text-red-900" : "bg-white/15 text-white"
                }`}
              >
                {riskDisplay.level}
              </span>
              <p className="mt-4 text-sm font-semibold leading-relaxed text-emerald-50">
                {riskDisplay.recommendation}
              </p>
              <ReCaptchaVerification
                ref={recaptchaRef}
                onTokenChange={handleTokenChange}
                onExpired={handleExpired}
                error={recaptchaError}
                disabled={submitting || verifying}
                noticeAlign="center"
                noticeTone="dark"
                showNotice
                className="mt-6 rounded-xl border border-white/15 bg-white/5 p-3"
              />
              <EdenButton
                type="submit"
                disabled={submitting || verifying || !recaptchaReady}
                className="mt-6 w-full justify-center bg-[#f97316] hover:bg-[#ea580c]"
              >
                {submitting
                  ? copy.sidebar.submitting
                  : verifying
                    ? copy.sidebar.verifying
                    : copy.sidebar.submit}
              </EdenButton>
              {submitting ? (
                <p className="mt-3 text-sm font-bold text-emerald-100">{copy.sidebar.submitting}</p>
              ) : null}
              {touched && hasErrors ? (
                <p className="mt-3 text-sm font-bold text-red-200">{copy.sidebar.requiredFields}</p>
              ) : null}
            </div>
          </aside>
        </form>
      </main>
    </AboutPremiumLayout>
  );
}
