'use server'

import { createClient } from '@/lib/supabase/server'
import type { Lead, LeadStatus, PriorityLevel } from '@/types'

export async function getLeads(filters?: {
  status?: LeadStatus
  priority?: PriorityLevel
  assigned_to?: string
  limit?: number
  offset?: number
}) {
  const supabase = await createClient()
  let query = supabase
    .from('leads')
    .select('*, profiles!leads_assigned_to_fkey(full_name)', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.priority) query = query.eq('priority', filters.priority)
  if (filters?.assigned_to) query = query.eq('assigned_to', filters.assigned_to)
  if (filters?.limit) query = query.limit(filters.limit)
  if (filters?.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1)

  const { data, error, count } = await query
  if (error) throw new Error('Failed to fetch leads')
  return { data: data ?? [], count: count ?? 0 }
}

export async function getLead(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('leads')
    .select('*, profiles!leads_assigned_to_fkey(full_name)')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

export async function createLead(lead: {
  name: string
  company?: string
  email?: string
  phone?: string
  source?: string
  service?: string
  description?: string
  priority?: PriorityLevel
  estimated_value?: number
  assigned_to?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('leads')
    .insert({ ...lead, created_by: user.id })
    .select()
    .single()

  if (error) throw new Error('Failed to create lead')

  // Log activity
  await supabase.from('lead_activities').insert({
    lead_id: data.id,
    user_id: user.id,
    action: 'created',
    description: `Lead "${lead.name}" created`,
  })

  // Log to activity_logs
  await supabase.rpc('log_activity', {
    p_user_id: user.id,
    p_action: 'created',
    p_entity_type: 'lead',
    p_entity_id: data.id,
    p_description: `Created lead: ${lead.name}`,
  })

  return data
}

export async function updateLead(id: string, updates: Partial<Lead>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Get old lead for activity tracking
  const { data: oldLead } = await supabase.from('leads').select('status, name').eq('id', id).single()

  const { data, error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new Error('Failed to update lead')

  // Track status change
  if (oldLead && updates.status && oldLead.status !== updates.status) {
    await supabase.from('lead_activities').insert({
      lead_id: id,
      user_id: user.id,
      action: 'status_changed',
      description: `Status changed from ${oldLead.status} to ${updates.status}`,
      metadata: { old_status: oldLead.status, new_status: updates.status },
    })
  }

  await supabase.rpc('log_activity', {
    p_user_id: user.id,
    p_action: 'updated',
    p_entity_type: 'lead',
    p_entity_id: id,
    p_description: `Updated lead: ${oldLead?.name || id}`,
  })

  return data
}

export async function deleteLead(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('leads').delete().eq('id', id)
  if (error) throw new Error('Failed to delete lead')
}

export async function getLeadActivities(leadId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('lead_activities')
    .select('*, profiles(full_name)')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })

  if (error) return []
  return data ?? []
}

export async function addLeadNote(leadId: string, content: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('lead_notes')
    .insert({ lead_id: leadId, user_id: user.id, content })
    .select()
    .single()

  if (error) throw new Error('Failed to add note')

  await supabase.from('lead_activities').insert({
    lead_id: leadId,
    user_id: user.id,
    action: 'note_added',
    description: 'Added a note',
  })

  return data
}

export async function getLeadPipelineStats() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('leads')
    .select('status')

  if (error) return {}

  const stats: Record<string, number> = {}
  data?.forEach((lead) => {
    stats[lead.status] = (stats[lead.status] || 0) + 1
  })
  return stats
}
