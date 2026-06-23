"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ABOUT_NAV_LINKS } from "@/lib/about-nav-links";

export default function AboutSiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLink =
    ABOUT_NAV_LINKS.find((link) => pathname === link.href || pathname.startsWith(`${link.href}/`)) ??
    ABOUT_NAV_LINKS[0];

  return (
    <div ref={containerRef} className="relative hidden md:block">
      <button
        type="button"
        className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-800 dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-700 dark:hover:text-emerald-300"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        About Eden
        <ChevronDown size={16} className={`transition ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="About Eden pages"
          className="absolute left-0 top-[calc(100%+0.5rem)] z-50 min-w-[15rem] rounded-2xl border border-emerald-100 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900"
        >
          {ABOUT_NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                className={`block rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                    : "text-slate-700 hover:bg-emerald-50/70 hover:text-emerald-800 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-emerald-300"
                }`}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      ) : null}

      <span className="sr-only">Current page: {activeLink.label}</span>
    </div>
  );
}
