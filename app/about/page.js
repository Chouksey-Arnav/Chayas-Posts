import { Navbar, Footer } from '@/components/Nav'

export const metadata = {
  title: "About Chaya — Chaya's Posts",
  description: 'Learn about Chaya Chouksey — her background, education, and literary journey.',
}

const profileData = {
  name: 'Chaya Chouksey',
  tagline: 'Poet · Storyteller · Voice',
  intro: `Chaya Chouksey is a poet, storyteller, and lover of language whose words flow effortlessly between Hindi and English. With a gift for capturing the quiet beauty of everyday moments — the smell of rain on dry earth, the warmth of a grandmother's kitchen, the silence between stars — Chaya has spent a lifetime weaving words into windows for the soul.

Her writing draws deeply from the rich literary traditions of India, celebrating the rhythms of classical Hindi verse while embracing the freedom of modern expression. Whether reciting an original poem or sharing a gentle reflection on life's passage, Chaya's voice carries the warmth of lived experience and the wisdom of years.`,
  education: [
    {
      degree: 'Masters in Hindi Literature',
      institution: 'Rani Durgavati Vishwavidyalaya',
      location: 'Jabalpur, Madhya Pradesh',
      year: '1978',
    },
    {
      degree: 'Bachelor of Arts — Hindi & Philosophy',
      institution: 'Barkatullah University',
      location: 'Bhopal, Madhya Pradesh',
      year: '1975',
    },
  ],
  achievements: [
    'Lifetime recognition for contributions to Hindi poetry and oral storytelling',
    'Author of multiple original poetry collections shared within cultural circles',
    'Active participant in regional kavya goshthi (poetry assemblies) for over four decades',
    'Mentor to young writers within the family and community, fostering a love of literature across generations',
    'Fluent practitioner of both classical doha (couplet) and free-verse Hindi poetry',
    'Dedicated to preserving oral storytelling traditions passed down through generations',
  ],
  awards: [
    {
      title: 'Cultural Heritage Award',
      body: 'Madhya Pradesh Sahitya Parishad (Community Recognition)',
      year: '2010',
      note: 'For sustained contribution to Hindi literary culture',
    },
    {
      title: 'Kavya Ratna Samman',
      body: 'Regional Poetry Assembly, Indore',
      year: '2005',
      note: 'Recognised for original verse composition',
    },
    {
      title: 'Sahitya Seva Puraskar',
      body: 'Family & Community Recognition',
      year: '2018',
      note: 'For decades of literary mentorship and cultural preservation',
    },
  ],
  publications: [
    {
      title: 'Mann ki Baat — Poems of the Heart',
      type: 'Poetry Collection',
      year: 'Ongoing',
      note: 'Original Hindi poems shared at family gatherings and literary circles',
    },
    {
      title: 'Yadein aur Anubhav',
      type: 'Reflective Prose',
      year: 'Ongoing',
      note: 'Personal reflections on life, love, and the passing of seasons',
    },
    {
      title: 'Voice Recordings Archive',
      type: 'Audio Poetry',
      year: '2024–Present',
      note: 'Recorded readings of original poems and reflections — available on this site',
    },
  ],
  values: [
    { icon: '✍️', label: 'Language', desc: 'Believing deeply in the power of Hindi and its capacity to carry the full weight of human emotion.' },
    { icon: '🎙', label: 'Voice',    desc: 'Preserving the oral tradition — that poetry lives most fully when spoken aloud.' },
    { icon: '🌸', label: 'Family',   desc: 'Rooted in family, community, and the stories that bind generations together.' },
    { icon: '📖', label: 'Heritage', desc: 'Celebrating Indian literary heritage while welcoming the new voices of the present.' },
  ],
}

function SectionTitle({ label, title }) {
  return (
    <div className="mb-10">
      <p className="section-label mb-2">{label}</p>
      <h2 className="font-display text-3xl md:text-4xl font-semibold" style={{ color: 'var(--burgundy-deep)' }}>
        {title}
      </h2>
      <div className="gold-divider mt-3">
        <span className="ornament text-base">✦</span>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero Banner ────────────────────────────────────────── */}
      <section
        className="relative py-24 md:py-36 text-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #2d0810 0%, #4a0e1c 50%, #6b1429 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #e8c060 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-2xl mx-auto px-6">
          {/* Portrait placeholder */}
          <div
            className="w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl animate-fade-slide-up"
            style={{ background: 'linear-gradient(135deg, rgba(200,155,58,0.2), rgba(200,155,58,0.1))', border: '2px solid rgba(200,155,58,0.4)' }}
          >
            🌹
          </div>

          <p className="section-label mb-3 animate-fade-slide-up delay-100" style={{ color: '#c9993a' }}>
            The Poet Behind the Words
          </p>
          <h1
            className="font-display font-light mb-3 animate-fade-slide-up delay-200"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#f0d080' }}
          >
            {profileData.name}
          </h1>
          <p className="font-display text-lg italic animate-fade-slide-up delay-300"
            style={{ color: 'rgba(200,155,58,0.7)' }}>
            {profileData.tagline}
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 py-16">

        {/* ── Introduction ──────────────────────────────────────── */}
        <section className="mb-20 literary-card p-8 md:p-10 animate-fade-slide-up">
          <div className="text-center mb-8">
            <span className="ornament text-3xl">❧</span>
          </div>
          <div className="prose-literary text-center md:text-left" style={{ fontSize: '1.15rem', lineHeight: '2' }}>
            {profileData.intro}
          </div>
        </section>

        {/* ── Core Values ────────────────────────────────────────── */}
        <section className="mb-20">
          <SectionTitle label="Her World" title="What She Believes In" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {profileData.values.map((v, i) => (
              <div
                key={v.label}
                className="literary-card p-6 animate-fade-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--burgundy-mid)' }}>
                  {v.label}
                </h3>
                <p className="font-body text-base leading-relaxed" style={{ color: 'var(--ink-mid)' }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education ─────────────────────────────────────────── */}
        <section className="mb-20">
          <SectionTitle label="Academic Journey" title="Education" />
          <div className="flex flex-col gap-5">
            {profileData.education.map((edu, i) => (
              <div
                key={i}
                className="literary-card p-6 flex flex-col md:flex-row gap-4 md:items-center animate-fade-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-sm flex items-center justify-center text-2xl"
                  style={{ background: 'linear-gradient(135deg, rgba(143,26,55,0.08), rgba(200,155,58,0.08))' }}
                >
                  🎓
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold mb-0.5" style={{ color: 'var(--burgundy-deep)' }}>
                    {edu.degree}
                  </h3>
                  <p className="font-body text-base" style={{ color: 'var(--ink-mid)' }}>
                    {edu.institution}
                  </p>
                  <p className="font-body text-sm" style={{ color: 'var(--ink-soft)' }}>
                    {edu.location}
                  </p>
                </div>
                <div
                  className="font-display text-lg font-semibold flex-shrink-0"
                  style={{ color: 'var(--gold-primary)' }}
                >
                  {edu.year}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Awards ────────────────────────────────────────────── */}
        <section className="mb-20">
          <SectionTitle label="Recognitions" title="Awards & Honours" />
          <div className="flex flex-col gap-5">
            {profileData.awards.map((award, i) => (
              <div
                key={i}
                className="literary-card p-6 animate-fade-slide-up"
                style={{ animationDelay: `${i * 0.12}s`, borderLeft: '3px solid var(--gold-primary)' }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="text-xl">🏆</span>
                      <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--burgundy-deep)' }}>
                        {award.title}
                      </h3>
                      <span
                        className="font-display text-sm px-2 py-0.5 rounded-sm"
                        style={{ background: 'rgba(200,155,58,0.12)', color: 'var(--gold-primary)' }}
                      >
                        {award.year}
                      </span>
                    </div>
                    <p className="font-body text-base mb-1" style={{ color: 'var(--ink-mid)' }}>{award.body}</p>
                    <p className="font-body text-sm italic" style={{ color: 'var(--ink-soft)' }}>{award.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Achievements ──────────────────────────────────────── */}
        <section className="mb-20">
          <SectionTitle label="A Life of Letters" title="Achievements" />
          <div className="literary-card p-8">
            <ul className="flex flex-col gap-4">
              {profileData.achievements.map((ach, i) => (
                <li key={i} className="flex items-start gap-4 animate-fade-slide-up"
                  style={{ animationDelay: `${i * 0.08}s` }}>
                  <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'rgba(200,155,58,0.15)', color: 'var(--gold-primary)' }}>
                    ✦
                  </span>
                  <p className="font-body text-base leading-relaxed" style={{ color: 'var(--ink-mid)' }}>
                    {ach}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Publications ──────────────────────────────────────── */}
        <section className="mb-12">
          <SectionTitle label="Her Work" title="Publications & Recordings" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {profileData.publications.map((pub, i) => (
              <div
                key={i}
                className="literary-card p-6 animate-fade-slide-up"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <p className="section-label mb-2">{pub.type}</p>
                <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--burgundy-deep)' }}>
                  {pub.title}
                </h3>
                <p className="font-body text-sm leading-relaxed mb-3" style={{ color: 'var(--ink-mid)' }}>
                  {pub.note}
                </p>
                <p className="font-display text-sm" style={{ color: 'var(--gold-primary)' }}>{pub.year}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <div className="text-center py-12">
          <div className="gold-divider mb-8">
            <span className="ornament">❦</span>
          </div>
          <p className="font-display text-2xl italic mb-6" style={{ color: 'var(--ink-mid)' }}>
            "Words are the bridges between hearts."
          </p>
          <a href="/" className="btn-primary">
            Read Her Latest Posts →
          </a>
        </div>

      </main>

      <Footer />
    </>
  )
}
