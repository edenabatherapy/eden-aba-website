"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/autism-care-fund/formulas";
import type { PublicFundDashboard } from "@/lib/autism-care-fund/public-stats";

const fetchOptions: RequestInit = {
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

type PendingIntent = {
  id: string;
  amountCents: number;
  status: string;
  createdAt: string;
  isAnonymous: boolean;
};

export default function AutismCareFundAdminPage() {
  const [loginToken, setLoginToken] = useState("");
  const [staffName, setStaffName] = useState("Staff");
  const [authenticated, setAuthenticated] = useState(false);
  const [dashboard, setDashboard] = useState<PublicFundDashboard | null>(null);
  const [pendingIntents, setPendingIntents] = useState<PendingIntent[]>([]);
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
      const response = await fetch("/api/admin/autism-care-fund", fetchOptions);
      if (response.status === 401) {
        setAuthenticated(false);
        setError("Session expired. Please sign in again.");
        return;
      }
      const data = await response.json();
      setDashboard(data.dashboard);
      setPendingIntents(data.pendingIntents ?? []);
    } catch {
      setError("Unable to load Autism Care Fund dashboard.");
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

  if (!authenticated) {
    return (
      <main className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-2xl font-extrabold text-slate-900">Autism Care Fund — Admin</h1>
        <p className="mt-2 text-sm text-slate-600">Staff access only. Uses the same session as insurance admin.</p>
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <div>
            <label htmlFor="staff-name" className="text-sm font-bold">
              Staff name
            </label>
            <input
              id="staff-name"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3"
            />
          </div>
          <div>
            <label htmlFor="staff-token" className="text-sm font-bold">
              Admin token
            </label>
            <input
              id="staff-token"
              type="password"
              value={loginToken}
              onChange={(e) => setLoginToken(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3"
              autoComplete="current-password"
            />
          </div>
          {error ? <p className="text-sm text-red-700">{error}</p> : null}
          <button type="submit" className="w-full rounded-full bg-emerald-700 px-5 py-3 font-extrabold text-white">
            Sign in
          </button>
        </form>
        <p className="mt-6 text-xs text-slate-500">
          Full fund management (marking donations complete, publishing reports) is a follow-up once Supabase tables are
          deployed and payment processing is connected.
        </p>
      </main>
    );
  }

  const stats = dashboard?.stats;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Autism Care Fund — Admin</h1>
          <p className="mt-1 text-sm text-slate-600">Read-only overview · {loading ? "Loading…" : "Signed in"}</p>
        </div>
        <Link href="/resources/financial-assistance#autism-care-fund" className="text-sm font-bold text-emerald-800">
          View public page →
        </Link>
      </div>

      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

      {stats ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Raised", formatCurrency(stats.raisedAmountCents)],
            ["Goal", formatCurrency(stats.goalAmountCents)],
            ["Families helped", String(stats.familiesHelped)],
            ["Donors", String(stats.donorCount)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
              <p className="mt-1 text-xl font-extrabold text-slate-900">{value}</p>
            </div>
          ))}
        </div>
      ) : null}

      <section className="mt-10">
        <h2 className="text-lg font-extrabold text-slate-900">Pending donation intents</h2>
        {pendingIntents.length === 0 ? (
          <p className="mt-3 text-sm text-slate-600">No pending intents in database (or tables not deployed yet).</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Anonymous</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingIntents.map((intent) => (
                  <tr key={intent.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">{new Date(intent.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3 font-bold">{formatCurrency(intent.amountCents)}</td>
                    <td className="px-4 py-3">{intent.isAnonymous ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">{intent.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="mt-10 text-xs text-slate-500">
        Deploy <code className="rounded bg-slate-100 px-1">supabase/autism_care_fund.sql</code> in Supabase, then add
        staff workflows to mark donations completed and publish monthly reports.
      </p>
    </main>
  );
}
