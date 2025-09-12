create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.email,
      'Guest-' || substr(new.id::text, 1, 8)
    )
  )
  on conflict (id) do update
    set display_name = excluded.display_name;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
after update of raw_user_meta_data, email on auth.users
for each row execute function public.handle_new_user();

insert into public.profiles (id, display_name)
select
  u.id,
  coalesce(u.raw_user_meta_data->>'full_name', u.email, 'Guest-' || substr(u.id::text, 1, 8))
from auth.users u
on conflict (id) do nothing;
