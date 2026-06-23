"use client";

import { ExternalLink } from "lucide-react";
import type { GettingStartedResource } from "@/lib/getting-started/getting-started-data";

type ResourceCardProps = {
  resource: GettingStartedResource;
  featured?: boolean;
};

export default function ResourceCard({ resource, featured = false }: ResourceCardProps) {
  return (
    <article
      className={`flex h-full flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md ${
        featured ? "border-emerald-200 ring-1 ring-emerald-100" : "border-emerald-100"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">{resource.category}</p>
          <h3 className="mt-2 text-lg font-extrabold leading-snug text-slate-900">{resource.title}</h3>
        </div>
        {featured ? (
          <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-800">
            Featured
          </span>
        ) : null}
      </div>

      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{resource.summary}</p>

      <p className="mt-3 text-xs font-semibold text-slate-500">Source: {resource.source}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {resource.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800"
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2.5 text-sm font-extrabold text-emerald-800 transition hover:bg-emerald-50"
      >
        Open resource
        <ExternalLink size={16} aria-hidden />
      </a>
    </article>
  );
}
