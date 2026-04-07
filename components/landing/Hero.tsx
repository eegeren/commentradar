'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const [url, setUrl] = useState('')
  const router = useRouter()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!url.trim()) return
    router.push(`/analyze?url=${encodeURIComponent(url.trim())}`)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[800px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(ellipse, #6366f1 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-sm text-indigo-300 mb-8 font-medium">
          <span className="text-indigo-400">✦</span>
          AI-Powered Review Analysis
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-[4.25rem] font-bold text-white leading-[1.08] tracking-[-0.02em] mb-6">
          Turn customer reviews into
          <br />
          <span
            className="inline-block"
            style={{
              background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            your competitive advantage
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-10 leading-relaxed">
          Paste any Amazon product URL. Get instant AI analysis of complaints,
          sentiment, and actionable fixes.
        </p>

        {/* URL Input */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-6">
          <div className="flex flex-col sm:flex-row gap-2 p-1.5 rounded-xl border border-white/[0.08] bg-[#111111]">
            <input
              type="url"
              placeholder="https://amazon.com/dp/B073JYC4XM..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 h-11 px-4 bg-transparent text-white placeholder:text-[#52525b] text-sm outline-none"
            />
            <button
              type="submit"
              className="h-11 px-5 rounded-lg text-white text-sm font-medium transition-all duration-200 flex items-center gap-2 shrink-0 hover:opacity-90 active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                boxShadow: '0 0 20px rgba(99,102,241,0.4)',
              }}
            >
              Analyze free
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[#52525b] text-xs mt-3">No account needed · First report is free</p>
        </form>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {/* Avatar stack */}
          <div className="flex -space-x-2">
            {['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'].map((color, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center text-white text-xs font-semibold"
                style={{ backgroundColor: color, zIndex: 5 - i }}
              >
                {['A', 'J', 'M', 'S', 'K'][i]}
              </div>
            ))}
          </div>
          <p className="text-[#71717a] text-sm">
            <span className="text-white font-medium">500+</span> Amazon sellers trust ReviewRadar
          </p>
        </div>
      </div>
    </section>
  )
}
