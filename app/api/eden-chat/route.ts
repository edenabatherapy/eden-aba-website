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

function buildErrorResponse(
  status: number,
  message: string,
  error: string,
  detail: string,
  extra: Record<string, unknown> = {},
) {
  const includeDebug = process.env.NODE_ENV === "development";

  return NextResponse.json(
    {
      ok: false,
      message,
      ...(includeDebug
        ? {
            error,
            detail,
            config: getOpenAiConfigStatus(),
            ...extra,
          }
        : {}),
    },
    { status },
  );
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
