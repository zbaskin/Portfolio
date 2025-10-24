'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Review } from './ReviewCard'
import { ReviewsInfinite } from './ReviewsInfinite'

export function ReviewsBrowser({
  items,
  pageSize = 10,
}: {
  items: Review[]
  pageSize?: number
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // Read initial query from the URL (?q=...)
  const initialQ = searchParams.get('q') ?? ''
  const [q, setQ] = useState(initialQ)
  const [debouncedQ, setDebouncedQ] = useState(initialQ)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Debounce typing → 200ms
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q), 200)
    return () => clearTimeout(t)
  }, [q])

  // Sync the query to the URL so searches are shareable / navigable
  useEffect(() => {
    const sp = new URLSearchParams(searchParams)
    if (debouncedQ) sp.set('q', debouncedQ)
    else sp.delete('q')
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ])

  // Basic, fast filter (case/diacritic-insensitive)
  const filtered = useMemo(() => {
    const needle = norm(debouncedQ)
    if (!needle) return items
    return items.filter((r) => {
      const hayTitle = norm(r.title)
      const hayDesc = norm(strip(r.description))
      return hayTitle.includes(needle) || hayDesc.includes(needle)
    })
  }, [debouncedQ, items])

  // Keyboard shortcut: press "/" to focus the search box
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const resultText =
    debouncedQ && filtered.length === 0
      ? 'No results'
      : debouncedQ
      ? `${filtered.length} result${filtered.length === 1 ? '' : 's'}`
      : `${items.length} review${items.length === 1 ? '' : 's'}`

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-semibold">Recent Reviews</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              ref={inputRef}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search reviews ( / )"
              className="w-72 max-w-full rounded-xl border px-3 py-2 pr-9 outline-none focus:ring-2 focus:ring-brand"
            />
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400">⌘K</span>
          </div>
          <span className="text-sm text-neutral-600">{resultText}</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card p-6">
          <p className="text-neutral-700">
            No reviews match <span className="font-medium">“{debouncedQ}”</span>.
          </p>
        </div>
      ) : (
        <ReviewsInfinite items={filtered} pageSize={pageSize} auto />
      )}
    </section>
  )
}

function strip(html: string) {
  return html.replace(/<[^>]*>/g, '')
}

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim()
}
