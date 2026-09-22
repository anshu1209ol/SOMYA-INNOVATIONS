'use client'

import React, { useState, useEffect } from 'react'
import {
  CalendarX,
  CheckCircle2,
  XCircle,
  Plus,
  Clock,
  UserCheck,
  AlertTriangle,
  FileText
} from 'lucide-react'
import { getLeaveRequests, updateLeaveRequestStatus, submitLeaveRequest } from '@/lib/actions/attendance'
import { AttendanceNav } from '@/components/attendance/AttendanceNav'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import type { LeaveRequest } from '@/types'

export default function AttendanceLeavePage() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null)

  // New leave form state
  const [empName, setEmpName] = useState('')
  const [dept, setDept] = useState('AI Engineering')
  const [dates, setDates] = useState('')
  const [type, setType] = useState('Casual Leave')
  const [reason, setReason] = useState('')

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3500)
  }

  const loadRequests = async () => {
    const data = await getLeaveRequests()
    setLeaveRequests(data)
  }

  useEffect(() => {
    loadRequests()
  }, [])

  const handleAction = async (id: string, status: 'Approved' | 'Rejected') => {
    const res = await updateLeaveRequestStatus(id, status)
    if (res.success) {
      showNotification(
        status === 'Approved'
          ? 'Leave request approved! Attendance roster automatically updated to "On Leave".'
          : 'Leave request rejected.',
        status === 'Approved' ? 'success' : 'info'
      )
      loadRequests()
    } else {
      showNotification(res.error || 'Action failed', 'error')
    }
  }

  const handleSubmitLeave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!empName || !dates || !reason) {
      showNotification('Please fill in all mandatory fields', 'error')
      return
    }

    const res = await submitLeaveRequest({
      employeeName: empName,
      dept,
      dates,
      reason,
      type
    })

    if (res.success) {
      showNotification('Leave application registered successfully!', 'success')
      setIsSubmitModalOpen(false)
      setEmpName('')
      setDates('')
      setReason('')
      loadRequests()
    } else {
      showNotification(res.error || 'Failed to submit leave', 'error')
    }
  }

  const filteredRequests = leaveRequests.filter(r => {
    if (activeTab === 'pending') return r.status === 'Pending'
    if (activeTab === 'approved') return r.status === 'Approved'
    return r.status === 'Rejected'
  })

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Leave Management & Approval Workflow"
        subtitle="Manage employee leave applications. Approved leaves automatically propagate to attendance rosters with zero manual duplicate entry."
      />

      <AttendanceNav />

      {notification && (
        <div
          className={`p-4 rounded-xl text-xs font-mono border flex items-center justify-between transition-all ${
            notification.type === 'success'
              ? 'bg-[#68704A]/20 text-[#D4E0A5] border-[#68704A]/40'
              : notification.type === 'error'
              ? 'bg-[#641F2A]/20 text-[#FFA5B3] border-[#641F2A]/40'
              : 'bg-[#161614] text-[#F1EBDD] border-[#2A2A26]'
          }`}
        >
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="text-xs opacity-60 hover:opacity-100">
            ✕
          </button>
        </div>
      )}

      {/* Action Header & Tabs */}
      <div className="p-4 rounded-2xl bg-[#161614] border border-[#2A2A26] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {(['pending', 'approved', 'rejected'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase font-semibold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#641F2A] text-[#F1EBDD]'
                  : 'bg-[#1B1B18] text-[#F1EBDD]/60 hover:text-white border border-[#2A2A26]'
              }`}
            >
              {tab} ({leaveRequests.filter(r => r.status.toLowerCase() === tab).length})
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#68704A] hover:bg-[#575e3e] text-[#F1EBDD] text-xs font-mono font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Apply Leave Request</span>
        </button>
      </div>

      {/* Leave Requests List */}
      <div className="space-y-3">
        {filteredRequests.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-[#F1EBDD]/50 bg-[#161614] rounded-2xl border border-[#2A2A26]">
            No {activeTab} leave requests in queue.
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div
              key={req.id}
              className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#641F2A]/40 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-sm text-[#F1EBDD]">
                    {req.employee_name}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white/[0.04] text-[#F1EBDD]/70 border border-[#2A2A26]">
                    {req.type}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${
                      req.status === 'Approved'
                        ? 'bg-[#68704A]/20 text-[#D4E0A5] border-[#68704A]/40'
                        : req.status === 'Rejected'
                        ? 'bg-[#641F2A]/20 text-[#FFA5B3] border-[#641F2A]/40'
                        : 'bg-amber-950/40 text-amber-300 border-amber-800/40'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
                <div className="text-xs text-[#F1EBDD]/70 font-mono">
                  {req.dept} • <span className="text-[#A2AD7B]">{req.dates}</span>
                </div>
                <p className="text-xs text-[#F1EBDD]/60 italic pt-1">
                  &ldquo;{req.reason}&rdquo;
                </p>
              </div>

              {req.status === 'Pending' && (
                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => handleAction(req.id, 'Approved')}
                    className="px-4 py-2 rounded-xl bg-[#68704A]/25 hover:bg-[#68704A]/50 text-[#D4E0A5] text-xs font-mono font-semibold border border-[#68704A]/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Leave</span>
                  </button>
                  <button
                    onClick={() => handleAction(req.id, 'Rejected')}
                    className="px-4 py-2 rounded-xl bg-[#641F2A]/25 hover:bg-[#641F2A]/50 text-[#FFA5B3] text-xs font-mono font-semibold border border-[#641F2A]/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Submit Leave Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
            <div className="flex items-center justify-between border-b border-[#2A2A26] pb-3">
              <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase">
                Submit Workforce Leave Request
              </h3>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-xs text-[#F1EBDD]/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitLeave} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-mono text-[#F1EBDD]/70 uppercase mb-1">
                  Employee Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] focus:outline-none focus:border-[#641F2A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#F1EBDD]/70 uppercase mb-1">
                    Department
                  </label>
                  <select
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] focus:outline-none focus:border-[#641F2A]"
                  >
                    <option value="AI Engineering">AI Engineering</option>
                    <option value="IT Infrastructure">IT Infrastructure</option>
                    <option value="Digital Engineering">Digital Engineering</option>
                    <option value="Sales & Client Success">Sales & Client Success</option>
                    <option value="Security">Security</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#F1EBDD]/70 uppercase mb-1">
                    Leave Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] focus:outline-none focus:border-[#641F2A]"
                  >
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Duty Leave">Duty Leave</option>
                    <option value="Maternity/Paternity">Maternity/Paternity</option>
                    <option value="Bereavement">Bereavement</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#F1EBDD]/70 uppercase mb-1">
                  Dates Requested (e.g. Oct 10 - Oct 14) *
                </label>
                <input
                  type="text"
                  required
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  placeholder="e.g. Oct 12 - Oct 15"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] focus:outline-none focus:border-[#641F2A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#F1EBDD]/70 uppercase mb-1">
                  Reason for Absence *
                </label>
                <textarea
                  required
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide concise operational justification..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] focus:outline-none focus:border-[#641F2A]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2.5 border-t border-[#2A2A26]">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] text-[#F1EBDD]/70 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#641F2A] hover:bg-[#7D2836] text-[#F1EBDD] text-xs font-mono font-semibold transition-all cursor-pointer"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
