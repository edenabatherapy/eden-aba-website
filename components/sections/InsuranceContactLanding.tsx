"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import ReCaptchaVerification from "@/components/security/ReCaptchaVerification";
import { useReCaptchaV2 } from "@/hooks/useReCaptchaV2";
import { RECAPTCHA_SUCCESS_MESSAGE } from "@/lib/recaptcha/messages";
import { SITE_IMAGES } from "@/lib/site-images";

type InsuranceType = "Virginia Medicaid" | "Commercial Insurance" | "Not Sure";

type ContactFormState = {
  parentName: string;
  email: string;
  phone: string;
  childName: string;
  zipCode: string;
  insuranceType: InsuranceType | "";
  message: string;
};

type LandingContent = {
  eyebrow?: string;
  headline?: string;
  subtitle?: string;
  ctaSubmitRequest?: string;
  ctaStartVerification?: string;
  formTitle?: string;
  formSubtitle?: string;
  parentName?: string;
  email?: string;
  phone?: string;
  childName?: string;
  zipCode?: string;
  insuranceType?: string;
  message?: string;
  insuranceOptions?: string[];
  submit?: string;
  submitting?: string;
  success?: string;
  imageAlt?: string;
  selectInsurance?: string;
  validationError?: string;
  messagePlaceholder?: string;
};

type Props = {
  t?: {
    pages?: {
      insurance?: {
        contactLanding?: LandingContent;
      };
    };
  };
  onStartVerification?: () => void;
};

const DEFAULT_COPY: LandingContent = {
  eyebrow: "Eden ABA Therapy · Insurance",
  headline: "Contact Our Insurance Verification Team",
  subtitle:
    "Speak with Eden ABA Therapy’s insurance team to get help with Medicaid eligibility, insurance benefits, required documents, and next steps for ABA therapy services.",
  ctaSubmitRequest: "Submit Request",
  ctaStartVerification: "Start Verification",
  formTitle: "Request Insurance Support",
  formSubtitle:
    "Complete the form below and a member of our insurance verification team will reach out with personalized guidance.",
  parentName: "Parent/Guardian Name",
  email: "Email Address",
  phone: "Phone Number",
  childName: "Child Name",
  zipCode: "ZIP Code",
  insuranceType: "Insurance Type",
  message: "Message",
  insuranceOptions: ["Virginia Medicaid", "Commercial Insurance", "Not Sure"],
  submit: "Submit Insurance Question",
  submitting: "Submitting…",
  success: "Thank you. Eden ABA Therapy’s insurance team will contact you shortly.",
  imageAlt: "Family receiving insurance support from Eden ABA Therapy",
  selectInsurance: "Select insurance type",
  validationError: "Please complete all required fields with a valid email and phone number.",
  messagePlaceholder: "Share your insurance questions, plan details, or documents you have ready.",
};

const EMPTY_FORM: ContactFormState = {
  parentName: "",
  email: "",
  phone: "",
  childName: "",
  zipCode: "",
  insuranceType: "",
  message: "",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length > 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length > 3) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return digits;
}

function HeroImage({ alt }: { alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0F8F4F] via-[#0EA5A4] to-[#12345A]">
        <div className="text-center text-white">
          <HeartHandshake className="mx-auto h-16 w-16 opacity-90" aria-hidden />
          <p className="mt-4 text-sm font-extrabold uppercase tracking-[0.2em] text-white/90">
            Eden ABA Therapy
          </p>
          <p className="mt-2 text-lg font-black">Insurance Support</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={SITE_IMAGES.insurance.hero}
      alt={alt}
      className="h-full w-full object-cover"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default function InsuranceContactLanding({ t, onStartVerification }: Props) {
  const copy = useMemo(
    () => ({ ...DEFAULT_COPY, ...t?.pages?.insurance?.contactLanding }),
    [t],
  );

  const [form, setForm] = useState<ContactFormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const {
    recaptchaRef,
    recaptchaError,
    verifying,
    verifyingMessage,
    canSubmit: recaptchaReady,
    handleTokenChange,
    handleExpired,
    resetRecaptcha,
    requireRecaptcha,
    verifyRecaptchaWithServer,
  } = useReCaptchaV2();

  const emailValid = form.email.includes("@") && form.email.includes(".");
  const phoneDigits = form.phone.replace(/\D/g, "");
  const isValid =
    form.parentName.trim() &&
    form.email.trim() &&
    emailValid &&
    phoneDigits.length >= 10 &&
    form.childName.trim() &&
    form.zipCode.trim() &&
    form.insuranceType;

  const fieldClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0F8F4F] focus:ring-4 focus:ring-[#0F8F4F]/12";

  const update = (key: keyof ContactFormState, value: string) => {
    if (key === "phone") {
      setForm((prev) => ({ ...prev, phone: formatPhone(value) }));
      return;
    }
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const scrollToForm = () => {
    document.getElementById("eden-insurance-contact-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (!isValid) return;
    if (!requireRecaptcha()) return;

    setLoading(true);

    try {
      const recaptcha = await verifyRecaptchaWithServer();
      if (!recaptcha.success) return;

      const response = await fetch("/api/insurance/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken: recaptcha.token }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        resetRecaptcha();
        return;
      }

      setSubmitted(true);
      setForm(EMPTY_FORM);
      setTouched(false);
      resetRecaptcha();
    } catch {
      resetRecaptcha();
    } finally {
      setLoading(false);
    }
  };

  const formDisabled = loading || verifying;

  return (
    <section id="insurance-contact-landing" className="relative bg-[#0B2540]">
      {/* Top enterprise banner strip with rounded bottom */}
      <div
        className="relative h-28 overflow-hidden rounded-b-[2.5rem] bg-gradient-to-r from-[#12345A] via-[#0F8F4F] to-[#0EA5A4] md:h-36 md:rounded-b-[3rem]"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(245,166,35,0.35),transparent_40%),radial-gradient(circle_at_85%_30%,rgba(255,255,255,0.12),transparent_35%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 lg:px-8 lg:pb-24 lg:pt-12">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_30%_0%,rgba(15,143,79,0.22),transparent_55%)]"
          aria-hidden
        />

        <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeUp}
            custom={0}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#0EA5A4]">
              <ShieldCheck size={15} aria-hidden />
              {copy.eyebrow}
            </p>
            <h2 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight text-white md:text-5xl lg:text-[3.35rem]">
              {copy.headline}
            </h2>
            <p className="mt-5 max-w-xl text-lg font-medium leading-8 text-slate-300">
              {copy.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F5A623] px-7 py-4 text-sm font-extrabold text-[#0B2540] shadow-lg shadow-[#F5A623]/25 transition hover:-translate-y-0.5 hover:bg-[#ffb941]"
              >
                {copy.ctaSubmitRequest}
                <ArrowRight size={18} aria-hidden />
              </button>
              <button
                type="button"
                onClick={onStartVerification}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-extrabold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                {copy.ctaStartVerification}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={fadeUp}
            custom={0.12}
            className="relative mx-auto w-full max-w-md lg:max-w-none lg:justify-self-end"
          >
            <div
              className="absolute -left-6 top-8 h-24 w-24 rounded-full bg-[#F5A623]/30 blur-2xl"
              aria-hidden
            />
            <div
              className="absolute -right-4 bottom-4 h-28 w-28 rounded-full bg-[#0EA5A4]/25 blur-2xl"
              aria-hidden
            />
            <div className="relative mx-auto aspect-square w-full max-w-[340px] overflow-hidden rounded-full border-[6px] border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10 sm:max-w-[380px] lg:max-w-[420px]">
              <HeroImage alt={copy.imageAlt || DEFAULT_COPY.imageAlt || ""} />
            </div>
            <div className="absolute -bottom-3 left-1/2 hidden -translate-x-1/2 rounded-full border border-white/20 bg-[#12345A]/90 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-white backdrop-blur-md sm:block">
              Virginia Families · ABA Insurance Support
            </div>
          </motion.div>
        </div>

        <motion.div
          id="eden-insurance-contact-form"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0.08}
          className="relative z-10 -mt-6 scroll-mt-28 sm:-mt-10 lg:-mt-16"
        >
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-8 lg:p-10">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#0F8F4F] text-white shadow-lg">
                  <CheckCircle2 size={32} aria-hidden />
                </div>
                <p className="mx-auto mt-6 max-w-lg text-lg font-bold leading-8 text-[#12345A]">
                  {RECAPTCHA_SUCCESS_MESSAGE}
                </p>
              </div>
            ) : (
              <>
                <div className="border-b border-slate-100 pb-6">
                  <h3 className="text-2xl font-black text-[#12345A] md:text-3xl">
                    {copy.formTitle}
                  </h3>
                  <p className="mt-2 max-w-2xl text-base font-medium leading-7 text-slate-600">
                    {copy.formSubtitle}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
                  <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
                    {copy.parentName}
                    <input
                      className={fieldClass}
                      value={form.parentName}
                      onChange={(e) => update("parentName", e.target.value)}
                      required
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-slate-700">
                    {copy.email}
                    <input
                      type="email"
                      className={fieldClass}
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      required
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-slate-700">
                    {copy.phone}
                    <input
                      type="tel"
                      className={fieldClass}
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      required
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-slate-700">
                    {copy.childName}
                    <input
                      className={fieldClass}
                      value={form.childName}
                      onChange={(e) => update("childName", e.target.value)}
                      required
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-slate-700">
                    {copy.zipCode}
                    <input
                      className={fieldClass}
                      value={form.zipCode}
                      onChange={(e) => update("zipCode", e.target.value)}
                      required
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
                    {copy.insuranceType}
                    <select
                      className={fieldClass}
                      value={form.insuranceType}
                      onChange={(e) =>
                        update("insuranceType", e.target.value as InsuranceType | "")
                      }
                      required
                    >
                      <option value="">{copy.selectInsurance}</option>
                      {(copy.insuranceOptions || DEFAULT_COPY.insuranceOptions || []).map(
                        (option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ),
                      )}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
                    {copy.message}
                    <textarea
                      className={`${fieldClass} min-h-32 resize-y`}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder={copy.messagePlaceholder}
                    />
                  </label>

                  {touched && !isValid ? (
                    <p className="md:col-span-2 text-sm font-bold text-red-600">
                      {copy.validationError}
                    </p>
                  ) : null}

                  <div className="md:col-span-2">
                    <ReCaptchaVerification
                      ref={recaptchaRef}
                      onTokenChange={handleTokenChange}
                      onExpired={handleExpired}
                      error={recaptchaError}
                      disabled={formDisabled}
                      noticeAlign="center"
                      showNotice
                    />
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={!recaptchaReady || formDisabled || !isValid}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0F8F4F] to-[#12345A] px-8 py-4 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
                    >
                      {loading || verifying ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                          {verifying ? "Verifying…" : copy.submitting}
                        </>
                      ) : (
                        copy.submit
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
