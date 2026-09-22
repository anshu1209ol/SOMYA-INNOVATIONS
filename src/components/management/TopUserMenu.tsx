'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  User,
  Settings,
  Shield,
  LogOut,
  ChevronDown,
  Building2,
  Sparkles,
} from 'lucide-react'
import { signOut } from '@/lib/auth/actions'
import type { AppRole } from '@/types'

interface TopUserMenuProps {
  user?: {
    id: string
    email?: string
    name?: string
    role?: AppRole
    department?: string
    avatarUrl?: string | null
  }
}

export function TopUserMenu({ user }: TopUserMenuProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const displayName = user?.name || user?.email?.split('@')[0] || 'Internal Staff'
  const displayRole = user?.role ? user.role.replace('_', ' ').toUpperCase() : 'STAFF'
  const displayDept = user?.department || 'Operations'

  // Role Badge Styling (Quiet Luxury, No Blue)
  let badgeClasses = 'bg-[#68704A]/25 text-[#E8DFCF] border-[#68704A]/40'
  if (user?.role === 'tech_lead') {
    badgeClasses = 'bg-[#68704A]/30 text-[#E8DFCF] border-[#68704A]/50'
  } else if (user?.role === 'admin' || user?.role === 'ceo') {
    badgeClasses = 'bg-[#641F2A]/30 text-[#E8DFCF] border-[#641F2A]/40'
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-[#2A2A26] transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#641F2A]"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar Image or Initial */}
        <div className="w-8 h-8 rounded-xl bg-[#1B1B18] border border-[#2A2A26] overflow-hidden flex items-center justify-center shrink-0">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-serif font-bold text-xs text-[#F1EBDD]">
              {displayName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* User Identity info on Desktop */}
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-medium text-[#F1EBDD] truncate max-w-[120px]">
            {displayName}
          </span>
          <span className="text-[10px] font-mono text-[#F1EBDD]/50 uppercase tracking-wider">
            {displayRole}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-[#F1EBDD]/40 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#161614] border border-[#2A2A26] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
          {/* Header Card */}
          <div className="p-3 bg-[#1B1B18] rounded-xl border border-[#2A2A26] mb-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#641F2A] flex items-center justify-center text-[#F1EBDD] font-serif font-bold text-sm overflow-hidden shrink-0">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  displayName.charAt(0).toUpperCase()
                )}
              </div>
              <div className="truncate">
                <div className="text-xs font-semibold text-[#F1EBDD] truncate">
                  {displayName}
                </div>
                <div className="text-[10px] text-[#F1EBDD]/60 font-mono truncate">
                  {user?.email || 'Authenticated User'}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#2A2A26] text-[10px] font-mono">
              <span className={`px-2 py-0.5 rounded-md border ${badgeClasses}`}>
                {displayRole}
              </span>
              <span className="text-[#F1EBDD]/50 truncate max-w-[110px]">
                {displayDept}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-0.5 text-xs font-sans">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#F1EBDD]/80 hover:text-[#F1EBDD] hover:bg-white/[0.04] transition-colors"
            >
              <User className="w-4 h-4 text-[#A2AD7B]" />
              <span>My Profile</span>
            </Link>

            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#F1EBDD]/80 hover:text-[#F1EBDD] hover:bg-white/[0.04] transition-colors"
            >
              <Settings className="w-4 h-4 text-[#C8C2B3]" />
              <span>Settings</span>
            </Link>

            <Link
              href="/settings?tab=security"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#F1EBDD]/80 hover:text-[#F1EBDD] hover:bg-white/[0.04] transition-colors"
            >
              <Shield className="w-4 h-4 text-[#68704A]" />
              <span>Security</span>
            </Link>
          </div>

          {/* Logout Action */}
          <div className="mt-2 pt-2 border-t border-[#2A2A26]">
            <form action={signOut}>
              <button
                type="submit"
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#FFA5B3] hover:text-red-300 hover:bg-[#641F2A]/20 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
