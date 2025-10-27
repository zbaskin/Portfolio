'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/resume', label: 'Resume' },
  { href: '/reviews', label: 'Reviews' },
]

export function NavBar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <nav className="relative flex h-14 items-center gap-6">
      {/* Brand */}
      
      <Link href="/" className="text-lg font-semibold">
        <img
          src="/z.png"
          alt="Z logo"
          className="w-8 h-8 float-left mr-4 object-contain rounded"
        />
        <p className="hidden md:inline">
          Zach Baskin
        </p>
      </Link>

      {/* Desktop links */}
      <div className="ml-auto hidden items-center gap-4 md:flex">
        {links.map((l) => {
          const active = pathname === l.href
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-xl hover:bg-neutral-100 ${
                active ? 'bg-neutral-100' : ''
              }`}
            >
              {l.label}
            </Link>
          )
        })}
        <a
          className="px-3 py-1.5 rounded-xl hover:bg-neutral-100"
          href="https://github.com/zbaskin"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          className="px-3 py-1.5 rounded-xl hover:bg-neutral-100"
          href="https://www.linkedin.com/in/zachbaskin/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="ml-auto inline-flex items-center justify-center rounded-xl border px-3 py-2 md:hidden"
      >
        {/* animated icon */}
        <span className="relative block h-4 w-5">
          <span
            className={`absolute left-0 top-0 h-0.5 w-5 bg-neutral-800 transition-transform ${
              open ? 'translate-y-1.5 rotate-45' : ''
            }`}
          />
          <span
            className={`absolute left-0 top-1.5 h-0.5 w-5 bg-neutral-800 transition-opacity ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute left-0 top-3 h-0.5 w-5 bg-neutral-800 transition-transform ${
              open ? '-translate-y-1.5 -rotate-45' : ''
            }`}
          />
        </span>
      </button>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`absolute left-0 right-0 top-full origin-top md:hidden`}
      >
        <div
          className={`card mx-4 mt-2 overflow-hidden transition-[max-height,opacity] ${
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col p-2">
            {links.map((l) => {
              const active = pathname === l.href
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-lg px-3 py-2 text-base hover:bg-neutral-100 ${
                    active ? 'bg-neutral-100' : ''
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
            <a
              className="rounded-lg px-3 py-2 text-base hover:bg-neutral-100"
              href="https://github.com/zbaskin"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="rounded-lg px-3 py-2 text-base hover:bg-neutral-100"
              href="https://www.linkedin.com/in/zachbaskin/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
