create table if not exists public.offers (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  brand text not null,
  model text not null,
  year integer not null check (year >= 1900 and year <= 2100),
  mileage integer not null check (mileage >= 0),
  fuel text not null,
  transmission text not null,
  asking_price text,
  notes text,
  contact_name text,
  contact_email text not null,
  contact_phone text not null,
  photos text[] not null default '{}',
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  owner_note text
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.offers enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Public can insert offers" on public.offers;
create policy "Public can insert offers"
  on public.offers
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can read offers" on public.offers;
create policy "Admins can read offers"
  on public.offers
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.admin_users a
      where a.user_id = auth.uid()
    )
  );

drop policy if exists "Admins can update offers" on public.offers;
create policy "Admins can update offers"
  on public.offers
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.admin_users a
      where a.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.admin_users a
      where a.user_id = auth.uid()
    )
  );

drop policy if exists "Admins can read admin_users" on public.admin_users;
create policy "Admins can read admin_users"
  on public.admin_users
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.admin_users a
      where a.user_id = auth.uid()
    )
  );

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;
