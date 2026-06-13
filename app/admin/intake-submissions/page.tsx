"use client";

import { useCallback, useEffect, useState } from "react";

const STAFF_NAME_KEY = "eden_insurance_staff_name";

type IntakeSubmissionRow = {
  confirmationId: string;
  submittedAt: string;
  fileCount: number;
};

const fetchOptions: RequestInit = {
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

export default function IntakeSubmissionsAdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [staffName, setStaffName] = useState("");
  const [token, setToken] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState<IntakeSubmissionRow[]>([]);
  const [listError, setListError] = useState("");

  const loadSubmissions = useCallback(async () => {
    setLoading(true);
    setListError("");

    try {
      const response = await fetch("/api/admin/intake-submissions", fetchOptions);
      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        setAuthenticated(false);
        return;
      }

      if (!response.ok) {
        setListError(data.error || "Unable to load submissions.");
        return;
      }

      setAuthenticated(true);
      setSubmissions(data.submissions || []);
    } catch {
      setListError("Network error while loading submissions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedName = window.localStorage.getItem(STAFF_NAME_KEY);
    if (savedName) setStaffName(savedName);
    loadSubmissions();
  }, [loadSubmissions]);

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginError("");

    try {
      const response = await fetch("/api/admin/auth/login", {
        ...fetchOptions,
        method: "POST",
        body: JSON.stringify({ token, staffName: staffName.trim() || "Staff" }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setLoginError(data.error || "Login failed.");
        return;
      }

      if (staffName.trim()) {
        window.localStorage.setItem(STAFF_NAME_KEY, staffName.trim());
      }

      setAuthenticated(true);
      await loadSubmissions();
    } catch {
      setLoginError("Network error during login.");
    }
  };

  if (authenticated === null && loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16">
        <p className="text-center font-bold text-slate-600">Loading…</p>
      </main>
    );
  }

  if (authenticated === false) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#ddf4f4] via-white to-[#fff8df] px-4 py-16">
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <h1 className="text-2xl font-black text-[#0b4f4f]">Intake submissions</h1>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            Staff login required. Uses the same admin token as insurance verification.
          </p>
          <form onSubmit={login} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Your name
              <input
                className="rounded-xl border border-slate-200 px-4 py-3"
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                placeholder="Staff name"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Admin token
              <input
                type="password"
                className="rounded-xl border border-slate-200 px-4 py-3"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </label>
            {loginError ? <p className="text-sm font-bold text-red-600">{loginError}</p> : null}
            <button
              type="submit"
              className="rounded-full bg-[#128c8c] px-6 py-3 font-extrabold text-white"
            >
              Sign in
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#0b4f4f]">Intake submissions</h1>
            <p className="mt-2 text-sm font-semibold text-slate-600">
              Confirmation IDs and timestamps from <code className="text-xs">storage/intake/_audit.jsonl</code> (no PHI).
            </p>
          </div>
          <button
            type="button"
            onClick={loadSubmissions}
            disabled={loading}
            className="rounded-full border border-[#128c8c] px-5 py-2.5 text-sm font-extrabold text-[#128c8c] disabled:opacity-60"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </header>

        {listError ? (
          <p className="mb-4 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">{listError}</p>
        ) : null}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-100 text-xs font-black uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Confirmation ID</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Files</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center font-semibold text-slate-500">
                    No intake submissions logged yet.
                  </td>
                </tr>
              ) : (
                submissions.map((row) => (
                  <tr key={row.confirmationId} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-[#0b4f4f]">
                      {row.confirmationId}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-700">
                      {new Date(row.submittedAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{row.fileCount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs font-semibold text-slate-500">
          Delivery failures (Google Sheets / email) are logged server-side in{" "}
          <code>storage/intake/_delivery_failures.jsonl</code> — not shown to families.
        </p>
      </div>
    </main>
  );
}
