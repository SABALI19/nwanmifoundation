import { useEffect, useMemo, useState } from 'react'
import {
  Bell,
  Calendar,
  Check,
  Folder,
  HelpCircle,
  Inbox,
  LogOut,
  Menu,
  Plus,
  Settings,
  Trash2,
  User,
  X,
} from 'lucide-react'

const navItems = [
  { label: 'All Tasks', active: true, icon: 'check' },
  { label: 'Today', icon: 'calendar' },
  { label: 'Upcoming', icon: 'inbox' },
  { label: 'Settings', icon: 'settings' },
]

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$/, '')

function Icon({ name, className = 'h-4 w-4' }) {
  const icons = {
    check: Check,
    calendar: Calendar,
    inbox: Inbox,
    settings: Settings,
    bell: Bell,
    user: User,
    plus: Plus,
    folder: Folder,
    logout: LogOut,
    help: HelpCircle,
    menu: Menu,
    close: X,
    trash: Trash2,
  }
  const LucideIcon = icons[name] || HelpCircle

  return <LucideIcon className={className} aria-hidden="true" strokeWidth={2.4} />
}

function Sidebar({ className = '', onClose, onSignOut }) {
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
        <button
          type="button"
          className="flex items-center gap-3 px-5 text-[13px] font-semibold text-slate-600"
          onClick={onSignOut}
        >
          <Icon name="logout" className="h-[18px] w-[18px]" />
          Sign Out
        </button>
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

function UserDashboard({ onSignOut }) {
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

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    onSignOut?.()
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
          <Sidebar className="relative z-10 shadow-2xl" onClose={() => setSidebarOpen(false)} onSignOut={handleSignOut} />
        </div>
      )}

      <div className="flex min-h-screen">
        <Sidebar className="hidden lg:flex" onSignOut={handleSignOut} />

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
