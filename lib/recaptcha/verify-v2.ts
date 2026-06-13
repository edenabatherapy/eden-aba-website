import { NextResponse } from "next/server";
import {
  getRecaptchaSecretKey,
  isRecaptchaSecretKeyConfigured,
  logRecaptchaEnvInDevelopment,
} from "@/lib/recaptcha/env";
import {
  RECAPTCHA_FAILURE_MESSAGE,
  RECAPTCHA_INCOMPLETE_MESSAGE,
} from "@/lib/recaptcha/messages";

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export type RecaptchaV2VerifyResult =
  | { ok: true; skipped?: boolean }
  | { ok: false; status: number; message: string; reason: string };

export async function verifyRecaptchaV2Token(
  token: string | null | undefined,
): Promise<RecaptchaV2VerifyResult> {
  logRecaptchaEnvInDevelopment();

  const secret = getRecaptchaSecretKey();

  if (!isRecaptchaSecretKeyConfigured(secret)) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[recaptcha-v2] RECAPTCHA_SECRET_KEY not set — skipping verification in development",
      );
      return { ok: true, skipped: true };
    }

    console.error("[recaptcha-v2] RECAPTCHA_SECRET_KEY is not configured");
    return {
      ok: false,
      status: 503,
      reason: "misconfigured",
      message: RECAPTCHA_FAILURE_MESSAGE,
    };
  }

  if (!token || typeof token !== "string" || !token.trim()) {
    console.warn("[recaptcha-v2] missing token");
    return {
      ok: false,
      status: 400,
      reason: "missing-token",
      message: RECAPTCHA_INCOMPLETE_MESSAGE,
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
      "error-codes"?: string[];
    };

    if (!data.success) {
      console.warn("[recaptcha-v2] verification rejected", {
        errorCodes: data["error-codes"],
      });
      return {
        ok: false,
        status: 403,
        reason: "invalid-token",
        message: RECAPTCHA_FAILURE_MESSAGE,
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("[recaptcha-v2] verification request failed", {
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

export function recaptchaV2FailureResponse(result: Extract<RecaptchaV2VerifyResult, { ok: false }>) {
  return NextResponse.json(
    { ok: false, success: false, message: result.message },
    { status: result.status },
  );
}
