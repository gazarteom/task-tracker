import { useState } from 'react'
import type { FormEvent } from 'react'
import type { TaskDraft } from '../types/task'

type TaskFormProps = {
  initialValues: TaskDraft
  onSave: (draft: TaskDraft) => void
  onCancel: () => void
}

export function TaskForm(props: TaskFormProps) {
  const [draft, setDraft] = useState(() => ({ ...props.initialValues }))
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = draft.title.trim()
    const description = draft.description.trim()
    if (title.length < 3 || title.length > 100) {
      setError('Название должно содержать от 3 до 100 символов.')
      return
    }
    if (!draft.dueDate) {
      setError('Укажите срок задачи.')
      return
    }
    if (draft.status === 'done' && description.length === 0) {
      setError('Завершённая задача должна иметь непустое описание результата.')
      return
    }
    setError('')
    props.onSave({ ...draft, title, description, tag: draft.tag.trim() })
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="task-title">Название</label>
      <input
        id="task-title"
        value={draft.title}
        required
        onChange={(event) => setDraft({ ...draft, title: event.target.value })}
      />

      <label htmlFor="task-description">Описание</label>
      <textarea
        id="task-description"
        value={draft.description}
        onChange={(event) =>
          setDraft({ ...draft, description: event.target.value })
        }
      />

      <label htmlFor="task-date">Срок</label>
      <input
        id="task-date"
        type="date"
        value={draft.dueDate}
        required
        onChange={(event) => setDraft({ ...draft, dueDate: event.target.value })}
      />

      <label htmlFor="task-status">Статус</label>
      <select
        id="task-status"
        value={draft.status}
        onChange={(event) => {
          const status = event.target.value
          if (status === 'todo' || status === 'in_progress' || status === 'done') {
            setDraft({ ...draft, status })
          }
        }}
      >
        <option value="todo">Запланировано</option>
        <option value="in_progress">В работе</option>
        <option value="done">Готово</option>
      </select>

      <label htmlFor="task-priority">Приоритет</label>
      <select
        id="task-priority"
        value={draft.priority}
        onChange={(event) => {
          const priority = event.target.value
          if (priority === 'low' || priority === 'medium' || priority === 'high') {
            setDraft({ ...draft, priority })
          }
        }}
      >
        <option value="low">Низкий</option>
        <option value="medium">Средний</option>
        <option value="high">Высокий</option>
      </select>

      <label htmlFor="task-tag">Тег</label>
      <input
        id="task-tag"
        value={draft.tag}
        onChange={(event) => setDraft({ ...draft, tag: event.target.value })}
      />

      {error && <p role="alert">{error}</p>}
      <div className="form-actions">
        <button type="submit">Сохранить</button>
        <button type="button" onClick={props.onCancel}>
          Отмена
        </button>
      </div>
    </form>
  )
}
