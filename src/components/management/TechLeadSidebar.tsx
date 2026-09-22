'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Terminal,
  Users,
  Shield,
  Clock,
  GitBranch,
  AlertTriangle,
  Package,
  Cpu,
  Server,
  BookOpen,
  Settings,
  LogOut,
  User,
  Activity,
  Layers,
  Building2,
  FolderGit2,
  CheckSquare,
  Key,
  Database,
  HardDrive,
  Share2,
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

interface TechLeadSidebarProps {
  userEmail?: string
  userRole?: AppRole
}

const TECH_LEAD_SECTIONS: NavSection[] = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Engineering Command', href: '/tech-lead', icon: Terminal },
    ],
  },
  {
    title: 'ORGANIZATION',
    items: [
      { label: 'People', href: '/tech-lead/people', icon: Users },
      { label: 'Roles & Permissions', href: '/tech-lead/roles', icon: Shield },
      { label: 'Departments', href: '/admin/departments', icon: Building2 },
      { label: 'Attendance', href: '/admin/attendance', icon: Clock },
      { label: 'Access Control', href: '/tech-lead/roles', icon: Key },
    ],
  },
  {
    title: 'ENGINEERING',
    items: [
      { label: 'Projects', href: '/admin/projects', icon: FolderGit2 },
      { label: 'Tasks', href: '/admin/tasks', icon: CheckSquare },
      { label: 'Sprints', href: '/tech-lead/sprints', icon: GitBranch },
      { label: 'Issues', href: '/tech-lead/issues', icon: AlertTriangle },
      { label: 'Releases', href: '/tech-lead/releases', icon: Package },
      { label: 'Technical Roadmap', href: '/tech-lead/roadmap', icon: Cpu },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { label: 'Authentication', href: '/tech-lead/settings?tab=authentication', icon: Key },
      { label: 'Database', href: '/tech-lead/settings?tab=database', icon: Database },
      { label: 'Storage', href: '/tech-lead/settings?tab=storage', icon: HardDrive },
      { label: 'Integrations', href: '/tech-lead/settings?tab=integrations', icon: Share2 },
      { label: 'System Health', href: '/tech-lead/system-health', icon: Server },
      { label: 'Audit Logs', href: '/tech-lead/audit', icon: Activity },
    ],
  },
  {
    title: 'DOCUMENTATION',
    items: [
      { label: 'Technical Documentation', href: '/tech-lead/docs', icon: BookOpen },
      { label: 'Knowledge Base', href: '/tech-lead/docs?category=knowledge-base', icon: Layers },
    ],
  },
  {
    title: 'CONFIGURATION',
    items: [
      { label: 'System Settings', href: '/tech-lead/settings', icon: Settings },
    ],
  },
]

export function TechLeadSidebar({
  userEmail,
  userRole = 'tech_lead',
}: TechLeadSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#11110F] border-r border-[#2A2A26] flex flex-col justify-between shrink-0 min-h-screen text-xs select-none">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-[#2A2A26]">
          <Link href="/tech-lead" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#641F2A] flex items-center justify-center text-[#F1EBDD] font-serif font-bold text-base shadow-sm">
              S
            </div>
            <div>
              <div className="font-serif font-bold text-sm text-[#F1EBDD] tracking-tight">
                SOMYA
              </div>
              <div className="font-mono text-[10px] tracking-wider text-[#A2AD7B] uppercase">
                TECH COMMAND
              </div>
            </div>
          </Link>

          <div className="mt-4 flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono border bg-[#68704A]/25 text-[#E8DFCF] border-[#68704A]/40">
              TECH LEAD
            </span>
            <span className="text-[10px] font-mono text-[#F1EBDD]/40">
              SUPERAUTHORITY
            </span>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-230px)]">
          {TECH_LEAD_SECTIONS.map((sec) => (
            <div key={sec.title} className="space-y-1">
              <div className="px-3 pb-1 text-[10px] font-mono text-[#F1EBDD]/40 tracking-wider">
                {sec.title}
              </div>
              {sec.items.map((item) => {
                const Icon = item.icon
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/tech-lead' && pathname.startsWith(item.href))

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
              {userEmail || 'System Administrator'}
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
