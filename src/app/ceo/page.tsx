import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Target,
  Briefcase,
  Layers,
  Users,
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
  Building,
  Sparkles,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getCeoMetrics } from '@/lib/actions/operations'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Executive Strategic Briefing | CEO Dashboard',
  description: 'Executive strategic briefing, four-pillar portfolio performance, and commercial growth trajectory for SOMYA INNOVATIONS leadership.',
  path: '/ceo',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function CeoPortalPage() {
  const metrics = await getCeoMetrics()

  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Executive Strategic Briefing"
        subtitle="Executive governance across AI & Automation, IT Infrastructure, Digital Solutions, and Technology Products."
      />

      {/* High-Level Executive Real KPIs */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-[10px] font-mono uppercase">
            <span>ACTIVE CLIENTS</span>
            <Briefcase className="w-3.5 h-3.5 text-[#A2AD7B]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#F1EBDD]">
            {metrics.activeClientsCount}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/50">
            {metrics.activeClientsCount === 0 ? 'No active accounts' : 'Commercial partnerships'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-[10px] font-mono uppercase">
            <span>ACTIVE PROJECTS</span>
            <Layers className="w-3.5 h-3.5 text-[#A2AD7B]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#F1EBDD]">
            {metrics.activeProjectsCount}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/50">
            {metrics.activeProjectsCount === 0 ? 'No active deliveries' : 'Contracted delivery work'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-[10px] font-mono uppercase">
            <span>QUALIFIED PIPELINE</span>
            <Target className="w-3.5 h-3.5 text-[#A2AD7B]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#F1EBDD]">
            {metrics.openOpportunitiesCount}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/50">
            {metrics.openOpportunitiesCount === 0 ? 'No open proposals' : 'In commercial negotiation'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-[10px] font-mono uppercase">
            <span>QUOTATIONS AWAITING</span>
            <FileText className="w-3.5 h-3.5 text-[#A2AD7B]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#F1EBDD]">
            {metrics.pendingQuotationsCount}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/50">
            {metrics.pendingQuotationsCount === 0 ? 'Zero pending' : 'Pending client signoff'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-[10px] font-mono uppercase">
            <span>WORKFORCE</span>
            <Users className="w-3.5 h-3.5 text-[#A2AD7B]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#F1EBDD]">
            {metrics.totalWorkforceCount}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/50">
            Internal engineers & operations
          </p>
        </div>
      </section>

      {/* Strategic Priorities Section */}
      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#A2AD7B]" />
          <h2 className="text-sm font-bold text-[#F1EBDD] tracking-tight uppercase font-mono">
            Company Strategic Priorities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1.5">
            <span className="text-[10px] font-mono text-[#A2AD7B] uppercase">Priority 01</span>
            <h4 className="font-semibold text-xs text-[#F1EBDD]">
              Enterprise AI Defect Vision Deployment
            </h4>
            <p className="text-[11px] text-[#F1EBDD]/60 leading-relaxed font-sans">
              Scaling edge computer vision systems across industrial manufacturing clients.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1.5">
            <span className="text-[10px] font-mono text-[#A2AD7B] uppercase">Priority 02</span>
            <h4 className="font-semibold text-xs text-[#F1EBDD]">
              Zero-Trust Campus Network Deployments
            </h4>
            <p className="text-[11px] text-[#F1EBDD]/60 leading-relaxed font-sans">
              Standardizing Layer 2/3 network segmentation and hardware appliances for regional enterprises.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1.5">
            <span className="text-[10px] font-mono text-[#A2AD7B] uppercase">Priority 03</span>
            <h4 className="font-semibold text-xs text-[#F1EBDD]">
              High-Trust Digital Application Delivery
            </h4>
            <p className="text-[11px] text-[#F1EBDD]/60 leading-relaxed font-sans">
              Executing production Next.js and secure API backends for client operations with zero downtime.
            </p>
          </div>
        </div>
      </section>

      {/* Active Projects Delivery Health */}
      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#F1EBDD] tracking-tight uppercase font-mono">
              Project Delivery Health
            </h2>
            <p className="text-xs text-[#F1EBDD]/60 font-sans">
              Active engineering contracts and client milestones
            </p>
          </div>
          <Link
            href="/admin/projects"
            className="text-xs font-mono text-[#E8DFCF] hover:underline"
          >
            View all projects &rarr;
          </Link>
        </div>

        {metrics.activeProjects.length === 0 ? (
          <p className="text-xs text-[#F1EBDD]/50 font-mono py-6 text-center">
            No active project engagements currently registered in the database.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.activeProjects.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-[#F1EBDD]">{p.name}</h4>
                  <span className="text-[10px] font-mono text-[#A2AD7B] uppercase">
                    {p.status}
                  </span>
                </div>
                <div className="w-full bg-white/[0.05] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#68704A] h-full rounded-full transition-all"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#F1EBDD]/50">
                  <span>Priority: {p.priority}</span>
                  <span>Progress: {p.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
