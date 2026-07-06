import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { logVerificationAudit } from "@/lib/insurance/auditLog";
import { validateDOB, normalizeDOB } from "@/lib/insurance/dates";
import { createVerificationRecord } from "@/lib/insurance/db/repository";
import { encryptPhiField } from "@/lib/insurance/encryptField";
import { notifyNewVerificationRequest } from "@/lib/insurance/notifications";
import { storeVerificationRequest } from "@/lib/insurance/storeVerificationRequest";
import {
  getVerificationMode,
  isLiveVerificationEnabled,
  verifyInsurance,
} from "@/lib/insurance/verifyInsurance";
import { recaptchaV2FailureResponse, verifyRecaptchaV2Token } from "@/lib/recaptcha/verify-v2";
import {
  insertInsuranceVerificationRequest,
  isInsuranceVerificationInsertFailure,
} from "@/lib/supabase/insert-insurance-verification-request";
import type { InsuranceVerificationRequest } from "@/types/insurance";

function logDevInsuranceRoute(message: string, meta?: Record<string, unknown>) {
  if (process.env.NODE_ENV === "development") {
    console.info(`[api/insurance/verify] ${message}`, meta ?? {});
  }
}

export async function GET() {
  const mode = getVerificationMode();
  return NextResponse.json({
    mode,
    liveVerificationAvailable: isLiveVerificationEnabled(),
  });
}

export async function POST(req: Request) {
  const consentTimestamp = new Date().toISOString();
  const mode = getVerificationMode();

  try {
    let body: InsuranceVerificationRequest & { recaptchaToken?: string };

    try {
      body = (await req.json()) as InsuranceVerificationRequest & { recaptchaToken?: string };
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const recaptcha = await verifyRecaptchaV2Token(body.recaptchaToken ?? null);
    if (recaptcha.ok === false) {
      logDevInsuranceRoute("reCAPTCHA verification failed", { reason: recaptcha.reason });
      return recaptchaV2FailureResponse(recaptcha);
    }

    if (!body.verificationType) {
      return NextResponse.json({ error: "Verification type is required." }, { status: 400 });
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
      return NextResponse.json({ error: "Email and phone number are required." }, { status: 400 });
    }

    if (!body.zipCode?.trim()) {
      return NextResponse.json({ error: "ZIP code is required." }, { status: 400 });
    }

    if (!body.insuranceProvider?.trim()) {
      return NextResponse.json({ error: "Insurance provider is required." }, { status: 400 });
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

    const requestId = randomUUID();
    const recaptchaVerified = recaptcha.ok && !recaptcha.skipped;

    const supabaseResult = await insertInsuranceVerificationRequest({
      id: requestId,
      applicantType: sanitizedRequest.verificationType,
      parentFirstName: sanitizedRequest.parentFirstName ?? null,
      parentLastName: sanitizedRequest.parentLastName ?? null,
      email: sanitizedRequest.email,
      phone: sanitizedRequest.phone,
      childName: sanitizedRequest.fullName,
      childDob: normalizedDob,
      zipCode: sanitizedRequest.zipCode,
      insuranceProvider: sanitizedRequest.insuranceProvider,
      memberId: encryptPhiField(sanitizedRequest.medicaidId || "") || null,
      ssn: encryptPhiField(sanitizedRequest.ssn || "") || null,
      consent: sanitizedRequest.consent,
      recaptchaVerified,
      status: "new",
    });

    if (isInsuranceVerificationInsertFailure(supabaseResult)) {
      if (supabaseResult.reason === "missing-config") {
        return NextResponse.json(
          {
            error:
              supabaseResult.message ||
              "Server configuration error: Supabase environment variables are missing.",
          },
          { status: 503 },
        );
      }

      return NextResponse.json(
        {
          error: "Unable to save your insurance verification request. Please try again later.",
          details:
            process.env.NODE_ENV === "development"
              ? supabaseResult.message
              : undefined,
        },
        { status: 500 },
      );
    }

    const { stored, record } = await createVerificationRecord({
      request: sanitizedRequest,
      consentTimestamp,
      normalizedDob,
      id: requestId,
    });

    if (stored && record) {
      try {
        await storeVerificationRequest({
          request: sanitizedRequest,
          consentTimestamp,
          normalizedDob,
          queueRecord: record,
        });
      } catch (storageError) {
        logDevInsuranceRoute("encrypted file backup skipped", {
          message: storageError instanceof Error ? storageError.message : "unknown",
        });
      }

      void notifyNewVerificationRequest({
        requestId: record.id,
        submittedAt: record.submittedAt,
        verificationType: body.verificationType,
        insuranceProvider: sanitizedRequest.insuranceProvider,
        status: record.status,
      });
    }

    const response = await verifyInsurance(sanitizedRequest, requestId);

    try {
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
        requestId,
        timestamp: new Date().toISOString(),
      });
    } catch (auditError) {
      logDevInsuranceRoute("audit log write skipped", {
        message: auditError instanceof Error ? auditError.message : "unknown",
      });
    }

    return NextResponse.json({
      ...response,
      requestId,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to process verification request.";

    logDevInsuranceRoute("unhandled verification error", { message });

    try {
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
    } catch {
      /* ignore audit failures */
    }

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? message
            : "Unable to process verification request at this time.",
      },
      { status: 500 },
    );
  }
}
