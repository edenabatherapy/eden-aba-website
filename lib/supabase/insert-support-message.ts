import { createClient } from "@supabase/supabase-js";
import {
  buildSupportMessageDbRow,
  type SupportMessageApiRequest,
} from "@/lib/intake/support-message-payload";

export type SupportMessageInsertFailure = {
  ok: false;
  reason: "missing-config" | "insert-failed" | "validation-failed";
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
  confirmationId?: string;
  payloadKeys?: string[];
};

export type SupportMessageInsertResult = { ok: true; id?: string } | SupportMessageInsertFailure;

export function isSupportMessageInsertFailure(
  result: SupportMessageInsertResult,
): result is SupportMessageInsertFailure {
  return result.ok === false;
}

function createSupportMessagesServiceRoleClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  }

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  console.log("[support_messages] using service role client");

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function insertSupportMessage(
  data: SupportMessageApiRequest,
  status = "new",
): Promise<SupportMessageInsertResult> {
  const row = buildSupportMessageDbRow(data, status);
  const payloadKeys = Object.keys(row);

  console.log("support message payload", row);

  if (!row.subject) {
    return {
      ok: false,
      reason: "validation-failed",
      message: "subject is empty before insert",
      confirmationId: data.confirmationId,
    };
  }

  if (!row.message) {
    return {
      ok: false,
      reason: "validation-failed",
      message: "message is empty before insert",
      confirmationId: data.confirmationId,
      payloadKeys,
    };
  }

  let supabase;
  try {
    supabase = createSupportMessagesServiceRoleClient();
  } catch (error) {
    const configMessage = error instanceof Error ? error.message : String(error);
    console.error("[Supabase support_messages insert failed]", {
      message: configMessage,
      code: "missing-config",
      details: undefined,
      hint: "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel.",
      confirmationId: data.confirmationId,
    });

    return {
      ok: false,
      reason: "missing-config",
      message: configMessage,
      confirmationId: data.confirmationId,
      payloadKeys,
    };
  }

  const { data: inserted, error } = await supabase
    .from("support_messages")
    .insert(row)
    .select("id, subject, message, status")
    .single();

  if (error) {
    console.error("[Supabase support_messages insert failed]", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      confirmationId: data.confirmationId,
    });

    return {
      ok: false,
      reason: "insert-failed",
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      confirmationId: data.confirmationId,
      payloadKeys,
    };
  }

  const storedMessage = String(inserted?.message ?? "").trim();

  if (!storedMessage) {
    console.error("[Supabase support_messages insert failed]", {
      message: "message column empty after insert — reload Supabase API schema cache",
      code: "empty-message-column",
      details: `sent message length ${row.message.length}`,
      hint: "Supabase Dashboard → Settings → API → Reload schema",
      confirmationId: data.confirmationId,
      insertedId: inserted?.id,
      storedSubject: inserted?.subject,
    });

    return {
      ok: false,
      reason: "insert-failed",
      message: "message column was not persisted",
      code: "empty-message-column",
      confirmationId: data.confirmationId,
      payloadKeys,
    };
  }

  console.info("[Supabase support_messages insert succeeded]", {
    id: inserted?.id,
    confirmationId: data.confirmationId,
    subject: inserted?.subject,
    messageLength: row.message.length,
    storedMessageLength: storedMessage.length,
  });

  return { ok: true, id: inserted?.id };
}
