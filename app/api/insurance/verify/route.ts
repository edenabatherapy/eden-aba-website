import { NextResponse } from "next/server";
import { parseInsuranceVerificationMultipart } from "@/app/api/insurance/verify/parse-multipart";
import { submitInsuranceVerificationRequest } from "@/lib/insurance/submit-insurance-verification";
import {
  getVerificationMode,
  isLiveVerificationEnabled,
} from "@/lib/insurance/verifyInsurance";
import type { InsuranceVerificationRequest } from "@/types/insurance";

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

  if (contentType.includes("multipart/form-data")) {
    const parsed = await parseInsuranceVerificationMultipart(req);
    if (parsed.ok === false) {
      return parsed.response;
    }

    return submitInsuranceVerificationRequest({
      body: parsed.data.body,
      files: parsed.data.files,
      requireDocuments: true,
    });
  }

  let body: InsuranceVerificationRequest & { recaptchaToken?: string };
  try {
    body = (await req.json()) as InsuranceVerificationRequest & { recaptchaToken?: string };
  } catch (parseError) {
    console.error("[api/insurance/verify] request-body-parse", {
      message: parseError instanceof Error ? parseError.message : String(parseError),
    });
    return NextResponse.json(
      { error: "Invalid or missing required form information." },
      { status: 400 },
    );
  }

  return submitInsuranceVerificationRequest({ body });
}
