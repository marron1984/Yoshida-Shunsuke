// ===== User =====
export type RelationshipCategory = 'business_leader' | 'senior_staff' | 'family'

export type ResponseMode = 'consultation' | 'judgment' | 'reply' | 'initial_response' | 'family'

export interface User {
  id: string
  email: string
  display_name: string
  relationship_category: RelationshipCategory
  relationship_memo: string
  is_active: boolean
  is_admin: boolean
  created_at: string
  updated_at: string
}

// ===== Conversation =====
export interface Conversation {
  id: string
  user_id: string
  title: string
  mode: ResponseMode
  is_archived: boolean
  created_at: string
  updated_at: string
}

export type MessageRole = 'user' | 'assistant'

export interface Message {
  id: string
  conversation_id: string
  role: MessageRole
  content: string
  created_at: string
}

// ===== Knowledge =====
export type KnowledgeCategory =
  | 'core_persona'
  | 'judgment_rule'
  | 'values_and_life_philosophy'
  | 'relationship_rule'
  | 'reply_style_pattern'
  | 'crisis_response_rule'
  | 'temporary_context'
  | 'low_priority'

export interface KnowledgeItem {
  id: string
  title: string
  content: string
  raw_text: string
  category: KnowledgeCategory
  tags: string[]
  related_persons: string[]
  importance: number // 1-5
  is_private: boolean
  visible_to: string[]
  source: string
  memo: string
  created_at: string
  updated_at: string
}

// ===== Persona =====
export interface PersonaRule {
  id: string
  section: string
  key: string
  value: string
  order: number
  created_at: string
  updated_at: string
}

// ===== Relationship Setting =====
export interface RelationshipSetting {
  id: string
  user_id: string
  base_tone: string
  strictness_level: number // 1-5
  empathy_depth: number // 1-5
  conclusion_first_degree: number // 1-5
  approach_memo: string
  cautions: string
  avoid_expressions: string
  topic_restrictions: string
  reference_scope: string
  created_at: string
  updated_at: string
}

// ===== Change History =====
export type ChangeEntityType = 'knowledge' | 'persona' | 'relationship' | 'user'

export interface ChangeHistory {
  id: string
  entity_type: ChangeEntityType
  entity_id: string
  change_type: 'create' | 'update' | 'delete'
  previous_value: Record<string, unknown> | null
  new_value: Record<string, unknown> | null
  changed_by: string
  created_at: string
}

// ===== Conversation Audit =====
export interface ConversationAudit {
  id: string
  conversation_id: string
  user_id: string
  mode: ResponseMode
  referenced_knowledge_ids: string[]
  applied_relationship_setting_id: string | null
  admin_memo: string
  needs_review: boolean
  created_at: string
}
