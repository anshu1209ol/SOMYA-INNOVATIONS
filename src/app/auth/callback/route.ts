import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Auth callback handler for email confirmation, password reset, and OAuth.
 * Supabase redirects here after successful email verification or OAuth flow.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/admin'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      const { getDashboardForUser } = await import('@/lib/auth/actions')
      const { destination, error: roleError } = await getDashboardForUser(data.user.id)

      if (roleError) {
        await supabase.auth.signOut()
        return NextResponse.redirect(`${origin}/unauthorized?reason=account_revoked`)
      }

      // If user had a requested authorized destination, use it if allowed
      const finalDest = (next && next !== '/admin' && next.startsWith('/')) ? next : destination
      return NextResponse.redirect(`${origin}${finalDest}`)
    }
  }

  // Return to login on error
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}
