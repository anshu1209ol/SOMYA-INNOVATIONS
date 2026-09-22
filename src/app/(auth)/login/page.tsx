'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { signIn } from '@/lib/auth/actions'
import { createClient } from '@/lib/supabase/client'
import { LogIn, Eye, EyeOff, AlertCircle, Shield, ArrowRight } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || ''
  const urlError = searchParams.get('error')
  const [error, setError] = useState<string | null>(
    urlError === 'auth_callback_failed'
      ? 'Authentication failed. Please try again.'
      : urlError === 'account_revoked'
      ? 'Access Revoked: Your account has been suspended or terminated. Please contact system administration.'
      : urlError
  )
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Section 11: If user is already authenticated and active, redirect immediately to role dashboard
  useEffect(() => {
    async function checkExistingAuth() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          // Check role and status from database
          const { data: profile } = await supabase
            .from('profiles')
            .select('status, is_active')
            .eq('id', user.id)
            .maybeSingle()

          if (profile && (profile.status === 'terminated' || profile.status === 'suspended' || !profile.is_active)) {
            await supabase.auth.signOut()
            setError('Access Revoked: Account has been suspended or terminated.')
            return
          }

          const { data: userRoles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)

          const roles = userRoles?.map((r) => r.role) ?? []

          if (roles.includes('tech_lead')) {
            router.replace('/tech-lead')
          } else if (roles.includes('ceo')) {
            router.replace('/ceo')
          } else {
            router.replace('/admin')
          }
        }
      } catch {
        // Not authenticated or network issue; stay on login page
      }
    }
    checkExistingAuth()
  }, [router])

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

    if (redirectTo) {
      formData.set('redirect', redirectTo)
    }

    const result = await signIn(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Brand header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-[#641F2A] flex items-center justify-center text-[#F1EBDD] font-serif text-2xl font-bold mx-auto mb-4">
          S
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#F1EBDD] tracking-tight">
          SOMYA INNOVATIONS
        </h1>
        <p className="text-sm text-[#F1EBDD]/60 font-sans mt-1">
          Sign in to your account
        </p>
      </div>

      {/* Login form */}
      <div className="bg-[#161614] rounded-2xl border border-[#2A2A26] p-6 sm:p-8">
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

        <form action={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-xs font-mono text-[#F1EBDD]/50 uppercase tracking-wider mb-2">
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
            <label htmlFor="password" className="block text-xs font-mono text-[#F1EBDD]/50 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="••••••••"
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

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs text-[#641F2A] hover:text-[#F1EBDD] transition-colors font-sans"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#641F2A] text-[#F1EBDD] text-sm font-semibold font-sans hover:bg-[#641F2A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-[#F1EBDD]/30 border-t-[#F1EBDD] rounded-full animate-spin" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
          </button>

          {/* Sign Up Link */}
          <div className="text-center pt-2">
            <span className="text-xs text-[#F1EBDD]/60 font-sans">
              Don&apos;t have an account?{' '}
            </span>
            <Link
              href="/signup"
              className="text-xs font-semibold text-[#641F2A] hover:text-[#8E2B3B] transition-colors font-sans"
            >
              Sign Up
            </Link>
          </div>
        </form>

        {/* Security badge */}
        <div className="mt-6 pt-6 border-t border-[#2A2A26] flex items-center justify-center gap-2 text-[10px] text-[#F1EBDD]/40 font-mono">
          <Shield className="w-3.5 h-3.5" />
          <span>Encrypted session • Cookie-based auth</span>
        </div>
      </div>

      {/* Management Portals Access Section */}
      <div className="mt-8 pt-6 border-t border-[#2A2A26]">
        <div className="text-center mb-4">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#F1EBDD]/50 font-semibold">
            MANAGEMENT PORTALS
          </span>
          <p className="text-[11px] text-[#F1EBDD]/40 font-sans mt-0.5">
            Role-restricted operational & executive management systems
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Tech Lead Portal */}
          <Link
            href="/tech-lead"
            className="group p-3 rounded-xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/60 hover:bg-[#1B1B18] transition-all text-left flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-semibold text-[#F1EBDD] group-hover:text-white">
                  Tech Lead
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#68704A]" />
              </div>
              <p className="text-[10px] text-[#F1EBDD]/50 leading-tight">
                Technical & System Management
              </p>
            </div>
            <div className="mt-2.5 flex items-center gap-1 text-[10px] font-mono text-[#A2AD7B] group-hover:text-[#F1EBDD] transition-colors">
              <span>Open Portal</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* CEO Portal */}
          <Link
            href="/ceo"
            className="group p-3 rounded-xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/60 hover:bg-[#1B1B18] transition-all text-left flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-semibold text-[#F1EBDD] group-hover:text-white">
                  CEO
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#641F2A]" />
              </div>
              <p className="text-[10px] text-[#F1EBDD]/50 leading-tight">
                Executive Management
              </p>
            </div>
            <div className="mt-2.5 flex items-center gap-1 text-[10px] font-mono text-[#A2AD7B] group-hover:text-[#F1EBDD] transition-colors">
              <span>Open Portal</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Admin Portal */}
          <Link
            href="/admin"
            className="group p-3 rounded-xl bg-[#161614] border border-[#2A2A26] hover:border-[#641F2A]/60 hover:bg-[#1B1B18] transition-all text-left flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-semibold text-[#F1EBDD] group-hover:text-white">
                  Admin
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#641F2A]" />
              </div>
              <p className="text-[10px] text-[#F1EBDD]/50 leading-tight">
                Business & Operations Management
              </p>
            </div>
            <div className="mt-2.5 flex items-center gap-1 text-[10px] font-mono text-[#A2AD7B] group-hover:text-[#F1EBDD] transition-colors">
              <span>Open Portal</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
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

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md p-8 text-center text-[#F1EBDD]/60 font-sans">
          Loading login...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
