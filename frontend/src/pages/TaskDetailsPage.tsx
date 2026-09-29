import { Link, useParams } from 'react-router'
import { tasks } from '../data/tasks'

const statusLabel = {
  todo: 'К выполнению',
  in_progress: 'В работе',
  done: 'Готово',
} as const

const priorityLabel = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
} as const

export function TaskDetailsPage() {
  const { id } = useParams()
  const task = tasks.find((item) => item.id === id)

  if (!task) {
    return (
      <section>
        <h1>Задача не найдена</h1>
        <p>Записи с таким адресом нет в демонстрационном списке.</p>
        <Link to="/tasks">К списку задач</Link>
      </section>
    )
  }

  return (
    <section>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Срок: {task.dueDate}</p>
      <p>Статус: {statusLabel[task.status]}</p>
      <p>Приоритет: {priorityLabel[task.priority]}</p>
      <p>Тег: {task.tag}</p>
      <Link to="/tasks">К списку задач</Link>
    </section>
  )
}
