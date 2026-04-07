import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Try it out, no strings attached',
    features: [
      '1 report per month',
      'Top 5 complaints',
      '3 action items',
      'PDF download',
    ],
    cta: 'Get started free',
    highlight: false,
  },
  {
    name: 'Starter',
    price: '$19',
    period: '/month',
    description: 'For sellers tracking product feedback',
    features: [
      '10 reports per month',
      'Top 10 complaints',
      '5 action items',
      'PDF download',
      'Email delivery',
      'Report history',
    ],
    cta: 'Start free trial',
    highlight: true,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'For agencies and power sellers',
    features: [
      'Unlimited reports',
      'Full complaint analysis',
      '10 action items',
      'PDF + CSV export',
      'API access',
      'Priority support',
      'Custom branding',
    ],
    cta: 'Get Pro',
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section className="py-24 px-6 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-[#a1a1aa] text-lg">Start free. Upgrade when you need more.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-xl border transition-all duration-200"
              style={
                plan.highlight
                  ? {
                      borderColor: 'rgba(99,102,241,0.5)',
                      background: 'linear-gradient(180deg, rgba(99,102,241,0.06) 0%, #111111 100%)',
                      boxShadow: '0 0 0 1px rgba(99,102,241,0.2), 0 16px 48px rgba(99,102,241,0.08)',
                    }
                  : {
                      borderColor: 'rgba(255,255,255,0.08)',
                      backgroundColor: '#111111',
                    }
              }
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                  <span
                    className="px-3 py-1 rounded-full text-white text-xs font-semibold"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6">
                <p className="text-[#a1a1aa] text-sm mb-1">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-white tracking-tight">{plan.price}</span>
                  <span className="text-[#52525b] text-sm">{plan.period}</span>
                </div>
                <p className="text-[#52525b] text-sm mb-6">{plan.description}</p>

                <button
                  className="w-full h-9 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98] mb-6"
                  style={
                    plan.highlight
                      ? {
                          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                          color: '#ffffff',
                          boxShadow: '0 0 16px rgba(99,102,241,0.3)',
                        }
                      : {
                          backgroundColor: 'rgba(255,255,255,0.06)',
                          color: '#ffffff',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }
                  }
                >
                  {plan.cta}
                </button>

                <ul className="space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm">
                      <div className="w-4 h-4 rounded-full bg-indigo-500/15 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-indigo-400" />
                      </div>
                      <span className="text-[#a1a1aa]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
