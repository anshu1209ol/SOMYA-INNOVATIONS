import React from 'react'
import type { Metadata } from 'next'
import { FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getQuotations } from '@/lib/actions/operations'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import { EmptyState } from '@/components/management/EmptyState'

export const metadata: Metadata = createMetadata({
  title: 'Formal Quotations & Scope Documents | Operations Admin',
  description: 'Track price quotations, approval workflows, and commercial agreements.',
  path: '/admin/quotations',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function QuotationsPage() {
  const quotations = await getQuotations()

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Formal Quotations & Commercial Proposals"
        subtitle="Itemized project scopes, client approvals, and commercial pricing agreements."
      />

      {quotations.length === 0 ? (
        <EmptyState
          title="No Active Quotations"
          description="Formal quotation proposals drafted for clients will appear in this registry."
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#2A2A26] bg-[#161614]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1B1B18] text-[#F1EBDD]/60 font-mono text-[11px] border-b border-[#2A2A26]">
              <tr>
                <th className="px-5 py-3.5 font-medium">Quotation ID</th>
                <th className="px-5 py-3.5 font-medium">Title / Scope</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium">Total Amount</th>
                <th className="px-5 py-3.5 font-medium">Valid Until</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
              {quotations.map((q) => (
                <tr key={q.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-[#E8DFCF]">
                    {q.quotation_number}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-[#F1EBDD]">
                    {q.title}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 rounded bg-white/[0.05] text-[10px] font-mono uppercase text-[#A2AD7B]">
                      {q.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-zinc-300">
                    ₹{q.total.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[11px] text-[#F1EBDD]/50">
                    {q.valid_until ? new Date(q.valid_until).toLocaleDateString() : '—'}
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
