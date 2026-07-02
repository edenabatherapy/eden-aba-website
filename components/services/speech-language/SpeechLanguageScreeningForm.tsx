"use client";

import { useMemo, useState, type ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Shield } from "lucide-react";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import EdenButton from "@/components/EdenButton";
import { EDEN_CARD } from "@/lib/eden-design-system";
import {
  calculateScreeningResult,
  RED_FLAG_FIELDS,
  SCREENING_SCORE_FIELDS,
} from "@/lib/speech-language-screening/scoring";

type ScoreOption = { label: string; value: string };

const FREQUENCY_OPTIONS: ScoreOption[] = [
  { label: "No", value: "0" },
  { label: "Sometimes", value: "1" },
  { label: "Often", value: "2" },
];

const YES_NO_OPTIONS: ScoreOption[] = [
  { label: "No", value: "0" },
  { label: "Yes", value: "2" },
];

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
  options = FREQUENCY_OPTIONS,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  options?: ScoreOption[];
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

export default function SpeechLanguageScreeningForm() {
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

  const errors = {
    childName: !form.childName.trim() ? "Child full name is required." : "",
    childDob: !form.childDob ? "Date of birth is required." : "",
    parentName: !form.parentName.trim() ? "Parent or guardian name is required." : "",
    phone: !form.phone.trim() ? "Phone number is required." : "",
    email:
      !form.email.trim()
        ? "Email is required."
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
          ? "Enter a valid email address."
          : "",
    consent: !form.consent
      ? "You must acknowledge that this screening does not replace evaluation by a licensed Speech-Language Pathologist."
      : "",
    signature: !form.signature.trim() ? "Parent or guardian signature is required." : "",
  };

  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    setSubmitError("");

    if (hasErrors) return;

    setSubmitting(true);

    try {
      const response = await fetch("/api/speech-language-screening", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        setSubmitError(result.message || "Unable to submit your screening. Please try again.");
        return;
      }

      setConfirmationId(result.confirmationId || "");
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError("Unable to submit your screening. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <AboutPremiumLayout>
        <section className="bg-gradient-to-br from-[#eefaf5] via-white to-[#49b8c8]/10 px-4 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl">
            <div className={`${EDEN_CARD} text-center`}>
              <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" aria-hidden />
              <h1 className="mt-4 text-3xl font-black text-[#0b4f4f]">Screening received</h1>
              <p className="mt-4 text-lg font-semibold leading-8 text-slate-700">
                Thank you. Eden intake coordinator received your screening.
              </p>
              {confirmationId ? (
                <p className="mt-4 text-base font-bold text-slate-800">
                  Confirmation ID: <span className="text-[#128c8c]">{confirmationId}</span>
                </p>
              ) : null}
              {screeningResult.redFlags ? (
                <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5 text-left text-sm font-semibold leading-relaxed text-orange-950">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-700" aria-hidden />
                    <p>
                      Because feeding or swallowing safety concerns were reported, Eden recommends prompt
                      review by a qualified medical provider or licensed Speech-Language Pathologist.
                    </p>
                  </div>
                </div>
              ) : null}
              <p className="mt-6 text-sm leading-relaxed text-slate-600">
                This screening does not diagnose a speech, language, feeding, or swallowing disorder and
                does not replace evaluation by a licensed Speech-Language Pathologist. Submission does not
                guarantee service approval or insurance authorization.
              </p>
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
            Eden ABA Therapy · Intake Screening
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight md:text-5xl">
            Speech &amp; Language Therapy Screening Form
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-semibold leading-relaxed text-emerald-50">
            Share your family&apos;s concerns so Eden&apos;s intake team can review screening information
            and help determine appropriate next steps. This form does not diagnose and does not replace
            evaluation by a licensed Speech-Language Pathologist.
          </p>
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
          <FormCard title="Child Information">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="childName">
                  Child Full Name *
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
                  Date of Birth *
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
                  Primary Language at Home
                </label>
                <input
                  id="primaryLanguage"
                  name="primaryLanguage"
                  value={form.primaryLanguage}
                  onChange={(event) => update("primaryLanguage", event.target.value)}
                  className={fieldClass}
                  placeholder="English, Dari, Vietnamese, etc."
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="school">
                  School / Daycare
                </label>
                <input
                  id="school"
                  name="school"
                  value={form.school}
                  onChange={(event) => update("school", event.target.value)}
                  className={fieldClass}
                  placeholder="Optional"
                />
              </div>
            </div>
          </FormCard>

          <FormCard title="Parent / Guardian Information">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="parentName">
                  Parent / Guardian Name *
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
                  Relationship to Child
                </label>
                <input
                  id="relationship"
                  name="relationship"
                  value={form.relationship}
                  onChange={(event) => update("relationship", event.target.value)}
                  className={fieldClass}
                  placeholder="Mother, father, guardian, etc."
                />
              </div>
            </div>
          </FormCard>

          <FormCard title="Contact Information">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="phone">
                  Phone *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  className={fieldClass}
                  placeholder="(703) 000-0000"
                />
                <FieldError show={touched} message={errors.phone} />
              </div>
              <div>
                <label className={labelClass} htmlFor="email">
                  Email *
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
                  Preferred Contact Method
                </label>
                <select
                  id="preferredContact"
                  name="preferredContact"
                  value={form.preferredContact}
                  onChange={(event) => update("preferredContact", event.target.value)}
                  className={fieldClass}
                >
                  <option>Phone</option>
                  <option>Email</option>
                  <option>Text message</option>
                </select>
              </div>
            </div>
          </FormCard>

          <FormCard title="Primary Concerns">
            <label className={labelClass} htmlFor="concerns">
              What made you request speech or language support?
            </label>
            <textarea
              id="concerns"
              name="concerns"
              value={form.concerns}
              onChange={(event) => update("concerns", event.target.value)}
              className={`${fieldClass} min-h-[110px] resize-y`}
              placeholder="Few words, unclear speech, difficulty following directions, stuttering, social communication, AAC needs, feeding concerns..."
            />
          </FormCard>

          <FormCard title="Speech & Language Questions">
            <p className="mb-4 text-sm font-semibold text-slate-600">
              Scoring: No = 0, Sometimes = 1, Often = 2. This screening is not a diagnosis.
            </p>
            <h3 className="text-lg font-black text-[#0E6B4F]">Understanding Language</h3>
            <ScreeningQuestion
              label="Difficulty following simple directions?"
              name="followDirections"
              value={form.followDirections}
              onChange={update}
            />
            <ScreeningQuestion
              label="Difficulty understanding questions, routines, or daily instructions?"
              name="understanding"
              value={form.understanding}
              onChange={update}
            />
            <h3 className="mt-4 text-lg font-black text-[#0E6B4F]">Expressive Language</h3>
            <ScreeningQuestion
              label="Uses fewer words or shorter phrases than expected?"
              name="fewWords"
              value={form.fewWords}
              onChange={update}
            />
            <ScreeningQuestion
              label="Frustration, crying, or behavior because communication is hard?"
              name="frustration"
              value={form.frustration}
              onChange={update}
            />
            <h3 className="mt-4 text-lg font-black text-[#0E6B4F]">Speech Clarity</h3>
            <ScreeningQuestion
              label="Unfamiliar people have trouble understanding your child?"
              name="clarity"
              value={form.clarity}
              onChange={update}
            />
            <ScreeningQuestion
              label="Leaves off sounds, substitutes sounds, or speaks unclearly?"
              name="sounds"
              value={form.sounds}
              onChange={update}
            />
          </FormCard>

          <FormCard title="Social Communication Questions">
            <ScreeningQuestion
              label="Difficulty with conversation, turn-taking, play, or peer interaction?"
              name="social"
              value={form.social}
              onChange={update}
            />
            <ScreeningQuestion
              label="Difficulty using gestures, shared attention, or communication repair?"
              name="gestures"
              value={form.gestures}
              onChange={update}
            />
          </FormCard>

          <FormCard title="AAC Needs">
            <ScreeningQuestion
              label="Needs pictures, signs, gestures, or a communication device?"
              name="aac"
              value={form.aac}
              onChange={update}
            />
            <div className="mt-4">
              <label className={labelClass} htmlFor="aacDetails">
                Additional AAC details (optional)
              </label>
              <textarea
                id="aacDetails"
                name="aacDetails"
                value={form.aacDetails}
                onChange={(event) => update("aacDetails", event.target.value)}
                className={`${fieldClass} min-h-[90px] resize-y`}
                placeholder="Current device, picture system, sign use, etc."
              />
            </div>
          </FormCard>

          <FormCard title="Fluency / Voice Concerns">
            <ScreeningQuestion
              label="Repeats sounds/words, gets stuck, or shows stuttering concerns?"
              name="fluency"
              value={form.fluency}
              onChange={update}
            />
            <ScreeningQuestion
              label="Voice sounds hoarse, weak, strained, or unusual?"
              name="voice"
              value={form.voice}
              onChange={update}
            />
          </FormCard>

          <FormCard title="Feeding / Swallowing Red Flags">
            <ScreeningQuestion
              label="Coughing, choking, wet voice, or breathing changes during meals?"
              name="swallowSafety"
              value={form.swallowSafety}
              onChange={update}
              options={YES_NO_OPTIONS}
            />
            <ScreeningQuestion
              label="Very limited foods, gagging, vomiting, weight concerns, or texture refusal?"
              name="feedingConcern"
              value={form.feedingConcern}
              onChange={update}
              options={YES_NO_OPTIONS}
            />
            {screeningResult.redFlags ? (
              <div className="mt-4 rounded-2xl border border-orange-200 bg-orange-50 p-4 text-sm font-semibold leading-relaxed text-orange-950">
                Because feeding or swallowing safety concerns were reported, Eden recommends prompt review
                by a qualified medical provider or licensed Speech-Language Pathologist.
              </div>
            ) : null}
          </FormCard>

          <FormCard title="Medical & Developmental History">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="hearingTest">
                  Recent Hearing Test?
                </label>
                <select
                  id="hearingTest"
                  name="hearingTest"
                  value={form.hearingTest}
                  onChange={(event) => update("hearingTest", event.target.value)}
                  className={fieldClass}
                >
                  <option>Not sure</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="diagnosis">
                  Diagnosis, if any
                </label>
                <input
                  id="diagnosis"
                  name="diagnosis"
                  value={form.diagnosis}
                  onChange={(event) => update("diagnosis", event.target.value)}
                  className={fieldClass}
                  placeholder="Autism, ADHD, developmental delay, etc."
                />
              </div>
            </div>
            <div className="mt-4">
              <label className={labelClass} htmlFor="developmentalHistory">
                Developmental or medical history (optional)
              </label>
              <textarea
                id="developmentalHistory"
                name="developmentalHistory"
                value={form.developmentalHistory}
                onChange={(event) => update("developmentalHistory", event.target.value)}
                className={`${fieldClass} min-h-[100px] resize-y`}
                placeholder="Prematurity, NICU stay, ear infections, prior therapy, medications, etc."
              />
            </div>
          </FormCard>

          <FormCard title="Insurance Information">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="insuranceType">
                  Insurance Type
                </label>
                <select
                  id="insuranceType"
                  name="insuranceType"
                  value={form.insuranceType}
                  onChange={(event) => update("insuranceType", event.target.value)}
                  className={fieldClass}
                >
                  <option>Select</option>
                  <option>Virginia Medicaid</option>
                  <option>Commercial Insurance</option>
                  <option>Private Pay</option>
                  <option>Not sure</option>
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="referral">
                  Physician Referral?
                </label>
                <select
                  id="referral"
                  name="referral"
                  value={form.referral}
                  onChange={(event) => update("referral", event.target.value)}
                  className={fieldClass}
                >
                  <option>Not yet</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="policyHolder">
                  Policy holder name (optional)
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

          <FormCard title="Consent & Privacy" className="border-teal-100 bg-[#f0fdfa]">
            <div className="flex items-start gap-3 rounded-2xl border border-teal-100 bg-white/80 p-4">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-[#128c8c]" aria-hidden />
              <p className="text-sm font-semibold leading-relaxed text-slate-700">
                Information submitted through this form is used only to help Eden coordinate intake and
                screening follow-up. It is handled with privacy-conscious practices and is not shared for
                marketing purposes. Submission does not guarantee service approval or insurance authorization.
              </p>
            </div>
            <label className="mt-5 flex items-start gap-3">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(event) => update("consent", event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300"
              />
              <span className="text-sm font-semibold leading-relaxed text-slate-800">
                I understand this screening does not diagnose and does not replace evaluation by a licensed
                Speech-Language Pathologist. *
              </span>
            </label>
            <FieldError show={touched} message={errors.consent} />
            <div className="mt-4">
              <label className={labelClass} htmlFor="signature">
                Parent / Guardian Signature (type full legal name) *
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
            <strong>Disclaimer:</strong> This form does not diagnose a speech, language, feeding, or
            swallowing disorder. Feeding or swallowing safety concerns should be reviewed promptly by
            qualified medical professionals.
          </section>

          {submitError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
              {submitError}
            </div>
          ) : null}

          <div className="lg:hidden">
            <EdenButton type="submit" disabled={submitting} className="w-full justify-center">
              {submitting ? "Submitting securely..." : "Submit Screening to Eden Intake Team"}
            </EdenButton>
          </div>
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-[1.75rem] bg-gradient-to-br from-[#0b4f4f] to-[#06291f] p-6 text-white shadow-xl shadow-emerald-950/20">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-100">
              Live Screening Score
            </p>
            <p className="mt-2 text-5xl font-black leading-none">{screeningResult.screeningScore}</p>
            <span
              className={`mt-4 inline-block rounded-full px-4 py-2 text-sm font-black ${
                screeningResult.redFlags ? "bg-red-100 text-red-900" : "bg-white/15 text-white"
              }`}
            >
              {screeningResult.riskLevel}
            </span>
            <p className="mt-4 text-sm font-semibold leading-relaxed text-emerald-50">
              {screeningResult.recommendation}
            </p>
            <EdenButton
              type="submit"
              disabled={submitting}
              className="mt-6 w-full justify-center bg-[#f97316] hover:bg-[#ea580c]"
            >
              {submitting ? "Submitting securely..." : "Submit Screening to Eden Intake Team"}
            </EdenButton>
            {submitting ? (
              <p className="mt-3 text-sm font-bold text-emerald-100">Submitting securely...</p>
            ) : null}
            {touched && hasErrors ? (
              <p className="mt-3 text-sm font-bold text-red-200">Please complete all required fields.</p>
            ) : null}
          </div>
          </aside>
        </form>
      </main>
    </AboutPremiumLayout>
  );
}
