import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Users,
  UserCheck,
  Clock,
  CalendarX,
  AlertTriangle,
  TrendingUp,
  Building2,
  Calendar,
  ArrowRight,
  Shield,
  Download
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { requireRole } from '@/lib/auth/guards'
import { getAttendanceMetrics, getEmployees, getLeaveRequests } from '@/lib/actions/attendance'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import { AttendanceNav } from '@/components/attendance/AttendanceNav'

export const metadata: Metadata = createMetadata({
  title: 'Workforce Attendance Hub | Operations Management',
  description: 'Enterprise workforce attendance metrics, real-time shifts, department coverage, and leave telemetry.',
  path: '/admin/attendance',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function AdminAttendanceOverviewPage() {
  const context = await requireRole('admin').catch(async () => {
    const ctx = await requireRole('tech_lead')
    return ctx
  })

  const [metrics, employees, leaveRequests] = await Promise.all([
    getAttendanceMetrics(),
    getEmployees(),
    getLeaveRequests()
  ])

  const pendingLeaves = leaveRequests.filter(r => r.status === 'Pending')

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Workforce Attendance Hub"
        subtitle="Centralized workforce presence tracking, biometric punches, department rosters, and approved leaves."
        role={context.roles[0]}
        userEmail={context.user.email}
      />

      <AttendanceNav />

      {/* Real-time KPI Telemetry Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Workforce */}
        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#F1EBDD]/60 text-[10px] font-mono uppercase">
            <span>Total Staff</span>
            <Users className="w-3.5 h-3.5 text-[#A2AD7B]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#F1EBDD]">
            {metrics.total}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/50">
            Registered personnel
          </p>
        </div>

        {/* Present Today */}
        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#A2AD7B] text-[10px] font-mono uppercase">
            <span>Present Today</span>
            <UserCheck className="w-3.5 h-3.5 text-[#A2AD7B]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#A2AD7B]">
            {metrics.present}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/50">
            Attendance rate: <strong className="text-[#A2AD7B]">{metrics.rate}%</strong>
          </p>
        </div>

        {/* Late Arrivals */}
        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-amber-300 text-[10px] font-mono uppercase">
            <span>Late Arrivals</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <div className="text-3xl font-bold font-serif text-amber-300">
            {metrics.late}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/50">
            Cutoff 09:15 AM
          </p>
        </div>

        {/* On Leave */}
        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#E8DFCF] text-[10px] font-mono uppercase">
            <span>On Leave</span>
            <Calendar className="w-3.5 h-3.5 text-[#E8DFCF]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#E8DFCF]">
            {metrics.onLeave}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/50">
            Approved status
          </p>
        </div>

        {/* Absent */}
        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <div className="flex items-center justify-between text-[#FFA5B3] text-[10px] font-mono uppercase">
            <span>Absent</span>
            <CalendarX className="w-3.5 h-3.5 text-[#FFA5B3]" />
          </div>
          <div className="text-3xl font-bold font-serif text-[#FFA5B3]">
            {metrics.absent}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/50">
            Unexcused or off
          </p>
        </div>
      </section>

      {/* Attendance Rate & Department Coverage */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Rate Banner */}
        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#A2AD7B]" />
              <h3 className="text-sm font-bold font-mono uppercase text-[#F1EBDD]">
                Enterprise Attendance Rate
              </h3>
            </div>
            <p className="text-xs text-[#F1EBDD]/60 leading-relaxed">
              Target operational participation benchmark threshold is 90%. Real-time calculations derived from verified shift timestamps.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-4xl font-serif font-bold text-[#A2AD7B]">
                {metrics.rate}%
              </span>
              <span className="text-xs font-mono text-[#F1EBDD]/50">
                {metrics.present} of {metrics.total} on duty
              </span>
            </div>
            <div className="w-full bg-[#1B1B18] h-2.5 rounded-full overflow-hidden border border-[#2A2A26]">
              <div
                className="bg-[#68704A] h-full rounded-full transition-all duration-700"
                style={{ width: `${metrics.rate}%` }}
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#2A2A26] flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#F1EBDD]/60">Monthly Avg:</span>
            <span className="text-[#F1EBDD] font-bold">{metrics.monthlySummary.avgPresentRate}%</span>
            <span className="text-[#F1EBDD]/60">Working Days:</span>
            <span className="text-[#F1EBDD] font-bold">{metrics.monthlySummary.workDays}</span>
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#641F2A]" />
              <h3 className="text-sm font-bold font-mono uppercase text-[#F1EBDD]">
                Department Attendance Breakdown
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase">
              {metrics.deptCounts.length} Operating Units
            </span>
          </div>

          <div className="space-y-3.5">
            {metrics.deptCounts.map((d) => {
              const pct = d.count > 0 ? Math.round((d.present / d.count) * 100) : 0
              return (
                <div key={d.dept} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#F1EBDD]">{d.dept}</span>
                    <span className="font-mono text-[#F1EBDD]/70 text-[11px]">
                      {d.present} / {d.count} present ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#1B1B18] h-2 rounded-full overflow-hidden border border-[#2A2A26]">
                    <div
                      className="bg-[#641F2A] h-full rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Action Navigation Modules */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/attendance/today"
          className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/60 transition-all group space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#68704A]" />
              <h4 className="font-semibold text-xs text-[#F1EBDD]">Today & Shift Punches</h4>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#F1EBDD]/40 group-hover:text-[#F1EBDD] group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-[11px] text-[#F1EBDD]/60 leading-relaxed">
            Record employee shift punch in/out with QR verification, biometric logging, and offline synchronization.
          </p>
        </Link>

        <Link
          href="/admin/attendance/leave"
          className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/60 transition-all group space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarX className="w-4 h-4 text-amber-300" />
              <h4 className="font-semibold text-xs text-[#F1EBDD]">Leave Management</h4>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#641F2A]/30 text-red-300 border border-[#641F2A]/50">
              {pendingLeaves.length} Pending
            </span>
          </div>
          <p className="text-[11px] text-[#F1EBDD]/60 leading-relaxed">
            Review and action leave requests. Approved leaves automatically propagate to attendance rosters.
          </p>
        </Link>

        <Link
          href="/admin/attendance/reports"
          className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/60 transition-all group space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-[#A2AD7B]" />
              <h4 className="font-semibold text-xs text-[#F1EBDD]">Attendance Reports</h4>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#F1EBDD]/40 group-hover:text-[#F1EBDD] group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-[11px] text-[#F1EBDD]/60 leading-relaxed">
            Generate and export daily, weekly, monthly, and departmental attendance audits in CSV and JSON formats.
          </p>
        </Link>
      </section>
    </div>
  )
}
