import { Link } from 'react-router'

export function NewTaskPage() {
  return (
    <section>
      <h1>Создание задачи</h1>
      <p>
        Форма добавления появится в следующей лабораторной работе. Сейчас
        это заглушка без сохранения данных.
      </p>
      <Link to="/tasks">К списку задач</Link>
    </section>
  )
}
