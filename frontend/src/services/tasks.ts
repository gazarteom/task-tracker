import { supabase } from '../lib/supabase'
import type { Task, TaskDraft, TaskStatus } from '../types/task'

type TaskRow = {
  id: string
  owner_id: string
  tag_id: string
  title: string
  description: string
  status: TaskStatus
  due_date: string
  priority: Task['priority']
  created_at: string
}

const taskColumns =
  'id, owner_id, tag_id, title, description, status, due_date, priority, created_at'

function fromRow(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    dueDate: row.due_date,
    priority: row.priority,
    tag: row.tag_id,
  }
}

function toWrite(draft: TaskDraft) {
  return {
    tag_id: draft.tag,
    title: draft.title.trim(),
    description: draft.description.trim(),
    status: draft.status,
    due_date: draft.dueDate,
    priority: draft.priority,
  }
}

export async function getTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select(taskColumns)
    .order('created_at', { ascending: false })
    .overrideTypes<TaskRow[], { merge: false }>()

  if (error) throw new Error(`Не удалось загрузить задачи: ${error.message}`)
  return data.map(fromRow)
}

export async function createTask(draft: TaskDraft): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .insert(toWrite(draft))
    .select(taskColumns)
    .single()
    .overrideTypes<TaskRow, { merge: false }>()

  if (error) throw new Error(`Не удалось создать задачу: ${error.message}`)
  return fromRow(data)
}

export async function updateTask(id: string, draft: TaskDraft): Promise<void> {
  const { error } = await supabase
    .from('tasks')
    .update(toWrite(draft))
    .eq('id', id)
  if (error) throw new Error(`Не удалось изменить задачу: ${error.message}`)
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if (error) throw new Error(`Не удалось удалить задачу: ${error.message}`)
}
