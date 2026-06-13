"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { FamilyPortalStatus } from "@/types/insurance";
import InsuranceDocumentUpload from "@/components/insurance/InsuranceDocumentUpload";
import InsuranceStatusTracker from "@/components/insurance/InsuranceStatusTracker";
import PortalSubmitSection from "@/components/insurance/PortalSubmitSection";

type Props = {
  requestId: string;
};

export default function FamilyPortalClient({ requestId }: Props) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [portal, setPortal] = useState<FamilyPortalStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [contactForm, setContactForm] = useState({ email: "", phone: "", zipCode: "" });
  const [savingContact, setSavingContact] = useState(false);

  const redirectToVerify = useCallback(() => {
    router.replace(`/insurance/status?ref=${encodeURIComponent(requestId)}`);
  }, [requestId, router]);

  const loadPortal = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/insurance/portal/${requestId}`, {
        credentials: "include",
        cache: "no-store",
      });

      if (response.status === 401) {
        setAuthenticated(false);
        redirectToVerify();
        return;
      }

      if (!response.ok) {
        throw new Error("Unable to load portal.");
      }

      const data = (await response.json()) as FamilyPortalStatus;
      setPortal(data);
      setAuthenticated(true);
      setContactForm({
        email: data.email,
        phone: data.phone,
        zipCode: data.zipCode,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load portal.");
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, [redirectToVerify, requestId]);

  useEffect(() => {
    loadPortal();
    if (authenticated) {
      const intervalId = window.setInterval(loadPortal, 8000);
      return () => window.clearInterval(intervalId);
    }
    return undefined;
  }, [authenticated, loadPortal]);

  const saveContact = async (event: React.FormEvent) => {
    event.preventDefault();
    setSavingContact(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/insurance/portal/${requestId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to update contact information.");
      }

      setPortal(data);
      setMessage("Contact information updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update contact information.");
    } finally {
      setSavingContact(false);
    }
  };

  if (authenticated === false || authenticated === null) {
    return (
      <p className="text-center text-sm font-semibold text-slate-500">
        {loading ? "Checking secure session…" : "Redirecting to identity verification…"}
      </p>
    );
  }

  if (!portal) {
    return (
      <p className="text-center text-sm font-semibold text-slate-500">
        {loading ? "Loading your portal…" : "Portal unavailable."}
      </p>
    );
  }

  const statusBadge =
    portal.portalSubmittedForReview && portal.status === "Pending Staff Review"
      ? "Pending Staff Review"
      : portal.status;

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-1 sm:space-y-8">
      <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-2xl sm:p-8">
        <div className="inline-flex rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-extrabold text-white">
          {statusBadge}
        </div>
        <h1 className="mt-4 text-2xl font-black sm:text-3xl">Insurance Verification Portal</h1>
        <p className="mt-2 text-sm font-semibold text-slate-300">
          Reference: <span className="font-mono text-slate-200">{portal.requestId}</span>
        </p>

        <InsuranceStatusTracker timeline={portal.timeline} compact />

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <PortalField
            label="Submitted"
            value={new Date(portal.submittedAt).toLocaleString()}
          />
          <PortalField
            label="Last Updated"
            value={new Date(portal.updatedAt).toLocaleString()}
          />
        </div>

        {portal.familyPortalSubmittedAt ? (
          <div className="mt-3">
            <PortalField
              label="Submitted for Staff Review"
              value={new Date(portal.familyPortalSubmittedAt).toLocaleString()}
            />
          </div>
        ) : null}

        {portal.status === "Coverage Active" ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <PortalField label="Plan Name" value={portal.planName} />
            <PortalField label="Effective Date" value={portal.effectiveDate} />
          </div>
        ) : null}

        {portal.status === "Coverage Active" && (portal.programType || portal.subprogramType) ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <PortalField label="Program" value={portal.programType} />
            <PortalField label="Subprogram" value={portal.subprogramType} />
          </div>
        ) : null}

        <p className="mt-4 text-xs font-semibold text-slate-400">
          Reference ID: <span className="font-mono">{portal.requestId}</span>
        </p>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-black text-slate-900">Update Contact Information</h2>
        <form onSubmit={saveContact} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">
            Email
            <input
              type="email"
              required
              className="rounded-2xl border border-slate-200 px-4 py-3"
              value={contactForm.email}
              onChange={(event) =>
                setContactForm((prev) => ({ ...prev, email: event.target.value }))
              }
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Phone
            <input
              type="tel"
              required
              className="rounded-2xl border border-slate-200 px-4 py-3"
              value={contactForm.phone}
              onChange={(event) =>
                setContactForm((prev) => ({ ...prev, phone: event.target.value }))
              }
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            ZIP Code
            <input
              required
              className="rounded-2xl border border-slate-200 px-4 py-3"
              value={contactForm.zipCode}
              onChange={(event) =>
                setContactForm((prev) => ({ ...prev, zipCode: event.target.value }))
              }
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={savingContact}
              className="w-full rounded-full bg-[#128c8c] px-6 py-3 text-sm font-extrabold text-white disabled:opacity-60 sm:w-auto"
            >
              {savingContact ? "Saving…" : "Save Contact Info"}
            </button>
          </div>
        </form>
        {message ? <p className="mt-3 text-sm font-bold text-emerald-700">{message}</p> : null}
        {error ? <p className="mt-3 text-sm font-bold text-red-600">{error}</p> : null}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-black text-slate-900">Upload Documents</h2>
        <InsuranceDocumentUpload
          requestId={requestId}
          category="insurance_card"
          label="Insurance Card"
          description="Front and back of your insurance card if available."
          existingDocuments={portal.documents}
          onChange={() => loadPortal()}
        />
        <InsuranceDocumentUpload
          requestId={requestId}
          category="medicaid_document"
          label="Medicaid Documents"
          description="Medicaid approval letters or enrollment documents."
          existingDocuments={portal.documents}
          onChange={() => loadPortal()}
        />
        <InsuranceDocumentUpload
          requestId={requestId}
          category="referral"
          label="Referral Documents"
          description="Physician referral or diagnostic evaluation paperwork."
          existingDocuments={portal.documents}
          onChange={() => loadPortal()}
        />
      </section>

      <PortalSubmitSection
        requestId={requestId}
        portal={portal}
        contactForm={contactForm}
        onSubmitted={() => loadPortal()}
      />
    </div>
  );
}

function PortalField({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-xl bg-white/10 p-3">
      <p className="text-xs font-extrabold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-white">{value || "—"}</p>
    </div>
  );
}
