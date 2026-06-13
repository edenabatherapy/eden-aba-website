"use client";

import type { LucideIcon } from "lucide-react";
import {
  Baby,
  BarChart3,
  Clock3,
  Gauge,
  Headphones,
  Info,
  ShieldCheck,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import "./ImpactDataChartSection.css";

const CDC_PREVALENCE_RATE = 100 / 31;
const BIRTHS_PER_MINUTE = 7;
const ESTIMATED_DAILY_BIRTHS = BIRTHS_PER_MINUTE * 60 * 24;

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
    earlySupport: { label: string; value: string; items: string[] };
    childrenIdentified: { label: string; value: string; note: string };
    increasePrevalence: { label: string; value: string; note: string };
    earlyDiagnosis: { label: string; value: string; note: string };
    accessSupport: { label: string; value: string; note: string };
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

type CardTone = "green" | "teal" | "orange";

type StatCardProps = {
  label: string;
  value: string;
  note?: string;
  valueTone?: CardTone;
  progressPct?: number;
  icon: LucideIcon;
  iconTone: CardTone;
};

function padTime(value: number) {
  return value.toString().padStart(2, "0");
}

function StatCard({
  label,
  value,
  note,
  valueTone = "green",
  progressPct,
  icon: Icon,
  iconTone,
}: StatCardProps) {
  const valueClass =
    valueTone === "teal"
      ? " awareness-stat-card__value--teal"
      : valueTone === "orange"
        ? " awareness-stat-card__value--orange"
        : " awareness-stat-card__value--green";

  return (
    <article className="awareness-stat-card">
      <div>
        <div className={`awareness-stat-card__icon-wrap awareness-stat-card__icon-wrap--${iconTone}`}>
          <Icon aria-hidden="true" />
        </div>
        <p className="awareness-stat-card__label">{label}</p>
        <p className={`awareness-stat-card__value${valueClass}`}>{value}</p>
        {note ? <p className="awareness-stat-card__note">{note}</p> : null}
        {typeof progressPct === "number" ? (
          <div className="awareness-stat-card__progress" aria-hidden="true">
            <div
              className={`awareness-stat-card__progress-bar awareness-stat-card__progress-bar--${iconTone}`}
              style={{ width: `${Math.min(100, Math.max(0, progressPct))}%` }}
            />
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function ImpactDataChartSection({ t }: ImpactDataChartSectionProps) {
  const a = t.pages.autismAwareness;
  const s = a.stats;
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const metrics = useMemo(() => {
    if (!now) {
      return {
        birthsToday: 0,
        estimatedAutismPrevalence: 0,
        dayProgress: 0,
        timeLabel: "--:--:--",
        clockTime: "--:--:--",
        amPm: "--",
        lineData: [] as { hour: string; births: number; prevalence: number }[],
      };
    }

    const midnight = new Date(now);
    midnight.setHours(0, 0, 0, 0);
    const secondsToday = Math.max(0, Math.floor((now.getTime() - midnight.getTime()) / 1000));
    const minutesToday = secondsToday / 60;
    const birthsToday = Math.floor(minutesToday * BIRTHS_PER_MINUTE);
    const estimatedAutismPrevalence = Math.floor(birthsToday / 31);
    const dayProgress = Math.min(100, (secondsToday / 86400) * 100);
    const hours = now.getHours();
    const amPm = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    const clockTime = `${hour12}:${padTime(now.getMinutes())}:${padTime(now.getSeconds())}`;
    const timeLabel = now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const currentHour = now.getHours();
    const lineData = Array.from({ length: currentHour + 1 }, (_, hour) => {
      const minuteMark = hour === currentHour ? now.getMinutes() : 59;
      const secondsAtPoint = hour * 3600 + minuteMark * 60;
      const births = Math.floor((secondsAtPoint / 60) * BIRTHS_PER_MINUTE);
      const prevalence = Math.floor(births / 31);
      const hourLabel =
        hour === 0
          ? "12 AM"
          : hour < 12
            ? `${hour} AM`
            : hour === 12
              ? "12 PM"
              : `${hour - 12} PM`;

      return { hour: hourLabel, births, prevalence };
    });

    return {
      birthsToday,
      estimatedAutismPrevalence,
      dayProgress,
      timeLabel,
      clockTime,
      amPm,
      lineData,
    };
  }, [now]);

  const progressBars = useMemo(
    () => [
      {
        label: a.dayProgress,
        value: metrics.dayProgress,
        display: `${metrics.dayProgress.toFixed(1)}%`,
        note: a.dayProgressSuffix,
      },
      {
        label: s.birthsToday.label,
        value: Math.min(100, (metrics.birthsToday / ESTIMATED_DAILY_BIRTHS) * 100),
        display: metrics.birthsToday.toLocaleString(),
        note: s.birthsToday.note,
      },
      {
        label: s.prevalence.label,
        value: CDC_PREVALENCE_RATE,
        display: metrics.estimatedAutismPrevalence.toLocaleString(),
        note: s.prevalence.note,
      },
      {
        label: s.birthsPerMinute.label,
        value: (Number(s.birthsPerMinute.value) / 10) * 100,
        display: s.birthsPerMinute.value,
        note: s.birthsPerMinute.note,
      },
    ],
    [a.dayProgress, a.dayProgressSuffix, metrics.birthsToday, metrics.dayProgress, metrics.estimatedAutismPrevalence, s.birthsPerMinute.label, s.birthsPerMinute.note, s.birthsPerMinute.value, s.birthsToday.label, s.birthsToday.note, s.prevalence.label, s.prevalence.note],
  );

  void metrics.lineData;

  const [titleLead, titleMiddle, titleEnd] = a.titleParts ?? ["Autism", "Awareness", "Counter"];

  const rowOneCards: StatCardProps[] = [
    {
      label: s.birthsToday.label,
      value: metrics.birthsToday.toLocaleString(),
      note: s.birthsToday.note,
      valueTone: "green",
      progressPct: progressBars[1]?.value,
      icon: Baby,
      iconTone: "green",
    },
    {
      label: s.prevalence.label,
      value: metrics.estimatedAutismPrevalence.toLocaleString(),
      note: s.prevalence.note,
      valueTone: "teal",
      progressPct: progressBars[2]?.value,
      icon: BarChart3,
      iconTone: "teal",
    },
    {
      label: a.dayProgress,
      value: `${metrics.dayProgress.toFixed(1)}%`,
      note: a.dayProgressSuffix,
      valueTone: "orange",
      progressPct: progressBars[0]?.value,
      icon: Clock3,
      iconTone: "orange",
    },
    {
      label: s.birthsPerMinute.label,
      value: s.birthsPerMinute.value,
      note: s.birthsPerMinute.note,
      valueTone: "green",
      progressPct: progressBars[3]?.value,
      icon: Gauge,
      iconTone: "green",
    },
  ];

  const rowTwoCards: StatCardProps[] = [
    {
      label: s.childrenIdentified.label,
      value: s.childrenIdentified.value,
      note: s.childrenIdentified.note,
      valueTone: "orange",
      icon: Users,
      iconTone: "orange",
    },
    {
      label: s.increasePrevalence.label,
      value: s.increasePrevalence.value,
      note: s.increasePrevalence.note,
      valueTone: "green",
      icon: TrendingUp,
      iconTone: "green",
    },
    {
      label: s.earlyDiagnosis.label,
      value: s.earlyDiagnosis.value,
      note: s.earlyDiagnosis.note,
      valueTone: "teal",
      icon: ShieldCheck,
      iconTone: "teal",
    },
    {
      label: s.accessSupport.label,
      value: s.accessSupport.value,
      note: s.accessSupport.note,
      valueTone: "orange",
      icon: Headphones,
      iconTone: "orange",
    },
  ];

  return (
    <section className="awareness-section" aria-labelledby="autism-awareness-title">
      <div className="awareness-widget">
        <div className="awareness-widget__top-row">
          <span className="awareness-widget__cdc-badge">
            <UserRound aria-hidden="true" />
            {a.cdcBadge}
          </span>

          <div className="awareness-widget__clock-card">
            <p className="awareness-widget__clock-label">
              <Clock3 aria-hidden="true" />
              {a.liveClockLabel}
            </p>
            <div className="awareness-widget__clock-row">
              <p className="awareness-widget__clock-time" aria-live="polite">
                {metrics.clockTime}
              </p>
              <span className="awareness-widget__clock-ampm">{metrics.amPm}</span>
            </div>
            <p className="awareness-widget__clock-note">
              <span className="awareness-widget__clock-pulse" aria-hidden="true" />
              {a.updatesInRealtime}
            </p>
          </div>
        </div>

        <header className="awareness-widget__header">
          <p className="awareness-widget__cdc-headline">{a.cdcBadge}</p>
          <h2 id="autism-awareness-title" className="awareness-widget__title">
            <span className="awareness-widget__title-teal">{titleLead}</span>{" "}
            <span className="awareness-widget__title-orange">{titleMiddle}</span>{" "}
            <span className="awareness-widget__title-green">{titleEnd}</span>
          </h2>
          <p className="awareness-widget__intro">{a.intro}</p>
          <p className="awareness-widget__tagline">{a.tagline}</p>
          <p className="sr-only">
            {a.currentTimePrefix} {metrics.timeLabel}
          </p>
        </header>

        <div className="awareness-widget__grid">
          {rowOneCards.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
          {rowTwoCards.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </div>

        <p className="awareness-widget__footer">
          <Info aria-hidden="true" />
          <span>{a.sourceFooter}</span>
        </p>
      </div>
    </section>
  );
}

export { CDC_PREVALENCE_RATE, BIRTHS_PER_MINUTE, ESTIMATED_DAILY_BIRTHS };
