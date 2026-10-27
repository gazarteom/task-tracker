import { NavLink, Outlet } from 'react-router'

type AppLayoutProps = {
  email?: string | null
  onSignOut: () => Promise<void>
}

export function AppLayout({ email, onSignOut }: AppLayoutProps) {
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
        <p className="account-row">
          <span>{email || 'Аккаунт'}</span>
          <button type="button" onClick={() => void onSignOut()}>
            Выйти
          </button>
        </p>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
