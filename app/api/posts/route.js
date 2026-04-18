import { NextResponse } from 'next/server'
import { supabase, getAdminClient, getAuthFromRequest } from '@/lib/db'

// ── GET /api/posts  →  Public — fetch all posts ──────────────────────
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, content, category, audio_url, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch posts.', posts: [] },
        { status: 500 }
      )
    }

    return NextResponse.json({ posts: data || [] })
  } catch (err) {
    console.error('GET /api/posts error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred.', posts: [] },
      { status: 500 }
    )
  }
}

// ── POST /api/posts  →  Admin — create a post ────────────────────────
export async function POST(request) {
  // Verify admin auth
  const payload = await getAuthFromRequest(request)
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, content, category, audio_url } = body

    // Validate
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 })
    }
    if (!content?.trim() && !audio_url) {
      return NextResponse.json(
        { error: 'Either text content or an audio recording is required.' },
        { status: 400 }
      )
    }

    const validCategories = ['poem', 'reflection', 'story', 'note']
    const safeCategory = validCategories.includes(category) ? category : 'note'

    const adminClient = getAdminClient()
    const { data, error } = await adminClient
      .from('posts')
      .insert({
        title:     title.trim().slice(0, 200),
        content:   content?.trim() || null,
        category:  safeCategory,
        audio_url: audio_url || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to create post.' }, { status: 500 })
    }

    return NextResponse.json({ post: data }, { status: 201 })
  } catch (err) {
    console.error('POST /api/posts error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}

// ── DELETE /api/posts?id=xxx  →  Admin — delete a post ───────────────
export async function DELETE(request) {
  // Verify admin auth
  const payload = await getAuthFromRequest(request)
  if (!payload) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required.' }, { status: 400 })
    }

    const adminClient = getAdminClient()

    // Fetch the post first to get the audio_url for storage cleanup
    const { data: post } = await adminClient
      .from('posts')
      .select('audio_url')
      .eq('id', id)
      .single()

    // Delete the post record
    const { error } = await adminClient
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase delete error:', error)
      return NextResponse.json({ error: 'Failed to delete post.' }, { status: 500 })
    }

    // Also remove the audio file from storage if it exists
    if (post?.audio_url) {
      try {
        // Extract the file path from the full URL
        const url = new URL(post.audio_url)
        const pathParts = url.pathname.split('/object/public/recordings/')
        if (pathParts.length === 2) {
          await adminClient.storage
            .from('recordings')
            .remove([pathParts[1]])
        }
      } catch {
        // Non-fatal: post is already deleted, just log the storage cleanup failure
        console.warn('Could not clean up audio file from storage.')
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/posts error:', err)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
