import OpenAI from 'openai'
import { ClaudeAnalysis, RatingBreakdown } from './types'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface AnalyzeInput {
  reviews: string[]
  ratingBreakdown: RatingBreakdown
  featureBullets: string[]
  description: string
}

function formatRatingBreakdown(rb: RatingBreakdown): string {
  return [
    `5★: ${rb.five_star.percentage}% (${rb.five_star.count} reviews)`,
    `4★: ${rb.four_star.percentage}% (${rb.four_star.count} reviews)`,
    `3★: ${rb.three_star.percentage}% (${rb.three_star.count} reviews)`,
    `2★: ${rb.two_star.percentage}% (${rb.two_star.count} reviews)`,
    `1★: ${rb.one_star.percentage}% (${rb.one_star.count} reviews)`,
  ].join('\n')
}

export async function analyzeReviews({
  reviews,
  ratingBreakdown,
  featureBullets,
  description,
}: AnalyzeInput): Promise<ClaudeAnalysis> {
  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You are a product improvement analyst. Your job is to identify gaps between what a product promises and what customers actually experience. Return structured JSON only — no markdown, no explanation.',
      },
      {
        role: 'user',
        content: `Analyze these ${reviews.length} Amazon product reviews and identify the most important gaps between promise and reality.

---
PRODUCT PROMISES (feature bullets):
${featureBullets.length > 0 ? featureBullets.join('\n') : 'Not provided'}

PRODUCT DESCRIPTION:
${description || 'Not provided'}

RATING BREAKDOWN:
${formatRatingBreakdown(ratingBreakdown)}

---
Return ONLY this JSON structure:
{
  "sentiment_score": <0-100 overall satisfaction score>,
  "positive_percentage": <% of clearly positive reviews>,
  "negative_percentage": <% of clearly negative reviews>,
  "top_complaints": [
    {
      "title": "<short complaint title>",
      "frequency": <estimated number of reviews mentioning this>,
      "description": "<1 sentence — highlight the gap between what was promised and what customers got>",
      "example_quote": "<exact quote from one of the reviews below>"
    }
  ],
  "action_items": [
    {
      "title": "<specific action title>",
      "description": "<what to fix, why it matters, and which product promise it relates to>",
      "priority": "high" | "medium" | "low"
    }
  ]
}

Include the top 5 complaints and 3 action items. Prioritize complaints that directly contradict a product promise.

REVIEWS:
${reviews.join('\n---\n')}`,
      },
    ],
    response_format: { type: 'json_object' },
  })

  const content = response.choices[0].message.content
  if (!content) throw new Error('No response from OpenAI')
  return JSON.parse(content) as ClaudeAnalysis
}
