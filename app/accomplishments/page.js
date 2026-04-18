import { Navbar, Footer } from '@/components/Nav'

export const metadata = {
  title: "Accomplishments — Chaya's Posts",
  description: "A timeline of Chaya Chouksey's literary journey, milestones, and life's work.",
}

const timeline = [
  {
    year: '1955',
    era: 'Early Years',
    title: 'The First Poem',
    desc: 'Chaya discovers her love for language as a young girl, reciting dohas (couplets) from memory and composing her first original verses — a natural gift that would define her life.',
    icon: '✨',
  },
  {
    year: '1975',
    era: 'Academic Foundation',
    title: 'Bachelor of Arts — Hindi & Philosophy',
    desc: 'Completes undergraduate studies at Barkatullah University, Bhopal, laying a rigorous academic foundation in Hindi literature and Indian philosophy.',
    icon: '🎓',
  },
  {
    year: '1978',
    era: 'Scholarly Achievement',
    title: 'Masters in Hindi Literature',
    desc: 'Earns a post-graduate degree in Hindi Literature from Rani Durgavati Vishwavidyalaya, Jabalpur — deepening her understanding of classical and modern Hindi literary forms.',
    icon: '📜',
  },
  {
    year: '1980s',
    era: 'Literary Voice',
    title: 'Active in Kavya Goshthi Circles',
    desc: 'Becomes a regular and celebrated voice at regional kavya goshthi (poetry assemblies) across Madhya Pradesh, earning recognition for her lyrical mastery and emotive delivery.',
    icon: '🎙',
  },
  {
    year: '1990s',
    era: 'Community Builder',
    title: 'Literary Mentorship Begins',
    desc: 'Chaya dedicates herself to mentoring younger writers within her family and community, fostering a love of Hindi literature and oral tradition in the next generation.',
    icon: '🌱',
  },
  {
    year: '2005',
    era: 'Recognition',
    title: 'Kavya Ratna Samman',
    desc: 'Awarded the Kavya Ratna Samman by a regional poetry assembly in Indore in recognition of her original verse composition and lifelong devotion to the craft.',
    icon: '🏆',
  },
  {
    year: '2010',
    era: 'Cultural Heritage',
    title: 'Cultural Heritage Award',
    desc: 'Recognised by the Madhya Pradesh Sahitya Parishad for sustained contribution to Hindi literary culture and the preservation of oral storytelling traditions.',
    icon: '🌺',
  },
  {
    year: '2018',
    era: 'A Life of Service',
    title: 'Sahitya Seva Puraskar',
    desc: 'Honoured with the Sahitya Seva Puraskar for decades of literary mentorship, cultural stewardship, and bringing the beauty of Hindi poetry to every corner of her world.',
    icon: '🌟',
  },
  {
    year: '2024',
    era: 'Digital Chapter',
    title: "Chaya's Posts Launches",
    desc: "Chaya's words find a new home online — this very website — so that her poems, reflections, and voice recordings can reach hearts far beyond her living room.",
    icon: '💻',
  },
]

const statPillars = [
  { num: '40+', label: 'Years of Writing' },
  { num: '∞',  label: 'Poems Composed'  },
  { num: '3',  label: 'Major Awards'     },
  { num: '2',  label: 'Degrees Earned'   },
]

const literaryValues = [
  {
    title: 'Classical Roots',
    desc: 'Grounded in the doha tradition of Kabir and Rahim, Chaya honours the discipline and beauty of classical Hindi verse forms.',
  },
  {
    title: 'Modern Expression',
    desc: 'She embraces free verse and modern idiom, believing that tradition lives best when it breathes and grows.',
  },
  {
    title: 'Bilingual Grace',
    desc: 'Moving fluidly between Hindi and English, her poetry bridges generations and reaches diverse audiences.',
  },
  {
    title: 'Oral Heritage',
    desc: 'She insists that a poem lives most fully in the spoken voice — hence this site\'s audio recording feature.',
  },
]

export default function AccomplishmentsPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative py-24 md:py-36 text-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #2d0810 0%, #4a0e1c 50%, #6b1429 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-1/4 w-72 h-72 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #e8c060 0%, transparent 70%)' }} />
          <div className="absolute -bottom-20 left-1/4 w-56 h-56 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #e8c060 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-2xl mx-auto px-6">
          <p className="section-label mb-3 animate-fade-slide-up" style={{ color: '#c9993a' }}>
            A Life in Words
          </p>
          <h1
            className="font-display font-light mb-4 animate-fade-slide-up delay-100"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#f0d080' }}
          >
            Accomplishments
          </h1>
          <p className="font-body text-lg italic animate-fade-slide-up delay-200"
            style={{ color: 'rgba(200,155,58,0.75)' }}>
            Seven decades of poetry, mentorship, and literary devotion.
          </p>
        </div>
      </section>

      {/* ── Stat Pillars ────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 -mt-8">
        <div
          className="grid grid-cols-2 md:grid-cols-4 rounded-sm overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #fdfaf4, #faf3e0)',
            border: '1px solid rgba(200,155,58,0.25)',
            boxShadow: '0 8px 40px -8px rgba(45,8,16,0.2)',
          }}
        >
          {statPillars.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-8 px-4"
              style={{ borderRight: i < 3 ? '1px solid rgba(200,155,58,0.15)' : 'none' }}
            >
              <span className="font-display text-4xl md:text-5xl font-light" style={{ color: 'var(--burgundy-deep)' }}>
                {s.num}
              </span>
              <span className="font-display text-xs tracking-widest uppercase mt-1" style={{ color: 'var(--gold-primary)' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 py-20">

        {/* ── Timeline ────────────────────────────────────────────── */}
        <section className="mb-24">
          <div className="text-center mb-14">
            <p className="section-label mb-2">The Journey</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold" style={{ color: 'var(--burgundy-deep)' }}>
              A Literary Timeline
            </h2>
            <div className="gold-divider mt-4">
              <span className="ornament">✦</span>
            </div>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
              style={{
                background: 'linear-gradient(180deg, transparent, rgba(200,155,58,0.4) 10%, rgba(200,155,58,0.4) 90%, transparent)',
                transform: 'md:translateX(-50%)',
              }}
            />

            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} animate-fade-slide-up`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {/* Mobile: left-aligned */}
                  <div className="pl-14 md:pl-0 md:w-1/2 flex flex-col md:px-8">
                    <div
                      className={`literary-card p-5 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                    >
                      <p className="section-label mb-1" style={{ textAlign: 'inherit' }}>{item.era}</p>
                      <h3 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--burgundy-deep)' }}>
                        {item.title}
                      </h3>
                      <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--ink-mid)' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Year dot — Desktop center */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center gap-1 z-10">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                      style={{
                        background: 'linear-gradient(135deg, var(--burgundy-mid), var(--burgundy-bright))',
                        border: '2px solid rgba(200,155,58,0.4)',
                        boxShadow: '0 0 12px rgba(200,155,58,0.2)',
                      }}
                    >
                      {item.icon}
                    </div>
                    <span
                      className="font-display text-xs font-semibold"
                      style={{ color: 'var(--gold-primary)' }}
                    >
                      {item.year}
                    </span>
                  </div>

                  {/* Year dot — Mobile left */}
                  <div className="flex md:hidden absolute left-0 flex-col items-center gap-0.5 z-10">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm"
                      style={{
                        background: 'linear-gradient(135deg, var(--burgundy-mid), var(--burgundy-bright))',
                        border: '2px solid rgba(200,155,58,0.4)',
                      }}
                    >
                      {item.icon}
                    </div>
                    <span className="font-display text-[10px]" style={{ color: 'var(--gold-primary)' }}>
                      {item.year}
                    </span>
                  </div>

                  {/* Spacer on opposite side (desktop) */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Literary Philosophy ─────────────────────────────────── */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Her Craft</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold" style={{ color: 'var(--burgundy-deep)' }}>
              Literary Philosophy
            </h2>
            <div className="gold-divider mt-4"><span className="ornament">✦</span></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {literaryValues.map((v, i) => (
              <div
                key={v.title}
                className="literary-card p-7 animate-fade-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h3 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--burgundy-mid)' }}>
                  {v.title}
                </h3>
                <p className="font-body text-base leading-relaxed" style={{ color: 'var(--ink-mid)' }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Legacy Quote ────────────────────────────────────────── */}
        <section
          className="rounded-sm p-10 md:p-14 text-center animate-fade-slide-up"
          style={{ background: 'linear-gradient(135deg, rgba(45,8,16,0.96), rgba(107,20,41,0.96))' }}
        >
          <span className="text-5xl mb-6 block" style={{ color: 'rgba(200,155,58,0.3)' }}>"</span>
          <p
            className="font-display text-2xl md:text-3xl italic leading-relaxed mb-8"
            style={{ color: '#f0d080' }}
          >
            Poetry is not written with ink. It is written with heartbeats.
          </p>
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-12" style={{ background: 'rgba(200,155,58,0.4)' }} />
            <span className="font-display text-base" style={{ color: 'rgba(200,155,58,0.7)' }}>Chaya Chouksey</span>
            <div className="h-px w-12" style={{ background: 'rgba(200,155,58,0.4)' }} />
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <div className="text-center mt-16">
          <a href="/" className="btn-primary mr-4">
            Read Her Posts →
          </a>
          <a href="/about" className="btn-secondary">
            About Chaya
          </a>
        </div>
      </main>

      <Footer />
    </>
  )
}
