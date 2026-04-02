'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { dummyUsers } from '@/lib/dummy-data'
import { dummyRelationshipSettings } from '@/lib/dummy-persona'
import { USER_ROLES } from '@/lib/constants'
import { cn } from '@/lib/utils'

function SliderField({
  label,
  value,
  onChange,
  leftLabel,
  rightLabel,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  leftLabel: string
  rightLabel: string
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-navy-400">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <span className="w-16 text-right text-xs text-navy-500">
          {leftLabel}
        </span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => onChange(level)}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors',
                value === level
                  ? 'bg-navy-700 text-slate-200'
                  : 'bg-navy-900 text-navy-500 hover:bg-navy-800'
              )}
            >
              {level}
            </button>
          ))}
        </div>
        <span className="text-xs text-navy-500">{rightLabel}</span>
      </div>
    </div>
  )
}

export default function RelationshipDetailPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.userId as string

  const user = dummyUsers.find((u) => u.id === userId)
  const setting = dummyRelationshipSettings.find((s) => s.user_id === userId)

  const [baseTone, setBaseTone] = useState(setting?.base_tone ?? '')
  const [strictness, setStrictness] = useState(setting?.strictness_level ?? 3)
  const [empathy, setEmpathy] = useState(setting?.empathy_depth ?? 3)
  const [conclusionFirst, setConclusionFirst] = useState(setting?.conclusion_first_degree ?? 3)
  const [approachMemo, setApproachMemo] = useState(setting?.approach_memo ?? '')
  const [cautions, setCautions] = useState(setting?.cautions ?? '')
  const [avoidExpressions, setAvoidExpressions] = useState(setting?.avoid_expressions ?? '')
  const [topicRestrictions, setTopicRestrictions] = useState(setting?.topic_restrictions ?? '')
  const [referenceScope, setReferenceScope] = useState(setting?.reference_scope ?? '')

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-navy-500">ユーザーが見つかりません</p>
      </div>
    )
  }

  const handleSave = () => {
    alert('保存しました（ダミー）')
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-navy-800 px-8 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin/relationships')}
            className="text-navy-500 transition-colors hover:text-navy-300"
          >
            ← 一覧
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-light tracking-wider text-slate-200">
                {user.display_name}
              </h1>
              <span className="rounded bg-navy-800 px-1.5 py-0.5 text-xs text-navy-300">
                {USER_ROLES[user.relationship_category]?.label}
              </span>
            </div>
          </div>
        </div>
        <Button
          size="sm"
          onClick={handleSave}
          className="bg-navy-700 text-slate-200 hover:bg-navy-600"
        >
          保存
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto max-w-2xl space-y-8">
          {/* Base tone */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">
              基本トーン
            </label>
            <Input
              value={baseTone}
              onChange={(e) => setBaseTone(e.target.value)}
              placeholder="例：やわらかく、伴走感を持って"
              className="border-navy-700 bg-navy-900 text-slate-200"
            />
          </div>

          {/* Sliders */}
          <div className="space-y-6">
            <SliderField
              label="厳しさレベル"
              value={strictness}
              onChange={setStrictness}
              leftLabel="やさしい"
              rightLabel="厳しい"
            />
            <SliderField
              label="共感の厚さ"
              value={empathy}
              onChange={setEmpathy}
              leftLabel="淡白"
              rightLabel="深い"
            />
            <SliderField
              label="結論先行度"
              value={conclusionFirst}
              onChange={setConclusionFirst}
              leftLabel="経緯から"
              rightLabel="結論から"
            />
          </div>

          {/* Approach memo */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">
              接し方メモ
            </label>
            <Textarea
              value={approachMemo}
              onChange={(e) => setApproachMemo(e.target.value)}
              rows={3}
              className="border-navy-700 bg-navy-900 text-slate-200"
            />
          </div>

          {/* Cautions */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">
              注意点
            </label>
            <Input
              value={cautions}
              onChange={(e) => setCautions(e.target.value)}
              className="border-navy-700 bg-navy-900 text-slate-200"
            />
          </div>

          {/* Avoid expressions */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">
              避けたい言い方
            </label>
            <Input
              value={avoidExpressions}
              onChange={(e) => setAvoidExpressions(e.target.value)}
              placeholder="例：「なぜできないの」「普通は〜」"
              className="border-navy-700 bg-navy-900 text-slate-200"
            />
          </div>

          {/* Topic restrictions */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">
              話題制限
            </label>
            <Input
              value={topicRestrictions}
              onChange={(e) => setTopicRestrictions(e.target.value)}
              placeholder="例：仕事の詳細は必要以上に持ち出さない"
              className="border-navy-700 bg-navy-900 text-slate-200"
            />
          </div>

          {/* Reference scope */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-navy-400">
              参照許可範囲
            </label>
            <Input
              value={referenceScope}
              onChange={(e) => setReferenceScope(e.target.value)}
              placeholder="例：本人との会話のみ"
              className="border-navy-700 bg-navy-900 text-slate-200"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
