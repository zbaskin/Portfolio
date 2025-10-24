
import { getReviewsFromCsv } from '../../lib/reviews-csv'
import { ReviewsBrowser } from '../../components/ReviewsBrowser'

export const dynamic = 'error'

export default async function ReviewsPage() {
  const reviews = await getReviewsFromCsv()

  return (
    <section className="space-y-6">
      {reviews.length === 0 ? (
        <div className="card p-6">
          <p className="text-neutral-700">
            No reviews found. Add a <code className="px-1 py-0.5 bg-neutral-100 rounded">/public/reviews.csv</code> file and rebuild.
          </p>
        </div>
      ) : (
        <ReviewsBrowser items={reviews} pageSize={10} />
      )}
    </section>
  )
}
