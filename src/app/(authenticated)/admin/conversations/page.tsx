'use client'

import { useState, useMemo } from 'react'
import { dummyConversations, dummyUsers, dummyMessages } from '@/lib/dummy-data'
import { dummyKnowledge } from '@/lib/dummy-knowledge'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { CONVERSATION_MODES, USER_ROLES } from '@/lib/constants'
import { formatDate, formatTime } from '@/lib/date'
import type { ResponseMode, Message } from '@/types'
import { cn } from '@/lib/utils'

export default function ConversationsPage() {
  const [search, setSearch] = useState('')
  const [filterUser, setFilterUser] = useState<string>('all')
  const [filterMode, setFilterMode] = useState<string>('all')
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return dummyConversations
      .filter((c) => {
        if (filterUser !== 'all' && c.user_id !== filterUser) return false
        if (filterMode !== 'all' && c.mode !== filterMode) return false
        if (search) {
          const q = search.toLowerCase()
          const user = dummyUsers.find((u) => u.id === c.user_id)
          const msgs = dummyMessages[c.id] ?? []
          return (
            c.title.toLowerCase().includes(q) ||
            user?.display_name.toLowerCase().includes(q) ||
            msgs.some((m) => m.content.toLowerCase().includes(q))
          )
        }
        return true
      })
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
  }, [search, filterUser, filterMode])

  const selectedMsgs: Message[] = selectedConvId ? (dummyMessages[selectedConvId] ?? []) : []
  const selectedConv = dummyConversations.find((c) => c.id === selectedConvId)
  const selectedUser = selectedConv ? dummyUsers.find((u) => u.id === selectedConv.user_id) : null

  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-navy-800 px-8 py-4">
        <h1 className="text-lg font-light tracking-wider text-slate-200">
          会話ログ閲覧
        </h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: conversation list */}
        <div className="w-96 shrink-0 border-r border-navy-800 overflow-y-auto">
          <div className="space-y-3 border-b border-navy-800 px-4 py-3">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="検索..."
              className="border-navy-700 bg-navy-900 text-slate-200 placeholder:text-navy-500"
            />
            <div className="flex flex-wrap gap-1">
              <button onClick={() => setFilterUser('all')} className={cn('rounded px-2 py-0.5 text-xs', filterUser === 'all' ? 'bg-navy-700 text-slate-200' : 'text-navy-400 hover:bg-navy-800')}>
                全員
              </button>
              {dummyUsers.map((u) => (
                <button key={u.id} onClick={() => setFilterUser(u.id)} className={cn('rounded px-2 py-0.5 text-xs', filterUser === u.id ? 'bg-navy-700 text-slate-200' : 'text-navy-400 hover:bg-navy-800')}>
                  {u.display_name}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              <button onClick={() => setFilterMode('all')} className={cn('rounded px-2 py-0.5 text-xs', filterMode === 'all' ? 'bg-navy-700 text-slate-200' : 'text-navy-400 hover:bg-navy-800')}>
                全モード
              </button>
              {Object.entries(CONVERSATION_MODES).map(([key, m]) => (
                <button key={key} onClick={() => setFilterMode(key)} className={cn('rounded px-2 py-0.5 text-xs', filterMode === key ? 'bg-navy-700 text-slate-200' : 'text-navy-400 hover:bg-navy-800')}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-navy-800/50">
            {filtered.map((conv) => {
              const user = dummyUsers.find((u) => u.id === conv.user_id)
              const msgs = dummyMessages[conv.id] ?? []
              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConvId(conv.id)}
                  className={cn(
                    'block w-full px-4 py-3 text-left transition-colors',
                    selectedConvId === conv.id ? 'bg-navy-800/60' : 'hover:bg-navy-900'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm text-slate-300">{conv.title}</span>
                    <Badge variant={conv.mode as ResponseMode}>{CONVERSATION_MODES[conv.mode as ResponseMode]?.label}</Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-navy-500">
                    {user?.display_name} ・ {msgs.length} メッセージ ・ {formatDate(conv.created_at)}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right: conversation detail */}
        <div className="flex-1 overflow-y-auto">
          {!selectedConvId ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-navy-500">会話を選択してください</p>
            </div>
          ) : (
            <div className="px-6 py-4">
              {/* Header */}
              <div className="mb-4 flex items-center justify-between border-b border-navy-800 pb-3">
                <div>
                  <h2 className="text-sm font-medium text-slate-200">{selectedConv?.title}</h2>
                  <p className="mt-0.5 text-xs text-navy-500">
                    {selectedUser?.display_name} ({USER_ROLES[selectedUser?.relationship_category ?? 'business_leader']?.label}) ・ {formatDate(selectedConv?.created_at ?? '')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded border border-navy-700 px-2.5 py-1 text-xs text-navy-400 transition-colors hover:bg-navy-800">
                    ナレッジ化
                  </button>
                  <button className="rounded border border-navy-700 px-2.5 py-1 text-xs text-navy-400 transition-colors hover:bg-navy-800">
                    接し方に反映
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-4">
                {selectedMsgs.map((msg) => (
                  <div key={msg.id} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                    <div className={cn('max-w-[75%] rounded-lg px-4 py-3', msg.role === 'user' ? 'bg-navy-700 text-slate-200' : 'border border-navy-800 bg-navy-900 text-slate-300')}>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
                      <p className="mt-2 text-xs text-navy-500">{formatTime(msg.created_at)}</p>
                    </div>
                  </div>
                ))}
                {selectedMsgs.length === 0 && (
                  <p className="py-8 text-center text-sm text-navy-500">メッセージなし</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
