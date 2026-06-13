import { NextResponse } from "next/server";
import { assertInsuranceProductionReady } from "@/lib/insurance/config";
import { validateDOB, normalizeDOB } from "@/lib/insurance/dates";
import { createVerificationRecord } from "@/lib/insurance/db/repository";
import type { InsuranceVerificationRequest } from "@/types/insurance";
import { logVerificationAudit } from "@/lib/insurance/auditLog";
import { notifyNewVerificationRequest } from "@/lib/insurance/notifications";
import { storeVerificationRequest } from "@/lib/insurance/storeVerificationRequest";
import {
  getVerificationMode,
  isLiveVerificationEnabled,
  verifyInsurance,
} from "@/lib/insurance/verifyInsurance";
import { recaptchaV2FailureResponse, verifyRecaptchaV2Token } from "@/lib/recaptcha/verify-v2";

export async function GET() {
  const mode = getVerificationMode();
  return NextResponse.json({
    mode,
    liveVerificationAvailable: isLiveVerificationEnabled(),
  });
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    assertInsuranceProductionReady();
  }

  const consentTimestamp = new Date().toISOString();
  const mode = getVerificationMode();

  try {
    const body = (await req.json()) as InsuranceVerificationRequest & {
      recaptchaToken?: string;
    };

    const recaptcha = await verifyRecaptchaV2Token(body.recaptchaToken ?? null);
    if (recaptcha.ok === false) {
      return recaptchaV2FailureResponse(recaptcha);
    }

    if (!body.verificationType) {
      return NextResponse.json(
        { error: "Verification type is required." },
        { status: 400 },
      );
    }

    if (!body.fullName?.trim()) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }

    const dobValidation = validateDOB(body.dateOfBirth || "");
    if (!dobValidation.valid) {
      return NextResponse.json({ error: dobValidation.error }, { status: 400 });
    }

    const normalizedDob = normalizeDOB(body.dateOfBirth)!;

    if (!body.medicaidId?.trim() && !body.ssn?.trim()) {
      return NextResponse.json(
        { error: "Please enter either Medicaid ID or Social Security Number." },
        { status: 400 },
      );
    }

    if (!body.email?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { error: "Email and phone number are required." },
        { status: 400 },
      );
    }

    if (!body.consent) {
      return NextResponse.json(
        { error: "Consent is required before verification." },
        { status: 400 },
      );
    }

    if (body.verificationType === "child") {
      if (!body.parentFirstName?.trim() || !body.parentLastName?.trim()) {
        return NextResponse.json(
          { error: "Parent/guardian name is required for child verification." },
          { status: 400 },
        );
      }
    }

    const sanitizedRequest: InsuranceVerificationRequest = {
      ...body,
      fullName: body.fullName.trim(),
      dateOfBirth: normalizedDob,
      email: body.email.trim(),
      phone: body.phone.trim(),
      zipCode: body.zipCode.trim(),
      insuranceProvider: body.insuranceProvider.trim(),
      medicaidId: body.medicaidId?.trim() || undefined,
      ssn: body.ssn?.trim() || undefined,
      ...(body.verificationType === "child" && {
        parentFirstName: body.parentFirstName?.trim(),
        parentLastName: body.parentLastName?.trim(),
      }),
    };

    const { stored, record } = await createVerificationRecord({
      request: sanitizedRequest,
      consentTimestamp,
      normalizedDob,
    });

    if (stored && record) {
      await storeVerificationRequest({
        request: sanitizedRequest,
        consentTimestamp,
        normalizedDob,
        queueRecord: record,
      });

      void notifyNewVerificationRequest({
        requestId: record.id,
        submittedAt: record.submittedAt,
        verificationType: body.verificationType,
        insuranceProvider: sanitizedRequest.insuranceProvider,
        status: record.status,
      });
    }

    const response = await verifyInsurance(sanitizedRequest, record?.id);

    await logVerificationAudit({
      action: response.verified ? "verification_completed" : "verification_submitted",
      verificationType: body.verificationType,
      mode,
      outcome: response.verificationStatus,
      verified: response.verified,
      consentTimestamp,
      memberName: body.fullName,
      verificationStatus: response.verificationStatus,
      eligibilityStatus: response.eligibilityStatus,
      medicaidId: body.medicaidId,
      ssn: body.ssn,
      requestId: record?.id,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(response);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to process verification request.";

    await logVerificationAudit({
      action: "verification_failed",
      verificationType: "unknown",
      mode,
      outcome: "error",
      verified: false,
      consentTimestamp,
      memberName: "unknown",
      error: message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { error: "Unable to process verification request at this time." },
      { status: 500 },
    );
  }
}
