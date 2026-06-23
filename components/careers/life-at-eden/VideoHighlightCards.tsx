"use client";

import { Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { LifeAtEdenVideo } from "@/lib/careers/life-at-eden-careers-data";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

type VideoHighlightCardsProps = {
  videos: LifeAtEdenVideo[];
};

const CATEGORY_COLORS: Record<LifeAtEdenVideo["category"], string> = {
  Recruiting: "bg-teal-700",
  "Employee Story": "bg-emerald-700",
  Community: "bg-cyan-700",
};

export default function VideoHighlightCards({ videos }: VideoHighlightCardsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {videos.map((video, index) => (
        <motion.li
          key={video.title}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: index * 0.06, ease: EASE_OUT }}
          className="group overflow-hidden rounded-[1.25rem] border border-teal-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-700">
            <span
              className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${CATEGORY_COLORS[video.category]}`}
            >
              {video.category}
            </span>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition group-hover:scale-110">
              <Play size={24} fill="currentColor" aria-hidden="true" />
            </span>
            <span className="absolute bottom-4 right-4 rounded-full bg-black/40 px-2 py-1 text-xs font-bold text-white">
              {video.duration}
            </span>
          </div>
          <div className="p-5">
            <h3 className="text-base font-extrabold text-slate-900">{video.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">{video.description}</p>
            <p className="mt-3 text-xs font-semibold text-teal-700">Video highlights coming soon</p>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
