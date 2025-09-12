alter table public.ticket enable row level security;

create policy "select tickets of own boards"
  on public.ticket for select
  using (
    exists (
      select 1
      from public.board_list bl
      join public.board b on b.id = bl.board_id
      where bl.id = ticket.list_id
        and b.created_by = auth.uid()
    )
  );

create policy "insert tickets into own boards"
  on public.ticket for insert
  with check (
    exists (
      select 1
      from public.board_list bl
      join public.board b on b.id = bl.board_id
      where bl.id = ticket.list_id
        and b.created_by = auth.uid()
    )
  );

create policy "update tickets of own boards"
  on public.ticket for update
  using (
    exists (
      select 1
      from public.board_list bl
      join public.board b on b.id = bl.board_id
      where bl.id = ticket.list_id
        and b.created_by = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.board_list bl
      join public.board b on b.id = bl.board_id
      where bl.id = ticket.list_id
        and b.created_by = auth.uid()
    )
  );

create policy "delete tickets of own boards"
  on public.ticket for delete
  using (
    exists (
      select 1
      from public.board_list bl
      join public.board b on b.id = bl.board_id
      where bl.id = ticket.list_id
        and b.created_by = auth.uid()
    )
  );
