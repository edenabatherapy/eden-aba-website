import { getSupabaseAdminClient } from "@/lib/supabase/server";

export type InsuranceVerificationRequestInsert = {
  id?: string;
  applicantType: string;
  parentFirstName?: string | null;
  parentLastName?: string | null;
  email: string;
  phone: string;
  childName: string;
  childDob: string;
  zipCode: string;
  insuranceProvider: string;
  memberId?: string | null;
  ssn?: string | null;
  consent: boolean;
  recaptchaVerified: boolean;
  status?: string;
};

export type InsuranceVerificationInsertFailure = {
  ok: false;
  reason: "missing-config" | "insert-failed";
  message: string;
  code?: string;
  details?: string;
  hint?: string;
};

export type InsuranceVerificationInsertResult =
  | { ok: true; id: string }
  | InsuranceVerificationInsertFailure;

export function isInsuranceVerificationInsertFailure(
  result: InsuranceVerificationInsertResult,
): result is InsuranceVerificationInsertFailure {
  return result.ok === false;
}

function logDevInsuranceInsert(message: string, meta?: Record<string, unknown>) {
  if (process.env.NODE_ENV === "development") {
    console.info(`[insurance-verification] ${message}`, meta ?? {});
  }
}

function logInsuranceInsertError(message: string, meta?: Record<string, unknown>) {
  if (process.env.NODE_ENV === "development") {
    console.error(`[insurance-verification] ${message}`, meta ?? {});
  } else {
    console.error(`[insurance-verification] ${message}`);
  }
}

export async function insertInsuranceVerificationRequest(
  submission: InsuranceVerificationRequestInsert,
): Promise<InsuranceVerificationInsertResult> {
  const insertPayload = {
    ...(submission.id ? { id: submission.id } : {}),
    applicant_type: submission.applicantType,
    parent_first_name: submission.parentFirstName ?? null,
    parent_last_name: submission.parentLastName ?? null,
    email: submission.email,
    phone: submission.phone,
    child_name: submission.childName,
    child_dob: submission.childDob,
    zip_code: submission.zipCode,
    insurance_provider: submission.insuranceProvider,
    member_id: submission.memberId ?? null,
    ssn: submission.ssn ?? null,
    consent: submission.consent,
    recaptcha_verified: submission.recaptchaVerified,
    status: submission.status ?? "new",
  };

  const payloadKeys = Object.keys(insertPayload);
  logDevInsuranceInsert("preparing Supabase insert", { keys: payloadKeys });

  let supabase;
  try {
    supabase = getSupabaseAdminClient();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logInsuranceInsertError("Supabase client unavailable", {
      reason: "missing-config",
      message,
    });

    return {
      ok: false,
      reason: "missing-config",
      message:
        message.includes("SUPABASE_SERVICE_ROLE_KEY") || message.includes("NEXT_PUBLIC_SUPABASE_URL")
          ? `Server configuration error: ${message}`
          : "Server configuration error: Supabase is not configured.",
    };
  }

  const { data, error } = await supabase
    .from("insurance_verification_requests")
    .insert(insertPayload)
    .select("id")
    .single();

  if (error) {
    logInsuranceInsertError("Supabase insert failed", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });

    return {
      ok: false,
      reason: "insert-failed",
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    };
  }

  const id = data?.id;
  if (!id) {
    return {
      ok: false,
      reason: "insert-failed",
      message: "Supabase insert succeeded but no record id was returned.",
    };
  }

  logDevInsuranceInsert("Supabase insert succeeded", { id });

  return { ok: true, id: String(id) };
}
