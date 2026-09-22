import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Briefcase,
  Users,
  FileText,
  Layers,
  Clock,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Calendar,
  CheckSquare,
  Plus,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getOperationsMetrics, getLeads, getQuotations } from '@/lib/actions/operations'
import { getProjects } from '@/lib/actions/projects'
import { getTasks } from '@/lib/actions/tasks'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Operations Command Hub | SOMYA Admin System',
  description: 'Internal operations, commercial pipeline, workforce attendance, and service delivery management portal for SOMYA INNOVATIONS.',
  path: '/admin',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function AdminPortalPage() {
  const [metrics, leads, quotations, projectsData, tasksData] = await Promise.all([
    getOperationsMetrics(),
    getLeads(),
    getQuotations(),
    getProjects({ limit: 5 }),
    getTasks({ limit: 5 }),
  ])

  const recentLeads = leads.slice(0, 5)
  const recentQuotations = quotations.slice(0, 5)
  const activeProjects = (projectsData.data || []).slice(0, 5)
  const pendingTasks = (tasksData.data || []).slice(0, 5)

  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Operations Command Hub"
        subtitle="Operational management system for commercial pipeline, client accounts, task delivery, and workforce attendance."
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/leads"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#F1EBDD] text-xs font-mono border border-[#2A2A26] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Lead</span>
            </Link>
            <Link
              href="/admin/attendance"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#641F2A] hover:bg-[#852E3B] text-[#F1EBDD] text-xs font-semibold shadow-sm transition-colors"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Attendance Hub</span>
            </Link>
          </div>
        }
      />

      {/* Operational Key Metric Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-[10px] font-mono">
            <span>ACTIVE LEADS</span>
            <FileText className="w-3.5 h-3.5 text-[#A2AD7B]" />
          </div>
          <div className="text-2xl font-bold font-serif text-[#F1EBDD]">
            {metrics.activeLeadsCount}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/50">
            {metrics.activeLeadsCount === 0 ? 'No open leads' : 'In commercial pipeline'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-[10px] font-mono">
            <span>CLIENTS</span>
            <Briefcase className="w-3.5 h-3.5 text-[#A2AD7B]" />
          </div>
          <div className="text-2xl font-bold font-serif text-[#F1EBDD]">
            {metrics.activeClientsCount}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/50">
            {metrics.activeClientsCount === 0 ? 'No active clients' : 'Enterprise accounts'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-[10px] font-mono">
            <span>ACTIVE PROJECTS</span>
            <Layers className="w-3.5 h-3.5 text-[#A2AD7B]" />
          </div>
          <div className="text-2xl font-bold font-serif text-[#F1EBDD]">
            {metrics.activeProjectsCount}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/50">
            {metrics.activeProjectsCount === 0 ? 'No active projects' : 'In active delivery'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-[10px] font-mono">
            <span>PENDING QUOTES</span>
            <FileText className="w-3.5 h-3.5 text-[#A2AD7B]" />
          </div>
          <div className="text-2xl font-bold font-serif text-[#F1EBDD]">
            {metrics.pendingQuotationsCount}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/50">
            {metrics.pendingQuotationsCount === 0 ? 'Zero pending' : 'Awaiting signoff'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-[10px] font-mono">
            <span>OPEN TASKS</span>
            <CheckSquare className="w-3.5 h-3.5 text-[#A2AD7B]" />
          </div>
          <div className="text-2xl font-bold font-serif text-[#F1EBDD]">
            {metrics.openTasksCount}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/50">
            {metrics.openTasksCount === 0 ? 'Task board clear' : 'Workforce backlog'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-[10px] font-mono">
            <span>ATTENDANCE TODAY</span>
            <Clock className="w-3.5 h-3.5 text-[#A2AD7B]" />
          </div>
          <div className="text-2xl font-bold font-serif text-[#F1EBDD]">
            {metrics.attendanceToday.present} / {metrics.attendanceToday.total}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/50">
            {metrics.attendanceToday.onLeave} on leave • {metrics.attendanceToday.late} late
          </p>
        </div>
      </section>

      {/* Workforce Shift Punch & Biometric Sync Strip */}
      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#68704A] animate-pulse" />
            <h2 className="text-base font-bold text-[#F1EBDD] tracking-tight">
              Workforce Attendance & Daily Shift Punches
            </h2>
          </div>
          <p className="text-xs text-[#F1EBDD]/70 max-w-xl leading-relaxed">
            Biometric shift timing, QR-based check-ins, leave approvals, and shift hours calculated directly from the central database.
          </p>
          <div className="flex flex-wrap gap-4 text-[11px] font-mono pt-1 text-[#F1EBDD]/60">
            <span>Present: <strong className="text-[#A2AD7B]">{metrics.attendanceToday.present}</strong></span>
            <span>Late: <strong className="text-amber-300">{metrics.attendanceToday.late}</strong></span>
            <span>On Leave: <strong className="text-[#E8DFCF]">{metrics.attendanceToday.onLeave}</strong></span>
            <span>Absent: <strong className="text-red-300">{metrics.attendanceToday.absent}</strong></span>
          </div>
        </div>

        <Link
          href="/admin/attendance"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#641F2A] hover:bg-[#852E3B] text-[#F1EBDD] text-xs font-semibold shadow-md transition-all shrink-0"
        >
          <span>Open Full Attendance Portal</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Dense Operational Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline & Incoming Leads */}
        <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#A2AD7B]" />
              <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
                Commercial Pipeline ({recentLeads.length})
              </h3>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-mono text-[#E8DFCF] hover:underline"
            >
              View all leads &rarr;
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <p className="text-xs font-mono text-[#F1EBDD]/50 py-8 text-center">
              No active enquiries or leads currently in pipeline.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1B1B18] text-[#F1EBDD]/50 font-mono text-[10px] uppercase border-b border-[#2A2A26]">
                  <tr>
                    <th className="px-3 py-2.5">Client / Lead</th>
                    <th className="px-3 py-2.5">Scope</th>
                    <th className="px-3 py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
                  {recentLeads.map((l) => (
                    <tr key={l.id} className="hover:bg-white/[0.02]">
                      <td className="px-3 py-3">
                        <div className="font-semibold text-[#F1EBDD]">{l.company || l.name}</div>
                        <div className="text-[10px] font-mono text-[#F1EBDD]/40">{l.email}</div>
                      </td>
                      <td className="px-3 py-3 font-mono text-[11px] text-[#E8DFCF]">
                        {l.service || 'General Solution'}
                      </td>
                      <td className="px-3 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#641F2A]/20 text-[#E8DFCF] border border-[#641F2A]/40 uppercase">
                          {l.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Active Projects Delivery */}
        <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#A2AD7B]" />
              <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
                Active Projects ({activeProjects.length})
              </h3>
            </div>
            <Link
              href="/admin/projects"
              className="text-xs font-mono text-[#E8DFCF] hover:underline"
            >
              View all projects &rarr;
            </Link>
          </div>

          {activeProjects.length === 0 ? (
            <p className="text-xs font-mono text-[#F1EBDD]/50 py-8 text-center">
              No active projects currently in production delivery.
            </p>
          ) : (
            <div className="space-y-3">
              {activeProjects.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#F1EBDD]">{p.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#68704A]/25 text-[#E8DFCF] border border-[#68704A]/40 uppercase">
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
                    <span>Deadline: {p.target_date ? new Date(p.target_date).toLocaleDateString() : 'TBD'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Operational Fast Navigation Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link
          href="/admin/tasks"
          className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/60 transition-all group space-y-2 block"
        >
          <div className="flex items-center justify-between">
            <CheckSquare className="w-4 h-4 text-[#A2AD7B]" />
            <ArrowRight className="w-3.5 h-3.5 text-[#F1EBDD]/40 group-hover:text-[#F1EBDD] group-hover:translate-x-0.5 transition-all" />
          </div>
          <h4 className="text-xs font-bold text-[#F1EBDD] tracking-tight pt-1">
            Operational Tasks
          </h4>
          <p className="text-[11px] text-[#F1EBDD]/60 leading-relaxed font-sans">
            Manage operational backlog, task assignments, and progress statuses.
          </p>
        </Link>

        <Link
          href="/admin/clients"
          className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#68704A]/60 transition-all group space-y-2 block"
        >
          <div className="flex items-center justify-between">
            <Briefcase className="w-4 h-4 text-[#A2AD7B]" />
            <ArrowRight className="w-3.5 h-3.5 text-[#F1EBDD]/40 group-hover:text-[#F1EBDD] group-hover:translate-x-0.5 transition-all" />
          </div>
          <h4 className="text-xs font-bold text-[#F1EBDD] tracking-tight pt-1">
            Enterprise Clients
          </h4>
          <p className="text-[11px] text-[#F1EBDD]/60 leading-relaxed font-sans">
            Accounts directory, commercial contracts, and key contact details.
          </p>
        </Link>

        <Link
          href="/admin/quotations"
          className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/60 transition-all group space-y-2 block"
        >
          <div className="flex items-center justify-between">
            <FileText className="w-4 h-4 text-[#A2AD7B]" />
            <ArrowRight className="w-3.5 h-3.5 text-[#F1EBDD]/40 group-hover:text-[#F1EBDD] group-hover:translate-x-0.5 transition-all" />
          </div>
          <h4 className="text-xs font-bold text-[#F1EBDD] tracking-tight pt-1">
            Formal Quotations
          </h4>
          <p className="text-[11px] text-[#F1EBDD]/60 leading-relaxed font-sans">
            Draft, track pricing proposals, and client acceptance milestones.
          </p>
        </Link>

        <Link
          href="/admin/team"
          className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#68704A]/60 transition-all group space-y-2 block"
        >
          <div className="flex items-center justify-between">
            <Users className="w-4 h-4 text-[#A2AD7B]" />
            <ArrowRight className="w-3.5 h-3.5 text-[#F1EBDD]/40 group-hover:text-[#F1EBDD] group-hover:translate-x-0.5 transition-all" />
          </div>
          <h4 className="text-xs font-bold text-[#F1EBDD] tracking-tight pt-1">
            Workforce Team
          </h4>
          <p className="text-[11px] text-[#F1EBDD]/60 leading-relaxed font-sans">
            Staff roles, departments, employee tenure, and leave balances.
          </p>
        </Link>
      </section>
    </div>
  )
}
