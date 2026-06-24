-- Eden ABA Therapy — 6-step advanced intake packet storage
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.intake_packets (
  id uuid primary key default gen_random_uuid(),
  confirmation_id text not null unique,
  parent_name text,
  child_first_name text,
  child_last_name text,
  parent_email text,
  parent_phone text,
  submitted_at timestamptz not null default now(),
  status text not null default 'received',
  packet jsonb not null,
  created_at timestamptz not null default now()
);

comment on table public.intake_packets is 'Full 6-step ABA intake submissions (JSONB packet + searchable columns)';
comment on column public.intake_packets.packet is 'Complete intake payload: intake fields, documentMeta, file metadata';

create index if not exists intake_packets_submitted_at_idx
  on public.intake_packets (submitted_at desc);

create index if not exists intake_packets_parent_email_idx
  on public.intake_packets (parent_email);

create index if not exists intake_packets_confirmation_id_idx
  on public.intake_packets (confirmation_id);

create index if not exists intake_packets_status_idx
  on public.intake_packets (status);

alter table public.intake_packets enable row level security;

-- Allow inserts from the Next.js server using the publishable (anon) key.
-- Service role bypasses RLS automatically; use SUPABASE_SERVICE_ROLE_KEY in production.
drop policy if exists "intake_packets_insert_server" on public.intake_packets;
create policy "intake_packets_insert_server"
  on public.intake_packets
  for insert
  to anon, authenticated
  with check (true);

-- Optional: restrict reads to authenticated staff only (adjust to your auth setup).
drop policy if exists "intake_packets_select_authenticated" on public.intake_packets;
create policy "intake_packets_select_authenticated"
  on public.intake_packets
  for select
  to authenticated
  using (true);
