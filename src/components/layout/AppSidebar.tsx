'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'
import { cn } from '@/lib/utils'

const navItems = [
  {
    href: '/home',
    label: 'ホーム',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
      </svg>
    ),
  },
  {
    href: '/chat',
    label: 'チャット',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    href: '/history',
    label: '履歴',
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const user = useAuthStore((s) => s.user)

  return (
    <div className="flex h-full w-14 flex-col items-center border-r border-navy-800 bg-navy-950 py-4">
      {/* Logo */}
      <div className="mb-6 flex h-8 w-8 items-center justify-center rounded-md bg-navy-800">
        <span className="text-xs font-semibold text-navy-300">Y</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col items-center gap-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-md transition-colors',
                isActive
                  ? 'bg-navy-800 text-slate-200'
                  : 'text-navy-500 hover:bg-navy-900 hover:text-navy-300'
              )}
            >
              {item.icon}
            </Link>
          )
        })}
      </nav>

      {/* User / Admin */}
      <div className="flex flex-col items-center gap-2">
        {user?.is_admin && (
          <Link
            href="/admin"
            title="管理画面"
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-md transition-colors',
              pathname.startsWith('/admin')
                ? 'bg-navy-800 text-slate-200'
                : 'text-navy-500 hover:bg-navy-900 hover:text-navy-300'
            )}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>
        )}
        <div
          title={user?.display_name ?? ''}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-xs text-navy-300"
        >
          {user?.display_name?.charAt(0) ?? '?'}
        </div>
      </div>
    </div>
  )
}
