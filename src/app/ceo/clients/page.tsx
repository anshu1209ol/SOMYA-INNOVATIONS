import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Briefcase, ArrowRight, Building, Layers } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getClients } from '@/lib/actions/operations'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Enterprise Client Accounts | SOMYA CEO System',
  description: 'Executive client portfolio, contracted company accounts, and high-value partnerships.',
  path: '/ceo/clients',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function CeoClientsPage() {
  const clients = await getClients()

  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Enterprise Client Portfolio"
        subtitle="Executive governance of contracted client accounts, commercial relationships, and partnership scale."
      />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <span className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase">Active Accounts</span>
          <div className="text-3xl font-bold font-serif text-[#F1EBDD]">{clients.length}</div>
          <p className="text-[11px] font-mono text-[#F1EBDD]/40">Corporate partnerships</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <span className="text-[10px] font-mono text-[#68704A] uppercase">Active Standing</span>
          <div className="text-3xl font-bold font-serif text-[#68704A]">
            {clients.filter((c) => c.status === 'active').length}
          </div>
          <p className="text-[11px] font-mono text-[#F1EBDD]/40">Engaged scope</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
          <span className="text-[10px] font-mono text-[#A2AD7B] uppercase">Commercial Tiers</span>
          <div className="text-3xl font-bold font-serif text-[#A2AD7B]">Enterprise</div>
          <p className="text-[11px] font-mono text-[#F1EBDD]/40">Tier-1 agreements</p>
        </div>
      </section>

      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
          Account Directory ({clients.length})
        </h3>

        {clients.length === 0 ? (
          <p className="text-xs font-mono text-[#F1EBDD]/50 py-12 text-center">
            No enterprise client accounts registered in the database yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clients.map((c) => (
              <div key={c.id} className="p-5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-[#F1EBDD]">{c.company_name}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#68704A]/25 text-[#E8DFCF] border border-[#68704A]/40">
                    {c.status}
                  </span>
                </div>
                <div className="text-xs text-[#F1EBDD]/60 font-sans">
                  {c.industry || 'Enterprise Technology Client'}
                </div>
                <div className="text-[11px] font-mono text-[#F1EBDD]/40 pt-1">
                  ID: {c.id.slice(0, 8)}...
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
