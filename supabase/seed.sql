insert into public.tags (id, name)
values
  ('study', 'Учёба'),
  ('work', 'Работа'),
  ('home', 'Дом'),
  ('health', 'Здоровье'),
  ('personal', 'Личное')
on conflict (id) do update
set name = excluded.name;
