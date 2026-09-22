import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Users,
  Building2,
  Calendar,
  Briefcase,
  Clock,
  ArrowRight,
  Shield,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getDirectoryUsers } from '@/lib/actions/users'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Workforce Team Directory | SOMYA Admin System',
  description: 'Operations team directory, departmental allocations, job positions, and active tenure records.',
  path: '/admin/team',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function AdminTeamPage() {
  const users = await getDirectoryUsers()

  const departmentCounts: Record<string, number> = {}
  users.forEach((u) => {
    const dept = u.department || 'Operations'
    departmentCounts[dept] = (departmentCounts[dept] || 0) + 1
  })

  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Workforce Team Directory"
        subtitle="Operational employee directory, departmental assignments, and organizational tenure."
        actions={
          <Link
            href="/admin/attendance"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#641F2A] hover:bg-[#852E3B] text-[#F1EBDD] text-xs font-semibold shadow-sm transition-colors"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Attendance Hub</span>
          </Link>
        }
      />

      {/* Summary Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#161614] border border-[#2A2A26] space-y-1">
          <span className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase">Total Workforce</span>
          <div className="text-2xl font-bold font-serif text-[#F1EBDD]">{users.length}</div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/40">Active staff & contractors</p>
        </div>

        <div className="p-4 rounded-xl bg-[#161614] border border-[#2A2A26] space-y-1">
          <span className="text-[10px] font-mono text-[#68704A] uppercase">Active Standing</span>
          <div className="text-2xl font-bold font-serif text-[#68704A]">
            {users.filter((u) => u.status === 'active').length}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/40">Verified clearance</p>
        </div>

        <div className="p-4 rounded-xl bg-[#161614] border border-[#2A2A26] space-y-1">
          <span className="text-[10px] font-mono text-[#A2AD7B] uppercase">Departments</span>
          <div className="text-2xl font-bold font-serif text-[#A2AD7B]">
            {Object.keys(departmentCounts).length}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/40">Operational practices</p>
        </div>

        <div className="p-4 rounded-xl bg-[#161614] border border-[#2A2A26] space-y-1">
          <span className="text-[10px] font-mono text-[#E8DFCF] uppercase">Attendance Today</span>
          <div className="text-2xl font-bold font-serif text-[#E8DFCF]">
            {users.filter((u) => u.status === 'active').length}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/40">Central shift tracking</p>
        </div>
      </section>

      {/* Workforce Directory Table */}
      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#A2AD7B]" />
            <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
              Employee Directory ({users.length})
            </h3>
          </div>
        </div>

        {users.length === 0 ? (
          <p className="text-xs font-mono text-[#F1EBDD]/50 py-12 text-center">
            No employees registered in the system yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1B1B18] text-[#F1EBDD]/50 font-mono text-[10px] uppercase border-b border-[#2A2A26]">
                <tr>
                  <th className="px-4 py-3">Employee</th>
                  <th className="px-4 py-3">Position</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-[#F1EBDD] flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#1B1B18] border border-[#2A2A26] flex items-center justify-center text-xs font-bold text-[#F1EBDD]">
                          {u.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div>{u.fullName}</div>
                          <div className="text-[10px] font-mono text-[#F1EBDD]/40">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[#E8DFCF]">
                      {u.position || 'Specialist'}
                    </td>
                    <td className="px-4 py-3.5 text-[#F1EBDD]/70 font-sans">
                      {u.department || 'Operations'}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border uppercase ${
                        u.status === 'active'
                          ? 'bg-[#68704A]/25 text-[#E8DFCF] border-[#68704A]/40'
                          : u.status === 'suspended'
                          ? 'bg-amber-950/40 text-amber-300 border-amber-800/40'
                          : 'bg-[#641F2A]/30 text-red-300 border-[#641F2A]/50'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[#F1EBDD]/50">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
