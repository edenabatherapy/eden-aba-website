-- Eden ABA Therapy — public insurance verification form submissions
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)
-- Or: DATABASE_URL=... node scripts/apply-insurance-verification-migration.mjs

create table if not exists public.insurance_verification_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  applicant_type text,
  parent_first_name text,
  parent_last_name text,
  email text,
  phone text,
  child_name text,
  child_dob text,
  zip_code text,
  insurance_provider text,
  member_id text,
  ssn text,
  consent boolean,
  recaptcha_verified boolean,
  status text default 'new'
);

create index if not exists insurance_verification_requests_created_at_idx
  on public.insurance_verification_requests (created_at desc);

create index if not exists insurance_verification_requests_status_idx
  on public.insurance_verification_requests (status);

-- Service role inserts from POST /api/insurance/verify (bypasses RLS).
grant select, insert, update, delete on public.insurance_verification_requests to service_role;

alter table public.insurance_verification_requests enable row level security;

-- No public policies: inserts use SUPABASE_SERVICE_ROLE_KEY from API routes only.
