import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Cpu, GitBranch, Package, CheckCircle2 } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Technical Engineering Roadmap | SOMYA Tech Lead',
  description: 'Architecture evolution roadmap, framework upgrades, and engineering milestones.',
  path: '/tech-lead/roadmap',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

const ROADMAP_ITEMS = [
  {
    phase: 'Phase 1 (In Production)',
    title: 'Turbopack Edge App Router Optimization',
    category: 'Runtime Core',
    status: 'Delivered',
    milestones: ['Zero compilation latency', 'Strict server-action isolation', 'Dynamic SEO route optimization'],
  },
  {
    phase: 'Phase 2 (Active Development)',
    title: 'Biometric WebSocket Realtime Sync Bridge',
    category: 'Workforce Telemetry',
    status: 'In Progress',
    milestones: ['Sub-100ms punch ingestion', 'Offline mobile punch queueing', 'Geolocation boundary fence'],
  },
  {
    phase: 'Phase 3 (Next Sprint)',
    title: 'Zero-Trust Internal IAM & API Token Revocation',
    category: 'Security Architecture',
    status: 'Planning',
    milestones: ['Automated privilege escalation alarms', 'Granular audit streaming to S3', 'Hardware MFA enrollment'],
  },
]

export default function TechLeadRoadmapPage() {
  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Technical Engineering Roadmap"
        subtitle="Architecture evolution roadmap, engineering standards, and framework milestones."
      />

      <div className="space-y-6">
        {ROADMAP_ITEMS.map((item, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[10px] font-mono uppercase text-[#A2AD7B] tracking-wider">
                {item.phase} • {item.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#68704A]/25 text-[#E8DFCF] border border-[#68704A]/40 uppercase w-fit">
                {item.status}
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#F1EBDD] font-serif">{item.title}</h3>

            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-mono text-[#F1EBDD]/40 uppercase">Key Architecture Milestones</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {item.milestones.map((m, mIdx) => (
                  <div key={mIdx} className="p-2.5 rounded-lg bg-[#1B1B18] border border-[#2A2A26] text-xs font-mono text-[#E8DFCF] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A2AD7B] shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
