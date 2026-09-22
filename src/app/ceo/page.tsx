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
  Compass,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Calendar,
  Shield,
  Building2,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getCeoMetrics } from '@/lib/actions/operations'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Executive Strategic Briefing | SOMYA CEO System',
  description: 'Executive decision-making briefing, strategic roadmap governance, and project delivery health for SOMYA INNOVATIONS leadership.',
  path: '/ceo',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

// Strategic Priorities Definition for Executive Governance
const STRATEGIC_PRIORITIES = [
  {
    priority: 'Enterprise AI Inspection Deployment',
    owner: 'Technology & AI Team',
    status: 'In Progress',
    statusColor: 'bg-[#68704A]/25 text-[#E8DFCF] border-[#68704A]/40',
    deadline: 'Q4 2026',
    impact: 'High Margin Industrial Expansion',
  },
  {
    priority: 'Zero-Trust Campus Network Deliveries',
    owner: 'Infrastructure Practice',
    status: 'On Track',
    statusColor: 'bg-[#68704A]/25 text-[#E8DFCF] border-[#68704A]/40',
    deadline: 'Q4 2026',
    impact: 'Regional Enterprise Penetration',
  },
  {
    priority: 'High-Performance SaaS Platform Engine',
    owner: 'Digital Engineering',
    status: 'Planning',
    statusColor: 'bg-white/[0.05] text-[#F1EBDD]/60 border-white/10',
    deadline: 'Q1 2027',
    impact: 'Recurring Software Subscriptions',
  },
]

export default async function CeoPortalPage() {
  const metrics = await getCeoMetrics()

  // Evaluate Project Health dynamically from active projects
  const healthCounts = {
    healthy: 0,
    atRisk: 0,
    delayed: 0,
    critical: 0,
  }

  metrics.activeProjects.forEach((p) => {
    if (p.priority === 'critical') healthCounts.critical++
    else if (p.priority === 'high') healthCounts.atRisk++
    else if (p.status === 'on_hold') healthCounts.delayed++
    else healthCounts.healthy++
  })

  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Executive Strategic Briefing"
        subtitle="Executive governance across strategic initiatives, business portfolio, and project delivery health."
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/ceo/strategy"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#F1EBDD] text-xs font-mono border border-[#2A2A26] transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#A2AD7B]" />
              <span>Strategic Roadmap</span>
            </Link>
            <Link
              href="/ceo/reports"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#641F2A] hover:bg-[#852E3B] text-[#F1EBDD] text-xs font-semibold shadow-sm transition-colors"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Boardroom Report</span>
            </Link>
          </div>
        }
      />

      {/* Large Executive KPI Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-xs font-mono uppercase">
            <span>Enterprise Clients</span>
            <Briefcase className="w-4 h-4 text-[#A2AD7B]" />
          </div>
          <div className="text-4xl font-bold font-serif text-[#F1EBDD]">
            {metrics.activeClientsCount}
          </div>
          <p className="text-xs font-mono text-[#F1EBDD]/50">
            {metrics.activeClientsCount === 0 ? 'No active accounts' : 'Contracted client partners'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-xs font-mono uppercase">
            <span>Contracted Deliveries</span>
            <Layers className="w-4 h-4 text-[#A2AD7B]" />
          </div>
          <div className="text-4xl font-bold font-serif text-[#F1EBDD]">
            {metrics.activeProjectsCount}
          </div>
          <p className="text-xs font-mono text-[#F1EBDD]/50">
            {metrics.activeProjectsCount === 0 ? 'Zero active deliverables' : 'Active engagement scope'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-xs font-mono uppercase">
            <span>Business Pipeline</span>
            <Target className="w-4 h-4 text-[#A2AD7B]" />
          </div>
          <div className="text-4xl font-bold font-serif text-[#F1EBDD]">
            {metrics.openOpportunitiesCount}
          </div>
          <p className="text-xs font-mono text-[#F1EBDD]/50">
            {metrics.openOpportunitiesCount === 0 ? 'No open proposals' : 'Qualified commercial briefs'}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-xs font-mono uppercase">
            <span>Pending Quotations</span>
            <FileText className="w-4 h-4 text-[#A2AD7B]" />
          </div>
          <div className="text-4xl font-bold font-serif text-[#F1EBDD]">
            {metrics.pendingQuotationsCount}
          </div>
          <p className="text-xs font-mono text-[#F1EBDD]/50">
            {metrics.pendingQuotationsCount === 0 ? 'Zero awaiting approval' : 'Awaiting client signoff'}
          </p>
        </div>
      </section>

      {/* Project Health Categorization (Executive Summary) */}
      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#A2AD7B]" />
            <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
              Portfolio Delivery Health
            </h3>
          </div>
          <Link
            href="/ceo/projects"
            className="text-xs font-mono text-[#E8DFCF] hover:underline"
          >
            All Projects &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
            <span className="text-[10px] font-mono text-[#A2AD7B] uppercase">Healthy Delivery</span>
            <div className="text-2xl font-bold font-serif text-[#F1EBDD]">{healthCounts.healthy}</div>
            <p className="text-[11px] text-[#F1EBDD]/50">On schedule & within scope</p>
          </div>

          <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
            <span className="text-[10px] font-mono text-amber-300 uppercase">At Risk</span>
            <div className="text-2xl font-bold font-serif text-amber-300">{healthCounts.atRisk}</div>
            <p className="text-[11px] text-[#F1EBDD]/50">Requires executive monitoring</p>
          </div>

          <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
            <span className="text-[10px] font-mono text-[#E8DFCF]/70 uppercase">Delayed / On Hold</span>
            <div className="text-2xl font-bold font-serif text-[#E8DFCF]">{healthCounts.delayed}</div>
            <p className="text-[11px] text-[#F1EBDD]/50">Pending client dependency</p>
          </div>

          <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
            <span className="text-[10px] font-mono text-red-400 uppercase">Critical Blockers</span>
            <div className="text-2xl font-bold font-serif text-red-400">{healthCounts.critical}</div>
            <p className="text-[11px] text-[#F1EBDD]/50">Escalation needed</p>
          </div>
        </div>
      </section>

      {/* Strategic Priorities Matrix */}
      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#A2AD7B]" />
            <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
              Corporate Strategic Priorities
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#F1EBDD]/40 uppercase">Executive Roadmap</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1B1B18] text-[#F1EBDD]/50 font-mono text-[10px] uppercase border-b border-[#2A2A26]">
              <tr>
                <th className="px-4 py-3">Initiative</th>
                <th className="px-4 py-3">Responsible Practice</th>
                <th className="px-4 py-3">Strategic Impact</th>
                <th className="px-4 py-3">Target Timeline</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
              {STRATEGIC_PRIORITIES.map((sp) => (
                <tr key={sp.priority} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3.5 font-semibold text-[#F1EBDD]">
                    {sp.priority}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[#E8DFCF]">
                    {sp.owner}
                  </td>
                  <td className="px-4 py-3.5 text-[#F1EBDD]/70 font-sans">
                    {sp.impact}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[#A2AD7B]">
                    {sp.deadline}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${sp.statusColor}`}>
                      {sp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Team Distribution & Headcount Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#A2AD7B]" />
              <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
                Workforce Headcount Overview
              </h3>
            </div>
            <Link
              href="/ceo/team"
              className="text-xs font-mono text-[#E8DFCF] hover:underline"
            >
              Team details &rarr;
            </Link>
          </div>

          <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold font-serif text-[#F1EBDD]">
                {metrics.totalWorkforceCount}
              </div>
              <div className="text-xs font-mono text-[#F1EBDD]/50 mt-1">
                Active Organization Staff & Contractors
              </div>
            </div>
            <Link
              href="/admin/attendance"
              className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-[#E8DFCF] border border-[#2A2A26] transition-colors"
            >
              Attendance Hub &rarr;
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#A2AD7B]" />
            <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
              Practice Areas Governance
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
              <span className="text-[10px] font-mono text-[#A2AD7B]">Pillar 01</span>
              <div className="text-xs font-semibold text-[#F1EBDD]">AI & Automation</div>
              <p className="text-[10px] text-[#F1EBDD]/40">Active</p>
            </div>

            <div className="p-3 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
              <span className="text-[10px] font-mono text-[#A2AD7B]">Pillar 02</span>
              <div className="text-xs font-semibold text-[#F1EBDD]">IT Infrastructure</div>
              <p className="text-[10px] text-[#F1EBDD]/40">Active</p>
            </div>

            <div className="p-3 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
              <span className="text-[10px] font-mono text-[#A2AD7B]">Pillar 03</span>
              <div className="text-xs font-semibold text-[#F1EBDD]">Digital Solutions</div>
              <p className="text-[10px] text-[#F1EBDD]/40">Active</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
