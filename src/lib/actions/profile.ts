'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getCurrentUserContext, requireAuth } from '@/lib/auth/guards'
import { recordAuditLog } from '@/lib/actions/audit'
import type { AppRole, Profile, AuditLog } from '@/types'

export interface UserProfileData {
  user: {
    id: string
    email?: string
  }
  profile: Profile
  roles: AppRole[]
  primaryRole: AppRole
  roleLabel: string
  accessLevel: string
  department: string
  position: string
  status: 'active' | 'suspended' | 'terminated' | 'invited'
  permissions: {
    name: string
    category: string
    description: string
  }[]
  securityActivity: {
    id: string
    action: string
    reason: string | null
    createdAt: string
    metadata: Record<string, unknown>
  }[]
  activeSession: {
    ip?: string
    userAgent?: string
    lastActive: string
    isCurrent: boolean
  }
}

/**
 * Fetch complete profile details for currently authenticated user.
 */
export async function getUserProfile(): Promise<UserProfileData | null> {
  try {
    const context = await requireAuth()
    const supabase = await createClient()

    const { profile, roles, user } = context
    const primaryRole = roles[0] || 'employee'

    // Compute role label and access level strictly based on role
    let roleLabel = 'Employee'
    let accessLevel = 'Standard Workforce Access'
    if (primaryRole === 'tech_lead') {
      roleLabel = 'Tech Lead'
      accessLevel = 'System / Technical Administration'
    } else if (primaryRole === 'ceo') {
      roleLabel = 'CEO'
      accessLevel = 'Executive Management'
    } else if (primaryRole === 'admin') {
      roleLabel = 'Admin'
      accessLevel = 'Business & Operations Management'
    } else if (primaryRole === 'client') {
      roleLabel = 'Client'
      accessLevel = 'External Client Portal'
    }

    // Effective permissions with categories and descriptions
    const { data: rolePerms } = await supabase
      .from('role_permissions')
      .select('permission_name')
      .in('role', roles.length > 0 ? roles : ['employee'])

    const permNames = Array.from(new Set(rolePerms?.map((p) => p.permission_name) ?? []))

    let permissions: { name: string; category: string; description: string }[] = []
    if (permNames.length > 0) {
      const { data: permCatalog } = await supabase
        .from('permissions')
        .select('*')
        .in('name', permNames)

      permissions = permCatalog?.map((p) => ({
        name: p.name,
        category: p.category || 'General',
        description: p.description || p.name,
      })) ?? permNames.map(n => ({ name: n, category: 'General', description: n }))
    }

    // Security activity from immutable audit logs
    const { data: auditLogs } = await supabase
      .from('audit_logs')
      .select('*')
      .or(`target_user_id.eq.${user.id},actor_id.eq.${user.id}`)
      .order('created_at', { ascending: false })
      .limit(10)

    const securityActivity = (auditLogs || []).map((log: AuditLog) => ({
      id: log.id,
      action: log.action,
      reason: log.reason,
      createdAt: log.created_at,
      metadata: (log.metadata as Record<string, unknown>) || {},
    }))

    const status = (profile.status as 'active' | 'suspended' | 'terminated' | 'invited') || (profile.is_active ? 'active' : 'suspended')

    return {
      user,
      profile,
      roles,
      primaryRole,
      roleLabel,
      accessLevel,
      department: profile.department || 'Technology',
      position: profile.job_title || 'Technical Specialist',
      status,
      permissions,
      securityActivity,
      activeSession: {
        lastActive: profile.last_login_at || profile.updated_at || profile.created_at,
        isCurrent: true,
      },
    }
  } catch (err) {
    console.error('[GET_USER_PROFILE ERROR]:', err)
    return null
  }
}

/**
 * Update personal profile information.
 * Normal users can ONLY update full_name and phone.
 * Privileged fields (role, department, status, joining_date) are strictly forbidden.
 */
export async function updateOwnProfile(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const context = await requireAuth()
    const fullName = formData.get('fullName')?.toString().trim()
    const phone = formData.get('phone')?.toString().trim()

    if (!fullName || fullName.length < 2) {
      return { success: false, error: 'Full name is required (minimum 2 characters).' }
    }

    const supabase = await createClient()
    const now = new Date().toISOString()

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        phone: phone || null,
        updated_at: now,
      })
      .eq('id', context.user.id)

    if (error) {
      return { success: false, error: error.message }
    }

    // Record audit log
    await recordAuditLog({
      action: 'PROFILE_UPDATED',
      targetUserId: context.user.id,
      entityType: 'profile',
      entityId: context.user.id,
      reason: 'Personal profile details updated by user',
      metadata: { fullName, phone },
    })

    return { success: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update profile'
    return { success: false, error: msg }
  }
}

/**
 * Upload profile avatar image to Supabase Storage 'avatars' bucket.
 */
export async function uploadOwnAvatar(formData: FormData): Promise<{ success: boolean; avatarUrl?: string; error?: string }> {
  try {
    const context = await requireAuth()
    const file = formData.get('avatar') as File | null

    if (!file || file.size === 0) {
      return { success: false, error: 'Please select an image file to upload.' }
    }

    // Validate size (< 2MB)
    const MAX_SIZE = 2 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      return { success: false, error: 'Profile image size exceeds 2MB limit.' }
    }

    // Validate MIME type
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!ALLOWED_TYPES.includes(file.type)) {
      return { success: false, error: 'Allowed image formats: JPEG, PNG, WebP, or GIF.' }
    }

    const supabase = await createClient()
    const extension = file.name.split('.').pop() || 'jpg'
    const fileName = `${context.user.id}/${Date.now()}.${extension}`

    const fileBuffer = await file.arrayBuffer()
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        upsert: true,
      })

    if (uploadError) {
      console.error('[STORAGE UPLOAD ERROR]:', uploadError)
      return { success: false, error: uploadError.message }
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)

    // Update profile record
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        avatar_url: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', context.user.id)

    if (profileError) {
      return { success: false, error: profileError.message }
    }

    // Record audit event
    await recordAuditLog({
      action: 'AVATAR_UPDATED',
      targetUserId: context.user.id,
      entityType: 'profile',
      entityId: context.user.id,
      reason: 'User updated profile photo',
      metadata: { avatarUrl: publicUrl },
    })

    return { success: true, avatarUrl: publicUrl }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to upload profile photo'
    return { success: false, error: msg }
  }
}

/**
 * Remove avatar photo.
 */
export async function removeOwnAvatar(): Promise<{ success: boolean; error?: string }> {
  try {
    const context = await requireAuth()
    const supabase = await createClient()

    const { error } = await supabase
      .from('profiles')
      .update({
        avatar_url: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', context.user.id)

    if (error) {
      return { success: false, error: error.message }
    }

    await recordAuditLog({
      action: 'AVATAR_REMOVED',
      targetUserId: context.user.id,
      entityType: 'profile',
      entityId: context.user.id,
      reason: 'User removed profile photo',
    })

    return { success: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to remove avatar'
    return { success: false, error: msg }
  }
}

/**
 * Sign out all other sessions for the user using Supabase Admin API.
 */
export async function revokeOtherSessions(): Promise<{ success: boolean; error?: string }> {
  try {
    const context = await requireAuth()
    const adminClient = createAdminClient()

    try {
      await adminClient.auth.admin.signOut(context.user.id)
    } catch (e) {
      console.warn('[SESSION_REVOCATION_NOTE]:', e)
    }

    await recordAuditLog({
      action: 'SESSION_REVOKED',
      targetUserId: context.user.id,
      entityType: 'auth_session',
      entityId: context.user.id,
      reason: 'User requested session revocation across devices',
    })

    return { success: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to revoke sessions'
    return { success: false, error: msg }
  }
}
