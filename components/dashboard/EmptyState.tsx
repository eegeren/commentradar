import Link from 'next/link'
import { ArrowRight, BarChart3 } from 'lucide-react'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
        <BarChart3 className="w-7 h-7 text-indigo-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">No reports yet</h3>
      <p className="text-white/40 text-sm max-w-xs mb-8">
        Analyze your first Amazon product to see insights and complaints here.
      </p>
      <Link
        href="/analyze"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium transition-all duration-200"
      >
        Analyze a product
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
