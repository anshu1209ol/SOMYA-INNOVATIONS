import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { AppRole, Profile } from '@/types'

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
 * Require authentication. Redirects to /login if not authenticated.
 * Returns the authenticated user.
 */
export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }
  return user
}

/**
 * Require a specific role. Redirects to /unauthorized if the user
 * does not have the required role.
 */
export async function requireRole(requiredRole: AppRole) {
  const user = await requireAuth()
  const supabase = await createClient()

  // Admin has access to everything
  const { data: isAdmin } = await supabase.rpc('is_admin', { p_user_id: user.id })
  if (isAdmin) return user

  const { data: hasRole } = await supabase.rpc('has_role', {
    p_user_id: user.id,
    p_role: requiredRole,
  })

  if (!hasRole) {
    redirect('/unauthorized')
  }

  return user
}

/**
 * Check if the current user has a specific role (no redirect).
 */
export async function checkRole(role: AppRole): Promise<boolean> {
  const user = await getCurrentUser()
  if (!user) return false

  const supabase = await createClient()

  // Admin has all roles
  const { data: isAdmin } = await supabase.rpc('is_admin', { p_user_id: user.id })
  if (isAdmin) return true

  const { data: hasRole } = await supabase.rpc('has_role', {
    p_user_id: user.id,
    p_role: role,
  })

  return hasRole ?? false
}
