import React from 'react'
import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import { requireRole } from '@/lib/auth/guards'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import { SettingsClient } from '@/components/management/SettingsClient'
import { getCompanySettings } from '@/lib/actions/settings'

export const metadata: Metadata = createMetadata({
  title: 'System Architecture & Technical Settings | Tech Lead',
  description: 'Manage authentication, RBAC permissions, storage buckets, and security settings.',
  path: '/tech-lead/settings',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

interface TechLeadSettingsPageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function TechLeadSettingsPage({ searchParams }: TechLeadSettingsPageProps) {
  const { tab } = await searchParams
  const context = await requireRole('tech_lead')
  const companySettings = await getCompanySettings()

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="System Architecture & Technical Settings"
        subtitle="Configure authentication engine, RBAC permission catalog, storage security, and audit ledger parameters."
        role="tech_lead"
        userEmail={context.user.email}
      />

      <SettingsClient
        initialTab={tab || 'system'}
        portalRole="tech_lead"
        userProfile={context.profile}
        userRoles={context.roles}
        effectivePermissions={context.permissions}
        companySettings={companySettings}
      />
    </div>
  )
}
