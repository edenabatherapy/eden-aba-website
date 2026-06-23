"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { LifeAtEdenTestimonial } from "@/lib/careers/life-at-eden-careers-data";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

type TestimonialsCarouselProps = {
  testimonials: LifeAtEdenTestimonial[];
};

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(next, 7000);
    return () => window.clearInterval(timer);
  }, [next, reduceMotion]);

  const current = testimonials[index];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-teal-100 bg-gradient-to-br from-white via-teal-50/20 to-emerald-50/30 p-8 shadow-sm sm:p-10">
      <Quote className="text-teal-300" size={32} aria-hidden="true" />
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={current.name}
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: -24 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className="mt-4"
        >
          <p className="text-lg font-semibold leading-8 text-slate-800 sm:text-xl">&ldquo;{current.quote}&rdquo;</p>
          <footer className="mt-6 flex flex-wrap items-center gap-3">
            <div>
              <cite className="not-italic text-base font-extrabold text-slate-900">{current.name}</cite>
              <p className="text-sm text-slate-600">{current.role}</p>
            </div>
            <span className="rounded-full border border-teal-200 bg-white px-3 py-1 text-xs font-bold text-teal-800">
              {current.journey}
            </span>
          </footer>
        </motion.blockquote>
      </AnimatePresence>
      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex gap-2" aria-hidden="true">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition ${i === index ? "w-6 bg-teal-700" : "bg-teal-200"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-200 bg-white text-teal-800 transition hover:bg-teal-50"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-200 bg-white text-teal-800 transition hover:bg-teal-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
