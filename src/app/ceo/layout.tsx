import React from 'react'
import { requireRole } from '@/lib/auth/guards'
import { ManagementSidebar } from '@/components/management/ManagementSidebar'

export const dynamic = 'force-dynamic'

export default async function CeoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const context = await requireRole('ceo')

  return (
    <div className="flex min-h-screen bg-[#0D0D0B] text-[#F1EBDD]">
      <ManagementSidebar
        portal="ceo"
        userEmail={context.user.email}
        userRole={context.roles[0] || 'ceo'}
      />
      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
