"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  span?: "normal" | "wide" | "tall";
};

type MasonryGalleryProps = {
  items: GalleryItem[];
};

export default function MasonryGallery({ items }: MasonryGalleryProps) {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {items.map((item, index) => (
        <motion.li
          key={`${item.src}-${index}`}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: index * 0.05, ease: EASE_OUT }}
          className={`mb-4 break-inside-avoid overflow-hidden rounded-[1.25rem] border border-teal-100 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
            item.span === "wide" ? "sm:col-span-2" : ""
          }`}
        >
          <div
            className={`relative w-full bg-teal-50 ${
              item.span === "tall" ? "aspect-[3/4]" : item.span === "wide" ? "aspect-[16/10]" : "aspect-[4/3]"
            }`}
          >
            <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
          <p className="px-4 py-3 text-sm font-semibold text-slate-700">{item.caption}</p>
        </motion.li>
      ))}
    </ul>
  );
}
