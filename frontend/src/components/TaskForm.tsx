import { useState } from 'react'
import type { FormEvent } from 'react'
import type { TaskDraft } from '../types/task'
import { useTags } from '../hooks/useTags'

type TaskFormProps = {
  initialValues: TaskDraft
  onSave: (draft: TaskDraft) => void
  onCancel: () => void
}

export function TaskForm(props: TaskFormProps) {
  const [draft, setDraft] = useState(() => ({ ...props.initialValues }))
  const [error, setError] = useState('')
  const { load, retry } = useTags()
  const tags = load.status === 'success' ? load.data : []
  const selectedTagExists = tags.some((tag) => tag.id === draft.tag)
  const canSave = load.status === 'success' && selectedTagExists

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSave) {
      setError('Дождитесь справочника и выберите доступный тег.')
      return
    }
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
    props.onSave({ ...draft, title, description, tag: draft.tag })
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
      <select
        id="task-tag"
        value={draft.tag}
        required
        disabled={load.status !== 'success' || tags.length === 0}
        onChange={(event) => setDraft({ ...draft, tag: event.target.value })}
      >
        <option value="">Выберите тег</option>
        {draft.tag !== '' && !selectedTagExists && (
          <option value={draft.tag} disabled>
            Текущий код: {draft.tag} — выберите доступный тег
          </option>
        )}
        {tags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>
      {load.status === 'loading' && <p role="status">Загружаем теги…</p>}
      {load.status === 'error' && (
        <div>
          <p role="alert">{load.message}</p>
          <button type="button" onClick={retry}>
            Повторить
          </button>
        </div>
      )}
      {load.status === 'success' && tags.length === 0 && (
        <div>
          <p role="status">Тегов пока нет. Сохранение недоступно.</p>
          <button type="button" onClick={retry}>
            Повторить
          </button>
        </div>
      )}
      {load.status === 'success' &&
        tags.length > 0 &&
        draft.tag !== '' &&
        !selectedTagExists && (
          <p role="status">Выберите доступный тег из списка.</p>
        )}
      {load.status === 'success' && (
        <button type="button" onClick={retry}>
          Обновить справочник
        </button>
      )}

      {error && <p role="alert">{error}</p>}
      <div className="form-actions">
        <button type="submit" disabled={!canSave}>
          Сохранить
        </button>
        <button type="button" onClick={props.onCancel}>
          Отмена
        </button>
      </div>
    </form>
  )
}
