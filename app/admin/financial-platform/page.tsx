"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/autism-care-fund/formulas";
import type { PlatformDashboard } from "@/lib/financial-platform/types";

const fetchOptions: RequestInit = {
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

export default function FinancialPlatformAdminPage() {
  const [loginToken, setLoginToken] = useState("");
  const [staffName, setStaffName] = useState("Staff");
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [dashboard, setDashboard] = useState<PlatformDashboard | null>(null);
  const [pendingDonations, setPendingDonations] = useState<Array<Record<string, unknown>>>([]);
  const [pendingApplications, setPendingApplications] = useState<Array<Record<string, unknown>>>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const checkSession = useCallback(async () => {
    const response = await fetch("/api/admin/auth/session", fetchOptions);
    if (!response.ok) return false;
    const data = await response.json();
    setAuthenticated(Boolean(data.authenticated));
    return Boolean(data.authenticated);
  }, []);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/financial-platform", fetchOptions);
      if (response.status === 401) {
        setAuthenticated(false);
        setError("Session expired. Please sign in again.");
        return;
      }
      const data = await response.json();
      setDashboard(data.dashboard);
      setRole(data.role ?? "");
      setPendingDonations(data.pendingDonations ?? []);
      setPendingApplications(data.pendingApplications ?? []);
    } catch {
      setError("Unable to load financial platform dashboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession().then((ok) => {
      if (ok) loadDashboard();
    });
  }, [checkSession, loadDashboard]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/auth/login", {
      method: "POST",
      ...fetchOptions,
      body: JSON.stringify({ token: loginToken.trim(), staffName: staffName.trim() || "Staff" }),
    });
    if (!response.ok) {
      setError("Invalid staff token.");
      return;
    }
    setAuthenticated(true);
    setLoginToken("");
    loadDashboard();
  };

  const approveDonation = async (id: string) => {
    const response = await fetch("/api/admin/financial-platform", {
      method: "PATCH",
      ...fetchOptions,
      body: JSON.stringify({ action: "approve_donation", entityId: id }),
    });
    if (response.ok) loadDashboard();
    else setError("Could not approve donation.");
  };

  const updateApplication = async (id: string, applicationStatus: string) => {
    const response = await fetch("/api/admin/financial-platform", {
      method: "PATCH",
      ...fetchOptions,
      body: JSON.stringify({
        action: "update_application",
        entityId: id,
        entityType: "assistance_applications",
        payload: { applicationStatus },
      }),
    });
    if (response.ok) loadDashboard();
    else setError("Could not update application.");
  };

  if (!authenticated) {
    return (
      <main className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-2xl font-extrabold">Financial Platform Admin</h1>
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <input
            type="password"
            value={loginToken}
            onChange={(e) => setLoginToken(e.target.value)}
            placeholder="Staff admin token"
            className="w-full rounded-xl border px-4 py-3"
            required
          />
          <input
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
            placeholder="Staff name"
            className="w-full rounded-xl border px-4 py-3"
          />
          <button type="submit" className="w-full rounded-full bg-[#0b4f4f] py-3 font-bold text-white">
            Sign in
          </button>
        </form>
        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Financial Platform Admin</h1>
          <p className="mt-1 text-sm text-slate-500">Role: {role || "—"}</p>
        </div>
        <Link href="/admin/autism-care-fund" className="text-sm font-semibold text-[#0b4f4f] underline">
          Legacy ACF view
        </Link>
      </div>

      {loading ? <p className="mt-8">Loading…</p> : null}
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      {dashboard ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total raised", value: formatCurrency(dashboard.raisedAmountCents) },
            { label: "Available balance", value: formatCurrency(dashboard.availableBalanceCents) },
            { label: "Families supported", value: String(dashboard.familiesSupported) },
            { label: "Pending applications", value: String(dashboard.applicationsPending) },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl border bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase text-slate-500">{kpi.label}</p>
              <p className="mt-2 text-2xl font-extrabold">{kpi.value}</p>
            </div>
          ))}
        </div>
      ) : null}

      <section className="mt-10">
        <h2 className="text-xl font-extrabold">Pending donations</h2>
        <ul className="mt-4 space-y-2">
          {pendingDonations.map((row) => (
            <li key={String(row.id)} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border p-4">
              <span>
                {formatCurrency(Number(row.amount_cents ?? 0))} · {String(row.donation_type ?? "one_time")}
              </span>
              <button
                type="button"
                onClick={() => approveDonation(String(row.id))}
                className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold text-white"
              >
                Approve
              </button>
            </li>
          ))}
          {pendingDonations.length === 0 ? <li className="text-sm text-slate-500">No pending donations.</li> : null}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-extrabold">Pending applications</h2>
        <ul className="mt-4 space-y-2">
          {pendingApplications.map((row) => (
            <li key={String(row.id)} className="rounded-xl border p-4">
              <p className="font-semibold">{String(row.tracking_code)}</p>
              <p className="text-sm text-slate-500">
                {String(row.county)} · {String(row.application_status)}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["under_review", "documentation_requested", "approved", "waitlist", "denied"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateApplication(String(row.id), status)}
                    className="rounded-full border px-3 py-1 text-xs font-bold"
                  >
                    {status}
                  </button>
                ))}
              </div>
            </li>
          ))}
          {pendingApplications.length === 0 ? (
            <li className="text-sm text-slate-500">No pending applications.</li>
          ) : null}
        </ul>
      </section>
    </main>
  );
}
