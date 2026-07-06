import { randomUUID } from "crypto";
import path from "path";
import {
  INSURANCE_DOCUMENT_BUCKET,
  INSURANCE_DOCUMENT_COLUMN_BY_FIELD,
  type InsuranceDocumentColumnKey,
  type InsuranceDocumentFieldKey,
} from "@/lib/insurance/insurance-document-fields";
import { validateInsuranceUploadFile } from "@/lib/insurance/validate-insurance-upload";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export type InsuranceDocumentUrls = Partial<
  Record<InsuranceDocumentColumnKey, string | null>
>;

export async function inspectInsuranceDocumentSchema(): Promise<{
  ready: boolean;
  message?: string;
  code?: string;
}> {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase
    .from("insurance_verification_requests")
    .select("insurance_front_url, insurance_back_url")
    .limit(0);

  if (error) {
    return {
      ready: false,
      message: error.message,
      code: error.code,
    };
  }

  return { ready: true };
}

export async function inspectInsuranceDocumentsBucket(): Promise<{
  exists: boolean;
  buckets: string[];
  error?: string;
}> {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.storage.listBuckets();

  if (error) {
    return {
      exists: false,
      buckets: [],
      error: error.message,
    };
  }

  const buckets = (data || []).map((bucket) => bucket.id);
  return {
    exists: buckets.includes(INSURANCE_DOCUMENT_BUCKET),
    buckets,
  };
}

export async function uploadInsuranceDocumentToStorage(params: {
  requestId: string;
  fieldKey: InsuranceDocumentFieldKey;
  fileName: string;
  mimeType: string;
  size: number;
  buffer: Buffer;
}): Promise<string> {
  const validated = validateInsuranceUploadFile({
    fieldKey: params.fieldKey,
    fileName: params.fileName,
    mimeType: params.mimeType,
    size: params.size,
    buffer: params.buffer,
  });

  const supabase = getSupabaseAdminClient();
  const ext = path.extname(validated.safeName).toLowerCase();
  const objectPath = `${params.requestId}/${validated.fieldKey}__${randomUUID()}${ext}`;

  console.info("[insurance/verify][storage] upload start", {
    bucket: INSURANCE_DOCUMENT_BUCKET,
    fieldKey: params.fieldKey,
    requestId: params.requestId,
    objectPath,
    size: params.size,
    contentType: validated.contentType,
  });

  const { data, error } = await supabase.storage
    .from(INSURANCE_DOCUMENT_BUCKET)
    .upload(objectPath, validated.buffer, {
      contentType: validated.contentType,
      upsert: false,
    });

  if (error) {
    console.error("[insurance/verify][storage] upload failed", {
      bucket: INSURANCE_DOCUMENT_BUCKET,
      fieldKey: params.fieldKey,
      requestId: params.requestId,
      objectPath,
      message: error.message,
      name: error.name,
    });
    throw new Error(error.message);
  }

  console.info("[insurance/verify][storage] upload success", {
    bucket: INSURANCE_DOCUMENT_BUCKET,
    fieldKey: params.fieldKey,
    requestId: params.requestId,
    objectPath,
    storageId: data?.id ?? null,
  });

  return objectPath;
}

export async function updateInsuranceVerificationDocumentUrls(
  requestId: string,
  urls: InsuranceDocumentUrls,
): Promise<{ ok: true } | { ok: false; message: string; code?: string }> {
  const payload = Object.fromEntries(
    Object.entries(urls).filter(([, value]) => value !== undefined),
  );

  if (Object.keys(payload).length === 0) {
    return { ok: true };
  }

  const supabase = getSupabaseAdminClient();
  const { error } = await supabase
    .from("insurance_verification_requests")
    .update(payload)
    .eq("id", requestId);

  if (error) {
    return {
      ok: false,
      message: error.message,
      code: error.code,
    };
  }

  return { ok: true };
}

export async function uploadInsuranceVerificationDocuments(params: {
  requestId: string;
  files: Partial<
    Record<
      InsuranceDocumentFieldKey,
      { fileName: string; mimeType: string; size: number; buffer: Buffer }
    >
  >;
}): Promise<InsuranceDocumentUrls> {
  const urls: InsuranceDocumentUrls = {};

  for (const [fieldKey, file] of Object.entries(params.files) as Array<
    [
      InsuranceDocumentFieldKey,
      { fileName: string; mimeType: string; size: number; buffer: Buffer },
    ]
  >) {
    if (!file) continue;

    const storagePath = await uploadInsuranceDocumentToStorage({
      requestId: params.requestId,
      fieldKey,
      fileName: file.fileName,
      mimeType: file.mimeType,
      size: file.size,
      buffer: file.buffer,
    });

    const column = INSURANCE_DOCUMENT_COLUMN_BY_FIELD[fieldKey];
    urls[column] = storagePath;
  }

  return urls;
}

/** Staff-only signed URL for private document access (server routes). */
export async function createInsuranceDocumentSignedUrl(
  storagePath: string,
  expiresInSeconds = 3600,
): Promise<string> {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.storage
    .from(INSURANCE_DOCUMENT_BUCKET)
    .createSignedUrl(storagePath, expiresInSeconds);

  if (error || !data?.signedUrl) {
    throw new Error(error?.message || "Unable to create signed document URL.");
  }

  return data.signedUrl;
}
