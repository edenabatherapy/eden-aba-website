import type { CareerBenefit } from "@/lib/careers/benefits-data";

type BenefitGridProps = {
  title: string;
  intro?: string;
  items: CareerBenefit[];
  disclaimer?: string;
};

export default function BenefitGrid({ title, intro, items, disclaimer }: BenefitGridProps) {
  return (
    <section aria-labelledby="benefits-grid-heading">
      <h2 id="benefits-grid-heading" className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
        {title}
      </h2>
      {intro && <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">{intro}</p>}
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((benefit) => (
          <li
            key={benefit.title}
            className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <h3 className="text-lg font-extrabold text-emerald-900 dark:text-emerald-200">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{benefit.description}</p>
          </li>
        ))}
      </ul>
      {disclaimer && (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm leading-6 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
          {disclaimer}
        </p>
      )}
    </section>
  );
}
