# DVTECH — Telegram Control & Monitoring Bot

The `DVTECH` Telegram bot monitors the D&V Technologies site and lets you run quick
status commands from your phone. It is implemented with two Supabase Edge Functions
(`telegram-bot` and `telegram-alert`) plus two tables (`telegram_chats`, `site_alerts`).

## What it does

- **`/start`, `/help`** — welcome + command list.
- **`/status`** — live counts of contact messages, payments and newsletter subscribers.
- **`/stats`** — the 5 most recent payment records.
- **`/orders`** — the 10 latest orders with status.
- **`/alerts`** — the 8 most recent site alerts.
- **`/services`** — list of D&V service lines with a link to the shop.
- **Alerts** — when a new contact message arrives on the site, `contact-form` calls
  `telegram-alert`, which records the event in `site_alerts` and pushes it to every
  approved, subscribed chat (your admin chat is auto-approved).

## Required secrets

Set these in Supabase (Dashboard → Edge Functions → Secrets, or `supabase secrets set`):

| Secret | Purpose |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | From @BotFather. Required by both functions. |
| `TELEGRAM_ADMIN_CHAT_ID` | Your chat id (get it from @userinfobot). Auto-approved as admin. |
| `BOT_SECRET` | Random secret; `contact-form` sends it as the `x-bot-secret` header. |

## Setup steps

1. **Create the bot** in Telegram: message @BotFather → `/newbot` → choose a name and
   username (e.g. `DVTECHMonitorBot`). Copy the token.

2. **Run the migration** (creates `telegram_chats` and `site_alerts`):

   ```bash
   supabase db push
   ```

3. **Deploy the functions** and set secrets:

   ```bash
   supabase functions deploy telegram-bot telegram-alert
   supabase secrets set TELEGRAM_BOT_TOKEN=... TELEGRAM_ADMIN_CHAT_ID=... BOT_SECRET=...
   ```

4. **Register the webhook** so Telegram pushes updates to the bot function:

   ```bash
   curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<project-ref>.supabase.co/functions/v1/telegram-bot"
   ```

   Verify with `getWebhookInfo`. Remove it with `deleteWebhook`.

5. **Say `/start`** to your bot in Telegram — your chat is registered and auto-approved
   as the admin chat, so you will receive site alerts immediately.

## Testing alerts manually

```bash
curl -X POST "https://<project-ref>.supabase.co/functions/v1/telegram-alert" \
  -H "Content-Type: application/json" \
  -H "x-bot-secret: <BOT_SECRET>" \
  -d '{"event":"Test alert","subject":"Hello","message":"This is a test from the CLI.","details":{"Env":"prod"}}'
```

## Managing subscribers

- Chats that send `/start` are registered with `approved = false` unless they are the
  admin chat. To approve another chat, set `approved = true` for its row in
  `telegram_chats` (service role only).
- Set `subscribed = false` to pause alerts for a chat without removing it.

## Notes

- `telegram-bot` responds to Telegram webhook updates; anyone who finds the bot can use
  the read-only commands. Payments and other sensitive data are only visible to chats
  that are approved as admin/subscribers.
- The frontend AI assistant (`/ai-assistant`) is a separate feature — it prefers
  `OPENAI_API_KEY` and falls back to Cloudflare Workers AI or the on-device knowledge base.
