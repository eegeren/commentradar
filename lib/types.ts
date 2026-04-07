export interface Review {
  id: string
  text: string
  rating: number
  date: string
}

export interface Complaint {
  title: string
  frequency: number
  description: string
  example_quote: string
}

export interface ActionItem {
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
}

export interface Report {
  id: string
  product_url: string
  product_name: string
  asin: string
  created_at: string
  total_reviews: number
  sentiment_score: number
  positive_percentage: number
  negative_percentage: number
  top_complaints: Complaint[]
  action_items: ActionItem[]
}

export interface StarTier {
  percentage: number
  count: number
}

export interface RatingBreakdown {
  five_star: StarTier
  four_star: StarTier
  three_star: StarTier
  two_star: StarTier
  one_star: StarTier
}

export interface ProductContext {
  feature_bullets: string[]
  description: string
  rating_breakdown: RatingBreakdown
}

export interface AnalyzeResponse {
  reportId: string
}

export interface ClaudeAnalysis {
  sentiment_score: number
  positive_percentage: number
  negative_percentage: number
  top_complaints: Complaint[]
  action_items: ActionItem[]
}
