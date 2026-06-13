import {
  getEdenChatPromptId,
  getMissingOpenAiKeyMessage,
  getOpenAiApiKey,
} from "@/lib/openai/env";
import {
  buildAugmentedChatInput,
  getKnowledgeRetrievalSummary,
  retrieveKnowledgeForQuery,
} from "@/lib/knowledge";

const RESPONSES_URL = "https://api.openai.com/v1/responses";

type OpenAiErrorPayload = {
  message?: string;
  type?: string;
  code?: string;
  param?: string | null;
};

type OpenAiOutputBlock = {
  type?: string;
  text?: string;
  content?: Array<{ type?: string; text?: string }>;
};

type OpenAiResponsesPayload = {
  id?: string;
  output_text?: string;
  output?: OpenAiOutputBlock[];
  error?: OpenAiErrorPayload;
};

export type EdenChatResult =
  | { ok: true; content: string; responseId: string }
  | {
      ok: false;
      status: number;
      message: string;
      error: string;
      detail: string;
      openAiStatus?: number;
      openAiType?: string;
      openAiCode?: string;
      openAiParam?: string | null;
      stack?: string;
    };

function isDevelopment() {
  return process.env.NODE_ENV === "development";
}

function extractResponseText(payload: OpenAiResponsesPayload): string {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const chunks: string[] = [];

  for (const item of payload.output ?? []) {
    if (item.type === "message" && Array.isArray(item.content)) {
      for (const part of item.content) {
        if (part.type === "output_text" && part.text?.trim()) {
          chunks.push(part.text.trim());
        }
      }
    }

    if (item.type === "output_text" && item.text?.trim()) {
      chunks.push(item.text.trim());
    }
  }

  return chunks.join("\n\n").trim();
}

function buildFailureResult(
  status: number,
  message: string,
  error: string,
  detail: string,
  extra: Partial<Extract<EdenChatResult, { ok: false }>> = {},
): Extract<EdenChatResult, { ok: false }> {
  return {
    ok: false,
    status,
    message,
    error,
    detail,
    ...extra,
  };
}

function logOpenAiFailure(
  context: string,
  payload: {
    status?: number;
    detail: string;
    openAiStatus?: number;
    openAiType?: string;
    openAiCode?: string;
    openAiParam?: string | null;
    stack?: string;
    requestBody?: Record<string, unknown>;
  },
) {
  console.error(`[eden-chat] ${context}`, {
    status: payload.status,
    detail: payload.detail,
    openAiStatus: payload.openAiStatus,
    openAiType: payload.openAiType,
    openAiCode: payload.openAiCode,
    openAiParam: payload.openAiParam,
    stack: payload.stack,
    requestBody: payload.requestBody,
  });
}

async function callOpenAiResponses(body: Record<string, unknown>, apiKey: string) {
  const response = await fetch(RESPONSES_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const payload = (await response.json()) as OpenAiResponsesPayload;

  return { response, payload };
}

export async function createEdenChatResponse(
  message: string,
  previousResponseId?: string | null,
): Promise<EdenChatResult> {
  const apiKey = getOpenAiApiKey();
  if (!apiKey) {
    const detail = getMissingOpenAiKeyMessage();
    logOpenAiFailure("missing_api_key", { detail });
    return buildFailureResult(
      503,
      "The Eden assistant is temporarily unavailable. Please contact Eden ABA Therapy directly for help.",
      "missing_api_key",
      detail,
    );
  }

  const promptId = getEdenChatPromptId();

  const retrievedArticles = retrieveKnowledgeForQuery(message);
  const augmentedInput = buildAugmentedChatInput(message, retrievedArticles);

  if (isDevelopment()) {
    console.info("[eden-chat] knowledge retrieval", getKnowledgeRetrievalSummary(message, retrievedArticles));
  }

  const requestBody: Record<string, unknown> = {
    prompt: { id: promptId },
    input: augmentedInput,
    store: true,
  };

  if (previousResponseId) {
    requestBody.previous_response_id = previousResponseId;
  }

  try {
    let { response, payload } = await callOpenAiResponses(requestBody, apiKey);

    if (
      !response.ok &&
      response.status === 400 &&
      payload.error?.param === "prompt.id" &&
      payload.error?.code === "unknown_parameter"
    ) {
      const fallbackBody = {
        ...requestBody,
        prompt: { prompt_id: promptId },
      };
      ({ response, payload } = await callOpenAiResponses(fallbackBody, apiKey));
    }

    if (!response.ok) {
      const detail =
        payload.error?.message ||
        `OpenAI Responses API returned HTTP ${response.status} without an error message.`;

      logOpenAiFailure("openai_request_failed", {
        status: response.status,
        detail,
        openAiStatus: response.status,
        openAiType: payload.error?.type,
        openAiCode: payload.error?.code,
        openAiParam: payload.error?.param ?? null,
        requestBody: {
          prompt: requestBody.prompt,
          inputLength: message.length,
          hasPreviousResponseId: Boolean(previousResponseId),
        },
      });

      return buildFailureResult(
        response.status >= 500 ? 503 : 502,
        isDevelopment()
          ? detail
          : response.status === 401 || response.status === 403
            ? "The Eden assistant is not configured correctly. Please contact Eden ABA Therapy for help."
            : "The Eden assistant could not respond right now. Please try again in a moment.",
        "openai_request_failed",
        detail,
        {
          openAiStatus: response.status,
          openAiType: payload.error?.type,
          openAiCode: payload.error?.code,
          openAiParam: payload.error?.param ?? null,
        },
      );
    }

    const content = extractResponseText(payload);
    const responseId = payload.id?.trim() || "";

    if (!content) {
      const detail = "OpenAI returned a successful response with no assistant text.";
      logOpenAiFailure("empty_response", {
        detail,
        requestBody: { prompt: requestBody.prompt, responseId: payload.id },
      });
      return buildFailureResult(
        502,
        isDevelopment() ? detail : "The Eden assistant returned an empty response. Please try again.",
        "empty_response",
        detail,
      );
    }

    if (!responseId) {
      const detail = "OpenAI returned assistant text but no response ID for follow-up turns.";
      logOpenAiFailure("missing_response_id", { detail });
      return buildFailureResult(
        502,
        isDevelopment() ? detail : "The Eden assistant response was incomplete. Please try again.",
        "missing_response_id",
        detail,
      );
    }

    return { ok: true, content, responseId };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown network error";
    const stack = error instanceof Error ? error.stack : undefined;

    logOpenAiFailure("request_exception", {
      detail,
      stack,
      requestBody: {
        prompt: requestBody.prompt,
        inputLength: message.length,
        hasPreviousResponseId: Boolean(previousResponseId),
      },
    });

    return buildFailureResult(
      503,
      isDevelopment() ? detail : "The Eden assistant is temporarily unavailable. Please try again later.",
      "request_exception",
      detail,
      { stack },
    );
  }
}
