import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Server, Shield, Layers, ArrowRight } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Systems Architecture Documentation | SOMYA Tech Lead',
  description: 'Technical documentation, security standards, database schemas, and engineering guidelines.',
  path: '/tech-lead/docs',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

const DOC_TOPICS = [
  {
    title: 'Next.js 16 App Router & Shell Isolation',
    category: 'Application Architecture',
    description: 'Guidelines on isolating public marketing layouts from internal management systems via path-aware shells and proxy routing.',
  },
  {
    title: 'Row-Level Security (RLS) & Role Hierarchy',
    category: 'Security Architecture',
    description: 'Enforcement rules for Tech Lead superauthority, CEO strategic visibility, and Admin operational scoping.',
  },
  {
    title: 'Biometric Attendance Schema & QR Ingestion',
    category: 'Data Pipeline',
    description: 'Centralized attendance architecture uniting employee profiles, shift punch timestamps, and status calculation.',
  },
  {
    title: 'Quiet Luxury Design Tokens & Theme Standards',
    category: 'Design Engineering',
    description: 'Strict palette compliance: #11110F, #161614, #1B1B18, #2A2A26, #641F2A, #68704A, #F1EBDD, and absolute prohibition of blue utility classes.',
  },
]

export default function TechLeadDocsPage() {
  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Systems Architecture Documentation"
        subtitle="Engineering guidelines, technical standards, security architecture, and system documentation."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DOC_TOPICS.map((topic, i) => (
          <div key={i} className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-3">
            <span className="text-[10px] font-mono uppercase text-[#A2AD7B] tracking-wider">
              {topic.category}
            </span>
            <h3 className="text-base font-bold text-[#F1EBDD] font-serif">{topic.title}</h3>
            <p className="text-xs text-[#F1EBDD]/60 font-sans leading-relaxed">
              {topic.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
