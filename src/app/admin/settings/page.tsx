import React from 'react'
import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import { requireRole } from '@/lib/auth/guards'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import { SettingsClient } from '@/components/management/SettingsClient'
import { getCompanySettings } from '@/lib/actions/settings'

export const metadata: Metadata = createMetadata({
  title: 'Operations & Business Settings | Admin Portal',
  description: 'Manage operational preferences, business contact info, and system defaults.',
  path: '/admin/settings',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

interface AdminSettingsPageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function AdminSettingsPage({ searchParams }: AdminSettingsPageProps) {
  const { tab } = await searchParams
  const context = await requireRole('admin')
  const companySettings = await getCompanySettings()

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Operations & Business Settings"
        subtitle="Manage operational preferences, business profile, and workforce notifications."
        role="admin"
        userEmail={context.user.email}
      />

      <SettingsClient
        initialTab={tab || 'company'}
        portalRole="admin"
        userProfile={context.profile}
        userRoles={context.roles}
        effectivePermissions={context.permissions}
        companySettings={companySettings}
      />
    </div>
  )
}
