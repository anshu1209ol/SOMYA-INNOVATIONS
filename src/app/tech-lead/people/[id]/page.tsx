import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Users,
  Shield,
  Briefcase,
  Layers,
  Clock,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calendar,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { requireRole } from '@/lib/auth/guards'
import { getUserProfileDetails } from '@/lib/actions/users'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import { DangerZone } from './DangerZone'

export const metadata: Metadata = createMetadata({
  title: 'User Profile & Security Access | Tech Lead',
  description: 'Inspect profile credentials, access permissions, project work, and administrative status.',
  path: '/tech-lead/people',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

interface UserDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params
  const callerContext = await requireRole('tech_lead')
  const userDetails = await getUserProfileDetails(id)

  if (!userDetails) {
    notFound()
  }

  const { profile, roles, permissions, employeeRecord, projects, tasks, recentPunches, auditHistory } = userDetails
  const status = (profile.status as 'invited' | 'active' | 'suspended' | 'terminated') || (profile.is_active ? 'active' : 'suspended')

  return (
    <div className="space-y-8">
      {/* Top breadcrumb navigation */}
      <div>
        <Link
          href="/tech-lead/people"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F1EBDD]/60 hover:text-[#F1EBDD] transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Workforce Directory</span>
        </Link>

        <ManagementHeader
          title={profile.full_name || 'Personnel Profile'}
          subtitle={`Account ID: ${profile.id} • Registered ${new Date(profile.created_at).toLocaleDateString()}`}
        />
      </div>

      {/* Profile Overview Card */}
      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-1">
          <div className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase tracking-wider">
            Email Address
          </div>
          <div className="text-sm font-semibold text-[#F1EBDD] truncate">
            {profile.email || 'None'}
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase tracking-wider">
            Department & Title
          </div>
          <div className="text-sm font-semibold text-[#F1EBDD]">
            {profile.department || 'General'}
          </div>
          <div className="text-xs text-[#F1EBDD]/60">
            {profile.job_title || 'Staff Member'}
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase tracking-wider">
            Lifecycle Status
          </div>
          <div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono uppercase font-bold border ${
                status === 'active'
                  ? 'bg-[#68704A]/25 text-[#E8DFCF] border-[#68704A]/40'
                  : status === 'suspended'
                  ? 'bg-amber-950/40 text-amber-300 border-amber-800/40'
                  : 'bg-[#641F2A]/30 text-red-300 border-[#641F2A]/50'
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase tracking-wider">
            System Authority Roles
          </div>
          <div className="flex flex-wrap gap-1">
            {roles.map((r) => (
              <span
                key={r}
                className="px-2 py-0.5 rounded bg-white/[0.05] border border-[#2A2A26] text-[10px] font-mono uppercase text-[#F1EBDD]"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Permissions Grid */}
      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#A2AD7B]" />
            <h2 className="text-sm font-bold text-[#F1EBDD] tracking-tight">
              Effective Permissions Catalog
            </h2>
          </div>
          <span className="text-[10px] font-mono text-[#F1EBDD]/50">
            {permissions.length} active rights
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {permissions.map((p) => (
            <span
              key={p}
              className="px-2.5 py-1 rounded-lg bg-[#1B1B18] border border-[#2A2A26] text-[11px] font-mono text-[#E8DFCF]"
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* Assigned Work & Attendance Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Work / Tasks */}
        <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#A2AD7B]" />
              <h2 className="text-sm font-bold text-[#F1EBDD] tracking-tight">
                Assigned Work & Tasks
              </h2>
            </div>
            <span className="text-[10px] font-mono text-[#F1EBDD]/50">
              {tasks.length} tasks
            </span>
          </div>

          {tasks.length === 0 ? (
            <p className="text-xs text-[#F1EBDD]/50 font-mono py-6 text-center">
              No tasks currently assigned to this account.
            </p>
          ) : (
            <div className="space-y-2">
              {tasks.slice(0, 5).map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded-xl bg-[#1B1B18] border border-[#2A2A26] flex items-center justify-between gap-3 text-xs"
                >
                  <span className="font-medium text-[#F1EBDD] truncate">{t.title}</span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono uppercase text-zinc-400">
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Attendance Punches */}
        <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#A2AD7B]" />
              <h2 className="text-sm font-bold text-[#F1EBDD] tracking-tight">
                Recent Attendance Punches
              </h2>
            </div>
            {employeeRecord && (
              <span className="text-[10px] font-mono text-[#F1EBDD]/50">
                Shift: {employeeRecord.check_in || '—'}
              </span>
            )}
          </div>

          {recentPunches.length === 0 ? (
            <p className="text-xs text-[#F1EBDD]/50 font-mono py-6 text-center">
              No recent shift punch records found.
            </p>
          ) : (
            <div className="space-y-2">
              {recentPunches.slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl bg-[#1B1B18] border border-[#2A2A26] flex items-center justify-between text-xs"
                >
                  <span className="font-mono text-[#F1EBDD]">
                    {new Date(p.punch_in).toLocaleDateString()}
                  </span>
                  <span className="font-mono text-zinc-400">
                    Duration: {p.duration || 'Active Shift'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Activity & Audit Trail */}
      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#A2AD7B]" />
          <h2 className="text-sm font-bold text-[#F1EBDD] tracking-tight">
            Compliance Audit Ledger for User
          </h2>
        </div>

        {auditHistory.length === 0 ? (
          <p className="text-xs text-[#F1EBDD]/50 font-mono py-4">
            No administrative or lifecycle actions recorded for this identity yet.
          </p>
        ) : (
          <div className="space-y-2">
            {auditHistory.map((a) => (
              <div
                key={a.id}
                className="p-3.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <div className="font-mono font-bold text-[#E8DFCF] uppercase">
                    {a.action}
                  </div>
                  {a.reason && (
                    <div className="text-[#F1EBDD]/70 mt-0.5">
                      Justification: {a.reason}
                    </div>
                  )}
                </div>
                <div className="text-[10px] font-mono text-[#F1EBDD]/50 shrink-0">
                  {new Date(a.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Danger Zone Governance */}
      <DangerZone
        userId={profile.id}
        userEmail={profile.email || ''}
        userName={profile.full_name || 'Staff Member'}
        status={status}
        currentCallerId={callerContext.user.id}
      />
    </div>
  )
}
