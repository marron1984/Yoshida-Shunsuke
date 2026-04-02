'use client'

import { useChatStore } from '@/stores/useChatStore'
import type { ResponseMode } from '@/types'
import { cn } from '@/lib/utils'

const modes: { value: ResponseMode; label: string }[] = [
  { value: 'consultation', label: '相談' },
  { value: 'judgment', label: '判断' },
  { value: 'reply', label: '返答' },
  { value: 'initial_response', label: '初動' },
  { value: 'family', label: '家族' },
]

export function ModeSelector() {
  const { currentMode, setMode } = useChatStore()

  return (
    <div className="flex items-center gap-1">
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => setMode(mode.value)}
          className={cn(
            'rounded-md px-2.5 py-1 text-xs transition-colors',
            currentMode === mode.value
              ? 'bg-navy-700 text-slate-200'
              : 'text-navy-400 hover:bg-navy-800 hover:text-navy-300'
          )}
        >
          {mode.label}
        </button>
      ))}
    </div>
  )
}
