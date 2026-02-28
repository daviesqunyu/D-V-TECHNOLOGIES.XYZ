# Backend & Admin Setup for dvtechnologies.xyz

## Overview

This project uses **Supabase** as the backend (database + Edge Functions). cPanel hosts only the **static frontend** (React build). All API calls go to Supabase from the browser—no server-side code runs on cPanel.

## Architecture

- **Frontend**: React SPA → Built with `npm run build` → Upload `dist/` to cPanel `public_html`
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **APIs**: Contact form, Radio hub, Payments, Newsletter, Admin, AI Chat

## Deploy Supabase Migrations

Run these in your Supabase project (Dashboard → SQL Editor or `supabase db push`):

1. `supabase/migrations/20250215000000_contact_submissions.sql`
2. `supabase/migrations/20260216000100_radio_hub.sql`
3. `supabase/migrations/20260216000200_payment_records.sql`
4. `supabase/migrations/20260216000300_newsletter_subscribers.sql`

## Deploy Edge Functions

```bash
# From project root
npx supabase functions deploy contact-form
npx supabase functions deploy radio-hub
npx supabase functions deploy initiate-payment
npx supabase functions deploy admin-data
npx supabase functions deploy newsletter-subscribe
npx supabase functions deploy ai-chat
```

## Environment Variables

### Frontend (`.env.production` or cPanel env)

- `VITE_SUPABASE_URL` – e.g. `https://YOUR-PROJECT.supabase.co`
- `VITE_SUPABASE_PUBLISHABLE_KEY` – Supabase anon key

### Supabase Edge Function Secrets

Set via Supabase Dashboard → Project Settings → Edge Functions → Secrets:

- `SUPABASE_URL` (auto)
- `SUPABASE_SERVICE_ROLE_KEY` (auto)
- `ADMIN_SECRET` – **Required for /admin**. Set a strong password; this is what you enter to access the Admin dashboard.
- `RESEND_API_KEY` – Optional; for contact form email notifications
- `MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET`, etc. – Optional; for M-Pesa STK Push

## Admin Page (/admin)

1. Deploy the `admin-data` Edge Function
2. Set `ADMIN_SECRET` in Supabase Edge Function secrets
3. Visit `https://dvtechnologies.xyz/admin`
4. Enter the value of `ADMIN_SECRET` to log in
5. View: Contact submissions, Payment records, Newsletter subscribers, Radio live listeners

The Admin page is excluded from search engines via `robots.txt` (`Disallow: /admin/`).

## Radio "Backend Unavailable" Fix

The red error toast is **removed**. When the radio API (Supabase Edge Function) is unavailable:

- The player falls back to default station data
- Stream still works via fallback audio source
- No error popup is shown

## Domain: dvtechnologies.xyz

All references use `.xyz`. Partner links may use their own domains.

## cPanel Compatibility

- Uses only static HTML/CSS/JS—no Node, PHP, or server-side runtime on cPanel
- All backend logic runs on Supabase
- Works with standard cPanel shared hosting
