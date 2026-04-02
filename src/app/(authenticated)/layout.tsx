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
    // Check if auth cookie exists
    const hasAuthCookie = document.cookie
      .split('; ')
      .some((c) => c.startsWith('yoshida-os-auth='))

    if (!user && hasAuthCookie) {
      // Restore user from cookie (dummy for now)
      setUser(dummyUser)
    } else if (!user && !hasAuthCookie) {
      router.push('/login')
    }
  }, [user, setUser, router])

  if (!user) return null

  return (
    <div className="flex h-screen bg-navy-950">
      <AppSidebar />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
