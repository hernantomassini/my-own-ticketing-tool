alter table public.board enable row level security;

drop policy if exists "owner can do everything" on public.board;

create policy "owner can do everything"
on public.board
for all
to authenticated
using (created_by = (select auth.uid()))
with check (created_by = (select auth.uid()));
