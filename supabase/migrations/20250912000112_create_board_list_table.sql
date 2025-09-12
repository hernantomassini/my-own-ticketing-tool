create table if not exists public.board_list (
  id          uuid primary key default gen_random_uuid(),
  board_id    uuid not null references public.board(id) on delete cascade,
  title       text not null check (length(btrim(title)) > 0),
  sort_order  int,
  created_at  timestamptz not null default now(),
  unique (board_id, sort_order)
);

create index if not exists board_list_board_idx on public.board_list (board_id, sort_order);
