'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Layers,
  CheckSquare,
  Users,
  Clock,
  Calendar,
  Building2,
  Package,
  BookOpen,
  FileSpreadsheet,
  BarChart3,
  TrendingUp,
  Activity,
  Bell,
  Settings,
  LogOut,
  User,
  ExternalLink,
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

interface AdminSidebarProps {
  userEmail?: string
  userRole?: AppRole
}

const ADMIN_SECTIONS: NavSection[] = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Operations Command', href: '/admin', icon: LayoutDashboard },
    ],
  },
  {
    title: 'BUSINESS PIPELINE',
    items: [
      { label: 'Enquiries & Leads', href: '/admin/leads', icon: FileText },
      { label: 'Enterprise Clients', href: '/admin/clients', icon: Briefcase },
      { label: 'Formal Quotations', href: '/admin/quotations', icon: FileText },
      { label: 'Active Projects', href: '/admin/projects', icon: Layers },
      { label: 'Operational Tasks', href: '/admin/tasks', icon: CheckSquare },
    ],
  },
  {
    title: 'PEOPLE & WORKFORCE',
    items: [
      { label: 'Workforce Team', href: '/admin/team', icon: Users },
      { label: 'Attendance Hub', href: '/admin/attendance', icon: Clock },
      { label: 'Leave Workflow', href: '/admin/attendance/leave', icon: Calendar },
      { label: 'Company Departments', href: '/admin/departments', icon: Building2 },
    ],
  },
  {
    title: 'OPERATIONS',
    items: [
      { label: 'Commercial Documents', href: '/admin/documents', icon: FileSpreadsheet },
      { label: 'Client Quotations Drafts', href: '/admin/quotations', icon: FileText },
      { label: 'Public Portal Bridge', href: '/', icon: ExternalLink },
    ],
  },
  {
    title: 'REPORTING',
    items: [
      { label: 'Operational Reports', href: '/admin/reports', icon: BarChart3 },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { label: 'Operations Settings', href: '/admin/settings', icon: Settings },
    ],
  },
]

export function AdminSidebar({
  userEmail,
  userRole = 'admin',
}: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#11110F] border-r border-[#2A2A26] flex flex-col justify-between shrink-0 min-h-screen text-xs select-none">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-[#2A2A26]">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#641F2A] flex items-center justify-center text-[#F1EBDD] font-serif font-bold text-base shadow-sm">
              S
            </div>
            <div>
              <div className="font-serif font-bold text-sm text-[#F1EBDD] tracking-tight">
                SOMYA
              </div>
              <div className="font-mono text-[10px] tracking-wider text-[#A2AD7B] uppercase">
                OPERATIONS ADMIN
              </div>
            </div>
          </Link>

          <div className="mt-4 flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono border bg-[#641F2A]/25 text-[#E8DFCF] border-[#641F2A]/40">
              OPERATIONS
            </span>
            <span className="text-[10px] font-mono text-[#F1EBDD]/40">
              v2.4 SECURE
            </span>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-230px)]">
          {ADMIN_SECTIONS.map((sec) => (
            <div key={sec.title} className="space-y-1">
              <div className="px-3 pb-1 text-[10px] font-mono text-[#F1EBDD]/40 tracking-wider">
                {sec.title}
              </div>
              {sec.items.map((item) => {
                const Icon = item.icon
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/admin' && pathname.startsWith(item.href))

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
              {userEmail || 'Operations Admin'}
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
