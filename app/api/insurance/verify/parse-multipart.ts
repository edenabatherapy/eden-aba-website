import { NextResponse } from "next/server";
import {
  INSURANCE_DOCUMENT_FIELD_KEYS,
  isInsuranceDocumentFieldKey,
} from "@/lib/insurance/insurance-document-fields";
import type { InsuranceVerificationRequest } from "@/types/insurance";

export type ParsedInsuranceVerificationSubmission = {
  body: InsuranceVerificationRequest & { recaptchaToken?: string };
  files: Partial<Record<(typeof INSURANCE_DOCUMENT_FIELD_KEYS)[number], File>>;
};

function isFormDataUpload(value: unknown): value is File {
  return (
    typeof value === "object" &&
    value !== null &&
    "arrayBuffer" in value &&
    typeof (value as File).arrayBuffer === "function" &&
    "size" in value &&
    typeof (value as File).size === "number" &&
    (value as File).size > 0
  );
}

export async function parseInsuranceVerificationMultipart(
  request: Request,
): Promise<
  | { ok: true; data: ParsedInsuranceVerificationSubmission }
  | { ok: false; response: NextResponse }
> {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (error) {
    console.error("[insurance/verify][multipart] formData parse failed", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Invalid or missing required form information." },
        { status: 400 },
      ),
    };
  }

  const payloadRaw = formData.get("payload");
  if (typeof payloadRaw !== "string") {
    console.error("[insurance/verify][multipart] missing payload field", {
      payloadType: payloadRaw === null ? "null" : typeof payloadRaw,
    });
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Invalid or missing required form information." },
        { status: 400 },
      ),
    };
  }

  let body: InsuranceVerificationRequest & { recaptchaToken?: string };
  try {
    body = JSON.parse(payloadRaw) as InsuranceVerificationRequest & { recaptchaToken?: string };
  } catch (error) {
    console.error("[insurance/verify][multipart] payload JSON parse failed", {
      message: error instanceof Error ? error.message : String(error),
    });
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Invalid or missing required form information." },
        { status: 400 },
      ),
    };
  }

  const files: ParsedInsuranceVerificationSubmission["files"] = {};
  const fileDebug: Array<Record<string, unknown>> = [];

  for (const [key, value] of formData.entries()) {
    if (key === "payload") continue;
    if (!isInsuranceDocumentFieldKey(key)) continue;

    fileDebug.push({
      key,
      valueType: value === null ? "null" : typeof value,
      constructor: value && typeof value === "object" ? (value as object).constructor?.name : null,
      isFileInstance: value instanceof File,
      isBlobInstance: typeof Blob !== "undefined" && value instanceof Blob,
      size: isFormDataUpload(value) ? value.size : null,
    });

    if (!isFormDataUpload(value)) continue;
    files[key] = value;
  }

  console.info("[insurance/verify][multipart] parsed submission", {
    fileFieldCount: Object.keys(files).length,
    fileFields: Object.keys(files),
    fileDebug,
  });

  return { ok: true, data: { body, files } };
}
