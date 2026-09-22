'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  User,
  Shield,
  Key,
  Bell,
  Sliders,
  Server,
  Building2,
  Lock,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Save,
  Laptop,
  Globe,
  RefreshCw,
} from 'lucide-react'
import { ProfileEditor } from '@/components/management/ProfileEditor'
import { revokeOtherSessions } from '@/lib/actions/profile'
import { updateCompanySettings } from '@/lib/actions/settings'
import type { AppRole, Profile } from '@/types'

interface SettingsClientProps {
  initialTab?: string
  portalRole?: AppRole
  userProfile: Profile
  userRoles: AppRole[]
  effectivePermissions: string[]
  companySettings?: Record<string, string>
}

export function SettingsClient({
  initialTab = 'profile',
  portalRole,
  userProfile,
  userRoles,
  effectivePermissions,
  companySettings = {},
}: SettingsClientProps) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [companyData, setCompanyData] = useState(companySettings)
  const [savingCompany, setSavingCompany] = useState(false)
  const [revokingSessions, setRevokingSessions] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Notification preferences state
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [taskAlerts, setTaskAlerts] = useState(true)
  const [projectAlerts, setProjectAlerts] = useState(true)
  const [systemAlerts, setSystemAlerts] = useState(true)

  // Appearance state
  const [reducedMotion, setReducedMotion] = useState(false)

  const isTechLead = userRoles.includes('tech_lead')
  const isAdmin = userRoles.includes('admin')
  const isCeo = userRoles.includes('ceo')
  const hasSystemAccess = isTechLead || effectivePermissions.includes('system.manage')
  const hasCompanyAccess = isTechLead || isAdmin || isCeo || effectivePermissions.includes('company.settings')

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Key },
    { id: 'security', label: 'Security & Sessions', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Sliders },
  ]

  if (hasCompanyAccess) {
    tabs.push({ id: 'company', label: 'Company Info', icon: Building2 })
  }

  if (hasSystemAccess) {
    tabs.push({ id: 'system', label: 'System Settings', icon: Server })
  }

  const handleRevokeOtherSessions = async () => {
    if (!confirm('Sign out of all other active browser sessions on other devices?')) return
    setRevokingSessions(true)
    const res = await revokeOtherSessions()
    setRevokingSessions(false)
    if (res.success) {
      setMessage({ type: 'success', text: 'All other active sessions have been revoked.' })
      setTimeout(() => setMessage(null), 4000)
    } else {
      setMessage({ type: 'error', text: res.error || 'Failed to revoke sessions.' })
    }
  }

  const handleSaveCompany = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavingCompany(true)
    setMessage(null)
    try {
      await updateCompanySettings(companyData)
      setMessage({ type: 'success', text: 'Company settings updated successfully!' })
      setTimeout(() => setMessage(null), 4000)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update company settings'
      setMessage({ type: 'error', text: msg })
    } finally {
      setSavingCompany(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Toast message */}
      {message && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-2.5 text-xs font-mono ${
            message.type === 'success'
              ? 'bg-[#68704A]/20 text-[#D4E0A5] border-[#68704A]/40'
              : 'bg-[#641F2A]/20 text-[#FFA5B3] border-[#641F2A]/40'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Settings Navigation Tabs */}
      <div className="border-b border-[#2A2A26] pb-3">
        <nav className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#641F2A] text-[#F1EBDD] font-semibold shadow-sm'
                    : 'bg-[#161614] text-[#F1EBDD]/60 hover:text-[#F1EBDD] hover:bg-white/[0.04] border border-[#2A2A26]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F1EBDD]' : 'text-[#F1EBDD]/50'}`} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <ProfileEditor profile={userProfile} />

          {/* Job Information Card */}
          <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
            <h3 className="text-sm font-bold font-mono text-[#F1EBDD] uppercase">
              Corporate Job Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26]">
                <div className="text-[10px] text-[#F1EBDD]/50 uppercase">Department</div>
                <div className="text-sm font-semibold text-[#F1EBDD] mt-1">
                  {userProfile.department || 'Technology'}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26]">
                <div className="text-[10px] text-[#F1EBDD]/50 uppercase">Position Title</div>
                <div className="text-sm font-semibold text-[#F1EBDD] mt-1">
                  {userProfile.job_title || 'Specialist'}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26]">
                <div className="text-[10px] text-[#F1EBDD]/50 uppercase">Primary Authority</div>
                <div className="text-sm font-semibold text-[#A2AD7B] uppercase mt-1">
                  {userRoles[0] || 'employee'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Account */}
      {activeTab === 'account' && (
        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-6">
          <div>
            <h3 className="text-base font-bold font-serif text-[#F1EBDD]">
              Account Authentication Credentials
            </h3>
            <p className="text-xs text-[#F1EBDD]/60 font-sans mt-0.5">
              Manage your corporate sign-in identity and credentials.
            </p>
          </div>

          <div className="space-y-4 max-w-xl text-xs font-mono">
            <div>
              <label className="block text-[11px] text-[#F1EBDD]/60 uppercase mb-1">
                Corporate Email Address
              </label>
              <input
                type="text"
                disabled
                value={userProfile.email || ''}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD]/70 cursor-not-allowed"
              />
              <span className="text-[10px] text-[#F1EBDD]/40 mt-1 block">
                Primary identifier managed via Supabase Auth
              </span>
            </div>

            <div className="pt-4 border-t border-[#2A2A26]">
              <h4 className="text-xs font-bold text-[#F1EBDD] uppercase mb-2">
                Password Reset
              </h4>
              <p className="text-xs text-[#F1EBDD]/60 font-sans mb-3">
                Need to change your password? You can request a secure reset link.
              </p>
              <Link
                href="/forgot-password"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1B1B18] hover:bg-white/[0.06] text-[#F1EBDD] border border-[#2A2A26] text-xs transition-colors"
              >
                <Key className="w-3.5 h-3.5 text-[#A2AD7B]" />
                <span>Send Password Reset Link</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Security & Sessions */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-serif text-[#F1EBDD]">
                  Active Browser Sessions
                </h3>
                <p className="text-xs text-[#F1EBDD]/60 font-sans mt-0.5">
                  Inspect currently active sessions and revoke device access.
                </p>
              </div>

              <button
                onClick={handleRevokeOtherSessions}
                disabled={revokingSessions}
                className="px-4 py-2 rounded-xl bg-[#641F2A]/30 hover:bg-[#641F2A]/50 text-[#FFA5B3] border border-[#641F2A]/40 text-xs font-mono transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{revokingSessions ? 'Revoking...' : 'Revoke Other Sessions'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] flex items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-3">
                <Laptop className="w-5 h-5 text-[#A2AD7B]" />
                <div>
                  <div className="font-semibold text-[#F1EBDD] flex items-center gap-2">
                    <span>Current Active Session</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#68704A]/25 text-[#D4E0A5] border border-[#68704A]/40">
                      CURRENT
                    </span>
                  </div>
                  <div className="text-[11px] text-[#F1EBDD]/50 mt-0.5">
                    Next.js SSR • Cookie-based JWT
                  </div>
                </div>
              </div>
              <div className="text-right text-[11px] text-[#F1EBDD]/50">
                Encrypted Session
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-3 text-xs">
            <h4 className="font-mono uppercase font-bold text-[#F1EBDD]">
              Security Best Practices
            </h4>
            <ul className="space-y-1.5 text-[#F1EBDD]/60 list-disc list-inside">
              <li>Always sign out when using shared corporate workstations.</li>
              <li>Report unauthorized password reset emails immediately to the Tech Lead.</li>
              <li>Session lifecycles are cryptographically verified against PostgreSQL RLS.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 4: Notifications */}
      {activeTab === 'notifications' && (
        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-6">
          <div>
            <h3 className="text-base font-bold font-serif text-[#F1EBDD]">
              Notification Preferences
            </h3>
            <p className="text-xs text-[#F1EBDD]/60 font-sans mt-0.5">
              Control the frequency and channels for internal system alerts.
            </p>
          </div>

          <div className="space-y-4 max-w-xl text-xs font-sans">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] cursor-pointer">
              <div>
                <div className="font-semibold text-[#F1EBDD]">Email Notifications</div>
                <div className="text-[11px] text-[#F1EBDD]/50">Receive digest of daily announcements</div>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#641F2A]"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] cursor-pointer">
              <div>
                <div className="font-semibold text-[#F1EBDD]">Task & Workflow Assignments</div>
                <div className="text-[11px] text-[#F1EBDD]/50">Alert when a task or project milestone is assigned</div>
              </div>
              <input
                type="checkbox"
                checked={taskAlerts}
                onChange={(e) => setTaskAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#641F2A]"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] cursor-pointer">
              <div>
                <div className="font-semibold text-[#F1EBDD]">Project Milestone Telemetry</div>
                <div className="text-[11px] text-[#F1EBDD]/50">Updates when sprints or roadmaps are updated</div>
              </div>
              <input
                type="checkbox"
                checked={projectAlerts}
                onChange={(e) => setProjectAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#641F2A]"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] cursor-pointer">
              <div>
                <div className="font-semibold text-[#F1EBDD]">System Security Announcements</div>
                <div className="text-[11px] text-[#F1EBDD]/50">Crucial security patches and maintenance schedules</div>
              </div>
              <input
                type="checkbox"
                checked={systemAlerts}
                onChange={(e) => setSystemAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#641F2A]"
              />
            </label>
          </div>
        </div>
      )}

      {/* Tab 5: Appearance */}
      {activeTab === 'appearance' && (
        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-6">
          <div>
            <h3 className="text-base font-bold font-serif text-[#F1EBDD]">
              Appearance & Interface Controls
            </h3>
            <p className="text-xs text-[#F1EBDD]/60 font-sans mt-0.5">
              Interface aesthetics and accessibility options.
            </p>
          </div>

          <div className="space-y-4 max-w-xl text-xs font-sans">
            <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-2">
              <div className="font-semibold text-[#F1EBDD]">Corporate Design Theme</div>
              <div className="text-[11px] text-[#F1EBDD]/50 font-mono">
                SOMYA Quiet Luxury Palette (Warm Beige `#F1EBDD`, Burgundy `#641F2A`, Muted Olive `#68704A`)
              </div>
              <div className="pt-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#11110F] border border-[#2A2A26]" title="Warm Black" />
                <span className="w-6 h-6 rounded-full bg-[#641F2A] border border-[#641F2A]" title="Burgundy" />
                <span className="w-6 h-6 rounded-full bg-[#68704A] border border-[#68704A]" title="Muted Olive" />
                <span className="w-6 h-6 rounded-full bg-[#F1EBDD] border border-[#F1EBDD]" title="Warm Beige" />
              </div>
            </div>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] cursor-pointer">
              <div>
                <div className="font-semibold text-[#F1EBDD]">Reduced Motion Mode</div>
                <div className="text-[11px] text-[#F1EBDD]/50">Minimize non-essential animations across portals</div>
              </div>
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={(e) => setReducedMotion(e.target.checked)}
                className="w-4 h-4 accent-[#641F2A]"
              />
            </label>
          </div>
        </div>
      )}

      {/* Tab 6: Company Info */}
      {activeTab === 'company' && hasCompanyAccess && (
        <form onSubmit={handleSaveCompany} className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-6">
          <div>
            <h3 className="text-base font-bold font-serif text-[#F1EBDD]">
              Corporate Organization Settings
            </h3>
            <p className="text-xs text-[#F1EBDD]/60 font-sans mt-0.5">
              Authorized business profile, contact details, and corporate preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono max-w-2xl">
            <div>
              <label className="block text-[11px] text-[#F1EBDD]/60 uppercase mb-1">
                Legal Entity Name
              </label>
              <input
                type="text"
                value={companyData.company_name || 'SOMYA INNOVATIONS'}
                onChange={(e) => setCompanyData({ ...companyData, company_name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#F1EBDD]/60 uppercase mb-1">
                Primary Contact Email
              </label>
              <input
                type="email"
                value={companyData.contact_email || 'contact@somyainnovations.in'}
                onChange={(e) => setCompanyData({ ...companyData, contact_email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#F1EBDD]/60 uppercase mb-1">
                Operational Phone
              </label>
              <input
                type="tel"
                value={companyData.contact_phone || '+91 98765 43210'}
                onChange={(e) => setCompanyData({ ...companyData, contact_phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#F1EBDD]/60 uppercase mb-1">
                Corporate Headquarters
              </label>
              <input
                type="text"
                value={companyData.office_address || 'SOMYA Tower, Tech Zone, Greater Noida, UP'}
                onChange={(e) => setCompanyData({ ...companyData, office_address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] font-sans"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={savingCompany}
              className="px-5 py-2.5 rounded-xl bg-[#641F2A] hover:bg-[#641F2A]/90 text-[#F1EBDD] text-xs font-semibold font-sans flex items-center gap-2 transition-all shadow-md disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingCompany ? 'Updating...' : 'Save Corporate Settings'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 7: System Settings (Tech Lead Only) */}
      {activeTab === 'system' && hasSystemAccess && (
        <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-serif text-[#F1EBDD]">
                System Architecture & Access Configuration
              </h3>
              <p className="text-xs text-[#F1EBDD]/60 font-sans mt-0.5">
                Technical Command console reserved for Tech Lead system administrators.
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#68704A]/25 text-[#D4E0A5] border border-[#68704A]/40 uppercase font-bold">
              SUPERADMIN PRIVILEGE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* Supabase Auth */}
            <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-2">
              <div className="flex items-center gap-2 text-[#A2AD7B]">
                <Key className="w-4 h-4" />
                <span className="font-bold">Authentication Engine</span>
              </div>
              <p className="text-[11px] text-[#F1EBDD]/60 font-sans">
                Supabase Auth with cookie-based SSR sessions, PKCE OAuth verification, and RLS enforcement.
              </p>
              <div className="text-[10px] text-[#F1EBDD]/40 pt-1">
                Status: Operational • Single Entry /login
              </div>
            </div>

            {/* RBAC & Access */}
            <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-2">
              <div className="flex items-center gap-2 text-[#A2AD7B]">
                <Shield className="w-4 h-4" />
                <span className="font-bold">RBAC & Roles</span>
              </div>
              <p className="text-[11px] text-[#F1EBDD]/60 font-sans">
                Granular role mapping via `user_roles` and `role_permissions` catalog with zero client tampering.
              </p>
              <div className="text-[10px] text-[#F1EBDD]/40 pt-1">
                Permissions: 29 Discrete Rights Active
              </div>
            </div>

            {/* Storage */}
            <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-2">
              <div className="flex items-center gap-2 text-[#A2AD7B]">
                <Server className="w-4 h-4" />
                <span className="font-bold">Storage Buckets</span>
              </div>
              <p className="text-[11px] text-[#F1EBDD]/60 font-sans">
                Seven private/public buckets (`avatars`, `documents`, `quotations`, `project-files`, etc.).
              </p>
              <div className="text-[10px] text-[#F1EBDD]/40 pt-1">
                Policy: User-isolated write, public avatar read
              </div>
            </div>

            {/* Audit Configuration */}
            <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-2">
              <div className="flex items-center gap-2 text-[#A2AD7B]">
                <Lock className="w-4 h-4" />
                <span className="font-bold">Audit Ledger Compliance</span>
              </div>
              <p className="text-[11px] text-[#F1EBDD]/60 font-sans">
                PostgreSQL append-only `audit_logs` table tracking sensitive role, status, and profile edits.
              </p>
              <div className="text-[10px] text-[#F1EBDD]/40 pt-1">
                Policy: Write-only • No DELETE or UPDATE
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-[#2A2A26] text-xs font-mono">
            <span className="text-[#F1EBDD]/50">
              Tech Lead Superauthority Active
            </span>
            <Link
              href="/tech-lead/audit"
              className="text-[#A2AD7B] hover:text-[#F1EBDD] transition-colors"
            >
              View Full Audit Ledger →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
