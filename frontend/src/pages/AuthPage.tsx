import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { supabase } from '../lib/supabase'
import type { AuthState } from '../hooks/useAuth'

type Mode = 'sign-in' | 'sign-up'

export function AuthPage({ auth }: { auth: AuthState }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  if (auth.status === 'authenticated') {
    return <Navigate to="/tasks" replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')
    const trimmedEmail = email.trim()
    if (!trimmedEmail || !password) {
      setError('Укажите email и пароль.')
      return
    }
    if (password.length < 6) {
      setError('Пароль должен содержать не меньше 6 символов.')
      return
    }
    setPending(true)
    try {
      if (mode === 'sign-up') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
          options: { emailRedirectTo: window.location.origin },
        })
        if (signUpError) throw signUpError
        if (data.session) {
          navigate('/tasks', { replace: true })
        } else {
          setMessage('Проверьте почту и подтвердите регистрацию.')
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        })
        if (signInError) throw signInError
        navigate('/tasks', { replace: true })
      }
    } catch (caught: unknown) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'Не удалось выполнить запрос.',
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <section className="app auth-page">
      <h1>{mode === 'sign-in' ? 'Вход' : 'Регистрация'}</h1>
      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="auth-email">Email</label>
        <input
          id="auth-email"
          type="email"
          autoComplete="email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="auth-password">Пароль</label>
        <input
          id="auth-password"
          type="password"
          autoComplete={mode === 'sign-up' ? 'new-password' : 'current-password'}
          value={password}
          required
          minLength={6}
          onChange={(event) => setPassword(event.target.value)}
        />
        {error && <p role="alert">{error}</p>}
        {message && <p role="status">{message}</p>}
        <div className="form-actions">
          <button type="submit" disabled={pending}>
            {pending
              ? 'Подождите…'
              : mode === 'sign-in'
                ? 'Войти'
                : 'Зарегистрироваться'}
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')
              setError('')
              setMessage('')
            }}
          >
            {mode === 'sign-in' ? 'Нет аккаунта' : 'Уже есть аккаунт'}
          </button>
        </div>
      </form>
    </section>
  )
}
