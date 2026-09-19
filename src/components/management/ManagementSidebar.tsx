'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Calendar,
  Layers,
  Terminal,
  Server,
  GitBranch,
  AlertTriangle,
  Package,
  FileText,
  Briefcase,
  Shield,
  Clock,
  LogOut,
  ChevronRight,
  ExternalLink,
  Target,
  Sparkles,
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

interface ManagementSidebarProps {
  portal: 'tech-lead' | 'admin' | 'ceo'
  userEmail?: string
  userRole?: AppRole
}

export function ManagementSidebar({
  portal,
  userEmail,
  userRole = 'tech_lead',
}: ManagementSidebarProps) {
  const pathname = usePathname()

  let portalTitle = 'SOMYA TECH COMMAND'
  let portalBadge = 'TECH LEAD'
  let badgeColor = 'bg-[#68704A]/25 text-[#E8DFCF] border-[#68704A]/40'

  if (portal === 'admin') {
    portalTitle = 'SOMYA MANAGEMENT'
    portalBadge = 'OPERATIONS'
    badgeColor = 'bg-[#641F2A]/25 text-[#E8DFCF] border-[#641F2A]/40'
  } else if (portal === 'ceo') {
    portalTitle = 'SOMYA EXECUTIVE'
    portalBadge = 'EXECUTIVE'
    badgeColor = 'bg-[#641F2A]/25 text-[#E8DFCF] border-[#641F2A]/40'
  }

  const sections: NavSection[] = []

  if (portal === 'tech-lead') {
    sections.push({
      title: 'OVERVIEW',
      items: [
        { label: 'System Telemetry', href: '/tech-lead', icon: Terminal },
      ],
    })
    sections.push({
      title: 'ORGANIZATION',
      items: [
        { label: 'People & Access', href: '/tech-lead/people', icon: Users },
        { label: 'Attendance Hub', href: '/admin/attendance', icon: Clock },
        { label: 'Audit Ledger', href: '/tech-lead/audit', icon: Shield },
      ],
    })
    sections.push({
      title: 'ENGINEERING',
      items: [
        { label: 'Sprints & Kanban', href: '/tech-lead/sprints', icon: GitBranch },
        { label: 'Technical Issues', href: '/tech-lead/issues', icon: AlertTriangle },
        { label: 'Releases', href: '/tech-lead/releases', icon: Package },
      ],
    })
    sections.push({
      title: 'PORTAL BRIDGES',
      items: [
        { label: 'Operations Admin', href: '/admin', icon: Briefcase },
        { label: 'CEO Executive Desk', href: '/ceo', icon: Target },
      ],
    })
  } else if (portal === 'admin') {
    sections.push({
      title: 'OVERVIEW',
      items: [
        { label: 'Operations Dashboard', href: '/admin', icon: LayoutDashboard },
      ],
    })
    sections.push({
      title: 'BUSINESS PIPELINE',
      items: [
        { label: 'Enquiries & Leads', href: '/admin/leads', icon: FileText },
        { label: 'Enterprise Clients', href: '/admin/clients', icon: Briefcase },
        { label: 'Quotations', href: '/admin/quotations', icon: FileText },
        { label: 'Projects', href: '/admin/projects', icon: Layers },
      ],
    })
    sections.push({
      title: 'WORKFORCE',
      items: [
        { label: 'Attendance & Punches', href: '/admin/attendance', icon: Clock },
        { label: 'Team Directory', href: '/tech-lead/people', icon: Users },
      ],
    })
    sections.push({
      title: 'PORTAL BRIDGES',
      items: [
        { label: 'Tech Lead Console', href: '/tech-lead', icon: Terminal },
        { label: 'Public Website', href: '/', icon: ExternalLink },
      ],
    })
  } else {
    sections.push({
      title: 'OVERVIEW',
      items: [
        { label: 'Strategic Briefing', href: '/ceo', icon: Target },
      ],
    })
    sections.push({
      title: 'BUSINESS PORTFOLIO',
      items: [
        { label: 'Clients & Accounts', href: '/admin/clients', icon: Briefcase },
        { label: 'Active Projects', href: '/admin/projects', icon: Layers },
        { label: 'Pending Quotations', href: '/admin/quotations', icon: FileText },
      ],
    })
    sections.push({
      title: 'ORGANIZATION',
      items: [
        { label: 'Workforce Directory', href: '/tech-lead/people', icon: Users },
        { label: 'Attendance Overview', href: '/admin/attendance', icon: Clock },
      ],
    })
    sections.push({
      title: 'PORTAL BRIDGES',
      items: [
        { label: 'Operations Hub', href: '/admin', icon: Briefcase },
        { label: 'Tech Command', href: '/tech-lead', icon: Terminal },
      ],
    })
  }

  return (
    <aside className="w-64 bg-[#11110F] border-r border-[#2A2A26] flex flex-col justify-between shrink-0 min-h-screen text-xs select-none">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-[#2A2A26]">
          <Link href={`/${portal}`} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#641F2A] flex items-center justify-center text-[#F1EBDD] font-serif font-bold text-base shadow-sm">
              S
            </div>
            <div>
              <div className="font-serif font-bold text-sm text-[#F1EBDD] tracking-tight">
                SOMYA
              </div>
              <div className="font-mono text-[10px] tracking-wider text-[#F1EBDD]/60 uppercase">
                {portalTitle.replace('SOMYA ', '')}
              </div>
            </div>
          </Link>

          <div className="mt-4 flex items-center justify-between">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${badgeColor}`}>
              {portalBadge}
            </span>
            <span className="text-[10px] font-mono text-[#F1EBDD]/40">
              v2.4 SECURE
            </span>
          </div>
        </div>

        {/* Navigation Section Groups */}
        <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-220px)]">
          {sections.map((sec) => (
            <div key={sec.title} className="space-y-1">
              <div className="px-3 pb-1 text-[10px] font-mono text-[#F1EBDD]/40 tracking-wider">
                {sec.title}
              </div>
              {sec.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || (item.href !== `/${portal}` && pathname.startsWith(item.href))
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
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#F1EBDD]' : 'text-[#F1EBDD]/50'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 rounded-md bg-[#68704A]/30 text-[#E8DFCF] text-[9px] font-mono">
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
        <div className="flex items-center justify-between gap-2 mb-3 px-2">
          <div className="truncate">
            <div className="text-[11px] font-medium text-[#F1EBDD] truncate">
              {userEmail || 'Internal Staff'}
            </div>
            <div className="text-[10px] font-mono text-[#68704A] uppercase truncate">
              Role: {userRole}
            </div>
          </div>
        </div>

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
