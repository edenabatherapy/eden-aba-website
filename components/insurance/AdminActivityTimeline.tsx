"use client";

import { useEffect, useState } from "react";

type ActivityEntry = {
  id: string;
  type: string;
  timestamp: string;
  description: string;
  staffName?: string;
  previousStatus?: string;
  newStatus?: string;
};

const fetchOptions: RequestInit = {
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

function activityIcon(type: string) {
  switch (type) {
    case "submitted":
      return "📥";
    case "reviewed":
      return "✅";
    case "status_changed":
      return "🔄";
    case "notes_added":
      return "📝";
    case "contact_updated":
      return "📞";
    case "document_uploaded":
      return "📎";
    default:
      return "•";
  }
}

type Props = {
  requestId: string | null;
};

export default function AdminActivityTimeline({ requestId }: Props) {
  const [activity, setActivity] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!requestId) {
      setActivity([]);
      return;
    }

    setLoading(true);
    fetch(`/api/admin/insurance-verifications/${requestId}/activity`, fetchOptions)
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed");
        const data = await response.json();
        setActivity(data.activity || []);
      })
      .catch(() => setActivity([]))
      .finally(() => setLoading(false));
  }, [requestId]);

  if (!requestId) return null;

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <h3 className="text-sm font-black text-slate-900">Activity Timeline</h3>
      {loading ? (
        <p className="mt-3 text-xs font-semibold text-slate-500">Loading activity…</p>
      ) : activity.length === 0 ? (
        <p className="mt-3 text-xs font-semibold text-slate-500">No activity recorded yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {activity.map((entry) => (
            <li
              key={entry.id}
              className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3"
            >
              <span className="text-lg" aria-hidden>
                {activityIcon(entry.type)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-800">{entry.description}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  {new Date(entry.timestamp).toLocaleString()}
                  {entry.staffName ? ` · ${entry.staffName}` : ""}
                </p>
                {entry.previousStatus && entry.newStatus ? (
                  <p className="mt-1 text-xs font-semibold text-slate-400">
                    {entry.previousStatus} → {entry.newStatus}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
