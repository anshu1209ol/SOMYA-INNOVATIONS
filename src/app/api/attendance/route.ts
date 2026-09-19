import { NextResponse } from 'next/server'
import {
  getEmployees,
  addEmployee,
  deleteEmployee,
  updateLeaveRequestStatus,
  getLeaveRequests,
  getAttendanceMetrics,
  recordPunch
} from '@/lib/actions/attendance'

export async function GET() {
  try {
    const [employees, leaveRequests, metrics] = await Promise.all([
      getEmployees(),
      getLeaveRequests(),
      getAttendanceMetrics()
    ])

    return NextResponse.json({
      success: true,
      employees,
      leaveRequests,
      metrics
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action } = body

    if (action === 'addEmployee') {
      const result = await addEmployee(body.employee)
      return NextResponse.json(result)
    }

    if (action === 'deleteEmployee') {
      const result = await deleteEmployee(body.id)
      return NextResponse.json(result)
    }

    if (action === 'actionLeave') {
      const result = await updateLeaveRequestStatus(body.id, body.status)
      return NextResponse.json(result)
    }

    if (action === 'punch') {
      const result = await recordPunch(body.employeeId, body.type, body.duration)
      return NextResponse.json(result)
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Request failed'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
