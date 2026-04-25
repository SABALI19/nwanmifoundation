import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function FieldIcon({ type }) {
  if (type === 'mail') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-.4 4.25-7.05 5.1a.95.95 0 0 1-1.1 0L4.4 8.25A1 1 0 0 1 5.6 6.65L12 11.28l6.4-4.63a1 1 0 1 1 1.2 1.6Z"
        />
      </svg>
    )
  }

  if (type === 'lock') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          fill="currentColor"
          d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Zm-7-2a2 2 0 0 1 4 0v2h-4V7Zm3 8.73V17a1 1 0 1 1-2 0v-1.27a2 2 0 1 1 2 0Z"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
      />
    </svg>
  )
}

function Signup({ onAuthSuccess, onShowLogin }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!acceptedTerms) {
      setError('Please agree to the terms before creating an account.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed')
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      onAuthSuccess?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8ff] text-slate-950">
      <div className="pointer-events-none fixed right-0 top-0 h-full w-[45vw] min-w-[420px] bg-[radial-gradient(circle_at_42%_46%,rgba(96,113,255,0.18),rgba(96,113,255,0.08)_32%,rgba(255,255,255,0)_67%)]" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-[560px] flex-col items-center px-6 py-14 sm:py-16">
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#465df0] shadow-lg shadow-indigo-200">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12.7 3.3c2.9-.9 5.9-.2 8 1.9.34.34.43.86.22 1.29l-2.15 4.41a9.03 9.03 0 0 1-4.26 4.22l-1.6.76-4.82-4.82.76-1.6a9.03 9.03 0 0 1 4.22-4.26l-.37-1.9Zm1.53 5.03a1.74 1.74 0 1 0 2.46 2.46 1.74 1.74 0 0 0-2.46-2.46ZM7.2 12.35l4.45 4.45-1.56 1.56a2 2 0 0 1-1.12.55l-4.01.6a.42.42 0 0 1-.47-.47l.6-4.01a2 2 0 0 1 .55-1.12l1.56-1.56Z"
              />
            </svg>
          </div>
          <h1 className="text-[31px] font-extrabold leading-none tracking-normal">Momentum</h1>
          <p className="mt-3 max-w-[330px] text-[15px] leading-5 text-slate-600">
            Experience cognitive clarity with the world's most focused task manager.
          </p>
        </div>

        <form className="w-full rounded-xl border border-slate-300/90 bg-white p-7 shadow-sm" aria-label="Create account" onSubmit={handleSubmit}>
          <h2 className="mb-7 text-[24px] font-bold leading-none tracking-normal">Create Account</h2>

          <label className="mb-5 block">
            <span className="mb-2 block text-[13px] font-bold text-slate-700">Full Name</span>
            <span className="flex h-12 items-center gap-2 rounded-md border border-slate-300 bg-[#eef2fb] px-3 text-slate-500 shadow-inner shadow-slate-200/40">
              <FieldIcon />
              <input
                className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </span>
          </label>

          <label className="mb-5 block">
            <span className="mb-2 block text-[13px] font-bold text-slate-700">Email Address</span>
            <span className="flex h-12 items-center gap-2 rounded-md border border-slate-300 bg-[#eef2fb] px-3 text-slate-500 shadow-inner shadow-slate-200/40">
              <FieldIcon type="mail" />
              <input
                className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-2 block text-[13px] font-bold text-slate-700">Password</span>
            <span className="flex h-12 items-center gap-2 rounded-md border border-slate-300 bg-[#eef2fb] px-3 text-slate-500 shadow-inner shadow-slate-200/40">
              <FieldIcon type="lock" />
              <input
                className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
              />
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-500" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 5c5.08 0 8.47 4.28 9.72 6.26a1.4 1.4 0 0 1 0 1.48C20.47 14.72 17.08 19 12 19s-8.47-4.28-9.72-6.26a1.4 1.4 0 0 1 0-1.48C3.53 9.28 6.92 5 12 5Zm0 2c-3.7 0-6.42 2.95-7.78 5C5.58 14.05 8.3 17 12 17s6.42-2.95 7.78-5C18.42 9.95 15.7 7 12 7Zm0 2.25A2.75 2.75 0 1 1 9.25 12 2.75 2.75 0 0 1 12 9.25Z"
                />
              </svg>
            </span>
          </label>
          <p className="mt-2 text-[11px] font-medium text-slate-500">Must be at least 8 characters long.</p>

          <label className="mt-7 flex items-center gap-2 text-[13px] text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 accent-[#465df0]"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
            />
            <span>
              I agree to the <a className="font-bold text-[#244beb]" href="#">Terms of Service</a> and{' '}
              <a className="font-bold text-[#244beb]" href="#">Privacy Policy</a>.
            </span>
          </label>

          {error && <p className="mt-4 text-[13px] font-semibold text-rose-600">{error}</p>}

          <button
            type="submit"
            className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#465df0] text-[15px] font-medium text-white shadow-lg shadow-indigo-200 transition hover:bg-[#344be0] focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-slate-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path fill="currentColor" d="m13.2 5.3 5.7 5.7H4v2h14.9l-5.7 5.7 1.4 1.4L22.7 12l-8.1-8.1-1.4 1.4Z" />
            </svg>
          </button>

          <div className="my-7 flex items-center gap-4 text-[14px] text-slate-500">
            <span className="h-px flex-1 bg-slate-200" />
            <span>Or continue with</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex h-12 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white text-[15px] font-medium text-slate-700 transition hover:bg-slate-50">
              <span className="text-lg font-bold text-[#4285f4]">G</span>
              Google
            </button>
            <button type="button" className="flex h-12 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white text-[15px] font-medium text-slate-700 transition hover:bg-slate-50">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-950" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.79-.25.79-.56v-2.17c-3.22.7-3.9-1.38-3.9-1.38-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.74-1.56-2.57-.29-5.27-1.29-5.27-5.73 0-1.27.45-2.3 1.2-3.12-.12-.29-.52-1.47.11-3.07 0 0 .98-.31 3.17 1.19a10.96 10.96 0 0 1 5.76 0c2.2-1.5 3.17-1.19 3.17-1.19.63 1.6.23 2.78.11 3.07.75.82 1.2 1.85 1.2 3.12 0 4.46-2.71 5.43-5.29 5.72.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"
                />
              </svg>
              GitHub
            </button>
          </div>
        </form>

        <p className="mt-8 text-[14px] text-slate-600">
          Already have an account? <button type="button" className="font-bold text-[#244beb]" onClick={onShowLogin}>Log In</button>
        </p>
      </section>
    </main>
  )
}

export default Signup
