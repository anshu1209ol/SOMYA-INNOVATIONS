import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BarChart3,
  TrendingUp,
  Clock,
  Briefcase,
  Layers,
  ArrowRight,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getOperationsMetrics } from '@/lib/actions/operations'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Operational Reporting & Analytics | SOMYA Admin System',
  description: 'Operations reporting, commercial throughput, and workforce utilization metrics.',
  path: '/admin/reports',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function AdminReportsPage() {
  const metrics = await getOperationsMetrics()

  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Operational Analytics & Reports"
        subtitle="Operations reporting, commercial throughput, and workforce utilization metrics."
      />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-3">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-xs font-mono uppercase">
            <span>Pipeline Throughput</span>
            <TrendingUp className="w-4 h-4 text-[#A2AD7B]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#F1EBDD]">
            {metrics.activeLeadsCount + metrics.pendingQuotationsCount}
          </div>
          <p className="text-xs text-[#F1EBDD]/50 font-sans">
            Active commercial opportunities across enquiries and quotations.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-3">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-xs font-mono uppercase">
            <span>Delivery Load</span>
            <Layers className="w-4 h-4 text-[#A2AD7B]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#F1EBDD]">
            {metrics.activeProjectsCount}
          </div>
          <p className="text-xs text-[#F1EBDD]/50 font-sans">
            Active contracted project deliveries under management.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-3">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-xs font-mono uppercase">
            <span>Workforce Present</span>
            <Clock className="w-4 h-4 text-[#A2AD7B]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#F1EBDD]">
            {metrics.attendanceToday.present} / {metrics.attendanceToday.total}
          </div>
          <p className="text-xs text-[#F1EBDD]/50 font-sans">
            Staff members verified present today via biometric punch.
          </p>
        </div>
      </section>

      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
          Operational Summary
        </h3>
        <p className="text-xs text-[#F1EBDD]/70 leading-relaxed font-sans max-w-2xl">
          All operational reports are computed dynamically from live database records without simulated projections. Review specific domains in detail using the sidebar navigation.
        </p>
      </section>
    </div>
  )
}
