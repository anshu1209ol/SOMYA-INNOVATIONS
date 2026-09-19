import Link from 'next/link'
import { ShieldOff } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#11110F] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="bg-[#161614] rounded-2xl border border-[#2A2A26] p-8">
          <ShieldOff className="w-12 h-12 text-[#641F2A] mx-auto mb-4" />
          <h1 className="font-serif text-2xl text-[#F1EBDD] mb-2">Access Denied</h1>
          <p className="text-sm text-[#F1EBDD]/60 font-sans mb-6">
            You do not have permission to access this resource.
            Contact your administrator if you believe this is an error.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] text-sm font-sans hover:border-[#641F2A] transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/login"
              className="px-4 py-2.5 rounded-xl bg-[#641F2A] text-[#F1EBDD] text-sm font-semibold font-sans hover:bg-[#641F2A]/90 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
