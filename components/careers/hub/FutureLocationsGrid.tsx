"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { FUTURE_LOCATIONS, FUTURE_LOCATIONS_DESCRIPTION } from "@/lib/careers/future-locations-data";
import { getButtonClasses } from "@/lib/button-styles";

type FutureLocationsGridProps = {
  title?: string;
  description?: string;
};

export default function FutureLocationsGrid({
  title = "Growing Across Virginia",
  description,
}: FutureLocationsGridProps) {
  const futureLocations = useLocalizedContent("FUTURE_LOCATIONS", FUTURE_LOCATIONS);
  const futureLocationsDescription = useLocalizedContent(
    "FUTURE_LOCATIONS_DESCRIPTION",
    FUTURE_LOCATIONS_DESCRIPTION,
  );
  const resolvedDescription = description ?? futureLocationsDescription;

  return (
    <section aria-labelledby="future-locations-heading">
      <h2 id="future-locations-heading" className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">{resolvedDescription}</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {futureLocations.map((city) => (
          <li key={city.city}>
            <article className="flex h-full flex-col rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <div className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <MapPin size={16} aria-hidden="true" />
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{city.city.replace(", VA", "")}</h3>
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">Future growth area</p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{city.description}</p>
              <Link href="/careers/talent-network" className={`${getButtonClasses("secondary", "mt-5 w-full")} mt-auto`}>
                Join talent network
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
