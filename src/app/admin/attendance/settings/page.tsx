'use client'

import React, { useState } from 'react'
import {
  Settings,
  Clock,
  QrCode,
  ShieldCheck,
  Save,
  CheckCircle2,
  Building2,
  MapPin
} from 'lucide-react'
import { AttendanceNav } from '@/components/attendance/AttendanceNav'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export default function AttendanceSettingsPage() {
  const [gracePeriod, setGracePeriod] = useState('09:15 AM')
  const [shiftStart, setShiftStart] = useState('09:00 AM')
  const [shiftEnd, setShiftEnd] = useState('06:00 PM')
  const [officeLocation, setOfficeLocation] = useState('HQ - Somya Tower, Floor 4')
  const [qrExpiryMins, setQrExpiryMins] = useState('15')
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <ManagementHeader
        title="Attendance & Workforce Policy Settings"
        subtitle="Configure shift start thresholds, grace periods, QR badge security keys, and corporate facility parameters."
      />

      <AttendanceNav />

      {saved && (
        <div className="p-4 rounded-xl text-xs font-mono bg-[#68704A]/20 text-[#D4E0A5] border border-[#68704A]/40 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Attendance policy parameters saved to central configuration ledger!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        {/* Timing Policies */}
        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
          <div className="flex items-center gap-2 border-b border-[#2A2A26] pb-3">
            <Clock className="w-4 h-4 text-[#A2AD7B]" />
            <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase">
              Shift Timings & Grace Cutoffs
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-mono text-[#F1EBDD]/70 uppercase mb-1">
                Standard Shift Start
              </label>
              <input
                type="text"
                value={shiftStart}
                onChange={(e) => setShiftStart(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] font-mono focus:outline-none focus:border-[#641F2A]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#F1EBDD]/70 uppercase mb-1">
                Standard Shift End
              </label>
              <input
                type="text"
                value={shiftEnd}
                onChange={(e) => setShiftEnd(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] font-mono focus:outline-none focus:border-[#641F2A]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#F1EBDD]/70 uppercase mb-1">
                Late Grace Cutoff Time
              </label>
              <input
                type="text"
                value={gracePeriod}
                onChange={(e) => setGracePeriod(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] font-mono focus:outline-none focus:border-[#641F2A]"
              />
              <span className="text-[10px] text-[#F1EBDD]/40 mt-1 block">
                Arrivals after this mark will automatically register as &quot;Late&quot;.
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#F1EBDD]/70 uppercase mb-1">
                Primary Facility Location
              </label>
              <input
                type="text"
                value={officeLocation}
                onChange={(e) => setOfficeLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] focus:outline-none focus:border-[#641F2A]"
              />
            </div>
          </div>
        </div>

        {/* QR Security Configuration */}
        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
          <div className="flex items-center gap-2 border-b border-[#2A2A26] pb-3">
            <QrCode className="w-4 h-4 text-[#A2AD7B]" />
            <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase">
              QR Code Security & Verification Lifetime
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] font-mono text-[#F1EBDD]/70 uppercase mb-1">
                Dynamic QR Expiry (Minutes)
              </label>
              <input
                type="number"
                value={qrExpiryMins}
                onChange={(e) => setQrExpiryMins(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] font-mono focus:outline-none focus:border-[#641F2A]"
              />
            </div>

            <div className="p-3 rounded-xl bg-[#1B1B18] border border-[#2A2A26] flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#A2AD7B] shrink-0" />
              <div className="text-[11px] text-[#F1EBDD]/60 leading-relaxed font-mono">
                Cryptographic HMAC hashing verifies that only official mobile/workstation scanners approve shift logs.
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-[#641F2A] hover:bg-[#7D2836] text-[#F1EBDD] text-xs font-mono font-semibold flex items-center gap-2 shadow-lg transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings & Apply Policy</span>
        </button>
      </form>
    </div>
  )
}
