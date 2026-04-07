'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Loader2 } from 'lucide-react'

interface UrlInputProps {
  url: string
  onChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  loading: boolean
}

export default function UrlInput({ url, onChange, onSubmit, loading }: UrlInputProps) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="url"
          placeholder="https://amazon.com/dp/..."
          value={url}
          onChange={(e) => onChange(e.target.value)}
          disabled={loading}
          className="flex-1 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 text-base"
        />
        <Button
          type="submit"
          disabled={loading || !url.trim()}
          className="h-12 px-6 bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-all duration-200 gap-2 shrink-0 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Analyze
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
