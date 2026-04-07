import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Calendar } from 'lucide-react'
import { Report } from '@/lib/types'

interface ReportCardProps {
  report: Report
}

function getSentimentLabel(score: number): { label: string; color: string } {
  if (score >= 70) return { label: 'Positive', color: 'bg-green-500/10 text-green-400 border-green-500/20' }
  if (score >= 40) return { label: 'Mixed', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' }
  return { label: 'Negative', color: 'bg-red-500/10 text-red-400 border-red-500/20' }
}

export default function ReportCard({ report }: ReportCardProps) {
  const sentiment = getSentimentLabel(report.sentiment_score)

  return (
    <Card className="group p-5 bg-white/[0.02] border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-300 rounded-xl">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h3 className="font-medium text-white truncate text-sm">{report.product_name}</h3>
          <p className="text-white/30 text-xs mt-0.5 font-mono">{report.asin}</p>
        </div>
        <Badge className={`shrink-0 text-xs ${sentiment.color}`}>
          {sentiment.label}
        </Badge>
      </div>

      <div className="flex items-center gap-4 mb-5 text-sm">
        <div>
          <span className="text-2xl font-bold text-white">{report.sentiment_score}</span>
          <span className="text-white/30 text-xs">/100</span>
        </div>
        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all"
            style={{ width: `${report.sentiment_score}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-white/30 text-xs">
          <Calendar className="w-3 h-3" />
          <span>{new Date(report.created_at).toLocaleDateString()}</span>
        </div>
        <Link
          href={`/report/${report.id}`}
          className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
        >
          View Report
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </Card>
  )
}
