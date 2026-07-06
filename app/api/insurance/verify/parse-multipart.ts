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
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Invalid or missing required form information." },
        { status: 400 },
      ),
    };
  }

  const files: ParsedInsuranceVerificationSubmission["files"] = {};
  for (const [key, value] of formData.entries()) {
    if (key === "payload" || !(value instanceof File) || value.size <= 0) continue;
    if (!isInsuranceDocumentFieldKey(key)) continue;
    files[key] = value;
  }

  return { ok: true, data: { body, files } };
}
