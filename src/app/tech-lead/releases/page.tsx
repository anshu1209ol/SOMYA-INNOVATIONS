import React from 'react'
import type { Metadata } from 'next'
import { Package, CheckCircle2, Calendar, Tag, Plus } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getReleases } from '@/lib/actions/engineering'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import { EmptyState } from '@/components/management/EmptyState'

export const metadata: Metadata = createMetadata({
  title: 'Software Releases & Deployments | Tech Lead',
  description: 'Release orchestration, deployment version history, and patch classification.',
  path: '/tech-lead/releases',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function ReleasesPage() {
  const releases = await getReleases()

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Software Releases & Deployment Versions"
        subtitle="Version tracking, release cadence, and deployment changelogs across services."
      />

      {releases.length === 0 ? (
        <EmptyState
          title="No Releases Logged"
          description="Software deployment releases will appear here as build tags are published."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {releases.map((rel) => (
            <div
              key={rel.id}
              className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#68704A]/25 border border-[#68704A]/40 flex items-center justify-center text-[#E8DFCF] font-mono font-bold text-sm">
                    {rel.version}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#F1EBDD] tracking-tight">
                      {rel.release_name}
                    </h3>
                    <p className="text-[10px] font-mono text-[#F1EBDD]/50">
                      Target: {rel.release_date || 'Continuous Deployment'}
                    </p>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-white/[0.04] text-[10px] font-mono uppercase text-[#A2AD7B] border border-white/[0.08]">
                  {rel.status}
                </span>
              </div>

              {rel.description && (
                <p className="text-xs text-[#F1EBDD]/70 leading-relaxed font-sans">
                  {rel.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
