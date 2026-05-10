# GitHub Pages deploy

## Current setup

- App is now a pure static SPA build.
- GitHub Actions workflow deploys `dist/` to Pages: `.github/workflows/deploy-pages.yml`.
- `404.html` is generated from `index.html` for SPA route refresh support.

## Before first public deploy

1. In GitHub repo settings, enable Pages source: **GitHub Actions**.
2. Add repository secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## Base path

- Current workflow builds with:
  - `VITE_BASE_PATH=/idm-motors/`
- This is correct for `https://<user>.github.io/idm-motors/`.

When your custom domain is active on this repo, change workflow env to:

```yaml
VITE_BASE_PATH: /
```

## Custom domain (GoDaddy)

1. Add domain in GitHub Pages settings (Custom domain).
2. Keep "Enforce HTTPS" enabled.
3. DNS at GoDaddy:
   - `www` CNAME -> `<your-user>.github.io`
   - apex `@` A records -> GitHub Pages IPs (from GitHub docs)
4. Once domain resolves, set `VITE_BASE_PATH` to `/` in workflow.

Optional: add `public/CNAME` with your final domain (single line).
