const DEFAULT_EDEN_PROMPT_ID = "pmpt_6a2ab01ec1908197b18a5fab8fab0cd700b0eed15d55e43d";

export function getOpenAiApiKey() {
  return process.env.OPENAI_API_KEY?.trim() || "";
}

export function getEdenChatPromptId() {
  return process.env.OPENAI_EDEN_PROMPT_ID?.trim() || DEFAULT_EDEN_PROMPT_ID;
}

export function isOpenAiConfigured() {
  return Boolean(getOpenAiApiKey());
}

export function getOpenAiConfigStatus() {
  const apiKey = getOpenAiApiKey();
  const promptId = getEdenChatPromptId();

  return {
    apiKeyConfigured: Boolean(apiKey),
    promptId,
    usingDefaultPromptId: !process.env.OPENAI_EDEN_PROMPT_ID?.trim(),
  };
}

export function getMissingOpenAiKeyMessage() {
  return "OPENAI_API_KEY is not set in .env.local. Add your server-side OpenAI API key and restart the dev server.";
}
