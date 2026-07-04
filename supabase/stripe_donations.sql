-- Stripe Checkout donations table (enterprise Stripe integration)
-- Run in Supabase SQL editor after financial_assistance_platform.sql (optional, standalone)

create table if not exists public.stripe_donations (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text unique,
  payment_intent_id text,
  amount integer not null check (amount > 0),
  currency text not null default 'usd',
  donor_name text,
  donor_email text,
  anonymous boolean not null default true,
  message text,
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists stripe_donations_session_idx on public.stripe_donations (stripe_session_id);
create index if not exists stripe_donations_status_idx on public.stripe_donations (status);
create index if not exists stripe_donations_created_at_idx on public.stripe_donations (created_at desc);

alter table public.stripe_donations enable row level security;

-- Service role bypasses RLS; no public read/write policies by default.

comment on table public.stripe_donations is 'Stripe Checkout donations for Eden Autism Care Fund';
