-- =============================================
-- Yoshida Shunsuke OS - Database Schema
-- =============================================

-- Enable pgvector for future embedding search
-- create extension if not exists vector;

-- ===== Users =====
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  display_name text not null,
  relationship_category text not null check (relationship_category in ('business_leader', 'senior_staff', 'family')),
  relationship_memo text default '',
  is_active boolean default true,
  is_admin boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ===== Conversations =====
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  title text not null default '',
  mode text not null default 'consultation' check (mode in ('consultation', 'judgment', 'reply', 'initial_response', 'family')),
  is_archived boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_conversations_user_id on conversations(user_id);

-- ===== Messages =====
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now()
);

create index idx_messages_conversation_id on messages(conversation_id);

-- ===== Knowledge =====
create table if not exists knowledge (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  raw_text text default '',
  category text not null check (category in (
    'core_persona', 'judgment_rule', 'values_and_life_philosophy',
    'relationship_rule', 'reply_style_pattern', 'crisis_response_rule',
    'temporary_context', 'low_priority'
  )),
  tags text[] default '{}',
  related_persons text[] default '{}',
  importance integer default 3 check (importance between 1 and 5),
  is_private boolean default false,
  visible_to uuid[] default '{}',
  source text default '',
  memo text default '',
  -- embedding vector(1536),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ===== Persona Rules =====
create table if not exists persona_rules (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  key text not null,
  value text not null,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ===== Relationship Settings =====
create table if not exists relationship_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  base_tone text default '',
  strictness_level integer default 3 check (strictness_level between 1 and 5),
  empathy_depth integer default 3 check (empathy_depth between 1 and 5),
  conclusion_first_degree integer default 3 check (conclusion_first_degree between 1 and 5),
  approach_memo text default '',
  cautions text default '',
  avoid_expressions text default '',
  topic_restrictions text default '',
  reference_scope text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create unique index idx_relationship_settings_user_id on relationship_settings(user_id);

-- ===== Conversation Audit =====
create table if not exists conversation_audits (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  mode text not null,
  referenced_knowledge_ids uuid[] default '{}',
  applied_relationship_setting_id uuid references relationship_settings(id),
  admin_memo text default '',
  needs_review boolean default false,
  created_at timestamptz default now()
);

-- ===== Change History =====
create table if not exists change_history (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('knowledge', 'persona', 'relationship', 'user')),
  entity_id uuid not null,
  change_type text not null check (change_type in ('create', 'update', 'delete')),
  previous_value jsonb,
  new_value jsonb,
  changed_by uuid references users(id),
  created_at timestamptz default now()
);

create index idx_change_history_entity on change_history(entity_type, entity_id);

-- ===== RLS Policies =====
alter table users enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table knowledge enable row level security;
alter table persona_rules enable row level security;
alter table relationship_settings enable row level security;
alter table conversation_audits enable row level security;
alter table change_history enable row level security;

-- Users can read their own data
create policy "Users can read own data" on users
  for select using (auth.uid() = id);

-- Admin can read all users
create policy "Admin can read all users" on users
  for select using (
    exists (select 1 from users where id = auth.uid() and is_admin = true)
  );

-- Users can read their own conversations
create policy "Users can read own conversations" on conversations
  for select using (user_id = auth.uid());

-- Users can insert their own conversations
create policy "Users can create conversations" on conversations
  for insert with check (user_id = auth.uid());

-- Users can read messages in their conversations
create policy "Users can read own messages" on messages
  for select using (
    exists (select 1 from conversations where id = messages.conversation_id and user_id = auth.uid())
  );

-- Users can insert messages in their conversations
create policy "Users can create messages" on messages
  for insert with check (
    exists (select 1 from conversations where id = messages.conversation_id and user_id = auth.uid())
  );

-- Admin-only tables
create policy "Admin can manage knowledge" on knowledge
  for all using (
    exists (select 1 from users where id = auth.uid() and is_admin = true)
  );

create policy "Admin can manage persona rules" on persona_rules
  for all using (
    exists (select 1 from users where id = auth.uid() and is_admin = true)
  );

create policy "Admin can manage relationship settings" on relationship_settings
  for all using (
    exists (select 1 from users where id = auth.uid() and is_admin = true)
  );

create policy "Admin can view audits" on conversation_audits
  for select using (
    exists (select 1 from users where id = auth.uid() and is_admin = true)
  );

create policy "Admin can view change history" on change_history
  for select using (
    exists (select 1 from users where id = auth.uid() and is_admin = true)
  );
