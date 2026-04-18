'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/',                label: 'Home'           },
  { href: '/about',           label: 'About'          },
  { href: '/accomplishments', label: 'Accomplishments'},
]

export function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      {/* Top gold accent bar */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#c9993a] to-transparent" />

      <nav
        className="backdrop-blur-md"
        style={{
          background: 'rgba(45,8,16,0.96)',
          borderBottom: '1px solid rgba(200,155,58,0.2)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-0 flex items-center justify-between h-16">

          {/* Brand */}
          <Link
            href="/"
            className="flex flex-col leading-none group"
            onClick={() => setMenuOpen(false)}
          >
            <span
              className="font-display text-2xl font-light tracking-wide transition-colors"
              style={{ color: '#f0d080' }}
            >
              Chaya<span className="font-semibold">'s</span>
            </span>
            <span
              className="text-[0.6rem] font-display tracking-[0.28em] uppercase"
              style={{ color: '#c9993a', marginTop: '-2px' }}
            >
              Posts
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-display text-base tracking-wide transition-all duration-300 pb-0.5 relative"
                style={{
                  color: pathname === href ? '#e8c060' : 'rgba(240,208,128,0.7)',
                  borderBottom: pathname === href ? '1px solid #c9993a' : '1px solid transparent',
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-[#e8c060] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-[#e8c060] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-[#e8c060] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden border-t"
            style={{ borderColor: 'rgba(200,155,58,0.15)', background: 'rgba(30,5,12,0.98)' }}
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-lg tracking-wide py-1"
                  style={{ color: pathname === href ? '#e8c060' : 'rgba(240,208,128,0.75)' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export function Footer() {
  return (
    <footer
      className="mt-24 py-12 text-center"
      style={{ background: 'rgba(45,8,16,0.96)', borderTop: '1px solid rgba(200,155,58,0.2)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Gold ornament */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9993a]" />
          <span className="text-[#c9993a] text-xl font-display">❧</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9993a]" />
        </div>

        <p className="font-display text-xl italic mb-1" style={{ color: '#f0d080' }}>
          Chaya's Posts
        </p>
        <p className="font-body text-sm mb-6" style={{ color: 'rgba(200,155,58,0.6)' }}>
          Words from the heart — poems, reflections, and recordings
        </p>

        <div className="flex items-center justify-center gap-6 mb-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-display text-sm tracking-wider transition-colors"
              style={{ color: 'rgba(240,208,128,0.55)' }}
            >
              {label}
            </Link>
          ))}
        </div>

        <p className="text-xs" style={{ color: 'rgba(200,155,58,0.35)' }}>
          © {new Date().getFullYear()} Chaya Chouksey. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
