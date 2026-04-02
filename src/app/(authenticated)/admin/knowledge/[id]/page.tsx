'use client'

import { useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { dummyKnowledge } from '@/lib/dummy-knowledge'
import { formatDate } from '@/lib/date'
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

export default function KnowledgeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const item = dummyKnowledge.find((k) => k.id === id)

  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(item?.title ?? '')
  const [content, setContent] = useState(item?.content ?? '')
  const [category, setCategory] = useState<KnowledgeCategory>(
    item?.category ?? 'core_persona'
  )
  const [tags, setTags] = useState(item?.tags.join(', ') ?? '')
  const [importance, setImportance] = useState(item?.importance ?? 3)
  const [memo, setMemo] = useState(item?.memo ?? '')

  // Dummy similar knowledge
  const similar = useMemo(() => {
    if (!item) return []
    return dummyKnowledge
      .filter((k) => k.id !== item.id && k.category === item.category)
      .slice(0, 3)
  }, [item])

  if (!item) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-navy-500">ナレッジが見つかりません</p>
      </div>
    )
  }

  const handleSave = () => {
    alert('保存しました（ダミー）')
    setEditing(false)
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-navy-800 px-8 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin/knowledge')}
            className="text-navy-500 transition-colors hover:text-navy-300"
          >
            ← 一覧
          </button>
          <h1 className="text-lg font-light tracking-wider text-slate-200">
            ナレッジ詳細
          </h1>
        </div>
        <div className="flex gap-2">
          {editing ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => setEditing(false)} className="text-navy-400">
                キャンセル
              </Button>
              <Button size="sm" onClick={handleSave} className="bg-navy-700 text-slate-200 hover:bg-navy-600">
                保存
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => setEditing(true)} className="bg-navy-700 text-slate-200 hover:bg-navy-600">
              編集
            </Button>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="mx-auto max-w-2xl space-y-6">
            {/* Title */}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">タイトル</label>
              {editing ? (
                <Input value={title} onChange={(e) => setTitle(e.target.value)} className="border-navy-700 bg-navy-900 text-slate-200" />
              ) : (
                <p className="text-base text-slate-200">{item.title}</p>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">構造化内容</label>
              {editing ? (
                <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={4} className="border-navy-700 bg-navy-900 text-slate-200" />
              ) : (
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">{item.content}</p>
              )}
            </div>

            {/* Raw text */}
            {item.raw_text && (
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">原文</label>
                <p className="whitespace-pre-wrap rounded-lg border border-navy-800 bg-navy-900/50 p-4 text-sm text-navy-300">
                  {item.raw_text}
                </p>
              </div>
            )}

            {/* Category + Importance */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">分類</label>
                {editing ? (
                  <div className="flex flex-wrap gap-1.5">
                    {(Object.entries(categoryLabels) as [KnowledgeCategory, string][]).map(([key, label]) => (
                      <button key={key} onClick={() => setCategory(key)} className={cn('rounded-md px-2.5 py-1 text-xs transition-colors', category === key ? 'bg-navy-700 text-slate-200' : 'bg-navy-900 text-navy-400 hover:bg-navy-800')}>
                        {label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="rounded bg-navy-800 px-2 py-0.5 text-xs text-navy-300">{categoryLabels[item.category]}</span>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">重要度</label>
                {editing ? (
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((l) => (
                      <button key={l} onClick={() => setImportance(l)} className={cn('flex h-7 w-7 items-center justify-center rounded text-xs', importance === l ? 'bg-navy-700 text-slate-200' : 'bg-navy-900 text-navy-500 hover:bg-navy-800')}>
                        {l}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map((i) => (<span key={i} className={cn('inline-block h-2 w-2 rounded-full', i <= item.importance ? 'bg-slate-400' : 'bg-navy-700')} />))}</div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">タグ</label>
              {editing ? (
                <Input value={tags} onChange={(e) => setTags(e.target.value)} className="border-navy-700 bg-navy-900 text-slate-200" />
              ) : (
                <div className="flex flex-wrap gap-1.5">{item.tags.map((t) => (<span key={t} className="rounded bg-navy-800/60 px-2 py-0.5 text-xs text-navy-400">{t}</span>))}</div>
              )}
            </div>

            {/* Memo */}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">管理メモ</label>
              {editing ? (
                <Input value={memo} onChange={(e) => setMemo(e.target.value)} className="border-navy-700 bg-navy-900 text-slate-200" />
              ) : (
                <p className="text-sm text-navy-400">{item.memo || '—'}</p>
              )}
            </div>

            {/* Meta */}
            <div className="border-t border-navy-800 pt-4 text-xs text-navy-500">
              <p>ソース: {item.source} ・ 作成: {formatDate(item.created_at)} ・ 更新: {formatDate(item.updated_at)}</p>
            </div>
          </div>
        </div>

        {/* Right: similar knowledge */}
        <div className="w-64 shrink-0 border-l border-navy-800 overflow-y-auto">
          <div className="border-b border-navy-800 px-4 py-3">
            <h3 className="text-xs font-medium uppercase tracking-wider text-navy-400">類似ナレッジ</h3>
          </div>
          {similar.length === 0 ? (
            <p className="px-4 py-6 text-xs text-navy-600">類似なし</p>
          ) : (
            <div className="divide-y divide-navy-800/50">
              {similar.map((k) => (
                <button key={k.id} onClick={() => router.push(`/admin/knowledge/${k.id}`)} className="block w-full px-4 py-3 text-left transition-colors hover:bg-navy-800/30">
                  <p className="text-sm text-slate-300">{k.title}</p>
                  <p className="mt-0.5 text-xs text-navy-500">{categoryLabels[k.category]}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
