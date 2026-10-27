import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { AppLayout } from './app/AppLayout'
import { RequireAuth } from './components/RequireAuth'
import { AuthPage } from './pages/AuthPage'
import { TasksPage } from './pages/TasksPage'
import { TaskDetailsPage } from './pages/TaskDetailsPage'
import { NewTaskPage } from './pages/NewTaskPage'
import { EditTaskPage } from './pages/EditTaskPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { useAuth } from './hooks/useAuth'
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from './services/tasks'
import { supabase } from './lib/supabase'
import type { Task, TaskDraft } from './types/task'
import './App.css'

type TasksLoad =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success' }

export default function App() {
  const auth = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [tasksLoad, setTasksLoad] = useState<TasksLoad>({ status: 'idle' })
  const userId =
    auth.status === 'authenticated' ? auth.session.user.id : null

  async function reloadTasks() {
    const next = await getTasks()
    setTasks(next)
    setTasksLoad({ status: 'success' })
  }

  useEffect(() => {
    if (auth.status === 'checking') return
    if (!userId) {
      setTasks([])
      setTasksLoad({ status: 'idle' })
      return
    }
    let active = true
    setTasks([])
    setTasksLoad({ status: 'loading' })
    getTasks()
      .then((next) => {
        if (!active) return
        setTasks(next)
        setTasksLoad({ status: 'success' })
      })
      .catch((error: unknown) => {
        if (!active) return
        setTasks([])
        setTasksLoad({
          status: 'error',
          message:
            error instanceof Error
              ? error.message
              : 'Не удалось загрузить задачи.',
        })
      })
    return () => {
      active = false
    }
  }, [userId, auth.status])

  async function handleCreate(draft: TaskDraft): Promise<string> {
    const task = await createTask(draft)
    await reloadTasks()
    return task.id
  }

  async function handleUpdate(id: string, draft: TaskDraft): Promise<void> {
    await updateTask(id, draft)
    await reloadTasks()
  }

  async function handleDelete(id: string): Promise<void> {
    await deleteTask(id)
    await reloadTasks()
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut({ scope: 'local' })
    if (error) throw error
    setTasks([])
    setTasksLoad({ status: 'idle' })
  }

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage auth={auth} />} />
      <Route element={<RequireAuth auth={auth} />}>
        <Route
          element={
            <AppLayout
              email={
                auth.status === 'authenticated' ? auth.session.user.email : ''
              }
              onSignOut={handleSignOut}
            />
          }
        >
          <Route index element={<Navigate to="/tasks" replace />} />
          <Route
            path="tasks"
            element={
              <TasksPage
                tasks={tasks}
                load={tasksLoad}
                onRetry={() => {
                  setTasksLoad({ status: 'loading' })
                  void reloadTasks().catch((error: unknown) => {
                    setTasksLoad({
                      status: 'error',
                      message:
                        error instanceof Error
                          ? error.message
                          : 'Не удалось загрузить задачи.',
                    })
                  })
                }}
              />
            }
          />
          <Route
            path="tasks/new"
            element={<NewTaskPage onCreate={handleCreate} />}
          />
          <Route
            path="tasks/:id"
            element={
              <TaskDetailsPage tasks={tasks} onDelete={handleDelete} />
            }
          />
          <Route
            path="tasks/:id/edit"
            element={
              <EditTaskPage tasks={tasks} onUpdate={handleUpdate} />
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
