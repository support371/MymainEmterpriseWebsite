# GEM Cybersecurity Assist deployment stabilization checklist

This checklist is the production handoff for consolidating GEM Cybersecurity Assist into one clean deployment path.

## Target production state

- `main` is the sole production branch in GitHub and Vercel.
- `main` contains the finished enterprise platform, including:
  - `/home`
  - `/intel`
  - `/assets`
  - `/community`
  - `/hub`
  - `/admin`
  - redirect coverage for legacy routes and `/dashboard/*` compatibility
- Custom production domains:
  - `gemcybersecurityassist.com`
  - `www.gemcybersecurityassist.com`
- One active Vercel project connected to this repo.

## Consolidation workflow

1. Validate the enterprise source branch and merge it into `main`.
   - Finished source branch: `claude/enterprise-architecture-redesign-W70hk`
   - Merge target: `main`
2. Run quality gates on `main`:
   - `npm run test`
   - `npm run build`
3. Push `main` and deploy only from `main` in Vercel production settings.

## Vercel production wiring

1. Keep only one production project for `support371/MymainEmterpriseWebsite`.
2. Set **Production Branch** to `main`.
3. Ensure the only custom production domains attached are:
   - `gemcybersecurityassist.com`
   - `www.gemcybersecurityassist.com`
4. Confirm DNS records resolve to the single production project.
5. Remove duplicate/legacy Vercel projects after successful production validation.

Known duplicate projects to remove after cutover:

- `mymain-emterprise-website`
- `mymain-emterprise-website-sr68`
- `mymain-emterprise-website-6rb7`
- `mymain-emterprise-website-6msw`
- `mymain-emterprise-website-9x6k`
- `mymain-emterprise-website-z4k8`
- `mymain-emterprise-website-wt2q`
- `mymain-emterprise-website-s362`
- `mymain-emterprise-website-3aq6`

## Post-deploy smoke checks

Run against production domain:

```bash
curl -I https://gemcybersecurityassist.com/home
curl -I https://gemcybersecurityassist.com/intel
curl -I https://gemcybersecurityassist.com/assets
curl -I https://gemcybersecurityassist.com/community
curl -I https://gemcybersecurityassist.com/hub
curl -I https://gemcybersecurityassist.com/admin/login
curl -s https://gemcybersecurityassist.com/api/health
curl -s https://gemcybersecurityassist.com/api/routes
```

Expected:

- All key routes return valid responses (200 or auth redirect for protected routes).
- `api/health` returns `ok: true`.
- `api/routes` reflects canonical routes and redirect inventory.
