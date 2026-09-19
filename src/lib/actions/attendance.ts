'use server'

import { createClient } from '@/lib/supabase/server'
import type { Employee, LeaveRequest, AttendancePunch } from '@/types'
import { DEFAULT_EMPLOYEES, DEFAULT_LEAVE_REQUESTS } from '@/lib/constants/attendance'

/**
 * Fetch all employees from Supabase database, falling back to default seed data if table is not yet populated.
 */
export async function getEmployees(): Promise<Employee[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('id', { ascending: true })

    if (error || !data || data.length === 0) {
      return DEFAULT_EMPLOYEES
    }

    return data as Employee[]
  } catch {
    return DEFAULT_EMPLOYEES
  }
}

/**
 * Add a new employee to the directory.
 */
export async function addEmployee(employee: Omit<Employee, 'created_at' | 'updated_at'>) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('employees')
      .insert(employee)
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message, data: employee as Employee }
    }

    return { success: true, data: data as Employee }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to add employee'
    return { success: false, error: message, data: employee as Employee }
  }
}

/**
 * Update an existing employee record.
 */
export async function updateEmployee(id: string, updates: Partial<Employee>) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('employees')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data: data as Employee }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update employee'
    return { success: false, error: message }
  }
}

/**
 * Delete an employee from records.
 */
export async function deleteEmployee(id: string) {
  try {
    const supabase = await createClient()
    const { error } = await supabase
      .from('employees')
      .delete()
      .eq('id', id)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete employee'
    return { success: false, error: message }
  }
}

/**
 * Record a shift punch (Punch In or Punch Out).
 */
export async function recordPunch(employeeId: string, punchType: 'in' | 'out', duration?: string) {
  try {
    const supabase = await createClient()
    const now = new Date().toISOString()
    const formattedTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

    if (punchType === 'in') {
      const { data, error } = await supabase
        .from('attendance_punches')
        .insert({
          employee_id: employeeId,
          punch_in: now,
          status: 'active'
        })
        .select()
        .single()

      // Update employee check-in status
      await supabase
        .from('employees')
        .update({
          status: 'Present',
          check_in: formattedTime
        })
        .eq('id', employeeId)

      return { success: !error, punch: data, checkInTime: formattedTime }
    } else {
      // Find active punch and close it
      const { data: activePunch } = await supabase
        .from('attendance_punches')
        .select('*')
        .eq('employee_id', employeeId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (activePunch) {
        await supabase
          .from('attendance_punches')
          .update({
            punch_out: now,
            duration: duration || '8h 00m',
            status: 'completed'
          })
          .eq('id', activePunch.id)
      }

      await supabase
        .from('employees')
        .update({
          check_out: formattedTime,
          hours: duration || '8h 00m'
        })
        .eq('id', employeeId)

      return { success: true, checkOutTime: formattedTime }
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Punch action failed'
    return { success: false, error: message }
  }
}

/**
 * Fetch pending and historical leave requests.
 */
export async function getLeaveRequests(): Promise<LeaveRequest[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('leave_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) {
      return DEFAULT_LEAVE_REQUESTS
    }

    return data as LeaveRequest[]
  } catch {
    return DEFAULT_LEAVE_REQUESTS
  }
}

/**
 * Approve or Reject a leave request.
 */
export async function updateLeaveRequestStatus(id: string, status: 'Approved' | 'Rejected') {
  try {
    const supabase = await createClient()
    const { error } = await supabase
      .from('leave_requests')
      .update({ status })
      .eq('id', id)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update leave request'
    return { success: false, error: message }
  }
}

/**
 * Calculate real-time attendance KPIs and breakdown metrics.
 */
export async function getAttendanceMetrics() {
  const employees = await getEmployees()
  const total = employees.length
  const present = employees.filter(e => e.status === 'Present' || e.status === 'Remote').length
  const late = employees.filter(e => e.status === 'Late').length
  const onLeave = employees.filter(e => e.status === 'On Leave' || e.status === 'Absent').length
  const rate = total > 0 ? Math.round((present / total) * 100) : 0

  const depts = ["AI Engineering", "IT Infrastructure", "Digital Engineering", "Sales & Client Success", "Security"]
  const deptCounts = depts.map(dept => ({
    dept,
    count: employees.filter(e => e.dept === dept).length
  }))

  return {
    total,
    present,
    late,
    onLeave,
    rate,
    deptCounts
  }
}
