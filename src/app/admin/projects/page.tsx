import React from 'react'
import type { Metadata } from 'next'
import { Layers, Calendar, CheckCircle2, Clock } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { createClient } from '@/lib/supabase/server'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import { EmptyState } from '@/components/management/EmptyState'
import type { Project } from '@/types'

export const metadata: Metadata = createMetadata({
  title: 'Client Projects & Delivery | Operations Admin',
  description: 'Enterprise projects overview, milestone tracking, and delivery timelines.',
  path: '/admin/projects',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function AdminProjectsPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
  const projects = (data as Project[]) || []

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Enterprise Projects & Delivery"
        subtitle="Manage client software implementations, delivery milestones, and resource allocation."
      />

      {projects.length === 0 ? (
        <EmptyState
          title="No Active Projects"
          description="Projects will be listed here as client contracts and delivery roadmaps are launched."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-sm text-[#F1EBDD] tracking-tight">
                  {p.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#68704A]/25 text-[#E8DFCF] border border-[#68704A]/40 text-[10px] font-mono uppercase">
                  {p.status}
                </span>
              </div>

              {p.description && (
                <p className="text-xs text-[#F1EBDD]/60 leading-relaxed font-sans line-clamp-2">
                  {p.description}
                </p>
              )}

              <div className="pt-2 border-t border-[#2A2A26] flex items-center justify-between text-[11px] font-mono text-[#F1EBDD]/50">
                <span>Priority: {p.priority}</span>
                <span>Progress: {p.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
