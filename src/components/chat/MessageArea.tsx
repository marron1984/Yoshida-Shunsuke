'use client'

import { useState, useRef, useEffect } from 'react'
import { useChatStore } from '@/stores/useChatStore'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { Message } from '@/types'
import { cn } from '@/lib/utils'

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[75%] rounded-lg px-4 py-3',
          isUser
            ? 'bg-navy-700 text-slate-200'
            : 'bg-navy-900 text-slate-300 border border-navy-800'
        )}
      >
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </div>
        <div
          className={cn(
            'mt-2 text-xs',
            isUser ? 'text-navy-400' : 'text-navy-500'
          )}
        >
          {formatTime(message.created_at)}
        </div>
      </div>
    </div>
  )
}

interface MessageAreaProps {
  messages: Message[]
  onSend: (content: string) => void
}

export function MessageArea({ messages, onSend }: MessageAreaProps) {
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isGenerating = useChatStore((s) => s.isGenerating)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed || isGenerating) return
    onSend(trimmed)
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-navy-500">
              会話を始めてください
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl space-y-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isGenerating && (
              <div className="flex justify-start">
                <div className="rounded-lg border border-navy-800 bg-navy-900 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-navy-400" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-navy-400 [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-navy-400 [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-navy-800 px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-end gap-3">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder="メッセージを入力..."
            rows={1}
            className="min-h-[40px] resize-none border-navy-700 bg-navy-900 text-slate-200 placeholder:text-navy-500 focus-visible:ring-navy-500"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isGenerating}
            className="shrink-0 bg-navy-700 text-slate-200 hover:bg-navy-600 disabled:opacity-30"
            size="icon"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}
