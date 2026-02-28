-- Legacy migration: Radio Hub tables (created previously).
-- NOTE: Radio Hub is not part of the current product; see
-- `20260217000100_remove_radio_hub.sql` which removes these tables.

create table if not exists public.radio_station_state (
  id int primary key default 1 check (id = 1),
  station_name text not null default 'D&V Radio',
  is_live boolean not null default true,
  stream_url text not null default 'https://stream.dvtechnologies.xyz/live',
  title text not null default 'Tech, ICT & Innovation Live',
  description text not null default 'Live technology discussions, ICT trends, and startup insights.',
  updated_at timestamptz not null default now()
);

create table if not exists public.radio_participants (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  role text not null default 'guest',
  is_online boolean not null default true,
  avatar_url text,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.radio_recordings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  audio_url text not null,
  summary text,
  duration_seconds int not null default 0,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.radio_listener_sessions (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  source text not null check (source in ('live', 'recorded')),
  recording_id uuid references public.radio_recordings(id) on delete set null,
  joined_at timestamptz not null default now(),
  last_ping_at timestamptz not null default now(),
  left_at timestamptz
);

create index if not exists idx_radio_listener_sessions_active
  on public.radio_listener_sessions (source, last_ping_at)
  where left_at is null;

create unique index if not exists idx_radio_listener_sessions_session_id
  on public.radio_listener_sessions (session_id);

insert into public.radio_station_state (id)
values (1)
on conflict (id) do nothing;

alter table public.radio_station_state enable row level security;
alter table public.radio_participants enable row level security;
alter table public.radio_recordings enable row level security;
alter table public.radio_listener_sessions enable row level security;

create policy "Radio read public station state"
  on public.radio_station_state
  for select
  using (true);

create policy "Radio read public participants"
  on public.radio_participants
  for select
  using (true);

create policy "Radio read public recordings"
  on public.radio_recordings
  for select
  using (true);

create policy "Radio service role only station write"
  on public.radio_station_state
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Radio service role only participants write"
  on public.radio_participants
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Radio service role only recordings write"
  on public.radio_recordings
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Radio service role only listeners write"
  on public.radio_listener_sessions
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

