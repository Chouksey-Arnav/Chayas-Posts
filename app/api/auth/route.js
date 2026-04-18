import { NextResponse } from 'next/server'
import { signToken, getAuthFromRequest } from '@/lib/db'

// ── POST /api/auth  →  Login ─────────────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required.' },
        { status: 400 }
      )
    }

    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable is not set.')
      return NextResponse.json(
        { error: 'Server configuration error. Please contact the administrator.' },
        { status: 500 }
      )
    }

    // Constant-time comparison to prevent timing attacks
    const providedBuf = Buffer.from(password)
    const expectedBuf = Buffer.from(adminPassword)
    const match =
      providedBuf.length === expectedBuf.length &&
      providedBuf.every((b, i) => b === expectedBuf[i])

    if (!match) {
      return NextResponse.json(
        { error: 'Incorrect password. Please try again.' },
        { status: 401 }
      )
    }

    // Sign a JWT valid for 8 hours
    const token = await signToken({ role: 'admin' })

    const response = NextResponse.json({ success: true })

    // Set httpOnly cookie — not accessible from JavaScript (XSS-safe)
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge:   60 * 60 * 8, // 8 hours in seconds
      path:     '/',
    })

    return response
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}

// ── DELETE /api/auth  →  Logout ──────────────────────────────────────
export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set('auth_token', '', {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   0, // Expire immediately
    path:     '/',
  })
  return response
}

// ── GET /api/auth  →  Check session status ───────────────────────────
export async function GET(request) {
  const payload = await getAuthFromRequest(request)
  if (!payload) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
  return NextResponse.json({ authenticated: true })
}
