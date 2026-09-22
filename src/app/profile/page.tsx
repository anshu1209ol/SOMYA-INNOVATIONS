import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  User,
  Shield,
  Briefcase,
  Building2,
  Calendar,
  Clock,
  Key,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Lock,
  ChevronRight,
  Activity,
  Layers,
} from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { getUserProfile } from '@/lib/actions/profile'
import { ManagementHeader } from '@/components/management/ManagementHeader'
import { ProfileEditor } from '@/components/management/ProfileEditor'

export const metadata: Metadata = createMetadata({
  title: 'Identity & Professional Profile | SOMYA Management',
  description: 'Enterprise credentials, resolved role authority, organizational alignment, and effective RBAC permissions.',
  path: '/profile',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const profileData = await getUserProfile()

  if (!profileData) {
    redirect('/login')
  }

  const {
    user,
    profile,
    roles,
    primaryRole,
    roleLabel,
    accessLevel,
    department,
    position,
    status,
    permissions,
    securityActivity,
  } = profileData

  const statusBadge =
    status === 'active'
      ? 'bg-[#68704A]/25 text-[#E8DFCF] border-[#68704A]/40'
      : status === 'suspended'
      ? 'bg-amber-950/40 text-amber-300 border-amber-800/40'
      : 'bg-[#641F2A]/30 text-red-300 border-[#641F2A]/50'

  return (
    <div className="min-h-screen bg-[#0D0D0B] text-[#F1EBDD] p-6 sm:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation Breadcrumb / Portal Bridge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-[#F1EBDD]/60">
            <Link
              href={primaryRole === 'tech_lead' ? '/tech-lead' : primaryRole === 'ceo' ? '/ceo' : '/admin'}
              className="hover:text-[#F1EBDD] transition-colors"
            >
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-[#F1EBDD] font-semibold">User Profile</span>
          </div>

          <Link
            href="/settings"
            className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-[#F1EBDD]/80 border border-[#2A2A26] transition-colors flex items-center gap-1.5"
          >
            <span>Account Settings</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ManagementHeader
          title="Identity & Professional Profile"
          subtitle="Real-time credentials, role authorization tier, organizational details, and effective permissions catalog."
          role={primaryRole}
          userEmail={user.email}
        />

        {/* Top Identity Hero Card */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#161614] border border-[#2A2A26] relative overflow-hidden">
          {/* Subtle Ambient Burgundy Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#641F2A]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-[#1B1B18] border border-[#2A2A26] flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name || 'Avatar'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-serif font-bold text-3xl text-[#F1EBDD]">
                    {(profile.full_name || 'U').charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-2xl font-serif font-bold text-[#F1EBDD] tracking-tight">
                    {profile.full_name || 'Unnamed Staff Member'}
                  </h2>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold border ${statusBadge}`}>
                    {status}
                  </span>
                </div>
                <p className="text-xs text-[#F1EBDD]/70 font-mono">
                  {user.email || 'No email associated'}
                </p>
                <div className="flex items-center gap-2 text-xs text-[#A2AD7B] font-mono pt-1">
                  <span>{position}</span>
                  <span>•</span>
                  <span>{department}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5 shrink-0 font-mono text-xs">
              <div className="px-3 py-1 rounded-xl bg-white/[0.04] border border-[#2A2A26] text-[#E8DFCF]">
                Role: <span className="font-bold uppercase text-[#F1EBDD]">{roleLabel}</span>
              </div>
              <div className="text-[11px] text-[#F1EBDD]/50">
                Access: {accessLevel}
              </div>
            </div>
          </div>
        </section>

        {/* Organizational & Account Telemetry Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Department */}
          <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
            <div className="flex items-center justify-between text-[#F1EBDD]/60 text-[10px] font-mono uppercase">
              <span>Department</span>
              <Building2 className="w-3.5 h-3.5 text-[#A2AD7B]" />
            </div>
            <div className="text-base font-bold font-serif text-[#F1EBDD]">
              {department}
            </div>
            <div className="text-[10px] font-mono text-[#F1EBDD]/40">
              Corporate division
            </div>
          </div>

          {/* Position / Title */}
          <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
            <div className="flex items-center justify-between text-[#F1EBDD]/60 text-[10px] font-mono uppercase">
              <span>Position</span>
              <Briefcase className="w-3.5 h-3.5 text-[#A2AD7B]" />
            </div>
            <div className="text-base font-bold font-serif text-[#F1EBDD]">
              {position}
            </div>
            <div className="text-[10px] font-mono text-[#F1EBDD]/40">
              Operational title
            </div>
          </div>

          {/* Joining Date */}
          <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
            <div className="flex items-center justify-between text-[#F1EBDD]/60 text-[10px] font-mono uppercase">
              <span>Tenure / Joining</span>
              <Calendar className="w-3.5 h-3.5 text-[#A2AD7B]" />
            </div>
            <div className="text-base font-bold font-mono text-[#F1EBDD]">
              {profile.joining_date ? new Date(profile.joining_date).toLocaleDateString() : new Date(profile.created_at).toLocaleDateString()}
            </div>
            <div className="text-[10px] font-mono text-[#F1EBDD]/40">
              Onboarded date
            </div>
          </div>

          {/* Account Created & Last Login */}
          <div className="p-5 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-2">
            <div className="flex items-center justify-between text-[#F1EBDD]/60 text-[10px] font-mono uppercase">
              <span>Last Login</span>
              <Clock className="w-3.5 h-3.5 text-[#A2AD7B]" />
            </div>
            <div className="text-base font-bold font-mono text-[#F1EBDD]">
              {profile.last_login_at ? new Date(profile.last_login_at).toLocaleDateString() : 'Active session'}
            </div>
            <div className="text-[10px] font-mono text-[#F1EBDD]/40 truncate">
              ID: {user.id.slice(0, 8)}...
            </div>
          </div>
        </section>

        {/* Role & Access Tier Detailed Section */}
        <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-[#641F2A]" />
              <h3 className="text-base font-serif font-bold text-[#F1EBDD]">
                Role & Access Authority
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase">
              RBAC Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
              <div className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase">Active Role</div>
              <div className="text-sm font-bold text-[#F1EBDD] font-mono uppercase">{roleLabel}</div>
              <div className="text-xs text-[#F1EBDD]/60">Canonical assignment in database</div>
            </div>

            <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
              <div className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase">Access Scope</div>
              <div className="text-sm font-bold text-[#A2AD7B] font-mono">{accessLevel}</div>
              <div className="text-xs text-[#F1EBDD]/60">Portal clearance and boundaries</div>
            </div>

            <div className="p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26] space-y-1">
              <div className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase">Account Status</div>
              <div className="text-sm font-bold font-mono uppercase text-[#F1EBDD]">{status}</div>
              <div className="text-xs text-[#F1EBDD]/60">Active operational standing</div>
            </div>
          </div>
        </section>

        {/* Effective RBAC Permissions Catalog */}
        <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Key className="w-4 h-4 text-[#A2AD7B]" />
              <h3 className="text-base font-serif font-bold text-[#F1EBDD]">
                Effective Permissions ({permissions.length})
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase">
              Computed from Role Mappings
            </span>
          </div>

          {permissions.length === 0 ? (
            <p className="text-xs font-mono text-[#F1EBDD]/50 py-4 text-center">
              No specific discrete permissions granted for this role.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {permissions.map((p) => (
                <div
                  key={p.name}
                  className="p-3 rounded-xl bg-[#1B1B18] border border-[#2A2A26] flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#68704A] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-mono font-semibold text-[#E8DFCF]">
                      {p.name}
                    </div>
                    <div className="text-[11px] text-[#F1EBDD]/50 leading-relaxed mt-0.5">
                      {p.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Profile Editing Form Component */}
        <ProfileEditor profile={profile} />

        {/* Recent Security Activity Ledger */}
        <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4 text-[#A2AD7B]" />
              <h3 className="text-base font-serif font-bold text-[#F1EBDD]">
                Recent Security & Administrative Activity
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase">
              Immutable Audit Ledger
            </span>
          </div>

          {securityActivity.length === 0 ? (
            <p className="text-xs font-mono text-[#F1EBDD]/50 py-4 text-center">
              No recent security events recorded for this account.
            </p>
          ) : (
            <div className="space-y-2">
              {securityActivity.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#68704A]" />
                    <div>
                      <span className="font-mono font-bold text-[#E8DFCF] uppercase">
                        {log.action}
                      </span>
                      {log.reason && (
                        <span className="text-[#F1EBDD]/60 ml-2">
                          — {log.reason}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-[#F1EBDD]/40">
                    {new Date(log.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
