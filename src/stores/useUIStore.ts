import { create } from 'zustand'

interface UIState {
  sidebarCollapsed: boolean
  contextPanelVisible: boolean
  threadSearchQuery: string

  toggleSidebar: () => void
  toggleContextPanel: () => void
  setThreadSearchQuery: (query: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  contextPanelVisible: true,
  threadSearchQuery: '',

  toggleSidebar: () =>
    set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  toggleContextPanel: () =>
    set((s) => ({ contextPanelVisible: !s.contextPanelVisible })),
  setThreadSearchQuery: (threadSearchQuery) => set({ threadSearchQuery }),
}))
