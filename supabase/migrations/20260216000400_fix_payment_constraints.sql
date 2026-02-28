alter table public.payment_records
  drop constraint if exists check_amount_positive;

alter table public.payment_records
  add constraint check_amount_positive
  check (amount > 0);

create index if not exists idx_contact_submissions_created_at
  on public.contact_submissions (created_at desc);

create index if not exists idx_payment_records_created_at
  on public.payment_records (created_at desc);

create index if not exists idx_newsletter_subscribers_created_at
  on public.newsletter_subscribers (created_at desc);
