-- Newsletter subscribers for dvtechnologies.xyz

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz default now()
);

create index if not exists idx_newsletter_subscribers_email on public.newsletter_subscribers (email);

alter table public.newsletter_subscribers enable row level security;

create policy "Service role only for newsletter_subscribers"
  on public.newsletter_subscribers
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

comment on table public.newsletter_subscribers is 'Newsletter signups from dvtechnologies.xyz';
