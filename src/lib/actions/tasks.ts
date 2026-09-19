'use server'

import { createClient } from '@/lib/supabase/server'
import type { TaskStatus, PriorityLevel } from '@/types'

export async function getTasks(filters?: {
  project_id?: string
  assigned_to?: string
  status?: TaskStatus
  priority?: PriorityLevel
  limit?: number
  offset?: number
}) {
  const supabase = await createClient()
  let query = supabase
    .from('tasks')
    .select('*, profiles!tasks_assigned_to_fkey(full_name, avatar_url), projects(name)', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (filters?.project_id) query = query.eq('project_id', filters.project_id)
  if (filters?.assigned_to) query = query.eq('assigned_to', filters.assigned_to)
  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.priority) query = query.eq('priority', filters.priority)
  if (filters?.limit) query = query.limit(filters.limit)
  if (filters?.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1)

  const { data, error, count } = await query
  if (error) throw new Error('Failed to fetch tasks')
  return { data: data ?? [], count: count ?? 0 }
}

export async function getTask(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tasks')
    .select('*, profiles!tasks_assigned_to_fkey(full_name, avatar_url), projects(name), task_comments(*, profiles(full_name)), task_assignees(*, profiles(full_name, avatar_url))')
    .eq('id', id)
    .single()
  if (error) return null
  return data
}

export async function createTask(task: {
  title: string
  description?: string
  project_id?: string
  assigned_to?: string
  priority?: PriorityLevel
  status?: TaskStatus
  due_date?: string
  estimated_hours?: number
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('tasks')
    .insert({ ...task, created_by: user.id })
    .select()
    .single()

  if (error) throw new Error('Failed to create task')

  await supabase.rpc('log_activity', {
    p_user_id: user.id,
    p_action: 'created',
    p_entity_type: 'task',
    p_entity_id: data.id,
    p_description: `Created task: ${task.title}`,
  })

  // Notify assignee
  if (task.assigned_to && task.assigned_to !== user.id) {
    await supabase.from('notifications').insert({
      user_id: task.assigned_to,
      type: 'task_assigned',
      title: 'New Task Assigned',
      message: `You have been assigned: ${task.title}`,
      link: `/admin/tasks`,
    })
  }

  return data
}

export async function updateTask(id: string, updates: Record<string, unknown>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase.from('tasks').update(updates).eq('id', id).select().single()
  if (error) throw new Error('Failed to update task')

  await supabase.rpc('log_activity', {
    p_user_id: user.id,
    p_action: 'updated',
    p_entity_type: 'task',
    p_entity_id: id,
    p_description: `Updated task: ${data.title}`,
  })

  return data
}

export async function updateTaskStatus(id: string, status: TaskStatus) {
  return updateTask(id, { status })
}

export async function deleteTask(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if (error) throw new Error('Failed to delete task')
}

export async function addTaskComment(taskId: string, content: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('task_comments')
    .insert({ task_id: taskId, user_id: user.id, content })
    .select('*, profiles(full_name)')
    .single()
  if (error) throw new Error('Failed to add comment')
  return data
}

export async function getTasksByKanban(projectId?: string) {
  const supabase = await createClient()
  let query = supabase
    .from('tasks')
    .select('*, profiles!tasks_assigned_to_fkey(full_name, avatar_url)')
    .order('created_at', { ascending: false })

  if (projectId) query = query.eq('project_id', projectId)

  const { data, error } = await query
  if (error) return {}

  const kanban: Record<TaskStatus, typeof data> = {
    backlog: [],
    todo: [],
    in_progress: [],
    code_review: [],
    testing: [],
    done: [],
  }

  data?.forEach((task) => {
    kanban[task.status as TaskStatus]?.push(task)
  })

  return kanban
}
