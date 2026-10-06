export type TaskStatus = 'todo' | 'in_progress' | 'done'

export type Task = {
  id: string
  title: string
  description: string
  status: TaskStatus
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  tag: string
}

export type TaskDraft = Omit<Task, 'id'>

