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

comment on column public.support_messages.message is 'Support message body from the intake Messages textarea';

-- Ensure message column exists (safe if table was created before message was added).
alter table public.support_messages add column if not exists message text;

-- Backfill legacy body column into message when applicable.
do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'support_messages'
      and column_name = 'body'
  ) then
    execute $sql$
      update public.support_messages
      set message = body
      where (message is null or btrim(message) = '')
        and body is not null
        and btrim(body) <> ''
    $sql$;
  end if;
end $$;

alter table public.support_messages enable row level security;

-- Service role bypasses RLS; grants ensure API inserts work when using SUPABASE_SERVICE_ROLE_KEY.
grant usage on schema public to postgres, anon, authenticated, service_role;
grant all on table public.support_messages to service_role;

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
