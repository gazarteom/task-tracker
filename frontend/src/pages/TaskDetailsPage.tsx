import { Link, useNavigate, useParams } from 'react-router'
import type { Task } from '../types/task'

type TaskDetailsPageProps = {
  tasks: Task[]
  onDelete: (id: string) => void
}

const statusLabel = {
  todo: 'Запланировано',
  in_progress: 'В работе',
  done: 'Готово',
} as const

const priorityLabel = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
} as const

export function TaskDetailsPage({ tasks, onDelete }: TaskDetailsPageProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const task = tasks.find((item) => item.id === id)

  if (!task) {
    return (
      <section>
        <h1>Задача не найдена</h1>
        <p>Записи с таким адресом нет.</p>
        <Link to="/tasks">К списку задач</Link>
      </section>
    )
  }

  return (
    <section>
      <h1>{task.title}</h1>
      <p>{task.description || 'Описание не указано.'}</p>
      <p>Срок: {task.dueDate}</p>
      <p>Статус: {statusLabel[task.status]}</p>
      <p>Приоритет: {priorityLabel[task.priority]}</p>
      <p>Тег: {task.tag || '—'}</p>
      <p className="details-actions">
        <Link to={`/tasks/${task.id}/edit`}>Редактировать</Link>
        <Link to="/tasks">К списку задач</Link>
      </p>
      <button
        type="button"
        onClick={() => {
          if (window.confirm(`Удалить задачу «${task.title}»?`)) {
            onDelete(task.id)
            navigate('/tasks', { replace: true })
          }
        }}
      >
        Удалить
      </button>
    </section>
  )
}
