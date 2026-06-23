"use client";

import { useRef, type RefObject } from "react";
import type { LucideIcon } from "lucide-react";
import { Baby, BarChart3, Clock3, Gauge, ShieldCheck } from "lucide-react";
import {
  CDC_PREVALENCE_DIVISOR,
  ESTIMATED_DAILY_BIRTHS,
} from "@/lib/autism-awareness-metrics";
import { useBirthsPerMinuteAnimation } from "@/lib/use-births-per-minute-animation";
import { useInViewport } from "@/lib/use-in-viewport";
import { useLiveAutismAwarenessMetrics } from "@/lib/use-live-autism-awareness-metrics";
import ChildClockPanel from "@/components/ChildClockPanel";
import "./ImpactDataChartSection.css";

export {
  BIRTHS_PER_MINUTE,
  CDC_PREVALENCE_RATE,
  ESTIMATED_DAILY_BIRTHS,
} from "@/lib/autism-awareness-metrics";

type AutismAwarenessContent = {
  title: string;
  titleParts: [string, string, string];
  cdcBadge: string;
  intro: string;
  tagline: string;
  currentTimePrefix: string;
  updatesInRealtime: string;
  liveClockLabel: string;
  sourceFooter: string;
  stats: {
    birthsToday: { label: string; note: string };
    prevalence: { label: string; note: string };
    birthsPerMinute: { label: string; value: string; note: string };
    latestCdcData: {
      label: string;
      value: string;
      subtitle: string;
      dashboardYearLabel: string;
      surveillanceYearLabel: string;
      publishedLabel: string;
      rateLabel: string;
      surveillanceYear: string;
      publishedYear: string;
      rate: string;
      footerSource: string;
      footerNote: string;
    };
    earlyDiagnosis: { label: string; value: string; note: string };
  };
  dayProgress: string;
  dayProgressSuffix: string;
  factTitle: string;
  factText: string;
};

type ImpactDataChartSectionProps = {
  t: {
    pages: {
      autismAwareness: AutismAwarenessContent;
    };
  };
};

type RingTheme = "teal" | "orange" | "green" | "blue";

type RingCardConfig = {
  title: string;
  value: string;
  note: string;
  ring: number;
  theme: RingTheme;
  icon: LucideIcon;
  featured?: boolean;
  smallValue?: boolean;
  syncRingAnimation?: boolean;
};

type RingCardProps = RingCardConfig;

function needsSmallRingValue(value: string) {
  return value.includes("in") || value.includes("%") || value.replace(/\D/g, "").length >= 4;
}

function RingCard({
  title,
  value,
  note,
  ring,
  theme,
  icon: Icon,
  featured,
  smallValue,
  syncRingAnimation = false,
}: RingCardProps) {
  const ringValue = Math.min(100, Math.max(0, ring));
  const compactValue = smallValue ?? needsSmallRingValue(value);

  return (
    <article
      className={`cdc-ring-card cdc-ring-${theme}${featured ? " cdc-ring-featured" : ""}${syncRingAnimation ? " cdc-ring-card--synced" : ""}`}
      style={{ ["--value" as string]: ringValue }}
    >
      <div className="cdc-ring-visual">
        <svg viewBox="0 0 120 120" className="cdc-ring-svg" aria-hidden="true">
          <circle className="cdc-ring-track" cx="60" cy="60" r="50" />
          <circle className="cdc-ring-fill" cx="60" cy="60" r="50" />
        </svg>
        <div className="cdc-ring-center">
          <span className="cdc-ring-icon">
            <Icon aria-hidden="true" size={20} />
          </span>
          <strong
            className={`cdc-ring-value${compactValue ? " small-value" : ""}`}
            suppressHydrationWarning
            aria-live={syncRingAnimation ? "polite" : undefined}
          >
            {value}
          </strong>
        </div>
      </div>

      <h3 className="cdc-ring-title">{title}</h3>
      <p className="cdc-ring-note">{note}</p>
    </article>
  );
}

export default function ImpactDataChartSection({ t }: ImpactDataChartSectionProps) {
  const a = t.pages.autismAwareness;
  const s = a.stats;
  const latest = s.latestCdcData;
  const metrics = useLiveAutismAwarenessMetrics(s.birthsPerMinute.value);
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionVisible = useInViewport(sectionRef as RefObject<HTMLElement>);
  const birthsPerMinuteAnimation = useBirthsPerMinuteAnimation(isSectionVisible);

  const [titleLead, titleMiddle, titleEnd] = a.titleParts ?? ["Autism", "Awareness", "Counter"];

  const dailyMaxPrevalence = ESTIMATED_DAILY_BIRTHS / CDC_PREVALENCE_DIVISOR;
  const prevalenceRing = Math.min(
    100,
    (metrics.estimatedAutismPrevalence / dailyMaxPrevalence) * 100,
  );

  const ringCards: RingCardConfig[] = [
    {
      title: s.birthsToday.label,
      value: metrics.birthsToday.toLocaleString(),
      note: s.birthsToday.note,
      ring: metrics.progressBars.birthsToday,
      theme: "teal",
      icon: Baby,
    },
    {
      title: s.prevalence.label,
      value: metrics.estimatedAutismPrevalence.toLocaleString(),
      note: s.prevalence.note,
      ring: prevalenceRing,
      theme: "teal",
      icon: BarChart3,
    },
    {
      title: a.dayProgress,
      value: `${metrics.dayProgress.toFixed(1)}%`,
      note: a.dayProgressSuffix,
      ring: metrics.progressBars.dayProgress,
      theme: "orange",
      icon: Clock3,
    },
    {
      title: s.birthsPerMinute.label,
      value: String(birthsPerMinuteAnimation.count),
      note: s.birthsPerMinute.note,
      ring: birthsPerMinuteAnimation.ring,
      theme: "green",
      icon: Gauge,
      syncRingAnimation: true,
    },
    {
      title: latest.label,
      value: latest.value,
      note: latest.subtitle,
      ring: 32,
      theme: "blue",
      icon: BarChart3,
      smallValue: true,
    },
    {
      title: s.earlyDiagnosis.label,
      value: s.earlyDiagnosis.value,
      note: s.earlyDiagnosis.note,
      ring: 80,
      theme: "green",
      icon: ShieldCheck,
    },
  ];

  return (
    <>
      <section
        ref={sectionRef}
        className="eden-awareness-section"
        aria-labelledby="autism-awareness-title"
      >
        <header className="eden-awareness-header">
          <p className="eden-awareness-eyebrow">{a.cdcBadge}</p>

          <h2 id="autism-awareness-title" className="eden-awareness-title">
            <span>{titleLead}</span> {titleMiddle} {titleEnd}
          </h2>

          <p className="eden-awareness-description">{a.intro}</p>

          <p className="eden-awareness-support">{a.tagline}</p>
        </header>

        <div className="eden-awareness-dashboard">
          <section className="cdc-ring-panel" aria-label="CDC awareness metrics">
            <div className="cdc-ring-grid">
              {ringCards.map((card) => (
                <RingCard key={card.title} {...card} />
              ))}
            </div>
          </section>

          <section className="eden-clock-panel" aria-label="Child Clock visualization">
            <ChildClockPanel />
          </section>
        </div>

        <p className="eden-cdc-source">{a.sourceFooter}</p>
      </section>

    </>
  );
}
