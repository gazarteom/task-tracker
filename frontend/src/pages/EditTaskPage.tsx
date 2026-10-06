import { Link, useNavigate, useParams } from 'react-router'
import { TaskForm } from '../components/TaskForm'
import type { Task, TaskDraft } from '../types/task'

type EditTaskPageProps = {
  tasks: Task[]
  onUpdate: (id: string, draft: TaskDraft) => void
}

export function EditTaskPage({ tasks, onUpdate }: EditTaskPageProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const task = tasks.find((item) => item.id === id)

  if (!task) {
    return (
      <section>
        <h1>Задача не найдена</h1>
        <Link to="/tasks">К списку</Link>
      </section>
    )
  }

  const initialValues: TaskDraft = {
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate,
    priority: task.priority,
    tag: task.tag,
  }

  return (
    <section>
      <h1>Редактирование задачи</h1>
      <TaskForm
        key={task.id}
        initialValues={initialValues}
        onSave={(draft) => {
          onUpdate(task.id, draft)
          navigate(`/tasks/${task.id}`)
        }}
        onCancel={() => navigate(`/tasks/${task.id}`)}
      />
    </section>
  )
}
