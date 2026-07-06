import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { logVerificationAudit } from "@/lib/insurance/auditLog";
import { createVerificationRecord } from "@/lib/insurance/db/repository";
import { encryptPhiField } from "@/lib/insurance/encryptField";
import {
  INSURANCE_VERIFICATION_ERROR_MESSAGES,
  validateAndNormalizeInsuranceVerificationRequest,
} from "@/lib/insurance/normalize-verification-request";
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
      if (recaptcha.reason === "missing-token" || recaptcha.reason === "expired") {
        return NextResponse.json(
          { error: INSURANCE_VERIFICATION_ERROR_MESSAGES.recaptcha },
          { status: recaptcha.status },
        );
      }
      return recaptchaV2FailureResponse(recaptcha);
    }

    const normalized = validateAndNormalizeInsuranceVerificationRequest(body);
    if (normalized.ok === false) {
      return NextResponse.json({ error: normalized.error }, { status: normalized.status });
    }

    const sanitizedRequest: InsuranceVerificationRequest = {
      verificationType: normalized.data.verificationType,
      fullName: normalized.data.fullName,
      dateOfBirth: normalized.data.dateOfBirth,
      email: normalized.data.email,
      phone: normalized.data.phone,
      zipCode: normalized.data.zipCode,
      insuranceProvider: normalized.data.insuranceProvider,
      medicaidId: normalized.data.medicaidId ?? undefined,
      ssn: normalized.data.ssn ?? undefined,
      consent: normalized.data.consent,
      ...(normalized.data.verificationType === "child" && {
        parentFirstName: normalized.data.parentFirstName ?? undefined,
        parentLastName: normalized.data.parentLastName ?? undefined,
      }),
    };

    const normalizedDob = normalized.data.dateOfBirth;

    const requestId = randomUUID();
    const recaptchaVerified = recaptcha.ok && !recaptcha.skipped;

    const supabaseResult = await insertInsuranceVerificationRequest({
      id: requestId,
      applicantType: sanitizedRequest.verificationType,
      parentFirstName: normalized.data.parentFirstName,
      parentLastName: normalized.data.parentLastName,
      email: normalized.data.email,
      phone: normalized.data.phone,
      childName: normalized.data.fullName,
      childDob: normalizedDob,
      zipCode: normalized.data.zipCode,
      insuranceProvider: normalized.data.insuranceProvider,
      memberId: encryptPhiField(normalized.data.medicaidId || "") || null,
      ssn: encryptPhiField(normalized.data.ssn || "") || null,
      consent: normalized.data.consent,
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

      console.error("Insurance verification insert failed:", {
        message: supabaseResult.message,
        details: supabaseResult.details,
        hint: supabaseResult.hint,
        code: supabaseResult.code,
      });

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

    logDevInsuranceRoute("Supabase insert succeeded", { requestId });

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
        verificationType: sanitizedRequest.verificationType,
        insuranceProvider: sanitizedRequest.insuranceProvider,
        status: record.status,
      });
    }

    const response = await verifyInsurance(sanitizedRequest, requestId);

    try {
      await logVerificationAudit({
        action: response.verified ? "verification_completed" : "verification_submitted",
        verificationType: sanitizedRequest.verificationType,
        mode,
        outcome: response.verificationStatus,
        verified: response.verified,
        consentTimestamp,
        memberName: "[redacted]",
        verificationStatus: response.verificationStatus,
        eligibilityStatus: response.eligibilityStatus,
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
