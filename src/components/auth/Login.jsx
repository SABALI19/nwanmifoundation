import { useState } from 'react'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$/, '')

function BrandMark() {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#465df0] text-white">
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12.7 3.3c2.9-.9 5.9-.2 8 1.9.34.34.43.86.22 1.29l-2.15 4.41a9.03 9.03 0 0 1-4.26 4.22l-1.6.76-4.82-4.82.76-1.6a9.03 9.03 0 0 1 4.22-4.26l-.37-1.9Zm1.53 5.03a1.74 1.74 0 1 0 2.46 2.46 1.74 1.74 0 0 0-2.46-2.46ZM7.2 12.35l4.45 4.45-1.56 1.56a2 2 0 0 1-1.12.55l-4.01.6a.42.42 0 0 1-.47-.47l.6-4.01a2 2 0 0 1 .55-1.12l1.56-1.56Z"
          />
        </svg>
      </span>
      <span className="text-[14px] font-medium text-slate-900">NWAMI Foundation</span>
    </div>
  )
}

function Login({ onAuthSuccess, onShowSignup }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
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
      <section className="mx-auto flex min-h-screen w-full max-w-[520px] flex-col items-center px-6 py-7">
        <BrandMark />

        <form
          className="mt-[170px] w-full max-w-[395px] rounded-xl border border-slate-300/90 bg-white px-6 py-8 shadow-sm"
          aria-label="Log in"
          onSubmit={handleSubmit}
        >
          <div className="mb-9 text-center">
            <h1 className="text-[17px] font-medium leading-none text-slate-900">Welcome back</h1>
            <p className="mt-4 text-[15px] leading-none text-slate-700">Focus on what matters today.</p>
          </div>

          <label className="mb-5 block">
            <span className="mb-2 block text-[14px] font-medium text-slate-800">Email Address</span>
            <input
              className="h-11 w-full rounded-md border border-slate-300 bg-[#eef2fb] px-3 text-[15px] text-slate-800 outline-none placeholder:text-slate-500 focus:border-[#465df0] focus:ring-4 focus:ring-indigo-100"
              type="email"
              name="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 flex items-center justify-between text-[14px] font-medium text-slate-800">
              Password
              <a className="text-[13px] font-medium text-[#244beb]" href="#">
                Forgot Password?
              </a>
            </span>
            <input
              className="h-11 w-full rounded-md border border-slate-300 bg-[#eef2fb] px-3 text-[15px] text-slate-800 outline-none placeholder:text-slate-500 focus:border-[#465df0] focus:ring-4 focus:ring-indigo-100"
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          {error && <p className="mt-4 text-[13px] font-semibold text-rose-600">{error}</p>}

          <button
            type="submit"
            className="mt-5 flex h-[55px] w-full items-center justify-center gap-2 rounded-md bg-[#465df0] text-[15px] font-medium text-white shadow-lg shadow-indigo-200 transition hover:bg-[#344be0] focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-slate-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path fill="currentColor" d="m13.2 5.3 5.7 5.7H4v2h14.9l-5.7 5.7 1.4 1.4L22.7 12l-8.1-8.1-1.4 1.4Z" />
            </svg>
          </button>

          <div className="my-9 flex items-center gap-3 text-[11px] text-slate-600">
            <span className="h-px flex-1 bg-slate-300" />
            <span>Or continue with</span>
            <span className="h-px flex-1 bg-slate-300" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex h-12 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white text-[14px] font-medium text-slate-800 transition hover:bg-slate-50"
            >
              <span className="text-[18px] font-medium tracking-tight text-slate-900">GOOGLE</span>
              Google
            </button>
            <button
              type="button"
              className="flex h-12 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white text-[14px] font-medium text-slate-800 transition hover:bg-slate-50"
            >
              <span className="text-[11px] font-bold text-slate-900">iOS</span>
              Apple
            </button>
          </div>
        </form>

        <p className="mt-8 text-[14px] text-slate-700">
          Don't have an account?{' '}
          <button type="button" className="font-medium text-[#244beb]" onClick={onShowSignup}>
            Sign up
          </button>
        </p>
      </section>
    </main>
  )
}

export default Login
