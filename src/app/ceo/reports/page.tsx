import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BarChart3, TrendingUp, Shield, Target, FileText } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getCeoMetrics } from '@/lib/actions/operations'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Executive Boardroom Reports | SOMYA CEO System',
  description: 'Executive reporting, company commercial health, and strategic growth KPIs.',
  path: '/ceo/reports',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function CeoReportsPage() {
  const metrics = await getCeoMetrics()

  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Executive Boardroom Reports"
        subtitle="High-level corporate summaries, active client contract values, and quarterly portfolio delivery."
      />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#F1EBDD]/60 uppercase">
            <span>Client Portfolio</span>
            <BarChart3 className="w-4 h-4 text-[#A2AD7B]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#F1EBDD]">{metrics.activeClientsCount}</div>
          <p className="text-xs text-[#F1EBDD]/50 font-sans">
            Contracted active enterprise clients in operational delivery.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#F1EBDD]/60 uppercase">
            <span>Project Engagements</span>
            <TrendingUp className="w-4 h-4 text-[#A2AD7B]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#F1EBDD]">{metrics.activeProjectsCount}</div>
          <p className="text-xs text-[#F1EBDD]/50 font-sans">
            Active contracted project deliveries under leadership supervision.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#F1EBDD]/60 uppercase">
            <span>Pipeline Deals</span>
            <Target className="w-4 h-4 text-[#A2AD7B]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#F1EBDD]">{metrics.openOpportunitiesCount}</div>
          <p className="text-xs text-[#F1EBDD]/50 font-sans">
            High-intent commercial briefs currently in qualification stage.
          </p>
        </div>
      </section>

      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-3">
        <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
          Governance Note
        </h3>
        <p className="text-xs text-[#F1EBDD]/70 font-sans leading-relaxed max-w-2xl">
          Executive summaries reflect direct database aggregates across client accounts, active delivery projects, and commercial quotations. All figures are live and immutable without projection modeling.
        </p>
      </section>
    </div>
  )
}
