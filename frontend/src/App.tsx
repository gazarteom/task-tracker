import './App.css'

const appTitle: string = 'Task Tracker'

export default function App() {
  return (
    <main className="app">
      <header>
        <h1>{appTitle}</h1>
        <p>Личные задачи, сроки и прогресс.</p>
      </header>
      <section aria-labelledby="items-title">
        <h2 id="items-title">Мои задачи</h2>
        <p>Здесь появится список ваших задач.</p>
      </section>
    </main>
  )
}
