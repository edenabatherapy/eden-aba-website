import { NextResponse } from "next/server";
import { parseChatIntakeFromAssistantText } from "@/lib/openai/parse-chat-intake";
import { createEdenChatResponse } from "@/lib/openai/eden-chat";
import {
  getMissingOpenAiKeyMessage,
  getOpenAiConfigStatus,
  isOpenAiConfigured,
} from "@/lib/openai/env";
import { assertIntakeBackendReady } from "@/lib/intake/server/config";
import { submitEdenChatIntake } from "@/lib/intake/server/submit-chat-intake";

export const dynamic = "force-dynamic";

type EdenChatRequestBody = {
  message?: unknown;
  previousResponseId?: unknown;
};

/**
 * Operator-facing hints for configuration failures. These never contain
 * secrets (no key values, no stack traces) so they are safe to surface in
 * production responses. They make the root cause visible in DevTools/Network
 * instead of hiding it behind a generic "temporarily unavailable" message.
 */
const ERROR_REASONS: Record<string, string> = {
  missing_api_key:
    "Server is missing the OPENAI_API_KEY environment variable. Set OPENAI_API_KEY in the deployment environment (e.g. Vercel → Project Settings → Environment Variables, scope: Production) and redeploy. This is a server configuration issue, not a code bug.",
  openai_request_failed:
    "OpenAI rejected the request. A 401/403 usually means an invalid or expired OPENAI_API_KEY; a 404 on prompt.id means OPENAI_EDEN_PROMPT_ID is wrong for this OpenAI account.",
};

function buildErrorResponse(
  status: number,
  message: string,
  error: string,
  detail: string,
  extra: Record<string, unknown> = {},
) {
  const includeDebug = process.env.NODE_ENV === "development";

  const body: Record<string, unknown> = {
    ok: false,
    message,
    // Always expose a stable, machine-readable code so the failing reason is
    // visible in the Network tab in every environment. This does NOT leak the
    // API key or any secret value.
    error,
  };

  if (ERROR_REASONS[error]) {
    body.reason = ERROR_REASONS[error];
  }

  if (includeDebug) {
    body.detail = detail;
    body.config = getOpenAiConfigStatus();
    Object.assign(body, extra);
  }

  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  if (!isOpenAiConfigured()) {
    const detail = getMissingOpenAiKeyMessage();
    console.error("[eden-chat] route blocked:", detail, {
      config: getOpenAiConfigStatus(),
    });

    return buildErrorResponse(
      503,
      "The Eden assistant is temporarily unavailable. Please contact Eden ABA Therapy directly for help.",
      "missing_api_key",
      detail,
    );
  }

  let body: EdenChatRequestBody;

  try {
    body = await request.json();
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Invalid JSON body";
    console.error("[eden-chat] invalid request body", {
      detail,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return buildErrorResponse(400, "Invalid request body.", "invalid_request_body", detail);
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return buildErrorResponse(
      400,
      "Please enter a message.",
      "missing_message",
      "Request body.message is empty.",
    );
  }

  if (message.length > 2000) {
    return buildErrorResponse(
      400,
      "Message is too long.",
      "message_too_long",
      "Request body.message exceeds 2000 characters.",
    );
  }

  const previousResponseId =
    typeof body.previousResponseId === "string" && body.previousResponseId.trim()
      ? body.previousResponseId.trim()
      : null;

  const result = await createEdenChatResponse(message, previousResponseId);

  if (result.ok === false) {
    return buildErrorResponse(result.status, result.message, result.error, result.detail, {
      openAiStatus: result.openAiStatus,
      openAiType: result.openAiType,
      openAiCode: result.openAiCode,
      openAiParam: result.openAiParam,
      stack: result.stack,
    });
  }

  const parsedIntake = parseChatIntakeFromAssistantText(result.content);

  if (!parsedIntake) {
    return NextResponse.json({
      ok: true,
      content: result.content,
      responseId: result.responseId,
    });
  }

  try {
    assertIntakeBackendReady();
  } catch (error) {
    console.error("[eden-chat-intake] backend not configured", {
      error: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json({
      ok: true,
      content:
        "Thank you for sharing your information. Our intake system is being configured — please call Eden ABA Therapy so we can complete your intake.",
      responseId: result.responseId,
      intakeSubmitFailed: true,
    });
  }

  const submitResult = await submitEdenChatIntake(parsedIntake.intake.fields, {
    conversationSummary: parsedIntake.intake.fields.conversationSummary,
    openAiResponseId: result.responseId,
    intakeFormat: parsedIntake.intake.format,
  });

  if (submitResult.ok === false) {
    console.error("[eden-chat-intake] submit failed after parse", {
      message: submitResult.message,
      responseId: result.responseId,
    });
    return NextResponse.json({
      ok: true,
      content: `${parsedIntake.displayContent}\n\nWe had trouble saving your intake automatically. Please call Eden ABA Therapy or use the intake form on our website.`,
      responseId: result.responseId,
      intakeSubmitFailed: true,
    });
  }

  const confirmationNote = `\n\nYour confirmation ID is **${submitResult.confirmationId}**. Our intake team will contact you soon.`;
  const displayContent = `${parsedIntake.displayContent}${confirmationNote}`;

  return NextResponse.json({
    ok: true,
    content: displayContent,
    responseId: result.responseId,
    intakeSubmitted: true,
    confirmationId: submitResult.confirmationId,
    submittedAt: submitResult.submittedAt,
    message: submitResult.message,
  });
}
