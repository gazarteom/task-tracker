import { NavLink, Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="app">
      <header>
        <p className="app-title">Task Tracker</p>
        <nav aria-label="Основная навигация">
          <NavLink to="/tasks" end>
            Задачи
          </NavLink>
          <NavLink to="/tasks/new">Создать</NavLink>
        </nav>
      </header>
      <main>
        <p className="storage-note">
          Изменения хранятся только в памяти открытой вкладки. После обновления
          страницы вернутся демонстрационные задачи.
        </p>
        <Outlet />
      </main>
    </div>
  )
}
