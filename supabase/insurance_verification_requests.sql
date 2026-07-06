-- Eden ABA Therapy — public insurance verification form submissions
-- Run in Supabase SQL Editor (after enabling pgcrypto if needed).

create table if not exists public.insurance_verification_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  applicant_type text not null,
  parent_first_name text,
  parent_last_name text,
  email text not null,
  phone text not null,
  child_name text not null,
  child_dob text not null,
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

alter table public.insurance_verification_requests enable row level security;

-- No public policies: inserts use service role from API routes only.
