import { getSupabaseAdminClient } from "@/lib/supabase/server";

export type SupportMessageInsertFields = {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  confirmationId: string;
  subject: string;
  message: string;
  createdAt: string;
  status?: string;
};

export type SupportMessageInsertFailure = {
  ok: false;
  reason: "missing-config" | "insert-failed";
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
  confirmationId?: string;
};

export type SupportMessageInsertResult = { ok: true; id?: string } | SupportMessageInsertFailure;

export function isSupportMessageInsertFailure(
  result: SupportMessageInsertResult,
): result is SupportMessageInsertFailure {
  return result.ok === false;
}

export async function insertSupportMessage(
  fields: SupportMessageInsertFields,
): Promise<SupportMessageInsertResult> {
  const row = {
    parent_name: fields.parentName,
    parent_email: fields.parentEmail,
    parent_phone: fields.parentPhone,
    confirmation_id: fields.confirmationId,
    subject: fields.subject,
    message: fields.message,
    created_at: fields.createdAt,
    status: fields.status ?? "new",
  };

  let supabase;
  try {
    supabase = getSupabaseAdminClient();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Supabase support_messages insert failed]", {
      message,
      code: "missing-config",
      details: undefined,
      hint: "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel.",
      confirmationId: fields.confirmationId,
    });

    return {
      ok: false,
      reason: "missing-config",
      message,
      confirmationId: fields.confirmationId,
    };
  }

  const { data, error } = await supabase
    .from("support_messages")
    .insert(row)
    .select("id")
    .single();

  if (error) {
    console.error("[Supabase support_messages insert failed]", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      confirmationId: fields.confirmationId,
    });

    return {
      ok: false,
      reason: "insert-failed",
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      confirmationId: fields.confirmationId,
    };
  }

  console.info("[Supabase support_messages insert succeeded]", {
    id: data?.id,
    confirmationId: fields.confirmationId,
    subject: fields.subject,
  });

  return { ok: true, id: data?.id };
}
