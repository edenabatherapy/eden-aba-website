import { NextResponse } from "next/server";
import { generateSpeechLanguageScreeningConfirmationId } from "@/lib/speech-language-screening/confirmation";
import { notifySpeechLanguageScreeningTeam } from "@/lib/speech-language-screening/notify";
import {
  calculateScreeningResult,
  RED_FLAG_FIELDS,
  SCREENING_SCORE_FIELDS,
} from "@/lib/speech-language-screening/scoring";
import {
  insertSpeechLanguageScreening,
  isSpeechLanguageScreeningInsertFailure,
} from "@/lib/supabase/insert-speech-language-screening";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUCCESS_MESSAGE =
  "Thank you. Eden intake coordinator received your screening.";

function isNonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function pickString(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const childName = pickString(body, "childName");
  const childDob = pickString(body, "childDob");
  const parentName = pickString(body, "parentName");
  const phone = pickString(body, "phone");
  const email = pickString(body, "email");
  const signature = pickString(body, "signature");
  const consent = body.consent === true;

  if (!childName) {
    return NextResponse.json({ ok: false, message: "Child full name is required." }, { status: 400 });
  }

  if (!childDob) {
    return NextResponse.json({ ok: false, message: "Child date of birth is required." }, { status: 400 });
  }

  if (!parentName) {
    return NextResponse.json(
      { ok: false, message: "Parent or guardian name is required." },
      { status: 400 },
    );
  }

  if (!phone) {
    return NextResponse.json({ ok: false, message: "Phone number is required." }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ ok: false, message: "Email address is required." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: "Enter a valid email address." }, { status: 400 });
  }

  if (!consent) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "You must acknowledge that this screening does not replace evaluation by a licensed Speech-Language Pathologist.",
      },
      { status: 400 },
    );
  }

  if (!signature) {
    return NextResponse.json(
      { ok: false, message: "Parent or guardian signature is required." },
      { status: 400 },
    );
  }

  const screeningAnswers: Record<string, string> = {};
  for (const field of [...SCREENING_SCORE_FIELDS, ...RED_FLAG_FIELDS]) {
    const value = body[field];
    screeningAnswers[field] = typeof value === "string" ? value : String(value ?? "0");
  }

  const result = calculateScreeningResult(screeningAnswers);
  const confirmationId = generateSpeechLanguageScreeningConfirmationId();
  const submittedAt = new Date().toISOString();

  const concerns = pickString(body, "concerns");
  const primaryLanguage = pickString(body, "primaryLanguage");

  const formData: Record<string, unknown> = {
    submittedAt,
    child: {
      name: childName,
      dateOfBirth: childDob,
      primaryLanguage,
      school: pickString(body, "school"),
    },
    parentGuardian: {
      name: parentName,
      relationship: pickString(body, "relationship"),
    },
    contact: {
      phone,
      email,
      preferredContact: pickString(body, "preferredContact"),
    },
    concerns,
    screening: screeningAnswers,
    aac: {
      needs: pickString(body, "aacDetails"),
    },
    medicalDevelopmental: {
      hearingTest: pickString(body, "hearingTest"),
      diagnosis: pickString(body, "diagnosis"),
      developmentalHistory: pickString(body, "developmentalHistory"),
    },
    insurance: {
      insuranceType: pickString(body, "insuranceType"),
      referral: pickString(body, "referral"),
      policyHolder: pickString(body, "policyHolder"),
    },
    consent: {
      acknowledged: true,
      signature,
    },
    screeningScore: result.screeningScore,
    riskLevel: result.riskLevel,
    redFlags: result.redFlags,
    recommendation: result.recommendation,
  };

  const insertResult = await insertSpeechLanguageScreening({
    confirmationId,
    childName,
    childDob,
    parentName,
    phone,
    email,
    primaryLanguage,
    concerns,
    screeningScore: result.screeningScore,
    riskLevel: result.riskLevel,
    redFlags: result.redFlags,
    formData,
  });

  if (isSpeechLanguageScreeningInsertFailure(insertResult)) {
    console.error("[speech-language-screening] Supabase insert failed", {
      reason: insertResult.reason,
      message: insertResult.message,
      code: insertResult.code,
      confirmationId,
    });

    return NextResponse.json(
      { ok: false, message: "Unable to submit your screening right now. Please try again later." },
      { status: 500 },
    );
  }

  const emailResult = await notifySpeechLanguageScreeningTeam({
    confirmationId,
    parentName,
    childName,
    phone,
    email,
    screeningScore: result.screeningScore,
    riskLevel: result.riskLevel,
    redFlags: result.redFlags,
    concerns,
  });

  if (!emailResult.sent && !emailResult.skipped) {
    console.error("[speech-language-screening] email notification failed after save", {
      reason: emailResult.reason,
      confirmationId,
      screeningId: insertResult.id,
    });
  }

  return NextResponse.json({
    ok: true,
    confirmationId,
    message: SUCCESS_MESSAGE,
    screeningScore: result.screeningScore,
    riskLevel: result.riskLevel,
    redFlags: result.redFlags,
    recommendation: result.recommendation,
  });
}
