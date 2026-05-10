drop policy if exists "Admins can delete offers" on public.offers;

create policy "Admins can delete offers"
  on public.offers
  for delete
  to authenticated
  using ((select public.is_admin()));
