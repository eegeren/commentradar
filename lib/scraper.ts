import { Review, RatingBreakdown } from './types'

const RAINFOREST_BASE = 'https://api.rainforestapi.com/request'

interface RainforestReview {
  id: string
  title: string
  body: string
  rating: number
  date: { raw: string }
  profile?: { name: string }
}

interface RainforestProduct {
  title: string
  top_reviews: RainforestReview[]
  feature_bullets: string[]
  description: string
  rating_breakdown: {
    five_star: { percentage: number; count: number }
    four_star: { percentage: number; count: number }
    three_star: { percentage: number; count: number }
    two_star: { percentage: number; count: number }
    one_star: { percentage: number; count: number }
  }
}

export interface ScrapedProduct {
  reviews: Review[]
  productName: string
  featureBullets: string[]
  description: string
  ratingBreakdown: RatingBreakdown
}

function getApiKey(): string {
  const key = process.env.RAINFOREST_API_KEY
  if (!key) throw new Error('RAINFOREST_API_KEY is not configured.')
  return key
}

export function extractAsin(url: string): string {
  const match = url.match(/\/dp\/([A-Z0-9]{10})/i) || url.match(/\/product\/([A-Z0-9]{10})/i)
  if (match) return match[1].toUpperCase()
  const bare = url.match(/^([A-Z0-9]{10})$/i)
  if (bare) return bare[1].toUpperCase()
  throw new Error('Could not extract ASIN from URL. Make sure it is a valid Amazon product link.')
}

async function rainforestGet<T>(params: Record<string, string>): Promise<T | null> {
  const qs = new URLSearchParams({
    api_key: getApiKey(),
    amazon_domain: 'amazon.com',
    ...params,
  })
  const res = await fetch(`${RAINFOREST_BASE}?${qs}`, { cache: 'no-store' })
  if (!res.ok) {
    console.warn(`Rainforest ${params.type} endpoint returned ${res.status} — skipping`)
    return null
  }
  return res.json() as Promise<T>
}

function mapReview(r: RainforestReview): Review {
  return {
    id: r.id,
    text: r.title ? `${r.title}. ${r.body}` : r.body,
    rating: r.rating,
    date: r.date?.raw ?? '',
  }
}

export async function scrapeProduct(url: string): Promise<ScrapedProduct> {
  const asin = extractAsin(url)

  // Fire both endpoints in parallel — product is required for context, reviews preferred for volume
  const [reviewsData, productData] = await Promise.all([
    rainforestGet<{ reviews: RainforestReview[] }>({ type: 'reviews', asin }),
    rainforestGet<{ product: RainforestProduct }>({ type: 'product', asin }),
  ])

  const product = productData?.product
  if (!product) {
    throw new Error('Could not fetch product data. Please check the URL and try again.')
  }

  // Prefer dedicated reviews endpoint; fall back to product.top_reviews
  const reviewList = (reviewsData?.reviews ?? []).length > 0
    ? reviewsData!.reviews
    : (product.top_reviews ?? [])

  if (reviewList.length === 0) {
    throw new Error('No reviews found for this product.')
  }

  const rb = product.rating_breakdown
  const ratingBreakdown: RatingBreakdown = {
    five_star:  { percentage: rb?.five_star?.percentage  ?? 0, count: rb?.five_star?.count  ?? 0 },
    four_star:  { percentage: rb?.four_star?.percentage  ?? 0, count: rb?.four_star?.count  ?? 0 },
    three_star: { percentage: rb?.three_star?.percentage ?? 0, count: rb?.three_star?.count ?? 0 },
    two_star:   { percentage: rb?.two_star?.percentage   ?? 0, count: rb?.two_star?.count   ?? 0 },
    one_star:   { percentage: rb?.one_star?.percentage   ?? 0, count: rb?.one_star?.count   ?? 0 },
  }

  return {
    reviews:        reviewList.map(mapReview),
    productName:    product.title ?? `Amazon Product (${asin})`,
    featureBullets: product.feature_bullets ?? [],
    description:    product.description ?? '',
    ratingBreakdown,
  }
}
