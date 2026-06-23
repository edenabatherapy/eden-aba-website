export const CDC_PREVALENCE_DIVISOR = 31;
export const CDC_PREVALENCE_RATE = 100 / CDC_PREVALENCE_DIVISOR;
export const BIRTHS_PER_MINUTE = 7;
export const SECONDS_PER_DAY = 86400;
export const ESTIMATED_DAILY_BIRTHS = BIRTHS_PER_MINUTE * 60 * 24;

export type AutismAwarenessMetrics = {
  birthsToday: number;
  estimatedAutismPrevalence: number;
  dayProgress: number;
  birthsThisMinute: number;
  timeLabel: string;
  clockTime: string;
  amPm: string;
  lineData: { hour: string; births: number; prevalence: number }[];
  progressBars: {
    dayProgress: number;
    birthsToday: number;
    prevalence: number;
    birthsPerMinute: number;
  };
};

function padTime(value: number) {
  return value.toString().padStart(2, "0");
}

export function computeAutismAwarenessMetrics(
  now: Date,
  birthsPerMinuteRate = BIRTHS_PER_MINUTE,
): AutismAwarenessMetrics {
  const midnight = new Date(now);
  midnight.setHours(0, 0, 0, 0);

  const secondsToday = Math.max(0, Math.floor((now.getTime() - midnight.getTime()) / 1000));
  const minutesToday = secondsToday / 60;
  const birthsToday = Math.floor(minutesToday * BIRTHS_PER_MINUTE);
  const estimatedAutismPrevalence = Math.floor(birthsToday / CDC_PREVALENCE_DIVISOR);
  const dayProgress = Math.min(100, (secondsToday / SECONDS_PER_DAY) * 100);

  const minuteStart = new Date(now);
  minuteStart.setSeconds(0, 0);
  const secondsInCurrentMinute = Math.max(
    0,
    Math.floor((now.getTime() - minuteStart.getTime()) / 1000),
  );
  const birthsThisMinute = Math.floor((secondsInCurrentMinute / 60) * birthsPerMinuteRate);

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
    const prevalence = Math.floor(births / CDC_PREVALENCE_DIVISOR);
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
    birthsThisMinute,
    timeLabel,
    clockTime,
    amPm,
    lineData,
    progressBars: {
      dayProgress,
      birthsToday: Math.min(100, (birthsToday / ESTIMATED_DAILY_BIRTHS) * 100),
      prevalence: CDC_PREVALENCE_RATE,
      birthsPerMinute: Math.min(100, (secondsInCurrentMinute / 60) * 100),
    },
  };
}

export function getAutismAwarenessTick(): number {
  return Date.now();
}
