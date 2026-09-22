'use client'

import React, { useState, useEffect } from 'react'
import {
  Clock,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  Play,
  Square,
  Search,
  Users,
  ShieldCheck,
  RefreshCw,
  Wifi,
  WifiOff,
  UserCheck
} from 'lucide-react'
import { recordPunch, syncOfflinePunches, getEmployees } from '@/lib/actions/attendance'
import { AttendanceNav } from '@/components/attendance/AttendanceNav'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import type { Employee } from '@/types'

export default function AttendanceTodayPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [selectedEmpId, setSelectedEmpId] = useState<string>('EMP-1001')
  const [isPunchedIn, setIsPunchedIn] = useState<boolean>(false)
  const [punchStartTime, setPunchStartTime] = useState<Date | null>(null)
  const [elapsedTimer, setElapsedTimer] = useState<string>('00:00:00')
  const [checkInTime, setCheckInTime] = useState<string>('--:--')
  const [isOnline, setIsOnline] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeQrModal, setActiveQrModal] = useState<boolean>(false)
  const [qrToken, setQrToken] = useState<string>('')
  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null)

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3500)
  }

  // Monitor network status for offline capability
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine)
      const handleOnline = () => {
        setIsOnline(true)
        showNotification('Network connection restored. Syncing offline records...', 'success')
        syncCachedPunches()
      }
      const handleOffline = () => {
        setIsOnline(false)
        showNotification('Working in offline mode. Shift logs will cache locally.', 'info')
      }
      window.addEventListener('online', handleOnline)
      window.addEventListener('offline', handleOffline)
      return () => {
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
      }
    }
  }, [])

  // Sync cached punches if any exist in localStorage
  const syncCachedPunches = async () => {
    if (typeof window === 'undefined') return
    const cached = localStorage.getItem('somya_offline_punches')
    if (cached) {
      try {
        const punches = JSON.parse(cached)
        if (Array.isArray(punches) && punches.length > 0) {
          const res = await syncOfflinePunches(punches)
          if (res.success) {
            localStorage.removeItem('somya_offline_punches')
            showNotification(`Synchronized ${res.count} offline punch record(s) to central database!`, 'success')
          }
        }
      } catch (e) {
        console.error('Offline sync error:', e)
      }
    }
  }

  // Load employees
  useEffect(() => {
    async function load() {
      const data = await getEmployees()
      setEmployees(data)
      if (data.length > 0 && !selectedEmpId) {
        setSelectedEmpId(data[0].id)
      }
    }
    load()
  }, [])

  // Elapsed timer ticker
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPunchedIn && punchStartTime) {
      interval = setInterval(() => {
        const diffMs = new Date().getTime() - punchStartTime.getTime()
        const hours = Math.floor(diffMs / 3600000).toString().padStart(2, '0')
        const mins = Math.floor((diffMs % 3600000) / 60000).toString().padStart(2, '0')
        const secs = Math.floor((diffMs % 60000) / 1000).toString().padStart(2, '0')
        setElapsedTimer(`${hours}:${mins}:${secs}`)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPunchedIn, punchStartTime])

  const selectedEmp = employees.find(e => e.id === selectedEmpId) || employees[0]

  // Punch In / Punch Out
  const handleTogglePunch = async () => {
    if (!selectedEmp) return

    if (!isPunchedIn) {
      const now = new Date()
      setIsPunchedIn(true)
      setPunchStartTime(now)
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      setCheckInTime(timeStr)

      // Offline storage fallback
      if (!isOnline) {
        const cached = JSON.parse(localStorage.getItem('somya_offline_punches') || '[]')
        cached.push({
          employeeId: selectedEmp.id,
          punchType: 'in',
          timestamp: now.toISOString(),
          verificationMethod: 'manual'
        })
        localStorage.setItem('somya_offline_punches', JSON.stringify(cached))
        showNotification(`Shift punched in offline. Saved locally for ${selectedEmp.name}`, 'info')
      } else {
        await recordPunch(selectedEmp.id, 'in')
        showNotification(`Shift Punch-In confirmed for ${selectedEmp.name}!`, 'success')
      }
    } else {
      setIsPunchedIn(false)
      const duration = elapsedTimer
      setElapsedTimer('00:00:00')
      setCheckInTime('--:--')
      setPunchStartTime(null)

      if (!isOnline) {
        const cached = JSON.parse(localStorage.getItem('somya_offline_punches') || '[]')
        cached.push({
          employeeId: selectedEmp.id,
          punchType: 'out',
          timestamp: new Date().toISOString(),
          duration,
          verificationMethod: 'manual'
        })
        localStorage.setItem('somya_offline_punches', JSON.stringify(cached))
        showNotification(`Shift punched out offline. Duration: ${duration}`, 'info')
      } else {
        await recordPunch(selectedEmp.id, 'out', duration)
        showNotification(`Shift completed! Duration: ${duration} recorded for ${selectedEmp.name}`, 'info')
      }
    }
  }

  // QR Code Generation & Verification Simulation
  const handleGenerateQr = () => {
    const token = `SOMYA-QR-${selectedEmpId}-${Date.now()}`
    setQrToken(token)
    setActiveQrModal(true)
  }

  const handleSimulateQrScan = async () => {
    if (!selectedEmp) return
    setActiveQrModal(false)
    const now = new Date()
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

    if (!isPunchedIn) {
      setIsPunchedIn(true)
      setPunchStartTime(now)
      setCheckInTime(timeStr)
      await recordPunch(selectedEmp.id, 'in', undefined, 'qr')
      showNotification(`QR Verification Verified! Punch-In recorded at ${timeStr}`, 'success')
    } else {
      setIsPunchedIn(false)
      const duration = elapsedTimer
      setElapsedTimer('00:00:00')
      setCheckInTime('--:--')
      setPunchStartTime(null)
      await recordPunch(selectedEmp.id, 'out', duration, 'qr')
      showNotification(`QR Verification Verified! Punch-Out recorded. Duration: ${duration}`, 'info')
    }
  }

  const filteredEmployees = employees.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.dept.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Today's Live Shift Punches"
        subtitle="Real-time shift timing, biometric punch logs, QR verification station, and offline synchronized operations."
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

      {/* Primary Punch Station & QR Station */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Punch Clock Widget */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#2A2A26] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#641F2A]/20 border border-[#641F2A]/40 flex items-center justify-center text-[#F1EBDD]">
                <Clock className="w-5 h-5 text-[#641F2A]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#F1EBDD]">
                  Operational Shift Terminal
                </h3>
                <p className="text-[11px] text-[#F1EBDD]/60 font-mono">
                  Biometric Timestamp & Shift Stopwatch
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${
                  isOnline
                    ? 'bg-[#68704A]/20 text-[#D4E0A5] border-[#68704A]/40'
                    : 'bg-amber-950/40 text-amber-300 border-amber-800/40'
                }`}
              >
                {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                <span>{isOnline ? 'Online Sync' : 'Offline Mode'}</span>
              </span>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${
                  isPunchedIn
                    ? 'bg-[#68704A]/25 text-[#D4E0A5] border-[#68704A]/40'
                    : 'bg-white/[0.04] text-[#F1EBDD]/50 border-[#2A2A26]'
                }`}
              >
                {isPunchedIn ? 'Shift Active' : 'Not Punched In'}
              </span>
            </div>
          </div>

          {/* Selected Staff Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26]">
            <div>
              <span className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase block">Selected Employee</span>
              <span className="text-xs font-semibold text-[#F1EBDD]">{selectedEmp?.name || 'Loading...'}</span>
              <span className="text-[10px] font-mono text-[#F1EBDD]/50 block">{selectedEmp?.id} • {selectedEmp?.role}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase block">Recorded Check-In</span>
              <span className="text-xs font-mono font-bold text-[#A2AD7B]">{checkInTime}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase block">Active Duration</span>
              <span className="text-xs font-mono font-bold text-[#F1EBDD]">{elapsedTimer}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleTogglePunch}
              className={`py-3.5 px-4 rounded-xl text-xs font-semibold uppercase font-mono tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                isPunchedIn
                  ? 'bg-[#641F2A] hover:bg-[#7D2836] text-[#F1EBDD]'
                  : 'bg-[#68704A] hover:bg-[#575e3e] text-[#F1EBDD]'
              }`}
            >
              {isPunchedIn ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>Punch Out of Shift</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Punch In to Shift</span>
                </>
              )}
            </button>

            <button
              onClick={handleGenerateQr}
              className="py-3.5 px-4 rounded-xl text-xs font-semibold font-mono tracking-wider uppercase bg-[#1B1B18] hover:bg-[#23231F] text-[#F1EBDD] border border-[#2A2A26] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-[#A2AD7B]" />
              <span>Generate / Scan QR Badge</span>
            </button>
          </div>
        </div>

        {/* Quick Instructions & Verification Methods */}
        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#A2AD7B]" />
              <h4 className="text-xs font-bold font-mono uppercase text-[#F1EBDD]">
                Biometric & Verification Policies
              </h4>
            </div>
            <p className="text-[11px] text-[#F1EBDD]/60 leading-relaxed">
              SOMYA Management enforces zero-loss attendance recording. Punches work seamlessly online and offline.
            </p>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
              <span className="text-[10px] text-[#A2AD7B] uppercase block">Grace Period Cutoff</span>
              <p className="text-[11px] text-[#F1EBDD]">Standard morning grace ends at 09:15 AM. Check-ins after 09:15 AM are automatically categorized as Late.</p>
            </div>
            <div className="p-3 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
              <span className="text-[10px] text-[#A2AD7B] uppercase block">Offline Sync Guarantee</span>
              <p className="text-[11px] text-[#F1EBDD]">Offline shifts are held securely in device cache and committed automatically upon reconnection.</p>
            </div>
          </div>

          <button
            onClick={syncCachedPunches}
            className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#F1EBDD]/70 hover:text-[#F1EBDD] text-xs font-mono border border-[#2A2A26] flex items-center justify-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Force Re-sync Offline Queue</span>
          </button>
        </div>
      </section>

      {/* Today's Roster Table */}
      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-[#F1EBDD] uppercase font-mono tracking-wider">
              Today's Real-Time Workforce Presence Roster
            </h3>
            <p className="text-xs text-[#F1EBDD]/60">
              Select any staff member to view timing details or execute verified shift actions
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#F1EBDD]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter roster by name or ID..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-xs text-[#F1EBDD] placeholder:text-[#F1EBDD]/40 focus:outline-none focus:border-[#641F2A]"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#2A2A26]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1B1B18] text-[#F1EBDD]/60 font-mono text-[11px] border-b border-[#2A2A26]">
              <tr>
                <th className="px-5 py-3.5 font-medium">Employee</th>
                <th className="px-5 py-3.5 font-medium">Department</th>
                <th className="px-5 py-3.5 font-medium">Current Status</th>
                <th className="px-5 py-3.5 font-medium">Check-In</th>
                <th className="px-5 py-3.5 font-medium">Logged Hours</th>
                <th className="px-5 py-3.5 font-medium">Station / Site</th>
                <th className="px-5 py-3.5 font-medium text-right">Terminal Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
              {filteredEmployees.map((emp) => {
                const isSelected = emp.id === selectedEmpId
                let badgeClass = 'bg-[#68704A]/25 text-[#E8DFCF] border-[#68704A]/40'
                if (emp.status === 'Late') badgeClass = 'bg-amber-950/40 text-amber-300 border-amber-800/40'
                else if (emp.status === 'On Leave') badgeClass = 'bg-[#641F2A]/30 text-[#E8DFCF] border-[#641F2A]/50'
                else if (emp.status === 'Absent') badgeClass = 'bg-white/[0.04] text-[#F1EBDD]/40 border-[#2A2A26]'

                return (
                  <tr
                    key={emp.id}
                    onClick={() => setSelectedEmpId(emp.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#641F2A]/15' : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <td className="px-5 py-3.5 font-semibold text-[#F1EBDD]">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-[#1B1B18] border border-[#2A2A26] flex items-center justify-center text-[10px] font-mono text-[#A2AD7B]">
                          {emp.name.slice(0, 2).toUpperCase()}
                        </span>
                        <div>
                          <div>{emp.name}</div>
                          <div className="text-[10px] font-mono text-[#F1EBDD]/50">{emp.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-zinc-300">{emp.dept}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold border ${badgeClass}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[#F1EBDD]">{emp.check_in || '--'}</td>
                    <td className="px-5 py-3.5 font-mono text-[#F1EBDD]/70">{emp.hours || '0h 00m'}</td>
                    <td className="px-5 py-3.5 text-zinc-400">{emp.location || 'HQ - Somya Tower'}</td>
                    <td className="px-5 py-3.5 text-right">
                      {isSelected ? (
                        <span className="px-2.5 py-1 rounded-lg bg-[#641F2A] text-[#F1EBDD] text-[10px] font-mono font-bold">
                          Active Selection
                        </span>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedEmpId(emp.id)
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[10px] font-mono text-[#F1EBDD]/70 border border-[#2A2A26]"
                        >
                          Select
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* QR Code Modal */}
      {activeQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] text-center space-y-4">
            <div className="flex items-center justify-between border-b border-[#2A2A26] pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-[#A2AD7B]" />
                <h4 className="text-xs font-bold font-mono uppercase text-[#F1EBDD]">
                  Verified QR Check-in Badge
                </h4>
              </div>
              <button
                onClick={() => setActiveQrModal(false)}
                className="text-xs text-[#F1EBDD]/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="py-4 flex flex-col items-center justify-center space-y-3">
              <div className="w-44 h-44 rounded-2xl bg-white p-3 flex flex-col items-center justify-center shadow-lg">
                {/* SVG QR Code Pattern Mockup */}
                <div className="w-full h-full border-4 border-black p-2 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-8 h-8 bg-black"></div>
                    <div className="w-8 h-8 bg-black"></div>
                  </div>
                  <div className="text-center font-mono text-[9px] text-black font-bold tracking-widest uppercase">
                    {selectedEmp?.id}
                  </div>
                  <div className="flex justify-between">
                    <div className="w-8 h-8 bg-black"></div>
                    <div className="w-8 h-8 bg-[#641F2A]"></div>
                  </div>
                </div>
              </div>

              <div className="text-xs font-semibold text-[#F1EBDD]">{selectedEmp?.name}</div>
              <div className="text-[10px] font-mono text-[#F1EBDD]/50">{qrToken}</div>
            </div>

            <button
              onClick={handleSimulateQrScan}
              className="w-full py-2.5 rounded-xl bg-[#641F2A] hover:bg-[#7D2836] text-[#F1EBDD] text-xs font-mono font-semibold transition-all cursor-pointer"
            >
              Simulate QR Scan Verification
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
