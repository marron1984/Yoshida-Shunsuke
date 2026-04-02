'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { dummyKnowledge } from '@/lib/dummy-knowledge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatRelativeTime } from '@/lib/date'
import type { KnowledgeCategory } from '@/types'
import { cn } from '@/lib/utils'

const categoryLabels: Record<KnowledgeCategory, string> = {
  core_persona: 'コア人格',
  judgment_rule: '判断基準',
  values_and_life_philosophy: '人生観・価値観',
  relationship_rule: '接し方ルール',
  reply_style_pattern: '返信スタイル',
  crisis_response_rule: 'トラブル対応',
  temporary_context: '一時文脈',
  low_priority: '低優先度',
}

type FilterCat = KnowledgeCategory | 'all'

function ImportanceDots({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={cn(
            'inline-block h-1.5 w-1.5 rounded-full',
            i <= level ? 'bg-slate-400' : 'bg-navy-700'
          )}
        />
      ))}
    </div>
  )
}

export default function KnowledgeListPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState<FilterCat>('all')

  const filtered = useMemo(() => {
    return dummyKnowledge
      .filter((k) => {
        if (filterCat !== 'all' && k.category !== filterCat) return false
        if (search) {
          const q = search.toLowerCase()
          return (
            k.title.toLowerCase().includes(q) ||
            k.content.toLowerCase().includes(q) ||
            k.tags.some((t) => t.toLowerCase().includes(q))
          )
        }
        return true
      })
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
  }, [search, filterCat])

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-navy-800 px-8 py-4">
        <h1 className="text-lg font-light tracking-wider text-slate-200">
          ナレッジ一覧
        </h1>
        <Link href="/admin/knowledge/new">
          <Button className="bg-navy-700 text-slate-200 hover:bg-navy-600" size="sm">
            + 登録
          </Button>
        </Link>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ナレッジを検索..."
              className="w-64 border-navy-700 bg-navy-900 text-slate-200 placeholder:text-navy-500"
            />
            <div className="flex flex-wrap items-center gap-1">
              <button
                onClick={() => setFilterCat('all')}
                className={cn(
                  'rounded-md px-2.5 py-1 text-xs transition-colors',
                  filterCat === 'all'
                    ? 'bg-navy-700 text-slate-200'
                    : 'text-navy-400 hover:bg-navy-800'
                )}
              >
                すべて
              </button>
              {(Object.entries(categoryLabels) as [KnowledgeCategory, string][]).map(
                ([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setFilterCat(key)}
                    className={cn(
                      'rounded-md px-2.5 py-1 text-xs transition-colors',
                      filterCat === key
                        ? 'bg-navy-700 text-slate-200'
                        : 'text-navy-400 hover:bg-navy-800'
                    )}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-navy-800 bg-navy-900/30">
            {filtered.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-navy-500">
                該当するナレッジがありません
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-800">
                    <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-400">
                      タイトル
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-400">
                      分類
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-400">
                      タグ
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-400">
                      重要度
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-400">
                      ソース
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-400">
                      更新日
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-800/50">
                  {filtered.map((k) => (
                    <tr
                      key={k.id}
                      onClick={() => router.push(`/admin/knowledge/${k.id}`)}
                      className="cursor-pointer transition-colors hover:bg-navy-800/20"
                    >
                      <td className="max-w-[280px] px-5 py-3">
                        <p className="truncate text-sm text-slate-300">
                          {k.title}
                        </p>
                        {k.memo && (
                          <p className="mt-0.5 truncate text-xs text-navy-500">
                            {k.memo}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <span className="rounded bg-navy-800 px-1.5 py-0.5 text-xs text-navy-300">
                          {categoryLabels[k.category]}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex flex-wrap gap-1">
                          {k.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded bg-navy-800/60 px-1.5 py-0.5 text-xs text-navy-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <ImportanceDots level={k.importance} />
                      </td>
                      <td className="px-5 py-3 text-xs text-navy-500">
                        {k.source}
                      </td>
                      <td className="px-5 py-3 text-xs text-navy-500">
                        {formatRelativeTime(k.updated_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <p className="text-center text-xs text-navy-600">
            {filtered.length} 件のナレッジ
          </p>
        </div>
      </div>
    </div>
  )
}
