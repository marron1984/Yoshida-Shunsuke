'use client'

import { dummyRelationshipMemo, dummyContextSummary } from '@/lib/dummy-data'

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-navy-800 px-4 py-4">
      <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-navy-400">
        {title}
      </h3>
      {children}
    </div>
  )
}

export function ContextPanel() {
  const rel = dummyRelationshipMemo
  const ctx = dummyContextSummary

  return (
    <div className="flex h-full flex-col border-l border-navy-800">
      <div className="border-b border-navy-800 px-4 py-3">
        <h2 className="text-xs font-medium uppercase tracking-wider text-navy-400">
          コンテキスト
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Section title="関係メモ">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-300">{rel.name}</span>
              <span className="rounded bg-navy-800 px-1.5 py-0.5 text-xs text-navy-300">
                {rel.category}
              </span>
            </div>
            <p className="text-navy-300 leading-relaxed">{rel.memo}</p>
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

        <Section title="過去の話題">
          <ul className="space-y-1">
            {ctx.recentTopics.map((topic) => (
              <li key={topic} className="text-sm text-navy-300">
                ・{topic}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="対応方針">
          <p className="text-sm text-navy-300">{ctx.approachNote}</p>
        </Section>
      </div>
    </div>
  )
}
