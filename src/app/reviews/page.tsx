
import { getLetterboxdReviews } from '../../lib/letterboxd'
import { ReviewCard } from '../../components/ReviewCard'

export const dynamic = 'error'

export default async function ReviewsPage() {
  const rssUrl = process.env.NEXT_PUBLIC_LETTERBOXD_RSS
  const reviews = rssUrl ? await getLetterboxdReviews(rssUrl) : []

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Recent Reviews</h1>
      {!rssUrl && (
        <p className="text-neutral-700">
          Set <code className="px-1 py-0.5 bg-neutral-100 rounded">NEXT_PUBLIC_LETTERBOXD_RSS</code> in <code>.env</code> to display your Letterboxd feed at build time.
        </p>
      )}

      {reviews.length === 0 ? (
        <div className="card p-6">
          <p className="text-neutral-700">No reviews found yet.</p>
        </div>
      ) : (
        <ul className="grid gap-4">
          {reviews.map((r) => (
            <li key={r.guid}>
              <ReviewCard review={r} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
