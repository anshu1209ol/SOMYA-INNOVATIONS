'use client'

import React from 'react'
import Link from 'next/link'
import { Shield, ExternalLink } from 'lucide-react'
import type { AppRole } from '@/types'

interface ManagementHeaderProps {
  title: string
  subtitle?: string
  role?: AppRole
  userEmail?: string
  actions?: React.ReactNode
}

export function ManagementHeader({
  title,
  subtitle,
  role,
  userEmail,
  actions,
}: ManagementHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2A2A26] mb-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A2AD7B] font-bold">
            SOMYA INNOVATIONS
          </span>
          <span className="text-[#F1EBDD]/20">•</span>
          <span className="text-[10px] font-mono text-[#F1EBDD]/40">
            Internal Operations Portal
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#F1EBDD] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-[#F1EBDD]/60 mt-1 max-w-2xl font-sans leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {actions}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161614] border border-[#2A2A26] text-xs font-mono text-[#F1EBDD]/60">
          <Shield className="w-3.5 h-3.5 text-[#68704A]" />
          <span>RLS Active</span>
        </div>
      </div>
    </header>
  )
}
