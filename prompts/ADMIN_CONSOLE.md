# ADMIN CONSOLE - 管理画面設計

## 概要

管理画面は、吉田俊輔本人（管理者）がOSの人格・記憶・ユーザーを管理するためのインターフェースです。
静かな執務室のようなUIで、必要な操作を直感的に行えることを目指します。

---

## 管理画面の構成

### 1. ダッシュボード（/admin）
- 最近の会話アクティビティ
- 新規ナレッジ候補の通知
- システム状態の概要

### 2. 招待ユーザー管理（/admin/users）
- ユーザー一覧
- 招待コードの発行
- 関係性カテゴリの設定
- 個別メモの編集
- ユーザーの有効化/無効化

### 3. ナレッジ管理（/admin/knowledge）

#### ナレッジ一覧（/admin/knowledge）
- 全ナレッジの一覧表示
- カテゴリ・タグでのフィルタ
- 検索機能
- 重要度でのソート

#### ナレッジ登録（/admin/knowledge/new）
- タイトル・本文の入力
- カテゴリ選択
- タグ付け
- 関連人物の設定
- 重要度の設定
- プライバシー設定（公開範囲）

#### ナレッジ詳細・編集（/admin/knowledge/:id）
- ナレッジの閲覧・編集
- 変更履歴の確認
- 類似ナレッジの表示
- 統合候補の表示

### 4. 人格設定（/admin/persona）
- 基本トーンの調整
- 禁止パターンの管理
- 口調サンプルの確認・追加

### 5. 相手別接し方設定（/admin/persona/relationships）
- 関係性カテゴリごとのデフォルト設定
- 個別ユーザーへのカスタム設定
- トーンのプレビュー

### 6. 会話ログ閲覧（/admin/conversations）
- ユーザーごとの会話履歴
- 検索・フィルタ
- 応答品質の確認

### 7. 変更履歴（/admin/history）
- ナレッジの変更履歴
- 人格設定の変更履歴
- システム設定の変更履歴

---

## UI設計思想

### ビジュアル
- ダークトーンを基調
- 余白を十分に取る
- フォントはシンプルで読みやすいもの
- 装飾は最小限
- 静かで落ち着いた印象

### インタラクション
- 操作は直感的に
- 確認ダイアログは必要最小限
- 破壊的操作（削除など）のみ確認を求める
- レスポンシブ対応

### レイアウト
- サイドバー＋メインコンテンツの2カラム構成
- サイドバーはナビゲーション
- メインコンテンツは広く使う

---

## 権限管理

### 管理者（admin）
- 全機能へのフルアクセス
- ナレッジのCRUD
- ユーザー管理
- 人格設定の変更
- 会話ログの閲覧

### 一般ユーザー（user）
- チャット画面のみアクセス可能
- 管理画面にはアクセス不可
- 自身の会話履歴のみ参照可能

---

## データベース設計（Supabase）

### テーブル概要

#### users
```sql
- id: uuid (PK)
- invite_code: text (UNIQUE)
- display_name: text
- relationship_category: text
- relationship_memo: text
- is_active: boolean
- created_at: timestamptz
- updated_at: timestamptz
```

#### knowledge
```sql
- id: uuid (PK)
- title: text
- content: text
- category: text
- tags: text[]
- source: text
- related_persons: text[]
- emotional_context: text
- importance: integer
- is_private: boolean
- visible_to: uuid[]
- embedding: vector
- created_at: timestamptz
- updated_at: timestamptz
```

#### conversations
```sql
- id: uuid (PK)
- user_id: uuid (FK -> users.id)
- created_at: timestamptz
- updated_at: timestamptz
```

#### messages
```sql
- id: uuid (PK)
- conversation_id: uuid (FK -> conversations.id)
- role: text ('user' | 'assistant')
- content: text
- created_at: timestamptz
```

#### knowledge_history
```sql
- id: uuid (PK)
- knowledge_id: uuid (FK -> knowledge.id)
- changed_by: uuid (FK -> users.id)
- change_type: text ('create' | 'update' | 'delete')
- previous_content: jsonb
- new_content: jsonb
- created_at: timestamptz
```

#### persona_settings
```sql
- id: uuid (PK)
- setting_key: text
- setting_value: jsonb
- updated_by: uuid (FK -> users.id)
- created_at: timestamptz
- updated_at: timestamptz
```

---

## API設計概要

### ナレッジ関連
- `GET /api/knowledge` — 一覧取得
- `POST /api/knowledge` — 新規登録
- `GET /api/knowledge/:id` — 詳細取得
- `PUT /api/knowledge/:id` — 更新
- `DELETE /api/knowledge/:id` — 削除
- `GET /api/knowledge/:id/history` — 変更履歴
- `GET /api/knowledge/:id/similar` — 類似ナレッジ

### ユーザー関連
- `GET /api/users` — 一覧取得
- `POST /api/users/invite` — 招待コード発行
- `PUT /api/users/:id` — 更新
- `DELETE /api/users/:id` — 無効化

### 会話関連
- `GET /api/conversations` — 一覧取得
- `GET /api/conversations/:id` — 詳細取得
- `POST /api/conversations/:id/messages` — メッセージ送信

### 人格設定関連
- `GET /api/persona` — 設定取得
- `PUT /api/persona` — 設定更新
- `GET /api/persona/relationships` — 関係性設定一覧
- `PUT /api/persona/relationships/:category` — 関係性設定更新
