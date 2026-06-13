"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { formatDOBForDisplay } from "@/lib/insurance/dates";
import {
  STAFF_REVIEW_INTERNAL_STATUSES,
  VERIFICATION_STATUSES,
  type StaffReviewInternalStatus,
  type VerificationStatus,
} from "@/lib/insurance/db/model";
import { internalStatusLabel } from "@/lib/insurance/admin/serializeRecord";
import {
  getInsuranceStatusLabel,
  INSURANCE_STATUSES,
  type InsuranceStatus,
} from "@/lib/insurance/portal/status";
import AdminActivityTimeline from "@/components/insurance/AdminActivityTimeline";
import AdminMetricsDashboard from "@/components/insurance/AdminMetricsDashboard";

const STAFF_NAME_KEY = "eden_insurance_staff_name";

type ListItem = {
  id: string;
  clientName: string;
  dateOfBirth: string;
  status: VerificationStatus;
  planName: string | null;
  effectiveDate: string | null;
  submittedAt: string;
  familyPortalSubmittedAt: string | null;
  verifiedAt: string | null;
  insuranceProvider: string;
  verificationType: "child" | "adult";
  email: string;
  phone: string;
  zipCode: string;
  documentsUploaded: number;
  staffReviewInternalStatus: StaffReviewInternalStatus;
};

type AdminDocument = {
  id: string;
  category: string;
  safeName: string;
  size: number;
  uploadedAt: string;
  mimeType: string;
};

type DetailRecord = ListItem & {
  insuranceStatus: InsuranceStatus;
  insuranceStatusLabel: string;
  programType: string | null;
  subprogramType: string | null;
  notes: string | null;
  verifiedBy: string | null;
  updatedAt: string;
  parentFirstName: string | null;
  parentLastName: string | null;
  medicaidIdMasked: string | null;
  ssnMasked: string | null;
  hasMedicaidId: boolean;
  hasSsn: boolean;
  documents: AdminDocument[];
  staffReview: {
    assignedTo: string | null;
    reviewedAt: string | null;
    reviewNotes: string;
    internalStatus: StaffReviewInternalStatus;
  };
};

const PHI_REVEAL_TIMEOUT_MS = 30_000;

const fetchOptions: RequestInit = {
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

function statusBadgeClass(status: VerificationStatus) {
  switch (status) {
    case "Active":
      return "bg-emerald-100 text-emerald-900";
    case "Inactive":
      return "bg-slate-200 text-slate-800";
    case "Unable To Verify":
      return "bg-red-100 text-red-900";
    default:
      return "bg-amber-100 text-amber-950";
  }
}

function formatTimestamp(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString();
}

export default function InsuranceVerificationsAdminPage() {
  const [loginToken, setLoginToken] = useState("");
  const [staffName, setStaffName] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [sessionExpiresAt, setSessionExpiresAt] = useState<string | null>(null);
  const [records, setRecords] = useState<ListItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<DetailRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [statusFilter, setStatusFilter] = useState<VerificationStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [editStatus, setEditStatus] = useState<VerificationStatus>("Pending Staff Review");
  const [editInsuranceStatus, setEditInsuranceStatus] = useState<InsuranceStatus>("pending");
  const [editPlanName, setEditPlanName] = useState("");
  const [editEffectiveDate, setEditEffectiveDate] = useState("");
  const [editProgramType, setEditProgramType] = useState("");
  const [editSubprogramType, setEditSubprogramType] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editInternalStatus, setEditInternalStatus] =
    useState<StaffReviewInternalStatus>("awaiting_family_submission");
  const [editStaffReviewNotes, setEditStaffReviewNotes] = useState("");

  const [revealedPhi, setRevealedPhi] = useState<{
    medicaidId: string | null;
    ssn: string | null;
  } | null>(null);
  const [revealLoading, setRevealLoading] = useState(false);
  const [adminView, setAdminView] = useState<"queue" | "metrics">("queue");

  const hideRevealedPhi = useCallback(() => {
    setRevealedPhi(null);
  }, []);

  const checkSession = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/auth/session", fetchOptions);
      if (!response.ok) return false;
      const data = await response.json();
      setAuthenticated(Boolean(data.authenticated));
      if (data.staffName) setStaffName(data.staffName);
      return Boolean(data.authenticated);
    } catch {
      return false;
    }
  }, []);

  const loadQueue = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (searchQuery.trim()) params.set("search", searchQuery.trim());
      params.set("sort", "newest");

      const response = await fetch(`/api/admin/insurance-verifications?${params}`, fetchOptions);
      if (response.status === 401) {
        setAuthenticated(false);
        setError("Session expired. Please sign in again.");
        return;
      }
      const data = await response.json();
      setRecords(data.records || []);
    } catch {
      setError("Unable to load verification queue.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    const savedName = sessionStorage.getItem(STAFF_NAME_KEY);
    if (savedName) setStaffName(savedName);

    checkSession().then((ok) => {
      if (ok) loadQueue();
    });
  }, [checkSession, loadQueue]);

  useEffect(() => {
    if (authenticated) loadQueue();
  }, [authenticated, statusFilter, loadQueue]);

  const loadDetail = async (id: string) => {
    setLoading(true);
    setError("");
    hideRevealedPhi();
    try {
      const response = await fetch(`/api/admin/insurance-verifications/${id}`, fetchOptions);
      if (!response.ok) {
        setError("Unable to load request details.");
        return;
      }
      const data = await response.json();
      const record = data.record as DetailRecord;
      setDetail(record);
      setSelectedId(id);
      setEditStatus(record.status);
      setEditInsuranceStatus(record.insuranceStatus);
      setEditPlanName(record.planName || "");
      setEditEffectiveDate(record.effectiveDate || "");
      setEditProgramType(record.programType || "");
      setEditSubprogramType(record.subprogramType || "");
      setEditNotes(record.notes || "");
      setEditInternalStatus(record.staffReview?.internalStatus || "awaiting_family_submission");
      setEditStaffReviewNotes(record.staffReview?.reviewNotes || "");
    } catch {
      setError("Unable to load request details.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!loginToken.trim()) return;

    setError("");
    const response = await fetch("/api/admin/auth/login", {
      method: "POST",
      ...fetchOptions,
      body: JSON.stringify({
        token: loginToken.trim(),
        staffName: staffName.trim() || "Staff",
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "Sign in failed.");
      return;
    }

    const data = await response.json();
    setAuthenticated(true);
    setSessionExpiresAt(data.expiresAt || null);
    setLoginToken("");
    if (staffName.trim()) {
      sessionStorage.setItem(STAFF_NAME_KEY, staffName.trim());
    }
    await loadQueue();
  };

  const revealPhi = async () => {
    if (!selectedId) return;
    setRevealLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/admin/insurance-verifications/${selectedId}/reveal`,
        { method: "POST", ...fetchOptions },
      );
      if (!response.ok) {
        setError("Unable to reveal identifiers.");
        return;
      }
      const data = await response.json();
      setRevealedPhi(data.revealed || null);
      window.setTimeout(hideRevealedPhi, PHI_REVEAL_TIMEOUT_MS);
    } catch {
      setError("Unable to reveal identifiers.");
    } finally {
      setRevealLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth/session", { method: "POST", ...fetchOptions });
    sessionStorage.removeItem(STAFF_NAME_KEY);
    setAuthenticated(false);
    setRecords([]);
    setDetail(null);
    setSelectedId(null);
    setSessionExpiresAt(null);
  };

  const saveUpdate = async (patch: Record<string, unknown>) => {
    if (!selectedId) return;
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(`/api/admin/insurance-verifications/${selectedId}`, {
        method: "PATCH",
        ...fetchOptions,
        body: JSON.stringify({
          verifiedBy: staffName.trim() || undefined,
          ...patch,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Update failed.");
        return;
      }
      setMessage("Request updated.");
      await loadQueue();
      await loadDetail(selectedId);
    } catch {
      setError("Update failed.");
    } finally {
      setSaving(false);
    }
  };

  const exportCsv = async () => {
    setError("");
    const params = new URLSearchParams();
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (searchQuery.trim()) params.set("search", searchQuery.trim());

    const response = await fetch(
      `/api/admin/insurance-verifications/export?${params}`,
      fetchOptions,
    );

    if (response.status === 403) {
      setError("Export is disabled. Set INSURANCE_EXPORT_ENABLED=true on the server.");
      return;
    }

    if (!response.ok) {
      setError("Export failed.");
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `insurance-verifications-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage("Export downloaded (PHI-free CSV).");
  };

  const pendingCount = useMemo(
    () =>
      records.filter(
        (r) =>
          r.status === "Pending Staff Review" ||
          r.staffReviewInternalStatus === "new_submission" ||
          r.staffReviewInternalStatus === "in_review",
      ).length,
    [records],
  );

  const submittedRecords = useMemo(
    () =>
      [...records].sort((a, b) => {
        const aTime = new Date(a.familyPortalSubmittedAt || a.submittedAt).getTime();
        const bTime = new Date(b.familyPortalSubmittedAt || b.submittedAt).getTime();
        return bTime - aTime;
      }),
    [records],
  );

  const downloadDocument = async (documentId: string, filename: string) => {
    if (!selectedId) return;
    try {
      const response = await fetch(
        `/api/admin/insurance-verifications/${selectedId}/documents/${documentId}`,
        { credentials: "include" },
      );
      if (!response.ok) {
        setError("Unable to download document.");
        return;
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Unable to download document.");
    }
  };

  const downloadAllDocuments = () => {
    if (!detail?.documents.length) return;
    detail.documents.forEach((doc) => {
      void downloadDocument(doc.id, doc.safeName);
    });
  };

  if (!authenticated) {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16">
        <h1 className="text-3xl font-black text-[#0b4f4f]">Staff Verification Queue</h1>
        <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
          Sign in with your staff access token. Sessions expire automatically for security.
        </p>
        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-4 rounded-3xl border border-[#49b8c8]/25 bg-white p-8 shadow-lg"
        >
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Staff name (for audit trail)
            <input
              className="rounded-2xl border border-slate-200 px-4 py-3"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              placeholder="Your name"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Access token
            <input
              type="password"
              className="rounded-2xl border border-slate-200 px-4 py-3"
              value={loginToken}
              onChange={(e) => setLoginToken(e.target.value)}
              placeholder="INSURANCE_STAFF_ADMIN_TOKEN"
              required
              autoComplete="off"
            />
          </label>
          {error ? (
            <p className="rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-full bg-[#1f7a2e] px-6 py-3 font-extrabold text-white"
          >
            Sign in
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#0b4f4f]">Insurance Verification Queue</h1>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            {records.length} shown · {pendingCount} pending staff review
            {staffName ? ` · Signed in as ${staffName}` : ""}
          </p>
          {sessionExpiresAt ? (
            <p className="mt-1 text-xs font-semibold text-slate-400">
              Session expires {formatTimestamp(sessionExpiresAt)}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setAdminView("queue")}
            className={`rounded-full px-5 py-2 text-sm font-extrabold ${
              adminView === "queue"
                ? "bg-[#128c8c] text-white"
                : "border border-slate-300 text-slate-700"
            }`}
          >
            Queue
          </button>
          <button
            type="button"
            onClick={() => setAdminView("metrics")}
            className={`rounded-full px-5 py-2 text-sm font-extrabold ${
              adminView === "metrics"
                ? "bg-[#128c8c] text-white"
                : "border border-slate-300 text-slate-700"
            }`}
          >
            Metrics
          </button>
          <button
            type="button"
            onClick={exportCsv}
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-extrabold text-slate-700"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={loadQueue}
            className="rounded-full border border-[#128c8c] px-5 py-2 text-sm font-extrabold text-[#128c8c]"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-extrabold text-white"
          >
            Sign out
          </button>
        </div>
      </div>

      {error ? (
        <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">{error}</p>
      ) : null}
      {message ? (
        <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
          {message}
        </p>
      ) : null}

      {adminView === "metrics" ? (
        <div className="mt-8">
          <AdminMetricsDashboard />
        </div>
      ) : (
        <>
      <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-end">
        <label className="grid flex-1 gap-2 text-sm font-bold text-slate-700">
          Search (client name or submission date YYYY-MM-DD)
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search…"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">
          Status filter
          <select
            className="rounded-2xl border border-slate-200 px-4 py-3"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as VerificationStatus | "all")}
          >
            <option value="all">All statuses</option>
            {VERIFICATION_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={loadQueue}
          className="rounded-full bg-[#128c8c] px-5 py-3 text-sm font-extrabold text-white"
        >
          Apply
        </button>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.4fr_1fr]">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-lg font-black text-slate-900">Insurance Verification Requests</h2>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              Families who have submitted portal requests appear here for intake review.
            </p>
          </div>
          {loading && !records.length ? (
            <p className="px-6 py-8 text-sm font-semibold text-slate-500">Loading…</p>
          ) : null}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-extrabold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Family / Client</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">ZIP</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Documents</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submittedRecords.map((record) => (
                  <tr
                    key={record.id}
                    className={selectedId === record.id ? "bg-[#ddf4f4]/40" : "hover:bg-slate-50"}
                  >
                    <td className="px-4 py-3">
                      <p className="font-extrabold text-slate-900">{record.clientName}</p>
                      <p className="text-xs font-semibold text-slate-400">DOB {record.dateOfBirth}</p>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-700">{record.email || "—"}</td>
                    <td className="px-4 py-3 font-semibold text-slate-700">{record.phone || "—"}</td>
                    <td className="px-4 py-3 font-semibold text-slate-700">{record.zipCode || "—"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-extrabold ${statusBadgeClass(record.status)}`}
                      >
                        {internalStatusLabel(record.staffReviewInternalStatus)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold text-slate-500">
                      {formatTimestamp(record.familyPortalSubmittedAt || record.submittedAt)}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-700">{record.documentsUploaded}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => loadDetail(record.id)}
                        className="rounded-full bg-[#128c8c] px-3 py-1.5 text-xs font-extrabold text-white"
                      >
                        View Request
                      </button>
                    </td>
                  </tr>
                ))}
                {!loading && submittedRecords.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-sm font-semibold text-slate-500">
                      No verification requests match your filters.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {!detail ? (
            <p className="text-sm font-semibold text-slate-500">
              Select a request to view details and update verification status.
            </p>
          ) : (
            <>
              <h2 className="text-lg font-black text-slate-900">{detail.clientName}</h2>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                {detail.verificationType === "child" ? "Child / Dependent" : "Adult / Self"}
              </p>

              <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-extrabold text-slate-500">Date of Birth</dt>
                  <dd className="font-bold">{formatDOBForDisplay(detail.dateOfBirth)}</dd>
                </div>
                <div>
                  <dt className="font-extrabold text-slate-500">Status</dt>
                  <dd>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-extrabold ${statusBadgeClass(detail.status)}`}
                    >
                      {detail.status}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="font-extrabold text-slate-500">Email</dt>
                  <dd className="font-bold">{detail.email}</dd>
                </div>
                <div>
                  <dt className="font-extrabold text-slate-500">Phone</dt>
                  <dd className="font-bold">{detail.phone}</dd>
                </div>
                {detail.parentFirstName ? (
                  <div className="sm:col-span-2">
                    <dt className="font-extrabold text-slate-500">Parent / Guardian</dt>
                    <dd className="font-bold">
                      {detail.parentFirstName} {detail.parentLastName}
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="font-extrabold text-slate-500">Medicaid ID</dt>
                  <dd className="font-bold font-mono">
                    {revealedPhi?.medicaidId || detail.medicaidIdMasked || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="font-extrabold text-slate-500">SSN</dt>
                  <dd className="font-bold font-mono">
                    {revealedPhi?.ssn || detail.ssnMasked || "—"}
                  </dd>
                </div>
              </dl>

              {(detail.hasMedicaidId || detail.hasSsn) && !revealedPhi ? (
                <button
                  type="button"
                  onClick={revealPhi}
                  disabled={revealLoading}
                  className="mt-4 rounded-full border border-slate-300 px-4 py-2 text-xs font-extrabold text-slate-700"
                >
                  {revealLoading ? "Revealing…" : "Reveal identifiers (30s)"}
                </button>
              ) : null}

              {revealedPhi ? (
                <p className="mt-2 text-xs font-semibold text-amber-700">
                  Full identifiers visible — auto-hiding in 30 seconds. Access is audit logged.
                </p>
              ) : null}

              <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-sm font-black text-slate-900">Uploaded Documents</h3>
                  {detail.documents.length > 0 ? (
                    <button
                      type="button"
                      onClick={downloadAllDocuments}
                      className="rounded-full border border-[#128c8c] px-4 py-1.5 text-xs font-extrabold text-[#128c8c]"
                    >
                      Download Documents
                    </button>
                  ) : null}
                </div>
                {detail.familyPortalSubmittedAt ? (
                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    Portal submitted {formatTimestamp(detail.familyPortalSubmittedAt)}
                  </p>
                ) : null}
                {detail.documents.length === 0 ? (
                  <p className="mt-3 text-sm font-semibold text-slate-500">No documents uploaded yet.</p>
                ) : (
                  <ul className="mt-3 divide-y divide-slate-200">
                    {detail.documents.map((doc) => (
                      <li
                        key={doc.id}
                        className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="text-sm font-bold text-slate-800">{doc.safeName}</p>
                          <p className="text-xs font-semibold capitalize text-slate-500">
                            {doc.category.replace(/_/g, " ")} ·{" "}
                            {new Date(doc.uploadedAt).toLocaleString()}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => downloadDocument(doc.id, doc.safeName)}
                          className="rounded-full bg-[#128c8c] px-4 py-1.5 text-xs font-extrabold text-white"
                        >
                          Download
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-8 space-y-4">
                <label className="grid gap-2 text-sm font-bold text-slate-700">
                  Internal review status
                  <select
                    className="rounded-2xl border border-slate-200 px-4 py-3"
                    value={editInternalStatus}
                    onChange={(e) =>
                      setEditInternalStatus(e.target.value as StaffReviewInternalStatus)
                    }
                  >
                    {STAFF_REVIEW_INTERNAL_STATUSES.filter(
                      (status) => status !== "awaiting_family_submission",
                    ).map((status) => (
                      <option key={status} value={status}>
                        {internalStatusLabel(status)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-bold text-slate-700">
                  Status
                  <select
                    className="rounded-2xl border border-slate-200 px-4 py-3"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as VerificationStatus)}
                  >
                    {VERIFICATION_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-bold text-slate-700">
                  Recorded insurance status (shown to families)
                  <select
                    className="rounded-2xl border border-slate-200 px-4 py-3"
                    value={editInsuranceStatus}
                    onChange={(e) =>
                      setEditInsuranceStatus(e.target.value as InsuranceStatus)
                    }
                  >
                    {INSURANCE_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {getInsuranceStatusLabel(status)}
                      </option>
                    ))}
                  </select>
                  <span className="text-xs font-semibold text-slate-500">
                    Shown to families on the insurance status page after they verify identity.
                  </span>
                </label>

                <label className="grid gap-2 text-sm font-bold text-slate-700">
                  Plan name
                  <input
                    className="rounded-2xl border border-slate-200 px-4 py-3"
                    value={editPlanName}
                    onChange={(e) => setEditPlanName(e.target.value)}
                    placeholder="e.g. Cardinal Care MCO plan"
                  />
                </label>

                <label className="grid gap-2 text-sm font-bold text-slate-700">
                  Effective date (MM/DD/YYYY)
                  <input
                    className="rounded-2xl border border-slate-200 px-4 py-3"
                    value={editEffectiveDate}
                    onChange={(e) => setEditEffectiveDate(e.target.value)}
                    placeholder="MM/DD/YYYY"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-bold text-slate-700">
                    Program type
                    <input
                      className="rounded-2xl border border-slate-200 px-4 py-3"
                      value={editProgramType}
                      onChange={(e) => setEditProgramType(e.target.value)}
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-slate-700">
                    Subprogram type
                    <input
                      className="rounded-2xl border border-slate-200 px-4 py-3"
                      value={editSubprogramType}
                      onChange={(e) => setEditSubprogramType(e.target.value)}
                    />
                  </label>
                </div>

                <label className="grid gap-2 text-sm font-bold text-slate-700">
                  Staff notes
                  <textarea
                    className="min-h-28 rounded-2xl border border-slate-200 px-4 py-3"
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Internal verification notes"
                  />
                </label>

                <label className="grid gap-2 text-sm font-bold text-slate-700">
                  Staff review notes
                  <textarea
                    className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3"
                    value={editStaffReviewNotes}
                    onChange={(e) => setEditStaffReviewNotes(e.target.value)}
                    placeholder="Notes visible in staff review workflow"
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    saveUpdate({
                      status: editStatus,
                      insuranceStatus: editInsuranceStatus,
                      planName: editPlanName,
                      effectiveDate: editEffectiveDate,
                      programType: editProgramType,
                      subprogramType: editSubprogramType,
                      notes: editNotes,
                      internalStatus: editInternalStatus,
                      reviewNotes: editStaffReviewNotes,
                    })
                  }
                  className="rounded-full bg-[#1f7a2e] px-5 py-2.5 text-sm font-extrabold text-white disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save changes"}
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    setEditInternalStatus("in_review");
                    saveUpdate({ internalStatus: "in_review" });
                  }}
                  className="rounded-full bg-[#128c8c] px-5 py-2.5 text-sm font-extrabold text-white disabled:opacity-60"
                >
                  Mark as In Review
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    setEditInternalStatus("verified");
                    setEditStatus("Active");
                    setEditInsuranceStatus("active");
                    saveUpdate({
                      internalStatus: "verified",
                      status: "Active",
                      insuranceStatus: "active",
                    });
                  }}
                  className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-extrabold text-white disabled:opacity-60"
                >
                  Mark as Verified
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    setEditInternalStatus("missing_information");
                    saveUpdate({ internalStatus: "missing_information" });
                  }}
                  className="rounded-full bg-amber-600 px-5 py-2.5 text-sm font-extrabold text-white disabled:opacity-60"
                >
                  Request More Information
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    setEditStatus("Active");
                    setEditInsuranceStatus("active");
                    saveUpdate({ status: "Active", insuranceStatus: "active" });
                  }}
                  className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-extrabold text-white disabled:opacity-60"
                >
                  Mark Active
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    setEditStatus("Inactive");
                    setEditInsuranceStatus("inactive");
                    saveUpdate({ status: "Inactive", insuranceStatus: "inactive" });
                  }}
                  className="rounded-full bg-slate-600 px-5 py-2.5 text-sm font-extrabold text-white disabled:opacity-60"
                >
                  Mark Inactive
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    setEditInternalStatus("unable_to_verify");
                    setEditStatus("Unable To Verify");
                    setEditInsuranceStatus("error");
                    saveUpdate({
                      internalStatus: "unable_to_verify",
                      status: "Unable To Verify",
                      insuranceStatus: "error",
                    });
                  }}
                  className="rounded-full bg-red-700 px-5 py-2.5 text-sm font-extrabold text-white disabled:opacity-60"
                >
                  Mark Unable To Verify
                </button>
              </div>

              <p className="mt-6 text-xs font-semibold text-slate-400">
                Verified {formatTimestamp(detail.verifiedAt)}
                {detail.verifiedBy ? ` by ${detail.verifiedBy}` : ""}
              </p>

              <AdminActivityTimeline requestId={selectedId} />
            </>
          )}
        </section>
      </div>
        </>
      )}
    </main>
  );
}
