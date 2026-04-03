'use client'

import { useEffect, useCallback } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useChatStore } from '@/stores/useChatStore'
import { useUIStore } from '@/stores/useUIStore'
import { ThreadList } from '@/components/chat/ThreadList'
import { MessageArea } from '@/components/chat/MessageArea'
import { ContextPanel } from '@/components/chat/ContextPanel'
import { ModeSelector } from '@/components/chat/ModeSelector'
import { dummyConversations, dummyMessages, dummyRelationshipMemos } from '@/lib/dummy-data'
import type { Message } from '@/types'

export default function ChatPage() {
  const user = useAuthStore((s) => s.user)
  const {
    conversations,
    activeConversationId,
    messages,
    currentMode,
    setConversations,
    setActiveConversation,
    setMessages,
    addMessage,
    setGenerating,
    createConversation,
  } = useChatStore()
  const contextPanelVisible = useUIStore((s) => s.contextPanelVisible)

  useEffect(() => {
    setConversations(dummyConversations.filter((c) => !c.is_archived))
    if (dummyConversations.length > 0 && !activeConversationId) {
      setActiveConversation(dummyConversations[0].id)
    }
  }, [setConversations, setActiveConversation, activeConversationId])

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
    async (content: string) => {
      const userMsg: Message = {
        id: `msg-${Date.now()}`,
        conversation_id: activeConversationId ?? '',
        role: 'user',
        content,
        created_at: new Date().toISOString(),
      }
      addMessage(userMsg)
      setGenerating(true)

      try {
        // Build conversation history for API
        const history = [
          ...messages.map((m) => ({ role: m.role, content: m.content })),
          { role: 'user' as const, content },
        ]

        // Get relationship memo for context
        const relMemo = user
          ? dummyRelationshipMemos[user.id]
          : undefined

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: history,
            mode: currentMode,
            relationship: user?.relationship_category ?? 'business_leader',
            relationshipMemo: relMemo
              ? `${relMemo.name}（${relMemo.category}）: ${relMemo.memo}\nトーン: ${relMemo.tone}\n注意: ${relMemo.caution}`
              : undefined,
          }),
        })

        const data = await res.json()

        const assistantMsg: Message = {
          id: `msg-${Date.now() + 1}`,
          conversation_id: activeConversationId ?? '',
          role: 'assistant',
          content: data.content ?? '応答の生成に失敗しました',
          created_at: new Date().toISOString(),
        }
        addMessage(assistantMsg)
      } catch {
        addMessage({
          id: `msg-${Date.now() + 1}`,
          conversation_id: activeConversationId ?? '',
          role: 'assistant',
          content: '通信エラーが発生しました。もう一度お試しください。',
          created_at: new Date().toISOString(),
        })
      } finally {
        setGenerating(false)
      }
    },
    [activeConversationId, addMessage, setGenerating, currentMode, messages, user]
  )

  if (!user) return null

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-navy-800 px-6 py-2.5">
        <ModeSelector />
        <span className="text-xs text-navy-500">{user.display_name}</span>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 shrink-0">
          <ThreadList conversations={conversations} onNewThread={handleNewThread} />
        </div>
        <div className="flex-1">
          <MessageArea messages={messages} onSend={handleSend} />
        </div>
        <div className={contextPanelVisible ? 'w-72 shrink-0' : 'shrink-0'}>
          <ContextPanel />
        </div>
      </div>
    </div>
  )
}
