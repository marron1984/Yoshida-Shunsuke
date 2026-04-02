'use client'

import Link from 'next/link'
import { dummyUsers } from '@/lib/dummy-data'
import { dummyRelationshipSettings } from '@/lib/dummy-persona'
import { USER_ROLES } from '@/lib/constants'

function LevelBar({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`inline-block h-1.5 w-4 rounded-sm ${
            i < value ? 'bg-slate-400' : 'bg-navy-700'
          }`}
        />
      ))}
    </div>
  )
}

export default function RelationshipsPage() {
  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-navy-800 px-8 py-4">
        <h1 className="text-lg font-light tracking-wider text-slate-200">
          相手別接し方設定
        </h1>
        <p className="mt-0.5 text-xs text-navy-500">
          相手ごとにトーン・厳しさ・共感の厚さを調整する
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto max-w-4xl space-y-4">
          {dummyUsers.map((user) => {
            const setting = dummyRelationshipSettings.find(
              (s) => s.user_id === user.id
            )
            return (
              <Link
                key={user.id}
                href={`/admin/relationships/${user.id}`}
                className="block rounded-lg border border-navy-800 bg-navy-900/30 p-5 transition-colors hover:border-navy-700"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-200">
                        {user.display_name}
                      </span>
                      <span className="rounded bg-navy-800 px-1.5 py-0.5 text-xs text-navy-300">
                        {USER_ROLES[user.relationship_category]?.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-navy-400">
                      {setting?.base_tone ?? '未設定'}
                    </p>
                  </div>
                  <span className="text-xs text-navy-600">→</span>
                </div>

                {setting && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <p className="mb-1 text-xs text-navy-500">厳しさ</p>
                      <LevelBar value={setting.strictness_level} />
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-navy-500">共感の厚さ</p>
                      <LevelBar value={setting.empathy_depth} />
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-navy-500">結論先行度</p>
                      <LevelBar value={setting.conclusion_first_degree} />
                    </div>
                  </div>
                )}

                {setting?.cautions && (
                  <p className="mt-3 text-xs text-navy-500">
                    注意: {setting.cautions}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
