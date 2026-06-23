"use client";

import { motion, useReducedMotion } from "framer-motion";
import { formatCurrencyValue, useCountUp } from "@/components/careers/benefits/estimator/useCountUp";

type HoursSliderProps = {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  dragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  hourlyMidpoint: number;
};

export default function HoursSlider({
  value,
  min,
  max,
  onChange,
  dragging,
  onDragStart,
  onDragEnd,
  hourlyMidpoint,
}: HoursSliderProps) {
  const reduceMotion = useReducedMotion();
  const weeklyPay = useCountUp(hourlyMidpoint * value, { duration: dragging ? 180 : 500, decimals: 0 });

  return (
    <div className="rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor="hours-slider" className="text-sm font-extrabold text-slate-900">
          Weekly hours
        </label>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-black text-teal-800">{value} hrs / week</span>
      </div>

      <div className="relative mt-4">
        <input
          id="hours-slider"
          type="range"
          min={min}
          max={max}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onPointerDown={onDragStart}
          onPointerUp={onDragEnd}
          onBlur={onDragEnd}
          className="estimator-hours-slider w-full"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
        {!reduceMotion && dragging ? (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-teal-600/30"
            style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 10px)` }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}
      </div>

      <p className="mt-3 text-sm text-slate-600">
        Estimated weekly base at midpoint rate:{" "}
        <span className="font-extrabold text-teal-800">{formatCurrencyValue(weeklyPay)}</span>
      </p>

      <style jsx>{`
        .estimator-hours-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          border-radius: 9999px;
          background: linear-gradient(90deg, #0f766e 0%, #14b8a6 100%);
          outline: none;
        }
        .estimator-hours-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          background: #0f766e;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(15, 118, 110, 0.35);
          cursor: pointer;
        }
        .estimator-hours-slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 9999px;
          background: #0f766e;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(15, 118, 110, 0.35);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
