-- Add optional card metadata from Paystack (last4, brand, expiry only - no PAN/CVV per PCI)
alter table public.payment_records
  add column if not exists card_last4 text,
  add column if not exists card_brand text,
  add column if not exists card_expiry_month text,
  add column if not exists card_expiry_year text;

comment on column public.payment_records.card_last4 is 'Last 4 digits of card (from Paystack); never store full number or CVV';
