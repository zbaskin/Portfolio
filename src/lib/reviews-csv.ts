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
      const pubDate = get('pubdate') || get('date') || get('watched_on') || get('logged_at') || new Date().toISOString()
      return {
        guid: `${link}|${pubDate}` || Math.random().toString(36).slice(2),
        link,
        title,
        description,
        pubDate,
      }
    })

    reviews.sort((a, b) => {
      const da = toTime(a.pubDate)
      const db = toTime(b.pubDate)
      if (db !== da) return db - da           // newer first
      return a.title.localeCompare(b.title)   // stable tiebreaker
    })

    return reviews

  } catch {
    return []
  }
}

function toTime(s: string): number {
  // Normalize common numeric-only date formats if needed
  // Prefer native parsing first; it's fine for ISO + most formats
  const t = Date.parse(s)
  if (!Number.isNaN(t)) return t

  // Try YYYY-MM-DD manually
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])).getTime()

  // Try MM/DD/YYYY
  const us = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (us) return new Date(Number(us[3]), Number(us[1]) - 1, Number(us[2])).getTime()

  return 0 // unknown date → sort to bottom
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
