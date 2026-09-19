import React from 'react'
import { requireRole } from '@/lib/auth/guards'
import { ManagementSidebar } from '@/components/management/ManagementSidebar'

export const dynamic = 'force-dynamic'

export default async function TechLeadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const context = await requireRole('tech_lead')

  return (
    <div className="flex min-h-screen bg-[#0D0D0B] text-[#F1EBDD]">
      <ManagementSidebar
        portal="tech-lead"
        userEmail={context.user.email}
        userRole={context.roles[0] || 'tech_lead'}
      />
      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
