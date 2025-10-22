
export type Review = {
  guid: string
  link: string
  title: string
  description: string
  pubDate: string
  rating?: number
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="card p-5">
      <a href={review.link} target="_blank" rel="noreferrer" className="block">
        <h3 className="text-lg font-semibold mb-1">{review.title}</h3>
        <div className="flex items-center gap-3 mb-2">
          <p className="text-sm text-neutral-500">
            {formatPubDate(review.pubDate)}
          </p>
          {typeof review.rating === 'number' && (
            <div className="flex items-center gap-2">
              <Stars value={review.rating} />
              <span className="text-sm text-neutral-600">
                {review.rating.toFixed(review.rating % 1 ? 1 : 0)}/5
              </span>
            </div>
          )}
        </div>
        <p className="text-neutral-700 line-clamp-3">{strip(review.description)}</p>
      </a>
    </article>
  )
}

function strip(html: string) {
  return html.replace(/<[^>]*>/g, '')
}

function formatPubDate(s: string): string {
  // YYYY-MM-DD
  const ymd = s.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (ymd) {
    const y = +ymd[1], m = +ymd[2], d = +ymd[3]
    const dt = new Date(y, m - 1, d, 12, 0, 0, 0) // local noon avoids TZ shifts
    return dt.toLocaleDateString()
  }
  // MM/DD/YYYY
  const mdy = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (mdy) {
    const m = +mdy[1], d = +mdy[2], y = +mdy[3]
    const dt = new Date(y, m - 1, d, 12, 0, 0, 0)
    return dt.toLocaleDateString()
  }
  // Otherwise let the runtime handle it (has explicit time or timezone)
  const dt = new Date(s)
  return isNaN(dt.getTime()) ? s : dt.toLocaleDateString()
}

/** 0–5 stars with half-star support and customizable colors */
function Stars({
  value,
  size = 20,                          // px
  filledClass = "text-[#EE3C37]",     // filled star color
  emptyClass = "text-neutral-300",    // empty star color
  strokeClass = "text-neutral-600",   // outline color
}: {
  value: number
  size?: number
  filledClass?: string
  emptyClass?: string
  strokeClass?: string
}) {
  // clamp and round to nearest 0.5
  const v = Math.max(0, Math.min(5, Math.round(value * 2) / 2))
  const full = Math.floor(v)
  const hasHalf = v - full >= 0.5

  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => {
        const state: 'full' | 'half' | 'empty' =
          i < full ? 'full' : i === full && hasHalf ? 'half' : 'empty'
        return (
          <Star
            key={i}
            state={state}
            size={size}
            filledClass={filledClass}
            emptyClass={emptyClass}
            strokeClass={strokeClass}
          />
        )
      })}
    </div>
  )
}

function Star({
  state,
  size,
  filledClass,
  emptyClass,
  strokeClass,
}: {
  state: 'full' | 'half' | 'empty'
  size: number
  filledClass: string
  emptyClass: string
  strokeClass: string
}) {
  // render a base "empty" fill, then overlay a clipped fill for half/full
  const id = Math.random().toString(36).slice(2) // unique clipPath id per star instance
  return (
    <span className="inline-block" style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
        {/* base empty fill */}
        <g className={`${emptyClass}`}>
          <path
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            fill="currentColor"
          />
        </g>

        {/* stroke outline */}
        <g className={`${strokeClass}`}>
          <path
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>

        {/* filled overlay (full or half via clipPath) */}
        {(state === 'full' || state === 'half') && (
          <>
            {state === 'half' && (
              <defs>
                <clipPath id={`half-${id}`}>
                  {/* left half of the star’s bounding box */}
                  <rect x="0" y="0" width="12" height="24" />
                </clipPath>
              </defs>
            )}
            <g
              className={`${filledClass}`}
              clipPath={state === 'half' ? `url(#half-${id})` : undefined}
            >
              <path
                d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill="currentColor"
              />
            </g>
          </>
        )}
      </svg>
    </span>
  )
}
