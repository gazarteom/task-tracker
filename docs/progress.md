# История этапов

## Лабораторная работа 1 — Старт проекта на React и TypeScript

Тема: Task Tracker.

Результат: создан единый репозиторий `course-app` с пакетом `frontend` на Vite + React + TypeScript. Стартовый экран шаблона заменён на экран приложения: заголовок «Task Tracker», описание и пустой раздел «Мои задачи». Удалены логотипы и счётчик Vite. В `index.html` указаны `lang="ru"` и title приложения. Добавлены корневые README, `.gitignore`, `.node-version` и эта запись.

### Проверки

1. `node --version` → `v24.15.0` (зафиксировано в `.node-version` и README).
2. Проект создан командой `npm create vite@latest frontend -- --template react-ts`.
3. `npm run build` должен запускать `tsc -b && vite build` (см. `frontend/package.json`).
4. TypeScript в strict-режиме: если `appTitle` присвоить число вместо строки, сборка падает; после возврата строки сборка проходит.
5. После push на GitHub нужно клонировать чистую копию и выполнить `npm ci`, `npm run build`, `npm run dev` в `frontend`.

Коммит ЛР 1 смотреть командой:

```bash
git log -1 --oneline
```
