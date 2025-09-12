create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = pg_catalog.now();
  return new;
end;
$$;

drop trigger if exists trg_ticket_updated_at on public.ticket;
create trigger trg_ticket_updated_at
before update on public.ticket
for each row execute function public.set_updated_at();
