# Backend API + VPS Support Architecture

This project now supports two backend routing modes:

1. Direct Supabase Edge Functions (default)
2. VPS/API gateway proxy mode (optional)

## 1) Default mode (recommended)

- Frontend calls `https://<project-ref>.supabase.co/functions/v1/<function>`
- Managed by `src/lib/api.ts`
- Good for cPanel frontend + Supabase backend setup

## 2) VPS/API gateway mode

Set `VITE_API_GATEWAY_URL` in frontend environment, for example:

```bash
VITE_API_GATEWAY_URL=https://api.dvtechnologies.xyz
```

When set, frontend requests are routed to:

- `https://api.dvtechnologies.xyz/contact-form`
- `https://api.dvtechnologies.xyz/admin-data`
- `https://api.dvtechnologies.xyz/radio-hub`
- `https://api.dvtechnologies.xyz/initiate-payment`

Your VPS can reverse-proxy these routes to Supabase, or host your own backend.

## Example Nginx reverse proxy on VPS

```nginx
server {
  listen 443 ssl http2;
  server_name api.dvtechnologies.xyz;

  location / {
    proxy_pass https://uutsiiyvfahkefcldtsl.supabase.co/functions/v1/;
    proxy_set_header Host uutsiiyvfahkefcldtsl.supabase.co;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## Security notes

- Restrict CORS in Supabase secrets using `ALLOWED_ORIGIN=https://dvtechnologies.xyz`
- Keep `SUPABASE_SERVICE_ROLE_KEY` only in server environments
- Rotate `ADMIN_SECRET` periodically
