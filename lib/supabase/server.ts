import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseAuthOptions = {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
} as const;

function assertSupabaseServiceRoleEnv(): { url: string; serviceRoleKey: string } {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!url) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  return {
    url,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY.trim(),
  };
}

let adminClient: SupabaseClient | null = null;

/**
 * Dedicated server-side Supabase client for privileged writes.
 * Uses NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY only (bypasses RLS).
 */
export function getSupabaseAdminClient(): SupabaseClient {
  if (!adminClient) {
    const { url, serviceRoleKey } = assertSupabaseServiceRoleEnv();
    adminClient = createClient(url, serviceRoleKey, supabaseAuthOptions);
  }

  return adminClient;
}

export { assertSupabaseServiceRoleEnv };
