import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { AppRole, Profile } from '@/types'

export interface UserContext {
  user: {
    id: string
    email?: string
  }
  profile: Profile
  roles: AppRole[]
  permissions: string[]
}

/**
 * Get current authenticated user or null.
 * Safe to call from Server Components and Server Actions.
 */
export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

/**
 * Get current user's profile with role information.
 * Returns null if not authenticated.
 */
export async function getCurrentProfile(): Promise<
  (Profile & { roles: AppRole[] }) | null
> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) return null

  const { data: userRoles } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)

  return {
    ...profile,
    roles: userRoles?.map((r) => r.role) ?? [],
  }
}

/**
 * Get full user context (user, profile, roles, permissions).
 * Throws redirect if account is suspended or terminated.
 */
export async function getCurrentUserContext(): Promise<UserContext | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) return null

  // Enforce termination / suspension lifecycle checks
  if (profile.status === 'terminated' || profile.status === 'suspended' || !profile.is_active) {
    await supabase.auth.signOut()
    redirect('/login?error=account_revoked')
  }

  const { data: userRoles } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)

  const roles = userRoles?.map((r) => r.role) ?? []

  // Fetch permissions for all assigned roles
  const { data: rolePerms } = await supabase
    .from('role_permissions')
    .select('permission_name')
    .in('role', roles.length > 0 ? roles : ['employee'])

  const permissions = Array.from(new Set(rolePerms?.map((p) => p.permission_name) ?? []))

  return {
    user: { id: user.id, email: user.email },
    profile,
    roles,
    permissions,
  }
}

/**
 * Require authentication and active account status.
 * Redirects to /login if not authenticated.
 */
export async function requireAuth() {
  const context = await getCurrentUserContext()
  if (!context) {
    redirect('/login')
  }
  return context
}

/**
 * Require a specific role. Strictly enforces role boundaries:
 * - Admin does NOT have access to Tech Lead portal (/tech-lead)
 * - CEO does NOT have access to Operations portal (/admin) unless assigned admin
 * - Employee does NOT have access to management portals
 * Redirects to /unauthorized if unauthorized.
 */
export async function requireRole(requiredRole: AppRole): Promise<UserContext> {
  const context = await requireAuth()

  // Tech Lead is system superauthority with access to tech-lead and inspection
  const isTechLead = context.roles.includes('tech_lead')

  // Check direct role assignment
  const hasDirectRole = context.roles.includes(requiredRole)

  if (hasDirectRole) {
    return context
  }

  // Tech Lead can inspect other management portals if needed for system maintenance
  if (isTechLead && requiredRole !== 'tech_lead') {
    return context
  }

  // Cross-portal isolation: admin and ceo cannot access tech_lead portal
  redirect('/unauthorized')
}

/**
 * Require an explicit permission string.
 * Redirects to /unauthorized if permission is absent.
 */
export async function requirePermission(permission: string): Promise<UserContext> {
  const context = await requireAuth()

  if (context.permissions.includes(permission) || context.roles.includes('tech_lead')) {
    return context
  }

  redirect('/unauthorized')
}

/**
 * Check if current user has a role (without redirect).
 */
export async function checkRole(role: AppRole): Promise<boolean> {
  const context = await getCurrentUserContext()
  if (!context) return false
  return context.roles.includes(role)
}

/**
 * Check if current user has a permission (without redirect).
 */
export async function checkPermission(permission: string): Promise<boolean> {
  const context = await getCurrentUserContext()
  if (!context) return false
  return context.permissions.includes(permission) || context.roles.includes('tech_lead')
}
