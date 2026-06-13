"use client";

import type { PublicVerificationStatus } from "@/types/insurance";

type TimelineStep = PublicVerificationStatus["timeline"][number];

function formatStepTime(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function stepCircleClass(state: TimelineStep["state"]) {
  switch (state) {
    case "complete":
      return "border-emerald-500 bg-emerald-500 text-white";
    case "current":
      return "border-[#128c8c] bg-[#128c8c] text-white ring-4 ring-[#49b8c8]/30";
    default:
      return "border-slate-300 bg-white text-slate-400";
  }
}

function stepLineClass(state: TimelineStep["state"]) {
  return state === "complete" ? "bg-emerald-400" : "bg-slate-200";
}

type Props = {
  timeline: TimelineStep[];
  compact?: boolean;
};

export default function InsuranceStatusTracker({ timeline, compact = false }: Props) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 ${
        compact ? "" : "mt-6"
      }`}
      aria-label="Verification progress"
    >
      <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
        Your Progress
      </p>

      <ol className="mt-5 space-y-0">
        {timeline.map((step, index) => {
          const timestamp = formatStepTime(step.timestamp);
          const isLast = index === timeline.length - 1;

          return (
            <li key={step.key} className="relative flex gap-4 pb-6 last:pb-0">
              {!isLast ? (
                <span
                  className={`absolute left-[15px] top-8 h-[calc(100%-8px)] w-0.5 ${stepLineClass(step.state)}`}
                  aria-hidden
                />
              ) : null}

              <div
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-black ${stepCircleClass(step.state)}`}
              >
                {step.state === "complete" ? "✓" : index + 1}
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <p
                  className={`text-sm font-extrabold sm:text-base ${
                    step.state === "upcoming" ? "text-slate-400" : "text-white"
                  }`}
                >
                  {step.label}
                </p>
                {timestamp ? (
                  <p className="mt-1 text-xs font-semibold text-slate-400 sm:text-sm">
                    {timestamp}
                  </p>
                ) : step.state === "upcoming" ? (
                  <p className="mt-1 text-xs font-semibold text-slate-500">Upcoming</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
