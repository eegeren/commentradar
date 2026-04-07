import Link from 'next/link'
import {
  ArrowRight,
  ChartColumnIncreasing,
  Check,
  ChevronRight,
  Clock3,
  Radar,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from 'lucide-react'
import Footer from '@/components/landing/Footer'
import LandingUrlForm from '@/components/landing/LandingUrlForm'

const trustItems = [
  'Used before listing updates',
  'Built for private-label teams',
  'Made for supplier calls',
  'Ready for agency audits',
]

const insightCards = [
  {
    issue: 'Seal fails after two weeks',
    evidence: '31% of negative reviews',
    detail: 'Customers describe leaks after repeated dishwasher cycles and warped silicone edges.',
    fix: 'Switch to a thicker food-grade gasket and add a leak test before packaging.',
    severity: 'High priority',
  },
  {
    issue: 'Measurement marks wear off',
    evidence: '18% of negative reviews',
    detail: 'The print fades after a few washes, which makes the bottle useless for tracking intake.',
    fix: 'Laser-etch the scale or move to an in-mold mark instead of surface print.',
    severity: 'Medium priority',
  },
  {
    issue: 'Straw brush does not reach the bend',
    evidence: '12% of negative reviews',
    detail: 'Reviews mention mold risk because the included brush misses the bottom curve.',
    fix: 'Bundle a longer brush and update the cleaning insert with a 20-second rinse routine.',
    severity: 'Medium priority',
  },
]

const reportList = [
  { label: 'Water bottle lid leaks in gym bags', count: 46, tone: 'bg-[#9ff5d1]' },
  { label: 'Scale markings disappear after wash', count: 27, tone: 'bg-[#f3c969]' },
  { label: 'Straw tastes like plastic at first use', count: 19, tone: 'bg-[#8fb7ff]' },
  { label: 'Cap hinge snaps when dropped', count: 11, tone: 'bg-[#f59a8f]' },
]

const dashboardReports = [
  { product: 'HydraTrack 32oz Bottle', score: 61, delta: '-12 pts', action: 'Packaging test' },
  { product: 'Cold Brew Pitcher', score: 74, delta: '+6 pts', action: 'Listing update' },
  { product: 'Travel Cutlery Set', score: 53, delta: '-8 pts', action: 'Supplier review' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300">
      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
      {children}
    </div>
  )
}

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-2 rounded-full bg-white/[0.05]">
      <div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="sticky top-0 z-50 border-b border-white/8 bg-[#0a0a0a]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-indigo-500/25 bg-indigo-500/10">
              <Radar className="h-4 w-4 text-indigo-400" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">ReviewRadar</div>
              <div className="text-[11px] text-[#71717a]">Amazon review intelligence</div>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/dashboard" className="hidden text-sm text-[#71717a] transition-colors hover:text-white sm:inline-flex">
              Dashboard
            </Link>
            <Link
              href="/analyze"
              className="inline-flex h-10 items-center rounded-md border border-indigo-500/35 bg-indigo-500 px-4 text-sm font-semibold text-white transition-transform hover:-translate-y-px hover:bg-indigo-400"
            >
              Run a report
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative overflow-hidden border-b border-white/8">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(99,102,241,0.12),transparent_28%,transparent)]" />
          <div className="absolute inset-y-0 left-1/2 hidden w-px bg-white/6 xl:block" />
          <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-12 sm:px-6 lg:pt-16 xl:grid-cols-[1.03fr_0.97fr] xl:gap-12 xl:pb-20">
            <div className="max-w-xl">
              <SectionLabel>See the report before you scroll</SectionLabel>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[58px] lg:leading-[1.04]">
                See why customers return a product before the next batch ships.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-[#a1a1aa] sm:text-lg">
                Paste an Amazon URL. ReviewRadar pulls the complaints customers repeat, shows what changed sentiment,
                and gives you a fix list you can hand to ops, product, or your supplier.
              </p>

              <div className="mt-7 max-w-xl">
                <LandingUrlForm />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#a1a1aa]">
                <div className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-indigo-400" />
                  Report in about 60 seconds
                </div>
                <div className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-indigo-400" />
                  First report free
                </div>
                <div className="inline-flex items-center gap-2">
                  <ScanSearch className="h-4 w-4 text-indigo-400" />
                  Pulls live review patterns
                </div>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-4">
                {trustItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-md border border-white/8 bg-white/[0.025] px-3 py-3 text-sm text-[#a1a1aa]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="xl:pt-6">
              <div className="rounded-[8px] border border-white/10 bg-[#111111] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
                <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
                  <div>
                    <div className="text-sm font-semibold text-white">Sample report</div>
                    <div className="mt-1 text-xs text-[#71717a]">
                      HydraTrack 32oz Insulated Bottle • 842 reviews analyzed
                    </div>
                  </div>
                  <div className="rounded-md border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-sm font-semibold text-indigo-300">
                    Score 61/100
                  </div>
                </div>

                <div className="grid gap-4 p-5">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[8px] border border-white/8 bg-white/[0.025] p-4">
                      <div className="text-xs uppercase tracking-[0.16em] text-[#52525b]">Negative review share</div>
                      <div className="mt-2 text-3xl font-semibold text-white">38%</div>
                      <div className="mt-1 text-sm text-[#71717a]">Up 9 points after the lid redesign</div>
                    </div>
                    <div className="rounded-[8px] border border-white/8 bg-white/[0.025] p-4">
                      <div className="text-xs uppercase tracking-[0.16em] text-[#52525b]">Top complaint cluster</div>
                      <div className="mt-2 text-xl font-semibold text-white">Leak risk</div>
                      <div className="mt-1 text-sm text-[#71717a]">46 mentions across recent reviews</div>
                    </div>
                    <div className="rounded-[8px] border border-white/8 bg-white/[0.025] p-4">
                      <div className="text-xs uppercase tracking-[0.16em] text-[#52525b]">Recommended move</div>
                      <div className="mt-2 text-xl font-semibold text-white">Fix packaging test</div>
                      <div className="mt-1 text-sm text-[#71717a]">Then update the listing photo callout</div>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-[8px] border border-white/8 bg-white/[0.025] p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-white">What needs fixing first</div>
                        <div className="text-xs text-[#71717a]">Complaint frequency</div>
                      </div>
                      <div className="mt-4 space-y-4">
                        {reportList.map((item, index) => (
                          <div key={item.label}>
                            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/8 bg-white/[0.03] text-xs text-[#71717a]">
                                  {index + 1}
                                </span>
                                <span className="text-white">{item.label}</span>
                              </div>
                              <span className="text-[#71717a]">{item.count}</span>
                            </div>
                            <Bar value={Math.max(18, item.count * 2)} color={item.tone} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-[8px] border border-white/8 bg-white/[0.025] p-4">
                        <div className="text-sm font-semibold text-white">Evidence pulled from reviews</div>
                        <div className="mt-4 rounded-[8px] border border-indigo-500/20 bg-indigo-500/10 p-4 text-sm leading-6 text-[#e4e4e7]">
                          “It keeps cold, but the lid leaked all over my laptop sleeve on the third day.”
                        </div>
                        <div className="mt-3 rounded-[8px] border border-violet-500/20 bg-violet-500/10 p-4 text-sm leading-6 text-[#e4e4e7]">
                          “The ounce markers looked great out of the box, then faded after a week.”
                        </div>
                      </div>

                      <div className="rounded-[8px] border border-white/8 bg-white/[0.025] p-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-white">
                          <Sparkles className="h-4 w-4 text-indigo-400" />
                          Fix list
                        </div>
                        <div className="mt-3 space-y-3">
                          {[
                            'Increase gasket thickness from 1.2mm to 1.8mm',
                            'Run a 30-minute inverted leak test before boxing',
                            'Move cleaning instructions onto the insert card',
                          ].map((item) => (
                            <div key={item} className="flex items-start gap-3 text-sm text-[#d4d4d8]">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/8 px-5 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <SectionLabel>Before / After</SectionLabel>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Start with messy review text. Leave with a plan someone can act on.
              </h2>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[8px] border border-white/8 bg-white/[0.025] p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#dce6ef]">
                  <TriangleAlert className="h-4 w-4 text-indigo-400" />
                  Before
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    '“Cute bottle, but the cap leaks if it tips over.”',
                    '“I wanted to track water intake, but the printed scale is already gone.”',
                    '“Great color. Bad smell from the straw on day one.”',
                    '“I had to read forty reviews to figure out if the lid issue was common.”',
                  ].map((quote) => (
                    <div key={quote} className="rounded-[8px] border border-white/8 bg-[#111111] p-4 text-sm leading-6 text-[#a1a1aa]">
                      {quote}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[8px] border border-indigo-500/18 bg-indigo-500/[0.06] p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <ChartColumnIncreasing className="h-4 w-4 text-indigo-400" />
                  After
                </div>
                <div className="mt-5 grid gap-3">
                  {[
                    ['46 mentions', 'Leak complaints accelerated after the new lid supplier.'],
                    ['27 mentions', 'Measurement printing degrades after dishwasher cycles.'],
                    ['19 mentions', 'Plastic odor is tied to the straw pack, not the bottle body.'],
                    ['Next move', 'Fix the gasket and relaunch the third image with a leak-proof proof point.'],
                  ].map(([label, detail]) => (
                    <div key={label} className="flex items-start justify-between gap-4 rounded-[8px] border border-white/8 bg-[#0a1620] p-4">
                      <div className="text-sm text-indigo-300">{label}</div>
                      <div className="max-w-[24rem] text-right text-sm leading-6 text-[#e4e4e7]">{detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/8 px-5 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <SectionLabel>Concrete insights</SectionLabel>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  The report should sound like someone actually read the reviews.
                </h2>
              </div>
              <Link href="/analyze" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300">
                Try the live analyzer
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {insightCards.map((card) => (
                <div key={card.issue} className="rounded-[8px] border border-white/8 bg-white/[0.025] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">{card.issue}</h3>
                    <div className="rounded-md border border-indigo-500/20 bg-indigo-500/10 px-2 py-1 text-xs font-semibold text-indigo-300">
                      {card.severity}
                    </div>
                  </div>
                  <div className="mt-3 text-sm font-medium text-indigo-300">{card.evidence}</div>
                  <p className="mt-4 text-sm leading-6 text-[#a1a1aa]">{card.detail}</p>
                  <div className="mt-5 rounded-[8px] border border-white/8 bg-[#111111] p-4">
                    <div className="text-xs uppercase tracking-[0.16em] text-[#52525b]">What to change</div>
                    <p className="mt-2 text-sm leading-6 text-[#e4e4e7]">{card.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/8 px-5 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <SectionLabel>Dashboard preview</SectionLabel>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Keep every report in one place so patterns keep compounding.
              </h2>
            </div>

            <div className="mt-10 rounded-[8px] border border-white/10 bg-[#111111] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
              <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[8px] border border-white/8 bg-white/[0.025] p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-white">Recent reports</div>
                    <div className="text-xs text-[#71717a]">Last 30 days</div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {dashboardReports.map((report) => (
                      <div key={report.product} className="grid gap-3 rounded-[8px] border border-white/8 bg-[#0f0f10] p-4 sm:grid-cols-[1.4fr_0.55fr_0.55fr] sm:items-center">
                        <div>
                          <div className="text-sm font-medium text-white">{report.product}</div>
                          <div className="mt-1 text-xs text-[#71717a]">{report.action}</div>
                        </div>
                        <div className="text-sm text-[#e4e4e7]">Score {report.score}</div>
                        <div className={`text-sm font-semibold ${report.delta.startsWith('+') ? 'text-indigo-300' : 'text-violet-300'}`}>
                          {report.delta}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[8px] border border-white/8 bg-white/[0.025] p-4">
                    <div className="text-sm font-semibold text-white">Complaint trend</div>
                    <div className="mt-4 flex h-40 items-end gap-3">
                      {[32, 40, 29, 51, 56, 44, 26].map((value, index) => (
                        <div key={index} className="flex flex-1 flex-col items-center gap-2">
                          <div
                            className="w-full rounded-t-md bg-[linear-gradient(180deg,#818cf8_0%,#4f46e5_100%)]"
                            style={{ height: `${value * 2}px` }}
                          />
                          <div className="text-[11px] text-[#71717a]">W{index + 1}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[8px] border border-white/8 bg-white/[0.025] p-4">
                    <div className="text-sm font-semibold text-white">What teams do next</div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {[
                        'Revise insert copy before the next PO',
                        'Pin supplier changes to sentiment drops',
                        'Update listing images with the right proof points',
                      ].map((item) => (
                        <div key={item} className="rounded-[8px] border border-white/8 bg-[#0f0f10] p-4 text-sm leading-6 text-[#e4e4e7]">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-4xl rounded-[8px] border border-indigo-500/18 bg-[linear-gradient(180deg,rgba(99,102,241,0.12),rgba(255,255,255,0.02))] p-6 sm:p-8">
            <div className="max-w-2xl">
              <SectionLabel>Run your first report</SectionLabel>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Stop guessing what customers mean by “quality issue.”
              </h2>
              <p className="mt-4 text-base leading-7 text-[#a1a1aa]">
                Drop in a product URL and get the complaint clusters, evidence, and fix list in one pass.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/analyze"
                className="inline-flex h-11 items-center justify-center rounded-md border border-indigo-500/35 bg-indigo-500 px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-px hover:bg-indigo-400"
              >
                Analyze an Amazon product
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex h-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] px-5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.05]"
              >
                View dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
