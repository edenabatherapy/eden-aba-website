import Link from "next/link";

type CareerBreadcrumbItem = {
  label: string;
  href?: string;
};

type CareerBreadcrumbsProps = {
  items: CareerBreadcrumbItem[];
};

export default function CareerBreadcrumbs({ items }: CareerBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-5xl px-4 pt-6 lg:px-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isLast || !item.href ? (
                <span className="text-emerald-800 dark:text-emerald-300" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-emerald-700 dark:hover:text-emerald-300">
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
