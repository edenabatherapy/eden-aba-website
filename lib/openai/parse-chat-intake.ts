/**
 * Parse structured intake payload from Eden assistant responses.
 *
 * Primary format — paste into OpenAI prompt from:
 *   lib/openai/eden-chat-intake-prompt-rule.txt
 *
 * EDEN_INTAKE_SUBMIT
 * { "parentGuardianName": "...", ... }
 * END_EDEN_INTAKE_SUBMIT
 *
 * Legacy formats also supported:
 * - HTML comment markers with JSON
 * - ```json blocks with "intake_complete": true
 */

export type EdenChatIntakeFields = {
  parentGuardianName: string;
  childName: string;
  childAge: string;
  diagnosisStatus: string;
  state: string;
  city: string;
  serviceType: string;
  goals: string;
  insuranceProvider: string;
  phoneNumber: string;
  emailAddress: string;
  preferredContactMethod: string;
  conversationSummary: string;
};

export type ParsedChatIntake = {
  fields: EdenChatIntakeFields;
  raw: Record<string, unknown>;
  format: "eden_intake_submit" | "html_comment" | "json_fence" | "legacy";
};

const BLOCK_START = "EDEN_INTAKE_SUBMIT";
const BLOCK_END = "END_EDEN_INTAKE_SUBMIT";
const HTML_MARKER_START = "<!-- EDEN_INTAKE_SUBMIT -->";
const HTML_MARKER_END = "<!-- /EDEN_INTAKE_SUBMIT -->";

function str(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map((item) => String(item ?? "").trim()).filter(Boolean).join(", ");
  }
  return String(value ?? "").trim();
}

function pickString(raw: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = str(raw[key]);
    if (value) return value;
  }
  return "";
}

export function normalizeEdenChatIntakeFields(raw: Record<string, unknown>): EdenChatIntakeFields {
  return {
    parentGuardianName: pickString(raw, [
      "parentGuardianName",
      "parent_guardian_name",
      "parentName",
      "guardianName",
    ]),
    childName: pickString(raw, ["childName", "child_name", "childFullName"]),
    childAge: pickString(raw, ["childAge", "child_age", "age"]),
    diagnosisStatus: pickString(raw, [
      "autismDiagnosisStatus",
      "diagnosisStatus",
      "diagnosis_status",
      "primaryDiagnosis",
    ]),
    state: pickString(raw, ["state"]),
    city: pickString(raw, ["city"]),
    serviceType: pickString(raw, [
      "preferredServiceType",
      "serviceType",
      "service_type",
      "preferred_service_type",
    ]),
    goals: pickString(raw, [
      "primaryConcernsOrGoals",
      "goals",
      "primary_concerns_or_goals",
      "concerns",
    ]),
    insuranceProvider: pickString(raw, ["insuranceProvider", "insurance_provider", "insurance"]),
    phoneNumber: pickString(raw, ["phoneNumber", "phone_number", "phone"]),
    emailAddress: pickString(raw, ["emailAddress", "email_address", "email"]),
    preferredContactMethod: pickString(raw, [
      "preferredContactMethod",
      "preferred_contact_method",
      "contactMethod",
    ]),
    conversationSummary: pickString(raw, ["conversationSummary", "conversation_summary", "summary"]),
  };
}

function isLegacyCompleteMarker(raw: Record<string, unknown>): boolean {
  return (
    raw.intake_complete === true ||
    raw.intakeComplete === true ||
    raw.submit_intake === true ||
    raw.action === "submit_intake"
  );
}

function tryParseJson(text: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(text) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    return null;
  }
  return null;
}

function stripBlock(content: string, startIndex: number, endIndex: number, endLength: number): string {
  const before = content.slice(0, startIndex).trim();
  const after = content.slice(endIndex + endLength).trim();
  return [before, after].filter(Boolean).join("\n\n").trim();
}

function extractPlainTextBlock(content: string): {
  raw: Record<string, unknown>;
  startIndex: number;
  endIndex: number;
} | null {
  const startIndex = content.indexOf(BLOCK_START);
  const endIndex = content.indexOf(BLOCK_END);
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    return null;
  }

  const inner = content.slice(startIndex + BLOCK_START.length, endIndex).trim();
  const parsed = tryParseJson(inner);
  if (!parsed) return null;

  return { raw: parsed, startIndex, endIndex };
}

function extractHtmlCommentBlock(content: string): {
  raw: Record<string, unknown>;
  startIndex: number;
  endIndex: number;
  endLength: number;
} | null {
  const startIndex = content.indexOf(HTML_MARKER_START);
  const endIndex = content.indexOf(HTML_MARKER_END);
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    return null;
  }

  const inner = content.slice(startIndex + HTML_MARKER_START.length, endIndex).trim();
  const parsed = tryParseJson(inner);
  if (!parsed) return null;

  return { raw: parsed, startIndex, endIndex, endLength: HTML_MARKER_END.length };
}

function fallbackDisplayContent(content: string): string {
  const trimmed = content.trim();
  if (trimmed) return trimmed;
  return "Thank you — your intake request has been received. The Eden ABA Therapy team will follow up with you soon.";
}

export function parseChatIntakeFromAssistantText(
  content: string,
): { intake: ParsedChatIntake; displayContent: string } | null {
  const plainBlock = extractPlainTextBlock(content);
  if (plainBlock) {
    const fields = normalizeEdenChatIntakeFields(plainBlock.raw);
    const displayContent = stripBlock(
      content,
      plainBlock.startIndex,
      plainBlock.endIndex,
      BLOCK_END.length,
    );

    return {
      intake: { fields, raw: plainBlock.raw, format: "eden_intake_submit" },
      displayContent: fallbackDisplayContent(displayContent),
    };
  }

  const htmlBlock = extractHtmlCommentBlock(content);
  if (htmlBlock && isLegacyCompleteMarker(htmlBlock.raw)) {
    const fields = normalizeEdenChatIntakeFields(htmlBlock.raw);
    const displayContent = stripBlock(
      content,
      htmlBlock.startIndex,
      htmlBlock.endIndex,
      htmlBlock.endLength,
    );

    return {
      intake: { fields, raw: htmlBlock.raw, format: "html_comment" },
      displayContent: fallbackDisplayContent(displayContent),
    };
  }

  const fenced = [...content.matchAll(/```(?:json)?\s*([\s\S]*?)```/gi)];
  for (const match of fenced) {
    const parsed = tryParseJson(match[1]?.trim() || "");
    if (parsed && isLegacyCompleteMarker(parsed)) {
      const fields = normalizeEdenChatIntakeFields(parsed);
      const displayContent = content.replace(/```(?:json)?\s*[\s\S]*?```/gi, "").trim();

      return {
        intake: { fields, raw: parsed, format: "json_fence" },
        displayContent: fallbackDisplayContent(displayContent),
      };
    }
  }

  const braceStart = content.lastIndexOf("{");
  const braceEnd = content.lastIndexOf("}");
  if (braceStart !== -1 && braceEnd > braceStart) {
    const parsed = tryParseJson(content.slice(braceStart, braceEnd + 1));
    if (parsed && isLegacyCompleteMarker(parsed)) {
      const fields = normalizeEdenChatIntakeFields(parsed);
      const displayContent = content
        .replace(/\{[\s\S]*"intake_complete"\s*:\s*true[\s\S]*\}/gi, "")
        .trim();

      return {
        intake: { fields, raw: parsed, format: "legacy" },
        displayContent: fallbackDisplayContent(displayContent),
      };
    }
  }

  return null;
}

export function chatIntakeFieldsToIntakeRecord(
  fields: EdenChatIntakeFields,
  conversationSummary: string,
): Record<string, unknown> {
  return {
    _source: "eden-chat",
    guardianName: fields.parentGuardianName,
    childFullName: fields.childName,
    childAge: fields.childAge,
    primaryDiagnosis: fields.diagnosisStatus,
    state: fields.state,
    city: fields.city,
    serviceRequested: fields.serviceType,
    goalPriorities: fields.goals,
    insuranceProvider: fields.insuranceProvider,
    phone: fields.phoneNumber,
    email: fields.emailAddress,
    contactMethod: fields.preferredContactMethod,
    conversationSummary: conversationSummary || fields.conversationSummary,
    intakeReason: fields.goals,
    chatIntake: true,
  };
}
