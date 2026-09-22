import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { TrendingUp, Compass, Target, CheckCircle2 } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Strategic Roadmap & Priorities | SOMYA CEO System',
  description: 'Corporate initiatives roadmap, growth horizons, and strategic priorities governance.',
  path: '/ceo/strategy',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

const INITIATIVES = [
  {
    horizon: 'Horizon 1 (Current Quarter)',
    title: 'Enterprise AI Inspection Industrial Rollout',
    lead: 'Technology Leadership',
    status: 'In Production',
    target: 'Q4 2026',
    description: 'Autonomous edge vision inspection appliances staged for deployment in regional manufacturing plants.',
  },
  {
    horizon: 'Horizon 1 (Current Quarter)',
    title: 'Zero-Trust Campus Network Implementations',
    lead: 'Infrastructure Practice',
    status: 'Active Delivery',
    target: 'Q4 2026',
    description: 'Hardware provisioning and network perimeter security for institutional partners.',
  },
  {
    horizon: 'Horizon 2 (Next 2 Quarters)',
    title: 'Cloud Managed Services & SLA Retainers',
    lead: 'Operations & Commercial',
    status: 'Contracting',
    target: 'Q1 2027',
    description: 'Converting one-off digital delivery engagements into multi-year recurring managed infrastructure agreements.',
  },
  {
    horizon: 'Horizon 3 (Long-Term)',
    title: 'Proprietary Enterprise AI SaaS Hub',
    lead: 'Digital Solutions Practice',
    status: 'R&D Phase',
    target: 'Q2 2027',
    description: 'Commercializing internal developer tools and automation agents into client-facing subscription software.',
  },
]

export default function CeoStrategyPage() {
  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Corporate Strategic Roadmap"
        subtitle="Long-term growth horizons, quarterly strategic priorities, and enterprise practice expansion."
      />

      <div className="space-y-6">
        {INITIATIVES.map((init, i) => (
          <div key={i} className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[10px] font-mono uppercase text-[#A2AD7B] tracking-wider">
                {init.horizon}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#68704A]/25 text-[#E8DFCF] border border-[#68704A]/40 uppercase w-fit">
                {init.status}
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#F1EBDD] font-serif">{init.title}</h3>
            <p className="text-xs text-[#F1EBDD]/70 font-sans leading-relaxed">
              {init.description}
            </p>

            <div className="pt-3 border-t border-[#2A2A26] flex items-center justify-between text-[11px] font-mono text-[#F1EBDD]/50">
              <span>Lead: {init.lead}</span>
              <span className="text-[#A2AD7B]">Target: {init.target}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
