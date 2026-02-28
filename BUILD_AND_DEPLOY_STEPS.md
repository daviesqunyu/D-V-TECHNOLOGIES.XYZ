# Exact steps: test locally → build → deploy to cPanel

---

## Part 1: Test on local

### 1.1 Install dependencies (if you haven’t)

```bash
cd "c:\Users\davie\OneDrive\Desktop\dave all\silicon-savannah-ai-hub"
npm install
```

### 1.2 Set environment variables

- Make sure your **`.env`** in the project root has at least:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
- Optional: `VITE_SITE_DOMAIN`, `VITE_RECAPTCHA_SITE_KEY`, `VITE_GA_MEASUREMENT_ID`

### 1.3 Run the app locally (dev server)

```bash
npm run dev
```

- App runs at: **http://localhost:8081**
- Browser may open automatically; if not, open that URL.
- Check: homepage, Services, Contact, AI Assistant, theme toggle, etc.

### 1.4 Test the production build locally

1. **Build:**

   ```bash
   npm run build
   ```

   - This runs lint + typecheck, then creates the **`dist`** folder.

2. **Preview the built site:**

   ```bash
   npm run preview
   ```

   - Opens at: **http://localhost:4173**
   - Test the same pages and features. This is what will run on cPanel.

3. **Stop preview:** In the terminal press `Ctrl+C`.

---

## Part 2: Build for production

### 2.1 Use production env

- For production, the build should use your **live** Supabase URL and key.
- If you use **`.env`** only (no `.env.production`), the same values are used. Ensure they are correct for production.
- Optional: create **`.env.production`** with production values and Vite will use it when you run `npm run build`.

### 2.2 Run the build

```bash
npm run build
```

**Expected result:**

- `dist/` folder is created/updated with something like:

```
dist/
├── index.html
├── .htaccess
├── robots.txt
├── sitemap.xml
├── manifest.json
├── favicon.svg
├── favicon-512.svg
├── favicon-animated.svg
├── placeholder.svg
└── assets/
    ├── index-[hash].js
    ├── index-[hash].css
    └── (other hashed assets)
```

- Upload **everything inside `dist/`** (all files and the `assets` folder) to cPanel — do **not** upload the `dist` folder itself.

---

## Part 3: Deploy to cPanel (exact steps)

### 3.1 Log in to cPanel

1. Open: **https://dvtechnologies.xyz:2083** (or your host’s cPanel URL).
2. Log in with your cPanel username and password.

### 3.2 Open File Manager

1. In cPanel home, click **“File Manager”**.
2. Go to **`public_html`** (this is the folder that serves your site).

### 3.3 Clean `public_html` (optional but recommended)

1. Inside `public_html`, select **all** existing files and folders.
2. Click **“Delete”** and confirm.
3. (If your host put a default `index` or `.htaccess` there, deleting is fine — you’ll upload your own.)

### 3.4 Upload the contents of `dist/`

**Option A – Upload files one by one / in groups**

1. Click **“Upload”**.
2. Open your **`dist`** folder on your PC:  
   `c:\Users\davie\OneDrive\Desktop\dave all\silicon-savannah-ai-hub\dist`
3. Upload **every item** inside `dist/`:
   - `index.html` (root of dist)
   - `.htaccess` (root of dist) — in File Manager enable **“Show Hidden Files”** if you don’t see it
   - `robots.txt`, `sitemap.xml`, `manifest.json`
   - `favicon.svg`, `favicon-512.svg`, `favicon-animated.svg`, `placeholder.svg`
   - **Entire `assets` folder** (with all `.js` and `.css` files inside it).
4. Upload destination must be **`public_html`** (not inside a subfolder).

**Option B – Upload a zip (often faster)**

1. On your PC, go to:  
   `c:\Users\davie\OneDrive\Desktop\dave all\silicon-savannah-ai-hub\dist`
2. Select **all** files and the `assets` folder, right‑click → **“Compress”** / **“Send to → Compressed folder”** → name it e.g. `site.zip`.
3. In cPanel File Manager, go to `public_html`, click **“Upload”**, upload **`site.zip`**.
4. After upload, right‑click `site.zip` in `public_html` → **“Extract”**.
5. Move the **extracted contents** (not the zip) so they sit directly inside `public_html`:  
   - If extraction created a subfolder (e.g. `dist` or `site`), open it, select all, move to `public_html`.
6. Delete the empty folder and **`site.zip`** from `public_html`.

### 3.5 Confirm `.htaccess` is in `public_html`

1. In File Manager, make sure **“Show Hidden Files”** is on.
2. Check that **`.htaccess`** is present in `public_html`.
3. If you uploaded from `dist/`, it should already be there (Vite copies it from `public/.htaccess`).

---

## Part 4: Test the live site

1. Open: **https://dvtechnologies.xyz**
2. Verify:
   - Homepage loads.
   - **https://dvtechnologies.xyz/services** (and other routes) load without 404.
   - **https://dvtechnologies.xyz/contact** — form and any API calls work.
   - **https://dvtechnologies.xyz/ai-assistant** — works.
   - Theme toggle works.
   - No console errors related to missing env or API (if you see any, your build was not using the right `.env` or `.env.production`).

---

## Quick reference

| Action        | Command / URL |
|---------------|----------------|
| Dev server    | `npm run dev` → http://localhost:8081 |
| Build         | `npm run build` |
| Preview build | `npm run preview` → http://localhost:4173 |
| cPanel        | https://dvtechnologies.xyz:2083 |
| Live site     | https://dvtechnologies.xyz |

**Remember:** You must **build** (`npm run build`) and then upload the **contents of `dist/`** to **`public_html`**. The site uses the env values that were set at build time.
