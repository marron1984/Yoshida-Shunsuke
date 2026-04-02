'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/useAuthStore'
import { dummyUser } from '@/lib/dummy-data'

export default function LoginPage() {
  const [email, setEmail] = useState('')
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

      // Set auth cookie for middleware
      document.cookie = 'yoshida-os-auth=true; path=/; max-age=86400'

      // Set user in Zustand store
      setUser(dummyUser)

      // Navigate to home
      router.push('/home')
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
            {isLoading ? 'ログイン中...' : 'ログイン'}
          </Button>

          <p className="text-center text-xs text-navy-500">
            招待されたメールアドレスのみ使用可能です
          </p>
        </form>
      </div>
    </div>
  )
}
