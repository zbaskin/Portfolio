
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/resume', label: 'Resume' },
  { href: '/reviews', label: 'Reviews' },
]

export function NavBar() {
  const pathname = usePathname()
  return (
    <nav className="flex items-center h-14 gap-6">
      <Link href="/" className="text-lg font-semibold">Zach Baskin</Link>
      <div className="flex gap-4 ml-auto">
        {links.map((l) => {
          const active = pathname === l.href
          return (
            <Link key={l.href} href={l.href} className={`px-3 py-1.5 rounded-xl hover:bg-neutral-100 ${active ? 'bg-neutral-100' : ''}`}>
              {l.label}
            </Link>
          )
        })}
        <a className="px-3 py-1.5 rounded-xl hover:bg-neutral-100" href="https://github.com/zbaskin" target="_blank" rel="noreferrer">GitHub</a>
        <a className="px-3 py-1.5 rounded-xl hover:bg-neutral-100" href="https://www.linkedin.com/in/zachbaskin/" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </nav>
  )
}
