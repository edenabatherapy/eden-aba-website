"use client";

import { type ButtonHTMLAttributes, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { InsuranceVerificationRequest, VerificationType } from "@/types/insurance";
import { validateDOB } from "@/lib/insurance/dates";
import {
  formatInsurancePhoneInput,
  formatInsuranceSsnInput,
  formatInsuranceZipInput,
  isValidInsuranceEmail,
  isValidInsurancePhone,
  isValidInsuranceZip,
  INSURANCE_VERIFICATION_ERROR_MESSAGES,
} from "@/lib/insurance/normalize-verification-request";
import EdenLogo from "@/components/EdenLogo";
import ReCaptchaVerification from "@/components/security/ReCaptchaVerification";
import { useReCaptchaV2 } from "@/hooks/useReCaptchaV2";
import { getButtonClasses } from "@/lib/button-styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

function Button({ children, variant = "primary", className = "", type = "button", ...props }: ButtonProps) {
  const variantMap = {
    primary: "primarySite",
    secondary: "secondarySite",
  };

  return (
    <button type={type} {...props} className={getButtonClasses(variantMap[variant] || "primarySite", className, "sm")}>
      {children}
    </button>
  );
}

function InsuranceVerificationForm({ t, onSchedule, onHome, onStart }) {
  const router = useRouter();
  const formT = t.insuranceForm || t;

  const emptyForm: InsuranceVerificationRequest = {
    verificationType: "child",
    parentFirstName: "",
    parentLastName: "",
    fullName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    zipCode: "",
    insuranceProvider: "",
    medicaidId: "",
    ssn: "",
    consent: false,
  };

  const [form, setForm] = useState<InsuranceVerificationRequest>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [liveVerificationAvailable, setLiveVerificationAvailable] = useState(false);
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
    setRecaptchaError,
  } = useReCaptchaV2();

  useEffect(() => {
    fetch("/api/insurance/verify")
      .then((res) => res.json())
      .then((data) => setLiveVerificationAvailable(Boolean(data.liveVerificationAvailable)))
      .catch(() => setLiveVerificationAvailable(false));
  }, []);

  const isChild = form.verificationType === "child";
  const emailValid = isValidInsuranceEmail(form.email);
  const phoneValid = isValidInsurancePhone(form.phone);
  const zipValid = isValidInsuranceZip(form.zipCode);
  const dobValid = validateDOB(form.dateOfBirth).valid;

  const complete =
    form.fullName.trim() &&
    dobValid &&
    emailValid &&
    phoneValid &&
    zipValid &&
    form.insuranceProvider.trim() &&
    (form.medicaidId?.trim() || form.ssn?.trim()) &&
    form.consent &&
    (!isChild || (form.parentFirstName?.trim() && form.parentLastName?.trim()));

  const fieldClass =
    "w-full rounded-2xl border border-[#49b8c8]/25 bg-white px-4 py-4 text-sm font-bold text-slate-900 outline-none transition focus:border-[#128c8c] focus:ring-4 focus:ring-[#49b8c8]/20";

  const toggleClass = (active: boolean) =>
    `rounded-full px-5 py-2.5 text-sm font-black transition ${
      active
        ? "bg-[#1f7a2e] text-white shadow-md"
        : "text-[#0b4f4f] hover:bg-white/60"
    }`;

  const update = (key, value) => {
    if (key === "phone") {
      setForm((old) => ({ ...old, phone: formatInsurancePhoneInput(value) }));
      return;
    }

    if (key === "zipCode") {
      setForm((old) => ({ ...old, zipCode: formatInsuranceZipInput(value) }));
      return;
    }

    if (key === "ssn") {
      setForm((old) => ({ ...old, ssn: formatInsuranceSsnInput(value) }));
      return;
    }

    setForm((old) => ({ ...old, [key]: value }));
  };

  const setVerificationType = (verificationType: VerificationType) => {
    setForm((old) => ({
      ...old,
      verificationType,
      ...(verificationType === "adult"
        ? { parentFirstName: "", parentLastName: "" }
        : {}),
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (loading || redirecting) return;
    setTouched(true);
    setError("");

    if (!form.dateOfBirth) {
      setError(formT.errors?.invalidDob || INSURANCE_VERIFICATION_ERROR_MESSAGES.invalidDob);
      return;
    }

    const dobCheck = validateDOB(form.dateOfBirth);
    if (!dobCheck.valid) {
      setError(formT.errors?.invalidDob || INSURANCE_VERIFICATION_ERROR_MESSAGES.invalidDob);
      return;
    }

    if (!form.fullName.trim()) {
      setError(
        isChild
          ? formT.errors?.nameRequired || "Child name is required."
          : formT.errors?.nameRequired || "Full name is required.",
      );
      return;
    }

    if (isChild && !form.parentFirstName?.trim()) {
      setError("Parent/guardian first name is required.");
      return;
    }

    if (isChild && !form.parentLastName?.trim()) {
      setError("Parent/guardian last name is required.");
      return;
    }

    if (!form.email.trim()) {
      setError(formT.errors?.invalidEmail || INSURANCE_VERIFICATION_ERROR_MESSAGES.invalidEmail);
      return;
    }

    if (!emailValid) {
      setError(formT.errors?.invalidEmail || INSURANCE_VERIFICATION_ERROR_MESSAGES.invalidEmail);
      return;
    }

    if (!form.phone.trim()) {
      setError(formT.errors?.invalidPhone || INSURANCE_VERIFICATION_ERROR_MESSAGES.invalidPhone);
      return;
    }

    if (!phoneValid) {
      setError(formT.errors?.invalidPhone || INSURANCE_VERIFICATION_ERROR_MESSAGES.invalidPhone);
      return;
    }

    if (!form.zipCode.trim()) {
      setError(formT.errors?.invalidZip || INSURANCE_VERIFICATION_ERROR_MESSAGES.invalidZip);
      return;
    }

    if (!zipValid) {
      setError(formT.errors?.invalidZip || INSURANCE_VERIFICATION_ERROR_MESSAGES.invalidZip);
      return;
    }

    if (!form.insuranceProvider.trim()) {
      setError(formT.errors?.incomplete || "Insurance provider is required.");
      return;
    }

    if (!form.medicaidId?.trim() && !form.ssn?.trim()) {
      setError(
        formT.errors?.idRequired || INSURANCE_VERIFICATION_ERROR_MESSAGES.memberIdOrSsn,
      );
      return;
    }

    if (!form.medicaidId?.trim() && form.ssn?.trim()) {
      const ssnDigits = form.ssn.replace(/\D/g, "");
      if (ssnDigits.length !== 9) {
        setError(
          formT.errors?.idRequired || INSURANCE_VERIFICATION_ERROR_MESSAGES.memberIdOrSsn,
        );
        return;
      }
    }

    if (!form.consent) {
      setError(formT.errors?.consentRequired || "Please agree before submitting.");
      return;
    }

    if (!complete) {
      setError(formT.errors?.incomplete || "Please complete all required fields before submitting.");
      return;
    }

    if (!requireRecaptcha()) {
      setError(
        formT.errors?.recaptchaIncomplete || INSURANCE_VERIFICATION_ERROR_MESSAGES.recaptcha,
      );
      return;
    }

    setLoading(true);

    const recaptcha = await verifyRecaptchaWithServer();
    if (!recaptcha.success) {
      setLoading(false);
      setError(
        formT.errors?.recaptchaIncomplete || INSURANCE_VERIFICATION_ERROR_MESSAGES.recaptcha,
      );
      return;
    }

    const payload: InsuranceVerificationRequest & { recaptchaToken?: string | null } = {
      verificationType: form.verificationType,
      fullName: form.fullName.trim(),
      dateOfBirth: form.dateOfBirth.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      zipCode: form.zipCode.trim(),
      insuranceProvider: form.insuranceProvider.trim(),
      medicaidId: form.medicaidId?.trim() || undefined,
      ssn: form.ssn?.trim() || undefined,
      consent: form.consent,
      ...(isChild && {
        parentFirstName: form.parentFirstName?.trim(),
        parentLastName: form.parentLastName?.trim(),
      }),
      recaptchaToken: recaptcha.token,
    };

    try {
      const response = await fetch("/api/insurance/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        success?: boolean;
        requestId?: string;
        error?: string;
        message?: string;
      };

      const saved =
        data.success === true && typeof data.requestId === "string" && data.requestId.length > 0;

      if (!saved && !response.ok) {
        const failureMessage =
          data.error ||
          data.message ||
          formT.errors?.submitFailed ||
          "Verification failed.";
        setError(failureMessage);
        if (response.status === 403 || failureMessage.toLowerCase().includes("security verification")) {
          setRecaptchaError(failureMessage);
        }
        resetRecaptcha();
        return;
      }

      if (saved || (response.ok && data.requestId)) {
        setRedirecting(true);
        const submittedAt = encodeURIComponent(new Date().toISOString());
        const ref = encodeURIComponent(data.requestId!);
        router.push(`/insurance/verification-received?ref=${ref}&submitted=${submittedAt}`);
        return;
      }

      setError(formT.errors?.submitRetry || "Something went wrong. Please try again.");
      resetRecaptcha();
    } catch {
      setError(formT.errors?.submitRetry || "Something went wrong. Please try again.");
      resetRecaptcha();
    } finally {
      if (!redirecting) {
        setLoading(false);
      }
    }
  };

  const placeholders = formT.placeholders || {};
  const fullNamePlaceholder = isChild
    ? placeholders.childFullName
    : placeholders.adultFullName;
  const dobPlaceholder = isChild ? placeholders.childDob : placeholders.adultDob;

  return (
    <div id="insurance-request">
      <form onSubmit={submit} className="rounded-[2rem] border border-[#49b8c8]/20 bg-white p-5 shadow-2xl shadow-[#128c8c]/10 sm:rounded-[3rem] sm:p-8 md:p-12">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <EdenLogo size="auth" />
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">
              {formT.secureEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#0b4f4f] sm:text-3xl md:text-4xl">
              {formT.title}
            </h2>
          </div>
        </div>

        <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">
          {formT.intro}
        </p>

        {!liveVerificationAvailable ? (
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-950">
            {formT.manualVerificationNotice ||
              "Instant Medicaid lookup is not connected yet. Submitting this form sends your information securely to Eden ABA staff for verification through an approved Virginia Medicaid provider portal, clearinghouse, or MediCall — not the public member website."}
          </div>
        ) : null}

        <div className="mt-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#128c8c]">
            {formT.verificationTypeLabel || "Verification Type"}
          </p>
          <div className="mt-3 inline-flex rounded-full border border-[#49b8c8]/25 bg-[#ddf4f4]/40 p-1">
            <button
              type="button"
              onClick={() => setVerificationType("child")}
              className={toggleClass(isChild)}
            >
              {formT.verificationTypes?.child || "Child / Dependent"}
            </button>
            <button
              type="button"
              onClick={() => setVerificationType("adult")}
              className={toggleClass(!isChild)}
            >
              {formT.verificationTypes?.adult || "Adult / Self"}
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {isChild ? (
            <>
              <input
                className={fieldClass}
                name="parentFirstName"
                value={form.parentFirstName || ""}
                onChange={(e) => update("parentFirstName", e.target.value)}
                placeholder={placeholders.parentFirstName}
                required
              />

              <input
                className={fieldClass}
                value={form.parentLastName || ""}
                onChange={(e) => update("parentLastName", e.target.value)}
                placeholder={placeholders.parentLastName}
                required
              />
            </>
          ) : null}

          <input
            className={fieldClass}
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder={placeholders.email}
            required
          />

          <input
            className={fieldClass}
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder={placeholders.phone}
            required
          />

          <input
            className={fieldClass}
            name="fullName"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder={fullNamePlaceholder}
            required
          />

          <input
            className={fieldClass}
            value={form.dateOfBirth}
            onChange={(e) => update("dateOfBirth", e.target.value)}
            placeholder={dobPlaceholder}
            required
          />

          <input
            className={fieldClass}
            value={form.zipCode}
            onChange={(e) => update("zipCode", e.target.value)}
            placeholder={placeholders.zipCode}
            required
          />

          <select
            className={fieldClass}
            value={form.insuranceProvider}
            onChange={(e) => update("insuranceProvider", e.target.value)}
            required
          >
            <option value="">{placeholders.insuranceProvider}</option>
            {formT.insuranceOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">
          <input
            className={fieldClass}
            value={form.medicaidId || ""}
            onChange={(e) => update("medicaidId", e.target.value)}
            placeholder={placeholders.medicaidId}
          />

          <div className="py-2 text-center text-sm font-extrabold text-slate-500 md:px-2 md:py-4">
            {formT.orLabel || "OR"}
          </div>

          <input
            className={fieldClass}
            type="password"
            value={form.ssn || ""}
            onChange={(e) => update("ssn", e.target.value)}
            placeholder={placeholders.ssn}
            autoComplete="off"
          />
        </div>

        <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-bold leading-6 text-slate-700">
          {formT.securityNotice}
        </div>

        <label className="mt-6 flex gap-3 rounded-2xl bg-[#ddf4f4]/60 p-4 text-sm font-bold leading-6 text-slate-700">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => update("consent", e.target.checked)}
            className="mt-1 h-5 w-5 accent-[#1f7a2e]"
            required
          />
          <span>{formT.consent}</span>
        </label>

        {touched && error && (
          <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-black text-red-700">
            {error}
          </p>
        )}

        <ReCaptchaVerification
          ref={recaptchaRef}
          onTokenChange={handleTokenChange}
          onExpired={handleExpired}
          error={recaptchaError}
          disabled={loading || verifying}
          noticeAlign="center"
          showNotice
          className="mt-6"
        />

        <Button
          type="submit"
          disabled={!complete || !recaptchaReady || loading || verifying || redirecting}
          className="mt-6 w-full"
        >
          {loading || verifying || redirecting
            ? redirecting
              ? "Redirecting…"
              : verifying
              ? "Verifying…"
              : liveVerificationAvailable
                ? formT.submitLoading
                : formT.submitLoadingManual || "Submitting…"
            : liveVerificationAvailable
              ? formT.submitButton
              : formT.submitButtonManual || "Submit Verification Request"}
        </Button>

      </form>
    </div>
  );
}

export default InsuranceVerificationForm;
