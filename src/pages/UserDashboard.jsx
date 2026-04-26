import { useEffect, useMemo, useRef, useState } from 'react'
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
  { id: 'all', label: 'All Tasks', icon: 'check' },
  { id: 'today', label: 'Today', icon: 'calendar' },
  { id: 'upcoming', label: 'Upcoming', icon: 'inbox' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
]

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$/, '')

const getTodayDate = () => new Date().toISOString().slice(0, 10)

const formatDue = (due) => {
  if (!due) return ''

  const parsedDate = new Date(due)
  if (Number.isNaN(parsedDate.getTime())) return due

  return parsedDate.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

const isTaskDueToday = (task) => task.due?.startsWith(getTodayDate())

const isTaskUpcoming = (task) => {
  if (!task.due) return false

  const parsedDate = new Date(task.due)
  if (Number.isNaN(parsedDate.getTime())) return false

  return parsedDate >= new Date()
}

const getGreeting = () => {
  const hour = new Date().getHours()

  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

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

function Sidebar({ activeView, className = '', isNewTaskActive, onClose, onNewTask, onSignOut, onViewChange }) {
  const handleViewChange = (viewId) => {
    onViewChange(viewId)
    onClose?.()
  }

  return (
    <aside className={`flex h-full w-[232px] shrink-0 flex-col border-r border-slate-200 bg-white ${className}`}>
      <div className="flex items-center justify-between px-7 pb-7 pt-4">
       <div className='flex-wrap'>
         <h1 className="text-[19px] font-extrabold tracking-normal text-amber-300">AGUNWAMI</h1>
        <p  className="text-[14px] font-extrabold tracking-normal  text-amber-500">ENTERPRISE</p>
       </div>
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
        <p className="text-[16px] font-extrabold leading-none text-[#465df0]">Samuel Edward</p>
        <p className="mt-2 text-[10px] font-semibold text-slate-500">Productivity Workspace</p>
      </div>

      <nav className="mt-8 space-y-3 px-3">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`flex h-10 w-full items-center gap-3 rounded-md px-4 text-left text-[13px] font-semibold ${
              activeView === item.id ? 'bg-[#eef2fb] text-[#244beb]' : 'text-slate-600 hover:bg-slate-50'
            }`}
            onClick={() => handleViewChange(item.id)}
          >
            <Icon name={item.icon} className="h-[18px] w-[18px]" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto px-3 pb-7">
        <button
          type="button"
          className={`mb-9 flex h-12 w-full items-center justify-center gap-3 rounded-md text-[15px] font-bold shadow-lg transition ${
            isNewTaskActive
              ? 'bg-[#244beb] text-white shadow-indigo-300 ring-4 ring-indigo-100'
              : 'bg-[#465df0] text-white shadow-indigo-200 hover:bg-[#344be0]'
          }`}
          onClick={() => {
            onNewTask()
            onClose?.()
          }}
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

function TaskItem({ task, onDelete, onToggle }) {
  return (
    <div className={`flex min-h-[74px] items-center gap-4 rounded-md border border-slate-300 bg-white px-4 ${task.done ? 'opacity-70' : ''}`}>
      <button
        type="button"
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition focus:outline-none focus:ring-4 focus:ring-indigo-100 ${
          task.done ? 'border-[#6f86f8] bg-[#6f86f8] text-white' : 'border-slate-300 bg-white'
        }`}
        aria-label={task.done ? `Mark ${task.title} incomplete` : `Mark ${task.title} complete`}
        onClick={() => onToggle(task)}
      >
        {task.done && <Icon name="check" className="h-3 w-3" />}
      </button>
      <div className="min-w-0">
        <p className={`text-[15px] font-medium text-slate-800 ${task.done ? 'line-through' : ''}`}>{task.title}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded bg-[#eef2ff] px-2 py-0.5 text-[9px] font-extrabold text-[#244beb]">{task.tag}</span>
          {task.due && <span className="text-[10px] font-bold text-rose-600">Due {formatDue(task.due)}</span>}
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

function RightPanel({ upcomingTasks }) {
  return (
    <aside className="w-full shrink-0 bg-[#eaf0ff] px-4 py-7 sm:px-6 xl:w-[295px]">
      <h2 className="mb-5 text-[13px] font-extrabold tracking-wide text-slate-800">UPCOMING EVENTS</h2>

      {upcomingTasks.length > 0 ? (
        <div className="space-y-4">
          {upcomingTasks.map((task, index) => (
            <div key={task._id} className="flex gap-4">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${
                  index === 0 ? 'bg-[#cddcff] text-[#244beb]' : 'bg-white text-slate-600'
                }`}
              >
                <Icon name="calendar" className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-bold text-slate-800">{task.title}</p>
                <p className="mt-1 text-[12px] text-slate-600">{formatDue(task.due)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-md border border-dashed border-slate-300 bg-white/70 px-4 py-6 text-center text-[13px] font-semibold text-slate-500">
          No upcoming events yet.
        </p>
      )}
    </aside>
  )
}

function UserDashboard({ onSignOut }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeView, setActiveView] = useState('all')
  const [isNewTaskActive, setIsNewTaskActive] = useState(false)
  const [tasks, setTasks] = useState([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDate, setNewTaskDate] = useState('')
  const [newTaskTime, setNewTaskTime] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || {}
    } catch {
      return {}
    }
  })
  const taskInputRef = useRef(null)
  const taskDateRef = useRef(null)
  const taskTimeRef = useRef(null)
  const firstName = user.fullName?.split(' ')[0] || user.email?.split('@')[0] || 'there'
  const greeting = getGreeting()
  // Support both token keys while the auth screens are still being wired into this dashboard.
  const token = localStorage.getItem('token') || localStorage.getItem('authToken')

  const completedCount = useMemo(() => tasks.filter((task) => task.done).length, [tasks])
  const nextTask = tasks.find((task) => !task.done)
  const upcomingTasks = useMemo(
    () => tasks.filter((task) => isTaskUpcoming(task) && !task.done).slice(0, 5),
    [tasks]
  )
  const visibleTasks = useMemo(() => {
    if (activeView === 'today') {
      return tasks.filter((task) => !task.done && isTaskDueToday(task))
    }

    if (activeView === 'upcoming') {
      return tasks.filter((task) => !task.done && isTaskUpcoming(task))
    }

    return tasks
  }, [activeView, tasks])
  const viewTitle = {
    all: "TODAY'S FOCUS",
    today: 'TODAY',
    upcoming: 'UPCOMING',
    settings: 'SETTINGS',
  }[activeView]

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

    if (!newTaskDate || !newTaskTime) {
      setError('Choose due date and due time before creating a task.')
      setIsNewTaskActive(true)

      if (!newTaskDate) {
        taskDateRef.current?.focus()
        return
      }

      taskTimeRef.current?.focus()
      return
    }

    setIsSaving(true)
    setError('')

    try {
      const due = `${newTaskDate}T${newTaskTime}`
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ title, tag: 'PERSONAL', due }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not create task')
      }

      setTasks((currentTasks) => [data.task, ...currentTasks])
      setNewTaskTitle('')
      setNewTaskDate('')
      setNewTaskTime('')
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

  const handleToggleTask = async (taskToUpdate) => {
    if (!token) return

    const nextDone = !taskToUpdate.done
    const previousTasks = tasks
    setError('')
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task._id === taskToUpdate._id ? { ...task, done: nextDone } : task))
    )

    try {
      const response = await fetch(`${API_URL}/api/tasks/${taskToUpdate._id}`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ done: nextDone }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not update task')
      }

      setTasks((currentTasks) =>
        currentTasks.map((task) => (task._id === taskToUpdate._id ? data.task : task))
      )
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

  const handleNewTaskFocus = () => {
    setActiveView('all')
    window.setTimeout(() => taskInputRef.current?.focus(), 0)
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
          <Sidebar
            activeView={activeView}
            className="relative z-10 shadow-2xl"
            isNewTaskActive={isNewTaskActive}
            onClose={() => setSidebarOpen(false)}
            onNewTask={handleNewTaskFocus}
            onSignOut={handleSignOut}
            onViewChange={setActiveView}
          />
        </div>
      )}

      <div className="flex min-h-screen">
        <Sidebar
          activeView={activeView}
          className="hidden lg:flex"
          isNewTaskActive={isNewTaskActive}
          onNewTask={handleNewTaskFocus}
          onSignOut={handleSignOut}
          onViewChange={setActiveView}
        />

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
                  {greeting}, {firstName}.
                </h2>
                <p className="mt-2 text-[15px] font-medium text-slate-600 sm:mt-3">
                  You have {tasks.filter((task) => !task.done).length} tasks to focus on today.
                </p>
              </div>

              <form className="rounded-lg border border-slate-300 bg-white p-3 shadow-sm sm:p-4" onSubmit={handleCreateTask}>
                <div className="flex h-11 items-center gap-3">
                  <button
                    type="button"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-500 text-white transition hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-200"
                    aria-label="Focus task input"
                    onClick={() => taskInputRef.current?.focus()}
                  >
                    <Icon name="plus" className="h-4 w-4" />
                  </button>
                  <input
                    ref={taskInputRef}
                    className="min-w-0 flex-1 bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
                    placeholder="Create a new task..."
                    value={newTaskTitle}
                    onChange={(event) => setNewTaskTitle(event.target.value)}
                    onBlur={() => setIsNewTaskActive(false)}
                    onFocus={() => setIsNewTaskActive(true)}
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
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 border-t border-slate-100 pt-3 sm:grid-cols-2">
                  <label className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                    Due Date
                    <input
                      ref={taskDateRef}
                      type="date"
                      className="mt-2 h-10 w-full rounded-md border border-slate-300 bg-[#eef2fb] px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#465df0] focus:ring-4 focus:ring-indigo-100"
                      value={newTaskDate}
                      onChange={(event) => setNewTaskDate(event.target.value)}
                      disabled={!token || isSaving}
                    />
                  </label>
                  <label className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                    Due Time
                    <input
                      ref={taskTimeRef}
                      type="time"
                      className="mt-2 h-10 w-full rounded-md border border-slate-300 bg-[#eef2fb] px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#465df0] focus:ring-4 focus:ring-indigo-100"
                      value={newTaskTime}
                      onChange={(event) => setNewTaskTime(event.target.value)}
                      disabled={!token || isSaving || !newTaskDate}
                    />
                  </label>
                </div>
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
                <h3 className="text-[13px] font-extrabold tracking-wide text-slate-800">{viewTitle}</h3>
                {activeView !== 'settings' && (
                  <button type="button" className="text-[11px] font-bold text-[#244beb]" onClick={handleMarkAllDone}>
                    Mark all done
                  </button>
                )}
              </div>

              {activeView === 'settings' ? (
                <div className="rounded-md border border-slate-300 bg-white px-4 py-6">
                  <p className="text-[15px] font-bold text-slate-800">Account</p>
                  <p className="mt-2 text-[13px] font-semibold text-slate-500">
                    Signed in as {user.fullName || user.email || 'this user'}.
                  </p>
                  <button
                    type="button"
                    className="mt-5 rounded-md bg-[#465df0] px-4 py-3 text-[13px] font-bold text-white"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {isLoading && <p className="text-[13px] font-semibold text-slate-500">Loading tasks...</p>}
                  {!isLoading && visibleTasks.length === 0 && (
                    <p className="rounded-md border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-[13px] font-semibold text-slate-500">
                      No tasks here yet.
                    </p>
                  )}
                  {!isLoading &&
                    visibleTasks.map((task) => (
                      <TaskItem
                        key={task._id}
                        task={task}
                        onDelete={handleDeleteTask}
                        onToggle={handleToggleTask}
                      />
                    ))}
                </div>
              )}

              <p className="mt-9 text-center text-[12px] font-medium text-slate-300">
                You've reached the end of your list. Keep the momentum!
              </p>
            </div>
          </section>

          <RightPanel upcomingTasks={upcomingTasks} />
        </div>
      </div>
    </main>
  )
}

export default UserDashboard
