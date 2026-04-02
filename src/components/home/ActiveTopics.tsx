'use client'

import Link from 'next/link'
import { dummyActiveTopics } from '@/lib/dummy-data'
import { formatRelativeTime } from '@/lib/date'
import { cn } from '@/lib/utils'

export function ActiveTopics() {
  return (
    <div className="rounded-lg border border-navy-800 bg-navy-900/30">
      <div className="border-b border-navy-800 px-5 py-3">
        <h2 className="text-xs font-medium uppercase tracking-wider text-navy-400">
          継続中の論点
        </h2>
      </div>
      <div className="divide-y divide-navy-800/50">
        {dummyActiveTopics.map((topic) => (
          <Link
            key={topic.id}
            href="/chat"
            className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-navy-800/30"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-slate-300">{topic.title}</p>
              <p className="mt-0.5 text-xs text-navy-500">{topic.userName}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span
                className={cn(
                  'rounded px-1.5 py-0.5 text-xs',
                  topic.status === '未処理'
                    ? 'bg-amber-950/50 text-amber-300'
                    : 'bg-navy-800 text-navy-300'
                )}
              >
                {topic.status}
              </span>
              <span className="text-xs text-navy-500">
                {formatRelativeTime(topic.updatedAt)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
