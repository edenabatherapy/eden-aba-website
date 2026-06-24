import { getSupabaseAdminClient } from "@/lib/supabase/server";

export type LeadSubmissionFields = {
  parentName: string;
  email: string;
  phone: string;
  state?: string;
  childBirthdate?: string;
  diagnosisStatus?: string;
  message?: string;
  confirmationId?: string;
};

export type LeadInsertFailure = {
  ok: false;
  reason: "missing-config" | "insert-failed";
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
  payloadKeys?: string[];
};

export type LeadInsertResult = { ok: true } | LeadInsertFailure;

export function isLeadInsertFailure(result: LeadInsertResult): result is LeadInsertFailure {
  return result.ok === false;
}

export async function insertLeadSubmission(
  submission: LeadSubmissionFields,
): Promise<LeadInsertResult> {
  const insertPayload = {
    parent_name: submission.parentName,
    email: submission.email,
    phone: submission.phone,
    city: submission.state ?? "",
    child_age: submission.childBirthdate ?? "",
    service_interest: submission.diagnosisStatus ?? "",
    message: submission.message ?? "",
  };

  const payloadKeys = Object.keys(insertPayload);
  const confirmationId = submission.confirmationId;

  let supabase;
  try {
    supabase = getSupabaseAdminClient();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Supabase leads insert failed]", {
      message,
      code: "missing-config",
      details: undefined,
      hint: "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel.",
      confirmationId,
    });
    console.error("[Supabase leads insert failed] payload keys", { keys: payloadKeys });

    return {
      ok: false,
      reason: "missing-config",
      message,
      payloadKeys,
    };
  }

  const { error } = await supabase.from("leads").insert(insertPayload);

  if (error) {
    console.error("[Supabase leads insert failed]", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      confirmationId,
    });
    console.error("[Supabase leads insert failed] payload keys", { keys: payloadKeys });

    return {
      ok: false,
      reason: "insert-failed",
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      payloadKeys,
    };
  }

  return { ok: true };
}
