import React from 'react'
import type { Metadata } from 'next'
import { createMetadata } from '@/lib/seo'
import { requireRole } from '@/lib/auth/guards'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import { SettingsClient } from '@/components/management/SettingsClient'
import { getCompanySettings } from '@/lib/actions/settings'

export const metadata: Metadata = createMetadata({
  title: 'Executive Settings & Strategy Preferences | CEO Portal',
  description: 'Manage executive preferences, company parameters, and strategic notification telemetry.',
  path: '/ceo/settings',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

interface CeoSettingsPageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function CeoSettingsPage({ searchParams }: CeoSettingsPageProps) {
  const { tab } = await searchParams
  const context = await requireRole('ceo')
  const companySettings = await getCompanySettings()

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Executive Settings & Strategic Preferences"
        subtitle="Manage company information, contact details, and executive notification channels."
        role="ceo"
        userEmail={context.user.email}
      />

      <SettingsClient
        initialTab={tab || 'company'}
        portalRole="ceo"
        userProfile={context.profile}
        userRoles={context.roles}
        effectivePermissions={context.permissions}
        companySettings={companySettings}
      />
    </div>
  )
}
