'use client'

import Link from 'next/link'
import { dummyConversations, dummyUsers } from '@/lib/dummy-data'
import { Badge } from '@/components/ui/badge'
import { CONVERSATION_MODES } from '@/lib/constants'
import { formatRelativeTime } from '@/lib/date'
import type { ResponseMode } from '@/types'

export function RecentConversations() {
  const recent = dummyConversations
    .filter((c) => !c.is_archived)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5)

  return (
    <div className="rounded-lg border border-navy-800 bg-navy-900/30">
      <div className="border-b border-navy-800 px-5 py-3">
        <h2 className="text-xs font-medium uppercase tracking-wider text-navy-400">
          最近の会話
        </h2>
      </div>
      <div className="divide-y divide-navy-800/50">
        {recent.map((conv) => {
          const user = dummyUsers.find((u) => u.id === conv.user_id)
          const mode = CONVERSATION_MODES[conv.mode as ResponseMode]
          return (
            <Link
              key={conv.id}
              href="/chat"
              className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-navy-800/30"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm text-slate-300">
                    {conv.title}
                  </span>
                  <Badge variant={conv.mode as ResponseMode}>
                    {mode?.label}
                  </Badge>
                </div>
                <p className="mt-0.5 text-xs text-navy-500">
                  {user?.display_name}
                </p>
              </div>
              <span className="shrink-0 text-xs text-navy-500">
                {formatRelativeTime(conv.updated_at)}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
