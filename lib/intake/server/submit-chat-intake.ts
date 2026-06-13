import { generateConfirmationId } from "./confirmation";
import { deliverIntakeSubmission } from "./delivery";
import { INTAKE_FAMILY_SUCCESS_MESSAGE } from "./messages";
import { storeIntakeSubmission } from "./storage";
import { buildSummaryFromEdenChat } from "./submission-summary";
import {
  edenChatIntakeToApiBody,
  validateEdenChatIntake,
} from "./validate-chat-intake";
import type { EdenChatIntakeFields } from "@/lib/openai/parse-chat-intake";
import { chatIntakeFieldsToIntakeRecord } from "@/lib/openai/parse-chat-intake";

export type EdenChatIntakeSubmitResult =
  | {
      ok: true;
      confirmationId: string;
      submittedAt: string;
      message: string;
    }
  | { ok: false; message: string };

export async function submitEdenChatIntake(
  fields: EdenChatIntakeFields,
  options?: {
    conversationSummary?: string;
    openAiResponseId?: string;
    intakeFormat?: string;
  },
): Promise<EdenChatIntakeSubmitResult> {
  const validation = validateEdenChatIntake(fields);
  if (validation.ok === false) {
    return { ok: false, message: validation.message };
  }

  const conversationSummary = options?.conversationSummary?.trim() || fields.conversationSummary;
  const confirmationId = generateConfirmationId();
  const intake = chatIntakeFieldsToIntakeRecord(fields, conversationSummary);

  try {
    const stored = await storeIntakeSubmission({
      confirmationId,
      intake,
      documentMeta: {
        source: "eden-chat",
        openAiResponseId: options?.openAiResponseId || null,
        intakeFormat: options?.intakeFormat || "eden_intake_submit",
        submittedFields: edenChatIntakeToApiBody(fields),
      },
      files: [],
    });

    const summary = buildSummaryFromEdenChat(
      { ...fields, conversationSummary },
      stored.confirmationId,
      stored.submittedAt,
    );

    await deliverIntakeSubmission(summary, 0);

    console.info("[eden-chat-intake] submission saved", {
      confirmationId: stored.confirmationId,
      source: "eden-chat",
    });

    return {
      ok: true,
      confirmationId: stored.confirmationId,
      submittedAt: stored.submittedAt,
      message: INTAKE_FAMILY_SUCCESS_MESSAGE,
    };
  } catch (error) {
    console.error("[eden-chat-intake] submission failed", {
      error: error instanceof Error ? error.message : "unknown",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return {
      ok: false,
      message: "Unable to save intake at this time. Please contact Eden ABA Therapy directly.",
    };
  }
}
