import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Users, Building2, Shield, ArrowRight } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getDirectoryUsers } from '@/lib/actions/users'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Executive Team Overview | SOMYA CEO System',
  description: 'Executive headcount governance, departmental leadership, and key practice allocations.',
  path: '/ceo/team',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function CeoTeamPage() {
  const users = await getDirectoryUsers()

  const departmentDistribution: Record<string, number> = {}
  users.forEach((u) => {
    const dept = u.department || 'Operations'
    departmentDistribution[dept] = (departmentDistribution[dept] || 0) + 1
  })

  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Executive Team Overview"
        subtitle="Departmental headcount allocation, leadership hierarchy, and operational workforce strength."
      />

      {/* Headcount by Department Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {Object.entries(departmentDistribution).map(([dept, count]) => (
          <div key={dept} className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#F1EBDD]/60 uppercase">
              <span>{dept}</span>
              <Building2 className="w-4 h-4 text-[#A2AD7B]" />
            </div>
            <div className="text-3xl font-bold font-serif text-[#F1EBDD]">{count}</div>
            <p className="text-[11px] font-mono text-[#F1EBDD]/40">Staff members allocated</p>
          </div>
        ))}
      </section>

      {/* Team Executive Roster */}
      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
          Organizational Staff Roster ({users.length})
        </h3>

        {users.length === 0 ? (
          <p className="text-xs font-mono text-[#F1EBDD]/50 py-12 text-center">
            No team members registered in the organization directory yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1B1B18] text-[#F1EBDD]/50 font-mono text-[10px] uppercase border-b border-[#2A2A26]">
                <tr>
                  <th className="px-4 py-3">Team Member</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Role / Responsibility</th>
                  <th className="px-4 py-3">Clearance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3.5 font-semibold text-[#F1EBDD]">
                      {u.fullName}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[#E8DFCF]">
                      {u.department || 'Operations'}
                    </td>
                    <td className="px-4 py-3.5 text-[#F1EBDD]/70 font-sans">
                      {u.position || u.role.toUpperCase()}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#68704A]/25 text-[#E8DFCF] border border-[#68704A]/40 uppercase">
                        {u.status}
                      </span>
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
