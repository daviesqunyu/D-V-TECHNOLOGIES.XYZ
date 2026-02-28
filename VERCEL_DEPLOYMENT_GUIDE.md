# Full Guide: Migrate D&V Technologies from cPanel to Vercel

This guide walks you through moving **dvtechnologies.xyz** from cPanel (site currently down) to Vercel so the site is live again quickly and hosted for free on the Vercel plan.

---

## What You Need Before Starting

- [ ] **GitHub account** – your project code in a GitHub repo  
- [ ] **Vercel account** – sign up at [vercel.com](https://vercel.com) (free)  
- [ ] **Domain access** – you can change DNS for **dvtechnologies.xyz** (where you bought the domain: Namecheap, GoDaddy, Cloudflare, etc.)  
- [ ] **Env values** – copy from your `.env.production` (Supabase URL, Anon Key, etc.)

---

## Part 1: Push Your Code to GitHub (if not already)

1. Open a terminal in your project folder:  
   `c:\Users\davie\OneDrive\Desktop\dave all\silicon-savannah-ai-hub`
2. Check status:
   ```bash
   git status
   ```
3. Commit and push if you have uncommitted changes:
   ```bash
   git add .
   git commit -m "Add Vercel config and prepare for Vercel deployment"
   git push origin main
   ```
   (Use your real branch name if it’s not `main`.)

Your project must be on GitHub (or GitLab/Bitbucket) for Vercel to import it.

---

## Part 2: Deploy the Project on Vercel

### Step 1: Sign in and import project

1. Go to **[vercel.com](https://vercel.com)** and sign in (use “Continue with GitHub”).
2. Click **“Add New…” → “Project”**.
3. **Import** your repo: `silicon-savannah-ai-hub` (or whatever the repo name is).  
   If you don’t see it, click “Adjust GitHub App Permissions” and grant access to the repo.

### Step 2: Configure the build

Vercel often auto-detects Vite. Confirm these (or set them):

| Setting            | Value              |
|--------------------|--------------------|
| **Framework Preset** | Vite               |
| **Build Command**   | `npm run build`    |
| **Output Directory**| `dist`             |
| **Install Command** | `npm install`      |
| **Root Directory**  | leave empty (`.`) |

Do **not** set a “Root Directory” unless the app is in a subfolder of the repo.

### Step 3: Add environment variables

In the same import screen, open **“Environment Variables”**.

Add these (copy from your `.env.production`; use **Production** only, or add for Preview too if you want):

| Name                     | Value (your real values) |
|--------------------------|---------------------------|
| `VITE_SUPABASE_URL`      | `https://dwitvmlafunsmgadqmgj.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key (long JWT) |
| `VITE_SITE_DOMAIN`       | `dvtechnologies.xyz` |
| `VITE_USD_TO_KES_RATE`   | `129` (optional; if you use it in the app) |

Leave **`VITE_API_GATEWAY_URL`** empty or remove it if the app doesn’t need it.

- **Do not** commit `.env` or `.env.production` with secrets; only add them in Vercel’s UI.

### Step 4: Deploy

1. Click **“Deploy”**.
2. Wait for the build to finish (2–5 minutes).  
   If it fails, check the build log; usually it’s a missing env var or a lint/type error.
3. When it’s done, Vercel gives you a URL like:  
   `https://silicon-savannah-ai-hub-xxxx.vercel.app`  
   Open it and confirm the site works (navigation, Supabase, Paystack if you test).

---

## Part 3: Use Your Own Domain (dvtechnologies.xyz)

### Step 1: Add domain in Vercel

1. Open your project on Vercel → **Settings** → **Domains**.
2. Enter: **`dvtechnologies.xyz`** and **`www.dvtechnologies.xyz`** (if you use www).
3. Click **Add**.  
   Vercel will show the DNS records you need.

### Step 2: Set DNS at your domain registrar

Where you bought **dvtechnologies.xyz** (e.g. Namecheap, GoDaddy, Cloudflare, etc.):

1. Go to **DNS / DNS Management / Nameservers**.
2. Add or edit records as Vercel instructs. Usually:

   **Option A – A record (recommended)**  
   - Type: **A**  
   - Name: **@** (or leave blank for root)  
   - Value: **76.76.21.21** (Vercel’s IP; confirm in Vercel’s Domains page)  
   - TTL: 3600 or “Auto”

   **Option B – CNAME (if your registrar allows CNAME on root)**  
   - Type: **CNAME**  
   - Name: **@**  
   - Value: **cname.vercel-dns.com**

   For **www**:
   - Type: **CNAME**  
   - Name: **www**  
   - Value: **cname.vercel-dns.com**

3. Save.  
   DNS can take from a few minutes up to 48 hours (often 10–30 minutes).

### Step 3: SSL in Vercel

- Vercel will issue a free SSL certificate for **dvtechnologies.xyz** once DNS is correct.
- In **Settings → Domains**, wait until the domain shows **Valid** (no warnings).

---

## Part 4: After Migration Checklist

- [ ] **Paystack**  
  If you use Paystack with a callback URL like `https://dvtechnologies.xyz/payment-return`, keep that URL. Once DNS points to Vercel, the same URL will hit your Vercel app; no Paystack config change needed unless you had a different domain.

- [ ] **Supabase**  
  No change needed. The app uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`; they stay the same. Supabase Edge Functions are independent of where the frontend is hosted.

- [ ] **cPanel**  
  You can cancel or stop paying the web server once the site is live on Vercel and you’ve confirmed everything works.

---

## Part 5: What Changed in the Repo for Vercel

- **`vercel.json`** was added so that:
  - All routes (e.g. `/pricing`, `/admin`) are rewritten to `index.html` (SPA behavior).
  - Security headers (X-Content-Type-Options, X-Frame-Options, etc.) are applied.
- **`.htaccess`** is only for Apache (cPanel). Vercel ignores it; routing and headers are handled by `vercel.json` and Vercel’s edge.

---

## Quick Reference

| Step              | Where / What |
|-------------------|--------------|
| Code              | On GitHub (e.g. `main` branch) |
| Build             | Vercel: Build Command `npm run build`, Output `dist` |
| Env vars          | Vercel Project → Settings → Environment Variables |
| Domain            | Vercel → Domains → add `dvtechnologies.xyz` → set DNS at registrar |
| SSL               | Automatic on Vercel once DNS is valid |

---

## If the Build Fails on Vercel

1. **Build log** – Open the failed deployment → “Building” / “Logs” and read the error.
2. **Lint/type errors** – Fix locally with `npm run build`; if it passes locally, push and redeploy.
3. **Env vars** – Ensure every `VITE_*` variable used in the app is set in Vercel (Production).
4. **Node version** – Vercel uses a recent Node by default; if you need a specific version, add a **`engines`** field in `package.json`, e.g. `"engines": { "node": ">=18" }`.

---

## Summary

1. Push code to GitHub.  
2. Import repo in Vercel, set Build Command = `npm run build`, Output = `dist`.  
3. Add `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SITE_DOMAIN` (and optional `VITE_USD_TO_KES_RATE`) in Vercel.  
4. Deploy and test the `.vercel.app` URL.  
5. Add domain **dvtechnologies.xyz** in Vercel and point DNS at your registrar to Vercel.  
6. After DNS propagates, the site is live on your domain with free SSL; you can stop relying on the old cPanel server.
