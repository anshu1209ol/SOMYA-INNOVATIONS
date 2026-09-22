'use client'

import React, { useState, useEffect } from 'react'
import {
  FileText,
  Download,
  Calendar,
  Building2,
  Users,
  CheckCircle2,
  Filter,
  ArrowDownToLine,
  Layers
} from 'lucide-react'
import { getEmployees, getAttendanceMetrics } from '@/lib/actions/attendance'
import { AttendanceNav } from '@/components/attendance/AttendanceNav'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import type { Employee } from '@/types'

export default function AttendanceReportsPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [reportType, setReportType] = useState<'daily' | 'weekly' | 'monthly' | 'department'>('daily')
  const [selectedDept, setSelectedDept] = useState<string>('ALL')

  useEffect(() => {
    async function load() {
      const data = await getEmployees()
      setEmployees(data)
    }
    load()
  }, [])

  const filteredEmployees = employees.filter(e => selectedDept === 'ALL' || e.dept === selectedDept)

  // Export JSON
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredEmployees, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `somya_attendance_${reportType}_${new Date().toISOString().slice(0, 10)}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  // Export CSV
  const handleExportCsv = () => {
    const headers = ['ID', 'Name', 'Department', 'Role', 'Status', 'CheckIn', 'Hours', 'Location']
    const rows = filteredEmployees.map(e => [
      e.id,
      `"${e.name}"`,
      `"${e.dept}"`,
      `"${e.role}"`,
      e.status,
      e.check_in || '--',
      e.hours || '8h 00m',
      `"${e.location || 'HQ'}"`
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', csvContent)
    downloadAnchor.setAttribute('download', `somya_attendance_${reportType}_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Attendance Reporting & Audits"
        subtitle="Generate, preview, and download formal attendance audits across departments, weekly telemetry, and shift durations."
      />

      <AttendanceNav />

      {/* Report Controls & Download Station */}
      <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#F1EBDD] uppercase font-mono tracking-wider">
            Export Format & Report Scope
          </h3>
          <div className="flex flex-wrap gap-2">
            {(['daily', 'weekly', 'monthly', 'department'] as const).map(t => (
              <button
                key={t}
                onClick={() => setReportType(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase font-semibold transition-all cursor-pointer ${
                  reportType === t
                    ? 'bg-[#641F2A] text-[#F1EBDD]'
                    : 'bg-[#1B1B18] text-[#F1EBDD]/60 hover:text-white border border-[#2A2A26]'
                }`}
              >
                {t} Report
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-xs text-[#F1EBDD] focus:outline-none focus:border-[#641F2A]"
          >
            <option value="ALL">All Departments</option>
            <option value="AI Engineering">AI Engineering</option>
            <option value="IT Infrastructure">IT Infrastructure</option>
            <option value="Digital Engineering">Digital Engineering</option>
            <option value="Sales & Client Success">Sales & Client Success</option>
            <option value="Security">Security</option>
          </select>

          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-xl bg-[#68704A] hover:bg-[#575e3e] text-[#F1EBDD] text-xs font-mono font-semibold flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <ArrowDownToLine className="w-4 h-4" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleExportJson}
            className="px-4 py-2.5 rounded-xl bg-[#1B1B18] hover:bg-[#23231F] text-[#F1EBDD] text-xs font-mono font-semibold border border-[#2A2A26] flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#A2AD7B]" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Report Summary Audit Preview */}
      <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-[#F1EBDD] uppercase font-mono">
              {reportType.toUpperCase()} Audit Register Preview
            </h4>
            <p className="text-xs text-[#F1EBDD]/60">
              Showing {filteredEmployees.length} verified records
            </p>
          </div>
          <span className="text-xs font-mono text-[#A2AD7B]">
            Generated {new Date().toLocaleDateString()}
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#2A2A26]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1B1B18] text-[#F1EBDD]/60 font-mono text-[11px] border-b border-[#2A2A26]">
              <tr>
                <th className="px-5 py-3 font-medium">Employee</th>
                <th className="px-5 py-3 font-medium">Department</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Check-In</th>
                <th className="px-5 py-3 font-medium">Check-Out</th>
                <th className="px-5 py-3 font-medium">Logged Hours</th>
                <th className="px-5 py-3 font-medium">Station</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-semibold text-[#F1EBDD]">
                    {emp.name} ({emp.id})
                  </td>
                  <td className="px-5 py-3 text-zinc-300">{emp.dept}</td>
                  <td className="px-5 py-3 font-mono">{emp.status}</td>
                  <td className="px-5 py-3 font-mono text-[#F1EBDD]">{emp.check_in || '--'}</td>
                  <td className="px-5 py-3 font-mono text-[#F1EBDD]/60">{emp.check_out || '--'}</td>
                  <td className="px-5 py-3 font-mono text-[#A2AD7B]">{emp.hours || '8h 00m'}</td>
                  <td className="px-5 py-3 text-zinc-400">{emp.location || 'HQ'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
