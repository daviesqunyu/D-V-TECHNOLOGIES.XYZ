-- Payment records for dvtechnologies.xyz
-- Stores M-Pesa STK push attempts and Bitcoin payment intents

create table if not exists public.payment_records (
  id uuid primary key default gen_random_uuid(),
  method text not null check (method in ('mpesa', 'btc')),
  plan text not null,
  amount numeric not null,
  phone text,
  email text,
  name text,
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed', 'cancelled')),
  checkout_request_id text,
  error_message text,
  created_at timestamptz default now()
);

create index if not exists idx_payment_records_created_at on public.payment_records (created_at desc);
create index if not exists idx_payment_records_status on public.payment_records (status);
create index if not exists idx_payment_records_method on public.payment_records (method);

alter table public.payment_records enable row level security;

create policy "Service role only for payment_records"
  on public.payment_records
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

comment on table public.payment_records is 'Payment intents and records from dvtechnologies.xyz frontend';
