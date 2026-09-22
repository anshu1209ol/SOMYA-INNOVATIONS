import Link from 'next/link'
import type { Metadata } from 'next'
import { ShieldOff, AlertOctagon, UserX, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: "Access Denied | SOMYA INNOVATIONS",
  robots: {
    index: false,
    follow: false,
  },
}

interface UnauthorizedPageProps {
  searchParams: Promise<{ reason?: string }>
}

export default async function UnauthorizedPage({ searchParams }: UnauthorizedPageProps) {
  const { reason } = await searchParams

  let title = "Access Denied"
  let description = "You do not have permission to access this protected resource. Contact your system administrator if you believe this is an error."
  let Icon = ShieldOff
  let iconColor = "text-[#641F2A]"

  if (reason === 'suspended') {
    title = "Account Suspended"
    description = "Your account has been temporarily suspended by system governance. Access to internal management tools and attendance telemetry is disabled."
    Icon = AlertOctagon
    iconColor = "text-[#D4AF73]"
  } else if (reason === 'terminated') {
    title = "Account Terminated"
    description = "Your account credentials and security clearance have been terminated. Active sessions and role privileges have been permanently revoked."
    Icon = UserX
    iconColor = "text-[#641F2A]"
  } else if (reason === 'pending_approval') {
    title = "Account Pending Approval"
    description = "Your account registration has been received and is awaiting administrative clearance. You will be notified once access is enabled."
    Icon = Clock
    iconColor = "text-[#A2AD7B]"
  } else if (reason === 'employee_portal_pending') {
    title = "Management Access Restricted"
    description = "Internal management dashboards (/admin, /ceo, /tech-lead) are reserved for authorized management personnel. You can view your personal credentials on your profile."
    Icon = Clock
    iconColor = "text-[#68704A]"
  }

  return (
    <div className="min-h-screen bg-[#11110F] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="bg-[#161614] rounded-2xl border border-[#2A2A26] p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#641F2A]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-[#2A2A26] flex items-center justify-center mx-auto mb-5 shadow-inner">
            <Icon className={`w-7 h-7 ${iconColor}`} />
          </div>

          <h1 className="font-serif text-2xl text-[#F1EBDD] mb-2">{title}</h1>
          <p className="text-sm text-[#F1EBDD]/60 font-sans mb-6 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] text-sm font-sans hover:border-[#641F2A] transition-colors"
            >
              Public Home
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#641F2A] text-[#F1EBDD] text-sm font-semibold font-sans hover:bg-[#641F2A]/90 transition-colors shadow-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
