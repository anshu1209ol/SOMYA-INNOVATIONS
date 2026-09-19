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
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getOperationsMetrics } from '@/lib/actions/operations'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Operations Command & Management Hub | Operations Admin',
  description: 'Internal operations, quotation pipeline, workforce attendance, and service delivery management portal for SOMYA INNOVATIONS.',
  path: '/admin',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function AdminPortalPage() {
  const metrics = await getOperationsMetrics()

  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Operations Command Hub"
        subtitle="Real-time commercial pipeline, client accounts, workforce attendance, and project operations."
        actions={
          <Link
            href="/admin/attendance"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#641F2A] hover:bg-[#852E3B] text-[#F1EBDD] text-xs font-semibold shadow-sm transition-colors"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Workforce Attendance Hub</span>
          </Link>
        }
      />

      {/* 6 Real Operation Metric Cards */}
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
            {metrics.activeLeadsCount === 0 ? 'No open leads' : 'In active pipeline'}
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
            {metrics.activeProjectsCount === 0 ? 'No active projects' : 'In production delivery'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-[10px] font-mono">
            <span>QUOTATIONS</span>
            <FileText className="w-3.5 h-3.5 text-[#A2AD7B]" />
          </div>
          <div className="text-2xl font-bold font-serif text-[#F1EBDD]">
            {metrics.pendingQuotationsCount}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/50">
            {metrics.pendingQuotationsCount === 0 ? 'No pending quotes' : 'Awaiting confirmation'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-[10px] font-mono">
            <span>OPEN TASKS</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#A2AD7B]" />
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

      {/* Workforce Attendance Deep Link Card */}
      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#68704A] animate-pulse" />
            <h2 className="text-base font-bold text-[#F1EBDD] tracking-tight">
              Workforce Shift Punches & Leave Workflow
            </h2>
          </div>
          <p className="text-xs text-[#F1EBDD]/70 max-w-xl leading-relaxed">
            Biometric shift timing, QR-based check-ins, leave approvals, and shift hours calculated directly from the central database.
          </p>
          <div className="flex flex-wrap gap-4 text-[11px] font-mono pt-1 text-[#F1EBDD]/60">
            <span>Present: <strong className="text-[#A2AD7B]">{metrics.attendanceToday.present}</strong></span>
            <span>Late: <strong className="text-amber-300">{metrics.attendanceToday.late}</strong></span>
            <span>On Leave: <strong className="text-blue-300">{metrics.attendanceToday.onLeave}</strong></span>
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

      {/* Operational Modules Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/leads"
          className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/60 transition-all group space-y-2 block"
        >
          <div className="flex items-center justify-between">
            <FileText className="w-5 h-5 text-[#E8DFCF]" />
            <ArrowRight className="w-4 h-4 text-[#F1EBDD]/40 group-hover:text-[#F1EBDD] group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-sm font-bold text-[#F1EBDD] tracking-tight pt-2">
            Commercial Pipeline & Enquiries
          </h3>
          <p className="text-xs text-[#F1EBDD]/60 leading-relaxed">
            Review incoming project briefs, qualification stages, and proposal progress.
          </p>
        </Link>

        <Link
          href="/admin/clients"
          className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#68704A]/60 transition-all group space-y-2 block"
        >
          <div className="flex items-center justify-between">
            <Briefcase className="w-5 h-5 text-[#A2AD7B]" />
            <ArrowRight className="w-4 h-4 text-[#F1EBDD]/40 group-hover:text-[#F1EBDD] group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-sm font-bold text-[#F1EBDD] tracking-tight pt-2">
            Enterprise Client Accounts
          </h3>
          <p className="text-xs text-[#F1EBDD]/60 leading-relaxed">
            Client contacts, active delivery contracts, and company information.
          </p>
        </Link>

        <Link
          href="/admin/quotations"
          className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/60 transition-all group space-y-2 block"
        >
          <div className="flex items-center justify-between">
            <FileText className="w-5 h-5 text-[#E8DFCF]" />
            <ArrowRight className="w-4 h-4 text-[#F1EBDD]/40 group-hover:text-[#F1EBDD] group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-sm font-bold text-[#F1EBDD] tracking-tight pt-2">
            Formal Quotations & Scope
          </h3>
          <p className="text-xs text-[#F1EBDD]/60 leading-relaxed">
            Track quotation drafts, validity periods, itemized scopes, and negotiation statuses.
          </p>
        </Link>
      </section>
    </div>
  )
}
