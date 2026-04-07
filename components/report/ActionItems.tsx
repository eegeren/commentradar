import { ActionItem } from '@/lib/types'

interface ActionItemsProps {
  items: ActionItem[]
}

const priorityConfig = {
  high:   { label: 'High',   border: '#f87171', badge: 'rgba(248,113,113,0.12)', badgeText: '#f87171' },
  medium: { label: 'Medium', border: '#facc15', badge: 'rgba(250,204,21,0.12)',  badgeText: '#facc15' },
  low:    { label: 'Low',    border: '#4ade80', badge: 'rgba(74,222,128,0.12)',  badgeText: '#4ade80' },
}

const priorityOrder = { high: 0, medium: 1, low: 2 }

export default function ActionItems({ items }: ActionItemsProps) {
  const sorted = [...items].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

  return (
    <div>
      <p className="text-white text-sm font-semibold mb-3">Action Items</p>
      <div className="space-y-2">
        {sorted.map((item, index) => {
          const cfg = priorityConfig[item.priority]
          return (
            <div
              key={index}
              className="p-5 rounded-xl border border-white/[0.08] bg-[#111111] hover:border-white/[0.12] transition-all duration-200 relative overflow-hidden"
              style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset' }}
            >
              {/* Left priority accent */}
              <div
                className="absolute left-0 inset-y-0 w-[3px] rounded-l-xl"
                style={{ backgroundColor: cfg.border }}
              />

              <div className="pl-2">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-[15px] font-semibold text-white">{item.title}</h3>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-md shrink-0 mt-0.5"
                    style={{ backgroundColor: cfg.badge, color: cfg.badgeText }}
                  >
                    {cfg.label}
                  </span>
                </div>
                <p className="text-[#71717a] text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
