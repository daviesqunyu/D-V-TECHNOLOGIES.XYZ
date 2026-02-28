-- Remove legacy Radio Hub tables/policies.
-- These were migrated by mistake and are not part of the current product.

drop table if exists public.radio_listener_sessions cascade;
drop table if exists public.radio_recordings cascade;
drop table if exists public.radio_participants cascade;
drop table if exists public.radio_station_state cascade;

