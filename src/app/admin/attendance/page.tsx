import AttendanceDashboardPage from "@/app/attendance/page";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Workforce & Attendance Portal | Operations Admin",
  description: "Employee attendance, biometric shift punch logs, and leave approval workflows for SOMYA INNOVATIONS.",
  path: "/admin/attendance",
  noIndex: true,
});

export default function AdminAttendancePage() {
  return <AttendanceDashboardPage />;
}
