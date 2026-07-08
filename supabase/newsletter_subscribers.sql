-- Eden ABA Therapy — family newsletter signups from the website
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  source text not null default 'website',
  created_at timestamptz not null default now()
);

comment on table public.newsletter_subscribers is 'Family newsletter signups from Eden ABA Therapy website forms';

create unique index if not exists newsletter_subscribers_email_unique_idx
  on public.newsletter_subscribers (lower(email));

create index if not exists newsletter_subscribers_created_at_idx
  on public.newsletter_subscribers (created_at desc);

create index if not exists newsletter_subscribers_source_idx
  on public.newsletter_subscribers (source);

alter table public.newsletter_subscribers enable row level security;

grant usage on schema public to postgres, anon, authenticated, service_role;
grant all on table public.newsletter_subscribers to service_role;

drop policy if exists "newsletter_subscribers_insert_server" on public.newsletter_subscribers;
create policy "newsletter_subscribers_insert_server"
  on public.newsletter_subscribers
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "newsletter_subscribers_select_authenticated" on public.newsletter_subscribers;
create policy "newsletter_subscribers_select_authenticated"
  on public.newsletter_subscribers
  for select
  to authenticated
  using (true);
