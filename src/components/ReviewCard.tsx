
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
        <p className="text-sm text-neutral-500 mb-2">{new Date(review.pubDate).toLocaleDateString()}</p>
        <p className="text-neutral-700 line-clamp-3">{strip(review.description)}</p>
      </a>
    </article>
  )
}

function strip(html: string) {
  return html.replace(/<[^>]*>/g, '')
}
