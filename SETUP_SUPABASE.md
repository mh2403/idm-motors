# Supabase setup for IDM Motors

Project ref: `mnxdmvsnkzfrssjeozzx`

## 1. Frontend env vars

Create `.env.local` (already created locally):

```env
VITE_SUPABASE_URL=https://mnxdmvsnkzfrssjeozzx.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_OR_ANON_KEY
```

## 2. Create first admin user

1. Open `/admin` on the website.
2. Login once with email/password (this creates user in `auth.users`).
3. In Supabase SQL editor, run:

```sql
insert into public.admin_users (user_id)
select id
from auth.users
where email = 'owner@example.com'
on conflict (user_id) do nothing;
```

Replace `owner@example.com` with the exact admin email.

## 3. Free email notifications (Resend)

Resend has a free tier and works well with Supabase Edge Functions.

Set secrets in Supabase:

```bash
supabase secrets set --project-ref mnxdmvsnkzfrssjeozzx \
  RESEND_API_KEY=re_xxxxxxxxx \
  LEAD_TO_EMAIL=owner@example.com \
  LEAD_FROM_EMAIL='IDM Motors <onboarding@resend.dev>'
```

Function is already deployed as `notify-offer`.

## 4. Security notes

- Never put service-role keys in frontend code.
- Keep repository public-safe: no `.env` files committed.
- RLS is enabled:
  - public can only insert offers
  - only admin users can read/update offers
