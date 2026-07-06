"use client";

import { type ButtonHTMLAttributes, useCallback, useEffect, useState } from "react";
import type {
  InsuranceVerificationRequest,
  InsuranceVerificationResponse,
  PublicVerificationStatus,
  VerificationType,
} from "@/types/insurance";
import { formatDOBForDisplay, validateDOB } from "@/lib/insurance/dates";
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
import InsuranceStatusTracker from "@/components/insurance/InsuranceStatusTracker";
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

function ResultItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-5">
      <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-300">{label}</p>
      <p className="mt-2 text-lg font-bold">{value}</p>
    </div>
  );
}

function InsuranceVerificationForm({ t, onSchedule, onHome, onStart }) {
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
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<InsuranceVerificationResponse | null>(null);
  const [publicStatus, setPublicStatus] = useState<PublicVerificationStatus | null>(null);
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

  const fetchPublicStatus = useCallback(async (requestId: string) => {
    try {
      const response = await fetch(`/api/insurance/verify/${requestId}`, {
        cache: "no-store",
      });
      if (!response.ok) return;
      const data = (await response.json()) as PublicVerificationStatus;
      setPublicStatus(data);
    } catch {
      /* ignore — keep last known status */
    }
  }, []);

  useEffect(() => {
    if (!result?.requestId) {
      setPublicStatus(null);
      return;
    }

    fetchPublicStatus(result.requestId);
    const intervalId = window.setInterval(() => {
      fetchPublicStatus(result.requestId!);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [result?.requestId, fetchPublicStatus]);

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
    setTouched(true);
    setError("");
    setResult(null);

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

      const data = await response.json();

      if (!response.ok) {
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

      setResult(data as InsuranceVerificationResponse);
      resetRecaptcha();
    } catch {
      setError(formT.errors?.submitRetry || "Something went wrong. Please try again.");
      resetRecaptcha();
    } finally {
      setLoading(false);
    }
  };

  const resetVerification = () => {
    setForm(emptyForm);
    setResult(null);
    setPublicStatus(null);
    setError("");
    setTouched(false);

    window.scrollTo({
      top: document.getElementById("insurance-request")?.offsetTop || 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      (document.querySelector('input[name="parentFirstName"]') as HTMLInputElement | null)?.focus();
    }, 100);
  };

  const resultLabels = formT.result || {};
  const placeholders = formT.placeholders || {};
  const fullNamePlaceholder = isChild
    ? placeholders.childFullName
    : placeholders.adultFullName;
  const dobPlaceholder = isChild ? placeholders.childDob : placeholders.adultDob;

  const displayStatus = publicStatus?.status || result?.verificationStatus || "";
  const isCoverageActive = displayStatus === "Coverage Active";
  const isCoverageInactive = displayStatus === "Coverage Inactive";
  const isUnableToVerify = displayStatus === "Unable To Verify";
  const isPendingReview = displayStatus === "Pending Staff Review";

  const badgeClass = isCoverageActive
    ? "bg-emerald-500"
    : isCoverageInactive
      ? "bg-slate-400 text-slate-950"
      : isUnableToVerify
        ? "bg-red-500"
        : "bg-yellow-500 text-slate-950";

  const formatUpdatedAt = (value: string | null | undefined) => {
    if (!value) return "";
    return new Date(value).toLocaleString();
  };

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
          disabled={!complete || !recaptchaReady || loading || verifying}
          className="mt-6 w-full"
        >
          {loading || verifying
            ? verifying
              ? "Verifying…"
              : liveVerificationAvailable
                ? formT.submitLoading
                : formT.submitLoadingManual || "Submitting…"
            : liveVerificationAvailable
              ? formT.submitButton
              : formT.submitButtonManual || "Submit Verification Request"}
        </Button>

      </form>

      {result && (
        <div className="mt-8 rounded-[1.5rem] bg-slate-950 p-5 text-white shadow-2xl sm:mt-10 sm:rounded-[2rem] sm:p-8 md:p-10">
          <div className={`mb-5 inline-flex rounded-full px-5 py-2 text-sm font-extrabold ${badgeClass}`}>
            {displayStatus || resultLabels.pendingBadge || "Pending Staff Review"}
          </div>

          {publicStatus?.timeline?.length ? (
            <InsuranceStatusTracker timeline={publicStatus.timeline} />
          ) : null}

          <h3 className="text-2xl font-extrabold sm:text-3xl">
            {isCoverageActive
              ? resultLabels.title || "Verification Results"
              : isPendingReview
                ? resultLabels.titlePending || "Verification Request Received"
                : resultLabels.title || "Verification Results"}
          </h3>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ResultItem
              label={resultLabels.verificationStatus || "Verification Status"}
              value={displayStatus}
            />
            <ResultItem label={resultLabels.memberName || "Member Name"} value={result.memberName} />
            <ResultItem
              label={resultLabels.dateOfBirth || "Date of Birth"}
              value={formatDOBForDisplay(result.dateOfBirth)}
            />
            <ResultItem
              label={resultLabels.eligibilityStatus || "Eligibility Status"}
              value={displayStatus}
            />

            {isCoverageActive && publicStatus ? (
              <>
                <ResultItem
                  label={resultLabels.programType || "Program Type"}
                  value={publicStatus.programType || resultLabels.noneListed || "None listed"}
                />
                <ResultItem
                  label={resultLabels.subprogramType || "Subprogram Type"}
                  value={publicStatus.subprogramType || resultLabels.noneListed || "None listed"}
                />
                <ResultItem
                  label={resultLabels.currentEnrollmentChoice || "Plan Name"}
                  value={publicStatus.planName || resultLabels.noneListed || "None listed"}
                />
                <ResultItem
                  label={resultLabels.effectiveDate || "Effective Date"}
                  value={publicStatus.effectiveDate || resultLabels.noneListed || "None listed"}
                />
              </>
            ) : null}
          </div>

          {publicStatus?.updatedAt ? (
            <p className="mt-4 text-sm font-semibold text-slate-400">
              Last updated: {formatUpdatedAt(publicStatus.updatedAt)}
            </p>
          ) : null}

          {isPendingReview ? (
            <p className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-5 text-sm font-semibold leading-7 text-amber-100">
              {resultLabels.pendingExplanation ||
                "Your request has been received. Eden ABA Therapy staff will verify eligibility through approved Medicaid verification workflows."}
            </p>
          ) : null}

          {isPendingReview ? (
            <p className="mt-4 rounded-2xl bg-white/10 p-5 text-sm font-semibold leading-7 text-slate-300">
              {resultLabels.pendingDetailsMessage ||
                "Medicaid plan details will appear here after Eden staff complete verification through an approved provider portal, clearinghouse, or MediCall workflow."}
            </p>
          ) : null}

          {isCoverageInactive ? (
            <p className="mt-4 rounded-2xl bg-white/10 p-5 text-sm font-semibold leading-7 text-slate-300">
              Staff review indicates coverage is currently inactive. Eden ABA Therapy will contact your family with secure next steps.
            </p>
          ) : null}

          {isUnableToVerify ? (
            <p className="mt-4 rounded-2xl bg-white/10 p-5 text-sm font-semibold leading-7 text-slate-300">
              Staff were unable to verify eligibility with the information provided. Eden ABA Therapy will contact your family to help complete verification.
            </p>
          ) : null}

          {isPendingReview ? (
            <div className="mt-6 rounded-2xl bg-white/10 p-5">
              <p className="font-extrabold text-emerald-300">{resultLabels.notes || "Notes"}</p>
              <p className="mt-2 leading-7 text-slate-200">{result.notes}</p>
            </div>
          ) : null}

          {result.requestId ? (
            <div className="mt-6 rounded-2xl border border-[#49b8c8]/30 bg-[#128c8c]/10 p-4 sm:p-5">
              <p className="text-sm font-extrabold text-emerald-200">Family Self-Service Portal</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-300">
                Track status, upload documents, and update contact information anytime.
              </p>
              <a
                href={`/insurance/status?ref=${encodeURIComponent(result.requestId)}`}
                className="mt-4 inline-flex min-h-[44px] items-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-400"
              >
                Verify Identity & View Status →
              </a>
            </div>
          ) : null}

          {isCoverageActive ? (
            <Button className="mt-8 w-full" onClick={onStart || onSchedule}>
              {resultLabels.continueIntake || "Continue Intake →"}
            </Button>
          ) : null}

          <button
            type="button"
            onClick={resetVerification}
            className="mt-4 w-full rounded-full border-2 border-emerald-500 bg-transparent px-8 py-4 font-extrabold text-emerald-400 transition hover:bg-emerald-500 hover:text-white"
          >
            {resultLabels.verifyAnotherClient || "Verify Another Client"}
          </button>
        </div>
      )}
    </div>
  );
}

export default InsuranceVerificationForm;
