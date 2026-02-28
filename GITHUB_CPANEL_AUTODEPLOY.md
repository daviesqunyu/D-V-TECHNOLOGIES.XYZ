# GitHub to cPanel Auto-Deploy Guide

This guide deploys your Vite build from GitHub Actions to cPanel.

## 1) Prepare cPanel SSH

1. In cPanel, enable SSH access.
2. Create an SSH key pair for deployment.
3. Add the public key to `~/.ssh/authorized_keys` on cPanel.
4. Confirm your target web root (for example: `~/public_html`).

## 2) Add GitHub Secrets

In your GitHub repository settings, add:

- `CPANEL_HOST` - your server host, e.g. `srv123.main-hosting.eu`
- `CPANEL_USER` - cPanel SSH user
- `CPANEL_TARGET_DIR` - deploy directory, e.g. `/home/youruser/public_html`
- `CPANEL_SSH_KEY` - private key content

## 3) Add workflow

Create `.github/workflows/deploy-cpanel.yml`:

```yaml
name: Deploy to cPanel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
      - run: npm ci
      - run: npm run build
      - name: Setup SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.CPANEL_SSH_KEY }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan -H "${{ secrets.CPANEL_HOST }}" >> ~/.ssh/known_hosts
      - name: Deploy dist
        run: |
          rsync -avz --delete dist/ "${{ secrets.CPANEL_USER }}@${{ secrets.CPANEL_HOST }}:${{ secrets.CPANEL_TARGET_DIR }}/"
```

## 4) Validate post-deploy

1. Open `https://dvtechnologies.xyz`.
2. Test:
   - `/`
   - `/services`
   - `/contact`
   - `/admin`
3. Confirm `robots.txt` and `sitemap.xml` are reachable.
4. Confirm API requests still point to Supabase Edge Functions.

## 5) Backup strategy

Use:

- `scripts/backup.sh` before each release
- cPanel full account backup weekly
- database backups from Supabase scheduled daily
