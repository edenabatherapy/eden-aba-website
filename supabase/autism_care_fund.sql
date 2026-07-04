-- Eden ABA Therapy — Autism Care Fund
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.acf_campaigns (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  goal_amount_cents bigint not null default 0,
  status text not null default 'active' check (status in ('draft', 'active', 'paused', 'completed')),
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.acf_donors (
  id uuid primary key default gen_random_uuid(),
  display_name text,
  email_hash text,
  is_anonymous boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.acf_donations (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.acf_campaigns (id) on delete restrict,
  donor_id uuid references public.acf_donors (id) on delete set null,
  amount_cents bigint not null check (amount_cents > 0),
  currency text not null default 'usd',
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed', 'refunded')),
  payment_provider text,
  payment_intent_id text,
  message text,
  is_anonymous boolean not null default true,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.acf_fund_allocations (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.acf_campaigns (id) on delete restrict,
  category text not null check (category in ('therapy_subsidy', 'assessment_support', 'family_emergency', 'operating', 'other')),
  amount_cents bigint not null check (amount_cents >= 0),
  period_label text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.acf_impact_reports (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.acf_campaigns (id) on delete restrict,
  families_helped integer not null default 0 check (families_helped >= 0),
  hours_supported numeric(10, 2) default 0,
  narrative text,
  reported_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.acf_monthly_reports (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.acf_campaigns (id) on delete restrict,
  month date not null,
  raised_cents bigint not null default 0,
  disbursed_cents bigint not null default 0,
  families_served integer not null default 0,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (campaign_id, month)
);

create table if not exists public.acf_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor text,
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists acf_donations_campaign_status_idx
  on public.acf_donations (campaign_id, status);

create index if not exists acf_donations_completed_at_idx
  on public.acf_donations (completed_at desc nulls last);

create index if not exists acf_fund_allocations_campaign_idx
  on public.acf_fund_allocations (campaign_id, period_label);

create index if not exists acf_monthly_reports_campaign_month_idx
  on public.acf_monthly_reports (campaign_id, month desc);

alter table public.acf_campaigns enable row level security;
alter table public.acf_donors enable row level security;
alter table public.acf_donations enable row level security;
alter table public.acf_fund_allocations enable row level security;
alter table public.acf_impact_reports enable row level security;
alter table public.acf_monthly_reports enable row level security;
alter table public.acf_audit_logs enable row level security;

-- Public read: active campaigns only
drop policy if exists "acf_campaigns_public_select" on public.acf_campaigns;
create policy "acf_campaigns_public_select"
  on public.acf_campaigns
  for select
  to anon, authenticated
  using (status = 'active');

-- Public read: completed donations aggregated via API; no direct donor PII
drop policy if exists "acf_donations_public_select_completed" on public.acf_donations;
create policy "acf_donations_public_select_completed"
  on public.acf_donations
  for select
  to anon, authenticated
  using (status = 'completed');

-- Public read: allocations and published reports
drop policy if exists "acf_allocations_public_select" on public.acf_fund_allocations;
create policy "acf_allocations_public_select"
  on public.acf_fund_allocations
  for select
  to anon, authenticated
  using (true);

drop policy if exists "acf_monthly_reports_public_select" on public.acf_monthly_reports;
create policy "acf_monthly_reports_public_select"
  on public.acf_monthly_reports
  for select
  to anon, authenticated
  using (true);

drop policy if exists "acf_impact_reports_public_select" on public.acf_impact_reports;
create policy "acf_impact_reports_public_select"
  on public.acf_impact_reports
  for select
  to anon, authenticated
  using (true);

-- Donor wall: anonymous display names only (no email)
drop policy if exists "acf_donors_public_select_anonymous" on public.acf_donors;
create policy "acf_donors_public_select_anonymous"
  on public.acf_donors
  for select
  to anon, authenticated
  using (is_anonymous = true);

-- Insert donation intents (pending) from server/anon
drop policy if exists "acf_donations_insert_pending" on public.acf_donations;
create policy "acf_donations_insert_pending"
  on public.acf_donations
  for insert
  to anon, authenticated
  with check (status = 'pending');

drop policy if exists "acf_donors_insert" on public.acf_donors;
create policy "acf_donors_insert"
  on public.acf_donors
  for insert
  to anon, authenticated
  with check (true);

-- Seed default campaign (optional — safe to re-run)
insert into public.acf_campaigns (slug, name, description, goal_amount_cents, status)
values (
  'autism-care-fund-2026',
  'Eden Autism Care Fund',
  'Community-supported fund helping eligible Virginia families access ABA therapy.',
  15000000,
  'active'
)
on conflict (slug) do nothing;

comment on table public.acf_campaigns is 'Autism Care Fund fundraising campaigns';
comment on table public.acf_donations is 'Donation records; PII minimized. Payment processing future-ready.';
