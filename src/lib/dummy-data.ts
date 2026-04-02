import type { User, Conversation, Message } from '@/types'

export const dummyUser: User = {
  id: 'user-001',
  email: 'tanaka@example.com',
  display_name: '田中太郎',
  relationship_category: 'business_leader',
  relationship_memo: '事業責任者。新規事業立ち上げ担当。',
  is_active: true,
  is_admin: false,
  created_at: '2026-01-15T09:00:00Z',
  updated_at: '2026-03-20T14:00:00Z',
}

export const dummyAdminUser: User = {
  id: 'admin-001',
  email: 'yoshida@example.com',
  display_name: '吉田俊輔',
  relationship_category: 'family',
  relationship_memo: '',
  is_active: true,
  is_admin: true,
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
}

export const dummyConversations: Conversation[] = [
  {
    id: 'conv-001',
    user_id: 'user-001',
    title: '新規事業の優先順位について',
    mode: 'consultation',
    is_archived: false,
    created_at: '2026-04-01T10:00:00Z',
    updated_at: '2026-04-01T11:30:00Z',
  },
  {
    id: 'conv-002',
    user_id: 'user-001',
    title: '採用面接の判断基準',
    mode: 'judgment',
    is_archived: false,
    created_at: '2026-03-28T14:00:00Z',
    updated_at: '2026-03-28T15:00:00Z',
  },
  {
    id: 'conv-003',
    user_id: 'user-001',
    title: 'クライアントへの返信文',
    mode: 'reply',
    is_archived: false,
    created_at: '2026-03-25T09:00:00Z',
    updated_at: '2026-03-25T09:30:00Z',
  },
]

export const dummyMessages: Record<string, Message[]> = {
  'conv-001': [
    {
      id: 'msg-001',
      conversation_id: 'conv-001',
      role: 'user',
      content:
        '新規事業を3つ同時に進めているんですが、リソースが足りなくて全部中途半端になりそうです。どう優先順位をつけたらいいですか？',
      created_at: '2026-04-01T10:00:00Z',
    },
    {
      id: 'msg-002',
      conversation_id: 'conv-001',
      role: 'assistant',
      content:
        '3つ同時は確かにきついな。まず整理しよう。\n\nそれぞれの事業について、2つだけ教えてほしい。\n1. 今止めたら何が失われるか\n2. 3ヶ月以内にキャッシュが生まれる見込みがあるか\n\nこの2軸で見ると、優先順位はかなりクリアになると思う。全部やりたい気持ちはわかるけど、全部中途半端になるのが一番まずい。まず止血を優先しよう。',
      created_at: '2026-04-01T10:02:00Z',
    },
    {
      id: 'msg-003',
      conversation_id: 'conv-001',
      role: 'user',
      content:
        'Aは半年後に収益見込み、Bは来月から売上が立つ、Cは研究開発段階です。Aに一番時間をかけてるんですが…',
      created_at: '2026-04-01T10:05:00Z',
    },
    {
      id: 'msg-004',
      conversation_id: 'conv-001',
      role: 'assistant',
      content:
        'なるほど。だとしたら、今はBに集中した方がいい。\n\n理由はシンプルで、来月からキャッシュが生まれるなら、それが他の事業を支える燃料になる。Aに時間をかけたい気持ちはわかるけど、Bで足元を固めてからの方が、結果的にAにも余裕を持って取り組める。\n\nCは今は最小工数で維持だけしておけばいい。研究開発は止めても再開できるから。\n\nこの順番で動けば崩れにくいと思うけど、どう思う？',
      created_at: '2026-04-01T10:07:00Z',
    },
  ],
  'conv-002': [
    {
      id: 'msg-005',
      conversation_id: 'conv-002',
      role: 'user',
      content:
        'エンジニアの採用面接で迷っています。スキルは高いけど、チームとの相性が心配な候補者がいて。',
      created_at: '2026-03-28T14:00:00Z',
    },
    {
      id: 'msg-006',
      conversation_id: 'conv-002',
      role: 'assistant',
      content:
        'スキルが高くてチーム相性が不安、これはよくある悩みだな。\n\n俺ならこう考える。\n- スキルは後から伸ばせるが、スタンスは変わりにくい\n- チームの今の状態を見て、吸収できる余力があるか\n- 相性が心配な具体的な理由は何か\n\n「なんとなく合わなそう」なのか「明確に衝突しそうなポイントがある」のかで判断は変わる。もう少し具体的に聞いてもいい？',
      created_at: '2026-03-28T14:03:00Z',
    },
  ],
  'conv-003': [],
}

export const dummyRelationshipMemo = {
  name: '田中太郎',
  category: '事業責任者',
  memo: '新規事業立ち上げ担当。真面目で慎重な性格。判断に迷いやすいが、方向が決まれば動きが早い。',
  tone: 'やわらかく、伴走感を持って',
  caution: '詰問口調にしない。迷いを責めない。',
}

export const dummyContextSummary = {
  recentTopics: ['新規事業の優先順位', '採用判断', 'クライアント対応'],
  currentIssue: 'リソース配分と優先順位の整理',
  approachNote: '実務に落とす形で、具体的な次の一手を示す',
}
