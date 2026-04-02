'use client'

import { useState } from 'react'
import { useChatStore } from '@/stores/useChatStore'
import { useUIStore } from '@/stores/useUIStore'
import { dummyRelationshipMemos, dummyContextSummary } from '@/lib/dummy-data'
import { CONVERSATION_MODES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { ResponseMode } from '@/types'

function Section({
  title,
  defaultOpen = true,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-navy-800">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-navy-800/30"
      >
        <h3 className="text-xs font-medium uppercase tracking-wider text-navy-400">
          {title}
        </h3>
        <svg
          className={cn(
            'h-3.5 w-3.5 text-navy-500 transition-transform',
            open && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  )
}

export function ContextPanel() {
  const contextPanelVisible = useUIStore((s) => s.contextPanelVisible)
  const toggleContextPanel = useUIStore((s) => s.toggleContextPanel)
  const currentMode = useChatStore((s) => s.currentMode)

  // TODO: derive from active conversation's user_id
  const rel = dummyRelationshipMemos['user-001']
  const ctx = dummyContextSummary
  const modeInfo = CONVERSATION_MODES[currentMode]

  if (!contextPanelVisible) {
    return (
      <div className="flex h-full w-10 flex-col items-center border-l border-navy-800 pt-3">
        <button
          onClick={toggleContextPanel}
          className="flex h-8 w-8 items-center justify-center rounded-md text-navy-500 transition-colors hover:bg-navy-800 hover:text-navy-300"
          title="コンテキストパネルを開く"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col border-l border-navy-800">
      <div className="flex items-center justify-between border-b border-navy-800 px-4 py-3">
        <h2 className="text-xs font-medium uppercase tracking-wider text-navy-400">
          コンテキスト
        </h2>
        <button
          onClick={toggleContextPanel}
          className="flex h-6 w-6 items-center justify-center rounded text-navy-500 transition-colors hover:bg-navy-800 hover:text-navy-300"
          title="パネルを閉じる"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Section title="現在のモード">
          <div className="flex items-center gap-2">
            <span className="rounded bg-navy-800 px-2 py-0.5 text-xs font-medium text-slate-300">
              {modeInfo.label}
            </span>
            <span className="text-xs text-navy-400">{modeInfo.description}</span>
          </div>
        </Section>

        <Section title="関係メモ">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-300">{rel.name}</span>
              <span className="rounded bg-navy-800 px-1.5 py-0.5 text-xs text-navy-300">
                {rel.category}
              </span>
            </div>
            <p className="leading-relaxed text-navy-300">{rel.memo}</p>
          </div>
        </Section>

        <Section title="接し方メモ">
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-xs text-navy-500">トーン</span>
              <p className="text-navy-300">{rel.tone}</p>
            </div>
            <div>
              <span className="text-xs text-navy-500">注意点</span>
              <p className="text-navy-300">{rel.caution}</p>
            </div>
          </div>
        </Section>

        <Section title="今回の論点">
          <p className="text-sm text-navy-300">{ctx.currentIssue}</p>
        </Section>

        <Section title="過去の話題" defaultOpen={false}>
          <ul className="space-y-1">
            {ctx.recentTopics.map((topic) => (
              <li key={topic} className="text-sm text-navy-300">
                ・{topic}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="対応方針" defaultOpen={false}>
          <p className="text-sm text-navy-300">{ctx.approachNote}</p>
        </Section>
      </div>
    </div>
  )
}
