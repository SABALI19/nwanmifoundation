const USERS_KEY = 'localUsers'
const SESSION_KEY = 'token'
const USER_KEY = 'user'
const TASKS_PREFIX = 'localTasks:'

const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const normalizeEmail = (email) => email.trim().toLowerCase()

const generateId = (prefix) => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`

export const generateSessionToken = () => {
  const randomBytes = new Uint8Array(32)

  if (window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(randomBytes)
  } else {
    for (let index = 0; index < randomBytes.length; index += 1) {
      randomBytes[index] = Math.floor(Math.random() * 256)
    }
  }

  return Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

const publicUser = (user) => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email,
})

const setActiveSession = (user) => {
  const token = generateSessionToken()
  const sessionUser = publicUser(user)

  localStorage.setItem(SESSION_KEY, token)
  writeJson(USER_KEY, sessionUser)

  return { token, user: sessionUser }
}

export const getCurrentUser = () => readJson(USER_KEY, null)

export const getSessionToken = () => localStorage.getItem(SESSION_KEY)

export const signupLocalUser = ({ fullName, email, password }) => {
  const users = readJson(USERS_KEY, [])
  const normalizedEmail = normalizeEmail(email)

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error('An account with this email already exists.')
  }

  const user = {
    id: generateId('user'),
    fullName: fullName.trim(),
    email: normalizedEmail,
    password,
    createdAt: new Date().toISOString(),
  }

  writeJson(USERS_KEY, [...users, user])
  return publicUser(user)
}

export const loginLocalUser = ({ email, password }) => {
  const users = readJson(USERS_KEY, [])
  const normalizedEmail = normalizeEmail(email)
  const user = users.find((candidate) => candidate.email === normalizedEmail && candidate.password === password)

  if (!user) {
    throw new Error('Invalid email or password.')
  }

  return setActiveSession(user)
}

export const signOutLocalUser = () => {
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem('authToken')
  localStorage.removeItem(USER_KEY)
}

const tasksKeyForUser = (userId) => `${TASKS_PREFIX}${userId}`

export const getLocalTasks = (userId) => readJson(tasksKeyForUser(userId), [])

export const saveLocalTasks = (userId, tasks) => {
  writeJson(tasksKeyForUser(userId), tasks)
}

export const createLocalTask = (userId, taskData) => {
  const task = {
    _id: generateId('task'),
    title: taskData.title,
    tag: taskData.tag || 'PERSONAL',
    due: taskData.due,
    done: false,
    createdAt: new Date().toISOString(),
  }
  const tasks = [task, ...getLocalTasks(userId)]

  saveLocalTasks(userId, tasks)
  return task
}

export const updateLocalTask = (userId, taskId, updates) => {
  let updatedTask = null
  const tasks = getLocalTasks(userId).map((task) => {
    if (task._id !== taskId) return task

    updatedTask = { ...task, ...updates, updatedAt: new Date().toISOString() }
    return updatedTask
  })

  saveLocalTasks(userId, tasks)
  return updatedTask
}

export const deleteLocalTask = (userId, taskId) => {
  saveLocalTasks(
    userId,
    getLocalTasks(userId).filter((task) => task._id !== taskId)
  )
}
