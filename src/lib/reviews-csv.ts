import fs from 'node:fs/promises'
import path from 'node:path'
import type { Review } from '../components/ReviewCard'

/** Reads /public/reviews.csv at build time and returns Review[] */
export async function getReviewsFromCsv(): Promise<Review[]> {
  try {
    const csvPath = path.join(process.cwd(), 'public', 'reviews.csv')
    const data = await fs.readFile(csvPath, 'utf8')
    const rows = parseCsv(data)
    const reviews: Review[] = rows.map((row) => {
      const get = (k: string) => lookup(row, k)
      const title = get('name') || get('title') || get('film') || get('movie') || 'Untitled'
      const link = get('Letterboxd URI') || get('link') || get('url') || '#'
      const description = get('description') || get('review') || get('content') || ''
      const pubDate = get('Watched Date') || get('pubdate') || get('date') || get('watched_on') || get('logged_at') || new Date().toISOString()
      const ratingRaw = get('rating') ?? get('stars') ?? get('score')
      const ratingNum = ratingRaw != null && ratingRaw !== '' ? Number(ratingRaw) : NaN
      const rating = Number.isFinite(ratingNum)
        ? Math.round(Math.max(0, Math.min(5, ratingNum)) * 2) / 2
        : undefined
      return {
        guid: `${link}|${pubDate}` || Math.random().toString(36).slice(2),
        link,
        title,
        description,
        pubDate,
        ...(rating === undefined ? {} : { rating }),
      }
    })

    reviews.sort((a, b) => toLocalDayMs(b.pubDate) - toLocalDayMs(a.pubDate))

    return reviews

  } catch {
    return []
  }
}

function toLocalDayMs(s: string): number {
  if (!s) return 0

  // YYYY-MM-DD (date-only) → construct LOCAL date at noon
  const ymd = s.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (ymd) {
    const y = +ymd[1], m = +ymd[2], d = +ymd[3]
    return new Date(y, m - 1, d, 12, 0, 0, 0).getTime()
  }

  // MM/DD/YYYY (date-only) → construct LOCAL date at noon
  const mdy = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (mdy) {
    const m = +mdy[1], d = +mdy[2], y = +mdy[3]
    return new Date(y, m - 1, d, 12, 0, 0, 0).getTime()
  }

  // Anything with a time (e.g., 2025-10-22T14:30:00Z) → use native parse
  const t = Date.parse(s)
  return Number.isNaN(t) ? 0 : t
}

/** Minimal CSV parser supporting quoted fields, commas and newlines in quotes. */
function parseCsv(src: string): Record<string, string>[] {
  const out: Record<string, string>[] = []
  const rows: string[][] = []
  let field = ''
  let row: string[] = []
  let i = 0
  let inQuotes = false

  while (i < src.length) {
    const ch = src[i]
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') { field += '"'; i += 2; continue }
        inQuotes = false; i++; continue
      }
      field += ch; i++; continue
    } else {
      if (ch === '"') { inQuotes = true; i++; continue }
      if (ch === ',') { row.push(field); field = ''; i++; continue }
      if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && src[i + 1] === '\n') i++
        row.push(field); field = ''
        if (row.length > 1 || row[0] !== '') rows.push(row)
        row = []; i++; continue
      }
      field += ch; i++
    }
  }

  row.push(field)
  if (row.length > 1 || row[0] !== '') rows.push(row)

  if (rows.length === 0) return []
  const header = rows[0].map(h => h.trim())
  for (let r = 1; r < rows.length; r++) {
    const rec: Record<string, string> = {}
    const cols = rows[r]
    for (let c = 0; c < header.length; c++) rec[header[c]] = (cols[c] ?? '').trim()
    out.push(rec)
  }
  return out
}

function lookup(rec: Record<string, string>, key: string): string | undefined {
  const k = Object.keys(rec).find(k => k.toLowerCase() === key.toLowerCase())
  return k ? rec[k] : undefined
}
