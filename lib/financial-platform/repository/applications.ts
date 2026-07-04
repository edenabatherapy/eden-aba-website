import { createHash } from "crypto";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { AssistanceApplicationInput } from "../schemas";
import { generateTrackingCode } from "./donations";
import { writeAuditLog } from "./dashboard";

function hashValue(value: string): string {
  return createHash("sha256").update(value.toLowerCase().trim()).digest("hex");
}

export async function submitAssistanceApplication(input: AssistanceApplicationInput) {
  const supabase = getSupabaseAdminClient();
  const trackingCode = generateTrackingCode();

  const { data, error } = await supabase
    .from("assistance_applications")
    .insert({
      tracking_code: trackingCode,
      household_size: input.householdSize,
      annual_income_cents: input.annualIncomeCents ?? null,
      insurance_status: input.insuranceStatus?.trim() || null,
      county: input.county.trim(),
      diagnosis: input.diagnosis?.trim() || null,
      child_age: input.childAge ?? null,
      requested_services: input.requestedServices,
      requested_hours: input.requestedHours ?? null,
      emergency_need: input.emergencyNeed,
      applicant_name_encrypted: input.applicantName.trim(),
      applicant_email_hash: hashValue(input.applicantEmail),
      applicant_phone_hash: input.applicantPhone ? hashValue(input.applicantPhone) : null,
      consent_signed_at: new Date().toISOString(),
      signature_data: input.signatureData ?? null,
      application_status: "received",
    })
    .select("id, tracking_code, application_status, created_at")
    .single();

  if (error) throw error;

  await writeAuditLog({
    actor: "public-api",
    action: "application_submitted",
    entityType: "assistance_applications",
    entityId: data?.id as string,
    metadata: { trackingCode, county: input.county, emergencyNeed: input.emergencyNeed },
  });

  return {
    id: data?.id as string,
    trackingCode: data?.tracking_code as string,
    status: data?.application_status as string,
    createdAt: data?.created_at as string,
  };
}

export async function getApplicationByTrackingCode(trackingCode: string) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("assistance_applications")
    .select("tracking_code, application_status, created_at, updated_at, county, emergency_need")
    .eq("tracking_code", trackingCode.trim().toUpperCase())
    .is("deleted_at", null)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    trackingCode: data.tracking_code as string,
    status: data.application_status as string,
    createdAt: data.created_at as string,
    updatedAt: data.updated_at as string,
    county: data.county as string,
    emergencyNeed: Boolean(data.emergency_need),
  };
}
