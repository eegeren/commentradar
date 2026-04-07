'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

export default function LandingUrlForm() {
  const [url, setUrl] = useState('')
  const router = useRouter()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextUrl = url.trim()
    if (!nextUrl) return

    router.push(`/analyze?url=${encodeURIComponent(nextUrl)}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-[8px] border border-white/10 bg-[#0b1722] p-2 shadow-[0_12px_35px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="url"
            placeholder="https://amazon.com/dp/..."
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="h-12 min-w-0 flex-1 rounded-md border border-white/8 bg-[#09131d] px-4 text-sm text-white outline-none placeholder:text-[#607286] focus:border-[#9ff5d1]/40"
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-md border border-[#9ff5d1]/35 bg-[#9ff5d1] px-5 text-sm font-semibold text-[#07111a] transition-transform hover:-translate-y-px"
          >
            Analyze free
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="mt-3 text-sm text-[#7e92a8]">Paste a product URL. The sample report on this page is the output shape.</p>
    </form>
  )
}
