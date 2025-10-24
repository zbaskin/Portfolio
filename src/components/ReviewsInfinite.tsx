'use client'

import { useEffect, useRef, useState } from 'react'
import { ReviewCard, type Review } from './ReviewCard'

export function ReviewsInfinite({
  items,
  pageSize = 10,
  auto = true,              // auto-load on scroll; set false to require button click
}: {
  items: Review[]
  pageSize?: number
  auto?: boolean
}) {
  const [shown, setShown] = useState(() => Math.min(pageSize, items.length))
  const canLoadMore = shown < items.length
  const loadMore = () => setShown((n) => Math.min(n + pageSize, items.length))

  // Auto-load on scroll using IntersectionObserver
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!auto || !canLoadMore) return
    const el = sentinelRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            loadMore()
          }
        }
      },
      { root: null, rootMargin: '200px', threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [auto, canLoadMore])

  const visible = items.slice(0, shown)

  return (
    <section className="space-y-6">
      <ul className="grid gap-4">
        {visible.map((r) => (
          <li key={r.guid}>
            <ReviewCard review={r} />
          </li>
        ))}
      </ul>

      {/* Load-more controls */}
      {canLoadMore && (
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={loadMore}
            className="px-4 py-2 rounded-xl border hover:bg-neutral-50"
          >
            Load more
          </button>
          {/* Sentinel for auto-load on scroll */}
          <div ref={sentinelRef} aria-hidden className="h-1 w-1" />
        </div>
      )}

      {!canLoadMore && items.length > 0 && (
        <p className="text-center text-sm text-neutral-500">You’ve reached the end.</p>
      )}
    </section>
  )
}