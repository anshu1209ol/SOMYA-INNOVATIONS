import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Users,
  Search,
  Filter,
  Shield,
  UserCheck,
  UserX,
  ChevronRight,
  Plus,
  AlertTriangle,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getDirectoryUsers } from '@/lib/actions/users'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import { EmptyState } from '@/components/management/EmptyState'

export const metadata: Metadata = createMetadata({
  title: 'Workforce & Access Management | Tech Lead',
  description: 'Manage workforce profiles, credentials, department assignments, and security status for SOMYA INNOVATIONS.',
  path: '/tech-lead/people',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

interface PeoplePageProps {
  searchParams: Promise<{
    role?: string
    status?: string
    search?: string
    department?: string
  }>
}

export default async function PeopleManagementPage({ searchParams }: PeoplePageProps) {
  const params = await searchParams
  const activeRole = params.role || 'ALL'
  const activeStatus = params.status || 'ALL'
  const searchQuery = params.search || ''

  const users = await getDirectoryUsers({
    role: activeRole,
    status: activeStatus,
    search: searchQuery,
  })

  const roles = [
    { label: 'All Roles', value: 'ALL' },
    { label: 'Tech Lead', value: 'tech_lead' },
    { label: 'CEO', value: 'ceo' },
    { label: 'Admin', value: 'admin' },
    { label: 'Employee', value: 'employee' },
    { label: 'Client', value: 'client' },
  ]

  const statuses = [
    { label: 'All Statuses', value: 'ALL' },
    { label: 'Active', value: 'active' },
    { label: 'Suspended', value: 'suspended' },
    { label: 'Terminated', value: 'terminated' },
  ]

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="People & Access Control"
        subtitle="Workforce directory, granular permission oversight, and lifecycle status management."
      />

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <form method="GET" className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#F1EBDD]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="Search by name, email, department, or title..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] text-xs placeholder:text-[#F1EBDD]/40 focus:outline-none focus:border-[#641F2A] transition-colors"
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
            <span className="text-[10px] font-mono text-[#F1EBDD]/40 mr-1 uppercase">
              Role:
            </span>
            {roles.map((r) => {
              const isActive = activeRole === r.value
              return (
                <Link
                  key={r.value}
                  href={`/tech-lead/people?role=${r.value}&status=${activeStatus}&search=${encodeURIComponent(searchQuery)}`}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                    isActive
                      ? 'bg-[#641F2A] text-[#F1EBDD] font-bold shadow-sm'
                      : 'bg-white/[0.04] text-[#F1EBDD]/60 hover:text-[#F1EBDD] hover:bg-white/[0.08]'
                  }`}
                >
                  {r.label}
                </Link>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono text-[#F1EBDD]/40 mr-1 uppercase">
              Status:
            </span>
            {statuses.map((s) => {
              const isActive = activeStatus === s.value
              return (
                <Link
                  key={s.value}
                  href={`/tech-lead/people?role=${activeRole}&status=${s.value}&search=${encodeURIComponent(searchQuery)}`}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                    isActive
                      ? 'bg-[#68704A] text-[#F1EBDD] font-bold shadow-sm'
                      : 'bg-white/[0.04] text-[#F1EBDD]/60 hover:text-[#F1EBDD] hover:bg-white/[0.08]'
                  }`}
                >
                  {s.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Users Directory Table */}
      {users.length === 0 ? (
        <EmptyState
          title="No Personnel Found"
          description="No workforce records matched your current query or role/status filters."
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#2A2A26] bg-[#161614]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1B1B18] text-[#F1EBDD]/60 font-mono text-[11px] border-b border-[#2A2A26]">
              <tr>
                <th className="px-5 py-3.5 font-medium">Name & Identity</th>
                <th className="px-5 py-3.5 font-medium">Assigned Role</th>
                <th className="px-5 py-3.5 font-medium">Department</th>
                <th className="px-5 py-3.5 font-medium">Position</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium">Last Login</th>
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
              {users.map((u) => {
                let statusBadge = (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#68704A]/25 text-[#E8DFCF] border border-[#68704A]/40 text-[10px] font-mono">
                    <UserCheck className="w-3 h-3 text-[#A2AD7B]" />
                    <span>Active</span>
                  </span>
                )
                if (u.status === 'suspended') {
                  statusBadge = (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/40 text-amber-300 border border-amber-800/40 text-[10px] font-mono">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      <span>Suspended</span>
                    </span>
                  )
                } else if (u.status === 'terminated') {
                  statusBadge = (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#641F2A]/30 text-red-300 border border-[#641F2A]/50 text-[10px] font-mono">
                      <UserX className="w-3 h-3 text-red-400" />
                      <span>Terminated</span>
                    </span>
                  )
                }

                return (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-[#F1EBDD]">
                        {u.fullName}
                      </div>
                      <div className="text-[11px] font-mono text-[#F1EBDD]/50">
                        {u.email}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-mono">
                      <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-[#2A2A26] text-[10px] uppercase">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-zinc-300">
                      {u.department}
                    </td>
                    <td className="px-5 py-3.5 text-zinc-400">
                      {u.position}
                    </td>
                    <td className="px-5 py-3.5">
                      {statusBadge}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[11px] text-[#F1EBDD]/50">
                      {u.lastLogin || '—'}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/tech-lead/people/${u.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-[#641F2A]/20 hover:text-[#F1EBDD] text-xs font-medium text-[#F1EBDD]/70 border border-[#2A2A26] transition-colors"
                      >
                        <span>Profile & Access</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
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
