import React from 'react'
import type { Metadata } from 'next'
import { AlertTriangle, ShieldCheck, CheckCircle2, Search, Plus } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getTechnicalIssues } from '@/lib/actions/engineering'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import { EmptyState } from '@/components/management/EmptyState'

export const metadata: Metadata = createMetadata({
  title: 'Technical Issues & Defect Triage | Tech Lead',
  description: 'Investigate bugs, triage runtime anomalies, and resolve architectural issues.',
  path: '/tech-lead/issues',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function TechnicalIssuesPage() {
  const issues = await getTechnicalIssues()

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Technical Issues & Defect Triage"
        subtitle="Monitor, investigate, and resolve system anomalies, runtime exceptions, and security alerts."
      />

      {issues.length === 0 ? (
        <EmptyState
          title="No Outstanding Technical Issues"
          description="Zero unresolved bugs or defects recorded in the defect tracker. All systems operational."
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#2A2A26] bg-[#161614]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1B1B18] text-[#F1EBDD]/60 font-mono text-[11px] border-b border-[#2A2A26]">
              <tr>
                <th className="px-5 py-3.5 font-medium">Issue Summary</th>
                <th className="px-5 py-3.5 font-medium">Severity</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium">Environment</th>
                <th className="px-5 py-3.5 font-medium">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
              {issues.map((iss) => (
                <tr key={iss.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5 font-medium text-[#F1EBDD]">
                    {iss.title}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        iss.severity === 'critical'
                          ? 'bg-red-950/40 text-red-300 border border-red-800/40'
                          : iss.severity === 'high'
                          ? 'bg-amber-950/40 text-amber-300 border border-amber-800/40'
                          : 'bg-white/[0.05] text-[#F1EBDD]/70'
                      }`}
                    >
                      {iss.severity}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-zinc-400 uppercase text-[10px]">
                    {iss.status}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-zinc-400">
                    {iss.environment || 'Production Edge'}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[#F1EBDD]/50 text-[10px]">
                    {new Date(iss.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
