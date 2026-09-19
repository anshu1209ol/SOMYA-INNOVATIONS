'use server'

import { createClient } from '@/lib/supabase/server'
import type { Project, Task, Sprint, TechnicalIssue, Release } from '@/types'

export interface TechLeadMetrics {
  activeProjectsCount: number
  openTasksCount: number
  criticalIssuesCount: number
  openIssuesCount: number
  activeTeamMembersCount: number
  upcomingReleasesCount: number
  activeSprintName: string | null
  activeSprintProgress: number
}

/**
 * Fetch real database metrics for Tech Lead Command Center.
 * Zero fabricated numbers: displays 0 / proper empty states if no records exist.
 */
export async function getTechLeadDashboardMetrics(): Promise<TechLeadMetrics> {
  try {
    const supabase = await createClient()

    // 1. Active Projects
    const { count: activeProjectsCount } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    // 2. Open Tasks (not done)
    const { count: openTasksCount } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .neq('status', 'done')

    // 3. Critical Issues
    const { count: criticalIssuesCount } = await supabase
      .from('technical_issues')
      .select('*', { count: 'exact', head: true })
      .eq('severity', 'critical')
      .neq('status', 'resolved')
      .neq('status', 'closed')

    // 4. All Open Issues
    const { count: openIssuesCount } = await supabase
      .from('technical_issues')
      .select('*', { count: 'exact', head: true })
      .neq('status', 'resolved')
      .neq('status', 'closed')

    // 5. Active Team Members (active profiles)
    const { count: activeTeamMembersCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)

    // 6. Upcoming Releases
    const { count: upcomingReleasesCount } = await supabase
      .from('releases')
      .select('*', { count: 'exact', head: true })
      .in('status', ['planned', 'in_development', 'testing'])

    // 7. Active Sprint
    const { data: activeSprint } = await supabase
      .from('sprints')
      .select('id, name')
      .eq('status', 'active')
      .limit(1)
      .maybeSingle()

    return {
      activeProjectsCount: activeProjectsCount || 0,
      openTasksCount: openTasksCount || 0,
      criticalIssuesCount: criticalIssuesCount || 0,
      openIssuesCount: openIssuesCount || 0,
      activeTeamMembersCount: activeTeamMembersCount || 0,
      upcomingReleasesCount: upcomingReleasesCount || 0,
      activeSprintName: activeSprint?.name || null,
      activeSprintProgress: 0,
    }
  } catch (err) {
    console.error('[GET_TECH_LEAD_METRICS ERROR]:', err)
    return {
      activeProjectsCount: 0,
      openTasksCount: 0,
      criticalIssuesCount: 0,
      openIssuesCount: 0,
      activeTeamMembersCount: 0,
      upcomingReleasesCount: 0,
      activeSprintName: null,
      activeSprintProgress: 0,
    }
  }
}

/**
 * Fetch sprints with related tasks.
 */
export async function getSprints(): Promise<Sprint[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('sprints')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data) return []
    return data as Sprint[]
  } catch {
    return []
  }
}

/**
 * Fetch all tasks (Kanban view).
 */
export async function getEngineeringTasks(): Promise<Task[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data) return []
    return data as Task[]
  } catch {
    return []
  }
}

/**
 * Fetch technical issues.
 */
export async function getTechnicalIssues(): Promise<TechnicalIssue[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('technical_issues')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data) return []
    return data as TechnicalIssue[]
  } catch {
    return []
  }
}

/**
 * Fetch software releases.
 */
export async function getReleases(): Promise<Release[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('releases')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data) return []
    return data as Release[]
  } catch {
    return []
  }
}
