'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getCurrentUserContext, requirePermission, requireRole } from '@/lib/auth/guards'
import { recordAuditLog } from '@/lib/actions/audit'
import type { AppRole, Profile, Employee, Project, Task, AttendancePunch } from '@/types'

export interface DirectoryUser {
  id: string
  fullName: string
  email: string
  role: AppRole
  department: string
  position: string
  status: 'invited' | 'active' | 'suspended' | 'terminated'
  lastLogin: string | null
  createdAt: string
  phone: string | null
  avatarUrl: string | null
  isTerminated: boolean
  terminationReason?: string | null
  terminatedAt?: string | null
}

export interface UserDeepDive {
  profile: Profile
  roles: AppRole[]
  permissions: string[]
  employeeRecord?: Employee | null
  projects: Project[]
  tasks: Task[]
  recentPunches: AttendancePunch[]
  auditHistory: {
    id: string
    action: string
    actorName: string
    reason: string | null
    createdAt: string
    metadata: Record<string, unknown>
  }[]
}

/**
 * Fetch directory users with optional filtering and search.
 */
export async function getDirectoryUsers(filter?: {
  role?: string
  department?: string
  status?: string
  search?: string
}): Promise<DirectoryUser[]> {
  try {
    const supabase = await createClient()

    // 1. Fetch profiles
    let query = supabase.from('profiles').select('*').order('created_at', { ascending: false })

    if (filter?.status && filter.status !== 'ALL') {
      query = query.eq('status', filter.status as 'active' | 'invited' | 'suspended' | 'terminated')
    }
    if (filter?.department && filter.department !== 'ALL') {
      query = query.ilike('department', `%${filter.department}%`)
    }

    const { data: profiles, error: profileError } = await query

    if (profileError || !profiles) {
      // If table is not yet populated or empty, fetch from employees directory as fallback
      const { data: employees } = await supabase.from('employees').select('*')
      if (employees && employees.length > 0) {
        return employees.map((emp) => ({
          id: emp.id,
          fullName: emp.name,
          email: `${emp.name.toLowerCase().replace(/\s+/g, '.')}@somyainnovations.in`,
          role: (emp.role.toLowerCase().includes('lead') ? 'tech_lead' : 'employee') as AppRole,
          department: emp.dept || 'Engineering',
          position: emp.role,
          status: 'active' as const,
          lastLogin: emp.check_in ? `Today, ${emp.check_in}` : null,
          createdAt: emp.created_at || new Date().toISOString(),
          phone: null,
          avatarUrl: emp.avatar || null,
          isTerminated: false,
        }))
      }
      return []
    }

    // 2. Fetch user roles
    const { data: userRoles } = await supabase.from('user_roles').select('*')

    const roleMap = new Map<string, AppRole>()
    userRoles?.forEach((ur) => {
      roleMap.set(ur.user_id, ur.role)
    })

    let results: DirectoryUser[] = profiles.map((p) => {
      const assignedRole = roleMap.get(p.id) || 'employee'
      const status = (p.status as 'invited' | 'active' | 'suspended' | 'terminated') || (p.is_active ? 'active' : 'suspended')

      return {
        id: p.id,
        fullName: p.full_name || 'Unnamed Staff Member',
        email: p.email || 'No email registered',
        role: assignedRole,
        department: p.department || 'Unassigned',
        position: p.job_title || 'Team Member',
        status,
        lastLogin: p.last_login_at || null,
        createdAt: p.created_at,
        phone: p.phone || null,
        avatarUrl: p.avatar_url || null,
        isTerminated: status === 'terminated',
        terminationReason: p.termination_reason || null,
        terminatedAt: p.terminated_at || null,
      }
    })

    // Apply role filter in memory
    if (filter?.role && filter.role !== 'ALL') {
      results = results.filter((u) => u.role === filter.role)
    }

    // Apply text search
    if (filter?.search && filter.search.trim()) {
      const q = filter.search.toLowerCase().trim()
      results = results.filter(
        (u) =>
          u.fullName.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.department.toLowerCase().includes(q) ||
          u.position.toLowerCase().includes(q)
      )
    }

    return results
  } catch (err) {
    console.error('[GET_DIRECTORY_USERS EXCEPTION]:', err)
    return []
  }
}

/**
 * Fetch complete deep-dive profile of a single user.
 */
export async function getUserProfileDetails(userId: string): Promise<UserDeepDive | null> {
  try {
    const supabase = await createClient()

    // 1. Profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (!profile) {
      // Check if employee exists by ID
      const { data: emp } = await supabase
        .from('employees')
        .select('*')
        .eq('id', userId)
        .single()

      if (emp) {
        return {
          profile: {
            id: emp.id,
            full_name: emp.name,
            email: `${emp.name.toLowerCase().replace(/\s+/g, '.')}@somyainnovations.in`,
            phone: null,
            avatar_url: emp.avatar || null,
            job_title: emp.role,
            department: emp.dept,
            is_active: emp.status !== 'Absent',
            status: 'active',
            created_at: emp.created_at || new Date().toISOString(),
            updated_at: emp.updated_at || new Date().toISOString(),
          },
          roles: ['employee'],
          permissions: ['tasks.view', 'projects.view'],
          employeeRecord: emp,
          projects: [],
          tasks: [],
          recentPunches: [],
          auditHistory: [],
        }
      }
      return null
    }

    // 2. Roles
    const { data: userRoles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)

    const roles = userRoles?.map((r) => r.role) ?? []

    // 3. Permissions
    const { data: rolePerms } = await supabase
      .from('role_permissions')
      .select('permission_name')
      .in('role', roles.length > 0 ? roles : ['employee'])

    const permissions = Array.from(new Set(rolePerms?.map((p) => p.permission_name) ?? []))

    // 4. Employee record if linked
    const { data: employeeRecord } = await supabase
      .from('employees')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()

    // 5. Assigned projects
    const { data: projectMemberships } = await supabase
      .from('project_members')
      .select('project_id')
      .eq('user_id', userId)

    let projects: Project[] = []
    if (projectMemberships && projectMemberships.length > 0) {
      const projectIds = projectMemberships.map((p) => p.project_id)
      const { data: fetchedProjects } = await supabase
        .from('projects')
        .select('*')
        .in('id', projectIds)
      projects = (fetchedProjects as Project[]) || []
    }

    // 6. Assigned tasks
    const { data: tasks } = await supabase
      .from('tasks')
      .select('*')
      .eq('assigned_to', userId)
      .order('created_at', { ascending: false })

    // 7. Recent attendance punches
    let recentPunches: AttendancePunch[] = []
    if (employeeRecord) {
      const { data: punches } = await supabase
        .from('attendance_punches')
        .select('*')
        .eq('employee_id', employeeRecord.id)
        .order('punch_in', { ascending: false })
        .limit(10)
      recentPunches = (punches as AttendancePunch[]) || []
    }

    // 8. Audit logs referencing this user
    const { data: auditLogs } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('target_user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20)

    const auditHistory = (auditLogs || []).map((log) => ({
      id: log.id,
      action: log.action,
      actorName: 'Administrative Authority',
      reason: log.reason,
      createdAt: log.created_at,
      metadata: log.metadata,
    }))

    return {
      profile,
      roles,
      permissions,
      employeeRecord,
      projects,
      tasks: (tasks as Task[]) || [],
      recentPunches,
      auditHistory,
    }
  } catch (err) {
    console.error('[GET_USER_PROFILE_DETAILS EXCEPTION]:', err)
    return null
  }
}

/**
 * Terminate a user account with strict safeguards:
 * - Caller must be Tech Lead (or hold users.terminate permission)
 * - Self-termination is strictly prohibited
 * - Exact typed confirmation ("TERMINATE") is mandatory
 * - Reason is mandatory
 * - Creates immutable audit record
 * - Preserves all historical projects, tasks, attendance, comments
 * - Revokes active sessions and roles
 */
export async function terminateUser(
  targetUserId: string,
  reason: string,
  typedConfirmation: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const callerContext = await requireRole('tech_lead')

    // 1. Self-protection safeguard
    if (callerContext.user.id === targetUserId) {
      return {
        success: false,
        error: 'Security Exception: You cannot terminate your own account. Privileged self-termination is blocked.',
      }
    }

    // 2. Exact typed confirmation verification
    if (typedConfirmation.trim() !== 'TERMINATE') {
      return {
        success: false,
        error: 'Confirmation mismatch: You must type exactly "TERMINATE" to authorize this action.',
      }
    }

    // 3. Mandatory reason check
    if (!reason || reason.trim().length < 5) {
      return {
        success: false,
        error: 'A detailed termination justification is required for the permanent audit ledger (minimum 5 characters).',
      }
    }

    let adminClient
    try {
      adminClient = createAdminClient()
    } catch {
      return {
        success: false,
        error: 'Server configuration error: Supabase admin credentials required for session revocation.',
      }
    }

    const now = new Date().toISOString()

    // 4. Update profile lifecycle fields
    const { error: updateError } = await adminClient
      .from('profiles')
      .update({
        status: 'terminated',
        is_active: false,
        terminated_at: now,
        terminated_by: callerContext.user.id,
        termination_reason: reason.trim(),
        updated_at: now,
      })
      .eq('id', targetUserId)

    if (updateError) {
      return { success: false, error: `Failed to update profile status: ${updateError.message}` }
    }

    // 5. Remove active user roles to revoke application permissions
    await adminClient
      .from('user_roles')
      .delete()
      .eq('user_id', targetUserId)

    // Revoke attendance access / update employee record while preserving historical records
    await adminClient
      .from('employees')
      .update({
        status: 'Absent',
        location: 'Terminated - Access Revoked',
        updated_at: now
      })
      .eq('user_id', targetUserId)

    // 6. Revoke active auth sessions via Admin API
    try {
      await adminClient.auth.admin.signOut(targetUserId)
    } catch (e) {
      console.warn('[SESSION_REVOCATION_NOTE]: Could not trigger auth signOut:', e)
    }

    // 7. Write immutable audit ledger record
    await recordAuditLog({
      action: 'USER_TERMINATED',
      targetUserId,
      entityType: 'profile',
      entityId: targetUserId,
      reason: reason.trim(),
      metadata: {
        authorizedBy: callerContext.user.email,
        authorizedRole: 'tech_lead',
        terminatedAt: now,
        confirmationTyped: typedConfirmation,
      },
    })

    return { success: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to execute user termination'
    return { success: false, error: msg }
  }
}

/**
 * Suspend user access temporarily.
 */
export async function suspendUser(
  targetUserId: string,
  reason: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const callerContext = await requireRole('tech_lead')

    if (callerContext.user.id === targetUserId) {
      return { success: false, error: 'Self-suspension is prohibited.' }
    }

    const adminClient = createAdminClient()
    const now = new Date().toISOString()

    const { error } = await adminClient
      .from('profiles')
      .update({
        status: 'suspended',
        is_active: false,
        suspended_at: now,
        suspended_by: callerContext.user.id,
        suspension_reason: reason.trim(),
        updated_at: now,
      })
      .eq('id', targetUserId)

    if (error) {
      return { success: false, error: error.message }
    }

    // Revoke sessions
    try {
      await adminClient.auth.admin.signOut(targetUserId)
    } catch (e) {
      console.warn('[SESSION_REVOCATION_NOTE]:', e)
    }

    await recordAuditLog({
      action: 'USER_SUSPENDED',
      targetUserId,
      entityType: 'profile',
      entityId: targetUserId,
      reason,
      metadata: { authorizedBy: callerContext.user.email },
    })

    return { success: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to suspend user'
    return { success: false, error: msg }
  }
}

/**
 * Restore an inactive/suspended user back to active status.
 */
export async function restoreUser(targetUserId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const callerContext = await requireRole('tech_lead')
    const adminClient = createAdminClient()
    const now = new Date().toISOString()

    const { error } = await adminClient
      .from('profiles')
      .update({
        status: 'active',
        is_active: true,
        suspended_at: null,
        suspended_by: null,
        suspension_reason: null,
        terminated_at: null,
        terminated_by: null,
        termination_reason: null,
        updated_at: now,
      })
      .eq('id', targetUserId)

    if (error) {
      return { success: false, error: error.message }
    }

    await recordAuditLog({
      action: 'USER_RESTORED',
      targetUserId,
      entityType: 'profile',
      entityId: targetUserId,
      reason: 'Reinstated by Tech Lead',
      metadata: { authorizedBy: callerContext.user.email },
    })

    return { success: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to restore user'
    return { success: false, error: msg }
  }
}

/**
 * Assign or update a user's role.
 */
export async function assignUserRole(
  targetUserId: string,
  newRole: AppRole
): Promise<{ success: boolean; error?: string }> {
  try {
    const callerContext = await requireRole('tech_lead')
    const adminClient = createAdminClient()

    // Delete existing roles
    await adminClient.from('user_roles').delete().eq('user_id', targetUserId)

    // Insert new role
    const { error } = await adminClient.from('user_roles').insert({
      user_id: targetUserId,
      role: newRole,
      assigned_by: callerContext.user.id,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    await recordAuditLog({
      action: 'ROLE_CHANGED',
      targetUserId,
      entityType: 'user_role',
      entityId: targetUserId,
      reason: `Role updated to ${newRole}`,
      metadata: { newRole, authorizedBy: callerContext.user.email },
    })

    return { success: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update user role'
    return { success: false, error: msg }
  }
}

/**
 * Update user department and position.
 */
export async function updateUserDepartmentPosition(
  targetUserId: string,
  department: string,
  position: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await requirePermission('users.edit')
    const adminClient = createAdminClient()

    const { error } = await adminClient
      .from('profiles')
      .update({
        department,
        job_title: position,
        updated_at: new Date().toISOString(),
      })
      .eq('id', targetUserId)

    if (error) {
      return { success: false, error: error.message }
    }

    await recordAuditLog({
      action: 'USER_UPDATED',
      targetUserId,
      entityType: 'profile',
      entityId: targetUserId,
      reason: `Department/Position updated to ${department} / ${position}`,
    })

    return { success: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update department/position'
    return { success: false, error: msg }
  }
}
