'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav>
      <Link href="/" className={`navButton ${pathname === '/' ? 'active' : ''}`}>
        Upload
      </Link>
      <Link href="/search" className={`navButton ${pathname === '/search' ? 'active' : ''}`}>
        Search
      </Link>
    </nav>
  )
}
