'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'
import { AppSidebar } from '@/components/layout/AppSidebar'
import { dummyUser } from '@/lib/dummy-data'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, setUser } = useAuthStore()

  useEffect(() => {
    // Phase 1-2: auto-login with dummy user if no user set
    // Will be replaced with Supabase session check
    if (!user) {
      setUser(dummyUser)
    }
  }, [user, setUser])

  if (!user) return null

  return (
    <div className="flex h-screen bg-navy-950">
      <AppSidebar />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
