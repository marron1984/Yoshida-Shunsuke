# Yoshida Shunsuke OS - Prompt Load Order

## 目的
このディレクトリは、Claude Code に Yoshida Shunsuke OS の思想・人格・記憶・応答・管理画面設計を段階的に読み込ませるためのプロンプト群をまとめたものです。

このプロダクトは単なるAIチャットではなく、吉田俊輔の判断様式・対人スタンス・話し方・人生観を継承した「分身OS」です。

---

## 推奨読み込み順

1. `MASTER_PROMPT.md`
2. `PERSONA_CORE.md`
3. `RELATIONSHIP_PERSONA_EXTENSION.md`
4. `MEMORY_INGESTION.md`
5. `RESPONSE_ENGINE.md`
6. `ADMIN_CONSOLE.md`
7. `CLAUDE_EXECUTION_TEMPLATE.md` — 実行手順テンプレート

---

## Claude Codeへの基本投入手順

### Step 1
最初に `MASTER_PROMPT.md` を読み込ませ、プロダクト全体像を理解させる。

### Step 2
`PERSONA_CORE.md` を読み込ませ、人格の中核を固定する。

### Step 3
`RELATIONSHIP_PERSONA_EXTENSION.md` を読み込ませ、相手別の温度感・距離感を固定する。

### Step 4
`MEMORY_INGESTION.md` を読み込ませ、LINEや過去会話の構造化ルールを固定する。

### Step 5
`RESPONSE_ENGINE.md` を読み込ませ、実際の返答生成ルールを固定する。

### Step 6
`ADMIN_CONSOLE.md` を読み込ませ、管理画面の思想と実装要件を固定する。

---

## 実装開始時の推奨依頼

以下の順で進める。

1. ディレクトリ構成の提案
2. 画面一覧とルーティング構成
3. 型定義
4. Zustand状態管理設計
5. Supabase前提のDB設計
6. Phase 1 実装
7. Phase 2 実装
8. Phase 3 実装
9. Phase 4 実装
10. Phase 5 実装

---

## Phase構成

### Phase 1
- 招待ログイン画面
- チャット画面
- 会話保存の土台
- 基本レイアウト

### Phase 2
- ホーム画面
- 右ペイン
- 会話履歴画面

### Phase 3
- 管理画面トップ
- 招待ユーザー管理
- ナレッジ一覧
- ナレッジ登録

### Phase 4
- ナレッジ詳細・編集
- 人格設定
- 相手別接し方設定

### Phase 5
- 会話ログ閲覧
- 変更履歴
- 類似ナレッジ表示
- 統合候補表示

---

## 実装時の最重要リマインド

- これはAIチャットではない
- これは吉田俊輔の分身OSである
- 人への接し方、判断基準、話し方、人生観の順で再現する
- AI感を出さない
- 静かな執務室のようなUXを守る
- 家族には冷たくしない
- 感情的断絶を煽らない
- 他人の秘密を横断参照しない
