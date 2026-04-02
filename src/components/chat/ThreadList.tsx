'use client'

import { useChatStore } from '@/stores/useChatStore'
import { Badge } from '@/components/ui/badge'
import type { Conversation, ResponseMode } from '@/types'
import { cn } from '@/lib/utils'

const modeLabels: Record<ResponseMode, string> = {
  consultation: '相談',
  judgment: '判断',
  reply: '返答',
  initial_response: '初動',
  family: '家族',
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days === 0) {
    return d.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
  }
  if (days === 1) return '昨日'
  if (days < 7) return `${days}日前`
  return d.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })
}

interface ThreadListProps {
  conversations: Conversation[]
  onNewThread: () => void
}

export function ThreadList({ conversations, onNewThread }: ThreadListProps) {
  const { activeConversationId, setActiveConversation } = useChatStore()

  return (
    <div className="flex h-full flex-col border-r border-navy-800">
      <div className="flex items-center justify-between border-b border-navy-800 px-4 py-3">
        <h2 className="text-xs font-medium uppercase tracking-wider text-navy-400">
          スレッド
        </h2>
        <button
          onClick={onNewThread}
          className="flex h-7 w-7 items-center justify-center rounded-md text-navy-400 transition-colors hover:bg-navy-800 hover:text-slate-300"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => setActiveConversation(conv.id)}
            className={cn(
              'w-full border-b border-navy-800/50 px-4 py-3 text-left transition-colors',
              activeConversationId === conv.id
                ? 'bg-navy-800/60'
                : 'hover:bg-navy-900'
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="line-clamp-2 text-sm text-slate-300">
                {conv.title}
              </p>
              <span className="shrink-0 text-xs text-navy-500">
                {formatDate(conv.updated_at)}
              </span>
            </div>
            <div className="mt-1.5">
              <Badge variant={conv.mode}>{modeLabels[conv.mode]}</Badge>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
