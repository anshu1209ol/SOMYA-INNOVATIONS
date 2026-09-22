'use client'

import React, { useState, useEffect } from 'react'
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Clock,
  CalendarX,
  AlertTriangle,
  Building2,
  Users
} from 'lucide-react'
import { getEmployees } from '@/lib/actions/attendance'
import { AttendanceNav } from '@/components/attendance/AttendanceNav'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import type { Employee } from '@/types'

export default function AttendanceCalendarPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [selectedDept, setSelectedDept] = useState<string>('ALL')
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2026, 8, 1)) // Sep 2026

  useEffect(() => {
    async function load() {
      const data = await getEmployees()
      setEmployees(data)
    }
    load()
  }, [])

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const startDayOfWeek = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const paddingDays = Array.from({ length: startDayOfWeek }, (_, i) => i)

  const filteredEmployees = employees.filter(e => selectedDept === 'ALL' || e.dept === selectedDept)

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Workforce Attendance Calendar"
        subtitle="Monthly enterprise calendar schedule, holidays, approved leaves, and historical presence telemetry."
      />

      <AttendanceNav />

      {/* Controls & Department Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#161614] border border-[#2A2A26] flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Month Navigation */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="p-2 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD]/70 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD]/70 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm font-bold font-serif text-[#F1EBDD] tracking-wide">
            {monthName}
          </span>
        </div>

        {/* Legend & Department Filter */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3 text-[10px] font-mono text-[#F1EBDD]/60">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#68704A]" />
              Present (≥ 90%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Late / Shifts
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#641F2A]" />
              Leaves
            </span>
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-xs text-[#F1EBDD] focus:outline-none focus:border-[#641F2A]"
          >
            <option value="ALL">All Departments</option>
            <option value="AI Engineering">AI Engineering</option>
            <option value="IT Infrastructure">IT Infrastructure</option>
            <option value="Digital Engineering">Digital Engineering</option>
            <option value="Sales & Client Success">Sales & Client Success</option>
            <option value="Security">Security</option>
          </select>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-mono uppercase text-[#F1EBDD]/50 border-b border-[#2A2A26] pb-2">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {paddingDays.map((_, i) => (
            <div key={`pad-${i}`} className="h-24 rounded-xl bg-[#1B1B18]/30 border border-[#2A2A26]/20 p-2 opacity-30" />
          ))}

          {calendarDays.map((day) => {
            const isWeekend = (startDayOfWeek + day - 1) % 7 === 0 || (startDayOfWeek + day - 1) % 7 === 6
            const isToday = day === 21 // Sep 21

            return (
              <div
                key={day}
                className={`h-24 rounded-xl p-2.5 border flex flex-col justify-between transition-all ${
                  isToday
                    ? 'bg-[#641F2A]/15 border-[#641F2A] shadow-sm'
                    : isWeekend
                    ? 'bg-[#1B1B18]/40 border-[#2A2A26]/40 text-[#F1EBDD]/40'
                    : 'bg-[#1B1B18] border-[#2A2A26] hover:border-[#641F2A]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold ${isToday ? 'text-[#A2AD7B]' : 'text-[#F1EBDD]'}`}>
                    {day}
                  </span>
                  {isToday && (
                    <span className="text-[9px] font-mono uppercase px-1 rounded bg-[#641F2A] text-[#F1EBDD]">
                      Today
                    </span>
                  )}
                </div>

                {!isWeekend ? (
                  <div className="space-y-1 text-[10px] font-mono">
                    <div className="flex items-center justify-between text-[#A2AD7B]">
                      <span>Present:</span>
                      <span className="font-bold">{Math.max(1, filteredEmployees.length - (day % 3))}</span>
                    </div>
                    {day % 4 === 0 && (
                      <div className="text-[9px] text-[#FFA5B3] truncate">
                        1 on Leave
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-[9px] font-mono text-[#F1EBDD]/30 uppercase">
                    Weekend
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
