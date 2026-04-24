import { useEffect, useMemo, useState } from 'react'

const navItems = [
  { label: 'All Tasks', active: true, icon: 'check' },
  { label: 'Today', icon: 'calendar' },
  { label: 'Upcoming', icon: 'inbox' },
  { label: 'Settings', icon: 'settings' },
]

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function Icon({ name, className = 'h-4 w-4' }) {
  const paths = {
    check: 'M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2Z',
    calendar:
      'M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3V2Zm12 8H5v9h14v-9Z',
    inbox:
      'M4 4h16l2 9v7H2v-7l2-9Zm1.6 2-1.33 6H8l1.5 2h5l1.5-2h3.73L18.4 6H5.6Z',
    settings:
      'm19.43 12.98.04-.98-.04-.98 2.11-1.65-2-3.46-2.48 1a8.04 8.04 0 0 0-1.7-.98L15 3.27h-4l-.36 2.66c-.6.24-1.17.57-1.7.98l-2.48-1-2 3.46 2.11 1.65-.04.98.04.98-2.11 1.65 2 3.46 2.48-1c.53.41 1.1.74 1.7.98L11 20.73h4l.36-2.66c.6-.24 1.17-.57 1.7-.98l2.48 1 2-3.46-2.11-1.65ZM13 15.5A3.5 3.5 0 1 1 13 8a3.5 3.5 0 0 1 0 7.5Z',
    bell:
      'M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-6v-5a7 7 0 0 0-5-6.7V3a2 2 0 1 0-4 0v1.3A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2Z',
    user:
      'M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.31 0-6 1.79-6 4v1h12v-1c0-2.21-2.69-4-6-4Z',
    plus: 'M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z',
    folder:
      'M10 4 12 6h8a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h6Z',
    logout:
      'M10 17v2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5v2H5v10h5Zm5.6-1.4L19.2 12l-3.6-3.6L17 7l6 5-6 5-1.4-1.4ZM9 11h10v2H9v-2Z',
    help:
      'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-.1 15.5a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm1.72-5.17c-.68.43-.75.72-.75 1.42h-2c0-1.38.42-2.12 1.5-2.82.7-.45 1.18-.8 1.18-1.55 0-.87-.67-1.43-1.65-1.43-.88 0-1.56.48-1.85 1.33L8.2 8.5c.58-1.58 1.95-2.5 3.77-2.5 2.15 0 3.7 1.3 3.7 3.2 0 1.47-.84 2.32-2.05 3.13Z',
    menu: 'M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z',
    close:
      'm6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5Z',
    trash:
      'M9 3h6l1 2h4v2H4V5h4l1-2Zm-2 6h2v9H7V9Zm4 0h2v9h-2V9Zm4 0h2v9h-2V9ZM6 8h12l-1 13H7L6 8Z',
  }

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d={paths[name]} />
    </svg>
  )
}

function Sidebar({ className = '', onClose }) {
  return (
    <aside className={`flex h-full w-[232px] shrink-0 flex-col border-r border-slate-200 bg-white ${className}`}>
      <div className="flex items-center justify-between px-7 pb-7 pt-4">
        <h1 className="text-[19px] font-extrabold tracking-normal text-slate-950">Momentum</h1>
        {onClose && (
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
            onClick={onClose}
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="px-7">
        <p className="text-[16px] font-extrabold leading-none text-[#465df0]">Momentum</p>
        <p className="mt-2 text-[10px] font-semibold text-slate-500">Productivity Workspace</p>
      </div>

      <nav className="mt-8 space-y-3 px-3">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex h-10 items-center gap-3 rounded-md px-4 text-[13px] font-semibold ${
              item.active ? 'bg-[#eef2fb] text-[#244beb]' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Icon name={item.icon} className="h-[18px] w-[18px]" />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-auto px-3 pb-7">
        <button
          type="button"
          className="mb-9 flex h-12 w-full items-center justify-center gap-3 rounded-md bg-[#465df0] text-[15px] font-bold text-white shadow-lg shadow-indigo-200"
        >
          <Icon name="plus" className="h-5 w-5" />
          New Task
        </button>

        <a href="#" className="mb-5 flex items-center gap-3 px-5 text-[13px] font-semibold text-slate-600">
          <Icon name="help" className="h-[18px] w-[18px]" />
          Help
        </a>
        <a href="#" className="flex items-center gap-3 px-5 text-[13px] font-semibold text-slate-600">
          <Icon name="logout" className="h-[18px] w-[18px]" />
          Sign Out
        </a>
      </div>
    </aside>
  )
}

function TaskItem({ task, onDelete }) {
  return (
    <div className={`flex min-h-[74px] items-center gap-4 rounded-md border border-slate-300 bg-white px-4 ${task.done ? 'opacity-70' : ''}`}>
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
          task.done ? 'border-[#6f86f8] bg-[#6f86f8] text-white' : 'border-slate-300 bg-white'
        }`}
      >
        {task.done && <Icon name="check" className="h-3 w-3" />}
      </span>
      <div className="min-w-0">
        <p className={`text-[15px] font-medium text-slate-800 ${task.done ? 'line-through' : ''}`}>{task.title}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded bg-[#eef2ff] px-2 py-0.5 text-[9px] font-extrabold text-[#244beb]">{task.tag}</span>
          {task.due && <span className="text-[10px] font-bold text-rose-600">{task.due}</span>}
        </div>
      </div>
      <button
        type="button"
        className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-rose-50 hover:text-rose-600"
        aria-label={`Delete ${task.title}`}
        onClick={() => onDelete(task._id)}
      >
        <Icon name="trash" className="h-4 w-4" />
      </button>
    </div>
  )
}

function RightPanel() {
  return (
    <aside className="w-full shrink-0 bg-[#eaf0ff] px-4 py-7 sm:px-6 xl:w-[295px]">
      <h2 className="mb-5 text-[13px] font-extrabold tracking-wide text-slate-800">UPCOMING EVENTS</h2>

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-md bg-[#cddcff] text-[#244beb]">
            <span className="text-[9px] font-extrabold">SEP</span>
            <span className="text-[13px] font-extrabold">24</span>
          </div>
          <div>
            <p className="text-[13px] font-bold text-slate-800">Client Kick-off</p>
            <p className="mt-1 text-[12px] text-slate-600">10:30 AM - 11:30 AM</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-md bg-white text-slate-600">
            <span className="text-[9px] font-extrabold">SEP</span>
            <span className="text-[13px] font-extrabold">25</span>
          </div>
          <div>
            <p className="text-[13px] font-bold text-slate-800">Doctor's Appt.</p>
            <p className="mt-1 text-[12px] text-slate-600">09:00 AM</p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-[#cfe0ff] px-4 py-5">
        <p className="text-[11px] font-extrabold tracking-wide text-slate-600">PRODUCTIVITY QUOTE</p>
        <p className="mt-3 text-[13px] font-semibold italic leading-5 text-slate-700">
          "The secret of getting ahead is getting started."
        </p>
        <p className="mt-2 text-[12px] font-semibold text-[#465df0]">- Mark Twain</p>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl bg-slate-950 shadow-sm">
        <div className="relative h-[148px] bg-[radial-gradient(circle_at_70%_20%,rgba(160,197,255,0.35),transparent_30%),linear-gradient(135deg,#06111a,#142330_60%,#05080d)]">
          <div className="absolute bottom-8 left-7 h-1 w-40 rounded-full bg-slate-800" />
          <div className="absolute bottom-10 left-[92px] h-16 w-20 rounded-sm border-4 border-slate-800 bg-cyan-400/80 shadow-[0_0_25px_rgba(34,211,238,0.5)]" />
          <div className="absolute bottom-8 left-[123px] h-3 w-5 bg-slate-800" />
          <div className="absolute right-8 top-8 h-16 w-1 rounded bg-slate-500" />
          <div className="absolute right-12 top-9 h-7 w-8 rounded-t-full bg-slate-300/80" />
          <div className="absolute inset-x-0 bottom-0 bg-black/55 px-4 py-3 text-[11px] font-extrabold text-white">
            Your Workspace is 80% Optimized
          </div>
        </div>
      </div>
    </aside>
  )
}

function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tasks, setTasks] = useState([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  // Support both token keys while the auth screens are still being wired into this dashboard.
  const token = localStorage.getItem('token') || localStorage.getItem('authToken')

  const completedCount = useMemo(() => tasks.filter((task) => task.done).length, [tasks])
  const nextTask = tasks.find((task) => !task.done)

  const authHeaders = useMemo(
    () => ({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
    [token]
  )

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) {
        setIsLoading(false)
        setError('Sign in to view your tasks.')
        return
      }

      try {
        const response = await fetch(`${API_URL}/api/tasks`, {
          headers: authHeaders,
        })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Could not load tasks')
        }

        setTasks(data.tasks)
        setError('')
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [authHeaders, token])

  const handleCreateTask = async (event) => {
    event.preventDefault()

    const title = newTaskTitle.trim()
    if (!title || !token) return

    setIsSaving(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ title, tag: 'PERSONAL' }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not create task')
      }

      setTasks((currentTasks) => [data.task, ...currentTasks])
      setNewTaskTitle('')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!token) return

    const previousTasks = tasks
    // Remove immediately so the dashboard feels responsive; restore below if the API rejects it.
    setTasks((currentTasks) => currentTasks.filter((task) => task._id !== taskId))

    try {
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: authHeaders,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Could not delete task')
      }
    } catch (err) {
      setTasks(previousTasks)
      setError(err.message)
    }
  }

  const handleMarkAllDone = async () => {
    if (!token) return

    const incompleteTasks = tasks.filter((task) => !task.done)
    // This mirrors the batch request visually; individual failures are surfaced as one dashboard error.
    setTasks((currentTasks) => currentTasks.map((task) => ({ ...task, done: true })))

    try {
      await Promise.all(
        incompleteTasks.map((task) =>
          fetch(`${API_URL}/api/tasks/${task._id}`, {
            method: 'PATCH',
            headers: authHeaders,
            body: JSON.stringify({ done: true }),
          })
        )
      )
    } catch {
      setError('Could not mark all tasks done')
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8ff] text-slate-950">
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/35"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
          />
          <Sidebar className="relative z-10 shadow-2xl" onClose={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex min-h-screen">
        <Sidebar className="hidden lg:flex" />

        <div className="flex min-w-0 flex-1 flex-col xl:flex-row">
          <section className="min-w-0 flex-1 border-r border-slate-200">
            <header className="flex h-[66px] items-center justify-between border-b border-slate-200 bg-white px-4 text-slate-500 sm:px-6 lg:justify-end lg:gap-7 lg:px-8">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 lg:hidden"
                aria-label="Open sidebar"
                onClick={() => setSidebarOpen(true)}
              >
                <Icon name="menu" className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-5 sm:gap-7">
                <Icon name="bell" className="h-5 w-5" />
                <Icon name="user" className="h-5 w-5" />
              </div>
            </header>

            <div className="mx-auto max-w-[610px] px-4 py-8 sm:px-6 sm:py-12">
              <div className="mb-8 sm:mb-10">
                <h2 className="text-[26px] font-extrabold leading-tight tracking-normal text-slate-950 sm:text-[30px]">
                  Good morning, Alex.
                </h2>
                <p className="mt-2 text-[15px] font-medium text-slate-600 sm:mt-3">
                  You have {tasks.filter((task) => !task.done).length} tasks to focus on today.
                </p>
              </div>

              <form
                className="flex h-[66px] items-center gap-3 rounded-lg border border-slate-300 bg-white px-3 shadow-sm sm:gap-4 sm:px-4"
                onSubmit={handleCreateTask}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-500 text-white">
                  <Icon name="plus" className="h-4 w-4" />
                </span>
                <input
                  className="min-w-0 flex-1 bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
                  placeholder="Create a new task..."
                  value={newTaskTitle}
                  onChange={(event) => setNewTaskTitle(event.target.value)}
                  disabled={!token || isSaving}
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#465df0] text-white disabled:cursor-not-allowed disabled:bg-slate-300"
                  aria-label="Create task"
                  disabled={!newTaskTitle.trim() || !token || isSaving}
                >
                  <Icon name="plus" className="h-5 w-5" />
                </button>
              </form>
              {error && <p className="mt-3 text-[13px] font-semibold text-rose-600">{error}</p>}

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
                <div className="rounded-lg border border-slate-300/70 bg-[#eef3ff] p-4">
                  <p className="text-[10px] font-extrabold text-slate-500">COMPLETED</p>
                  <p className="mt-2 text-[19px] font-extrabold text-[#244beb]">
                    {completedCount}/{tasks.length}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-300/70 bg-[#eef3ff] p-4">
                  <p className="text-[10px] font-extrabold text-slate-500">NEXT UP</p>
                  <p className="mt-2 text-[15px] font-semibold text-slate-800">
                    {nextTask ? nextTask.title : 'No pending tasks'}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-300/70 bg-[#eef3ff] p-4">
                  <p className="text-[10px] font-extrabold text-slate-500">EFFICIENCY</p>
                  <p className="mt-2 text-[15px] font-semibold text-slate-800">
                    {tasks.length ? `${Math.round((completedCount / tasks.length) * 100)}%` : '0%'}
                  </p>
                </div>
              </div>

              <div className="mt-9 mb-4 flex items-center justify-between">
                <h3 className="text-[13px] font-extrabold tracking-wide text-slate-800">TODAY'S FOCUS</h3>
                <button type="button" className="text-[11px] font-bold text-[#244beb]" onClick={handleMarkAllDone}>
                  Mark all done
                </button>
              </div>

              <div className="space-y-2">
                {isLoading && <p className="text-[13px] font-semibold text-slate-500">Loading tasks...</p>}
                {!isLoading && tasks.length === 0 && (
                  <p className="rounded-md border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-[13px] font-semibold text-slate-500">
                    No tasks yet.
                  </p>
                )}
                {!isLoading &&
                  tasks.map((task) => <TaskItem key={task._id} task={task} onDelete={handleDeleteTask} />)}
              </div>

              <p className="mt-9 text-center text-[12px] font-medium text-slate-300">
                You've reached the end of your list. Keep the momentum!
              </p>
            </div>
          </section>

          <RightPanel />
        </div>
      </div>
    </main>
  )
}

export default UserDashboard
