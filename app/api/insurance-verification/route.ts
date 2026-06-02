import { NextResponse } from "next/server";

const VIRGINIA_MEDICAID = "Virginia Medicaid / Cardinal Care";

function isValidDob(value: string) {
  return /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(value);
}

export async function POST(request: Request) {
  const body = await request.json();

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

  if (!isValidDob(String(body.childDob))) {
    return NextResponse.json(
      { message: "Child date of birth must be in MM/DD/YYYY format." },
      { status: 400 }
    );
  }

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
    childDob: String(body.childDob).trim(),
    zipCode: String(body.zipCode).trim(),
    insuranceProvider: String(body.insuranceProvider).trim(),
    medicaidId: body.medicaidId ? String(body.medicaidId).trim() : null,
    status: "Submitted",
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
    - Do not scrape or auto-submit Virginia Managed Care.
    - If an approved eligibility API exists, verify server-side only.
  */

  return NextResponse.json({
    status: verificationRecord.status,
    provider: verificationRecord.insuranceProvider,
    timestamp: verificationRecord.timestamp,
    message:
      verificationRecord.insuranceProvider === VIRGINIA_MEDICAID
        ? "Your Virginia Medicaid / Cardinal Care request has been submitted."
        : "Your insurance verification request has been submitted.",
  });
}
