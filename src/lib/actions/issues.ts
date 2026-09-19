'use server'

import { createClient } from '@/lib/supabase/server'
import type { IssueSeverity, IssueStatus } from '@/types'

export async function getIssues(filters?: {
  project_id?: string
  severity?: IssueSeverity
  status?: IssueStatus
  limit?: number
}) {
  const supabase = await createClient()
  let query = supabase
    .from('technical_issues')
    .select('*, profiles!technical_issues_assigned_to_fkey(full_name), projects(name)', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (filters?.project_id) query = query.eq('project_id', filters.project_id)
  if (filters?.severity) query = query.eq('severity', filters.severity)
  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.limit) query = query.limit(filters.limit)

  const { data, error, count } = await query
  if (error) throw new Error('Failed to fetch issues')
  return { data: data ?? [], count: count ?? 0 }
}

export async function createIssue(issue: {
  title: string
  description?: string
  project_id?: string
  severity?: IssueSeverity
  assigned_to?: string
  environment?: string
  steps_to_reproduce?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('technical_issues')
    .insert({ ...issue, reported_by: user.id })
    .select().single()
  if (error) throw new Error('Failed to create issue')

  await supabase.rpc('log_activity', {
    p_user_id: user.id,
    p_action: 'created',
    p_entity_type: 'technical_issue',
    p_entity_id: data.id,
    p_description: `Reported issue: ${issue.title}`,
  })

  return data
}

export async function updateIssue(id: string, updates: Record<string, unknown>) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('technical_issues').update(updates).eq('id', id).select().single()
  if (error) throw new Error('Failed to update issue')
  return data
}

export async function addIssueComment(issueId: string, content: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('issue_comments')
    .insert({ issue_id: issueId, user_id: user.id, content })
    .select('*, profiles(full_name)').single()
  if (error) throw new Error('Failed to add comment')
  return data
}
