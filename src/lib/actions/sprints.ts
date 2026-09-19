'use server'

import { createClient } from '@/lib/supabase/server'

export async function getSprints(projectId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('sprints')
    .select('*, sprint_tasks(*, tasks(title, status, assigned_to, profiles!tasks_assigned_to_fkey(full_name)))')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function createSprint(sprint: {
  name: string
  project_id: string
  goal?: string
  start_date?: string
  end_date?: string
}) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('sprints').insert(sprint).select().single()
  if (error) throw new Error('Failed to create sprint')
  return data
}

export async function updateSprint(id: string, updates: Record<string, unknown>) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('sprints').update(updates).eq('id', id).select().single()
  if (error) throw new Error('Failed to update sprint')
  return data
}

export async function addTaskToSprint(sprintId: string, taskId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('sprint_tasks').insert({ sprint_id: sprintId, task_id: taskId })
  if (error) throw new Error('Failed to add task to sprint')
}

export async function removeTaskFromSprint(sprintId: string, taskId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('sprint_tasks').delete().eq('sprint_id', sprintId).eq('task_id', taskId)
  if (error) throw new Error('Failed to remove task from sprint')
}
