'use client'

import { dummyImportantNotes } from '@/lib/dummy-data'
import { formatRelativeTime } from '@/lib/date'

export function ImportantNotes() {
  return (
    <div className="rounded-lg border border-navy-800 bg-navy-900/30">
      <div className="border-b border-navy-800 px-5 py-3">
        <h2 className="text-xs font-medium uppercase tracking-wider text-navy-400">
          重要メモ
        </h2>
      </div>
      <div className="divide-y divide-navy-800/50">
        {dummyImportantNotes.map((note) => (
          <div key={note.id} className="px-5 py-3">
            <p className="text-sm leading-relaxed text-slate-300">
              {note.content}
            </p>
            <p className="mt-1.5 text-xs text-navy-500">
              {formatRelativeTime(note.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
