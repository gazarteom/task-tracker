import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import type { Task } from '../types/task'

type TaskDetailsPageProps = {
  tasks: Task[]
  onDelete: (id: string) => Promise<void>
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
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
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

  async function handleDelete() {
    if (!task) return
    if (!window.confirm(`Удалить задачу «${task.title}»?`)) return
    setPending(true)
    setError('')
    try {
      await onDelete(task.id)
      navigate('/tasks', { replace: true })
    } catch (caught: unknown) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'Не удалось удалить задачу.',
      )
      setPending(false)
    }
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
      {error && <p role="alert">{error}</p>}
      <button type="button" onClick={() => void handleDelete()} disabled={pending}>
        {pending ? 'Удаляем…' : 'Удалить'}
      </button>
    </section>
  )
}
