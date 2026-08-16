-- Telegram bot: chat registry + site alert log
-- 2026-08-15

create table if not exists public.telegram_chats (
  id bigint generated always as identity primary key,
  chat_id bigint not null unique,
  username text,
  first_name text,
  role text not null default 'member',
  approved boolean not null default false,
  subscribed boolean not null default true,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

comment on table public.telegram_chats is
  'Chats that interact with the D&V Technologies Telegram bot (DVTECH).';

create table if not exists public.site_alerts (
  id bigint generated always as identity primary key,
  event text not null,
  payload jsonb not null default '{}'::jsonb,
  source text,
  created_at timestamptz not null default now()
);

comment on table public.site_alerts is
  'System/website events pushed to the Telegram bot (contact forms, payments, etc).';

-- Service role and authenticated admins manage these tables; public cannot read/write.
alter table public.telegram_chats enable row level security;
alter table public.site_alerts enable row level security;

create policy "telegram_chats service_role" on public.telegram_chats
  for all to service_role using (true) with check (true);

create policy "site_alerts service_role" on public.site_alerts
  for all to service_role using (true) with check (true);
