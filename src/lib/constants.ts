import type { ResponseMode, RelationshipCategory } from '@/types'

export const CONVERSATION_MODES: Record<
  ResponseMode,
  { label: string; description: string }
> = {
  consultation: {
    label: '相談',
    description: '受け止めて、整理して、次の一手を示す',
  },
  judgment: {
    label: '判断',
    description: '結論、理由、懸念点、次の一手を整理する',
  },
  reply: {
    label: '返答',
    description: 'そのまま送れる文面を作る',
  },
  initial_response: {
    label: '初動',
    description: '短く、明確に、混乱を増やさず返す',
  },
  family: {
    label: '家族',
    description: '安心感と誠実さを持って向き合う',
  },
} as const

export const USER_ROLES: Record<
  RelationshipCategory,
  { label: string }
> = {
  business_leader: { label: '事業責任者' },
  senior_staff: { label: '社内幹部' },
  family: { label: '家族' },
} as const
