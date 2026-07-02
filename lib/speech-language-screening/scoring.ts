export const SCREENING_SCORE_FIELDS = [
  "followDirections",
  "understanding",
  "fewWords",
  "frustration",
  "clarity",
  "sounds",
  "social",
  "gestures",
  "aac",
  "fluency",
  "voice",
] as const;

export const RED_FLAG_FIELDS = ["swallowSafety", "feedingConcern"] as const;

export type ScreeningScoreField = (typeof SCREENING_SCORE_FIELDS)[number];
export type RedFlagField = (typeof RED_FLAG_FIELDS)[number];

export type ScreeningAnswers = Partial<
  Record<ScreeningScoreField | RedFlagField, string | number>
>;

export type ScreeningResult = {
  screeningScore: number;
  riskLevel: string;
  redFlags: boolean;
  recommendation: string;
};

function toScore(value: unknown): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return Math.min(2, Math.floor(parsed));
}

export function calculateScreeningResult(answers: ScreeningAnswers): ScreeningResult {
  let screeningScore = 0;
  let redFlags = false;

  for (const field of SCREENING_SCORE_FIELDS) {
    screeningScore += toScore(answers[field]);
  }

  for (const field of RED_FLAG_FIELDS) {
    const value = toScore(answers[field]);
    screeningScore += value;
    if (value > 0) redFlags = true;
  }

  if (redFlags) {
    return {
      screeningScore,
      riskLevel: "High priority / safety review",
      redFlags: true,
      recommendation:
        "Because feeding or swallowing safety concerns were reported, Eden recommends prompt review by a qualified medical provider or licensed Speech-Language Pathologist.",
    };
  }

  if (screeningScore <= 3) {
    return {
      screeningScore,
      riskLevel: "Low concern",
      redFlags: false,
      recommendation: "Parent education and monitoring may be appropriate.",
    };
  }

  if (screeningScore <= 7) {
    return {
      screeningScore,
      riskLevel: "Moderate concern",
      redFlags: false,
      recommendation:
        "A speech-language screening is recommended to determine if full evaluation is needed.",
    };
  }

  return {
    screeningScore,
    riskLevel: "High concern",
    redFlags: false,
    recommendation:
      "A full speech-language evaluation is recommended based on reported concerns.",
  };
}
