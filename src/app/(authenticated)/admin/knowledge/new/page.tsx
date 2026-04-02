'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { KnowledgeCategory } from '@/types'
import { cn } from '@/lib/utils'

const categoryOptions: { value: KnowledgeCategory; label: string }[] = [
  { value: 'core_persona', label: 'コア人格' },
  { value: 'judgment_rule', label: '判断基準' },
  { value: 'values_and_life_philosophy', label: '人生観・価値観' },
  { value: 'relationship_rule', label: '接し方ルール' },
  { value: 'reply_style_pattern', label: '返信スタイル' },
  { value: 'crisis_response_rule', label: 'トラブル対応' },
  { value: 'temporary_context', label: '一時文脈' },
  { value: 'low_priority', label: '低優先度' },
]

const sourceOptions = [
  { value: 'manual', label: '手動入力' },
  { value: 'line', label: 'LINE' },
  { value: 'chat_log', label: '会話ログ' },
  { value: 'memo', label: 'メモ' },
  { value: 'meeting_notes', label: '議事録' },
]

export default function KnowledgeNewPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [rawText, setRawText] = useState('')
  const [summary, setSummary] = useState('')
  const [category, setCategory] = useState<KnowledgeCategory>('core_persona')
  const [tags, setTags] = useState('')
  const [source, setSource] = useState('manual')
  const [importance, setImportance] = useState(3)
  const [targetPerson, setTargetPerson] = useState('')
  const [isTemporary, setIsTemporary] = useState(false)
  const [memo, setMemo] = useState('')

  const handleSave = () => {
    // TODO: Supabase insert
    alert('ナレッジを保存しました（ダミー）')
    router.push('/admin/knowledge')
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-navy-800 px-8 py-4">
        <div>
          <h1 className="text-lg font-light tracking-wider text-slate-200">
            ナレッジ登録
          </h1>
          <p className="mt-0.5 text-xs text-navy-500">
            人格OSの精度を上げる構造化ナレッジを登録する
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-navy-400"
          >
            キャンセル
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!title || !summary}
            className="bg-navy-700 text-slate-200 hover:bg-navy-600"
          >
            保存
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">
              タイトル
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例：まず止血、完璧より前進"
              className="border-navy-700 bg-navy-900 text-slate-200"
            />
          </div>

          {/* Raw text */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">
              原文
            </label>
            <Textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="LINE履歴、会話ログ、メモなどの原文をそのまま貼り付け"
              rows={8}
              className="border-navy-700 bg-navy-900 text-slate-200"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">
              要約・構造化内容
            </label>
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="吉田俊輔らしさが見える形に構造化して記述"
              rows={4}
              className="border-navy-700 bg-navy-900 text-slate-200"
            />
          </div>

          {/* Category + Source row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">
                分類
              </label>
              <div className="flex flex-wrap gap-1.5">
                {categoryOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setCategory(opt.value)}
                    className={cn(
                      'rounded-md px-2.5 py-1 text-xs transition-colors',
                      category === opt.value
                        ? 'bg-navy-700 text-slate-200'
                        : 'bg-navy-900 text-navy-400 hover:bg-navy-800'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">
                登録ソース
              </label>
              <div className="flex flex-wrap gap-1.5">
                {sourceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSource(opt.value)}
                    className={cn(
                      'rounded-md px-2.5 py-1 text-xs transition-colors',
                      source === opt.value
                        ? 'bg-navy-700 text-slate-200'
                        : 'bg-navy-900 text-navy-400 hover:bg-navy-800'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tags + Person */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">
                タグ（カンマ区切り）
              </label>
              <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="例：判断基準, 初動"
                className="border-navy-700 bg-navy-900 text-slate-200"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">
                対象相手
              </label>
              <Input
                value={targetPerson}
                onChange={(e) => setTargetPerson(e.target.value)}
                placeholder="例：田中太郎（空欄で全体適用）"
                className="border-navy-700 bg-navy-900 text-slate-200"
              />
            </div>
          </div>

          {/* Importance + Temporary toggle */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">
                重要度
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setImportance(level)}
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors',
                      importance === level
                        ? 'bg-navy-700 text-slate-200'
                        : 'bg-navy-900 text-navy-500 hover:bg-navy-800'
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">
                保存タイプ
              </label>
              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 text-sm text-navy-300">
                  <input
                    type="radio"
                    checked={!isTemporary}
                    onChange={() => setIsTemporary(false)}
                    className="accent-navy-500"
                  />
                  永続保存
                </label>
                <label className="flex items-center gap-2 text-sm text-navy-300">
                  <input
                    type="radio"
                    checked={isTemporary}
                    onChange={() => setIsTemporary(true)}
                    className="accent-navy-500"
                  />
                  一時文脈のみ
                </label>
              </div>
            </div>
          </div>

          {/* Memo */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">
              管理メモ
            </label>
            <Input
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="管理用の補足メモ"
              className="border-navy-700 bg-navy-900 text-slate-200"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
