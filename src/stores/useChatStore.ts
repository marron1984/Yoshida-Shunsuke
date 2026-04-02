import { create } from 'zustand'
import type { Conversation, Message, ResponseMode } from '@/types'

interface ChatState {
  conversations: Conversation[]
  activeConversationId: string | null
  messages: Message[]
  isGenerating: boolean
  currentMode: ResponseMode

  setConversations: (conversations: Conversation[]) => void
  setActiveConversation: (id: string | null) => void
  setMessages: (messages: Message[]) => void
  addMessage: (message: Message) => void
  setGenerating: (generating: boolean) => void
  setMode: (mode: ResponseMode) => void
  createConversation: (conversation: Conversation) => void
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  activeConversationId: null,
  messages: [],
  isGenerating: false,
  currentMode: 'consultation',

  setConversations: (conversations) => set({ conversations }),
  setActiveConversation: (id) => set({ activeConversationId: id }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setGenerating: (isGenerating) => set({ isGenerating }),
  setMode: (currentMode) => set({ currentMode }),
  createConversation: (conversation) =>
    set((state) => ({
      conversations: [conversation, ...state.conversations],
      activeConversationId: conversation.id,
    })),
}))
