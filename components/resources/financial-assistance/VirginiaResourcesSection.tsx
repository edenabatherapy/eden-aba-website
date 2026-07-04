"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ExternalLink, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { filterVirginiaPrograms } from "@/lib/financial-assistance/search";
import { VIRGINIA_PROGRAMS, VIRGINIA_REGIONS } from "@/lib/financial-assistance/virginia-programs";
import type { VirginiaRegion } from "@/lib/financial-assistance/virginia-programs";

export default function VirginiaResourcesSection() {
  const reduceMotion = useReducedMotion();
  const [region, setRegion] = useState<VirginiaRegion>("All");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(VIRGINIA_PROGRAMS[0]?.id ?? null);

  const filtered = useMemo(
    () => filterVirginiaPrograms(VIRGINIA_PROGRAMS, region, query),
    [region, query],
  );

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.45 },
      };

  return (
    <section
      id="virginia-resources"
      className="scroll-mt-28 bg-[#eef9f4] px-4 py-16 dark:bg-slate-900/50 lg:px-8 lg:py-20"
      aria-labelledby="virginia-resources-heading"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div {...reveal}>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-800 dark:text-emerald-400">
            Virginia Focus
          </p>
          <h2 id="virginia-resources-heading" className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Virginia-Specific Resources
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
            Programs serving Eden families across Northern Virginia and statewide. Filter by region or search by county,
            waiver, or early intervention.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <label className="sr-only" htmlFor="va-region-filter">
              Filter by region
            </label>
            <select
              id="va-region-filter"
              value={region}
              onChange={(e) => setRegion(e.target.value as VirginiaRegion)}
              className="rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            >
              {VIRGINIA_REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r === "All" ? "All regions" : r}
                </option>
              ))}
            </select>
            <label className="sr-only" htmlFor="va-program-search">
              Search Virginia programs
            </label>
            <input
              id="va-program-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search programs…"
              className="flex-1 rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </motion.div>

        <div className="mt-8 space-y-3">
          {filtered.map((program) => {
            const isOpen = openId === program.id;
            return (
              <div
                key={program.id}
                className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <button
                  type="button"
                  id={`va-program-${program.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`va-panel-${program.id}`}
                  onClick={() => setOpenId(isOpen ? null : program.id)}
                  className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition hover:bg-emerald-50/50 dark:hover:bg-slate-800"
                >
                  <div>
                    <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                      <MapPin size={14} aria-hidden />
                      {program.region}
                    </p>
                    <h3 className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white">{program.name}</h3>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`mt-1 shrink-0 text-slate-500 transition ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                {isOpen ? (
                  <div
                    id={`va-panel-${program.id}`}
                    role="region"
                    aria-labelledby={`va-program-${program.id}`}
                    className="border-t border-emerald-50 px-5 py-4 dark:border-slate-700"
                  >
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{program.description}</p>
                    <p className="mt-3 text-sm">
                      <span className="font-extrabold text-slate-800 dark:text-slate-200">Eligibility: </span>
                      <span className="text-slate-600 dark:text-slate-400">{program.eligibility}</span>
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {program.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                      {program.officialLinks.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 px-4 py-2 text-sm font-extrabold text-emerald-800 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-200"
                        >
                          {link.label}
                          <ExternalLink size={14} aria-hidden />
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            No Virginia programs match your filters.
          </p>
        ) : null}
      </div>
    </section>
  );
}
