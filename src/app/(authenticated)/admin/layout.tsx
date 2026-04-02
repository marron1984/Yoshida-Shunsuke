import { AdminSidebar } from '@/components/layout/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full">
      <AdminSidebar />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
