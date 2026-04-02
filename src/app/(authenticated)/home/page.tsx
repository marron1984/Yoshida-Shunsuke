'use client'

import { RecentConversations } from '@/components/home/RecentConversations'
import { ActiveTopics } from '@/components/home/ActiveTopics'
import { ImportantNotes } from '@/components/home/ImportantNotes'
import { UserSummary } from '@/components/home/UserSummary'

export default function HomePage() {
  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-navy-800 px-8 py-4">
        <h1 className="text-lg font-light tracking-wider text-slate-200">
          ホーム
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* Stats row */}
          <UserSummary />

          {/* Two-column grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left: 2/3 */}
            <div className="space-y-6 lg:col-span-2">
              <RecentConversations />
              <ActiveTopics />
            </div>

            {/* Right: 1/3 */}
            <div className="space-y-6">
              <ImportantNotes />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
