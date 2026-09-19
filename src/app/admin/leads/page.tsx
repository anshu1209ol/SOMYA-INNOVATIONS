import React from 'react'
import type { Metadata } from 'next'
import { FileText, Plus, Search, Filter } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getLeads } from '@/lib/actions/operations'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import { EmptyState } from '@/components/management/EmptyState'

export const metadata: Metadata = createMetadata({
  title: 'Enquiries & Commercial Leads | Operations Admin',
  description: 'Manage commercial leads, client qualification, and proposals.',
  path: '/admin/leads',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function LeadsPage() {
  const leads = await getLeads()

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Commercial Enquiries & Leads"
        subtitle="Manage prospective client enquiries, qualification stages, and proposal pipelines."
      />

      {leads.length === 0 ? (
        <EmptyState
          title="No Open Commercial Leads"
          description="Inbound enquiries from the quotation and contact forms will be automatically ingested into this pipeline."
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#2A2A26] bg-[#161614]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1B1B18] text-[#F1EBDD]/60 font-mono text-[11px] border-b border-[#2A2A26]">
              <tr>
                <th className="px-5 py-3.5 font-medium">Lead Name / Company</th>
                <th className="px-5 py-3.5 font-medium">Service Pillar</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium">Priority</th>
                <th className="px-5 py-3.5 font-medium">Date Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-[#F1EBDD]">{l.name}</div>
                    <div className="text-[11px] text-[#F1EBDD]/50 font-mono">{l.company || l.email}</div>
                  </td>
                  <td className="px-5 py-3.5 text-zinc-300">
                    {l.service || 'Technology Architecture'}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 rounded bg-white/[0.05] text-[10px] font-mono uppercase text-[#A2AD7B]">
                      {l.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 uppercase font-mono text-[10px]">
                    {l.priority}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[11px] text-[#F1EBDD]/50">
                    {new Date(l.created_at).toLocaleDateString()}
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
