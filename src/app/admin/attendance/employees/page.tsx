import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Users,
  Search,
  Filter,
  UserCheck,
  UserX,
  Clock,
  MapPin,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { requireRole } from '@/lib/auth/guards'
import { getEmployees } from '@/lib/actions/attendance'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import { AttendanceNav } from '@/components/attendance/AttendanceNav'
import { EmptyState } from '@/components/management/EmptyState'

export const metadata: Metadata = createMetadata({
  title: 'Workforce Employees Directory | Attendance Hub',
  description: 'Enterprise employee workforce records linked to central identity profiles and live attendance logs.',
  path: '/admin/attendance/employees',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{
    dept?: string
    status?: string
    search?: string
  }>
}

export default async function AttendanceEmployeesPage({ searchParams }: PageProps) {
  await requireRole('admin')
  const params = await searchParams
  const activeDept = params.dept || 'ALL'
  const activeStatus = params.status || 'ALL'
  const searchQuery = params.search || ''

  const allEmployees = await getEmployees()

  // Filter employees
  const employees = allEmployees.filter((emp) => {
    const matchDept = activeDept === 'ALL' || emp.dept === activeDept
    const matchStatus = activeStatus === 'ALL' || emp.status === activeStatus
    const q = searchQuery.toLowerCase().trim()
    const matchSearch =
      !q ||
      emp.name.toLowerCase().includes(q) ||
      emp.id.toLowerCase().includes(q) ||
      emp.role.toLowerCase().includes(q)
    return matchDept && matchStatus && matchSearch
  })

  const departments = ['ALL', 'AI Engineering', 'IT Infrastructure', 'Digital Engineering', 'Sales & Client Success', 'Security']
  const statuses = ['ALL', 'Present', 'Remote', 'Late', 'On Leave', 'Absent']

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Central Employee Records & Attendance Telemetry"
        subtitle="Workforce identity records synchronized with central profiles, permissions, and shift presence."
      />

      <AttendanceNav />

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <form method="GET" className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#F1EBDD]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="Search employee by name, ID, or title..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] text-xs placeholder:text-[#F1EBDD]/40 focus:outline-none focus:border-[#641F2A]"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[#641F2A] hover:bg-[#852E3B] text-[#F1EBDD] text-xs font-medium transition-colors shrink-0"
          >
            Apply Filters
          </button>
        </form>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#2A2A26] text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono text-[#F1EBDD]/40 mr-1 uppercase">Department:</span>
            {departments.map((dept) => {
              const isActive = activeDept === dept
              return (
                <Link
                  key={dept}
                  href={`/admin/attendance/employees?dept=${encodeURIComponent(dept)}&status=${activeStatus}&search=${encodeURIComponent(searchQuery)}`}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                    isActive
                      ? 'bg-[#641F2A] text-[#F1EBDD] font-bold shadow-sm'
                      : 'bg-white/[0.04] text-[#F1EBDD]/60 hover:text-[#F1EBDD]'
                  }`}
                >
                  {dept}
                </Link>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono text-[#F1EBDD]/40 mr-1 uppercase">Status:</span>
            {statuses.map((s) => {
              const isActive = activeStatus === s
              return (
                <Link
                  key={s}
                  href={`/admin/attendance/employees?dept=${encodeURIComponent(activeDept)}&status=${s}&search=${encodeURIComponent(searchQuery)}`}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                    isActive
                      ? 'bg-[#68704A] text-[#F1EBDD] font-bold shadow-sm'
                      : 'bg-white/[0.04] text-[#F1EBDD]/60 hover:text-[#F1EBDD]'
                  }`}
                >
                  {s}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Employees Directory Table */}
      {employees.length === 0 ? (
        <EmptyState
          title="No Employee Records Found"
          description="No employee directory records matched your active department, status, or search filters."
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#2A2A26] bg-[#161614]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1B1B18] text-[#F1EBDD]/60 font-mono text-[11px] border-b border-[#2A2A26]">
              <tr>
                <th className="px-5 py-3.5 font-medium">Employee & ID</th>
                <th className="px-5 py-3.5 font-medium">Department</th>
                <th className="px-5 py-3.5 font-medium">Designation</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium">Check-In</th>
                <th className="px-5 py-3.5 font-medium">Daily Hours</th>
                <th className="px-5 py-3.5 font-medium">Location</th>
                <th className="px-5 py-3.5 font-medium text-right">Profile Bridge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
              {employees.map((emp) => {
                let badgeClass = 'bg-[#68704A]/25 text-[#E8DFCF] border-[#68704A]/40'
                if (emp.status === 'Late') badgeClass = 'bg-amber-950/40 text-amber-300 border-amber-800/40'
                else if (emp.status === 'On Leave') badgeClass = 'bg-[#641F2A]/30 text-[#E8DFCF] border-[#641F2A]/50'
                else if (emp.status === 'Absent') badgeClass = 'bg-white/[0.04] text-[#F1EBDD]/40 border-[#2A2A26]'

                return (
                  <tr key={emp.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-[#F1EBDD] flex items-center gap-2.5">
                        <img
                          src={emp.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                          alt={emp.name}
                          className="w-8 h-8 rounded-lg object-cover border border-[#2A2A26]"
                        />
                        <div>
                          <div>{emp.name}</div>
                          <div className="text-[10px] font-mono text-[#F1EBDD]/50">{emp.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-zinc-300">{emp.dept}</td>
                    <td className="px-5 py-3.5 text-zinc-400">{emp.role}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${badgeClass}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[#F1EBDD]">{emp.check_in || '--'}</td>
                    <td className="px-5 py-3.5 font-mono text-[#F1EBDD]/70">{emp.hours || '0h 00m'}</td>
                    <td className="px-5 py-3.5 text-zinc-400">{emp.location || 'HQ - Somya Tower'}</td>
                    <td className="px-5 py-3.5 text-right">
                      {emp.user_id ? (
                        <Link
                          href={`/tech-lead/people/${emp.user_id}`}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-[#641F2A]/20 text-[10px] font-mono text-[#F1EBDD]/70 border border-[#2A2A26] transition-colors"
                        >
                          <span>Central User</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      ) : (
                        <span className="text-[10px] font-mono text-[#F1EBDD]/40">Workforce Record</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
