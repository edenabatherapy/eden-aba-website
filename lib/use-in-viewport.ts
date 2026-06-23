"use client";

import { useEffect, useState, type RefObject } from "react";

export function useInViewport<T extends Element>(
  ref: RefObject<T | null>,
  threshold = 0.25,
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return isVisible;
}
