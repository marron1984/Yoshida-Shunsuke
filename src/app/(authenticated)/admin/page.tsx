'use client'

import Link from 'next/link'
import { dummyUsers, dummyConversations } from '@/lib/dummy-data'
import { dummyKnowledge } from '@/lib/dummy-knowledge'
import { formatRelativeTime } from '@/lib/date'

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

function SectionCard({
  title,
  href,
  children,
}: {
  title: string
  href: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-navy-800 bg-navy-900/30">
      <div className="flex items-center justify-between border-b border-navy-800 px-5 py-3">
        <h2 className="text-xs font-medium uppercase tracking-wider text-navy-400">
          {title}
        </h2>
        <Link
          href={href}
          className="text-xs text-navy-500 transition-colors hover:text-navy-300"
        >
          すべて表示 →
        </Link>
      </div>
      {children}
    </div>
  )
}

export default function AdminDashboard() {
  const activeConvs = dummyConversations.filter((c) => !c.is_archived)
  const recentCount = activeConvs.filter((c) => {
    const d = new Date(c.updated_at)
    const now = new Date()
    return now.getTime() - d.getTime() < 7 * 24 * 60 * 60 * 1000
  }).length

  const recentKnowledge = [...dummyKnowledge]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5)

  const recentUsers = [...dummyUsers]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 5)

  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-navy-800 px-8 py-4">
        <h1 className="text-lg font-light tracking-wider text-slate-200">
          ダッシュボード
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="利用者数" value={dummyUsers.length} />
            <StatCard label="会話総数" value={dummyConversations.length} />
            <StatCard label="直近7日" value={recentCount} />
            <StatCard label="ナレッジ" value={dummyKnowledge.length} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recent Knowledge */}
            <SectionCard title="最近更新されたナレッジ" href="/admin/knowledge">
              <div className="divide-y divide-navy-800/50">
                {recentKnowledge.map((k) => (
                  <div key={k.id} className="px-5 py-3">
                    <p className="text-sm text-slate-300">{k.title}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="rounded bg-navy-800 px-1.5 py-0.5 text-xs text-navy-300">
                        {k.category}
                      </span>
                      <span className="text-xs text-navy-500">
                        {formatRelativeTime(k.updated_at)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Recent Users */}
            <SectionCard title="利用者" href="/admin/users">
              <div className="divide-y divide-navy-800/50">
                {recentUsers.map((u) => (
                  <div key={u.id} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="text-sm text-slate-300">{u.display_name}</p>
                      <p className="text-xs text-navy-500">{u.email}</p>
                    </div>
                    <span className="rounded bg-navy-800 px-1.5 py-0.5 text-xs text-navy-300">
                      {u.relationship_category === 'business_leader'
                        ? '事業責任者'
                        : u.relationship_category === 'senior_staff'
                          ? '社内幹部'
                          : '家族'}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  )
}
