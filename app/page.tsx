import Link from 'next/link'
import { Radar } from 'lucide-react'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import Pricing from '@/components/landing/Pricing'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Radar className="w-4 h-4 text-indigo-400" />
            <span className="text-white font-semibold text-sm tracking-tight">ReviewRadar</span>
          </Link>

          <div className="flex items-center gap-5">
            <Link href="/dashboard" className="text-[#71717a] hover:text-white text-sm transition-colors duration-200">
              Dashboard
            </Link>
            <Link
              href="/analyze"
              className="h-8 px-4 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:opacity-90 flex items-center"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}
            >
              Try free
            </Link>
          </div>
        </div>
      </nav>

      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </div>
  )
}
