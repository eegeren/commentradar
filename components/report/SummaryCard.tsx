import { TrendingUp, MessageCircle, AlertCircle, ThumbsUp } from 'lucide-react'

interface SummaryCardProps {
  sentimentScore: number
  totalComplaints: number
  totalReviews: number
  positivePercentage: number
}

function scoreColor(score: number) {
  if (score >= 70) return { text: '#4ade80', bg: 'rgba(74,222,128,0.1)', label: 'Positive' }
  if (score >= 40) return { text: '#facc15', bg: 'rgba(250,204,21,0.1)', label: 'Mixed' }
  return { text: '#f87171', bg: 'rgba(248,113,113,0.1)', label: 'Critical' }
}

const metrics = (props: SummaryCardProps) => [
  {
    icon: TrendingUp,
    label: 'Sentiment Score',
    value: props.sentimentScore,
    suffix: '/100',
    subLabel: scoreColor(props.sentimentScore).label,
    iconColor: scoreColor(props.sentimentScore).text,
    iconBg: scoreColor(props.sentimentScore).bg,
    valueColor: scoreColor(props.sentimentScore).text,
  },
  {
    icon: MessageCircle,
    label: 'Reviews Analyzed',
    value: props.totalReviews,
    suffix: '',
    subLabel: 'fetched automatically',
    iconColor: '#38bdf8',
    iconBg: 'rgba(56,189,248,0.1)',
    valueColor: '#ffffff',
  },
  {
    icon: AlertCircle,
    label: 'Complaints Found',
    value: props.totalComplaints,
    suffix: '',
    subLabel: 'distinct issues',
    iconColor: '#fb923c',
    iconBg: 'rgba(251,146,60,0.1)',
    valueColor: '#ffffff',
  },
  {
    icon: ThumbsUp,
    label: 'Positive Reviews',
    value: props.positivePercentage,
    suffix: '%',
    subLabel: 'satisfied customers',
    iconColor: '#a78bfa',
    iconBg: 'rgba(167,139,250,0.1)',
    valueColor: '#ffffff',
  },
]

export default function SummaryCard(props: SummaryCardProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {metrics(props).map((m) => (
        <div
          key={m.label}
          className="p-5 rounded-xl border border-white/[0.08] bg-[#111111]"
          style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset' }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
            style={{ backgroundColor: m.iconBg }}
          >
            <m.icon className="w-4 h-4" style={{ color: m.iconColor }} />
          </div>
          <p className="text-[#52525b] text-xs mb-1">{m.label}</p>
          <div className="flex items-baseline gap-0.5 mb-0.5">
            <span className="text-3xl font-bold tabular-nums" style={{ color: m.valueColor }}>
              {m.value}
            </span>
            {m.suffix && <span className="text-[#52525b] text-sm ml-0.5">{m.suffix}</span>}
          </div>
          <p className="text-[#3f3f46] text-xs">{m.subLabel}</p>
        </div>
      ))}
    </div>
  )
}
