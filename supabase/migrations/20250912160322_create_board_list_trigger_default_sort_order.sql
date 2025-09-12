create or replace function public.board_list_set_sort_order()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.sort_order is null then

    perform pg_catalog.pg_advisory_xact_lock(
      pg_catalog.hashtextextended(new.board_id::text, 0)
    );

    select coalesce(max(bl.sort_order), 0) + 100
      into new.sort_order
      from public.board_list bl
     where bl.board_id = new.board_id;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_board_list_set_sort_order on public.board_list;

create trigger trg_board_list_set_sort_order
before insert on public.board_list
for each row
execute function public.board_list_set_sort_order();
