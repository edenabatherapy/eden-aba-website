"use client";

import { useEffect, useState } from "react";

export const BIRTHS_PER_MINUTE_TARGET = 7;
export const BIRTHS_PER_MINUTE_DURATION_MS = 60_000;

export function useBirthsPerMinuteAnimation(isVisible: boolean) {
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      setProgress(0);
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setCount(BIRTHS_PER_MINUTE_TARGET);
      setProgress(1);
      return undefined;
    }

    let animationFrameId = 0;
    let startTime: number | null = null;

    setCount(0);
    setProgress(0);

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const nextProgress = Math.min(elapsed / BIRTHS_PER_MINUTE_DURATION_MS, 1);

      setProgress(nextProgress);
      setCount(
        nextProgress >= 1
          ? BIRTHS_PER_MINUTE_TARGET
          : Math.floor(nextProgress * BIRTHS_PER_MINUTE_TARGET),
      );

      if (nextProgress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return {
    count,
    progress,
    ring: progress * 100,
  };
}
