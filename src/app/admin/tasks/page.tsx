import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckSquare,
  Plus,
  Clock,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getTasks } from '@/lib/actions/tasks'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Operational Tasks Backlog | SOMYA Admin System',
  description: 'Operations task backlog, delivery priorities, status tracking, and workforce assignments.',
  path: '/admin/tasks',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function AdminTasksPage() {
  const { data: tasks, count } = await getTasks({ limit: 100 })

  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Operational Tasks Backlog"
        subtitle="Operational workflow tracking, project milestone tasks, and workforce assignments."
      />

      {/* Task Summary Metrics */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#161614] border border-[#2A2A26] space-y-1">
          <span className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase">Total Tasks</span>
          <div className="text-2xl font-bold font-serif text-[#F1EBDD]">{count}</div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/40">Active backlog scope</p>
        </div>

        <div className="p-4 rounded-xl bg-[#161614] border border-[#2A2A26] space-y-1">
          <span className="text-[10px] font-mono text-amber-300 uppercase">In Progress</span>
          <div className="text-2xl font-bold font-serif text-amber-300">
            {tasks.filter((t) => t.status === 'in_progress').length}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/40">Active execution</p>
        </div>

        <div className="p-4 rounded-xl bg-[#161614] border border-[#2A2A26] space-y-1">
          <span className="text-[10px] font-mono text-[#A2AD7B] uppercase">Under Review</span>
          <div className="text-2xl font-bold font-serif text-[#A2AD7B]">
            {tasks.filter((t) => t.status === 'code_review' || t.status === 'testing').length}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/40">Quality assurance</p>
        </div>

        <div className="p-4 rounded-xl bg-[#161614] border border-[#2A2A26] space-y-1">
          <span className="text-[10px] font-mono text-[#68704A] uppercase">Completed</span>
          <div className="text-2xl font-bold font-serif text-[#68704A]">
            {tasks.filter((t) => t.status === 'done').length}
          </div>
          <p className="text-[10px] font-mono text-[#F1EBDD]/40">Closed deliverables</p>
        </div>
      </section>

      {/* Operational Task Table */}
      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#A2AD7B]" />
            <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
              Task Directory ({tasks.length})
            </h3>
          </div>
        </div>

        {tasks.length === 0 ? (
          <p className="text-xs font-mono text-[#F1EBDD]/50 py-12 text-center">
            No operational tasks registered in database yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1B1B18] text-[#F1EBDD]/50 font-mono text-[10px] uppercase border-b border-[#2A2A26]">
                <tr>
                  <th className="px-4 py-3">Task Title</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Assigned To</th>
                  <th className="px-4 py-3">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
                {tasks.map((t) => (
                  <tr key={t.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3.5 font-semibold text-[#F1EBDD]">
                      {t.title}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        t.priority === 'critical'
                          ? 'bg-[#641F2A]/30 text-red-300 border border-[#641F2A]/50'
                          : t.priority === 'high'
                          ? 'bg-amber-950/40 text-amber-300 border border-amber-800/40'
                          : 'bg-white/[0.04] text-[#E8DFCF] border border-[#2A2A26]'
                      }`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#68704A]/20 text-[#E8DFCF] border border-[#68704A]/40 uppercase">
                        {t.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[#E8DFCF]">
                      {(t as any).profiles?.full_name || 'Unassigned'}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[#F1EBDD]/50">
                      {t.due_date ? new Date(t.due_date).toLocaleDateString() : 'None'}
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
