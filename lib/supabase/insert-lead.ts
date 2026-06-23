import { getSupabaseServerClient } from "@/lib/supabase/server";

export type LeadSubmissionFields = {
  parentName: string;
  email: string;
  phone: string;
  state?: string;
  childBirthdate?: string;
  diagnosisStatus?: string;
  message?: string;
};

export async function insertLeadSubmission(
  submission: LeadSubmissionFields,
): Promise<{ ok: true } | { ok: false }> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return { ok: false };
  }

  const { error } = await supabase.from("leads").insert({
    parent_name: submission.parentName,
    email: submission.email,
    phone: submission.phone,
    city: submission.state ?? "",
    child_age: submission.childBirthdate ?? "",
    service_interest: submission.diagnosisStatus ?? "",
    message: submission.message ?? "",
  });

  if (error) {
    return { ok: false };
  }

  return { ok: true };
}
