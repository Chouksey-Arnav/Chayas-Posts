import { createClient } from '@supabase/supabase-js'
import { SignJWT, jwtVerify } from 'jose'

// ─── Supabase: Public client (used in browser / server components) ───────────
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// ─── Supabase: Admin client (bypasses RLS — server-side only) ────────────────
export function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

// ─── JWT helpers ─────────────────────────────────────────────────────────────
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
)

/**
 * Create a signed JWT valid for 8 hours.
 */
export async function signToken(payload = {}) {
  return new SignJWT({ ...payload, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secret)
}

/**
 * Verify a JWT and return the payload, or null if invalid.
 */
export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

/**
 * Check the auth_token cookie from a Next.js request and return
 * the payload if valid, or null if missing/expired/invalid.
 */
export async function getAuthFromRequest(request) {
  const token = request.cookies.get('auth_token')?.value
  if (!token) return null
  return verifyToken(token)
}
