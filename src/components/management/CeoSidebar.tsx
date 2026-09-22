'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Target,
  Briefcase,
  Layers,
  FileText,
  Users,
  Clock,
  TrendingUp,
  BarChart3,
  Settings,
  LogOut,
  User,
  Shield,
  Compass,
} from 'lucide-react'
import { signOut } from '@/lib/auth/actions'
import type { AppRole } from '@/types'

interface NavSection {
  title: string
  items: {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
    badge?: string
  }[]
}

interface CeoSidebarProps {
  userEmail?: string
  userRole?: AppRole
}

const CEO_SECTIONS: NavSection[] = [
  {
    title: 'EXECUTIVE OVERVIEW',
    items: [
      { label: 'Strategic Briefing', href: '/ceo', icon: Compass },
    ],
  },
  {
    title: 'BUSINESS PORTFOLIO',
    items: [
      { label: 'Enterprise Clients', href: '/ceo/clients', icon: Briefcase },
      { label: 'Commercial Pipeline', href: '/ceo/opportunities', icon: Target },
      { label: 'Contracted Projects', href: '/ceo/projects', icon: Layers },
      { label: 'Pending Quotations', href: '/ceo/quotations', icon: FileText },
    ],
  },
  {
    title: 'PEOPLE & WORKFORCE',
    items: [
      { label: 'Executive Team View', href: '/ceo/team', icon: Users },
      { label: 'Attendance Telemetry', href: '/admin/attendance', icon: Clock },
    ],
  },
  {
    title: 'STRATEGY & GROWTH',
    items: [
      { label: 'Strategic Roadmap', href: '/ceo/strategy', icon: TrendingUp },
    ],
  },
  {
    title: 'EXECUTIVE REPORTS',
    items: [
      { label: 'Governance Reports', href: '/ceo/reports', icon: BarChart3 },
    ],
  },
  {
    title: 'GOVERNANCE',
    items: [
      { label: 'Executive Settings', href: '/ceo/settings', icon: Settings },
    ],
  },
]

export function CeoSidebar({
  userEmail,
  userRole = 'ceo',
}: CeoSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#11110F] border-r border-[#2A2A26] flex flex-col justify-between shrink-0 min-h-screen text-xs select-none">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-[#2A2A26]">
          <Link href="/ceo" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#641F2A] flex items-center justify-center text-[#F1EBDD] font-serif font-bold text-base shadow-sm">
              S
            </div>
            <div>
              <div className="font-serif font-bold text-sm text-[#F1EBDD] tracking-tight">
                SOMYA
              </div>
              <div className="font-mono text-[10px] tracking-wider text-[#A2AD7B] uppercase">
                EXECUTIVE DESK
              </div>
            </div>
          </Link>

          <div className="mt-4 flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono border bg-[#641F2A]/25 text-[#E8DFCF] border-[#641F2A]/40">
              EXECUTIVE
            </span>
            <span className="text-[10px] font-mono text-[#F1EBDD]/40">
              BOARDROOM
            </span>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-230px)]">
          {CEO_SECTIONS.map((sec) => (
            <div key={sec.title} className="space-y-1">
              <div className="px-3 pb-1 text-[10px] font-mono text-[#F1EBDD]/40 tracking-wider">
                {sec.title}
              </div>
              {sec.items.map((item) => {
                const Icon = item.icon
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/ceo' && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all ${
                      isActive
                        ? 'bg-[#641F2A]/25 text-[#F1EBDD] border border-[#641F2A]/40 shadow-sm'
                        : 'text-[#F1EBDD]/70 hover:text-[#F1EBDD] hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#F1EBDD]' : 'text-[#F1EBDD]/50'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-md bg-[#68704A]/30 text-[#E8DFCF] text-[9px] font-mono shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* User Footer & Sign Out */}
      <div className="p-4 border-t border-[#2A2A26] bg-[#161614]/60">
        <Link
          href="/profile"
          className="flex items-center justify-between gap-2 mb-3 p-2 rounded-xl hover:bg-white/[0.04] transition-colors group cursor-pointer"
        >
          <div className="truncate">
            <div className="text-[11px] font-medium text-[#F1EBDD] group-hover:text-white truncate">
              {userEmail || 'Chief Executive'}
            </div>
            <div className="text-[10px] font-mono text-[#A2AD7B] uppercase truncate">
              Role: {userRole}
            </div>
          </div>
          <User className="w-3.5 h-3.5 text-[#F1EBDD]/40 group-hover:text-[#A2AD7B] transition-colors shrink-0" />
        </Link>

        <form action={signOut}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-[#641F2A]/20 hover:text-red-300 text-[#F1EBDD]/60 text-xs font-medium border border-[#2A2A26] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Secure Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  )
}
