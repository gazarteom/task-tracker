import { Link } from 'react-router'
import type { Task } from '../types/task'

type TaskCardProps = { task: Task }

const statusLabel: Record<Task['status'], string> = {
  todo: 'Запланировано',
  in_progress: 'В работе',
  done: 'Готово',
}

const priorityLabel: Record<Task['priority'], string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <article className="task-card">
      <h2>
        <Link to={`/tasks/${task.id}`}>{task.title}</Link>
      </h2>
      <p>{task.description}</p>
      <p>Срок: {task.dueDate}</p>
      <p>Статус: {statusLabel[task.status]}</p>
      <p>Приоритет: {priorityLabel[task.priority]}</p>
    </article>
  )
}
