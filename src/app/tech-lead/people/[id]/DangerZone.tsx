'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ShieldAlert,
  UserX,
  AlertTriangle,
  RotateCcw,
  PauseCircle,
  PlayCircle,
  Loader2,
  CheckCircle2,
} from 'lucide-react'
import { ConfirmationModal } from '@/components/management/ConfirmationModal'
import { terminateUser, suspendUser, restoreUser } from '@/lib/actions/users'

interface DangerZoneProps {
  userId: string
  userEmail: string
  userName: string
  status: 'invited' | 'active' | 'suspended' | 'terminated'
  currentCallerId?: string
}

export function DangerZone({
  userId,
  userEmail,
  userName,
  status,
  currentCallerId,
}: DangerZoneProps) {
  const router = useRouter()
  const [isTerminateModalOpen, setIsTerminateModalOpen] = useState(false)
  const [isActionLoading, setIsActionLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const isSelf = currentCallerId === userId

  async function handleTerminate(reason: string, typedText: string) {
    setIsActionLoading(true)
    setFeedback(null)
    try {
      const res = await terminateUser(userId, reason, typedText)
      if (!res.success) {
        setFeedback({ type: 'error', message: res.error || 'Termination failed' })
      } else {
        setFeedback({
          type: 'success',
          message: `User ${userName} has been successfully terminated. Access is revoked and an immutable audit record was generated.`,
        })
        router.refresh()
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Termination failed'
      setFeedback({ type: 'error', message: msg })
    } finally {
      setIsActionLoading(false)
    }
  }

  async function handleSuspend() {
    const reason = window.prompt(`Enter reason for suspending access for ${userName}:`)
    if (!reason) return

    setIsActionLoading(true)
    setFeedback(null)
    try {
      const res = await suspendUser(userId, reason)
      if (!res.success) {
        setFeedback({ type: 'error', message: res.error || 'Suspension failed' })
      } else {
        setFeedback({ type: 'success', message: `User access suspended successfully.` })
        router.refresh()
      }
    } catch (err: unknown) {
      setFeedback({ type: 'error', message: err instanceof Error ? err.message : 'Suspension failed' })
    } finally {
      setIsActionLoading(false)
    }
  }

  async function handleRestore() {
    if (!window.confirm(`Reactivate user access for ${userName}?`)) return

    setIsActionLoading(true)
    setFeedback(null)
    try {
      const res = await restoreUser(userId)
      if (!res.success) {
        setFeedback({ type: 'error', message: res.error || 'Reinstatement failed' })
      } else {
        setFeedback({ type: 'success', message: `User access has been restored to Active.` })
        router.refresh()
      }
    } catch (err: unknown) {
      setFeedback({ type: 'error', message: err instanceof Error ? err.message : 'Reinstatement failed' })
    } finally {
      setIsActionLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-red-950/60 bg-red-950/10 p-6 sm:p-8 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-400 text-xs font-mono uppercase tracking-wider mb-1 font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>Administrative Governance & Danger Zone</span>
          </div>
          <h3 className="text-lg font-bold text-[#F1EBDD] tracking-tight">
            Security Status & Account Revocation
          </h3>
          <p className="text-xs text-[#F1EBDD]/60 max-w-xl mt-1 leading-relaxed">
            Suspend access temporarily or execute permanent account termination. Historical records (projects, tasks, attendance, comments) will remain preserved in the compliance audit ledger.
          </p>
        </div>

        {isSelf && (
          <span className="px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-300 text-[11px] font-mono shrink-0">
            Self-Protection Active
          </span>
        )}
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-[#68704A]/25 border border-[#68704A]/40 text-[#E8DFCF]'
              : 'bg-[#641F2A]/30 border border-[#641F2A]/50 text-red-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-[#A2AD7B] shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        {status === 'active' && (
          <button
            type="button"
            onClick={handleSuspend}
            disabled={isSelf || isActionLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 text-amber-200 border border-amber-800/50 text-xs font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <PauseCircle className="w-4 h-4" />
            <span>Suspend User Access</span>
          </button>
        )}

        {(status === 'suspended' || status === 'terminated') && (
          <button
            type="button"
            onClick={handleRestore}
            disabled={isActionLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#68704A]/30 hover:bg-[#68704A]/50 text-[#E8DFCF] border border-[#68704A]/50 text-xs font-semibold transition-colors disabled:opacity-30"
          >
            <PlayCircle className="w-4 h-4 text-[#A2AD7B]" />
            <span>Restore Active Access</span>
          </button>
        )}

        {status !== 'terminated' && (
          <button
            type="button"
            onClick={() => setIsTerminateModalOpen(true)}
            disabled={isSelf || isActionLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#641F2A] hover:bg-[#852E3B] text-[#F1EBDD] text-xs font-semibold shadow-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <UserX className="w-4 h-4" />
            <span>Terminate User Account</span>
          </button>
        )}
      </div>

      {isSelf && (
        <p className="text-[11px] font-mono text-zinc-500">
          * Privileged accounts cannot terminate or suspend themselves. Ask another authorized Tech Lead to adjust this account.
        </p>
      )}

      {/* Modal Dialog */}
      <ConfirmationModal
        isOpen={isTerminateModalOpen}
        onClose={() => setIsTerminateModalOpen(false)}
        onConfirm={handleTerminate}
        title={`Terminate Account for ${userName}`}
        warningMessage="This will immediately revoke this user's access to SOMYA systems. Historical records such as projects, tasks, attendance, comments and audit records will be preserved. This action should only be performed when authorized."
        requiredTypedConfirmation="TERMINATE"
        confirmButtonText="Execute Termination"
      />
    </div>
  )
}
