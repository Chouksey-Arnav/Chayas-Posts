'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function LoginForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const reason       = searchParams.get('reason')

  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(
    reason === 'unauthorized' ? 'Please log in to access the studio.' :
    reason === 'expired'      ? 'Your session has expired. Please log in again.' :
    null
  )
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password.trim()) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        setError(data.error || 'Incorrect password. Please try again.')
      }
    } catch {
      setError('Unable to connect. Please check your internet connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: 'linear-gradient(160deg, #2d0810 0%, #4a0e1c 50%, #6b1429 100%)' }}
    >
      {/* Back link */}
      <div className="mb-8 self-start max-w-sm w-full mx-auto">
        <Link
          href="/"
          className="font-display text-sm tracking-widest uppercase transition-colors"
          style={{ color: 'rgba(200,155,58,0.6)' }}
        >
          ← Back to Posts
        </Link>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-sm rounded-sm overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #fdfaf4, #faf3e0)',
          border: '1px solid rgba(200,155,58,0.25)',
          boxShadow: '0 24px 64px rgba(45,8,16,0.4)',
        }}
      >
        {/* Gold top bar */}
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, transparent, #c9993a, transparent)' }} />

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🌹</div>
            <h1 className="font-display text-3xl font-semibold mb-1" style={{ color: 'var(--burgundy-deep)' }}>
              Studio Login
            </h1>
            <p className="font-body text-sm" style={{ color: 'var(--ink-soft)' }}>
              Chaya's private publishing studio
            </p>
            <div className="gold-divider mt-4">
              <span className="ornament text-base">✦</span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-5 px-4 py-3 rounded-sm text-sm font-body"
              style={{ background: 'rgba(180,34,72,0.1)', color: '#b82248', border: '1px solid rgba(180,34,72,0.2)' }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="font-display text-sm tracking-wider uppercase"
                style={{ color: 'var(--ink-mid)' }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="literary-input pr-10"
                  placeholder="Enter your password…"
                  autoFocus
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm transition-colors"
                  style={{ color: 'var(--ink-soft)' }}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-gold mt-2 w-full justify-center"
              disabled={loading || !password.trim()}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                    style={{ borderColor: 'rgba(45,8,16,0.3)', borderTopColor: 'transparent' }}
                  />
                  Signing in…
                </span>
              ) : (
                'Enter the Studio →'
              )}
            </button>
          </form>

          <p className="mt-6 text-center font-body text-xs" style={{ color: 'var(--ink-soft)', opacity: 0.7 }}>
            This area is for Chaya only.
          </p>
        </div>
      </div>

      {/* Footer link */}
      <p className="mt-8 font-body text-xs" style={{ color: 'rgba(200,155,58,0.4)' }}>
        © {new Date().getFullYear()} Chaya's Posts
      </p>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: '#2d0810' }} />}>
      <LoginForm />
    </Suspense>
  )
}
