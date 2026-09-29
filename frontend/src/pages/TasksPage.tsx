import { Link } from 'react-router'
import { TaskCard } from '../components/TaskCard'
import { tasks } from '../data/tasks'

export function TasksPage() {
  return (
    <section>
      <h1>Мои задачи</h1>
      <Link to="/tasks/new">Добавить задачу</Link>
      {tasks.length === 0 ? (
        <p>Задач пока нет.</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  )
}
