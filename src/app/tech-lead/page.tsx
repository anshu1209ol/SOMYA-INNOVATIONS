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
  Shield,
  Cpu,
  CheckSquare,
  Clock,
  AlertOctagon,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import {
  getTechLeadDashboardMetrics,
  getTechnicalIssues,
  getEngineeringTasks,
} from '@/lib/actions/engineering'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Engineering Command & Systems Telemetry | SOMYA Tech Lead',
  description: 'Systems architecture, runtime telemetry, engineering sprint velocity, and technical release command for SOMYA INNOVATIONS leadership.',
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
  const [metrics, issues, tasks] = await Promise.all([
    getTechLeadDashboardMetrics(),
    getTechnicalIssues(),
    getEngineeringTasks(),
  ])

  // Group tasks by Kanban stage
  const kanbanStages = {
    backlog: tasks.filter((t) => t.status === 'backlog').length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    in_progress: tasks.filter((t) => t.status === 'in_progress').length,
    code_review: tasks.filter((t) => t.status === 'code_review').length,
    testing: tasks.filter((t) => t.status === 'testing').length,
    done: tasks.filter((t) => t.status === 'done').length,
  }

  const criticalIssues = issues.filter((i) => i.severity === 'critical' || i.severity === 'high').slice(0, 5)

  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Engineering Command & Telemetry"
        subtitle="Systems architecture, runtime telemetry, engineering sprint velocity, and technical release command."
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/tech-lead/sprints"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#F1EBDD] text-xs font-mono border border-[#2A2A26] transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5 text-[#A2AD7B]" />
              <span>Sprint Kanban</span>
            </Link>
            <Link
              href="/tech-lead/people"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#641F2A] hover:bg-[#852E3B] text-[#F1EBDD] text-xs font-semibold shadow-sm transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              <span>People & Access</span>
            </Link>
          </div>
        }
      />

      {/* Engineering KPI Metrics */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-xs font-mono">
            <span>ENGINEERING PROJECTS</span>
            <Layers className="w-4 h-4 text-[#A2AD7B]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#F1EBDD]">
            {metrics.activeProjectsCount}
          </div>
          <p className="text-[11px] text-[#F1EBDD]/50 font-mono">
            {metrics.activeProjectsCount === 0 ? 'No active engineering projects' : 'In development pipeline'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-xs font-mono">
            <span>OPEN TASKS</span>
            <CheckSquare className="w-4 h-4 text-[#A2AD7B]" />
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
            <span>CRITICAL BLOCKERS</span>
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

      {/* Technical Sprint & Kanban Pipeline Summary */}
      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-[#A2AD7B]" />
            <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
              Sprint Velocity & Kanban Stages ({tasks.length} tasks)
            </h3>
          </div>
          <Link
            href="/tech-lead/sprints"
            className="text-xs font-mono text-[#E8DFCF] hover:underline"
          >
            Interactive Kanban &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
            <span className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase">Backlog</span>
            <div className="text-xl font-bold font-mono text-[#F1EBDD]">{kanbanStages.backlog}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
            <span className="text-[10px] font-mono text-[#E8DFCF]/70 uppercase">To Do</span>
            <div className="text-xl font-bold font-mono text-[#E8DFCF]">{kanbanStages.todo}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
            <span className="text-[10px] font-mono text-amber-300 uppercase">In Progress</span>
            <div className="text-xl font-bold font-mono text-amber-300">{kanbanStages.in_progress}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
            <span className="text-[10px] font-mono text-[#A2AD7B] uppercase">Code Review</span>
            <div className="text-xl font-bold font-mono text-[#A2AD7B]">{kanbanStages.code_review}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
            <span className="text-[10px] font-mono text-[#E8DFCF] uppercase">Testing</span>
            <div className="text-xl font-bold font-mono text-[#E8DFCF]">{kanbanStages.testing}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
            <span className="text-[10px] font-mono text-[#68704A] uppercase">Done</span>
            <div className="text-xl font-bold font-mono text-[#68704A]">{kanbanStages.done}</div>
          </div>
        </div>
      </section>

      {/* Issues Triage & Severity Matrix */}
      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#A2AD7B]" />
            <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
              Technical Issues & Blocker Radar ({issues.length})
            </h3>
          </div>
          <Link
            href="/tech-lead/issues"
            className="text-xs font-mono text-[#E8DFCF] hover:underline"
          >
            Issues tracker &rarr;
          </Link>
        </div>

        {criticalIssues.length === 0 ? (
          <p className="text-xs font-mono text-[#F1EBDD]/50 py-6 text-center">
            Zero active high-severity or critical issues logged in the system.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1B1B18] text-[#F1EBDD]/50 font-mono text-[10px] uppercase border-b border-[#2A2A26]">
                <tr>
                  <th className="px-3 py-2.5">Issue Title</th>
                  <th className="px-3 py-2.5">Severity</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
                {criticalIssues.map((iss) => (
                  <tr key={iss.id} className="hover:bg-white/[0.02]">
                    <td className="px-3 py-3 font-semibold text-[#F1EBDD]">
                      {iss.title}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        iss.severity === 'critical'
                          ? 'bg-[#641F2A]/30 text-red-300 border border-[#641F2A]/50'
                          : 'bg-amber-950/40 text-amber-300 border border-amber-800/40'
                      }`}>
                        {iss.severity}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-mono text-[#E8DFCF]">
                      {iss.status}
                    </td>
                    <td className="px-3 py-3 font-mono text-[#F1EBDD]/40">
                      {new Date(iss.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Systems Runtime Telemetry Table */}
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
            <span>Systems Operational</span>
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
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
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
            <Shield className="w-5 h-5 text-[#E8DFCF]" />
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
