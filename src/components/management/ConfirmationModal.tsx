'use client'

import React, { useState } from 'react'
import { AlertTriangle, X, ShieldAlert, Loader2 } from 'lucide-react'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason: string, typedText: string) => Promise<void>
  title: string
  warningMessage: string
  requiredTypedConfirmation?: string
  confirmButtonText?: string
  danger?: boolean
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  warningMessage,
  requiredTypedConfirmation = 'TERMINATE',
  confirmButtonText = 'Confirm Termination',
  danger = true,
}: ConfirmationModalProps) {
  const [reason, setReason] = useState('')
  const [typedInput, setTypedInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const isTypedMatch = requiredTypedConfirmation
    ? typedInput.trim() === requiredTypedConfirmation
    : true

  const isFormValid = isTypedMatch && reason.trim().length >= 5 && !isSubmitting

  async function handleConfirm() {
    if (!isFormValid) return
    setIsSubmitting(true)
    setError(null)
    try {
      await onConfirm(reason, typedInput)
      onClose()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Action failed'
      setError(msg)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-[#161614] border border-[#2A2A26] shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${danger ? 'bg-[#641F2A]/30 text-[#F1EBDD] border border-[#641F2A]/50' : 'bg-[#68704A]/30 text-[#F1EBDD] border border-[#68704A]/50'}`}>
              <ShieldAlert className="w-5 h-5 text-[#F1EBDD]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F1EBDD] tracking-tight">
                {title}
              </h3>
              <p className="text-xs font-mono text-[#F1EBDD]/60 mt-0.5">
                Authorized Executive Action
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1 rounded-lg text-[#F1EBDD]/40 hover:text-[#F1EBDD] hover:bg-white/[0.05] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Callout */}
        <div className="p-4 rounded-xl bg-[#641F2A]/15 border border-[#641F2A]/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F1EBDD]">
            <AlertTriangle className="w-4 h-4 text-[#E8DFCF] shrink-0" />
            <span>Permanent Compliance Record</span>
          </div>
          <p className="text-xs text-[#F1EBDD]/80 leading-relaxed">
            {warningMessage}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/40 text-red-200 text-xs">
            {error}
          </div>
        )}

        {/* Form Inputs */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-[#F1EBDD] mb-1.5">
              Reason / Administrative Justification <span className="text-[#641F2A]">*</span>
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="State formal operational or compliance reason (minimum 5 characters)..."
              disabled={isSubmitting}
              className="w-full px-3 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] placeholder:text-[#F1EBDD]/30 focus:outline-none focus:border-[#641F2A] transition-colors resize-none"
            />
          </div>

          {requiredTypedConfirmation && (
            <div>
              <label className="block font-medium text-[#F1EBDD] mb-1.5">
                Type <span className="font-mono text-[#641F2A] font-bold">{requiredTypedConfirmation}</span> to confirm authorization <span className="text-[#641F2A]">*</span>
              </label>
              <input
                type="text"
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                placeholder={`Type ${requiredTypedConfirmation}`}
                disabled={isSubmitting}
                className="w-full px-3 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] font-mono placeholder:text-[#F1EBDD]/30 focus:outline-none focus:border-[#641F2A] transition-colors"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#2A2A26]">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl bg-transparent hover:bg-white/[0.05] text-[#F1EBDD]/70 hover:text-[#F1EBDD] text-xs font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!isFormValid}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-[#F1EBDD] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md ${danger ? 'bg-[#641F2A] hover:bg-[#852E3B]' : 'bg-[#68704A] hover:bg-[#7D8759]'}`}
          >
            {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{confirmButtonText}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
