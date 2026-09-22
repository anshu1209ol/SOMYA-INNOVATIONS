import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Target, TrendingUp, ArrowRight, FileText } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getLeads } from '@/lib/actions/operations'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Commercial Opportunities & Pipeline | SOMYA CEO System',
  description: 'Executive commercial opportunities, prospective contracts, and strategic pipeline briefing.',
  path: '/ceo/opportunities',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function CeoOpportunitiesPage() {
  const allLeads = await getLeads()
  const opportunities = allLeads.filter(
    (l) => l.status === 'qualified' || l.status === 'discussion' || l.status === 'quote_sent' || l.status === 'negotiation'
  )

  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Commercial Opportunities Pipeline"
        subtitle="Executive oversight of qualified commercial opportunities and enterprise deal progression."
      />

      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#A2AD7B]" />
            <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
              Qualified Pipeline Deals ({opportunities.length})
            </h3>
          </div>
        </div>

        {opportunities.length === 0 ? (
          <p className="text-xs font-mono text-[#F1EBDD]/50 py-12 text-center">
            No qualified commercial opportunities in negotiation stage currently.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1B1B18] text-[#F1EBDD]/50 font-mono text-[10px] uppercase border-b border-[#2A2A26]">
                <tr>
                  <th className="px-4 py-3">Prospective Client</th>
                  <th className="px-4 py-3">Solution Scope</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
                {opportunities.map((opp) => (
                  <tr key={opp.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-[#F1EBDD]">{opp.company || opp.name}</div>
                      <div className="text-[10px] font-mono text-[#F1EBDD]/40">{opp.email}</div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[#E8DFCF]">
                      {opp.service || 'Technology Architecture'}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#641F2A]/25 text-[#E8DFCF] border border-[#641F2A]/40 uppercase">
                        {opp.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[#A2AD7B] uppercase">
                      {opp.priority}
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
