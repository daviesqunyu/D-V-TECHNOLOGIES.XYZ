# D&V Technologies — Silicon Savannah AI Hub

Nairobi's next-generation tech company: IT, hardware & software solutions, AI, IoT, and digital transformation for modern businesses across Kenya and East Africa.

## Business DNA

- **Mission**: Transform Kenyan and African business through problem-solving and innovation.
- **Vision**: Make Nairobi the Silicon Savannah of Africa by 2030.
- **Offerings**: IT Support & Maintenance, Hardware Repair, Software Development, Networking, AI & Automation, Crypto-ready payments.
- **Contact**: info@dvtechnologies.xyz | Lower Kabete, Nairobi, Kenya.

## Tech Stack

- Vite, TypeScript, React
- shadcn-ui, Tailwind CSS
- Supabase (backend: AI chat, contact form, DB)

## Backend & API (Supabase)

- **AI Assistant**: Edge Function `ai-chat` uses **OpenAI API** (no Lovable). Set `OPENAI_API_KEY` in Supabase Edge Function secrets.
- **Contact form**: Edge Function `contact-form` saves submissions to `contact_submissions` and can send email via **Resend**. Set `RESEND_API_KEY` in Supabase Edge Function secrets to enable:
  - Email to **info@dvtechnologies.xyz** when someone submits the form
  - Automated reply to the user’s email
- **Database**: Run the migration so the contact table exists:
  - `supabase/migrations/20250215000000_contact_submissions.sql` — create `contact_submissions` table
- **WhatsApp**: Main contact channel; links use **wa.me/254759075816** (0759 075 816). Form success can open WhatsApp for a quick follow-up.

## Run locally

```sh
npm i
npm run dev
```

## Build

```sh
npm run build
```

## Deployment (dvtechnologies.xyz)

- **Domain**: Set canonical URL and `og:url` in `index.html` to your live domain (e.g. `https://dvtechnologies.xyz`).
- **Sitemap**: `public/sitemap.xml` lists main routes; submit to [Google Search Console](https://search.google.com/search-console) and Bing Webmaster.
- **robots.txt**: Points to `Sitemap: https://dvtechnologies.xyz/sitemap.xml`; update base URL when deploying.
- **SEO**: Meta tags, JSON-LD Organization, Open Graph and Twitter cards are set for indexing and social sharing.
- **Ads**: For Google Ads / fast searchability, deploy to a fast host (e.g. Vercel, Netlify), then create a campaign and link the domain in Google Ads; the site is already SEO-optimized for indexing.

## Payments

- **Bitcoin**: Address `1PZPhUGugY5ecF9hYFYvpffsYUFUk2hK6i`; copy via "Pay with Bitcoin" button.
- **M-Pesa**: Number `0759 075 816`; "Pay via M-Pesa" links to call. For STK Push / Paybill, integrate [Safaricom Daraja API](https://developer.safaricom.co.ke/) (consumer key, secret, till/paybill) via your backend.
