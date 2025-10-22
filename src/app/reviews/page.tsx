
import { getReviewsFromCsv } from '../../lib/reviews-csv'
import { ReviewCard } from '../../components/ReviewCard'

export const dynamic = 'error'

export default async function ReviewsPage() {
  const reviews = await getReviewsFromCsv()

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Recent Reviews</h1>

      {reviews.length === 0 ? (
        <div className="card p-6">
          <p className="text-neutral-700">
            No reviews found. Add a <code className="px-1 py-0.5 bg-neutral-100 rounded">/public/reviews.csv</code> file and rebuild.
          </p>
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
