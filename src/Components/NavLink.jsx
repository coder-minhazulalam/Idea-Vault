'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function NavLink({ href, children }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={
        isActive
          ? 'text-primary font-semibold border-b-2 border-orange-400 border-primary pb-0.5 transition-colors duration-200'
          : 'text-foreground/60 hover:text-foreground font-medium transition-colors duration-200'
      }
    >
      {children}
    </Link>
  )
}
