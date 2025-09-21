create or replace function public.ticket_set_sort_order()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.sort_order is null then
    perform pg_catalog.pg_advisory_xact_lock(
      pg_catalog.hashtextextended(new.list_id::text, 0)
    );

    select coalesce(max(t.sort_order), 0) + 100
      into new.sort_order
      from public.ticket t
     where t.list_id = new.list_id;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_ticket_set_sort_order on public.ticket;
create trigger trg_ticket_set_sort_order
before insert on public.ticket
for each row
execute function public.ticket_set_sort_order();

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
