import { NextResponse } from "next/server";
import { normalizeDOB, validateDOB } from "@/lib/insurance/dates";
import { recaptchaV2FailureResponse, verifyRecaptchaV2Token } from "@/lib/recaptcha/verify-v2";

const VIRGINIA_MEDICAID = "Virginia Medicaid / Cardinal Care";

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const recaptcha = await verifyRecaptchaV2Token(
    typeof body.recaptchaToken === "string" ? body.recaptchaToken : null,
  );

  if (recaptcha.ok === false) {
    return recaptchaV2FailureResponse(recaptcha);
  }

  const requiredFields = [
    "parentFirstName",
    "parentLastName",
    "email",
    "phone",
    "childFullName",
    "childDob",
    "zipCode",
    "insuranceProvider",
  ];

  for (const field of requiredFields) {
    if (!body[field] || String(body[field]).trim() === "") {
      return NextResponse.json(
        { message: "Missing required insurance verification information." },
        { status: 400 }
      );
    }
  }

  if (!body.consent) {
    return NextResponse.json(
      { message: "Consent is required before submitting insurance information." },
      { status: 400 }
    );
  }

  const dobValidation = validateDOB(String(body.childDob));
  if (!dobValidation.valid) {
    return NextResponse.json(
      { message: dobValidation.error || "Child date of birth must be in MM/DD/YYYY format." },
      { status: 400 }
    );
  }

  const normalizedChildDob = normalizeDOB(String(body.childDob))!;

  if (
    body.insuranceProvider === VIRGINIA_MEDICAID &&
    (!body.medicaidId || String(body.medicaidId).trim() === "")
  ) {
    return NextResponse.json(
      { message: "Medicaid ID is required for Virginia Medicaid / Cardinal Care." },
      { status: 400 }
    );
  }

  const verificationRecord = {
    parentFirstName: String(body.parentFirstName).trim(),
    parentLastName: String(body.parentLastName).trim(),
    email: String(body.email).trim(),
    phone: String(body.phone).trim(),
    childFullName: String(body.childFullName).trim(),
    childDob: normalizedChildDob,
    zipCode: String(body.zipCode).trim(),
    insuranceProvider: String(body.insuranceProvider).trim(),
    medicaidId: body.medicaidId ? String(body.medicaidId).trim() : null,
    status: "Pending staff verification",
    timestamp: new Date().toISOString(),
  };

  /*
    TODO:
    Save verificationRecord only to Eden ABA Therapy’s secure backend.

    Security requirements:
    - Encrypt DOB and Medicaid ID at rest.
    - Do not log PHI/PII.
    - Do not place DOB, Medicaid ID, SSN, or PHI in URLs.
    - Do not send PHI to analytics.
    - Do not send PHI through unsecured email.
    - Do not scrape or auto-login to Virginia Managed Care.

    TODO: When an official Virginia Medicaid / Cardinal Care eligibility API
    becomes available, verify server-side only using DOB + Medicaid ID, then
    return verification status, provider, next steps, and timestamp. Never
    expose DOB, Medicaid ID, or other PHI in API responses, URLs, logs, or
    analytics.
  */

  return NextResponse.json({
    status: verificationRecord.status,
    provider: verificationRecord.insuranceProvider,
    nextSteps:
      "Eden ABA Therapy staff will review eligibility and benefits and contact your family with secure next steps.",
    timestamp: verificationRecord.timestamp,
    message:
      "Insurance request submitted. Eden ABA Therapy will review eligibility and benefits securely.",
  });
}
