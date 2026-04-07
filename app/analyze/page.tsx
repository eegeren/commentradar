'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Radar } from 'lucide-react'
import UrlInput from '@/components/analyze/UrlInput'
import ProgressSteps from '@/components/analyze/ProgressSteps'
import { Step } from '@/components/analyze/ProgressSteps'

const INITIAL_STEPS: Step[] = [
  {
    label: 'Fetching reviews',
    description: 'Scraping Amazon product page for customer reviews',
    status: 'pending',
  },
  {
    label: 'AI analysis',
    description: 'Claude is grouping complaints and identifying patterns',
    status: 'pending',
  },
  {
    label: 'Generating report',
    description: 'Building your actionable insights report',
    status: 'pending',
  },
]

function AnalyzeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [url, setUrl] = useState(searchParams.get('url') ?? '')
  const [loading, setLoading] = useState(false)
  const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS)
  const [error, setError] = useState<string | null>(null)

  function updateStep(index: number, status: Step['status']) {
    setSteps(prev =>
      prev.map((s, i) => (i === index ? { ...s, status } : s))
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return

    setLoading(true)
    setError(null)
    setSteps(INITIAL_STEPS)

    try {
      // Step 1: Fetching
      updateStep(0, 'active')
      await new Promise(r => setTimeout(r, 800))

      // Step 2: AI analysis
      updateStep(0, 'complete')
      updateStep(1, 'active')

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })

      if (!response.ok) {
        const data = await response.json() as { error?: string }
        throw new Error(data.error ?? 'Analysis failed')
      }

      // Step 3: Generating
      updateStep(1, 'complete')
      updateStep(2, 'active')

      await new Promise(r => setTimeout(r, 500))
      updateStep(2, 'complete')

      const data = await response.json() as { reportId: string }
      await new Promise(r => setTimeout(r, 400))
      router.push(`/report/${data.reportId}`)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setError(message)
      setLoading(false)
      // Mark active step as error
      setSteps(prev => prev.map(s => s.status === 'active' ? { ...s, status: 'error' } : s))
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2">
          <Radar className="w-5 h-5 text-indigo-400" />
          <span className="font-semibold text-white">ReviewRadar</span>
        </Link>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Analyze a product</h1>
            <p className="text-white/40">Paste an Amazon product URL to get started</p>
          </div>

          <UrlInput
            url={url}
            onChange={setUrl}
            onSubmit={handleSubmit}
            loading={loading}
          />

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {loading && (
            <div className="mt-12">
              <ProgressSteps steps={steps} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default function AnalyzePage() {
  return (
    <Suspense>
      <AnalyzeContent />
    </Suspense>
  )
}
