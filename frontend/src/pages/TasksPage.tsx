import { useState } from 'react'
import { Link } from 'react-router'
import { TaskCard } from '../components/TaskCard'
import type { Task, TaskStatus } from '../types/task'

type TasksLoad =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success' }

type TasksPageProps = {
  tasks: Task[]
  load: TasksLoad
  onRetry: () => void
}

export function TasksPage({ tasks, load, onRetry }: TasksPageProps) {
  const [status, setStatus] = useState<TaskStatus | 'all'>('all')
  const visibleTasks = tasks.filter(
    (task) => status === 'all' || task.status === status,
  )

  return (
    <section>
      <h1>Мои задачи</h1>
      <Link to="/tasks/new">Добавить задачу</Link>
      <div className="filter-row">
        <label htmlFor="status-filter">Статус</label>
        <select
          id="status-filter"
          value={status}
          onChange={(event) => {
            const next = event.target.value
            if (
              next === 'all' ||
              next === 'todo' ||
              next === 'in_progress' ||
              next === 'done'
            ) {
              setStatus(next)
            }
          }}
        >
          <option value="all">Все</option>
          <option value="todo">Запланировано</option>
          <option value="in_progress">В работе</option>
          <option value="done">Готово</option>
        </select>
        <button type="button" onClick={() => setStatus('all')}>
          Сбросить фильтр
        </button>
      </div>
      {load.status === 'loading' && <p role="status">Загружаем задачи…</p>}
      {load.status === 'error' && (
        <div>
          <p role="alert">{load.message}</p>
          <button type="button" onClick={onRetry}>
            Повторить
          </button>
        </div>
      )}
      {load.status === 'success' && tasks.length === 0 && <p>Задач пока нет.</p>}
      {load.status === 'success' &&
        tasks.length > 0 &&
        visibleTasks.length === 0 && <p>Нет задач с выбранным статусом.</p>}
      {load.status === 'success' && visibleTasks.length > 0 && (
        <div className="task-list">
          {visibleTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  )
}
