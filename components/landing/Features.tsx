import { Search, Sparkles, FileBarChart } from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Instant scraping',
    description: 'We automatically fetch all reviews from your Amazon product page — no copy-pasting required.',
    accent: '#6366f1',
    bg: 'rgba(99,102,241,0.1)',
  },
  {
    icon: Sparkles,
    title: 'AI analysis',
    description: 'GPT-4 groups hundreds of complaints into themes so you see meaningful patterns, not noise.',
    accent: '#a78bfa',
    bg: 'rgba(167,139,250,0.1)',
  },
  {
    icon: FileBarChart,
    title: 'Actionable reports',
    description: 'Get a prioritized fix list with specific improvements — a clear roadmap, not just data.',
    accent: '#38bdf8',
    bg: 'rgba(56,189,248,0.1)',
  },
]

const steps = [
  {
    number: '01',
    title: 'Paste a URL',
    description: 'Drop any Amazon product URL into the input. Works with any product on any Amazon marketplace.',
  },
  {
    number: '02',
    title: 'AI analyzes',
    description: 'We fetch the reviews and run them through GPT-4 to identify complaint themes and sentiment patterns.',
  },
  {
    number: '03',
    title: 'Get your report',
    description: 'Receive a structured report with top complaints, sentiment breakdown, and prioritized action items.',
  },
]

export default function Features() {
  return (
    <>
      {/* Features section */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Everything you need to improve
            </h2>
            <p className="text-[#a1a1aa] text-lg max-w-xl mx-auto">
              From raw reviews to a concrete action plan — in one click.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-6 rounded-xl border border-white/[0.08] bg-[#111111] hover:border-white/[0.14] hover:bg-[#141414] transition-all duration-200"
                style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: f.bg }}
                >
                  <f.icon className="w-5 h-5" style={{ color: f.accent }} />
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-[#71717a] text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              From URL to report in 60 seconds
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-[22px] left-[calc(16.6%+1rem)] right-[calc(16.6%+1rem)] h-px bg-white/[0.06]" />

            {steps.map((step, i) => (
              <div key={step.number} className="relative p-6 rounded-xl border border-white/[0.08] bg-[#111111]">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      background: i === 1
                        ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                        : 'rgba(99,102,241,0.12)',
                      color: i === 1 ? '#ffffff' : '#6366f1',
                    }}
                  >
                    {step.number}
                  </div>
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-[#71717a] text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
