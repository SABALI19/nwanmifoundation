import { useState } from 'react'
import { loginLocalUser } from '../../utils/localAuth'

function BrandMark() {
  return (
    <section className="flex w-full max-w-[560px] flex-col items-center">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-[31px] font-extrabold leading-none tracking-normal text-[#244beb]">Samuel Edward</h1>
        <p className="mt-3 max-w-[330px] text-[15px] leading-5 text-slate-600">
          Task manager assessment project.
        </p>
      </div>
    </section>
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
      loginLocalUser(formData)
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
          className="mt-8 w-full max-w-[395px] rounded-xl border border-slate-300/90 bg-white px-6 py-8 shadow-sm"
          aria-label="Log in"
          onSubmit={handleSubmit}
        >
          <div className="mb-5 text-center">
            <h1 className="text-[17px] font-medium leading-none text-slate-900">Welcome back</h1>
            <p className="mt-2 text-[15px] leading-none text-slate-700">Focus on what matters today.</p>
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

          {/* <div className="my-9 flex items-center gap-3 text-[11px] text-slate-600">
            <span className="h-px flex-1 bg-slate-300" />
            <span>Or continue with</span>
            <span className="h-px flex-1 bg-slate-300" />
          </div> */}

          {/* <div className="grid grid-cols-2 gap-4">
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
          </div> */}
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
