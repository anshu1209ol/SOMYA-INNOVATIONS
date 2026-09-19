'use server'

import { createClient } from '@/lib/supabase/server'

export async function getReleases(projectId?: string) {
  const supabase = await createClient()
  let query = supabase
    .from('releases')
    .select('*, release_items(*), projects(name)')
    .order('created_at', { ascending: false })

  if (projectId) query = query.eq('project_id', projectId)

  const { data } = await query
  return data ?? []
}

export async function createRelease(release: {
  version: string; release_name: string; project_id?: string
  description?: string; release_date?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('releases').insert({ ...release, created_by: user.id }).select().single()
  if (error) throw new Error('Failed to create release')

  await supabase.rpc('log_activity', {
    p_user_id: user.id, p_action: 'created', p_entity_type: 'release',
    p_entity_id: data.id, p_description: `Created release: ${release.version}`,
  })
  return data
}

export async function updateRelease(id: string, updates: Record<string, unknown>) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('releases').update(updates).eq('id', id).select().single()
  if (error) throw new Error('Failed to update release')
  return data
}
