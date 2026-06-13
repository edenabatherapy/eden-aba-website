"use client";

import Link from "next/link";
import { useState } from "react";
import { validateDOB, normalizeDOB } from "@/lib/insurance/dates";
import { PORTAL_VERIFY_FAILURE_MESSAGE, PORTAL_IDENTITY_HELPER } from "@/lib/insurance/portal/messages";
import { normalizeLast4 } from "@/lib/insurance/portal/normalizeLast4";
import type { LiveEligibilityStatus } from "@/lib/insurance/eligibility/types";
import ReCaptchaVerification from "@/components/security/ReCaptchaVerification";
import { useReCaptchaV2 } from "@/hooks/useReCaptchaV2";
import RecaptchaNotice from "@/components/RecaptchaNotice";

type Props = {
  requestId?: string;
};

type ContactMode = "email" | "phone";

type VerifiedStatus = {
  requestId: string;
  live: boolean;
  source: "live_eligibility_api" | "stored_record";
  status: LiveEligibilityStatus;
  statusLabel: string;
  statusMessage: string;
  checkedAt: string | null;
  fallbackReason: string | null;
  redirectTo: string;
};

const isDev = process.env.NODE_ENV === "development";

function statusPanelClass(status: LiveEligibilityStatus): string {
  switch (status) {
    case "active":
      return "border-emerald-200 bg-emerald-50 text-emerald-950";
    case "inactive":
      return "border-slate-200 bg-slate-50 text-slate-800";
    case "unknown":
      return "border-amber-200 bg-amber-50 text-amber-950";
    case "pending":
    default:
      return "border-[#49b8c8]/30 bg-[#ddf4f4]/50 text-[#0b4f4f]";
  }
}

export default function PortalVerifyForm({ requestId: initialRequestId }: Props) {
  const {
    recaptchaRef,
    recaptchaError,
    verifying,
    verifyingMessage,
    canSubmit: recaptchaReady,
    handleTokenChange,
    requireRecaptcha,
    verifyRecaptchaWithServer,
  } = useReCaptchaV2();

  const hasRefFromUrl = Boolean(initialRequestId?.trim());
  const [requestId, setRequestId] = useState(initialRequestId || "");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [lastFour, setLastFour] = useState("");
  const [contactMode, setContactMode] = useState<ContactMode>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verifiedStatus, setVerifiedStatus] = useState<VerifiedStatus | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setVerifiedStatus(null);

    const dobCheck = validateDOB(dateOfBirth);
    if (!dobCheck.valid) {
      setError(PORTAL_VERIFY_FAILURE_MESSAGE);
      return;
    }

    const normalizedDob = normalizeDOB(dateOfBirth.trim());
    if (!normalizedDob) {
      setError(PORTAL_VERIFY_FAILURE_MESSAGE);
      return;
    }

    const normalizedLastFour = normalizeLast4(lastFour);
    if (normalizedLastFour.length !== 4) {
      setError(PORTAL_VERIFY_FAILURE_MESSAGE);
      return;
    }

    const emailOrPhone = contactMode === "email" ? email.trim() : phone.trim();
    if (!emailOrPhone) {
      setError(PORTAL_VERIFY_FAILURE_MESSAGE);
      return;
    }

    if (!requireRecaptcha()) {
      setError("Please complete the security verification.");
      return;
    }

    setLoading(true);

    try {
      const recaptcha = await verifyRecaptchaWithServer();
      if (!recaptcha.success) {
        setError("Security verification failed. Please try again.");
        return;
      }

      const response = await fetch("/api/insurance/portal/verify", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: requestId.trim() || undefined,
          dateOfBirth: normalizedDob,
          lastFour: normalizedLastFour,
          emailOrPhone,
          recaptchaToken: recaptcha.token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.message || PORTAL_VERIFY_FAILURE_MESSAGE);
        return;
      }

      setVerifiedStatus({
        requestId: data.requestId,
        live: Boolean(data.live),
        source: data.source === "stored_record" ? "stored_record" : "live_eligibility_api",
        status: data.status ?? "unknown",
        statusLabel: data.statusLabel ?? "Unknown",
        statusMessage: data.statusMessage ?? "",
        checkedAt: data.checkedAt ?? null,
        fallbackReason: data.fallbackReason ?? null,
        redirectTo: data.redirectTo || `/insurance/portal/${data.requestId}`,
      });
    } catch {
      setError(PORTAL_VERIFY_FAILURE_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#128c8c] focus:ring-4 focus:ring-[#49b8c8]/20";

  const formDisabled = loading || verifying;

  if (verifiedStatus) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-[#49b8c8]/20 bg-white p-6 shadow-xl sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#128c8c]">
          Identity Verified
        </p>

        <div
          className={`mt-4 rounded-2xl border p-5 ${statusPanelClass(verifiedStatus.status)}`}
        >
          <h2 className="text-xl font-semibold sm:text-2xl">
            {verifiedStatus.live
              ? `Live Insurance Status: ${verifiedStatus.statusLabel}`
              : `Eden Recorded Status: ${verifiedStatus.statusLabel}`}
          </h2>
          {verifiedStatus.live ? (
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
              {verifiedStatus.statusMessage}
            </p>
          ) : (
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
              Showing Eden recorded status because live eligibility is unavailable.
            </p>
          )}
          {!verifiedStatus.live && verifiedStatus.statusMessage ? (
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
              {verifiedStatus.statusMessage}
            </p>
          ) : null}
          {verifiedStatus.live && verifiedStatus.checkedAt ? (
            <p className="mt-2 text-xs font-semibold text-slate-500">
              Checked live at {new Date(verifiedStatus.checkedAt).toLocaleString()}
            </p>
          ) : null}
          {isDev ? (
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white/70 p-3 font-mono text-xs text-slate-700">
              <p>live: {String(verifiedStatus.live)}</p>
              <p>source: {verifiedStatus.source}</p>
              {verifiedStatus.fallbackReason ? (
                <p>fallbackReason: {verifiedStatus.fallbackReason}</p>
              ) : null}
            </div>
          ) : null}
        </div>

        <Link
          href={verifiedStatus.redirectTo}
          className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#1f7a2e] px-6 py-4 text-sm font-extrabold text-white"
        >
          Open Full Request Portal
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-[#49b8c8]/20 bg-white p-6 shadow-xl sm:p-8">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#128c8c]">
        Secure Identity Verification
      </p>
      <h1 className="mt-2 text-2xl font-black text-[#0b4f4f] sm:text-3xl">
        Verify Your Identity for Live Insurance Status
      </h1>
      <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
        {PORTAL_IDENTITY_HELPER}
      </p>
      <p className="mt-3 rounded-xl border border-[#49b8c8]/20 bg-[#ddf4f4]/40 p-3 text-xs font-semibold leading-5 text-slate-600">
        Use the email or phone number submitted on your insurance request. We never display
        full SSN or Medicaid ID numbers on this page.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
        <fieldset disabled={formDisabled} className="space-y-4">
        {!hasRefFromUrl ? (
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Reference ID (optional)
            <input
              className={fieldClass}
              value={requestId}
              onChange={(event) => setRequestId(event.target.value)}
              placeholder="From your confirmation screen"
              autoComplete="off"
              inputMode="text"
            />
          </label>
        ) : (
          <input type="hidden" name="requestId" value={requestId} />
        )}

        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Date of birth
          <input
            className={fieldClass}
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
            placeholder="MM/DD/YYYY (e.g. 01/05/2018)"
            required
            autoComplete="bday"
            inputMode="text"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Last 4 characters of SSN or Medicaid ID
          <input
            className={fieldClass}
            value={lastFour}
            onChange={(event) =>
              setLastFour(
                event.target.value
                  .replace(/\s+/g, "")
                  .replace(/[^A-Za-z0-9]/g, "")
                  .toUpperCase()
                  .slice(0, 4),
              )
            }
            placeholder="Last 4 characters"
            required
            type="password"
            autoComplete="off"
            inputMode="text"
            maxLength={4}
          />
          <span className="text-xs font-semibold text-slate-500">
            For Medicaid ID ABC123, enter C123. For numeric IDs ending in 9015, enter 9015.
          </span>
        </label>

        {contactMode === "email" ? (
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Email from your request
            <input
              className={fieldClass}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="family@example.com"
              required
              autoComplete="email"
            />
          </label>
        ) : (
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Phone from your request
            <input
              className={fieldClass}
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="(555) 555-0100"
              required
              autoComplete="tel"
            />
          </label>
        )}

        <button
          type="button"
          disabled={formDisabled}
          onClick={() => setContactMode(contactMode === "email" ? "phone" : "email")}
          className="text-sm font-extrabold text-[#128c8c] underline-offset-2 hover:underline disabled:opacity-60"
        >
          {contactMode === "email" ? "Use phone instead of email" : "Use email instead of phone"}
        </button>
        </fieldset>

        {error ? (
          <p
            className="rounded-xl bg-red-50 p-4 text-sm font-bold leading-6 text-red-700"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <ReCaptchaVerification
          ref={recaptchaRef}
          onTokenChange={handleTokenChange}
          error={recaptchaError}
          disabled={formDisabled}
        />

        {verifying ? (
          <p className="text-sm font-bold text-slate-600">{verifyingMessage}</p>
        ) : null}

        <button
          type="submit"
          disabled={formDisabled || !recaptchaReady}
          className="min-h-[48px] w-full rounded-full bg-[#1f7a2e] px-6 py-4 text-sm font-extrabold text-white disabled:opacity-60"
        >
          {verifying
            ? verifyingMessage
            : loading
              ? "Checking live eligibility…"
              : "Confirm Identity & Check Eligibility"}
        </button>
      </form>

      <div className="mt-4">
        <RecaptchaNotice label="Protected by reCAPTCHA." />
      </div>
    </div>
  );
}
