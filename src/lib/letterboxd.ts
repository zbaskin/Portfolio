
import type { Review } from '../components/ReviewCard'

export async function getLetterboxdReviews(rssUrl: string): Promise<Review[]> {
  try {
    const res = await fetch(rssUrl, { cache: 'force-cache' })
    if (!res.ok) return []
    const xml = await res.text()
    return parseRss(xml)
  } catch {
    return []
  }
}

function parseRss(xml: string): Review[] {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
  return items.map((m) => {
    const item = m[1]
    const get = (tag: string) => matchTag(item, tag)
    return {
      guid: get('guid') || Math.random().toString(36).slice(2),
      link: get('link') || '#',
      title: decode(get('title') || 'Untitled'),
      description: get('description') || '',
      pubDate: get('pubDate') || new Date().toISOString(),
    }
  })
}

function matchTag(src: string, tag: string): string | null {
  const re = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`)
  const m = src.match(re)
  if (m && m[1]) return m[1]
  const reCdata = new RegExp(`<${tag}><!\[CDATA\(([\\s\\S]*?)\)\]><\\/${tag}>`)
  const mc = src.match(reCdata)
  if (mc && mc[1]) return mc[1]
  const reCdataAlt = new RegExp(`<${tag}><!\[CDATA\[([\\s\\S]*?)\]><\\/${tag}>`)
  const mcAlt = src.match(reCdataAlt)
  return mcAlt && mcAlt[1] ? mcAlt[1] : null
}

function decode(s: string) {
  return s
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
}
