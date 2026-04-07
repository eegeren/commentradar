'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { Radar, Plus, Search, SlidersHorizontal } from 'lucide-react'
import ReportCard from '@/components/dashboard/ReportCard'
import EmptyState from '@/components/dashboard/EmptyState'
import { Skeleton } from '@/components/ui/skeleton'
import { Report } from '@/lib/types'

type SortOption = 'newest' | 'oldest' | 'score_high' | 'score_low'

export default function DashboardPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('newest')

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetch('/api/reports')
        if (response.ok) {
          const data = await response.json() as Report[]
          setReports(data)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchReports()
  }, [])

  const filtered = useMemo(() => {
    let result = reports
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(r =>
        r.product_name.toLowerCase().includes(q) || r.asin.toLowerCase().includes(q)
      )
    }
    return [...result].sort((a, b) => {
      if (sort === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      if (sort === 'oldest') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      if (sort === 'score_high') return b.sentiment_score - a.sentiment_score
      if (sort === 'score_low') return a.sentiment_score - b.sentiment_score
      return 0
    })
  }, [reports, search, sort])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2">
          <Radar className="w-5 h-5 text-indigo-400" />
          <span className="font-semibold text-white">ReviewRadar</span>
        </Link>
        <Link
          href="/analyze"
          className="inline-flex items-center gap-1.5 h-7 px-2.5 text-[0.8rem] rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-all duration-200"
        >
          <Plus className="w-3.5 h-3.5" />
          New analysis
        </Link>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Your reports</h1>
            <p className="text-white/40 text-sm mt-1">All your analyzed products in one place</p>
          </div>
          {!loading && reports.length > 0 && (
            <span className="text-white/30 text-sm">{reports.length} report{reports.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {!loading && reports.length > 1 && (
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by product name or ASIN…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-9 bg-white/[0.04] border border-white/[0.08] rounded-lg pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-white/30" />
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortOption)}
                className="h-9 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 text-sm text-white/70 focus:outline-none focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="score_high">Score: high → low</option>
                <option value="score_low">Score: low → high</option>
              </select>
            </div>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0, 1, 2].map(i => (
              <Skeleton key={i} className="h-40 rounded-xl bg-white/[0.03]" />
            ))}
          </div>
        )}

        {!loading && reports.length === 0 && <EmptyState />}

        {!loading && reports.length > 0 && filtered.length === 0 && (
          <div className="text-center py-16 text-white/30 text-sm">
            No reports match &ldquo;{search}&rdquo;
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
