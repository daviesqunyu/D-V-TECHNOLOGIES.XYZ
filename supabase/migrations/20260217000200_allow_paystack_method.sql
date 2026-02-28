-- Allow Paystack (hosted checkout) to be stored in payment_records.

alter table public.payment_records
  drop constraint if exists payment_records_method_check;

alter table public.payment_records
  add constraint payment_records_method_check
  check (method in ('mpesa', 'btc', 'paystack', 'card'));

