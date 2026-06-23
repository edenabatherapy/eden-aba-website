"use client";

import { useEffect, useState } from "react";
import {
  computeAutismAwarenessMetrics,
  type AutismAwarenessMetrics,
} from "@/lib/autism-awareness-metrics";

export function useLiveAutismAwarenessMetrics(birthsPerMinuteRate: string): AutismAwarenessMetrics {
  const rate = Number(birthsPerMinuteRate);

  const [metrics, setMetrics] = useState<AutismAwarenessMetrics>(() =>
    computeAutismAwarenessMetrics(new Date(), rate),
  );

  useEffect(() => {
    const update = () => {
      setMetrics(computeAutismAwarenessMetrics(new Date(), rate));
    };

    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [rate]);

  return metrics;
}
