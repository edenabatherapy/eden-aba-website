import { NextResponse } from "next/server";
import { parseInsuranceVerificationMultipart } from "@/app/api/insurance/verify/parse-multipart";
import { INSURANCE_DOCUMENT_MIN_UPLOAD_ERROR } from "@/lib/insurance/insurance-document-fields";
import { submitInsuranceVerificationRequest } from "@/lib/insurance/submit-insurance-verification";
import {
  getVerificationMode,
  isLiveVerificationEnabled,
} from "@/lib/insurance/verifyInsurance";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const mode = getVerificationMode();
  return NextResponse.json({
    mode,
    liveVerificationAvailable: isLiveVerificationEnabled(),
  });
}

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  console.info("[insurance/verify] POST received", {
    contentType: contentType.split(";")[0] || "(missing)",
    isMultipart: contentType.includes("multipart/form-data"),
  });

  const isMultipart =
    contentType.includes("multipart/form-data") || contentType.includes("multipart/");

  if (isMultipart) {
    const parsed = await parseInsuranceVerificationMultipart(req);
    if (parsed.ok === false) {
      return parsed.response;
    }

    const uploadedFileCount = Object.keys(parsed.data.files).length;
    if (uploadedFileCount === 0) {
      console.error("[insurance/verify] multipart request had no document files", {
        contentType: contentType.split(";")[0] || "(missing)",
      });
      return NextResponse.json({ error: INSURANCE_DOCUMENT_MIN_UPLOAD_ERROR }, { status: 400 });
    }

    return submitInsuranceVerificationRequest({
      body: parsed.data.body,
      files: parsed.data.files,
      requireDocuments: true,
    });
  }

  console.error("[insurance/verify] JSON submission rejected — documents require multipart/form-data", {
    contentType: contentType.split(";")[0] || "(missing)",
  });

  return NextResponse.json(
    {
      error:
        "Insurance verification with documents must be submitted as multipart/form-data. Please refresh and try again.",
    },
    { status: 415 },
  );
}
