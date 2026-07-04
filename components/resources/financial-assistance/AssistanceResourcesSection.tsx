"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AssistanceResourceCard from "./AssistanceResourceCard";
import {
  ASSISTANCE_CATEGORY_GROUPS,
  ASSISTANCE_PROGRAM_TYPES,
  FEATURED_ASSISTANCE_IDS,
  FINANCIAL_ASSISTANCE_RESOURCES,
} from "@/lib/financial-assistance/resources";
import { searchFinancialAssistanceResources } from "@/lib/financial-assistance/search";
import type { AssistanceCategoryGroup, AssistanceProgramType } from "@/lib/financial-assistance/types";

export default function AssistanceResourcesSection() {
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<AssistanceCategoryGroup | "All">("All");
  const [programType, setProgramType] = useState<AssistanceProgramType | "All">("All");

  const filtered = useMemo(
    () => searchFinancialAssistanceResources(FINANCIAL_ASSISTANCE_RESOURCES, query, group, programType),
    [query, group, programType],
  );

  const featured = useMemo(
    () => filtered.filter((r) => FEATURED_ASSISTANCE_IDS.has(r.id)),
    [filtered],
  );

  const standard = useMemo(
    () => filtered.filter((r) => !FEATURED_ASSISTANCE_IDS.has(r.id)),
    [filtered],
  );

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.45 },
      };

  return (
    <section
      id="assistance-resources"
      className="scroll-mt-28 px-4 py-16 lg:px-8 lg:py-20"
      aria-labelledby="assistance-resources-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div {...reveal}>
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0b4f4f] text-white">
              <Search size={22} aria-hidden />
            </span>
            <div>
              <h2 id="assistance-resources-heading" className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                Ways Families Can Receive Financial Assistance
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
                Search and filter verified government, insurance, grant, and community programs. Always confirm eligibility
                and coverage directly with each organization.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/30 to-white p-5 shadow-sm dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 sm:p-6">
            <label htmlFor="fa-resource-search" className="sr-only">
              Search financial assistance resources
            </label>
            <input
              id="fa-resource-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by program, eligibility, Medicaid, TRICARE, grants…"
              className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3.5 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />

            <div className="mt-4">
              <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-slate-500">Category</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                {(["All", ...ASSISTANCE_CATEGORY_GROUPS] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={group === item}
                    onClick={() => setGroup(item)}
                    className={`rounded-full px-3.5 py-2 text-xs font-extrabold transition ${
                      group === item
                        ? "bg-emerald-700 text-white"
                        : "border border-emerald-100 bg-white text-emerald-900 hover:bg-emerald-50 dark:border-slate-600 dark:bg-slate-800 dark:text-emerald-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-slate-500">Program type</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by program type">
                {(["All", ...ASSISTANCE_PROGRAM_TYPES] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={programType === item}
                    onClick={() => setProgramType(item)}
                    className={`rounded-full px-3 py-1.5 text-[11px] font-extrabold transition ${
                      programType === item
                        ? "bg-[#0b4f4f] text-white"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-600 dark:text-slate-400" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "resource" : "resources"} found
            </p>
          </div>
        </motion.div>

        {featured.length > 0 ? (
          <div className="mt-10">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Featured resources</h3>
            <ul className="mt-5 grid gap-5 lg:grid-cols-2">
              {featured.map((resource) => (
                <li key={resource.id}>
                  <AssistanceResourceCard resource={resource} featured />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {standard.length > 0 ? (
          <ul className="mt-10 grid gap-5 lg:grid-cols-2">
            {standard.map((resource) => (
              <li key={resource.id}>
                <AssistanceResourceCard resource={resource} />
              </li>
            ))}
          </ul>
        ) : null}

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 p-8 text-center dark:border-slate-600 dark:bg-slate-800/50">
            <p className="text-lg font-extrabold text-slate-900 dark:text-white">No resources match your filters</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Try a different keyword or reset filters to explore the full library.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setGroup("All");
                setProgramType("All");
              }}
              className="mt-4 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-extrabold text-white"
            >
              Clear filters
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
