import { useNavigate } from 'react-router'
import { TaskForm } from '../components/TaskForm'
import type { TaskDraft } from '../types/task'

type NewTaskPageProps = {
  onCreate: (draft: TaskDraft) => Promise<string>
}

const emptyTask: TaskDraft = {
  title: '',
  description: '',
  status: 'todo',
  dueDate: '',
  priority: 'medium',
  tag: '',
}

export function NewTaskPage({ onCreate }: NewTaskPageProps) {
  const navigate = useNavigate()

  async function handleSave(draft: TaskDraft) {
    const id = await onCreate(draft)
    navigate(`/tasks/${id}`)
  }

  return (
    <section>
      <h1>Создание задачи</h1>
      <TaskForm
        initialValues={emptyTask}
        onSave={handleSave}
        onCancel={() => navigate('/tasks')}
      />
    </section>
  )
}
