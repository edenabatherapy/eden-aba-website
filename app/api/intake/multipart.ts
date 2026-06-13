import { NextResponse } from "next/server";
import { generateConfirmationId } from "@/lib/intake/server/confirmation";
import { assertIntakeBackendReady, getIntakeConfig } from "@/lib/intake/server/config";
import { deliverIntakeSubmission } from "@/lib/intake/server/delivery";
import { INTAKE_FAMILY_SUCCESS_MESSAGE } from "@/lib/intake/server/messages";
import { buildSummaryFromAdvancedIntake } from "@/lib/intake/server/submission-summary";
import { storeIntakeSubmission } from "@/lib/intake/server/storage";
import { validateIntakeSubmission } from "@/lib/intake/server/validate-intake";
import { fileToBuffer, sanitizeFilename, validateUploadedFile } from "@/lib/intake/server/validate-files";
import { recaptchaV2FailureResponse, verifyRecaptchaV2Token } from "@/lib/recaptcha/verify-v2";

export default async function handleMultipartIntake(request: Request) {
  try {
    assertIntakeBackendReady();
  } catch (error) {
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
    } catch {
      return NextResponse.json({ ok: false, message: "Invalid intake JSON payload." }, { status: 400 });
    }

    let documentMeta: Record<string, unknown> = {};
    const metaRaw = formData.get("documentMeta");
    if (typeof metaRaw === "string" && metaRaw.trim()) {
      try {
        documentMeta = JSON.parse(metaRaw);
      } catch {
        return NextResponse.json({ ok: false, message: "Invalid document metadata." }, { status: 400 });
      }
    }

    const validation = validateIntakeSubmission(intake);
    if (validation.ok === false) {
      return NextResponse.json({ ok: false, message: validation.message }, { status: 400 });
    }

    const uploadedFiles: Array<{
      fieldName: string;
      safeName: string;
      mimeType: string;
      buffer: Buffer;
    }> = [];

    let totalBytes = 0;

    for (const [key, value] of formData.entries()) {
      if (key === "intake" || key === "documentMeta") continue;
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

    const stored = await storeIntakeSubmission({
      confirmationId,
      intake,
      documentMeta,
      files: uploadedFiles,
    });

    const summary = buildSummaryFromAdvancedIntake(intake, stored.confirmationId, stored.submittedAt);
    await deliverIntakeSubmission(summary, stored.fileCount);

    return NextResponse.json({
      ok: true,
      confirmationId: stored.confirmationId,
      submittedAt: stored.submittedAt,
      fileCount: stored.fileCount,
      message: INTAKE_FAMILY_SUCCESS_MESSAGE,
    });
  } catch (error) {
    console.error("[intake] submission failed", {
      error: error instanceof Error ? error.message : "unknown",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      {
        ok: false,
        message: "Unable to submit intake at this time. Your local draft is still saved in this browser.",
      },
      { status: 500 },
    );
  }
}
