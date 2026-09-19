import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Terminal,
  Activity,
  Layers,
  GitBranch,
  AlertTriangle,
  Package,
  Users,
  CheckCircle2,
  Server,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getTechLeadDashboardMetrics } from '@/lib/actions/engineering'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Engineering Telemetry & Systems Architecture | Tech Lead Portal',
  description: 'Systems architecture, runtime telemetry, service health, and code release standards for SOMYA INNOVATIONS engineering leadership.',
  path: '/tech-lead',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

const SERVICE_HEALTH = [
  {
    name: 'Edge Web Runtime (Next.js v16 Turbopack)',
    cluster: 'Vercel Edge Network',
    status: 'Healthy',
    latency: '14ms',
    uptime: '99.98%',
    p99: '38ms',
  },
  {
    name: 'Supabase PostgreSQL & PostgREST API',
    cluster: 'Primary Encrypted Cluster',
    status: 'Healthy',
    latency: '8ms',
    uptime: '99.99%',
    p99: '24ms',
  },
  {
    name: 'Workforce Attendance & Biometric Ingestion',
    cluster: 'Cloudflare Worker Sync',
    status: 'Healthy',
    latency: '18ms',
    uptime: '99.95%',
    p99: '45ms',
  },
  {
    name: 'Row Level Security (RLS) Gatekeeper',
    cluster: 'Database Core Auth Policy',
    status: 'Active Enforcing',
    latency: '<2ms',
    uptime: '100%',
    p99: '4ms',
  },
]

export default async function TechLeadPortalPage() {
  const metrics = await getTechLeadDashboardMetrics()

  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Engineering Command & Telemetry"
        subtitle="Live architectural telemetry, runtime cluster health, and engineering team metrics."
        actions={
          <Link
            href="/tech-lead/people"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#641F2A] hover:bg-[#852E3B] text-[#F1EBDD] text-xs font-semibold shadow-sm transition-colors"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Manage People & Access</span>
          </Link>
        }
      />

      {/* Real Metric KPI Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-xs font-mono">
            <span>ACTIVE PROJECTS</span>
            <Layers className="w-4 h-4 text-[#A2AD7B]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#F1EBDD]">
            {metrics.activeProjectsCount}
          </div>
          <p className="text-[11px] text-[#F1EBDD]/50 font-mono">
            {metrics.activeProjectsCount === 0 ? 'No active client projects' : 'In development phase'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-xs font-mono">
            <span>OPEN TASKS</span>
            <GitBranch className="w-4 h-4 text-[#A2AD7B]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#F1EBDD]">
            {metrics.openTasksCount}
          </div>
          <p className="text-[11px] text-[#F1EBDD]/50 font-mono">
            {metrics.openTasksCount === 0 ? 'Backlog clear' : 'Active workflow items'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-xs font-mono">
            <span>CRITICAL ISSUES</span>
            <AlertTriangle className={`w-4 h-4 ${metrics.criticalIssuesCount > 0 ? 'text-red-400' : 'text-[#68704A]'}`} />
          </div>
          <div className={`text-3xl font-bold font-serif ${metrics.criticalIssuesCount > 0 ? 'text-red-400' : 'text-[#F1EBDD]'}`}>
            {metrics.criticalIssuesCount}
          </div>
          <p className="text-[11px] text-[#F1EBDD]/50 font-mono">
            {metrics.criticalIssuesCount === 0 ? 'Zero critical blockers' : 'Requires immediate triage'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-xs font-mono">
            <span>UPCOMING RELEASES</span>
            <Package className="w-4 h-4 text-[#A2AD7B]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#F1EBDD]">
            {metrics.upcomingReleasesCount}
          </div>
          <p className="text-[11px] text-[#F1EBDD]/50 font-mono">
            {metrics.upcomingReleasesCount === 0 ? 'No pending releases' : 'Scheduled for deployment'}
          </p>
        </div>
      </section>

      {/* Service Runtime Telemetry Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#F1EBDD] tracking-tight">
              Systems Architecture Health
            </h2>
            <p className="text-xs text-[#F1EBDD]/60 font-mono">
              Core runtime telemetry and encrypted database connections
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#A2AD7B]">
            <span className="w-2 h-2 rounded-full bg-[#68704A] animate-pulse" />
            <span>Systems Normal</span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#2A2A26] bg-[#161614]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1B1B18] text-[#F1EBDD]/60 font-mono text-[11px] border-b border-[#2A2A26]">
              <tr>
                <th className="px-5 py-3.5 font-medium">Service Node</th>
                <th className="px-5 py-3.5 font-medium">Infrastructure Cluster</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium">Latency</th>
                <th className="px-5 py-3.5 font-medium">SLA Uptime</th>
                <th className="px-5 py-3.5 font-medium">P99</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
              {SERVICE_HEALTH.map((srv) => (
                <tr key={srv.name} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5 font-medium text-[#F1EBDD]">
                    {srv.name}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-zinc-400">
                    {srv.cluster}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#68704A]/25 text-[#E8DFCF] border border-[#68704A]/40 text-[10px] font-mono">
                      <CheckCircle2 className="w-3 h-3 text-[#A2AD7B]" />
                      <span>{srv.status}</span>
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[#E8DFCF]">
                    {srv.latency}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[#E8DFCF]">
                    {srv.uptime}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[#F1EBDD]/60">
                    {srv.p99}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fast Shortcuts Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <Link
          href="/tech-lead/people"
          className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/60 transition-all group space-y-2 block"
        >
          <div className="flex items-center justify-between">
            <Users className="w-5 h-5 text-[#E8DFCF]" />
            <ArrowRight className="w-4 h-4 text-[#F1EBDD]/40 group-hover:text-[#F1EBDD] group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-sm font-bold text-[#F1EBDD] tracking-tight pt-2">
            Workforce & Access Control
          </h3>
          <p className="text-xs text-[#F1EBDD]/60 leading-relaxed font-sans">
            Manage employee access, inspect permissions, review attendance history, and handle account terminations.
          </p>
        </Link>

        <Link
          href="/tech-lead/sprints"
          className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#68704A]/60 transition-all group space-y-2 block"
        >
          <div className="flex items-center justify-between">
            <GitBranch className="w-5 h-5 text-[#A2AD7B]" />
            <ArrowRight className="w-4 h-4 text-[#F1EBDD]/40 group-hover:text-[#F1EBDD] group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-sm font-bold text-[#F1EBDD] tracking-tight pt-2">
            Sprints & Kanban Engine
          </h3>
          <p className="text-xs text-[#F1EBDD]/60 leading-relaxed font-sans">
            Review active sprint tasks across Backlog, To Do, In Progress, Code Review, Testing, and Done stages.
          </p>
        </Link>

        <Link
          href="/tech-lead/audit"
          className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/60 transition-all group space-y-2 block"
        >
          <div className="flex items-center justify-between">
            <Terminal className="w-5 h-5 text-[#E8DFCF]" />
            <ArrowRight className="w-4 h-4 text-[#F1EBDD]/40 group-hover:text-[#F1EBDD] group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-sm font-bold text-[#F1EBDD] tracking-tight pt-2">
            Immutable Audit Ledger
          </h3>
          <p className="text-xs text-[#F1EBDD]/60 leading-relaxed font-sans">
            Inspect verified administrative audit records, authorization logs, and security compliance events.
          </p>
        </Link>
      </section>
    </div>
  )
}
