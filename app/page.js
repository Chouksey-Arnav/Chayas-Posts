import Link from 'next/link'
import { supabase } from '@/lib/db'
import { Navbar, Footer } from '@/components/Nav'
import { AudioPlayer } from '@/components/Audio'

// Fetch posts server-side — renders instantly with no loading flash
async function getPosts() {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch {
    return []
  }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  })
}

function CategoryBadge({ category }) {
  const map = {
    poem:        { label: 'Poem',        bg: 'rgba(143,26,55,0.1)',  color: '#8f1a37' },
    reflection:  { label: 'Reflection',  bg: 'rgba(200,155,58,0.1)', color: '#7d5c1c' },
    story:       { label: 'Story',       bg: 'rgba(45,8,16,0.08)',   color: '#4a3f30' },
    note:        { label: 'Note',        bg: 'rgba(100,60,20,0.08)', color: '#4a3f30' },
  }
  const style = map[category] || map.note
  return (
    <span
      className="px-3 py-0.5 text-xs font-display tracking-widest uppercase rounded-sm"
      style={{ background: style.bg, color: style.color }}
    >
      {style.label}
    </span>
  )
}

function PostCard({ post }) {
  return (
    <article className="literary-card p-6 md:p-8 animate-fade-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <CategoryBadge category={post.category} />
            {post.audio_url && (
              <span className="text-xs font-display tracking-widest uppercase px-2 py-0.5 rounded-sm"
                style={{ background: 'rgba(200,155,58,0.1)', color: '#c9993a' }}>
                🎙 Audio
              </span>
            )}
          </div>
          <h2
            className="font-display text-2xl md:text-3xl font-semibold leading-snug"
            style={{ color: 'var(--burgundy-deep)' }}
          >
            {post.title}
          </h2>
        </div>
      </div>

      {/* Date */}
      <p className="text-xs font-display tracking-widest uppercase mb-5"
        style={{ color: 'var(--gold-primary)', opacity: 0.75 }}>
        {formatDate(post.created_at)}
      </p>

      {/* Ornamental line */}
      <div className="h-px mb-5" style={{ background: 'linear-gradient(90deg, var(--gold-primary), transparent)', opacity: 0.3 }} />

      {/* Content */}
      {post.content && (
        <div
          className="prose-literary mb-4"
          style={{ maxHeight: '260px', overflow: 'hidden', maskImage: 'linear-gradient(180deg, black 70%, transparent 100%)' }}
        >
          {post.content}
        </div>
      )}

      {/* Audio player */}
      {post.audio_url && (
        <AudioPlayer url={post.audio_url} title={post.title} />
      )}

      {/* Read more link if text was clipped */}
      {post.content && post.content.length > 400 && (
        <p className="mt-4 font-display italic text-sm" style={{ color: 'var(--gold-primary)' }}>
          — continued above
        </p>
      )}
    </article>
  )
}

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-28 md:py-40 text-center"
        style={{ background: 'linear-gradient(160deg, #2d0810 0%, #4a0e1c 45%, #6b1429 75%, #8f1a37 100%)' }}
      >
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #e8c060 0%, transparent 70%)' }} />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #e8c060 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-3xl mx-auto px-6">
          <p className="section-label text-center mb-6 animate-fade-slide-up" style={{ color: '#c9993a' }}>
            A Personal Literary Space
          </p>

          <h1
            className="font-display font-light leading-none mb-4 animate-fade-slide-up delay-100"
            style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', color: '#f0d080' }}
          >
            Chaya's <em className="italic">Posts</em>
          </h1>

          <div className="flex items-center justify-center gap-4 mb-6 animate-fade-slide-up delay-200">
            <div className="h-px w-12" style={{ background: 'rgba(200,155,58,0.5)' }} />
            <span className="font-display text-lg" style={{ color: '#c9993a' }}>❧</span>
            <div className="h-px w-12" style={{ background: 'rgba(200,155,58,0.5)' }} />
          </div>

          <p
            className="font-body text-lg md:text-xl leading-relaxed italic animate-fade-slide-up delay-300"
            style={{ color: 'rgba(240,208,128,0.8)' }}
          >
            Poems, reflections, and voice recordings — straight from the heart of Chaya Chouksey.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4 animate-fade-slide-up delay-400">
            <a href="#posts" className="btn-gold">
              Read the Posts
            </a>
            <Link href="/about" className="btn-secondary" style={{ color: 'rgba(240,208,128,0.8)', borderColor: 'rgba(200,155,58,0.4)' }}>
              About Chaya
            </Link>
          </div>
        </div>
      </section>

      {/* ── Posts Feed ───────────────────────────────────────────── */}
      <main id="posts" className="max-w-3xl mx-auto px-6 py-16">

        {/* Section header */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">Latest</p>
          <h2 className="font-display text-4xl font-light" style={{ color: 'var(--burgundy-deep)' }}>
            Words & Recordings
          </h2>
          <div className="gold-divider mt-4">
            <span className="ornament">✦</span>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-6 opacity-30">📜</div>
            <p className="font-display text-2xl italic mb-2" style={{ color: 'var(--ink-soft)' }}>
              The page is yet unwritten…
            </p>
            <p className="font-body text-base" style={{ color: 'var(--ink-soft)', opacity: 0.7 }}>
              Chaya's first post will appear here shortly.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {posts.map((post, i) => (
              <div key={post.id} style={{ animationDelay: `${i * 0.1}s` }}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
