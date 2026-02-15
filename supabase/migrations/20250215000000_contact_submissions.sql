-- Contact form submissions for D&V Technologies (dvtechnologies.xyz)
-- Only backend (Edge Function with service role) inserts; frontend calls Edge Function.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  created_at timestamptz default now()
);

alter table public.contact_submissions enable row level security;

-- Only service role can insert/select (Edge Function uses service role)
create policy "Service role only"
  on public.contact_submissions
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

comment on table public.contact_submissions is 'Contact form submissions from dvtechnologies.xyz';
