'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { updatePassword } from '@/lib/auth/actions'
import { Lock, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await updatePassword(formData)
    if (result?.error) {
      setError(result.error)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="bg-[#161614] rounded-2xl border border-[#2A2A26] p-8">
          <CheckCircle className="w-12 h-12 text-[#68704A] mx-auto mb-4" />
          <h2 className="font-serif text-xl text-[#F1EBDD] mb-2">Password Updated</h2>
          <p className="text-sm text-[#F1EBDD]/60 font-sans mb-6">
            Your password has been successfully updated.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#641F2A] text-[#F1EBDD] text-sm font-semibold font-sans hover:bg-[#641F2A]/90 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl text-[#F1EBDD] tracking-tight">
          Set New Password
        </h1>
        <p className="text-sm text-[#F1EBDD]/60 font-sans mt-1">
          Enter your new password below
        </p>
      </div>

      <div className="bg-[#161614] rounded-2xl border border-[#2A2A26] p-6 sm:p-8">
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#641F2A]/15 border border-[#641F2A]/30 text-[#F1EBDD] text-xs font-sans mb-6">
            <AlertCircle className="w-4 h-4 text-[#641F2A] shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form action={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="password" className="block text-xs font-mono text-[#F1EBDD]/50 uppercase tracking-wider mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                placeholder="Minimum 8 characters"
                className="w-full px-4 py-3 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] text-sm font-sans placeholder-[#F1EBDD]/30 focus:outline-none focus:border-[#641F2A] transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F1EBDD]/40 hover:text-[#F1EBDD] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-mono text-[#F1EBDD]/50 uppercase tracking-wider mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              placeholder="Repeat your password"
              className="w-full px-4 py-3 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] text-sm font-sans placeholder-[#F1EBDD]/30 focus:outline-none focus:border-[#641F2A] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#641F2A] text-[#F1EBDD] text-sm font-semibold font-sans hover:bg-[#641F2A]/90 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-[#F1EBDD]/30 border-t-[#F1EBDD] rounded-full animate-spin" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
            <span>{loading ? 'Updating...' : 'Update Password'}</span>
          </button>
        </form>
      </div>
    </div>
  )
}
