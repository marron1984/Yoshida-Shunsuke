'use client'

import { useEffect, useCallback } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useChatStore } from '@/stores/useChatStore'
import { useUIStore } from '@/stores/useUIStore'
import { ThreadList } from '@/components/chat/ThreadList'
import { MessageArea } from '@/components/chat/MessageArea'
import { ContextPanel } from '@/components/chat/ContextPanel'
import { ModeSelector } from '@/components/chat/ModeSelector'
import { dummyConversations, dummyMessages } from '@/lib/dummy-data'
import type { Message } from '@/types'

const dummyResponses: Record<string, string> = {
  consultation:
    'なるほど、そういう状況か。\n\nまず整理しよう。いま一番大事なのは、全体を見て優先順位をつけることだと思う。全部同時にやろうとすると、どれも中途半端になるリスクがある。\n\nまず止血を優先して、そこから順番に取り組んでいこう。具体的にどこから手をつけるか、もう少し聞かせてもらっていい？',
  judgment:
    '結論から言うと、今の段階では見送った方がいいと思う。\n\n理由は2つ。まだ判断材料が揃っていないのと、急いで決めるメリットが薄い。\n\nただ、来週までに確認しておくべきことはある。それを整理して、改めて判断しよう。',
  reply:
    'こういう感じでどうだろう。\n\n「お世話になっております。ご連絡いただいた件、社内で確認のうえ、来週中にあらためてご回答させていただきます。恐れ入りますが、少々お待ちいただけますと幸いです。」\n\n相手との関係性を考えると、このくらいの温度感がちょうどいいと思う。もう少し砕けた方がいい？',
  initial_response:
    'まず落ち着こう。今やることを3つだけ整理する。\n\n1. 状況を正確に把握する\n2. 関係者に一報を入れる\n3. 次のアクションを決める\n\n原因究明は後でいい。今は止血に集中しよう。',
  family:
    'そうだったんだ。それはしんどかったよな。\n\n急いで答えを出さなくても大丈夫だよ。まずはゆっくり考えよう。\n\nそのうえで、僕はこう思うんだけど——無理にどうこうする必要はなくて、自分のペースで進めればいいと思う。',
}

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

      setTimeout(() => {
        const assistantMsg: Message = {
          id: `msg-${Date.now() + 1}`,
          conversation_id: activeConversationId ?? '',
          role: 'assistant',
          content: dummyResponses[currentMode] ?? dummyResponses.consultation,
          created_at: new Date().toISOString(),
        }
        addMessage(assistantMsg)
        setGenerating(false)
      }, 1500)
    },
    [activeConversationId, addMessage, setGenerating, currentMode]
  )

  if (!user) return null

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-navy-800 px-6 py-2.5">
        <ModeSelector />
        <span className="text-xs text-navy-500">{user.display_name}</span>
      </header>

      {/* 3-column layout */}
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
