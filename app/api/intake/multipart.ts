import { NextResponse } from "next/server";
import { generateConfirmationId } from "@/lib/intake/server/confirmation";
import {
  assertIntakeBackendReady,
  getIntakeConfig,
  isVercelDeployment,
  shouldUseLocalIntakeStorage,
} from "@/lib/intake/server/config";
import { deliverIntakeSubmission } from "@/lib/intake/server/delivery";
import { INTAKE_FAMILY_SUCCESS_MESSAGE } from "@/lib/intake/server/messages";
import { buildSummaryFromAdvancedIntake } from "@/lib/intake/server/submission-summary";
import { storeIntakeSubmission } from "@/lib/intake/server/storage";
import { validateIntakeSubmission } from "@/lib/intake/server/validate-intake";
import { fileToBuffer, sanitizeFilename, validateUploadedFile } from "@/lib/intake/server/validate-files";
import { prepareIntakePayload } from "@/lib/intake/legal-global";
import { insertLeadSubmission, isLeadInsertFailure } from "@/lib/supabase/insert-lead";
import { recaptchaV2FailureResponse, verifyRecaptchaV2Token } from "@/lib/recaptcha/verify-v2";

function logIntakeFailure(stage: string, error: unknown, extra: Record<string, unknown> = {}) {
  const err = error instanceof Error ? error : new Error(String(error));
  console.error("[intake] submission failed", {
    stage,
    vercel: isVercelDeployment(),
    error: err.message,
    name: err.name,
    code: (err as NodeJS.ErrnoException).code,
    stack: err.stack,
    ...extra,
  });
}

export default async function handleMultipartIntake(request: Request) {
  try {
    assertIntakeBackendReady();
  } catch (error) {
    logIntakeFailure("backend-config", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Intake backend is not configured. Set INTAKE_ENCRYPTION_KEY in .env.local.",
      },
      { status: 503 },
    );
  }

  const config = getIntakeConfig();

  try {
    const formData = await request.formData();

    const recaptchaToken = formData.get("recaptchaToken");
    const recaptcha = await verifyRecaptchaV2Token(
      typeof recaptchaToken === "string" ? recaptchaToken : null,
    );

    if (recaptcha.ok === false) {
      return recaptchaV2FailureResponse(recaptcha);
    }

    const intakeRaw = formData.get("intake");
    if (typeof intakeRaw !== "string") {
      return NextResponse.json({ ok: false, message: "Missing intake JSON payload." }, { status: 400 });
    }

    let intake: Record<string, unknown>;
    try {
      intake = JSON.parse(intakeRaw);
    } catch (parseError) {
      logIntakeFailure("parse-intake-json", parseError);
      return NextResponse.json({ ok: false, message: "Invalid intake JSON payload." }, { status: 400 });
    }

    intake = prepareIntakePayload(intake);

    const validation = validateIntakeSubmission(intake);
    if (validation.ok === false) {
      console.warn("[intake] validation rejected submission", {
        message: validation.message,
        legalGlobalDate: intake.legalGlobalDate ?? null,
        hasLegalSignature: Boolean(intake.legalGlobalSignature),
      });
      return NextResponse.json({ ok: false, message: validation.message }, { status: 400 });
    }

    let documentMeta: Record<string, unknown> = {};
    const metaRaw = formData.get("documentMeta");
    if (typeof metaRaw === "string" && metaRaw.trim()) {
      try {
        documentMeta = JSON.parse(metaRaw);
      } catch (metaError) {
        logIntakeFailure("parse-document-meta", metaError);
        return NextResponse.json({ ok: false, message: "Invalid document metadata." }, { status: 400 });
      }
    }

    const uploadedFiles: Array<{
      fieldName: string;
      safeName: string;
      mimeType: string;
      buffer: Buffer;
    }> = [];

    let totalBytes = 0;

    for (const [key, value] of formData.entries()) {
      if (key === "intake" || key === "documentMeta" || key === "recaptchaToken") continue;
      if (!(value instanceof File)) continue;

      try {
        validateUploadedFile(key, value, config.maxFileBytes);
        const safeName = sanitizeFilename(value.name);
        const buffer = await fileToBuffer(value);
        totalBytes += buffer.length;
        if (totalBytes > config.maxTotalBytes) {
          return NextResponse.json(
            { ok: false, message: "Total upload size exceeds the allowed limit." },
            { status: 400 },
          );
        }
        uploadedFiles.push({
          fieldName: key,
          safeName,
          mimeType: value.type || "application/octet-stream",
          buffer,
        });
      } catch (fileError) {
        logIntakeFailure("file-upload", fileError, { fieldName: key });
        return NextResponse.json(
          {
            ok: false,
            message: fileError instanceof Error ? fileError.message : "Invalid file upload.",
          },
          { status: 400 },
        );
      }
    }

    const confirmationId = generateConfirmationId();
    const submittedAt = new Date().toISOString();
    let finalConfirmationId = confirmationId;
    let finalSubmittedAt = submittedAt;
    let fileCount = uploadedFiles.length;

    if (shouldUseLocalIntakeStorage()) {
      const stored = await storeIntakeSubmission({
        confirmationId,
        intake,
        documentMeta,
        files: uploadedFiles,
      });
      finalConfirmationId = stored.confirmationId;
      finalSubmittedAt = stored.submittedAt;
      fileCount = stored.fileCount;
    } else {
      console.info("[intake] skipping local filesystem storage", {
        confirmationId,
        vercel: true,
        fileCount: uploadedFiles.length,
        note:
          uploadedFiles.length > 0
            ? "File uploads are not persisted on Vercel without external object storage."
            : undefined,
      });
    }

    const summary = buildSummaryFromAdvancedIntake(intake, finalConfirmationId, finalSubmittedAt);

    const leadResult = await insertLeadSubmission({
      parentName: summary.parentName,
      email: summary.emailAddress,
      phone: summary.phoneNumber,
      state: summary.state,
      childBirthdate: String(intake.dob ?? intake.childAge ?? ""),
      diagnosisStatus: summary.diagnosisStatus,
      message: [`Advanced intake ${finalConfirmationId}`, summary.goals].filter(Boolean).join(" | "),
    });

    if (isLeadInsertFailure(leadResult)) {
      console.error("[intake] Supabase leads insert failed", {
        reason: leadResult.reason,
        message: leadResult.message,
        code: leadResult.code,
        details: leadResult.details,
        hint: leadResult.hint,
        payloadKeys: leadResult.payloadKeys,
        confirmationId: finalConfirmationId,
      });
    }

    const delivery = await deliverIntakeSubmission(summary, fileCount);

    if (isVercelDeployment() && isLeadInsertFailure(leadResult) && !delivery.allSucceeded) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Unable to submit intake at this time. Your local draft is still saved in this browser.",
        },
        { status: 500 },
      );
    }

    console.info("[intake] submission accepted", {
      confirmationId: finalConfirmationId,
      vercel: isVercelDeployment(),
      localStorage: shouldUseLocalIntakeStorage(),
      supabase: leadResult.ok,
      deliverySheets: delivery.sheets.ok,
      deliveryEmail: delivery.email.ok,
      fileCount,
    });

    return NextResponse.json({
      ok: true,
      confirmationId: finalConfirmationId,
      submittedAt: finalSubmittedAt,
      fileCount,
      message: INTAKE_FAMILY_SUCCESS_MESSAGE,
    });
  } catch (error) {
    logIntakeFailure("multipart-handler", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Unable to submit intake at this time. Your local draft is still saved in this browser.",
      },
      { status: 500 },
    );
  }
}
