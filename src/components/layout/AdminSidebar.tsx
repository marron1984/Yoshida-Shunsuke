'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const adminNav = [
  { href: '/admin', label: 'ダッシュボード', exact: true },
  { href: '/admin/users', label: 'ユーザー管理', exact: false },
  { href: '/admin/knowledge', label: 'ナレッジ', exact: false },
  { href: '/admin/persona', label: '人格設定', exact: false },
  { href: '/admin/relationships', label: '接し方設定', exact: false },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-52 flex-col border-r border-navy-800 bg-navy-950">
      <div className="border-b border-navy-800 px-5 py-4">
        <h2 className="text-xs font-medium uppercase tracking-wider text-navy-400">
          管理画面
        </h2>
        <p className="mt-0.5 text-[10px] text-navy-600">人格メンテナンス室</p>
      </div>

      <nav className="flex-1 px-3 py-3">
        <ul className="space-y-0.5">
          {adminNav.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'block rounded-md px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-navy-800 text-slate-200'
                      : 'text-navy-400 hover:bg-navy-900 hover:text-navy-300'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Phase 4-5 items grayed out */}
        <div className="mt-6 border-t border-navy-800 pt-3">
          <p className="mb-2 px-3 text-[10px] uppercase tracking-wider text-navy-700">
            Coming soon
          </p>
          <ul className="space-y-0.5">
            {['会話ログ', '変更履歴'].map((label) => (
              <li key={label}>
                <span className="block cursor-not-allowed rounded-md px-3 py-2 text-sm text-navy-700">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="border-t border-navy-800 px-5 py-3">
        <Link
          href="/home"
          className="text-xs text-navy-500 transition-colors hover:text-navy-300"
        >
          ← ホームに戻る
        </Link>
      </div>
    </div>
  )
}
