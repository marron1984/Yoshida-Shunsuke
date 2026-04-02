'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { dummyPersonaRules, personaSectionLabels } from '@/lib/dummy-persona'
import { formatRelativeTime } from '@/lib/date'
import type { PersonaRule } from '@/types'
import { cn } from '@/lib/utils'

function RuleCard({
  rule,
  onEdit,
}: {
  rule: PersonaRule
  onEdit: (rule: PersonaRule) => void
}) {
  return (
    <div className="group flex items-start justify-between rounded-lg border border-navy-800 bg-navy-900/40 px-4 py-3 transition-colors hover:border-navy-700">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-300">{rule.key}</p>
        <p className="mt-1 text-sm leading-relaxed text-navy-300">
          {rule.value}
        </p>
        <p className="mt-1.5 text-xs text-navy-600">
          更新: {formatRelativeTime(rule.updated_at)}
        </p>
      </div>
      <button
        onClick={() => onEdit(rule)}
        className="ml-3 shrink-0 text-xs text-navy-600 opacity-0 transition-opacity group-hover:opacity-100 hover:text-navy-300"
      >
        編集
      </button>
    </div>
  )
}

export default function PersonaPage() {
  const [editingRule, setEditingRule] = useState<PersonaRule | null>(null)
  const [editKey, setEditKey] = useState('')
  const [editValue, setEditValue] = useState('')

  const sections = Object.entries(personaSectionLabels)

  const handleEdit = (rule: PersonaRule) => {
    setEditingRule(rule)
    setEditKey(rule.key)
    setEditValue(rule.value)
  }

  const handleSave = () => {
    alert('保存しました（ダミー）')
    setEditingRule(null)
  }

  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-navy-800 px-8 py-4">
        <h1 className="text-lg font-light tracking-wider text-slate-200">
          人格設定
        </h1>
        <p className="mt-0.5 text-xs text-navy-500">
          概念単位・ルール単位で人格の中核を編集する
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto max-w-3xl space-y-8">
          {sections.map(([sectionKey, sectionLabel]) => {
            const rules = dummyPersonaRules.filter(
              (r) => r.section === sectionKey
            )
            return (
              <div key={sectionKey}>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-medium text-slate-200">
                    {sectionLabel}
                  </h2>
                  <span className="text-xs text-navy-600">
                    {rules.length} ルール
                  </span>
                </div>
                <div className="space-y-2">
                  {rules.map((rule) => (
                    <RuleCard
                      key={rule.id}
                      rule={rule}
                      onEdit={handleEdit}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Edit modal */}
      {editingRule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-lg rounded-lg border border-navy-700 bg-navy-900 p-6">
            <h3 className="mb-4 text-sm font-medium text-slate-200">
              ルール編集
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs text-navy-400">
                  ルール名
                </label>
                <Input
                  value={editKey}
                  onChange={(e) => setEditKey(e.target.value)}
                  className="border-navy-700 bg-navy-950 text-slate-200"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-navy-400">
                  内容
                </label>
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  rows={3}
                  className="flex w-full rounded-md border border-navy-700 bg-navy-950 px-3 py-2 text-sm text-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-navy-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingRule(null)}
                className="text-navy-400"
              >
                キャンセル
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-navy-700 text-slate-200 hover:bg-navy-600"
              >
                保存
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
