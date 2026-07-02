-- Eden ABA Therapy — Speech & Language Therapy screening submissions
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.speech_language_screenings (
  id uuid primary key default gen_random_uuid(),
  confirmation_id text not null unique,
  child_name text,
  child_dob text,
  parent_name text,
  phone text,
  email text,
  primary_language text,
  concerns text,
  screening_score integer,
  risk_level text,
  red_flags boolean not null default false,
  form_data jsonb not null,
  created_at timestamptz not null default now()
);

comment on table public.speech_language_screenings is
  'Family-submitted speech & language screening forms (non-diagnostic; full payload in form_data)';

create index if not exists speech_language_screenings_created_at_idx
  on public.speech_language_screenings (created_at desc);

create index if not exists speech_language_screenings_confirmation_id_idx
  on public.speech_language_screenings (confirmation_id);

create index if not exists speech_language_screenings_email_idx
  on public.speech_language_screenings (email);

alter table public.speech_language_screenings enable row level security;

drop policy if exists "speech_language_screenings_insert_server" on public.speech_language_screenings;
create policy "speech_language_screenings_insert_server"
  on public.speech_language_screenings
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "speech_language_screenings_select_authenticated" on public.speech_language_screenings;
create policy "speech_language_screenings_select_authenticated"
  on public.speech_language_screenings
  for select
  to authenticated
  using (true);
