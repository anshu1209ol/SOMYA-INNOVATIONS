'use server'

import { createClient } from '@/lib/supabase/server'

/** Get all active services for public display */
export async function getServices() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
  return data ?? []
}

/** Get all services including inactive (admin) */
export async function getAllServices() {
  const supabase = await createClient()
  const { data } = await supabase.from('services').select('*').order('display_order', { ascending: true })
  return data ?? []
}

export async function getServiceBySlug(slug: string) {
  const supabase = await createClient()
  const { data } = await supabase.from('services').select('*').eq('slug', slug).single()
  return data
}

export async function createService(service: {
  name: string; slug: string; description?: string; short_description?: string
  icon?: string; image?: string; features?: string[]; display_order?: number
}) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('services').insert(service).select().single()
  if (error) throw new Error('Failed to create service')
  return data
}

export async function updateService(id: string, updates: Record<string, unknown>) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('services').update(updates).eq('id', id).select().single()
  if (error) throw new Error('Failed to update service')
  return data
}
