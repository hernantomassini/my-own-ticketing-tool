alter table public.board_list enable row level security;

create policy "select lists of own boards"
  on public.board_list for select
  using (
    exists (
      select 1 from public.board b
      where b.id = board_list.board_id
        and b.created_by = auth.uid()
    )
  );

create policy "insert lists into own boards"
  on public.board_list for insert
  with check (
    exists (
      select 1 from public.board b
      where b.id = board_list.board_id
        and b.created_by = auth.uid()
    )
  );

create policy "update lists of own boards"
  on public.board_list for update
  using (
    exists (
      select 1 from public.board b
      where b.id = board_list.board_id
        and b.created_by = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.board b
      where b.id = board_list.board_id
        and b.created_by = auth.uid()
    )
  );

create policy "delete lists of own boards"
  on public.board_list for delete
  using (
    exists (
      select 1 from public.board b
      where b.id = board_list.board_id
        and b.created_by = auth.uid()
    )
  );
