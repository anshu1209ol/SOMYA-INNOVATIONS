import { redirect } from 'next/navigation'

export default function TechLeadAttendanceRedirect() {
  // Directly maps to the underlying central attendance hub
  redirect('/admin/attendance')
}
