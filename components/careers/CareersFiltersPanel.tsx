"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { CAREERS_PAGE, FILTER_OPTIONS, type JobFilters } from "@/lib/careers-content";
import { countActiveFilters } from "@/lib/careers-filter";

type FilterGroupProps = {
  title: string;
  options: readonly string[];
  selected: string[];
  onChange: (values: string[]) => void;
};

function FilterGroup({ title, options, selected, onChange }: FilterGroupProps) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <fieldset className="space-y-3">
      <legend className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
        {title}
      </legend>
      <ul className="space-y-2">
        {options.map((option) => {
          const id = `${title}-${option}`.replace(/\s+/g, "-").toLowerCase();
          return (
            <li key={option}>
              <label
                htmlFor={id}
                className="flex cursor-pointer items-center gap-2.5 rounded-xl px-2 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <input
                  id={id}
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggle(option)}
                  className="h-4 w-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>{option}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

type CareersFiltersPanelProps = {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
  onClearAll: () => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
};

export default function CareersFiltersPanel({
  filters,
  onChange,
  onClearAll,
  mobileOpen,
  onMobileToggle,
}: CareersFiltersPanelProps) {
  const activeCount = countActiveFilters(filters);

  const updateArray = (key: keyof JobFilters, values: string[]) => {
    onChange({ ...filters, [key]: values });
  };

  const panelContent = (
    <div className="space-y-6">
      <FilterGroup
        title="Location"
        options={FILTER_OPTIONS.locations}
        selected={filters.locations}
        onChange={(values) => updateArray("locations", values)}
      />
      <FilterGroup
        title="Department"
        options={FILTER_OPTIONS.departments}
        selected={filters.departments}
        onChange={(values) => updateArray("departments", values)}
      />
      <FilterGroup
        title="Employment Type"
        options={FILTER_OPTIONS.employmentTypes}
        selected={filters.employmentTypes}
        onChange={(values) => updateArray("employmentTypes", values)}
      />
      <FilterGroup
        title="Experience Level"
        options={FILTER_OPTIONS.experienceLevels}
        selected={filters.experienceLevels}
        onChange={(values) => updateArray("experienceLevels", values)}
      />
      <FilterGroup
        title="Credential"
        options={FILTER_OPTIONS.credentials}
        selected={filters.credentials}
        onChange={(values) => updateArray("credentials", values)}
      />
      <FilterGroup
        title="Work Setting"
        options={FILTER_OPTIONS.workSettings}
        selected={filters.workSettings}
        onChange={(values) => updateArray("workSettings", values)}
      />
      <FilterGroup
        title="Schedule"
        options={FILTER_OPTIONS.schedules}
        selected={filters.schedules}
        onChange={(values) => updateArray("schedules", values)}
      />
      <FilterGroup
        title="Status"
        options={FILTER_OPTIONS.statuses}
        selected={filters.statuses}
        onChange={(values) => updateArray("statuses", values)}
      />

      {activeCount > 0 && (
        <button
          type="button"
          onClick={onClearAll}
          className="w-full rounded-2xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50 dark:border-slate-600 dark:bg-slate-900 dark:text-emerald-200 dark:hover:bg-slate-800"
        >
          {CAREERS_PAGE.results.clearAll}
        </button>
      )}
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="mb-4 inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-bold text-emerald-800 shadow-sm lg:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-emerald-200"
        aria-expanded={mobileOpen}
        aria-controls="careers-filters-panel"
        onClick={onMobileToggle}
      >
        <SlidersHorizontal size={16} aria-hidden="true" />
        Filters
        {activeCount > 0 && (
          <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-xs text-white">{activeCount}</span>
        )}
      </button>

      <aside
        id="careers-filters-panel"
        className={`lg:block ${mobileOpen ? "block" : "hidden"} rounded-[1.75rem] border border-emerald-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900`}
        aria-label="Job filters"
      >
        <div className="mb-5 flex items-center justify-between lg:hidden">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Filter Roles</h3>
          <button
            type="button"
            onClick={onMobileToggle}
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close filters"
          >
            <X size={18} />
          </button>
        </div>
        {panelContent}
      </aside>
    </>
  );
}
