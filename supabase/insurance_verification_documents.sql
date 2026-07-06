-- Insurance verification document columns + private storage bucket
-- Run in Supabase SQL Editor after insurance_verification_requests.sql

alter table public.insurance_verification_requests
  add column if not exists insurance_front_url text,
  add column if not exists insurance_back_url text,
  add column if not exists parent_id_url text,
  add column if not exists diagnosis_report_url text,
  add column if not exists referral_url text,
  add column if not exists iep_document_url text;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'insurance-documents',
  'insurance-documents',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'application/pdf']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Private bucket: families upload via service role API only; staff access via backend signed URLs.
