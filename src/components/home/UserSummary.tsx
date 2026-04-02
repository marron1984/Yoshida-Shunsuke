'use client'

import { dummyConversations, dummyUsers } from '@/lib/dummy-data'

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-navy-800 bg-navy-900/50 px-5 py-4">
      <p className="text-xs font-medium uppercase tracking-wider text-navy-400">
        {label}
      </p>
      <p className="mt-1 text-2xl font-light text-slate-200">{value}</p>
    </div>
  )
}

export function UserSummary() {
  const activeConvs = dummyConversations.filter((c) => !c.is_archived)
  const recentCount = activeConvs.filter((c) => {
    const d = new Date(c.updated_at)
    const now = new Date()
    return now.getTime() - d.getTime() < 7 * 24 * 60 * 60 * 1000
  }).length

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <StatCard label="利用者" value={dummyUsers.length} />
      <StatCard label="会話総数" value={dummyConversations.length} />
      <StatCard label="直近7日" value={recentCount} />
      <StatCard label="未処理" value={1} />
    </div>
  )
}
