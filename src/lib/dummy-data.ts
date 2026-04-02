import type { User, Conversation, Message } from '@/types'

// ===== Users =====

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

export const dummyUsers: User[] = [
  dummyUser,
  {
    id: 'user-002',
    email: 'suzuki@example.com',
    display_name: '鈴木一郎',
    relationship_category: 'senior_staff',
    relationship_memo: '社内幹部。開発部門統括。',
    is_active: true,
    is_admin: false,
    created_at: '2026-01-20T09:00:00Z',
    updated_at: '2026-03-15T10:00:00Z',
  },
  {
    id: 'user-003',
    email: 'yoshida.keiko@example.com',
    display_name: '吉田恵子',
    relationship_category: 'family',
    relationship_memo: '家族。',
    is_active: true,
    is_admin: false,
    created_at: '2026-02-01T09:00:00Z',
    updated_at: '2026-03-30T18:00:00Z',
  },
]

// ===== Conversations =====

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
  {
    id: 'conv-004',
    user_id: 'user-002',
    title: '開発チームの体制変更',
    mode: 'consultation',
    is_archived: false,
    created_at: '2026-03-30T16:00:00Z',
    updated_at: '2026-03-30T17:00:00Z',
  },
  {
    id: 'conv-005',
    user_id: 'user-002',
    title: 'サーバー障害の初動対応',
    mode: 'initial_response',
    is_archived: false,
    created_at: '2026-03-29T03:00:00Z',
    updated_at: '2026-03-29T03:30:00Z',
  },
  {
    id: 'conv-006',
    user_id: 'user-003',
    title: '週末の予定について',
    mode: 'family',
    is_archived: false,
    created_at: '2026-03-31T20:00:00Z',
    updated_at: '2026-03-31T20:30:00Z',
  },
  {
    id: 'conv-007',
    user_id: 'user-001',
    title: '来期の予算配分',
    mode: 'judgment',
    is_archived: true,
    created_at: '2026-03-10T10:00:00Z',
    updated_at: '2026-03-10T12:00:00Z',
  },
]

// ===== Messages =====

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
  'conv-004': [
    {
      id: 'msg-007',
      conversation_id: 'conv-004',
      role: 'user',
      content:
        '開発チームを2つに分けようと思うんですが、どう分けるのが良いでしょうか。プロダクトAとBで分ける案と、フロントとバックで分ける案があります。',
      created_at: '2026-03-30T16:00:00Z',
    },
    {
      id: 'msg-008',
      conversation_id: 'conv-004',
      role: 'assistant',
      content:
        '結論から言うと、プロダクト軸で分けた方がいい。\n\n理由は3つ。\n- 各チームが自分のプロダクトに対してオーナーシップを持てる\n- 意思決定が早くなる\n- フロント・バック分離だと、チーム間のコミュニケーションコストが上がる\n\nただし条件がある。それぞれのチームに最低1人はフルスタックで動ける人がいること。そこが欠けると結局もう一方のチームに依存して、分けた意味がなくなる。\n\n今のメンバー構成はどうなってる？',
      created_at: '2026-03-30T16:05:00Z',
    },
  ],
  'conv-005': [
    {
      id: 'msg-009',
      conversation_id: 'conv-005',
      role: 'user',
      content: '本番サーバーが落ちました。ユーザーからも問い合わせが来ています。',
      created_at: '2026-03-29T03:00:00Z',
    },
    {
      id: 'msg-010',
      conversation_id: 'conv-005',
      role: 'assistant',
      content:
        'まず落ち着こう。やることを整理する。\n\n1. 今すぐ：ステータスページかSNSで「確認中」と一報を出す。沈黙が一番まずい\n2. 並行して：エラーログを確認。直近のデプロイがあったなら切り戻しを検討\n3. 問い合わせには定型文で「現在復旧対応中、改めてご連絡します」と返す\n\n原因調査は復旧してからでいい。今は止血だけに集中しよう。\n\nデプロイ履歴は確認できる？',
      created_at: '2026-03-29T03:02:00Z',
    },
  ],
  'conv-006': [
    {
      id: 'msg-011',
      conversation_id: 'conv-006',
      role: 'user',
      content: '来週の週末、みんなでどこか出かけない？',
      created_at: '2026-03-31T20:00:00Z',
    },
    {
      id: 'msg-012',
      conversation_id: 'conv-006',
      role: 'assistant',
      content:
        'いいね、出かけよう。天気が良ければ公園でピクニックとかどう？\n\n子どもたちも喜ぶと思うし、準備もそんなに大変じゃない。もし雨だったら水族館とか。\n\nどっちがいい？それとも他に行きたいところある？',
      created_at: '2026-03-31T20:03:00Z',
    },
  ],
  'conv-007': [],
}

// ===== Home page data =====

export const dummyActiveTopics = [
  {
    id: 'topic-001',
    title: '新規事業の優先順位整理',
    conversationId: 'conv-001',
    userName: '田中太郎',
    status: '継続中' as const,
    updatedAt: '2026-04-01T11:30:00Z',
  },
  {
    id: 'topic-002',
    title: '開発チーム体制変更の判断',
    conversationId: 'conv-004',
    userName: '鈴木一郎',
    status: '継続中' as const,
    updatedAt: '2026-03-30T17:00:00Z',
  },
  {
    id: 'topic-003',
    title: '採用面接の最終判断',
    conversationId: 'conv-002',
    userName: '田中太郎',
    status: '未処理' as const,
    updatedAt: '2026-03-28T15:00:00Z',
  },
]

export const dummyImportantNotes = [
  {
    id: 'note-001',
    content: '田中さんのB事業：来月からキャッシュが立つ見込み。フォローアップ必要。',
    createdAt: '2026-04-01T10:07:00Z',
  },
  {
    id: 'note-002',
    content: 'サーバー障害の根本原因調査がまだ。鈴木さんに確認。',
    createdAt: '2026-03-29T03:30:00Z',
  },
]

// ===== Context panel data =====

export const dummyRelationshipMemos: Record<string, {
  name: string
  category: string
  memo: string
  tone: string
  caution: string
}> = {
  'user-001': {
    name: '田中太郎',
    category: '事業責任者',
    memo: '新規事業立ち上げ担当。真面目で慎重な性格。判断に迷いやすいが、方向が決まれば動きが早い。',
    tone: 'やわらかく、伴走感を持って',
    caution: '詰問口調にしない。迷いを責めない。',
  },
  'user-002': {
    name: '鈴木一郎',
    category: '社内幹部',
    memo: '開発部門統括。論理的思考が強く、端的な会話を好む。構造で物を見る。',
    tone: '端的に、信頼前提で',
    caution: '曖昧な回答を避ける。全体最適を含める。',
  },
  'user-003': {
    name: '吉田恵子',
    category: '家族',
    memo: '家族。穏やかな性格。心配性な面がある。',
    tone: 'やわらかく、安心感を持って',
    caution: '冷たくしない。急がせない。不安を増やさない。',
  },
}

export const dummyRelationshipMemo = dummyRelationshipMemos['user-001']

export const dummyContextSummary = {
  recentTopics: ['新規事業の優先順位', '採用判断', 'クライアント対応'],
  currentIssue: 'リソース配分と優先順位の整理',
  approachNote: '実務に落とす形で、具体的な次の一手を示す',
}
