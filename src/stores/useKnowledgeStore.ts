import { create } from 'zustand'
import type { KnowledgeItem, KnowledgeCategory } from '@/types'

interface KnowledgeState {
  items: KnowledgeItem[]
  selectedId: string | null
  filterCategory: KnowledgeCategory | 'all'
  searchQuery: string

  setItems: (items: KnowledgeItem[]) => void
  addItem: (item: KnowledgeItem) => void
  updateItem: (id: string, updates: Partial<KnowledgeItem>) => void
  removeItem: (id: string) => void
  setSelectedId: (id: string | null) => void
  setFilterCategory: (category: KnowledgeCategory | 'all') => void
  setSearchQuery: (query: string) => void
}

export const useKnowledgeStore = create<KnowledgeState>((set) => ({
  items: [],
  selectedId: null,
  filterCategory: 'all',
  searchQuery: '',

  setItems: (items) => set({ items }),
  addItem: (item) => set((s) => ({ items: [item, ...s.items] })),
  updateItem: (id, updates) =>
    set((s) => ({
      items: s.items.map((i) => (i.id === id ? { ...i, ...updates } : i)),
    })),
  removeItem: (id) =>
    set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  setSelectedId: (selectedId) => set({ selectedId }),
  setFilterCategory: (filterCategory) => set({ filterCategory }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}))
