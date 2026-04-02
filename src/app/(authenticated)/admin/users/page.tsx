'use client'

import { useState } from 'react'
import { dummyUsers } from '@/lib/dummy-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { USER_ROLES } from '@/lib/constants'
import type { RelationshipCategory } from '@/types'
import { cn } from '@/lib/utils'

export default function UsersPage() {
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<RelationshipCategory>('business_leader')
  const [inviteMemo, setInviteMemo] = useState('')

  const handleInvite = () => {
    // TODO: Supabase invite
    alert(`招待送信: ${inviteEmail} (${USER_ROLES[inviteRole].label})`)
    setShowInvite(false)
    setInviteEmail('')
    setInviteMemo('')
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-navy-800 px-8 py-4">
        <h1 className="text-lg font-light tracking-wider text-slate-200">
          招待ユーザー管理
        </h1>
        <Button
          onClick={() => setShowInvite(!showInvite)}
          className="bg-navy-700 text-slate-200 hover:bg-navy-600"
          size="sm"
        >
          + 招待
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-6">
          {/* Invite form */}
          {showInvite && (
            <div className="rounded-lg border border-navy-700 bg-navy-900/60 p-5">
              <h3 className="mb-4 text-sm font-medium text-slate-300">
                新規招待
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs text-navy-400">
                    メールアドレス
                  </label>
                  <Input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="border-navy-700 bg-navy-900 text-slate-200"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-navy-400">
                    種別
                  </label>
                  <div className="flex gap-2">
                    {(Object.entries(USER_ROLES) as [RelationshipCategory, { label: string }][]).map(
                      ([key, val]) => (
                        <button
                          key={key}
                          onClick={() => setInviteRole(key)}
                          className={cn(
                            'rounded-md px-3 py-1.5 text-xs transition-colors',
                            inviteRole === key
                              ? 'bg-navy-700 text-slate-200'
                              : 'bg-navy-900 text-navy-400 hover:bg-navy-800'
                          )}
                        >
                          {val.label}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs text-navy-400">
                    メモ
                  </label>
                  <Input
                    value={inviteMemo}
                    onChange={(e) => setInviteMemo(e.target.value)}
                    placeholder="この人物との関係や注意点"
                    className="border-navy-700 bg-navy-900 text-slate-200"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInvite(false)}
                  className="text-navy-400"
                >
                  キャンセル
                </Button>
                <Button
                  size="sm"
                  onClick={handleInvite}
                  disabled={!inviteEmail}
                  className="bg-navy-700 text-slate-200 hover:bg-navy-600"
                >
                  招待を送信
                </Button>
              </div>
            </div>
          )}

          {/* User table */}
          <div className="rounded-lg border border-navy-800 bg-navy-900/30">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-800">
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-400">
                    名前
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-400">
                    メール
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-400">
                    種別
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-400">
                    状態
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-400">
                    メモ
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-navy-400">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/50">
                {dummyUsers.map((user) => (
                  <tr key={user.id} className="transition-colors hover:bg-navy-800/20">
                    <td className="px-5 py-3 text-sm text-slate-300">
                      {user.display_name}
                    </td>
                    <td className="px-5 py-3 text-sm text-navy-400">
                      {user.email}
                    </td>
                    <td className="px-5 py-3">
                      <span className="rounded bg-navy-800 px-1.5 py-0.5 text-xs text-navy-300">
                        {USER_ROLES[user.relationship_category]?.label}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={cn(
                          'rounded px-1.5 py-0.5 text-xs',
                          user.is_active
                            ? 'bg-emerald-950/50 text-emerald-300'
                            : 'bg-red-950/50 text-red-300'
                        )}
                      >
                        {user.is_active ? '有効' : '停止'}
                      </span>
                    </td>
                    <td className="max-w-[200px] truncate px-5 py-3 text-xs text-navy-500">
                      {user.relationship_memo}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-xs text-navy-500 transition-colors hover:text-navy-300">
                        編集
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
