'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { AppRole } from '@/types'

export interface AuthResult {
  error?: string
  success?: boolean
  redirectTo?: string
}

/**
 * Determine the canonical dashboard destination based on user role and permissions.
 * Routing:
 * - tech_lead -> /tech-lead
 * - ceo       -> /ceo
 * - admin     -> /admin
 * - employee  -> /employee (or /unauthorized with message until employee portal is created)
 * - client    -> /client (or /unauthorized with message until client portal is created)
 */
/**
 * Determine the canonical dashboard destination based on user role and permissions.
 * Routing:
 * - tech_lead -> /tech-lead
 * - ceo       -> /ceo
 * - admin     -> /admin
 * - employee  -> /profile
 * - client    -> /profile
 * - pending   -> /unauthorized?reason=pending_approval
 * - suspended -> /unauthorized?reason=suspended
 * - terminated-> /unauthorized?reason=terminated
 */
export async function getDashboardForUser(userId: string): Promise<{ destination: string; error?: string }> {
  const supabase = await createClient()

  // 1. Fetch user profile and verify lifecycle status
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, status, is_active, full_name')
    .eq('id', userId)
    .maybeSingle()

  if (profileError || !profile) {
    return { destination: '/login', error: 'User profile not found. Please contact administration.' }
  }

  // 2. Strict Account Status Check
  if (profile.status === 'terminated' || profile.is_active === false) {
    return {
      destination: '/unauthorized?reason=terminated',
      error: 'Account Terminated: Access to SOMYA management platforms has been revoked.'
    }
  }

  if (profile.status === 'suspended') {
    return {
      destination: '/unauthorized?reason=suspended',
      error: 'Account Suspended: Your access has been temporarily suspended by administration.'
    }
  }

  if (profile.status === 'pending') {
    return {
      destination: '/unauthorized?reason=pending_approval',
      error: 'Account Pending: Your account registration is awaiting administrative approval.'
    }
  }

  // 3. Fetch active roles assigned to this user
  const { data: userRoles } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)

  const roles: AppRole[] = userRoles?.map((r) => r.role as AppRole) ?? []

  // Hierarchy routing determination:
  // Tech Lead -> highest system authority -> /tech-lead
  if (roles.includes('tech_lead')) {
    return { destination: '/tech-lead' }
  }

  // CEO -> executive authority -> /ceo
  if (roles.includes('ceo')) {
    return { destination: '/ceo' }
  }

  // Admin -> operational management -> /admin
  if (roles.includes('admin')) {
    return { destination: '/admin' }
  }

  // Employee & Client -> personal credentials and profile
  if (roles.includes('employee') || roles.includes('client')) {
    return { destination: '/profile' }
  }

  // Default fallback for standard users without privileged roles: send to /profile
  return { destination: '/profile' }
}

/**
 * Sign in with email and password, then route based on role and account status.
 */
export async function signIn(formData: FormData): Promise<AuthResult> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const requestedRedirect = formData.get('redirect') as string | null

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error || !data.user) {
    return { error: error?.message || 'Invalid login credentials' }
  }

  // Retrieve user role & account status
  const { destination, error: routeError } = await getDashboardForUser(data.user.id)

  if (routeError) {
    // If account is suspended or terminated, sign out immediately
    await supabase.auth.signOut()
    return { error: routeError }
  }

  // If user requested a specific authorized sub-path, allow it if it matches their portal
  let finalDestination = destination
  if (requestedRedirect && requestedRedirect.startsWith('/') && !requestedRedirect.startsWith('//')) {
    const isTechLead = destination === '/tech-lead'
    const isCeo = destination === '/ceo'
    const isAdmin = destination === '/admin'

    if (isTechLead) {
      if (requestedRedirect.startsWith('/tech-lead') || requestedRedirect.startsWith('/admin/attendance') || requestedRedirect === '/profile' || requestedRedirect === '/settings') {
        finalDestination = requestedRedirect
      }
    } else if (isCeo) {
      if (requestedRedirect.startsWith('/ceo') || requestedRedirect.startsWith('/admin/attendance') || requestedRedirect === '/profile' || requestedRedirect === '/settings') {
        finalDestination = requestedRedirect
      }
    } else if (isAdmin) {
      if (requestedRedirect.startsWith('/admin') || requestedRedirect === '/profile' || requestedRedirect === '/settings') {
        finalDestination = requestedRedirect
      }
    } else {
      if (requestedRedirect === '/profile' || requestedRedirect === '/settings') {
        finalDestination = requestedRedirect
      }
    }
  }

  redirect(finalDestination)
}

/**
 * Sign up with email, password, full name, and optional phone.
 * STRICT SECURITY:
 * Public signup NEVER creates privileged roles (admin, ceo, tech_lead).
 * Always assigns default 'employee' role.
 */
export async function signUp(formData: FormData): Promise<AuthResult> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const fullName = formData.get('fullName') as string
  const phone = formData.get('phone') as string | null

  if (!email || !password || !fullName) {
    return { error: 'Full name, email, and password are required.' }
  }

  if (confirmPassword && password !== confirmPassword) {
    return { error: 'Passwords do not match.' }
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone || '',
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  // Ensure normal user assignment with admin client (cannot be bypassed by client)
  if (data?.user?.id) {
    try {
      const adminClient = createAdminClient()
      // Assign default 'employee' role
      await adminClient
        .from('user_roles')
        .upsert(
          { user_id: data.user.id, role: 'employee' },
          { onConflict: 'user_id,role' }
        )

      // Update phone on profile if provided
      if (phone) {
        await adminClient
          .from('profiles')
          .update({ phone, full_name: fullName })
          .eq('id', data.user.id)
      }

      // Record audit log for public signup
      await adminClient.from('audit_logs').insert({
        actor_id: data.user.id,
        action: 'user.signup',
        entity_type: 'user',
        entity_id: data.user.id,
        details: {
          email,
          role: 'employee',
          registered_at: new Date().toISOString(),
        },
      })
    } catch {
      // Non-blocking fallback if audit_logs table is missing optional fields
    }
  }

  return { success: true }
}

/**
 * Sign out completely, clear application session, and redirect to /login
 */
export async function signOut(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

/**
 * Request password reset email
 */
export async function resetPassword(formData: FormData): Promise<AuthResult> {
  const email = formData.get('email') as string

  if (!email) {
    return { error: 'Email is required.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.somyainnovations.in'}/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

/**
 * Update password (after reset or from settings)
 */
export async function updatePassword(formData: FormData): Promise<AuthResult> {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || !confirmPassword) {
    return { error: 'Both fields are required.' }
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' }
  }

  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

/**
 * Assign a role to a user (admin/tech_lead only).
 * PRIVILEGED GOVERNANCE:
 * - Tech Lead can manage all roles.
 * - Admin cannot self-promote to Tech Lead.
 * - Public users cannot assign roles.
 * - Every role mutation generates an immutable audit log entry.
 */
export async function assignUserRole(
  userId: string,
  role: string
): Promise<AuthResult> {
  const supabase = await createClient()

  // Verify the caller is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated.' }

  // Check caller roles
  const { data: callerRoles } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)

  const roles = callerRoles?.map((r) => r.role) ?? []
  const isTechLead = roles.includes('tech_lead')
  const isAdmin = roles.includes('admin')

  if (!isTechLead && !isAdmin) {
    return { error: 'Unauthorized: Only designated administrators can manage roles.' }
  }

  // Admin cannot grant tech_lead role
  if (!isTechLead && role === 'tech_lead') {
    return { error: 'Unauthorized: Tech Lead role can only be assigned by an active Technical Lead.' }
  }

  const adminClient = createAdminClient()
  const { error } = await adminClient
    .from('user_roles')
    .upsert({
      user_id: userId,
      role: role as 'admin' | 'ceo' | 'tech_lead' | 'employee' | 'client',
      assigned_by: user.id
    })

  if (error) {
    return { error: 'Failed to assign role.' }
  }

  // Record audit log
  try {
    await adminClient.from('audit_logs').insert({
      actor_id: user.id,
      action: 'role.assign',
      entity_type: 'user_role',
      entity_id: userId,
      details: {
        assigned_role: role,
        assigned_by: user.id,
        timestamp: new Date().toISOString(),
      },
    })
  } catch {
    // Non-blocking audit error
  }

  return { success: true }
}
