interface SentimentChartProps {
  positivePercentage: number
  negativePercentage: number
}

export default function SentimentChart({ positivePercentage, negativePercentage }: SentimentChartProps) {
  const neutralPercentage = Math.max(0, 100 - positivePercentage - negativePercentage)

  const segments = [
    { pct: positivePercentage, color: '#4ade80', label: 'Positive' },
    { pct: neutralPercentage,  color: '#3f3f46', label: 'Neutral' },
    { pct: negativePercentage, color: '#f87171', label: 'Negative' },
  ].filter(s => s.pct > 0)

  return (
    <div
      className="p-5 rounded-xl border border-white/[0.08] bg-[#111111]"
      style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset' }}
    >
      <p className="text-white text-sm font-semibold mb-4">Sentiment Breakdown</p>

      {/* Segmented bar */}
      <div className="h-3 rounded-full overflow-hidden flex gap-0.5 mb-4">
        {segments.map((s) => (
          <div
            key={s.label}
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${s.pct}%`, backgroundColor: s.color }}
          />
        ))}
      </div>

      {/* Labels */}
      <div className="flex items-center gap-5">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-[#71717a] text-sm">{s.label}</span>
            <span className="text-white text-sm font-medium tabular-nums">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
