import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type ProviderBreadcrumbItem = {
  label: string;
  href?: string;
};

type ProviderBreadcrumbsProps = {
  items: ProviderBreadcrumbItem[];
};

export default function ProviderBreadcrumbs({ items }: ProviderBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-emerald-100/80 bg-white/95 px-4 py-3 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95 lg:px-8"
    >
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight size={14} className="shrink-0 text-slate-400" aria-hidden="true" />
              ) : null}
              {isLast || !item.href ? (
                <span className="font-semibold text-slate-700 dark:text-slate-200" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="font-semibold text-emerald-800 transition hover:text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-emerald-300"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
