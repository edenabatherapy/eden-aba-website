-- Eden ABA Therapy — Financial Assistance Enterprise Platform (Stage 2)
-- Run after autism_care_fund.sql or standalone in Supabase SQL Editor.

-- ---------------------------------------------------------------------------
-- Shared trigger: updated_at
-- ---------------------------------------------------------------------------
create or replace function public.fp_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- donation_campaigns
-- ---------------------------------------------------------------------------
create table if not exists public.donation_campaigns (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  goal_amount_cents bigint not null default 0,
  monthly_goal_cents bigint not null default 0,
  annual_goal_cents bigint not null default 0,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'active' check (status in ('draft', 'active', 'paused', 'completed', 'archived')),
  deleted_at timestamptz
);

create trigger donation_campaigns_updated_at
  before update on public.donation_campaigns
  for each row execute function public.fp_set_updated_at();

-- ---------------------------------------------------------------------------
-- donors
-- ---------------------------------------------------------------------------
create table if not exists public.donors (
  id uuid primary key default gen_random_uuid(),
  display_name text,
  email_encrypted text,
  email_hash text,
  phone_hash text,
  is_anonymous boolean not null default true,
  is_returning boolean not null default false,
  employer_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'active',
  deleted_at timestamptz
);

create trigger donors_updated_at
  before update on public.donors
  for each row execute function public.fp_set_updated_at();

-- ---------------------------------------------------------------------------
-- donations
-- ---------------------------------------------------------------------------
create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.donation_campaigns (id) on delete restrict,
  donor_id uuid references public.donors (id) on delete set null,
  amount_cents bigint not null check (amount_cents > 0),
  currency text not null default 'usd',
  donation_type text not null default 'one_time' check (donation_type in (
    'one_time', 'monthly', 'corporate_sponsorship', 'foundation_sponsorship',
    'employer_matching', 'memorial', 'anonymous', 'dedicated_child_sponsorship',
    'dedicated_therapy_sponsorship', 'general_autism_fund'
  )),
  recurrence_interval text check (recurrence_interval in ('monthly', 'yearly') or recurrence_interval is null),
  allocation_status text not null default 'pending' check (allocation_status in ('pending', 'reserved', 'distributed')),
  impact_category text,
  payment_provider text,
  payment_intent_id text,
  message text,
  is_anonymous boolean not null default true,
  memorial_honoree text,
  sponsored_child_ref text,
  completed_at timestamptz,
  approved_at timestamptz,
  approved_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed', 'refunded', 'cancelled')),
  deleted_at timestamptz
);

create trigger donations_updated_at
  before update on public.donations
  for each row execute function public.fp_set_updated_at();

create index if not exists donations_campaign_status_idx on public.donations (campaign_id, status);
create index if not exists donations_allocation_status_idx on public.donations (allocation_status);
create index if not exists donations_completed_at_idx on public.donations (completed_at desc nulls last);

-- ---------------------------------------------------------------------------
-- transactions (payment ledger)
-- ---------------------------------------------------------------------------
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid references public.donations (id) on delete set null,
  provider text not null,
  provider_transaction_id text,
  amount_cents bigint not null,
  currency text not null default 'usd',
  transaction_type text not null default 'charge' check (transaction_type in ('charge', 'refund', 'transfer', 'fee')),
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed', 'reversed')),
  deleted_at timestamptz
);

create trigger transactions_updated_at
  before update on public.transactions
  for each row execute function public.fp_set_updated_at();

-- ---------------------------------------------------------------------------
-- fund_allocations
-- ---------------------------------------------------------------------------
create table if not exists public.fund_allocations (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.donation_campaigns (id) on delete restrict,
  application_id uuid,
  donation_id uuid references public.donations (id) on delete set null,
  category text not null check (category in (
    'therapy_subsidy', 'assessment_support', 'family_emergency', 'operating',
    'transportation', 'equipment', 'parent_training', 'other'
  )),
  amount_cents bigint not null check (amount_cents >= 0),
  allocation_status text not null default 'pending' check (allocation_status in ('pending', 'reserved', 'distributed')),
  period_label text not null,
  description text,
  county text,
  program_slug text,
  approved_by text,
  approved_at timestamptz,
  distributed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'active',
  deleted_at timestamptz
);

create trigger fund_allocations_updated_at
  before update on public.fund_allocations
  for each row execute function public.fp_set_updated_at();

-- ---------------------------------------------------------------------------
-- families_supported
-- ---------------------------------------------------------------------------
create table if not exists public.families_supported (
  id uuid primary key default gen_random_uuid(),
  application_id uuid,
  campaign_id uuid references public.donation_campaigns (id) on delete set null,
  household_size integer,
  county text,
  child_age integer,
  diagnosis text,
  services_received text[],
  hours_funded numeric(10, 2) default 0,
  funded_amount_cents bigint default 0,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'active' check (status in ('active', 'waitlist', 'completed', 'withdrawn')),
  deleted_at timestamptz
);

create trigger families_supported_updated_at
  before update on public.families_supported
  for each row execute function public.fp_set_updated_at();

-- ---------------------------------------------------------------------------
-- therapy_sponsorships
-- ---------------------------------------------------------------------------
create table if not exists public.therapy_sponsorships (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid references public.donations (id) on delete set null,
  family_id uuid references public.families_supported (id) on delete set null,
  hours_sponsored numeric(10, 2) not null default 0,
  amount_cents bigint not null default 0,
  sponsor_display_name text,
  is_anonymous boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'active', 'completed', 'cancelled')),
  deleted_at timestamptz
);

create trigger therapy_sponsorships_updated_at
  before update on public.therapy_sponsorships
  for each row execute function public.fp_set_updated_at();

-- ---------------------------------------------------------------------------
-- assistance_applications (family intake)
-- ---------------------------------------------------------------------------
create table if not exists public.assistance_applications (
  id uuid primary key default gen_random_uuid(),
  tracking_code text not null unique,
  household_size integer not null,
  annual_income_cents bigint,
  insurance_status text,
  county text not null,
  diagnosis text,
  child_age integer,
  requested_services text[] not null default '{}',
  requested_hours numeric(10, 2),
  emergency_need boolean not null default false,
  applicant_name_encrypted text,
  applicant_email_hash text,
  applicant_phone_hash text,
  consent_signed_at timestamptz,
  signature_data text,
  application_status text not null default 'received' check (application_status in (
    'received', 'under_review', 'documentation_requested', 'approved',
    'waitlist', 'funded', 'completed', 'denied'
  )),
  review_notes text,
  reviewed_by text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'active',
  deleted_at timestamptz
);

create trigger assistance_applications_updated_at
  before update on public.assistance_applications
  for each row execute function public.fp_set_updated_at();

create index if not exists assistance_applications_tracking_idx on public.assistance_applications (tracking_code);
create index if not exists assistance_applications_status_idx on public.assistance_applications (application_status);

-- ---------------------------------------------------------------------------
-- documents
-- ---------------------------------------------------------------------------
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  file_name text not null,
  storage_path text not null,
  mime_type text,
  uploaded_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'active',
  deleted_at timestamptz
);

create trigger documents_updated_at
  before update on public.documents
  for each row execute function public.fp_set_updated_at();

-- ---------------------------------------------------------------------------
-- monthly_reports / annual_reports
-- ---------------------------------------------------------------------------
create table if not exists public.monthly_reports (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.donation_campaigns (id) on delete restrict,
  month date not null,
  raised_cents bigint not null default 0,
  allocated_cents bigint not null default 0,
  disbursed_cents bigint not null default 0,
  families_served integer not null default 0,
  therapy_hours_funded numeric(10, 2) default 0,
  pending_requests integer default 0,
  narrative text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  deleted_at timestamptz,
  unique (campaign_id, month)
);

create trigger monthly_reports_updated_at
  before update on public.monthly_reports
  for each row execute function public.fp_set_updated_at();

create table if not exists public.annual_reports (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.donation_campaigns (id) on delete restrict,
  year integer not null,
  raised_cents bigint not null default 0,
  allocated_cents bigint not null default 0,
  disbursed_cents bigint not null default 0,
  families_served integer not null default 0,
  therapy_hours_funded numeric(10, 2) default 0,
  donor_count integer default 0,
  narrative text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  deleted_at timestamptz,
  unique (campaign_id, year)
);

create trigger annual_reports_updated_at
  before update on public.annual_reports
  for each row execute function public.fp_set_updated_at();

-- ---------------------------------------------------------------------------
-- impact_metrics (cached aggregates, refreshed by cron/admin)
-- ---------------------------------------------------------------------------
create table if not exists public.impact_metrics (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references public.donation_campaigns (id) on delete cascade,
  metric_key text not null,
  metric_value numeric(20, 4) not null default 0,
  metric_label text,
  period_start date,
  period_end date,
  computed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'active',
  deleted_at timestamptz,
  unique (campaign_id, metric_key, period_start, period_end)
);

create trigger impact_metrics_updated_at
  before update on public.impact_metrics
  for each row execute function public.fp_set_updated_at();

-- ---------------------------------------------------------------------------
-- audit_logs
-- ---------------------------------------------------------------------------
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor text,
  actor_role text,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  ip_address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'active',
  deleted_at timestamptz
);

create trigger audit_logs_updated_at
  before update on public.audit_logs
  for each row execute function public.fp_set_updated_at();

create index if not exists audit_logs_entity_idx on public.audit_logs (entity_type, entity_id);
create index if not exists audit_logs_created_at_idx on public.audit_logs (created_at desc);

-- ---------------------------------------------------------------------------
-- financial_assistance_programs / financial_resources / grant_programs
-- ---------------------------------------------------------------------------
create table if not exists public.financial_assistance_programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  program_type text not null,
  category_group text not null,
  description text not null,
  eligibility_summary text,
  coverage_notes text,
  county text,
  state_code text default 'VA',
  sort_order integer default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'active',
  deleted_at timestamptz
);

create trigger financial_assistance_programs_updated_at
  before update on public.financial_assistance_programs
  for each row execute function public.fp_set_updated_at();

create table if not exists public.financial_resources (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  group_name text not null,
  program_type text not null,
  description text not null,
  eligibility_summary text,
  coverage_notes text,
  official_links jsonb not null default '[]'::jsonb,
  documents jsonb not null default '[]'::jsonb,
  tips jsonb not null default '[]'::jsonb,
  county text,
  state_code text,
  sort_order integer default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'active',
  deleted_at timestamptz
);

create trigger financial_resources_updated_at
  before update on public.financial_resources
  for each row execute function public.fp_set_updated_at();

create table if not exists public.grant_programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  provider text,
  description text,
  eligibility text,
  application_url text,
  deadline_at timestamptz,
  max_award_cents bigint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'active',
  deleted_at timestamptz
);

create trigger grant_programs_updated_at
  before update on public.grant_programs
  for each row execute function public.fp_set_updated_at();

-- ---------------------------------------------------------------------------
-- faq_financial / news_updates
-- ---------------------------------------------------------------------------
create table if not exists public.faq_financial (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  sort_order integer default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'active',
  deleted_at timestamptz
);

create trigger faq_financial_updated_at
  before update on public.faq_financial
  for each row execute function public.fp_set_updated_at();

create table if not exists public.news_updates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  body text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  deleted_at timestamptz
);

create trigger news_updates_updated_at
  before update on public.news_updates
  for each row execute function public.fp_set_updated_at();

-- ---------------------------------------------------------------------------
-- platform_admin_roles
-- ---------------------------------------------------------------------------
create table if not exists public.platform_admin_roles (
  id uuid primary key default gen_random_uuid(),
  staff_name text not null,
  role text not null check (role in ('owner', 'administrator', 'finance', 'intake_coordinator', 'viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  status text not null default 'active',
  deleted_at timestamptz,
  unique (staff_name, role)
);

create trigger platform_admin_roles_updated_at
  before update on public.platform_admin_roles
  for each row execute function public.fp_set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.donation_campaigns enable row level security;
alter table public.donors enable row level security;
alter table public.donations enable row level security;
alter table public.transactions enable row level security;
alter table public.fund_allocations enable row level security;
alter table public.families_supported enable row level security;
alter table public.therapy_sponsorships enable row level security;
alter table public.assistance_applications enable row level security;
alter table public.documents enable row level security;
alter table public.monthly_reports enable row level security;
alter table public.annual_reports enable row level security;
alter table public.impact_metrics enable row level security;
alter table public.audit_logs enable row level security;
alter table public.financial_assistance_programs enable row level security;
alter table public.financial_resources enable row level security;
alter table public.grant_programs enable row level security;
alter table public.faq_financial enable row level security;
alter table public.news_updates enable row level security;
alter table public.platform_admin_roles enable row level security;

-- Public read policies (non-deleted, published/active)
drop policy if exists "fp_campaigns_public_select" on public.donation_campaigns;
create policy "fp_campaigns_public_select" on public.donation_campaigns
  for select to anon, authenticated
  using (deleted_at is null and status = 'active');

drop policy if exists "fp_donations_public_select_completed" on public.donations;
create policy "fp_donations_public_select_completed" on public.donations
  for select to anon, authenticated
  using (deleted_at is null and status = 'completed');

drop policy if exists "fp_allocations_public_select" on public.fund_allocations;
create policy "fp_allocations_public_select" on public.fund_allocations
  for select to anon, authenticated
  using (deleted_at is null);

drop policy if exists "fp_monthly_reports_public" on public.monthly_reports;
create policy "fp_monthly_reports_public" on public.monthly_reports
  for select to anon, authenticated
  using (deleted_at is null and status = 'published');

drop policy if exists "fp_annual_reports_public" on public.annual_reports;
create policy "fp_annual_reports_public" on public.annual_reports
  for select to anon, authenticated
  using (deleted_at is null and status = 'published');

drop policy if exists "fp_impact_metrics_public" on public.impact_metrics;
create policy "fp_impact_metrics_public" on public.impact_metrics
  for select to anon, authenticated
  using (deleted_at is null and status = 'active');

drop policy if exists "fp_families_supported_public_count" on public.families_supported;
create policy "fp_families_supported_public_count" on public.families_supported
  for select to anon, authenticated
  using (deleted_at is null and status in ('active', 'completed'));

drop policy if exists "fp_therapy_sponsorships_public" on public.therapy_sponsorships;
create policy "fp_therapy_sponsorships_public" on public.therapy_sponsorships
  for select to anon, authenticated
  using (deleted_at is null and status in ('approved', 'active', 'completed'));

drop policy if exists "fp_resources_public" on public.financial_resources;
create policy "fp_resources_public" on public.financial_resources
  for select to anon, authenticated
  using (deleted_at is null and status = 'active');

drop policy if exists "fp_programs_public" on public.financial_assistance_programs;
create policy "fp_programs_public" on public.financial_assistance_programs
  for select to anon, authenticated
  using (deleted_at is null and status = 'active');

drop policy if exists "fp_grants_public" on public.grant_programs;
create policy "fp_grants_public" on public.grant_programs
  for select to anon, authenticated
  using (deleted_at is null and status = 'active');

drop policy if exists "fp_faq_public" on public.faq_financial;
create policy "fp_faq_public" on public.faq_financial
  for select to anon, authenticated
  using (deleted_at is null and status = 'active');

drop policy if exists "fp_news_public" on public.news_updates;
create policy "fp_news_public" on public.news_updates
  for select to anon, authenticated
  using (deleted_at is null and status = 'published');

-- Insert pending donations from public
drop policy if exists "fp_donations_insert_pending" on public.donations;
create policy "fp_donations_insert_pending" on public.donations
  for insert to anon, authenticated
  with check (status = 'pending' and deleted_at is null);

drop policy if exists "fp_donors_insert" on public.donors;
create policy "fp_donors_insert" on public.donors
  for insert to anon, authenticated
  with check (deleted_at is null);

-- Applications: insert only (tracking via server)
drop policy if exists "fp_applications_insert" on public.assistance_applications;
create policy "fp_applications_insert" on public.assistance_applications
  for insert to anon, authenticated
  with check (deleted_at is null);

-- ---------------------------------------------------------------------------
-- Seed default campaign
-- ---------------------------------------------------------------------------
insert into public.donation_campaigns (
  slug, name, description, goal_amount_cents, monthly_goal_cents, annual_goal_cents, status
)
values (
  'autism-care-fund-2026',
  'Eden Autism Care Fund',
  'Community-supported fund helping eligible Virginia families access autism-related services. Funding depends on available resources, eligibility, and program policies.',
  15000000,
  1250000,
  15000000,
  'active'
)
on conflict (slug) do nothing;

comment on table public.donation_campaigns is 'Fundraising campaigns for financial assistance platform';
comment on table public.donations is 'All donation types; amounts and allocation status for transparency';
