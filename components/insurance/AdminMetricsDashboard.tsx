"use client";

import { useEffect, useState } from "react";

type Metrics = {
  totalRequests: number;
  pendingReviews: number;
  activeCoverage: number;
  unableToVerify: number;
  inactiveCoverage: number;
  averageReviewTimeHours: number | null;
  trendByDay: Array<{ date: string; submitted: number; completed: number }>;
  statusBreakdown: Array<{ status: string; count: number }>;
};

const fetchOptions: RequestInit = {
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

function MetricCard({ label, value, accent }: { label: string; value: string | number; accent: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-extrabold uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-black ${accent}`}>{value}</p>
    </div>
  );
}

function TrendChart({ data }: { data: Metrics["trendByDay"] }) {
  const maxValue = Math.max(
    1,
    ...data.flatMap((day) => [day.submitted, day.completed]),
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-black text-slate-900">14-Day Trend</h3>
      <div className="mt-4 flex items-end gap-1 overflow-x-auto pb-2 sm:gap-2">
        {data.map((day) => {
          const submittedHeight = (day.submitted / maxValue) * 100;
          const completedHeight = (day.completed / maxValue) * 100;
          const label = day.date.slice(5);

          return (
            <div key={day.date} className="flex min-w-[28px] flex-col items-center gap-1">
              <div className="flex h-24 w-full items-end justify-center gap-0.5">
                <div
                  className="w-2 rounded-t bg-[#49b8c8]"
                  style={{ height: `${Math.max(submittedHeight, day.submitted ? 8 : 0)}%` }}
                  title={`Submitted: ${day.submitted}`}
                />
                <div
                  className="w-2 rounded-t bg-emerald-500"
                  style={{ height: `${Math.max(completedHeight, day.completed ? 8 : 0)}%` }}
                  title={`Completed: ${day.completed}`}
                />
              </div>
              <span className="text-[10px] font-bold text-slate-400">{label}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-xs font-bold text-slate-600">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#49b8c8]" /> Submitted
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Completed
        </span>
      </div>
    </div>
  );
}

function StatusBreakdownChart({ data }: { data: Metrics["statusBreakdown"] }) {
  const total = data.reduce((sum, item) => sum + item.count, 0) || 1;
  const colors: Record<string, string> = {
    "Pending Staff Review": "bg-amber-400",
    Active: "bg-emerald-500",
    Inactive: "bg-slate-400",
    "Unable To Verify": "bg-red-500",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-black text-slate-900">Status Breakdown</h3>
      <div className="mt-4 flex h-4 overflow-hidden rounded-full bg-slate-100">
        {data.map((item) =>
          item.count > 0 ? (
            <div
              key={item.status}
              className={colors[item.status] || "bg-slate-300"}
              style={{ width: `${(item.count / total) * 100}%` }}
              title={`${item.status}: ${item.count}`}
            />
          ) : null,
        )}
      </div>
      <ul className="mt-4 space-y-2">
        {data.map((item) => (
          <li key={item.status} className="flex items-center justify-between text-sm">
            <span className="inline-flex items-center gap-2 font-semibold text-slate-700">
              <span className={`h-2.5 w-2.5 rounded-full ${colors[item.status] || "bg-slate-300"}`} />
              {item.status}
            </span>
            <span className="font-black text-slate-900">{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AdminMetricsDashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/insurance-verifications/metrics", fetchOptions)
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load metrics.");
        return response.json() as Promise<Metrics>;
      })
      .then(setMetrics)
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load metrics."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-sm font-semibold text-slate-500">Loading metrics…</p>;
  }

  if (error || !metrics) {
    return <p className="text-sm font-semibold text-red-600">{error || "Metrics unavailable."}</p>;
  }

  const avgReview =
    metrics.averageReviewTimeHours === null
      ? "—"
      : `${metrics.averageReviewTimeHours}h`;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Total Requests" value={metrics.totalRequests} accent="text-[#128c8c]" />
        <MetricCard label="Pending Reviews" value={metrics.pendingReviews} accent="text-amber-600" />
        <MetricCard label="Active Coverage" value={metrics.activeCoverage} accent="text-emerald-600" />
        <MetricCard label="Unable To Verify" value={metrics.unableToVerify} accent="text-red-600" />
        <MetricCard label="Avg Review Time" value={avgReview} accent="text-slate-800" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TrendChart data={metrics.trendByDay} />
        <StatusBreakdownChart data={metrics.statusBreakdown} />
      </div>
    </div>
  );
}
