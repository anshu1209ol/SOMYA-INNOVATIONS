'use server'

import { createClient } from '@/lib/supabase/server'
import type { ProjectStatus, PriorityLevel, ProjectMemberRole } from '@/types'

export async function getProjects(filters?: {
  status?: ProjectStatus
  client_id?: string
  limit?: number
  offset?: number
}) {
  const supabase = await createClient()
  let query = supabase
    .from('projects')
    .select('*, clients(company_name), profiles!projects_project_manager_fkey(full_name)', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.client_id) query = query.eq('client_id', filters.client_id)
  if (filters?.limit) query = query.limit(filters.limit)
  if (filters?.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1)

  const { data, error, count } = await query
  if (error) throw new Error('Failed to fetch projects')
  return { data: data ?? [], count: count ?? 0 }
}

export async function getProject(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*, clients(company_name), project_members(*, profiles(full_name, avatar_url)), project_milestones(*)')
    .eq('id', id)
    .single()
  if (error) return null
  return data
}

export async function createProject(project: {
  name: string
  client_id?: string
  description?: string
  project_manager?: string
  tech_lead?: string
  start_date?: string
  target_date?: string
  priority?: PriorityLevel
  budget?: number
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('projects')
    .insert({ ...project, created_by: user.id })
    .select()
    .single()

  if (error) throw new Error('Failed to create project')

  await supabase.rpc('log_activity', {
    p_user_id: user.id,
    p_action: 'created',
    p_entity_type: 'project',
    p_entity_id: data.id,
    p_description: `Created project: ${project.name}`,
  })

  return data
}

export async function updateProject(id: string, updates: Record<string, unknown>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select().single()
  if (error) throw new Error('Failed to update project')

  await supabase.rpc('log_activity', {
    p_user_id: user.id,
    p_action: 'updated',
    p_entity_type: 'project',
    p_entity_id: id,
    p_description: `Updated project: ${data.name}`,
  })

  return data
}

export async function deleteProject(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw new Error('Failed to delete project')
}

export async function addProjectMember(projectId: string, userId: string, role: ProjectMemberRole) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('project_members')
    .insert({ project_id: projectId, user_id: userId, role })
  if (error) throw new Error('Failed to add project member')
}

export async function removeProjectMember(projectId: string, userId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('project_members')
    .delete()
    .eq('project_id', projectId)
    .eq('user_id', userId)
  if (error) throw new Error('Failed to remove project member')
}

export async function addProjectMilestone(milestone: {
  project_id: string
  title: string
  description?: string
  due_date?: string
  sort_order?: number
}) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('project_milestones').insert(milestone).select().single()
  if (error) throw new Error('Failed to add milestone')
  return data
}

export async function toggleMilestone(id: string, isCompleted: boolean) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('project_milestones')
    .update({
      is_completed: isCompleted,
      completed_at: isCompleted ? new Date().toISOString() : null,
    })
    .eq('id', id)
  if (error) throw new Error('Failed to update milestone')
}
