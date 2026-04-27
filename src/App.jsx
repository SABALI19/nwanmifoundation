import { useState } from 'react'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import UserDashboard from './pages/UserDashboard'
import { getSessionToken } from './utils/localAuth'

function App() {
  const [view, setView] = useState(() => (getSessionToken() ? 'dashboard' : 'signup'))

  if (view === 'dashboard') {
    return <UserDashboard onSignOut={() => setView('login')} />
  }

  if (view === 'login') {
    return <Login onAuthSuccess={() => setView('dashboard')} onShowSignup={() => setView('signup')} />
  }

  return <Signup onShowLogin={() => setView('login')} />
}

export default App
