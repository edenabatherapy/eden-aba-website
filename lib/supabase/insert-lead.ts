import { getSupabaseServerClient } from "@/lib/supabase/server";

export type LeadSubmissionFields = {
  parentName: string;
  email: string;
  phone: string;
  state?: string;
  childBirthdate?: string;
  diagnosisStatus?: string;
  message?: string;
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

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    console.error("[Supabase leads insert failed]", {
      message: "NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is not configured.",
      code: "missing-config",
      details: undefined,
      hint: undefined,
    });
    console.error("[Supabase leads insert failed] payload keys", { keys: payloadKeys });

    return {
      ok: false,
      reason: "missing-config",
      message: "NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is not configured.",
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
