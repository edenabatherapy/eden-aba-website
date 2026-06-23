"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type UseCountUpOptions = {
  duration?: number;
  decimals?: number;
  enabled?: boolean;
};

export function useCountUp(target: number, options: UseCountUpOptions = {}) {
  const { duration = 900, decimals = 0, enabled = true } = options;
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(reduceMotion ? target : 0);

  useEffect(() => {
    if (!enabled) return;

    if (reduceMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const from = value;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = from + (target - from) * eased;
      setValue(decimals > 0 ? Number(next.toFixed(decimals)) : Math.round(next));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- animate from latest rendered value to new target
  }, [target, duration, decimals, enabled, reduceMotion]);

  return value;
}

export function formatCurrencyValue(n: number, decimals = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(n);
}
