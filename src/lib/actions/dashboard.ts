'use server'

import { createClient } from '@/lib/supabase/server'

/**
 * Admin Dashboard — Real aggregate statistics from the database.
 * Shows "No data available" if counts are zero, never fabricated numbers.
 */
export async function getAdminDashboardStats() {
  const supabase = await createClient()

  const [leads, clients, quotations, projects, tasks, recentActivity, contactSubmissions, quoteRequests] =
    await Promise.all([
      supabase.from('leads').select('id, status', { count: 'exact' }),
      supabase.from('clients').select('id, status', { count: 'exact' }).eq('status', 'active'),
      supabase.from('quotations').select('id, status', { count: 'exact' }).in('status', ['draft', 'sent', 'viewed', 'negotiation']),
      supabase.from('projects').select('id, status', { count: 'exact' }).eq('status', 'active'),
      supabase.from('tasks').select('id, status', { count: 'exact' }).in('status', ['backlog', 'todo', 'in_progress', 'code_review', 'testing']),
      supabase.from('activity_logs').select('*, profiles(full_name)').order('created_at', { ascending: false }).limit(10),
      supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(5),
      supabase.from('quote_requests').select('*').order('created_at', { ascending: false }).limit(5),
    ])

  // Lead pipeline breakdown
  const leadPipeline: Record<string, number> = {}
  leads.data?.forEach((l) => {
    leadPipeline[l.status] = (leadPipeline[l.status] || 0) + 1
  })

  return {
    totalLeads: leads.count ?? 0,
    activeClients: clients.count ?? 0,
    openQuotations: quotations.count ?? 0,
    activeProjects: projects.count ?? 0,
    pendingTasks: tasks.count ?? 0,
    leadPipeline,
    recentActivity: recentActivity.data ?? [],
    recentEnquiries: [...(contactSubmissions.data ?? []), ...(quoteRequests.data ?? [])]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5),
  }
}

/**
 * CEO Dashboard — Executive-level aggregate metrics.
 */
export async function getCeoDashboardStats() {
  const supabase = await createClient()

  const [leads, clients, projects, announcements] = await Promise.all([
    supabase.from('leads').select('id, status, estimated_value', { count: 'exact' }),
    supabase.from('clients').select('id, status', { count: 'exact' }),
    supabase.from('projects').select('id, status, progress, name', { count: 'exact' }),
    supabase.from('announcements').select('*').eq('type', 'executive').eq('is_active', true).order('created_at', { ascending: false }).limit(5),
  ])

  // Pipeline value
  const pipelineValue = leads.data
    ?.filter((l) => !['won', 'lost'].includes(l.status))
    .reduce((sum, l) => sum + (Number(l.estimated_value) || 0), 0) ?? 0

  // Won leads
  const wonLeads = leads.data?.filter((l) => l.status === 'won').length ?? 0
  const totalProcessed = leads.data?.filter((l) => ['won', 'lost'].includes(l.status)).length ?? 0
  const conversionRate = totalProcessed > 0 ? Math.round((wonLeads / totalProcessed) * 100) : 0

  // Active clients
  const activeClients = clients.data?.filter((c) => c.status === 'active').length ?? 0

  // Project health
  const activeProjects = projects.data?.filter((p) => p.status === 'active') ?? []

  return {
    pipelineValue,
    activeClients,
    totalLeads: leads.count ?? 0,
    conversionRate,
    activeProjects,
    totalProjects: projects.count ?? 0,
    announcements: announcements.data ?? [],
  }
}

/**
 * Tech Lead Dashboard — Technical operations metrics.
 */
export async function getTechLeadDashboardStats() {
  const supabase = await createClient()

  const [projects, sprints, issues, tasks, releases, recentActivity] = await Promise.all([
    supabase.from('projects').select('id, name, status, progress').eq('status', 'active'),
    supabase.from('sprints').select('id, name, status, project_id').eq('status', 'active'),
    supabase.from('technical_issues').select('id, severity, status', { count: 'exact' }).in('status', ['open', 'investigating', 'in_progress']),
    supabase.from('tasks').select('id, status', { count: 'exact' }).in('status', ['backlog', 'todo', 'in_progress', 'code_review', 'testing']),
    supabase.from('releases').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('activity_logs').select('*, profiles(full_name)').in('entity_type', ['task', 'project', 'technical_issue', 'release', 'sprint']).order('created_at', { ascending: false }).limit(10),
  ])

  const criticalIssues = issues.data?.filter((i) => i.severity === 'critical').length ?? 0
  const highIssues = issues.data?.filter((i) => i.severity === 'high').length ?? 0

  return {
    activeProjects: projects.data ?? [],
    activeSprints: sprints.data ?? [],
    openIssues: issues.count ?? 0,
    criticalIssues,
    highIssues,
    pendingTasks: tasks.count ?? 0,
    recentReleases: releases.data ?? [],
    recentActivity: recentActivity.data ?? [],
  }
}
