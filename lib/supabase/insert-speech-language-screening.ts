import { getSupabaseAdminClient } from "@/lib/supabase/server";

export type SpeechLanguageScreeningRow = {
  confirmationId: string;
  childName: string;
  childDob: string;
  parentName: string;
  phone: string;
  email: string;
  primaryLanguage: string;
  concerns: string;
  screeningScore: number;
  riskLevel: string;
  redFlags: boolean;
  formData: Record<string, unknown>;
};

export type SpeechLanguageScreeningInsertFailure = {
  ok: false;
  reason: "missing-config" | "insert-failed";
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
  confirmationId?: string;
  payloadKeys?: string[];
};

export type SpeechLanguageScreeningInsertResult =
  | { ok: true; id: string }
  | SpeechLanguageScreeningInsertFailure;

export function isSpeechLanguageScreeningInsertFailure(
  result: SpeechLanguageScreeningInsertResult,
): result is SpeechLanguageScreeningInsertFailure {
  return result.ok === false;
}

export async function insertSpeechLanguageScreening(
  submission: SpeechLanguageScreeningRow,
): Promise<SpeechLanguageScreeningInsertResult> {
  const insertPayload = {
    confirmation_id: submission.confirmationId,
    child_name: submission.childName,
    child_dob: submission.childDob,
    parent_name: submission.parentName,
    phone: submission.phone,
    email: submission.email,
    primary_language: submission.primaryLanguage,
    concerns: submission.concerns,
    screening_score: submission.screeningScore,
    risk_level: submission.riskLevel,
    red_flags: submission.redFlags,
    form_data: submission.formData,
  };

  const payloadKeys = Object.keys(insertPayload);

  let supabase;
  try {
    supabase = getSupabaseAdminClient();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Supabase speech_language_screenings insert failed]", {
      message,
      code: "missing-config",
      confirmationId: submission.confirmationId,
    });

    return {
      ok: false,
      reason: "missing-config",
      message,
      confirmationId: submission.confirmationId,
      payloadKeys,
    };
  }

  const { data, error } = await supabase
    .from("speech_language_screenings")
    .insert(insertPayload)
    .select("id")
    .single();

  if (error) {
    console.error("[Supabase speech_language_screenings insert failed]", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      confirmationId: submission.confirmationId,
    });

    return {
      ok: false,
      reason: "insert-failed",
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      confirmationId: submission.confirmationId,
      payloadKeys,
    };
  }

  return { ok: true, id: String(data?.id ?? "") };
}
