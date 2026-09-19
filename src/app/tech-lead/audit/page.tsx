import React from 'react'
import type { Metadata } from 'next'
import { Shield, Lock, FileText, CheckCircle2, Clock } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getAuditLogs } from '@/lib/actions/audit'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import { EmptyState } from '@/components/management/EmptyState'

export const metadata: Metadata = createMetadata({
  title: 'Immutable Compliance Audit Ledger | Tech Lead',
  description: 'Chronological record of sensitive administrative, governance, and security events.',
  path: '/tech-lead/audit',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function AuditLedgerPage() {
  const logs = await getAuditLogs(100)

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Immutable Compliance Audit Ledger"
        subtitle="Cryptographically sealed log of administrative authorizations, role assignments, and lifecycle terminations."
      />

      {/* Compliance Information Card */}
      <div className="p-4 rounded-2xl bg-[#161614] border border-[#2A2A26] flex items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2.5 text-[#F1EBDD]/80">
          <Lock className="w-4 h-4 text-[#A2AD7B] shrink-0" />
          <span>Security Policy: Audit rows are write-only with zero update or delete privileges under PostgreSQL RLS.</span>
        </div>
        <span className="text-[10px] text-[#A2AD7B] shrink-0 font-bold">
          TOTAL ENTRIES: {logs.length}
        </span>
      </div>

      {logs.length === 0 ? (
        <EmptyState
          title="Audit Ledger Clean"
          description="No security exceptions or administrative events recorded yet. Lifecycle operations will be tracked here automatically."
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#2A2A26] bg-[#161614]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1B1B18] text-[#F1EBDD]/60 font-mono text-[11px] border-b border-[#2A2A26]">
              <tr>
                <th className="px-5 py-3.5 font-medium">Timestamp</th>
                <th className="px-5 py-3.5 font-medium">Action Event</th>
                <th className="px-5 py-3.5 font-medium">Target Entity</th>
                <th className="px-5 py-3.5 font-medium">Administrative Reason</th>
                <th className="px-5 py-3.5 font-medium">Actor Identity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5 font-mono text-[11px] text-[#F1EBDD]/60 whitespace-nowrap">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold ${
                        log.action.includes('TERMINATE')
                          ? 'bg-[#641F2A]/30 text-red-300 border border-[#641F2A]/50'
                          : log.action.includes('SUSPEND')
                          ? 'bg-amber-950/40 text-amber-300 border border-amber-800/40'
                          : 'bg-[#68704A]/25 text-[#E8DFCF] border border-[#68704A]/40'
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[11px] text-zinc-300">
                    {log.entity_type}: {log.target_user_id || log.entity_id || 'System'}
                  </td>
                  <td className="px-5 py-3.5 text-zinc-300 max-w-xs truncate">
                    {log.reason || 'Standard system action'}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[11px] text-[#F1EBDD]/50">
                    {log.actor_id ? `${log.actor_id.slice(0, 8)}...` : 'Automated System'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
