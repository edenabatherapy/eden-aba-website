import { NextResponse } from "next/server";
import type { RecaptchaAction } from "@/lib/recaptcha/actions";
import { RECAPTCHA_FAILURE_MESSAGE } from "@/lib/recaptcha/messages";

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export type RecaptchaVerifyResult =
  | { ok: true; score: number; skipped?: boolean }
  | { ok: false; status: number; message: string; reason: string };

function getMinScore() {
  const parsed = parseFloat(process.env.RECAPTCHA_MIN_SCORE ?? "0.5");
  return Number.isFinite(parsed) ? parsed : 0.5;
}

export async function verifyRecaptchaToken(
  token: string | null | undefined,
  expectedAction: RecaptchaAction,
): Promise<RecaptchaVerifyResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();

  if (!secret) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[recaptcha] RECAPTCHA_SECRET_KEY not set — skipping verification in development",
        { action: expectedAction },
      );
      return { ok: true, score: 1, skipped: true };
    }

    console.error("[recaptcha] RECAPTCHA_SECRET_KEY is not configured", {
      action: expectedAction,
    });
    return {
      ok: false,
      status: 503,
      reason: "misconfigured",
      message: RECAPTCHA_FAILURE_MESSAGE,
    };
  }

  if (!token || typeof token !== "string") {
    console.warn("[recaptcha] missing token", { action: expectedAction });
    return {
      ok: false,
      status: 400,
      reason: "missing-token",
      message: RECAPTCHA_FAILURE_MESSAGE,
    };
  }

  try {
    const body = new URLSearchParams();
    body.append("secret", secret);
    body.append("response", token);

    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    const data = (await response.json()) as {
      success?: boolean;
      score?: number;
      action?: string;
      "error-codes"?: string[];
    };

    if (!data.success) {
      console.warn("[recaptcha] verification rejected", {
        action: expectedAction,
        errorCodes: data["error-codes"],
      });
      return {
        ok: false,
        status: 403,
        reason: "invalid-token",
        message: RECAPTCHA_FAILURE_MESSAGE,
      };
    }

    if (data.action && data.action !== expectedAction) {
      console.warn("[recaptcha] action mismatch", {
        expected: expectedAction,
        received: data.action,
        score: data.score,
      });
      return {
        ok: false,
        status: 403,
        reason: "action-mismatch",
        message: RECAPTCHA_FAILURE_MESSAGE,
      };
    }

    const score = typeof data.score === "number" ? data.score : 0;
    const minScore = getMinScore();

    if (score < minScore) {
      console.warn("[recaptcha] score below threshold", {
        action: expectedAction,
        score,
        minScore,
      });
      return {
        ok: false,
        status: 403,
        reason: "low-score",
        message: RECAPTCHA_FAILURE_MESSAGE,
      };
    }

    return { ok: true, score };
  } catch (error) {
    console.error("[recaptcha] verification request failed", {
      action: expectedAction,
      error: error instanceof Error ? error.message : "unknown",
    });
    return {
      ok: false,
      status: 503,
      reason: "verify-error",
      message: RECAPTCHA_FAILURE_MESSAGE,
    };
  }
}

export function recaptchaFailureResponse(result: Extract<RecaptchaVerifyResult, { ok: false }>) {
  return NextResponse.json({ ok: false, message: result.message }, { status: result.status });
}
