insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'offer-photos',
  'offer-photos',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Offer photos upload" on storage.objects;
create policy "Offer photos upload"
  on storage.objects
  for insert
  to anon, authenticated
  with check (
    bucket_id = 'offer-photos'
    and (storage.foldername(name))[1] = 'offers'
  );

drop policy if exists "Admins can view offer photos" on storage.objects;
create policy "Admins can view offer photos"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'offer-photos'
    and (select public.is_admin())
  );

drop policy if exists "Admins can delete offer photos" on storage.objects;
create policy "Admins can delete offer photos"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'offer-photos'
    and (select public.is_admin())
  );
