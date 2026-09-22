'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { signUp } from '@/lib/auth/actions'
import { createClient } from '@/lib/supabase/client'
import { UserPlus, AlertCircle, CheckCircle, Eye, EyeOff, Shield } from 'lucide-react'

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  async function handleGoogleSignIn() {
    setGoogleLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${typeof window !== 'undefined' ? window.location.origin : 'https://www.somyainnovations.in'}/auth/callback`,
        },
      })
      if (error) {
        setError(error.message)
        setGoogleLoading(false)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to connect to Google')
      setGoogleLoading(false)
    }
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)

    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      setLoading(false)
      return
    }

    const result = await signUp(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else if (result?.success) {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="bg-[#161614] rounded-2xl border border-[#2A2A26] p-8 shadow-2xl">
          <CheckCircle className="w-12 h-12 text-[#68704A] mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-[#F1EBDD] mb-2">Account Created</h2>
          <p className="text-sm text-[#F1EBDD]/60 font-sans mb-6 leading-relaxed">
            Your registration has been received. Please verify your email address or proceed to sign in to access your dashboard.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#641F2A] text-[#F1EBDD] text-sm font-semibold font-sans hover:bg-[#641F2A]/90 transition-colors shadow-lg"
          >
            Continue to Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      {/* Brand header matching login */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-[#641F2A] flex items-center justify-center text-[#F1EBDD] font-serif text-2xl font-bold mx-auto mb-4">
          S
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#F1EBDD] tracking-tight">
          SOMYA INNOVATIONS
        </h1>
        <p className="text-sm text-[#F1EBDD]/60 font-sans mt-1">
          Create your account
        </p>
      </div>

      {/* Signup form card */}
      <div className="bg-[#161614] rounded-2xl border border-[#2A2A26] p-6 sm:p-8 shadow-xl">
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#641F2A]/15 border border-[#641F2A]/30 text-[#F1EBDD] text-xs font-sans mb-6">
            <AlertCircle className="w-4 h-4 text-[#641F2A] shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Continue with Google */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] text-sm font-medium font-sans hover:bg-[#22221E] hover:border-[#3A3A35] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {googleLoading ? (
            <span className="w-4 h-4 border-2 border-[#F1EBDD]/30 border-t-[#F1EBDD] rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>{googleLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#2A2A26]" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase tracking-wider font-mono">
            <span className="bg-[#161614] px-3 text-[#F1EBDD]/40">or continue with email</span>
          </div>
        </div>

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-xs font-mono text-[#F1EBDD]/50 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] text-sm font-sans placeholder-[#F1EBDD]/30 focus:outline-none focus:border-[#641F2A] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-mono text-[#F1EBDD]/50 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className="w-full px-4 py-3 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] text-sm font-sans placeholder-[#F1EBDD]/30 focus:outline-none focus:border-[#641F2A] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-mono text-[#F1EBDD]/50 uppercase tracking-wider mb-1.5">
              Phone Number <span className="text-[10px] text-[#F1EBDD]/30 font-normal lowercase">(optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] text-sm font-sans placeholder-[#F1EBDD]/30 focus:outline-none focus:border-[#641F2A] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-mono text-[#F1EBDD]/50 uppercase tracking-wider mb-1.5">
              Password
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
            <label htmlFor="confirmPassword" className="block text-xs font-mono text-[#F1EBDD]/50 uppercase tracking-wider mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                minLength={8}
                placeholder="Repeat password"
                className="w-full px-4 py-3 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-[#F1EBDD] text-sm font-sans placeholder-[#F1EBDD]/30 focus:outline-none focus:border-[#641F2A] transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F1EBDD]/40 hover:text-[#F1EBDD] transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#641F2A] text-[#F1EBDD] text-sm font-semibold font-sans hover:bg-[#641F2A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-[#F1EBDD]/30 border-t-[#F1EBDD] rounded-full animate-spin" />
            ) : (
              <UserPlus className="w-4 h-4" />
            )}
            <span>{loading ? 'Creating account...' : 'Create Account'}</span>
          </button>

          {/* Already have an account */}
          <div className="text-center pt-2">
            <span className="text-xs text-[#F1EBDD]/60 font-sans">
              Already have an account?{' '}
            </span>
            <Link
              href="/login"
              className="text-xs font-semibold text-[#641F2A] hover:text-[#8E2B3B] transition-colors font-sans"
            >
              Sign In
            </Link>
          </div>
        </form>

        {/* Security badge */}
        <div className="mt-6 pt-6 border-t border-[#2A2A26] flex items-center justify-center gap-2 text-[10px] text-[#F1EBDD]/40 font-mono">
          <Shield className="w-3.5 h-3.5" />
          <span>Encrypted session • Cookie-based auth</span>
        </div>
      </div>

      <p className="text-center text-xs text-[#F1EBDD]/40 font-sans mt-6">
        <Link href="/" className="hover:text-[#F1EBDD] transition-colors">
          ← Back to SOMYA INNOVATIONS
        </Link>
      </p>
    </div>
  )
}
