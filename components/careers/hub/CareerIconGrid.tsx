"use client";

import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

export type CareerIconGridItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type CareerIconGridProps = {
  items: CareerIconGridItem[];
};

export default function CareerIconGrid({ items }: CareerIconGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.li
            key={item.title}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: index * 0.05, ease: EASE_OUT }}
            className="rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white">
              <Icon size={20} aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-base font-extrabold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
          </motion.li>
        );
      })}
    </ul>
  );
}
