'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/useAuthStore'
import { dummyUser } from '@/lib/dummy-data'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const setUser = useAuthStore((s) => s.setUser)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('メールアドレスを入力してください')
      return
    }

    setIsLoading(true)

    try {
      // TODO: Replace with Supabase magic link
      // const { error } = await supabase.auth.signInWithOtp({
      //   email,
      //   options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      // })
      // if (error) throw error

      // Phase 1: dummy login — will be replaced with Supabase OTP
      setUser(dummyUser)
      router.push('/chat')
    } catch {
      setError('ログインリンクの送信に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm px-6">
        <div className="mb-12 text-center">
          <h1 className="text-2xl font-light tracking-wider text-slate-200">
            Yoshida Shunsuke OS
          </h1>
          <p className="mt-3 text-sm text-navy-400">
            招待制・完全クローズド
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-navy-400"
              >
                招待メールアドレス
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="border-navy-700 bg-navy-900 text-slate-200 placeholder:text-navy-500 focus-visible:ring-navy-500"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-navy-700 text-slate-200 hover:bg-navy-600 disabled:opacity-40"
            >
              {isLoading ? '送信中...' : 'ログインリンクを送信'}
            </Button>

            <p className="text-center text-xs text-navy-500">
              招待されたメールアドレスのみ使用可能です
            </p>
          </form>
        ) : (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-navy-700 bg-navy-900">
                <svg
                  className="h-5 w-5 text-navy-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-sm text-slate-300">
              ログインリンクを送信しました
            </p>
            <p className="mt-2 text-xs text-navy-400">
              {email} をご確認ください
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
