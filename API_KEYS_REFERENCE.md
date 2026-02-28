# API Keys Reference – Backend & Frontend Connection

Use this as a checklist for the keys you mentioned (from your previous chat or from Supabase/Google/reCAPTCHA). Add them to `.env` locally and to your **cPanel build environment** for production.

---

## Required (already in your .env)

| Variable | Where it's used | Where to get it |
|----------|-----------------|-----------------|
| `VITE_SUPABASE_URL` | `src/lib/api.ts`, Supabase client | Supabase Dashboard → Project Settings → API → Project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `src/lib/api.ts`, Supabase client, `authHeaders()` for all API calls | Supabase Dashboard → Project Settings → API → anon public key |

With these two set, the app talks to:
- **Supabase Edge Functions**: contact form, radio hub, payments, newsletter, admin, AI chat  
- **Supabase Auth/DB** (if you use them): via `@/integrations/supabase/client`

---

## Optional (paste your keys into .env)

| Variable | Purpose | Where to get it |
|----------|---------|-----------------|
| `VITE_SITE_DOMAIN` | Canonical domain (default: dvtechnologies.xyz) | Set to your live domain if different |
| `VITE_API_GATEWAY_URL` | Custom API gateway; if empty, app uses Supabase Edge Functions | Your gateway base URL (e.g. `https://api.dvtechnologies.xyz`) or leave empty |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 | GA4 Admin → Data Streams → Measurement ID (e.g. `G-XXXXXXXXXX`) |
| `VITE_RECAPTCHA_SITE_KEY` | Contact form reCAPTCHA v3 | [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin) → reCAPTCHA v3 → Site key |

---

## Production (cPanel)

When you run `npm run build` for production, Vite bakes `VITE_*` variables into the bundle. So in cPanel (or your CI):

1. Set the **same** variables in the environment where you run the build (e.g. cPanel “Setup Node.js App” → Environment variables, or your deploy script).
2. Then run `npm run build` so the built files in `dist/` contain the correct API URLs and keys.

---

## Quick check

- **Backend connection**: If `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are set in `.env`, the frontend is already wired to your Supabase backend.
- **Optional keys**: Add `VITE_GA_MEASUREMENT_ID`, `VITE_RECAPTCHA_SITE_KEY`, and optionally `VITE_API_GATEWAY_URL` and `VITE_SITE_DOMAIN` when you have them; the app works without them.
