'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { dummyConversations, dummyUsers, dummyMessages } from '@/lib/dummy-data'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { CONVERSATION_MODES } from '@/lib/constants'
import { formatRelativeTime, formatDate } from '@/lib/date'
import type { ResponseMode } from '@/types'
import { cn } from '@/lib/utils'

type FilterMode = 'all' | ResponseMode

export default function HistoryPage() {
  const [search, setSearch] = useState('')
  const [filterMode, setFilterMode] = useState<FilterMode>('all')
  const [showArchived, setShowArchived] = useState(false)

  const filteredConversations = useMemo(() => {
    return dummyConversations
      .filter((c) => {
        if (!showArchived && c.is_archived) return false
        if (filterMode !== 'all' && c.mode !== filterMode) return false
        if (search) {
          const q = search.toLowerCase()
          const user = dummyUsers.find((u) => u.id === c.user_id)
          const titleMatch = c.title.toLowerCase().includes(q)
          const userMatch = user?.display_name.toLowerCase().includes(q)
          const msgMatch = dummyMessages[c.id]?.some((m) =>
            m.content.toLowerCase().includes(q)
          )
          return titleMatch || userMatch || msgMatch
        }
        return true
      })
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
  }, [search, filterMode, showArchived])

  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-navy-800 px-8 py-4">
        <h1 className="text-lg font-light tracking-wider text-slate-200">
          会話履歴
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="会話を検索..."
              className="w-64 border-navy-700 bg-navy-900 text-slate-200 placeholder:text-navy-500"
            />
            <div className="flex items-center gap-1">
              <FilterButton
                active={filterMode === 'all'}
                onClick={() => setFilterMode('all')}
              >
                すべて
              </FilterButton>
              {Object.entries(CONVERSATION_MODES).map(([key, mode]) => (
                <FilterButton
                  key={key}
                  active={filterMode === key}
                  onClick={() => setFilterMode(key as ResponseMode)}
                >
                  {mode.label}
                </FilterButton>
              ))}
            </div>
            <label className="flex items-center gap-2 text-xs text-navy-400">
              <input
                type="checkbox"
                checked={showArchived}
                onChange={(e) => setShowArchived(e.target.checked)}
                className="rounded border-navy-700 bg-navy-900"
              />
              アーカイブ済みを含む
            </label>
          </div>

          {/* Results */}
          <div className="rounded-lg border border-navy-800 bg-navy-900/30">
            {filteredConversations.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-navy-500">
                該当する会話がありません
              </div>
            ) : (
              <div className="divide-y divide-navy-800/50">
                {filteredConversations.map((conv) => {
                  const user = dummyUsers.find((u) => u.id === conv.user_id)
                  const msgs = dummyMessages[conv.id] ?? []
                  const lastMsg = msgs[msgs.length - 1]
                  const mode = CONVERSATION_MODES[conv.mode as ResponseMode]

                  return (
                    <Link
                      key={conv.id}
                      href="/chat"
                      className="block px-5 py-4 transition-colors hover:bg-navy-800/30"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="truncate text-sm font-medium text-slate-300">
                              {conv.title}
                            </span>
                            <Badge variant={conv.mode as ResponseMode}>
                              {mode?.label}
                            </Badge>
                            {conv.is_archived && (
                              <span className="rounded bg-navy-800 px-1.5 py-0.5 text-xs text-navy-500">
                                アーカイブ
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-xs text-navy-500">
                            {user?.display_name} ・ {formatDate(conv.created_at)}
                          </p>
                          {lastMsg && (
                            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-navy-400">
                              {lastMsg.content}
                            </p>
                          )}
                        </div>
                        <div className="shrink-0 text-right">
                          <span className="text-xs text-navy-500">
                            {formatRelativeTime(conv.updated_at)}
                          </span>
                          <p className="mt-0.5 text-xs text-navy-600">
                            {msgs.length} メッセージ
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          <p className="text-center text-xs text-navy-600">
            {filteredConversations.length} 件の会話
          </p>
        </div>
      </div>
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-md px-2.5 py-1 text-xs transition-colors',
        active
          ? 'bg-navy-700 text-slate-200'
          : 'text-navy-400 hover:bg-navy-800 hover:text-navy-300'
      )}
    >
      {children}
    </button>
  )
}
