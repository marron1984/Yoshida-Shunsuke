'use client'

import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'
import { useChatStore } from '@/stores/useChatStore'
import { ThreadList } from '@/components/chat/ThreadList'
import { MessageArea } from '@/components/chat/MessageArea'
import { ContextPanel } from '@/components/chat/ContextPanel'
import { ModeSelector } from '@/components/chat/ModeSelector'
import { dummyConversations, dummyMessages } from '@/lib/dummy-data'
import type { Message } from '@/types'

export default function ChatPage() {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const {
    conversations,
    activeConversationId,
    messages,
    setConversations,
    setActiveConversation,
    setMessages,
    addMessage,
    setGenerating,
    createConversation,
    currentMode,
  } = useChatStore()

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    setConversations(dummyConversations)
    if (dummyConversations.length > 0) {
      setActiveConversation(dummyConversations[0].id)
    }
  }, [user, router, setConversations, setActiveConversation])

  useEffect(() => {
    if (activeConversationId && dummyMessages[activeConversationId]) {
      setMessages(dummyMessages[activeConversationId])
    } else {
      setMessages([])
    }
  }, [activeConversationId, setMessages])

  const handleNewThread = useCallback(() => {
    const id = `conv-${Date.now()}`
    createConversation({
      id,
      user_id: user?.id ?? '',
      title: '新しい会話',
      mode: currentMode,
      is_archived: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    setMessages([])
  }, [user, currentMode, createConversation, setMessages])

  const handleSend = useCallback(
    (content: string) => {
      const userMsg: Message = {
        id: `msg-${Date.now()}`,
        conversation_id: activeConversationId ?? '',
        role: 'user',
        content,
        created_at: new Date().toISOString(),
      }
      addMessage(userMsg)
      setGenerating(true)

      // Dummy response after delay
      setTimeout(() => {
        const assistantMsg: Message = {
          id: `msg-${Date.now() + 1}`,
          conversation_id: activeConversationId ?? '',
          role: 'assistant',
          content:
            'なるほど、そういう状況か。\n\nまず整理しよう。いま一番大事なのは、全体を見て優先順位をつけることだと思う。全部同時にやろうとすると、どれも中途半端になるリスクがある。\n\nまず止血を優先して、そこから順番に取り組んでいこう。具体的にどこから手をつけるか、もう少し聞かせてもらっていい？',
          created_at: new Date().toISOString(),
        }
        addMessage(assistantMsg)
        setGenerating(false)
      }, 1500)
    },
    [activeConversationId, addMessage, setGenerating]
  )

  if (!user) return null

  return (
    <div className="flex h-screen flex-col bg-navy-950">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-navy-800 px-6 py-2.5">
        <div className="flex items-center gap-6">
          <h1 className="text-sm font-light tracking-wider text-slate-400">
            Yoshida Shunsuke OS
          </h1>
          <ModeSelector />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-navy-500">{user.display_name}</span>
          <button
            onClick={() => {
              useAuthStore.getState().logout()
              router.push('/login')
            }}
            className="text-xs text-navy-500 transition-colors hover:text-navy-300"
          >
            ログアウト
          </button>
        </div>
      </header>

      {/* Main 3-column layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Thread List */}
        <div className="w-64 shrink-0">
          <ThreadList
            conversations={conversations}
            onNewThread={handleNewThread}
          />
        </div>

        {/* Center: Messages */}
        <div className="flex-1">
          <MessageArea messages={messages} onSend={handleSend} />
        </div>

        {/* Right: Context Panel */}
        <div className="w-72 shrink-0">
          <ContextPanel />
        </div>
      </div>
    </div>
  )
}
