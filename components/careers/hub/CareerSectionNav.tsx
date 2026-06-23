"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

export type CareerSectionNavItem = {
  id: string;
  label: string;
};

type CareerSectionNavProps = {
  items: CareerSectionNavItem[];
  ariaLabel?: string;
};

const HEADER_OFFSET = 88;

export default function CareerSectionNav({ items, ariaLabel = "Page sections" }: CareerSectionNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: `-${HEADER_OFFSET}px 0px -55% 0px`, threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  }, []);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label={ariaLabel}
      className="sticky top-16 z-30 border-b border-teal-100/80 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95"
    >
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <ul className="flex gap-2 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const active = activeId === item.id;
            return (
              <li key={item.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  aria-current={active ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2 text-xs font-bold transition sm:text-sm ${
                    active
                      ? "bg-teal-700 text-white shadow-sm"
                      : "border border-teal-100 bg-white text-slate-700 hover:border-teal-200 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="career-section-nav-indicator"
                      className="absolute inset-0 -z-10 rounded-full bg-teal-700"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
