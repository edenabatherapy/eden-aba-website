"use client";

import { useEffect, useState } from "react";

export type TocItem = {
  id: string;
  label: string;
};

type AlliedHealthStickyTocProps = {
  items: TocItem[];
  title: string;
};

export default function AlliedHealthStickyToc({ items, title }: AlliedHealthStickyTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(item.id);
          });
        },
        { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  return (
    <nav
      aria-label={title}
      className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-md lg:sticky lg:top-24"
    >
      <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{title}</p>
      <ol className="mt-4 space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block rounded-xl px-3 py-2 text-sm font-bold transition ${
                activeId === item.id
                  ? "bg-emerald-50 text-emerald-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
