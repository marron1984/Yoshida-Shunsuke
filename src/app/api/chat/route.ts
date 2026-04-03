import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt } from '@/lib/persona-prompt'
import type { ResponseMode, RelationshipCategory } from '@/types'

// Dummy responses when ANTHROPIC_API_KEY is not set
const DUMMY_RESPONSES: Record<string, string> = {
  consultation:
    'なるほど、そういう状況か。\n\nまず整理しよう。いま一番大事なのは、全体を見て優先順位をつけることだと思う。全部同時にやろうとすると、どれも中途半端になるリスクがある。\n\nまず止血を優先して、そこから順番に取り組んでいこう。具体的にどこから手をつけるか、もう少し聞かせてもらっていい？',
  judgment:
    '結論から言うと、今の段階では見送った方がいいと思う。\n\n理由は2つ。まだ判断材料が揃っていないのと、急いで決めるメリットが薄い。\n\nただ、来週までに確認しておくべきことはある。それを整理して、改めて判断しよう。',
  reply:
    'こういう感じでどうだろう。\n\n「お世話になっております。ご連絡いただいた件、社内で確認のうえ、来週中にあらためてご回答させていただきます。恐れ入りますが、少々お待ちいただけますと幸いです。」\n\n相手との関係性を考えると、このくらいの温度感がちょうどいいと思う。',
  initial_response:
    'まず落ち着こう。今やることを3つだけ整理する。\n\n1. 状況を正確に把握する\n2. 関係者に一報を入れる\n3. 次のアクションを決める\n\n原因究明は後でいい。今は止血に集中しよう。',
  family:
    'そうだったんだ。それはしんどかったよな。\n\n急いで答えを出さなくても大丈夫だよ。まずはゆっくり考えよう。\n\nそのうえで、僕はこう思うんだけど——無理にどうこうする必要はなくて、自分のペースで進めればいいと思う。',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      messages,
      mode = 'consultation',
      relationship = 'business_leader',
      relationshipMemo,
      knowledgeContext,
    } = body as {
      messages: { role: 'user' | 'assistant'; content: string }[]
      mode?: ResponseMode
      relationship?: RelationshipCategory
      relationshipMemo?: string
      knowledgeContext?: string
    }

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'メッセージが必要です' },
        { status: 400 }
      )
    }

    const apiKey = process.env.ANTHROPIC_API_KEY

    if (!apiKey) {
      // No API key: return dummy response
      const content = DUMMY_RESPONSES[mode] ?? DUMMY_RESPONSES.consultation
      return NextResponse.json({ content })
    }

    // Build system prompt with persona, mode, and relationship
    const systemPrompt = buildSystemPrompt(mode, relationship, {
      relationshipMemo,
      knowledgeContext,
    })

    const client = new Anthropic({ apiKey })

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    })

    const content =
      response.content[0].type === 'text'
        ? response.content[0].text
        : ''

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: '応答の生成に失敗しました' },
      { status: 500 }
    )
  }
}
