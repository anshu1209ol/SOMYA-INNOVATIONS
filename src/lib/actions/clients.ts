'use server'

import { createClient } from '@/lib/supabase/server'
import type { ClientStatus } from '@/types'

export async function getClients(filters?: {
  status?: ClientStatus
  limit?: number
  offset?: number
}) {
  const supabase = await createClient()
  let query = supabase
    .from('clients')
    .select('*, profiles!clients_assigned_account_manager_fkey(full_name)', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.limit) query = query.limit(filters.limit)
  if (filters?.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1)

  const { data, error, count } = await query
  if (error) throw new Error('Failed to fetch clients')
  return { data: data ?? [], count: count ?? 0 }
}

export async function getClient(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('clients').select('*').eq('id', id).single()
  if (error) return null
  return data
}

export async function createClient_action(client: {
  company_name: string
  contact_name?: string
  email?: string
  phone?: string
  website?: string
  industry?: string
  address?: string
  city?: string
  state?: string
  country?: string
  status?: ClientStatus
  assigned_account_manager?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('clients')
    .insert({ ...client, created_by: user.id })
    .select()
    .single()

  if (error) throw new Error('Failed to create client')

  await supabase.rpc('log_activity', {
    p_user_id: user.id,
    p_action: 'created',
    p_entity_type: 'client',
    p_entity_id: data.id,
    p_description: `Created client: ${client.company_name}`,
  })

  return data
}

export async function updateClient_action(id: string, updates: Record<string, unknown>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase.from('clients').update(updates).eq('id', id).select().single()
  if (error) throw new Error('Failed to update client')

  await supabase.rpc('log_activity', {
    p_user_id: user.id,
    p_action: 'updated',
    p_entity_type: 'client',
    p_entity_id: id,
    p_description: `Updated client: ${data.company_name}`,
  })

  return data
}

export async function deleteClient_action(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('clients').delete().eq('id', id)
  if (error) throw new Error('Failed to delete client')
}
