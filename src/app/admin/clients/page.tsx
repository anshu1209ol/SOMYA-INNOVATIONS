import React from 'react'
import type { Metadata } from 'next'
import { Briefcase, Building, Mail, Phone, ExternalLink } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getClients } from '@/lib/actions/operations'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import { EmptyState } from '@/components/management/EmptyState'

export const metadata: Metadata = createMetadata({
  title: 'Enterprise Clients & Accounts | Operations Admin',
  description: 'Client directory, active account management, and contractual engagement records.',
  path: '/admin/clients',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Enterprise Client Directory"
        subtitle="Manage client relationships, key stakeholders, industries, and active accounts."
      />

      {clients.length === 0 ? (
        <EmptyState
          title="No Clients Registered"
          description="Enterprise client accounts will be displayed here as contractual engagements are created."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm text-[#F1EBDD] tracking-tight">
                    {c.company_name}
                  </h3>
                  <p className="text-[11px] text-[#A2AD7B] font-mono">
                    {c.industry || 'Technology / Industrial'}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#68704A]/25 text-[#E8DFCF] border border-[#68704A]/40 text-[10px] font-mono uppercase">
                  {c.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[#F1EBDD]/70 font-mono">
                {c.contact_name && <div>Contact: {c.contact_name}</div>}
                {c.email && <div>Email: {c.email}</div>}
                {c.city && <div>Location: {c.city}, {c.country || 'India'}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
