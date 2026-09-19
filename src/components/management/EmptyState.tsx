'use client'

import React from 'react'
import { FolderX, AlertCircle, Sparkles } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-[#161614] border border-[#2A2A26] my-6">
      <div className="w-12 h-12 rounded-xl bg-[#641F2A]/20 text-[#F1EBDD] flex items-center justify-center mb-4 border border-[#641F2A]/30">
        {icon || <FolderX className="w-6 h-6 text-[#A2AD7B]" />}
      </div>
      <h3 className="text-base font-semibold text-[#F1EBDD] tracking-tight mb-1">
        {title}
      </h3>
      <p className="text-xs text-[#F1EBDD]/60 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="px-4 py-2 rounded-xl bg-[#641F2A] hover:bg-[#852E3B] text-[#F1EBDD] text-xs font-semibold shadow-sm transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
