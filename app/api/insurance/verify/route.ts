import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { formatDOBForDisplay } from "@/lib/insurance/dates";
import { logVerificationAudit } from "@/lib/insurance/auditLog";
import { createVerificationRecord } from "@/lib/insurance/db/repository";
import { encryptPhiField } from "@/lib/insurance/encryptField";
import { validateAndNormalizeInsuranceVerificationRequest } from "@/lib/insurance/normalize-verification-request";
import { notifyNewVerificationRequest } from "@/lib/insurance/notifications";
import { MANUAL_PENDING_NOTES } from "@/lib/insurance/providers/ManualVerificationProvider";
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
import type { InsuranceVerificationRequest, InsuranceVerificationResponse } from "@/types/insurance";

const PUBLIC_ERRORS = {
  recaptcha: "Please complete the reCAPTCHA verification.",
  validation: "Invalid or missing required form information.",
  save: "Unable to save your insurance verification request. Please try again later.",
  process: "Unable to process verification request at this time.",
} as const;

function logInsuranceVerifyFailure(branch: string, meta: Record<string, unknown>) {
  console.error(`[api/insurance/verify] ${branch}`, meta);
}

function logInsurancePostInsertError(error: unknown) {
  console.error("Insurance verification post-insert error:", technicalError(error));
}

function technicalError(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    const errno = error as NodeJS.ErrnoException;
    return {
      message: error.message,
      name: error.name,
      code: errno.code,
    };
  }
  return { message: String(error) };
}

function buildPendingVerificationResponse(
  request: InsuranceVerificationRequest,
  requestId: string,
): InsuranceVerificationResponse {
  return {
    success: true,
    verified: false,
    verificationStatus: "Pending Staff Review",
    memberName: request.fullName,
    dateOfBirth: formatDOBForDisplay(request.dateOfBirth),
    eligibilityStatus: "Pending Staff Review",
    notes: MANUAL_PENDING_NOTES,
    verificationMode: getVerificationMode(),
    liveVerificationAvailable: isLiveVerificationEnabled(),
    requestId,
  };
}

async function runPostInsertSteps(params: {
  request: InsuranceVerificationRequest;
  consentTimestamp: string;
  normalizedDob: string;
  requestId: string;
  mode: ReturnType<typeof getVerificationMode>;
}): Promise<InsuranceVerificationResponse> {
  const { request, consentTimestamp, normalizedDob, requestId, mode } = params;

  try {
    const { stored, record } = await createVerificationRecord({
      request,
      consentTimestamp,
      normalizedDob,
      id: requestId,
    });

    if (stored && record) {
      try {
        await storeVerificationRequest({
          request,
          consentTimestamp,
          normalizedDob,
          queueRecord: record,
        });
      } catch (storageError) {
        logInsurancePostInsertError(storageError);
      }
    }
  } catch (queueError) {
    logInsurancePostInsertError(queueError);
  }

  try {
    await notifyNewVerificationRequest({
      requestId,
      submittedAt: consentTimestamp,
      verificationType: request.verificationType,
      insuranceProvider: request.insuranceProvider,
      status: "Pending Staff Review",
    });
  } catch (notificationError) {
    logInsurancePostInsertError(notificationError);
  }

  let verificationResponse: InsuranceVerificationResponse;
  try {
    verificationResponse = await verifyInsurance(request, requestId);
  } catch (verificationError) {
    logInsurancePostInsertError(verificationError);
    verificationResponse = buildPendingVerificationResponse(request, requestId);
  }

  try {
    await logVerificationAudit({
      action: verificationResponse.verified ? "verification_completed" : "verification_submitted",
      verificationType: request.verificationType,
      mode,
      outcome: verificationResponse.verificationStatus,
      verified: verificationResponse.verified,
      consentTimestamp,
      memberName: "[redacted]",
      verificationStatus: verificationResponse.verificationStatus,
      eligibilityStatus: verificationResponse.eligibilityStatus,
      requestId,
      timestamp: new Date().toISOString(),
    });
  } catch (auditError) {
    logInsurancePostInsertError(auditError);
  }

  return verificationResponse;
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
    } catch (parseError) {
      logInsuranceVerifyFailure("request-body-parse", technicalError(parseError));
      return NextResponse.json({ error: PUBLIC_ERRORS.validation }, { status: 400 });
    }

    const recaptcha = await verifyRecaptchaV2Token(body.recaptchaToken ?? null);
    if (recaptcha.ok === false) {
      logInsuranceVerifyFailure("recaptcha-verification", {
        reason: recaptcha.reason,
        status: recaptcha.status,
      });
      if (
        recaptcha.reason === "missing-token" ||
        recaptcha.reason === "expired" ||
        recaptcha.reason === "invalid-token"
      ) {
        return NextResponse.json({ error: PUBLIC_ERRORS.recaptcha }, { status: recaptcha.status });
      }
      return recaptchaV2FailureResponse(recaptcha);
    }

    const normalized = validateAndNormalizeInsuranceVerificationRequest(body);
    if (normalized.ok === false) {
      logInsuranceVerifyFailure("validation", {
        error: normalized.error,
        status: normalized.status,
      });
      return NextResponse.json({ error: PUBLIC_ERRORS.validation }, { status: normalized.status });
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
        logInsuranceVerifyFailure("supabase-insert", {
          reason: "missing-config",
          message: supabaseResult.message,
        });
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
          error: PUBLIC_ERRORS.save,
          details:
            process.env.NODE_ENV === "development" ? supabaseResult.message : undefined,
        },
        { status: 500 },
      );
    }

    const savedRequestId = supabaseResult.id;

    const verificationResponse = await runPostInsertSteps({
      request: sanitizedRequest,
      consentTimestamp,
      normalizedDob,
      requestId: savedRequestId,
      mode,
    });

    return NextResponse.json(
      {
        success: true,
        requestId: savedRequestId,
        ...verificationResponse,
      },
      { status: 200 },
    );
  } catch (error) {
    logInsuranceVerifyFailure("unhandled", technicalError(error));

    try {
      await logVerificationAudit({
        action: "verification_failed",
        verificationType: "unknown",
        mode,
        outcome: "error",
        verified: false,
        consentTimestamp,
        memberName: "[redacted]",
        error: error instanceof Error ? error.message : "unknown",
        timestamp: new Date().toISOString(),
      });
    } catch {
      /* ignore audit failures */
    }

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : PUBLIC_ERRORS.process,
      },
      { status: 500 },
    );
  }
}
