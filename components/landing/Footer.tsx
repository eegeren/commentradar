import Link from 'next/link'
import { Radar } from 'lucide-react'

const links = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Dashboard', href: '/dashboard' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/8 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-indigo-500/25 bg-indigo-500/10">
            <Radar className="h-4 w-4 text-indigo-400" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">ReviewRadar</div>
            <div className="text-sm text-[#52525b]">Review analysis for Amazon sellers</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-[#52525b] transition-colors duration-200 hover:text-[#a1a1aa]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="text-xs text-[#3f3f46]">© {new Date().getFullYear()} ReviewRadar</p>
      </div>
    </footer>
  )
}
