import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createMetadata } from '@/lib/seo'
import { requireAuth } from '@/lib/auth/guards'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import { SettingsClient } from '@/components/management/SettingsClient'
import { getCompanySettings } from '@/lib/actions/settings'

export const metadata: Metadata = createMetadata({
  title: 'Account & Platform Settings | SOMYA Management',
  description: 'Enterprise configuration, notification preferences, sessions, and system parameters.',
  path: '/settings',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

interface SettingsPageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const { tab } = await searchParams
  const context = await requireAuth()

  if (!context) {
    redirect('/login')
  }

  const companySettings = await getCompanySettings()

  return (
    <div className="min-h-screen bg-[#0D0D0B] text-[#F1EBDD] p-6 sm:p-8 lg:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-[#F1EBDD]/60">
            <Link
              href={
                context.roles.includes('tech_lead')
                  ? '/tech-lead'
                  : context.roles.includes('ceo')
                  ? '/ceo'
                  : '/admin'
              }
              className="hover:text-[#F1EBDD] transition-colors"
            >
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-[#F1EBDD] font-semibold">Settings</span>
          </div>

          <Link
            href="/profile"
            className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-[#F1EBDD]/80 border border-[#2A2A26] transition-colors"
          >
            View My Profile →
          </Link>
        </div>

        <ManagementHeader
          title="Account & System Settings"
          subtitle="Configure profile credentials, security sessions, notification preferences, and platform architecture."
          role={context.roles[0] || 'admin'}
          userEmail={context.user.email}
        />

        <SettingsClient
          initialTab={tab || 'profile'}
          portalRole={context.roles[0] || 'admin'}
          userProfile={context.profile}
          userRoles={context.roles}
          effectivePermissions={context.permissions}
          companySettings={companySettings}
        />
      </div>
    </div>
  )
}
