"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import ReCaptchaVerification from "@/components/security/ReCaptchaVerification";
import { useReCaptchaV2 } from "@/hooks/useReCaptchaV2";
import type { FamilyPortalStatus } from "@/types/insurance";

type Props = {
  requestId: string;
  portal: FamilyPortalStatus;
  contactForm: { email: string; phone: string; zipCode: string };
  onSubmitted: () => void;
  disabled?: boolean;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function PortalSubmitSection({
  requestId,
  portal,
  contactForm,
  onSubmitted,
  disabled = false,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {
    recaptchaRef,
    recaptchaError,
    verifying,
    verifyingMessage,
    canSubmit: recaptchaReady,
    handleTokenChange,
    resetRecaptcha,
    requireRecaptcha,
    verifyRecaptchaWithServer,
  } = useReCaptchaV2();

  const contactComplete = Boolean(
    contactForm.email.trim() && contactForm.phone.trim() && contactForm.zipCode.trim(),
  );
  const insuranceCardUploaded = portal.hasInsuranceCard;
  const canSubmit =
    !portal.portalSubmittedForReview && contactComplete && insuranceCardUploaded && !disabled;

  const checklist = [
    {
      label: "Contact information completed",
      done: contactComplete,
    },
    {
      label: "Insurance card uploaded",
      done: insuranceCardUploaded,
    },
    {
      label: "Medicaid documents uploaded if applicable",
      done: portal.hasMedicaidDocuments,
      optional: true,
    },
    {
      label: "Referral documents uploaded if available",
      done: portal.hasReferralDocuments,
      optional: true,
    },
  ];

  const handleSubmit = async () => {
    if (!requireRecaptcha()) {
      setError("Please complete the security verification.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const recaptcha = await verifyRecaptchaWithServer();
      if (!recaptcha.success) {
        setError("Security verification failed. Please try again.");
        return;
      }

      const response = await fetch(`/api/insurance/portal/${requestId}/submit`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contactForm, recaptchaToken: recaptcha.token }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message || "Submission failed.");
      }

      setShowModal(false);
      setSuccessMessage(
        "Your insurance verification request has been submitted. Eden ABA Therapy's intake team has been notified and will review your information.",
      );
      resetRecaptcha();
      onSubmitted();
    } catch (err) {
      setError(
        err instanceof Error && err.message !== "Submission failed."
          ? err.message
          : "We couldn't submit your request. Please try again or contact Eden ABA Therapy for help.",
      );
      resetRecaptcha();
    } finally {
      setSubmitting(false);
    }
  };

  if (portal.portalSubmittedForReview && !successMessage) {
    return (
      <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-black text-emerald-900">Submitted for Staff Review</h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-emerald-800">
          Your insurance verification request has been submitted. Eden ABA Therapy&apos;s intake
          team has been notified and will review your information.
        </p>
        {portal.familyPortalSubmittedAt ? (
          <p className="mt-2 text-xs font-semibold text-emerald-700">
            Submitted {new Date(portal.familyPortalSubmittedAt).toLocaleString()}
          </p>
        ) : null}
      </section>
    );
  }

  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-black text-slate-900">Ready to Submit?</h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
          Please review your contact information and uploaded documents. When everything looks
          correct, submit your insurance verification request for Eden ABA Therapy&apos;s intake
          team to review.
        </p>

        <ul className="mt-6 space-y-3">
          {checklist.map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  item.done
                    ? "bg-emerald-500 text-white"
                    : item.optional
                      ? "border border-slate-300 bg-white text-slate-300"
                      : "border border-slate-300 bg-white text-slate-300"
                }`}
              >
                {item.done ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
              </span>
              <span
                className={`text-sm font-semibold ${
                  item.done ? "text-slate-800" : "text-slate-500"
                }`}
              >
                {item.label}
                {item.optional ? (
                  <span className="ml-1 text-xs font-medium text-slate-400">(optional)</span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-stretch sm:justify-end">
          <button
            type="button"
            disabled={!canSubmit || submitting}
            onClick={() => setShowModal(true)}
            className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#128c8c] to-[#1f7a2e] px-8 py-4 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none sm:w-auto sm:min-w-[240px]"
          >
            {submitting ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Submitting...
              </span>
            ) : (
              "Submit for Staff Review"
            )}
          </button>
        </div>

        {successMessage ? (
          <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
            {successMessage}
          </p>
        ) : null}
        {error ? (
          <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
            {error}
          </p>
        ) : null}
      </section>

      {showModal ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-modal-title"
        >
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <h3 id="submit-modal-title" className="text-xl font-black text-slate-900">
              Submit insurance verification request?
            </h3>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
              Once submitted, Eden ABA Therapy&apos;s intake coordinator or insurance verifier will
              be notified and will review your documents. You can still return to this portal to add
              additional documents if needed.
            </p>

            <ReCaptchaVerification
              ref={recaptchaRef}
              onTokenChange={handleTokenChange}
              error={recaptchaError}
              disabled={submitting || verifying}
              className="mt-6"
            />

            {verifying ? (
              <p className="mt-3 text-sm font-bold text-slate-600">{verifyingMessage}</p>
            ) : null}

            {error ? (
              <p className="mt-3 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>
            ) : null}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={submitting || verifying}
                onClick={() => setShowModal(false)}
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-extrabold text-slate-700 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={submitting || verifying || !recaptchaReady}
                onClick={() => void handleSubmit()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#128c8c] to-[#1f7a2e] px-6 py-3 text-sm font-extrabold text-white shadow-md disabled:opacity-50"
              >
                {submitting || verifying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    {verifying ? verifyingMessage : "Submitting..."}
                  </>
                ) : (
                  "Yes, Submit for Review"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export { formatFileSize };
