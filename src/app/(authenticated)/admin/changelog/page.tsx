'use client'

import { useState, useMemo } from 'react'
import { dummyChangeHistory } from '@/lib/dummy-changelog'
import { formatDate, formatRelativeTime } from '@/lib/date'
import type { ChangeEntityType } from '@/types'
import { cn } from '@/lib/utils'

const entityTypeLabels: Record<ChangeEntityType, string> = {
  knowledge: 'ナレッジ',
  persona: '人格設定',
  relationship: '接し方設定',
  user: 'ユーザー',
}

const changeTypeLabels: Record<string, string> = {
  create: '作成',
  update: '更新',
  delete: '削除',
}

const changeTypeColors: Record<string, string> = {
  create: 'bg-emerald-950/50 text-emerald-300',
  update: 'bg-blue-950/50 text-blue-300',
  delete: 'bg-red-950/50 text-red-300',
}

type FilterEntity = ChangeEntityType | 'all'

export default function ChangelogPage() {
  const [filterEntity, setFilterEntity] = useState<FilterEntity>('all')

  const filtered = useMemo(() => {
    return dummyChangeHistory
      .filter((h) => filterEntity === 'all' || h.entity_type === filterEntity)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }, [filterEntity])

  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-navy-800 px-8 py-4">
        <h1 className="text-lg font-light tracking-wider text-slate-200">
          変更履歴
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Filter */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilterEntity('all')}
              className={cn(
                'rounded-md px-2.5 py-1 text-xs transition-colors',
                filterEntity === 'all' ? 'bg-navy-700 text-slate-200' : 'text-navy-400 hover:bg-navy-800'
              )}
            >
              すべて
            </button>
            {(Object.entries(entityTypeLabels) as [ChangeEntityType, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilterEntity(key)}
                className={cn(
                  'rounded-md px-2.5 py-1 text-xs transition-colors',
                  filterEntity === key ? 'bg-navy-700 text-slate-200' : 'text-navy-400 hover:bg-navy-800'
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-3 top-0 h-full w-px bg-navy-800" />

            <div className="space-y-4">
              {filtered.map((entry) => {
                const prev = entry.previous_value as Record<string, unknown> | null
                const next = entry.new_value as Record<string, unknown> | null

                return (
                  <div key={entry.id} className="relative flex gap-4 pl-8">
                    {/* Dot */}
                    <div className="absolute left-1.5 top-3 h-3 w-3 rounded-full border-2 border-navy-700 bg-navy-900" />

                    <div className="flex-1 rounded-lg border border-navy-800 bg-navy-900/30 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-navy-800 px-1.5 py-0.5 text-xs text-navy-300">
                            {entityTypeLabels[entry.entity_type]}
                          </span>
                          <span className={cn('rounded px-1.5 py-0.5 text-xs', changeTypeColors[entry.change_type])}>
                            {changeTypeLabels[entry.change_type]}
                          </span>
                        </div>
                        <span className="text-xs text-navy-500" title={formatDate(entry.created_at)}>
                          {formatRelativeTime(entry.created_at)}
                        </span>
                      </div>

                      {/* Diff display */}
                      {next && (
                        <div className="mt-3 space-y-1">
                          {Object.entries(next).map(([key, val]) => {
                            const prevVal = prev?.[key]
                            return (
                              <div key={key} className="text-sm">
                                <span className="text-navy-500">{key}: </span>
                                {prevVal !== undefined && (
                                  <span className="text-red-400/60 line-through mr-2">
                                    {String(prevVal)}
                                  </span>
                                )}
                                <span className="text-emerald-300/80">
                                  {String(val)}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <p className="text-center text-xs text-navy-600">
            {filtered.length} 件の変更
          </p>
        </div>
      </div>
    </div>
  )
}
