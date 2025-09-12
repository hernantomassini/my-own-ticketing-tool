drop table if exists public.ticket cascade;

create table public.ticket (
  id           uuid primary key default gen_random_uuid(),
  list_id      uuid not null,
  title        text not null check (length(btrim(title)) > 0),
  description  text,
  assigned_to  uuid,
  sort_order   int  not null,
  created_by   uuid not null default auth.uid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  constraint ticket_list_fk
    foreign key (list_id) references public.board_list(id) on delete cascade,

  constraint ticket_assigned_to_profiles_fk
    foreign key (assigned_to) references public.profiles(id) on delete set null,

  constraint ticket_created_by_user_fk
    foreign key (created_by) references auth.users(id) on delete cascade,

  constraint ticket_list_sort_order_uniq
    unique (list_id, sort_order)
);

create index if not exists idx_ticket_list_sort on public.ticket (list_id, sort_order);
create index if not exists idx_ticket_assigned_to on public.ticket (assigned_to);
