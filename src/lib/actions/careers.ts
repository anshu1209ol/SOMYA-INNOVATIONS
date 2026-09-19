'use server'

import { createClient } from '@/lib/supabase/server'

/** Get published job positions for public careers page */
export async function getPublishedPositions() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('job_positions')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  return data ?? []
}

/** Get all positions (admin) */
export async function getAllPositions() {
  const supabase = await createClient()
  const { data } = await supabase.from('job_positions').select('*').order('created_at', { ascending: false })
  return data ?? []
}

export async function createPosition(position: {
  title: string; department?: string; location?: string
  employment_type?: 'full_time' | 'part_time' | 'contract' | 'internship'
  description?: string; requirements?: string[]
}) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('job_positions').insert(position).select().single()
  if (error) throw new Error('Failed to create position')
  return data
}

export async function updatePosition(id: string, updates: Record<string, unknown>) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('job_positions').update(updates).eq('id', id).select().single()
  if (error) throw new Error('Failed to update position')
  return data
}

export async function submitApplication(application: {
  job_id?: string; name: string; email: string; phone?: string; resume_url?: string; cover_letter?: string
}) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('job_applications').insert(application).select().single()
  if (error) throw new Error('Failed to submit application')
  return data
}

export async function getApplications(jobId?: string) {
  const supabase = await createClient()
  let query = supabase.from('job_applications').select('*, job_positions(title)').order('created_at', { ascending: false })
  if (jobId) query = query.eq('job_id', jobId)
  const { data } = await query
  return data ?? []
}
