import React from 'react'
import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth/guards'
import { AdminSidebar } from '@/components/management/AdminSidebar'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const context = await requireAuth()

  const isAdmin = context.roles.includes('admin')
  const isTechLead = context.roles.includes('tech_lead')

  if (!isAdmin && !isTechLead) {
    redirect('/unauthorized')
  }

  return (
    <div className="flex min-h-screen bg-[#0D0D0B] text-[#F1EBDD]">
      <AdminSidebar
        userEmail={context.user.email}
        userRole={context.roles[0] || 'admin'}
      />
      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
