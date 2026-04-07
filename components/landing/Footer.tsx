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
    <footer className="border-t border-white/[0.06] py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Radar className="w-4 h-4 text-indigo-400" />
          <span className="text-white font-semibold text-sm">ReviewRadar</span>
          <span className="text-[#3f3f46] text-sm ml-1">— AI review analysis for Amazon sellers</span>
        </div>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[#52525b] hover:text-[#a1a1aa] text-sm transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="text-[#3f3f46] text-xs">
          © {new Date().getFullYear()} ReviewRadar
        </p>
      </div>
    </footer>
  )
}
