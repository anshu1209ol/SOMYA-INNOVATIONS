'use server'

import { createClient } from '@/lib/supabase/server'
import type { QuotationStatus } from '@/types'

export async function getQuotations(filters?: {
  status?: QuotationStatus
  client_id?: string
  limit?: number
  offset?: number
}) {
  const supabase = await createClient()
  let query = supabase
    .from('quotations')
    .select('*, clients(company_name), profiles!quotations_created_by_fkey(full_name)', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.client_id) query = query.eq('client_id', filters.client_id)
  if (filters?.limit) query = query.limit(filters.limit)
  if (filters?.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1)

  const { data, error, count } = await query
  if (error) throw new Error('Failed to fetch quotations')
  return { data: data ?? [], count: count ?? 0 }
}

export async function getQuotation(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('quotations')
    .select('*, clients(company_name, contact_name, email), quotation_items(*)')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

export async function createQuotation(quotation: {
  client_id?: string
  lead_id?: string
  title: string
  description?: string
  valid_until?: string
  notes?: string
  items: Array<{
    item_type?: string
    description: string
    quantity: number
    unit_price: number
    discount?: number
    tax?: number
    sort_order?: number
  }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Generate quotation number server-side
  const { data: qtnNumber } = await supabase.rpc('generate_quotation_number')

  const { items, ...quotationData } = quotation

  const { data, error } = await supabase
    .from('quotations')
    .insert({
      ...quotationData,
      quotation_number: qtnNumber,
      created_by: user.id,
    })
    .select()
    .single()

  if (error) throw new Error('Failed to create quotation')

  // Insert items
  if (items.length > 0) {
    const itemsWithIds = items.map((item, idx) => ({
      quotation_id: data.id,
      item_type: item.item_type || 'service',
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      discount: item.discount || 0,
      tax: item.tax || 0,
      total: (item.quantity * item.unit_price) - (item.discount || 0) + (item.tax || 0),
      sort_order: item.sort_order ?? idx,
    }))

    await supabase.from('quotation_items').insert(itemsWithIds)
  }

  // Calculate totals server-side
  await supabase.rpc('calculate_quotation_totals', { p_quotation_id: data.id })

  // Record status history
  await supabase.from('quotation_status_history').insert({
    quotation_id: data.id,
    new_status: 'draft',
    changed_by: user.id,
  })

  await supabase.rpc('log_activity', {
    p_user_id: user.id,
    p_action: 'created',
    p_entity_type: 'quotation',
    p_entity_id: data.id,
    p_description: `Created quotation: ${qtnNumber}`,
  })

  // Re-fetch with calculated totals
  return getQuotation(data.id)
}

export async function updateQuotationStatus(id: string, newStatus: QuotationStatus, notes?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Get old status
  const { data: old } = await supabase.from('quotations').select('status, quotation_number').eq('id', id).single()

  const { error } = await supabase
    .from('quotations')
    .update({ status: newStatus })
    .eq('id', id)

  if (error) throw new Error('Failed to update quotation status')

  // Record in history
  await supabase.from('quotation_status_history').insert({
    quotation_id: id,
    old_status: old?.status,
    new_status: newStatus,
    changed_by: user.id,
    notes,
  })

  await supabase.rpc('log_activity', {
    p_user_id: user.id,
    p_action: 'status_changed',
    p_entity_type: 'quotation',
    p_entity_id: id,
    p_description: `Quotation ${old?.quotation_number} status: ${old?.status} → ${newStatus}`,
  })
}

export async function deleteQuotation(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('quotations').delete().eq('id', id)
  if (error) throw new Error('Failed to delete quotation')
}
