import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Layers, Shield, Calendar, ArrowRight } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getProjects } from '@/lib/actions/projects'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Contracted Projects Delivery | SOMYA CEO System',
  description: 'Executive project portfolio, delivery health metrics, and strategic milestones.',
  path: '/ceo/projects',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function CeoProjectsPage() {
  const { data: projects } = await getProjects({ limit: 50 })

  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Contracted Projects Portfolio"
        subtitle="Executive governance of contracted client engagements and delivery health."
      />

      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#A2AD7B]" />
            <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
              Active Engagements ({projects.length})
            </h3>
          </div>
        </div>

        {projects.length === 0 ? (
          <p className="text-xs font-mono text-[#F1EBDD]/50 py-12 text-center">
            No contracted projects currently registered in the database.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div key={p.id} className="p-5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-[#F1EBDD]">{p.name}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#68704A]/25 text-[#E8DFCF] border border-[#68704A]/40">
                    {p.status}
                  </span>
                </div>
                <div className="w-full bg-white/[0.05] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#68704A] h-full rounded-full transition-all"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#F1EBDD]/50 pt-1">
                  <span>Priority: {p.priority}</span>
                  <span>Progress: {p.progress}%</span>
                  <span>Target: {p.target_date ? new Date(p.target_date).toLocaleDateString() : 'TBD'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
