'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Radar, Plus } from 'lucide-react'
import ReportCard from '@/components/dashboard/ReportCard'
import EmptyState from '@/components/dashboard/EmptyState'
import { Skeleton } from '@/components/ui/skeleton'
import { Report } from '@/lib/types'

export default function DashboardPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

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

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[0, 1, 2].map(i => (
              <Skeleton key={i} className="h-40 rounded-xl bg-white/[0.03]" />
            ))}
          </div>
        )}

        {!loading && reports.length === 0 && <EmptyState />}

        {!loading && reports.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
