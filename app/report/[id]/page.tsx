'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Radar, ArrowLeft, Download, ArrowRight } from 'lucide-react'
import SummaryCard from '@/components/report/SummaryCard'
import ComplaintsList from '@/components/report/ComplaintsList'
import SentimentChart from '@/components/report/SentimentChart'
import ActionItems from '@/components/report/ActionItems'
import { Report } from '@/lib/types'
import { downloadReport } from '@/lib/pdf'

export default function ReportPage() {
  const params = useParams()
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await fetch(`/api/report/${params.id}`)
        if (!response.ok) throw new Error('Report not found')
        const data = await response.json() as Report
        setReport(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load report')
      } finally {
        setLoading(false)
      }
    }
    fetchReport()
  }, [params.id])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className="border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Radar className="w-4 h-4 text-indigo-400" />
            <span className="text-white font-semibold text-sm">ReviewRadar</span>
          </Link>
          <Link href="/dashboard" className="text-[#71717a] hover:text-white text-sm transition-colors duration-200">
            Dashboard
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-[#52525b] hover:text-[#a1a1aa] text-sm transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to dashboard
        </Link>

        {loading && <ReportSkeleton />}

        {error && (
          <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5 text-center">
            <p className="text-red-400 text-sm mb-4">{error}</p>
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 text-sm text-[#71717a] hover:text-white transition-colors"
            >
              Try another product
            </Link>
          </div>
        )}

        {report && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-xl font-bold text-white leading-tight mb-2 truncate">
                  {report.product_name.length > 60
                    ? report.product_name.slice(0, 60) + '…'
                    : report.product_name}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded-md border"
                    style={{ backgroundColor: 'rgba(99,102,241,0.08)', borderColor: 'rgba(99,102,241,0.2)', color: '#818cf8' }}
                  >
                    {report.asin}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-md border"
                    style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#71717a' }}
                  >
                    {new Date(report.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => downloadReport(report)}
                variant="outline"
                size="sm"
                className="shrink-0 border-white/10 text-[#71717a] hover:text-white hover:bg-white/5 gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </Button>
            </div>

            {/* Metric cards */}
            <SummaryCard
              sentimentScore={report.sentiment_score}
              totalComplaints={report.top_complaints.length}
              totalReviews={report.total_reviews}
              positivePercentage={report.positive_percentage}
            />

            {/* Sentiment bar */}
            <SentimentChart
              positivePercentage={report.positive_percentage}
              negativePercentage={report.negative_percentage}
            />

            {/* Complaints */}
            <ComplaintsList complaints={report.top_complaints} />

            {/* Action Items */}
            <ActionItems items={report.action_items} />

            {/* CTA */}
            <div
              className="flex items-center justify-between p-5 rounded-xl border border-white/[0.08]"
              style={{ backgroundColor: '#111111' }}
            >
              <div>
                <p className="text-white text-sm font-medium">Analyze another product?</p>
                <p className="text-[#52525b] text-xs mt-0.5">Paste a new Amazon URL to get a fresh report</p>
              </div>
              <Link
                href="/analyze"
                className="inline-flex items-center gap-2 h-8 px-4 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:opacity-90 shrink-0"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
              >
                New analysis
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function ReportSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-2">
        <Skeleton className="h-6 w-72 rounded-lg bg-white/[0.06]" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-24 rounded-md bg-white/[0.04]" />
          <Skeleton className="h-5 w-32 rounded-md bg-white/[0.04]" />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[0,1,2,3].map(i => <Skeleton key={i} className="h-28 rounded-xl bg-white/[0.05]" />)}
      </div>
      <Skeleton className="h-20 rounded-xl bg-white/[0.05]" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-32 rounded-md bg-white/[0.04]" />
        {[0,1,2].map(i => <Skeleton key={i} className="h-36 rounded-xl bg-white/[0.05]" />)}
      </div>
    </div>
  )
}
