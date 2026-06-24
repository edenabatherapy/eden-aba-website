import { createClient } from "@supabase/supabase-js";
import { getChildFirstName } from "@/lib/intake/required-fields";

export type IntakePacketFileMeta = {
  fieldName: string;
  safeName: string;
  mimeType: string;
  sizeBytes: number;
};

/** Full submitted payload stored in intake_packets.packet (JSONB). */
export type IntakePacketPayload = {
  intake: Record<string, unknown>;
  documentMeta: Record<string, unknown>;
  files: IntakePacketFileMeta[];
};

export type IntakePacketInsertFields = {
  confirmationId: string;
  submittedAt: string;
  intake: Record<string, unknown>;
  documentMeta: Record<string, unknown>;
  files: IntakePacketFileMeta[];
  status?: string;
};

export type IntakePacketInsertFailure = {
  ok: false;
  reason: "missing-config" | "insert-failed";
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
  payloadKeys?: string[];
};

export type IntakePacketInsertResult = { ok: true; id?: string } | IntakePacketInsertFailure;

export function isIntakePacketInsertFailure(
  result: IntakePacketInsertResult,
): result is IntakePacketInsertFailure {
  return result.ok === false;
}

function str(value: unknown): string {
  return String(value ?? "").trim();
}

function getChildLastName(intake: Record<string, unknown>): string {
  const parts = str(intake.childFullName).split(/\s+/).filter(Boolean);
  return parts.length > 1 ? parts.slice(1).join(" ") : "";
}

function getParentName(intake: Record<string, unknown>): string {
  return str(intake.guardianName) || str(intake.legalGlobalName) || str(intake.finalName);
}

function buildPacketPayload(fields: IntakePacketInsertFields): IntakePacketPayload {
  return {
    intake: fields.intake,
    documentMeta: fields.documentMeta,
    files: fields.files,
  };
}

function createIntakePacketsServiceRoleClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  }

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  console.log("[intake_packets] using service role client");

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function insertIntakePacket(
  fields: IntakePacketInsertFields,
): Promise<IntakePacketInsertResult> {
  const packet = buildPacketPayload(fields);
  const intake = fields.intake;

  const row = {
    confirmation_id: fields.confirmationId,
    parent_name: getParentName(intake),
    child_first_name: getChildFirstName(intake),
    child_last_name: getChildLastName(intake),
    parent_email: str(intake.email),
    parent_phone: str(intake.phone),
    submitted_at: fields.submittedAt,
    status: fields.status ?? "received",
    packet,
  };

  const payloadKeys = Object.keys(row);

  let supabase;
  try {
    supabase = createIntakePacketsServiceRoleClient();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Supabase intake_packets insert failed]", {
      message,
      code: "missing-config",
      details: undefined,
      hint: "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel.",
      confirmationId: fields.confirmationId,
    });
    console.error("[Supabase intake_packets insert failed] payload keys", { keys: payloadKeys });

    return {
      ok: false,
      reason: "missing-config",
      message,
      payloadKeys,
    };
  }

  const { data, error } = await supabase
    .from("intake_packets")
    .insert(row)
    .select("id")
    .single();

  if (error) {
    console.error("[Supabase intake_packets insert failed]", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      confirmationId: fields.confirmationId,
    });
    console.error("[Supabase intake_packets insert failed] payload keys", { keys: payloadKeys });

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

  console.info("[Supabase intake_packets insert succeeded]", {
    id: data?.id,
    confirmationId: fields.confirmationId,
    parentEmail: row.parent_email || null,
    fileCount: packet.files.length,
  });

  return { ok: true, id: data?.id };
}
