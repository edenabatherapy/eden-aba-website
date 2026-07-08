import { getSupabaseAdminClient } from "@/lib/supabase/server";

export type NewsletterSubscriberFields = {
  fullName: string;
  email: string;
  source: string;
};

export type NewsletterInsertFailure = {
  ok: false;
  reason: "missing-config" | "insert-failed" | "duplicate-email";
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
  payloadKeys?: string[];
};

export type NewsletterInsertResult = { ok: true; id?: string } | NewsletterInsertFailure;

export function isNewsletterInsertFailure(
  result: NewsletterInsertResult,
): result is NewsletterInsertFailure {
  return result.ok === false;
}

export async function insertNewsletterSubscriber(
  submission: NewsletterSubscriberFields,
): Promise<NewsletterInsertResult> {
  const insertPayload = {
    full_name: submission.fullName,
    email: submission.email.toLowerCase(),
    source: submission.source,
  };

  const payloadKeys = Object.keys(insertPayload);

  let supabase;
  try {
    supabase = getSupabaseAdminClient();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Supabase newsletter_subscribers insert failed]", {
      message,
      code: "missing-config",
    });

    return {
      ok: false,
      reason: "missing-config",
      message,
      payloadKeys,
    };
  }

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert(insertPayload)
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      return {
        ok: false,
        reason: "duplicate-email",
        message: "This email is already subscribed to our family newsletter.",
        code: error.code,
        details: error.details,
        hint: error.hint,
        payloadKeys,
      };
    }

    console.error("[Supabase newsletter_subscribers insert failed]", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });

    return {
      ok: false,
      reason: "insert-failed",
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      payloadKeys,
    };
  }

  return { ok: true, id: data?.id ? String(data.id) : undefined };
}
