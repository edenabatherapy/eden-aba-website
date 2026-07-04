"use client";

import { ExternalLink, FileText, Lightbulb } from "lucide-react";
import type { FinancialAssistanceResource } from "@/lib/financial-assistance/types";

const STATUS_STYLES: Record<FinancialAssistanceResource["status"], string> = {
  Active: "bg-emerald-100 text-emerald-800",
  Seasonal: "bg-amber-100 text-amber-800",
  Verify: "bg-sky-100 text-sky-800",
  Limited: "bg-orange-100 text-orange-800",
};

type AssistanceResourceCardProps = {
  resource: FinancialAssistanceResource;
  featured?: boolean;
};

export default function AssistanceResourceCard({ resource, featured = false }: AssistanceResourceCardProps) {
  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 ${
        featured ? "border-emerald-200 ring-1 ring-emerald-100" : "border-emerald-100"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            {resource.programType} · {resource.group}
          </p>
          <h3 className="mt-2 text-lg font-extrabold leading-snug text-slate-900 dark:text-white">
            {resource.title}
          </h3>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${STATUS_STYLES[resource.status]}`}
        >
          {resource.status}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{resource.description}</p>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-extrabold text-slate-800 dark:text-slate-200">Eligibility</dt>
          <dd className="mt-1 leading-7 text-slate-600 dark:text-slate-400">{resource.eligibilitySummary}</dd>
        </div>
        <div>
          <dt className="font-extrabold text-slate-800 dark:text-slate-200">Coverage notes</dt>
          <dd className="mt-1 leading-7 text-slate-600 dark:text-slate-400">{resource.coverageNotes}</dd>
        </div>
      </dl>

      {resource.documents && resource.documents.length > 0 ? (
        <div className="mt-4">
          <p className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-slate-500">
            <FileText size={14} aria-hidden />
            Documents often needed
          </p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
            {resource.documents.map((doc) => (
              <li key={doc} className="flex gap-2">
                <span aria-hidden>•</span>
                {doc}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {resource.tips && resource.tips.length > 0 ? (
        <div className="mt-4 rounded-xl bg-emerald-50/60 p-3 dark:bg-emerald-950/30">
          <p className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
            <Lightbulb size={14} aria-hidden />
            Tips
          </p>
          <ul className="mt-2 space-y-1 text-sm text-emerald-900 dark:text-emerald-100">
            {resource.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {resource.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-2">
        {resource.officialLinks.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2.5 text-sm font-extrabold text-emerald-800 transition hover:bg-emerald-50 dark:border-emerald-700 dark:bg-slate-800 dark:text-emerald-200 dark:hover:bg-slate-700"
          >
            {link.label}
            <ExternalLink size={16} aria-hidden />
          </a>
        ))}
      </div>
    </article>
  );
}
