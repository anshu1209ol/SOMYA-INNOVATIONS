import React from 'react'
import type { Metadata } from 'next'
import { GitBranch, Plus, Layers, CheckCircle2, Clock } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getSprints, getEngineeringTasks } from '@/lib/actions/engineering'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import { EmptyState } from '@/components/management/EmptyState'

export const metadata: Metadata = createMetadata({
  title: 'Sprints & Kanban Engine | Tech Lead',
  description: 'Manage engineering sprints, track task progression, and review velocity across code review and QA stages.',
  path: '/tech-lead/sprints',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

const KANBAN_COLUMNS: { id: string; label: string }[] = [
  { id: 'backlog', label: 'BACKLOG' },
  { id: 'todo', label: 'TO DO' },
  { id: 'in_progress', label: 'IN PROGRESS' },
  { id: 'code_review', label: 'CODE REVIEW' },
  { id: 'testing', label: 'TESTING / QA' },
  { id: 'done', label: 'DONE' },
]

export default async function SprintsKanbanPage() {
  const [sprints, tasks] = await Promise.all([getSprints(), getEngineeringTasks()])
  const activeSprint = sprints.find((s) => s.status === 'active') || sprints[0]

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Engineering Sprints & Kanban"
        subtitle={
          activeSprint
            ? `Active Sprint: ${activeSprint.name} ${activeSprint.goal ? `— Goal: "${activeSprint.goal}"` : ''}`
            : 'Plan, execute, and monitor engineering sprints with strict quality gates.'
        }
      />

      {tasks.length === 0 ? (
        <EmptyState
          title="No Active Sprint Tasks"
          description="The engineering sprint backlog is currently clear. Tasks will appear here as features and issues are prioritized."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {KANBAN_COLUMNS.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id)
            return (
              <div
                key={col.id}
                className="rounded-2xl bg-[#161614] border border-[#2A2A26] p-4 space-y-3 flex flex-col justify-between min-w-[220px]"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#2A2A26] mb-3">
                    <span className="text-[11px] font-mono font-bold text-[#F1EBDD] uppercase tracking-wider">
                      {col.label}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-[10px] font-mono text-[#F1EBDD]/60">
                      {colTasks.length}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {colTasks.length === 0 ? (
                      <p className="text-[11px] font-mono text-[#F1EBDD]/30 py-6 text-center">
                        Empty stage
                      </p>
                    ) : (
                      colTasks.map((t) => (
                        <div
                          key={t.id}
                          className="p-3.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-2 shadow-sm hover:border-[#68704A]/60 transition-all cursor-pointer"
                        >
                          <div className="font-semibold text-xs text-[#F1EBDD] leading-snug">
                            {t.title}
                          </div>
                          {t.description && (
                            <p className="text-[11px] text-[#F1EBDD]/60 line-clamp-2 leading-relaxed">
                              {t.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-[#F1EBDD]/50">
                            <span className="uppercase text-[#A2AD7B]">
                              {t.priority}
                            </span>
                            {t.due_date && (
                              <span>Due {new Date(t.due_date).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
