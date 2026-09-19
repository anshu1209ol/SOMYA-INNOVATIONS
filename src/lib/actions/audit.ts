'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getCurrentUserContext } from '@/lib/auth/guards'
import type { AuditLog } from '@/types'

export interface LogAuditParams {
  action: string
  targetUserId?: string | null
  entityType: string
  entityId?: string | null
  reason?: string | null
  metadata?: Record<string, unknown>
}

/**
 * Record an immutable audit log entry.
 * Can be called with user context or fallback to service-level logging.
 */
export async function recordAuditLog(params: LogAuditParams) {
  try {
    const context = await getCurrentUserContext()
    const actorId = context?.user.id || null

    let client
    try {
      client = createAdminClient()
    } catch {
      client = await createClient()
    }

    const { data, error } = await client
      .from('audit_logs')
      .insert({
        actor_id: actorId,
        action: params.action,
        target_user_id: params.targetUserId || null,
        entity_type: params.entityType,
        entity_id: params.entityId || null,
        reason: params.reason || null,
        metadata: params.metadata || {},
      })
      .select()
      .single()

    if (error) {
      console.error('[AUDIT ERROR] Failed to record audit log:', error.message)
      return { success: false, error: error.message }
    }

    return { success: true, data: data as AuditLog }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown audit error'
    console.error('[AUDIT EXCEPTION]:', msg)
    return { success: false, error: msg }
  }
}

/**
 * Fetch immutable audit logs for compliance review.
 * Only accessible to Tech Lead, CEO, and Admin.
 */
export async function getAuditLogs(limit = 100): Promise<AuditLog[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error || !data) {
      return []
    }

    return data as AuditLog[]
  } catch {
    return []
  }
}
