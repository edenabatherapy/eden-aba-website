-- Eden ABA Therapy — intake support messages from the 6-step form Messages tab
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.support_messages (
  id uuid primary key default gen_random_uuid(),
  parent_name text,
  parent_email text,
  parent_phone text,
  confirmation_id text,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now(),
  status text not null default 'new'
);

comment on table public.support_messages is 'Support requests sent from the 6-step intake Messages tab';

create index if not exists support_messages_created_at_idx
  on public.support_messages (created_at desc);

create index if not exists support_messages_status_idx
  on public.support_messages (status);

create index if not exists support_messages_confirmation_id_idx
  on public.support_messages (confirmation_id);

alter table public.support_messages enable row level security;

drop policy if exists "support_messages_insert_server" on public.support_messages;
create policy "support_messages_insert_server"
  on public.support_messages
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "support_messages_select_authenticated" on public.support_messages;
create policy "support_messages_select_authenticated"
  on public.support_messages
  for select
  to authenticated
  using (true);
