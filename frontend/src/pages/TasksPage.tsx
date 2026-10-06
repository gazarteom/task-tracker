import { useState } from 'react'
import { Link } from 'react-router'
import { TaskCard } from '../components/TaskCard'
import type { Task, TaskStatus } from '../types/task'

type TasksPageProps = { tasks: Task[] }

export function TasksPage({ tasks }: TasksPageProps) {
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
      {tasks.length === 0 ? (
        <p>Задач пока нет.</p>
      ) : visibleTasks.length === 0 ? (
        <p>Нет задач с выбранным статусом.</p>
      ) : (
        <div className="task-list">
          {visibleTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  )
}
