import { NextRequest, NextResponse } from 'next/server'
import { scrapeProduct, extractAsin } from '@/lib/scraper'
import { analyzeReviews } from '@/lib/claude'
import { saveReport } from '@/lib/store'
import { Report } from '@/lib/types'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { url: string }
    const { url } = body

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
    }

    const { reviews, productName, featureBullets, description, ratingBreakdown } = await scrapeProduct(url)

    const analysis = await analyzeReviews({
      reviews: reviews.map(r => r.text),
      ratingBreakdown,
      featureBullets,
      description,
    })

    const report: Report = {
      id: randomUUID(),
      product_url: url,
      product_name: productName,
      asin: extractAsin(url),
      created_at: new Date().toISOString(),
      total_reviews: reviews.length,
      sentiment_score: analysis.sentiment_score,
      positive_percentage: analysis.positive_percentage,
      negative_percentage: analysis.negative_percentage,
      top_complaints: analysis.top_complaints,
      action_items: analysis.action_items,
    }

    saveReport(report)

    return NextResponse.json({ reportId: report.id })
  } catch (error) {
    console.error('Analyze error:', error)
    const message = error instanceof Error ? error.message : 'Failed to analyze reviews. Please try again.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
