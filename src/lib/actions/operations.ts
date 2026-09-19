'use server'

import { createClient } from '@/lib/supabase/server'
import type { Lead, Client, Quotation, Project, Task } from '@/types'

export interface OperationsMetrics {
  activeLeadsCount: number
  activeClientsCount: number
  activeProjectsCount: number
  pendingQuotationsCount: number
  openTasksCount: number
  attendanceToday: {
    present: number
    absent: number
    late: number
    onLeave: number
    total: number
  }
}

export interface CeoMetrics {
  activeClientsCount: number
  activeProjectsCount: number
  openOpportunitiesCount: number
  pendingQuotationsCount: number
  totalWorkforceCount: number
  activeProjects: Project[]
}

/**
 * Fetch live operations metrics for Admin Dashboard.
 */
export async function getOperationsMetrics(): Promise<OperationsMetrics> {
  try {
    const supabase = await createClient()

    // 1. Leads
    const { count: leadsCount } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .neq('status', 'lost')
      .neq('status', 'won')

    // 2. Clients
    const { count: clientsCount } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    // 3. Projects
    const { count: projectsCount } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    // 4. Pending Quotations
    const { count: quotationsCount } = await supabase
      .from('quotations')
      .select('*', { count: 'exact', head: true })
      .in('status', ['draft', 'sent', 'viewed', 'negotiation'])

    // 5. Open Tasks
    const { count: tasksCount } = await supabase
      .from('tasks')
      .select('*', { count: 'exact', head: true })
      .neq('status', 'done')

    // 6. Attendance counts from employees table
    const { data: employees } = await supabase
      .from('employees')
      .select('status')

    const attendance = {
      present: 0,
      absent: 0,
      late: 0,
      onLeave: 0,
      total: employees?.length || 0,
    }

    employees?.forEach((e) => {
      if (e.status === 'Present' || e.status === 'Remote') attendance.present++
      else if (e.status === 'Late') attendance.late++
      else if (e.status === 'On Leave') attendance.onLeave++
      else attendance.absent++
    })

    return {
      activeLeadsCount: leadsCount || 0,
      activeClientsCount: clientsCount || 0,
      activeProjectsCount: projectsCount || 0,
      pendingQuotationsCount: quotationsCount || 0,
      openTasksCount: tasksCount || 0,
      attendanceToday: attendance,
    }
  } catch (err) {
    console.error('[OPERATIONS_METRICS EXCEPTION]:', err)
    return {
      activeLeadsCount: 0,
      activeClientsCount: 0,
      activeProjectsCount: 0,
      pendingQuotationsCount: 0,
      openTasksCount: 0,
      attendanceToday: { present: 0, absent: 0, late: 0, onLeave: 0, total: 0 },
    }
  }
}

/**
 * Fetch executive metrics for CEO Dashboard.
 */
export async function getCeoMetrics(): Promise<CeoMetrics> {
  try {
    const supabase = await createClient()

    // 1. Clients
    const { count: clientsCount } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    // 2. Projects
    const { count: projectsCount, data: activeProjects } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(6)

    // 3. Open Opportunities (leads in discussion/quote_sent/negotiation)
    const { count: oppCount } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .in('status', ['qualified', 'discussion', 'quote_sent', 'negotiation'])

    // 4. Pending Quotations
    const { count: quoteCount } = await supabase
      .from('quotations')
      .select('*', { count: 'exact', head: true })
      .in('status', ['sent', 'viewed', 'negotiation'])

    // 5. Total Workforce
    const { count: workforceCount } = await supabase
      .from('employees')
      .select('*', { count: 'exact', head: true })

    return {
      activeClientsCount: clientsCount || 0,
      activeProjectsCount: projectsCount || 0,
      openOpportunitiesCount: oppCount || 0,
      pendingQuotationsCount: quoteCount || 0,
      totalWorkforceCount: workforceCount || 0,
      activeProjects: (activeProjects as Project[]) || [],
    }
  } catch (err) {
    console.error('[CEO_METRICS EXCEPTION]:', err)
    return {
      activeClientsCount: 0,
      activeProjectsCount: 0,
      openOpportunitiesCount: 0,
      pendingQuotationsCount: 0,
      totalWorkforceCount: 0,
      activeProjects: [],
    }
  }
}

/**
 * Fetch leads list.
 */
export async function getLeads(): Promise<Lead[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
    return (data as Lead[]) || []
  } catch {
    return []
  }
}

/**
 * Fetch clients list.
 */
export async function getClients(): Promise<Client[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
    return (data as Client[]) || []
  } catch {
    return []
  }
}

/**
 * Fetch quotations list.
 */
export async function getQuotations(): Promise<Quotation[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('quotations').select('*').order('created_at', { ascending: false })
    return (data as Quotation[]) || []
  } catch {
    return []
  }
}
