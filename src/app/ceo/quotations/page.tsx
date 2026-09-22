import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, ArrowRight, Clock } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getQuotations } from '@/lib/actions/operations'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Commercial Quotations | SOMYA CEO System',
  description: 'Executive quotations governance, pricing proposals, and client acceptance milestones.',
  path: '/ceo/quotations',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function CeoQuotationsPage() {
  const quotations = await getQuotations()

  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Commercial Quotations"
        subtitle="Executive oversight of formal pricing proposals and revenue commitments."
      />

      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#A2AD7B]" />
            <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
              Quotations Ledger ({quotations.length})
            </h3>
          </div>
        </div>

        {quotations.length === 0 ? (
          <p className="text-xs font-mono text-[#F1EBDD]/50 py-12 text-center">
            No formal quotations logged in database yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1B1B18] text-[#F1EBDD]/50 font-mono text-[10px] uppercase border-b border-[#2A2A26]">
                <tr>
                  <th className="px-4 py-3">Quote Reference</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Total (INR)</th>
                  <th className="px-4 py-3">Valid Until</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
                {quotations.map((q) => (
                  <tr key={q.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3.5 font-semibold text-[#F1EBDD]">
                      {q.quotation_number || q.title || `Q-${q.id.slice(0, 6)}`}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#641F2A]/25 text-[#E8DFCF] border border-[#641F2A]/40 uppercase">
                        {q.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[#A2AD7B]">
                      INR {q.total ? Number(q.total).toLocaleString() : 'Custom Scope'}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[#F1EBDD]/50">
                      {q.valid_until ? new Date(q.valid_until).toLocaleDateString() : 'Active'}
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
