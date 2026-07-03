"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROVIDER_SECTION_NAV } from "@/lib/providers/provider-content";

export default function ProviderSectionNav() {
  const providerSectionNav = useLocalizedContent("PROVIDER_SECTION_NAV", PROVIDER_SECTION_NAV);

  const pathname = usePathname() ?? "";

  return (
    <nav
      aria-label="For Providers section"
      className="sticky top-[4.5rem] z-30 border-b border-emerald-100/80 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95"
    >
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 lg:px-8">
        {providerSectionNav.map((item) => {
          const isActive =
            item.href === "/providers"
              ? pathname === "/providers"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                isActive
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 dark:text-slate-200 dark:hover:bg-slate-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
