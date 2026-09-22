'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Clock,
  Users,
  Calendar,
  FileText,
  CalendarX,
  Settings,
  QrCode,
  ShieldCheck,
  Building2
} from 'lucide-react'

export function AttendanceNav() {
  const pathname = usePathname()

  const tabs = [
    { label: 'Overview', href: '/admin/attendance', icon: LayoutDashboard, exact: true },
    { label: 'Today & Shift Punches', href: '/admin/attendance/today', icon: Clock },
    { label: 'Employees', href: '/admin/attendance/employees', icon: Users },
    { label: 'Calendar', href: '/admin/attendance/calendar', icon: Calendar },
    { label: 'Reports', href: '/admin/attendance/reports', icon: FileText },
    { label: 'Leave Workflow', href: '/admin/attendance/leave', icon: CalendarX },
    { label: 'Settings', href: '/admin/attendance/settings', icon: Settings },
  ]

  return (
    <div className="border-b border-[#2A2A26] pb-4 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {tabs.map((tab) => {
            const isActive = tab.exact
              ? pathname === tab.href
              : pathname === tab.href || pathname.startsWith(`${tab.href}/`)

            const Icon = tab.icon

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#641F2A] text-[#F1EBDD] font-semibold shadow-sm'
                    : 'bg-[#161614] text-[#F1EBDD]/60 hover:text-[#F1EBDD] hover:bg-white/[0.05] border border-[#2A2A26]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F1EBDD]' : 'text-[#F1EBDD]/50'}`} />
                <span>{tab.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Live Status Indicators */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] font-mono text-[#F1EBDD]/50">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#68704A] animate-pulse" />
            Central DB Sync
          </span>
          <span className="text-[#F1EBDD]/20">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#A2AD7B]" />
            Enterprise RLS Protected
          </span>
        </div>
      </div>
    </div>
  )
}
