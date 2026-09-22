import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Key, CheckCircle2, Lock } from 'lucide-react'
import { createMetadata } from '@/lib/seo'
import { createClient } from '@/lib/supabase/server'
import { ManagementHeader } from '@/components/management/ManagementHeader'

export const metadata: Metadata = createMetadata({
  title: 'Roles & RBAC Permissions Matrix | SOMYA Tech Lead',
  description: 'Role-based access control matrix, granular permissions catalog, and security governance.',
  path: '/tech-lead/roles',
  noIndex: true,
})

export const dynamic = 'force-dynamic'

export default async function TechLeadRolesPage() {
  const supabase = await createClient()

  const [permissionsRes, rolePermsRes] = await Promise.all([
    supabase.from('permissions').select('*').order('category'),
    supabase.from('role_permissions').select('*'),
  ])

  const permissions = permissionsRes.data || []
  const rolePermissions = rolePermsRes.data || []

  const roles = ['tech_lead', 'ceo', 'admin', 'employee']

  const isGranted = (role: string, permName: string) => {
    return rolePermissions.some((rp) => rp.role === role && rp.permission_name === permName)
  }

  return (
    <div className="space-y-8">
      <ManagementHeader
        title="Roles & RBAC Permissions Matrix"
        subtitle="Granular permissions catalog, role authority mapping, and security gatekeeper rules."
      />

      <section className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-[#A2AD7B]" />
            <h3 className="text-sm font-bold text-[#F1EBDD] font-mono uppercase tracking-wide">
              Effective Permission Matrix ({permissions.length} permissions)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#F1EBDD]/40 uppercase">RLS Enforced</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1B1B18] text-[#F1EBDD]/60 font-mono text-[10px] uppercase border-b border-[#2A2A26]">
              <tr>
                <th className="px-4 py-3">Permission Key</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-center">Tech Lead</th>
                <th className="px-4 py-3 text-center">CEO</th>
                <th className="px-4 py-3 text-center">Admin</th>
                <th className="px-4 py-3 text-center">Employee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A26] text-[#F1EBDD]/80">
              {permissions.map((p) => (
                <tr key={p.name} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <div className="font-mono font-semibold text-[#E8DFCF]">{p.name}</div>
                    <div className="text-[10px] text-[#F1EBDD]/50">{p.description}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-[#E8DFCF] border border-[#2A2A26] uppercase">
                      {p.category}
                    </span>
                  </td>
                  {roles.map((r) => {
                    const granted = isGranted(r, p.name)
                    return (
                      <td key={r} className="px-4 py-3 text-center">
                        {granted ? (
                          <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-[#68704A]/25 text-[#A2AD7B]">
                            ✓
                          </span>
                        ) : (
                          <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-white/[0.02] text-[#F1EBDD]/20">
                            —
                          </span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
