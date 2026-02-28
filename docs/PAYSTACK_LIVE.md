# Enabling Live Paystack on Your Domain

Your app uses **Paystack** for card (and other) payments. It works in two modes:

- **Test mode** – Uses test keys (`sk_test_...`, `pk_test_...`). Only test cards and test flows work; no real money.
- **Live mode** – Uses live keys (`sk_live_...`, `pk_live_...`). Real charges on your domain.

## Is it because I'm using test Paystack?

Yes. If you are using **test** Paystack keys:

- Payments go through Paystack’s test environment.
- Only [Paystack test cards](https://paystack.com/docs/payments/test-payments) work.
- No real money is moved; the flow and records (e.g. in your Excel export) are the same, but the gateway is in test mode.

To accept **real** payments on your domain, you must switch to **live** Paystack keys. The code does not change; only the keys and (optionally) Paystack dashboard settings do.

## Steps to enable live Paystack

### 1. Complete Paystack verification

- Log in to [Paystack Dashboard](https://dashboard.paystack.com).
- Complete business verification (KYC) and any activation steps required for live mode.
- Ensure your account is approved for **live** transactions.

### 2. Get your live keys

- In Paystack Dashboard, switch from **Test** to **Live** (toggle or environment selector).
- Go to **Settings → API Keys & Webhooks** (or similar).
- Copy your **Live** keys:
  - **Secret Key** (starts with `sk_live_...`) – used by your backend only.
  - **Public Key** (starts with `pk_live_...`) – only needed if you use Paystack.js or similar on the frontend; your current flow uses redirect, so the backend secret is the critical one).

### 3. Set the live secret in your backend

Your backend (Supabase Edge Functions) reads the key from environment:

- **Variable name:** `PAYSTACK_SECRET_KEY`

**Supabase (recommended):**

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Edge Functions** (or **Settings → Secrets**).
2. Set the secret:
   - Name: `PAYSTACK_SECRET_KEY`
   - Value: your **live** secret key (`sk_live_...`).
3. Redeploy or restart the functions that use it (`initiate-payment`, `verify-payment`).

**If you use another host (e.g. VPS):** set `PAYSTACK_SECRET_KEY` in that environment to the same live secret.

Do **not** put the live secret in frontend code or in git.

### 4. Callback URL (payment return)

Your app already uses a callback URL so Paystack can redirect users after payment. For example:

- Production: `https://yourdomain.com/payment-return`
- This is built from `PAYSTACK_CALLBACK_URL` or `SITE_URL` in your backend (see `initiate-payment`).

For live:

- Ensure `SITE_URL` (or `PAYSTACK_CALLBACK_URL`) is set to your **live** domain, e.g. `https://yourdomain.com`.
- No need to change the path: `/payment-return` stays the same. After you switch to live keys, Paystack will still redirect to that URL; only the environment (test vs live) changes.

### 5. Optional: Webhook (if you add one later)

If you add a Paystack webhook for extra reliability:

- In Paystack Dashboard (Live mode), set the webhook URL to something like:  
  `https://your-api.com/functions/v1/paystack-webhook`  
  (or your real webhook endpoint).
- Use the same live secret to verify webhook signatures.

### 6. Test on your domain

- Deploy your frontend and backend with **live** `PAYSTACK_SECRET_KEY` and correct `SITE_URL`/`PAYSTACK_CALLBACK_URL`.
- On your live domain, go through a small real payment (then refund if needed).
- Confirm:
  - Redirect to Paystack and back to `/payment-return` works.
  - Payment appears in Paystack Dashboard (Live).
  - Record appears in your admin/Excel (name, date, card details (admin), etc.) as expected.

## Summary

| Item | Test mode | Live mode |
|------|-----------|-----------|
| Secret key | `sk_test_...` | `sk_live_...` |
| Where to set | `PAYSTACK_SECRET_KEY` (e.g. Supabase secrets) | Same variable, live value |
| Callback URL | e.g. `https://yourdomain.com/payment-return` | Same URL on live domain |
| Code changes | None | None – only keys and env |

So: **it is because you are using test Paystack** that you don’t see real payments. To enable live Paystack on your domain, switch `PAYSTACK_SECRET_KEY` to your live secret and ensure your callback URL points to your live site; the rest of the flow and Excel/output table stay the same.
