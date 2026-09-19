'use server'

import { createClient } from '@/lib/supabase/server'

export async function getActivityLogs(filters?: {
  entity_type?: string
  user_id?: string
  limit?: number
  offset?: number
}) {
  const supabase = await createClient()
  let query = supabase
    .from('activity_logs')
    .select('*, profiles(full_name)', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (filters?.entity_type) query = query.eq('entity_type', filters.entity_type)
  if (filters?.user_id) query = query.eq('user_id', filters.user_id)
  if (filters?.limit) query = query.limit(filters.limit)
  if (filters?.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1)

  const { data, error, count } = await query
  if (error) return { data: [], count: 0 }
  return { data: data ?? [], count: count ?? 0 }
}
