import { Complaint } from '@/lib/types'

interface ComplaintsListProps {
  complaints: Complaint[]
}

export default function ComplaintsList({ complaints }: ComplaintsListProps) {
  const maxFrequency = Math.max(...complaints.map(c => c.frequency), 1)

  return (
    <div>
      <p className="text-white text-sm font-semibold mb-3">Top Complaints</p>
      <div className="space-y-2">
        {complaints.map((complaint, index) => (
          <div
            key={index}
            className="p-5 rounded-xl border border-white/[0.08] bg-[#111111] hover:border-white/[0.12] transition-all duration-200"
            style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset' }}
          >
            <div className="flex items-start gap-4">
              {/* Rank badge */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold mt-0.5"
                style={{
                  backgroundColor: index === 0 ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
                  color: index === 0 ? '#818cf8' : '#52525b',
                }}
              >
                {index + 1}
              </div>

              <div className="flex-1 min-w-0">
                {/* Title + frequency */}
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="text-[15px] font-semibold text-white">{complaint.title}</h3>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-md shrink-0"
                    style={{
                      backgroundColor: 'rgba(99,102,241,0.12)',
                      color: '#818cf8',
                    }}
                  >
                    {complaint.frequency}×
                  </span>
                </div>

                {/* Frequency bar */}
                <div className="h-1 rounded-full bg-white/[0.05] mb-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(complaint.frequency / maxFrequency) * 100}%`,
                      background: 'linear-gradient(90deg, #6366f1, #818cf8)',
                    }}
                  />
                </div>

                <p className="text-[#71717a] text-sm leading-relaxed mb-3">{complaint.description}</p>

                {/* Quote with left accent border */}
                <div
                  className="pl-3 py-2 text-sm italic text-[#52525b] leading-relaxed"
                  style={{ borderLeft: '2px solid rgba(99,102,241,0.4)' }}
                >
                  &ldquo;{complaint.example_quote}&rdquo;
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
