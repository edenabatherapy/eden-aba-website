"use client";

import type { GettingStartedResourceCategory } from "@/lib/getting-started/getting-started-data";

type SearchFiltersProps = {
  query: string;
  category: GettingStartedResourceCategory | "All";
  categories: readonly (GettingStartedResourceCategory | "All")[];
  resultCount: number;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: GettingStartedResourceCategory | "All") => void;
};

export default function SearchFilters({
  query,
  category,
  categories,
  resultCount,
  onQueryChange,
  onCategoryChange,
}: SearchFiltersProps) {
  return (
    <div className="rounded-[1.75rem] border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/30 to-white p-5 shadow-sm sm:p-6">
      <label htmlFor="getting-started-search" className="sr-only">
        Search resources
      </label>
      <input
        id="getting-started-search"
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search by title, category, source, summary, or tags…"
        className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3.5 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
      />

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {categories.map((item) => {
          const selected = category === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => onCategoryChange(item)}
              aria-pressed={selected}
              className={`rounded-full px-3.5 py-2 text-xs font-extrabold transition ${
                selected
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "border border-emerald-100 bg-white text-emerald-900 hover:bg-emerald-50"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-600" aria-live="polite">
        {resultCount} resource{resultCount === 1 ? "" : "s"} found
      </p>
    </div>
  );
}
