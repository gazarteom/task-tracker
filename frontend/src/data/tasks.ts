import type { Task } from '../types/task'

export const tasks: Task[] = [
  {
    id: 't1',
    title: 'Подготовить план проекта',
    description: 'Описать основной сценарий приложения Task Tracker и список полей задачи.',
    status: 'todo',
    dueDate: '2026-10-01',
    priority: 'high',
    tag: 'Учёба',
  },
  {
    id: 't2',
    title: 'Собрать каркас на Vite',
    description: 'Создать frontend, проверить типы и сохранить проект в Git.',
    status: 'done',
    dueDate: '2026-09-16',
    priority: 'high',
    tag: 'Учёба',
  },
  {
    id: 't3',
    title: 'Добавить страницы и навигацию',
    description: 'Сделать список задач, карточку по id и заглушку создания через React Router.',
    status: 'in_progress',
    dueDate: '2026-09-30',
    priority: 'high',
    tag: 'Учёба',
  },
  {
    id: 't4',
    title: 'Повторить конспект по TypeScript',
    description: 'Разобрать union-типы статуса и приоритета перед лабораторной с формами.',
    status: 'todo',
    dueDate: '2026-10-05',
    priority: 'medium',
    tag: 'Повтор',
  },
  {
    id: 't5',
    title: 'Купить тетрадь для лекций',
    description: 'Нужна тонкая тетрадь в клетку, чтобы записывать команды запуска проекта.',
    status: 'todo',
    dueDate: '2026-10-08',
    priority: 'low',
    tag: 'Быт',
  },
]
