alter table public.tasks
  alter column owner_id set default auth.uid();

revoke all on table public.tasks from anon, authenticated;
grant select, insert, update, delete
  on table public.tasks to authenticated;

create policy "tasks select own"
on public.tasks for select to authenticated
using ((select auth.uid()) is not null
  and (select auth.uid()) = owner_id);

create policy "tasks insert own"
on public.tasks for insert to authenticated
with check ((select auth.uid()) is not null
  and (select auth.uid()) = owner_id);

create policy "tasks update own"
on public.tasks for update to authenticated
using ((select auth.uid()) is not null
  and (select auth.uid()) = owner_id)
with check ((select auth.uid()) is not null
  and (select auth.uid()) = owner_id);

create policy "tasks delete own"
on public.tasks for delete to authenticated
using ((select auth.uid()) is not null
  and (select auth.uid()) = owner_id);
