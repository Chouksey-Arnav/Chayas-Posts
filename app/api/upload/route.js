import { NextResponse } from 'next/server'
import { getAdminClient, getAuthFromRequest } from '@/lib/db'

// Max audio file size: 50 MB
const MAX_FILE_SIZE = 50 * 1024 * 1024

// Allowed MIME types for audio
const ALLOWED_TYPES = [
  'audio/webm',
  'audio/webm;codecs=opus',
  'audio/ogg',
  'audio/ogg;codecs=opus',
  'audio/mp4',
  'audio/mpeg',
  'audio/wav',
  'audio/x-wav',
]

// ── POST /api/upload  →  Admin — upload audio to Supabase Storage ────
export async function POST(request) {
  // Verify admin auth
  const payload = await getAuthFromRequest(request)
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('audio')

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No audio file provided.' }, { status: 400 })
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024} MB.` },
        { status: 413 }
      )
    }

    // Check MIME type (be lenient — browsers report slightly different types)
    const mimeType = file.type || 'audio/webm'
    const isAllowed = ALLOWED_TYPES.some((t) => mimeType.startsWith(t.split(';')[0]))
    if (!isAllowed) {
      return NextResponse.json(
        { error: `Unsupported file type: ${mimeType}. Please record using your browser.` },
        { status: 415 }
      )
    }

    // Generate a unique filename
    const timestamp = Date.now()
    const randomSuffix = Math.random().toString(36).slice(2, 8)
    const ext = mimeType.includes('ogg') ? 'ogg' : mimeType.includes('mp4') ? 'mp4' : 'webm'
    const fileName = `recording-${timestamp}-${randomSuffix}.${ext}`

    // Convert the file to a Buffer for upload
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage bucket 'recordings'
    const adminClient = getAdminClient()
    const { data, error } = await adminClient.storage
      .from('recordings')
      .upload(fileName, buffer, {
        contentType: mimeType,
        upsert: false,
        cacheControl: '3600',
      })

    if (error) {
      console.error('Supabase storage upload error:', error)
      return NextResponse.json(
        { error: 'Failed to upload audio. Please try again.' },
        { status: 500 }
      )
    }

    // Build the public URL
    const { data: urlData } = adminClient.storage
      .from('recordings')
      .getPublicUrl(data.path)

    if (!urlData?.publicUrl) {
      return NextResponse.json(
        { error: 'File uploaded but could not retrieve public URL.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: urlData.publicUrl }, { status: 201 })
  } catch (err) {
    console.error('POST /api/upload error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
