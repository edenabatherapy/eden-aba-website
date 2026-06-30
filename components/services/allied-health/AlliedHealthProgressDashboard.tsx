"use client";

import { motion, useReducedMotion } from "framer-motion";

type Metric = {
  label: string;
  value: number;
  suffix?: string;
  trend?: string;
};

type AlliedHealthProgressDashboardProps = {
  title: string;
  metrics: Metric[];
  chartTitle: string;
  chartBars: { label: string; value: number }[];
};

function ProgressRing({ value, label }: { value: number; label: string }) {
  const reduceMotion = useReducedMotion();
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-24 w-24">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 96 96" aria-hidden>
          <circle cx="48" cy="48" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={reduceMotion ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0E6B4F" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-black text-slate-900">
          {value}%
        </span>
      </div>
      <p className="mt-2 text-xs font-bold text-slate-600">{label}</p>
    </div>
  );
}

export default function AlliedHealthProgressDashboard({
  title,
  metrics,
  chartTitle,
  chartBars,
}: AlliedHealthProgressDashboardProps) {
  const reduceMotion = useReducedMotion();
  const maxBar = Math.max(...chartBars.map((b) => b.value), 1);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/30 p-6 shadow-xl shadow-slate-900/5 lg:p-8">
      <h3 className="text-xl font-black text-slate-900">{title}</h3>
      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
        {metrics.slice(0, 4).map((metric, i) => (
          <ProgressRing key={metric.label} value={metric.value} label={metric.label} />
        ))}
      </div>
      <div className="mt-10 rounded-2xl border border-slate-100 bg-white/80 p-5 backdrop-blur-sm">
        <p className="text-sm font-black uppercase tracking-wider text-slate-500">{chartTitle}</p>
        <div className="mt-6 flex h-40 items-end gap-2 sm:gap-3">
          {chartBars.map((bar, i) => (
            <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
              <motion.div
                className="w-full rounded-t-lg bg-gradient-to-t from-[#0E6B4F] to-[#49b8c8]"
                initial={reduceMotion ? { height: `${(bar.value / maxBar) * 100}%` } : { height: 0 }}
                whileInView={{ height: `${(bar.value / maxBar) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.06 }}
                style={{ minHeight: 8 }}
                aria-hidden
              />
              <span className="text-center text-[10px] font-bold leading-tight text-slate-600 sm:text-xs">
                {bar.label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs font-semibold text-slate-500">
          Illustrative example only. Actual progress varies by child and is determined through clinical evaluation and ongoing data review.
        </p>
      </div>
    </div>
  );
}
