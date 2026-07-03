"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { motion, useReducedMotion } from "framer-motion";
import {
  BENEFITS_VALUE_TOOLTIPS,
  BREAKDOWN_LABELS,
  type TotalRewardsBreakdown,
} from "@/lib/careers/salary-estimator-data";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";
import { InfoTooltip } from "@/components/careers/benefits/estimator/EstimatorPrimitives";
import { useCountUp } from "@/components/careers/benefits/estimator/useCountUp";

type BreakdownChartProps = {
  breakdown: TotalRewardsBreakdown;
  recalcKey: string;
};

const SEGMENTS: (keyof Omit<TotalRewardsBreakdown, "total">)[] = [
  "baseEarnings",
  "benefitsValue",
  "trainingSupport",
  "ptoEstimate",
];

const BAR_COLORS: Record<(typeof SEGMENTS)[number], string> = {
  baseEarnings: "bg-teal-600",
  benefitsValue: "bg-emerald-500",
  trainingSupport: "bg-cyan-600",
  ptoEstimate: "bg-teal-400",
};

function BreakdownRow({
  segmentKey,
  value,
  total,
  index,
  breakdownLabels,
  benefitsValueTooltips,
}: {
  segmentKey: (typeof SEGMENTS)[number];
  value: number;
  total: number;
  index: number;
  breakdownLabels: typeof BREAKDOWN_LABELS;
  benefitsValueTooltips: typeof BENEFITS_VALUE_TOOLTIPS;
}) {
  const reduceMotion = useReducedMotion();
  const animatedValue = useCountUp(value, { duration: 800 });
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;
  const animatedPercent = useCountUp(percent, { duration: 800 });

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="flex items-center font-extrabold text-slate-800">
          {breakdownLabels[segmentKey]}
          <InfoTooltip label={`About ${breakdownLabels[segmentKey]}`} text={benefitsValueTooltips[segmentKey]} />
        </span>
        <span className="font-bold text-teal-800" aria-live="polite">
          {animatedPercent}%
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-teal-50">
        <motion.div
          className={`h-full rounded-full ${BAR_COLORS[segmentKey]}`}
          initial={reduceMotion ? false : { width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: reduceMotion ? 0 : 0.8, delay: index * 0.1, ease: EASE_OUT }}
        />
      </div>
      <p className="mt-1.5 text-xs font-semibold text-slate-500">
        ${animatedValue.toLocaleString()} estimated annual value
      </p>
    </div>
  );
}

export default function BreakdownChart({ breakdown, recalcKey }: BreakdownChartProps) {
  const breakdownLabels = useLocalizedContent("BREAKDOWN_LABELS", BREAKDOWN_LABELS);
  const benefitsValueTooltips = useLocalizedContent("BENEFITS_VALUE_TOOLTIPS", BENEFITS_VALUE_TOOLTIPS);

  return (
    <div key={recalcKey} className="space-y-5" aria-label="Total rewards breakdown chart">
      {SEGMENTS.map((key, index) => (
        <BreakdownRow
          key={key}
          segmentKey={key}
          value={breakdown[key]}
          total={breakdown.total}
          index={index}
          breakdownLabels={breakdownLabels}
          benefitsValueTooltips={benefitsValueTooltips}
        />
      ))}
    </div>
  );
}
