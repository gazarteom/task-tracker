import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section>
      <h1>Страница не найдена</h1>
      <p>Такого адреса в приложении нет. Вернитесь к списку задач.</p>
      <Link to="/tasks">К списку задач</Link>
    </section>
  )
}
