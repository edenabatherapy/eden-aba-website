-- Eden ABA Therapy — public insurance verification form submissions
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)
-- Or: SUPABASE_DB_PASSWORD=... node scripts/apply-insurance-verification-migration.mjs

create table if not exists public.insurance_verification_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  applicant_type text,
  parent_first_name text not null,
  parent_last_name text not null,
  email text not null,
  phone text not null,
  child_name text not null,
  child_dob date,
  zip_code text not null,
  insurance_provider text not null,
  member_id text,
  ssn text,
  consent boolean not null default false,
  recaptcha_verified boolean not null default false,
  status text not null default 'new'
);

create index if not exists insurance_verification_requests_created_at_idx
  on public.insurance_verification_requests (created_at desc);

create index if not exists insurance_verification_requests_status_idx
  on public.insurance_verification_requests (status);

-- Service role inserts from POST /api/insurance/verify (bypasses RLS).
grant select, insert, update, delete on public.insurance_verification_requests to service_role;

alter table public.insurance_verification_requests enable row level security;

-- No public policies: inserts use SUPABASE_SERVICE_ROLE_KEY from API routes only.
